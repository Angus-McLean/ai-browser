(function () {

	// used to programmatically assign what the clonedObject's values should be overwritten with
	var targetElem = null;
	var overwriteValue = null;


	// CloneObject
	function CloneObject(orig) {
		var obj = Object.create(Object.getPrototypeOf(orig));
		for(var i in orig){
			(function (j){
				Object.defineProperty(obj, j, {
					get : function () {
						if(typeof orig[j] == 'function') {
							return orig[j].bind(orig);
						} else {
							var retVal;
							if(overwriteValue && overwriteValue.fields[j]) {
								//console.log('intercepted', j, overwriteValue.fields[j]);
								retVal = overwriteValue.fields[j];
							} else {
								//console.log('proxied', j, orig[j]);
								retVal = orig[j];
							}
							return retVal;
						}
					},
					set : function (v) {
						if(typeof v == 'function') {
							return orig[j] = v.bind(orig);
						} else {
							return orig[j] = v;
						}
					},
					enumerable : orig.propertyIsEnumerable(j)
				});
			})(i);
		}
		return obj;
	}

	// receive CyphorInputEvents and trigger fake input
	document.addEventListener('InjectInputEvent', function (cyphorEvent) {
		console.log('received InjectInputEvent', cyphorEvent);

		overwriteValue = cyphorEvent.detail;

		if(cyphorEvent.detail === null){
			targetElem = null;
		} else {
			targetElem = cyphorEvent.target;
			overwriteValue.fields.view = window;
			simualteEvent(cyphorEvent);
			overwriteValue = null;
			targetElem = null;
		}
	}, true);

	// will track all added listeners so that the interceptor can be removed properly when removeEventListener is called
	var addedListeners = {}

	// rewrite the functionality of addEventListener to inject possibility to clone native events
	EventTarget.prototype.addEventListener = (function () {
		var orig = EventTarget.prototype.addEventListener;
		return function(eventType,listnerFn){
			var origList = listnerFn;

			var interceptor = function () {
				if(overwriteValue && overwriteValue.type === eventType){
					arguments[0] = CloneObject(arguments[0]);
					window.event = arguments[0];
				}
				return origList.apply(this, arguments);
			};

			if(addedListeners[eventType]){
				addedListeners[eventType].push({
					orig : arguments[1],
					associatedInterceptor : interceptor
				});
			} else {
				addedListeners[eventType] = [{
					orig : arguments[1],
					associatedInterceptor : interceptor
				}];
			}
			arguments[1] = interceptor;

			return orig.apply(this, arguments);
		};
	})();

	EventTarget.prototype.removeEventListener = (function () {
		var orig = EventTarget.prototype.removeEventListener;
		return function (ev, fn) {

			var foundListObj = (addedListeners[ev] || []).find(function (addedListObj, ind) {
				if(addedListObj.orig === fn) {
					addedListeners[ev].splice(ind, 1);
					return true;
				} else {
					return false;
				}
			});
			if(foundListObj){
				//console.log('removeEventListener on interceptor', arguments, addedListeners[ev]);
				arguments[1] = foundListObj.associatedInterceptor;
			}
			return orig.apply(this, arguments);
		};
	})();

	function simualteEvent(cyphorEvent) {
		var ev;
		if(cyphorEvent.detail.init.initializationType === 'create'){
			ev = document.createEvent(cyphorEvent.detail.init.eventFamily);
			ev[cyphorEvent.detail.init.initMethod].apply(ev, cyphorEvent.detail.init.initArgs);
		} else if(cyphorEvent.detail.init.initializationType === 'construct') {
			var evConstr = window[cyphorEvent.detail.init.eventFamily];
			var constrArgs = [evConstr].concat(cyphorEvent.detail.init.initArgs);
			var builder = evConstr.bind.apply(evConstr, constrArgs);
			ev = new builder();
		}
		cyphorEvent.target.dispatchEvent(ev);
	}
})();
