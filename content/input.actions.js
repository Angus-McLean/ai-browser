// (function () {

	var injectEventName = 'InjectInputEvent';

	chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

		var intent = msg.action && msg.action.intent.value;
		if(!intent) return;
		var elemName = getElemName(msg), elem;
		if(intent === 'clickOnElement') {

		} else if (intent === 'typeInElement') {
			elem = queryForElem('typeInElement', elemName);
			var text = getInputText(msg);
			if(elem){
				sendMessage(elem, text);
			}
		}
	});

	var textProps = ['placeholder', 'innerText'];

	function getElemName(respJson) {
		var parsedElemObj = (respJson.concepts.element && respJson.concepts.element[0] || respJson.concepts.element);
		var elemName = parsedElemObj.value || parsedElemObj.literal;
		return elemName;
	}

	function getInputText(respJson) {
		var parsedElemObj = (respJson.concepts.elementText && respJson.concepts.elementText[0] || respJson.concepts.elementText);
		var elemName = parsedElemObj.value || parsedElemObj.literal;
		return elemName;
	}

	function queryForElem(type, elemName) {
		var elems = [];
		if(type === 'clickOnElement') {

		} else if(type === 'typeInElement') {
			elems = [].slice.call(document.querySelectorAll('input', 'textarea', '[contenteditable="true"]'));
		}

		var options = {
			shouldSort: true,
			threshold: 0.6,
			location: 0,
			distance: 100,
			maxPatternLength: 32,
			minMatchCharLength: 3,
			keys : textProps
		};
		var elemFuse = new Fuse(elems, options);
		var elems = elemFuse.search(elemName);
		if(elems.length) {
			return elems[0]
		} else {
			return null;
		}
	}

	function triggerTextInput(elem, text) {
			var initialization = {
				initializationType : 'create',
				eventFamily : 'TextEvent',
				initMethod : 'initTextEvent',
				initArgs : ['textInput', true, true, null, text, 9, "en-US"]
			};
			var overwriteFields = {
				isTrusted : true
			};
			var simulateEventObj = {
				type : 'textInput',
				init : initialization,
				fields : overwriteFields
			};
			var event = new CustomEvent(injectEventName, {detail:simulateEventObj});
			elem.dispatchEvent(event);
			if(elem.value != text) {
				elem.value = text;
			}
		}

		function triggerKeyEvent(elem, keyObj) {
			var initialization = {
				initializationType : 'create',
				eventFamily : 'KeyboardEvent',
				initMethod : 'initKeyboardEvent',
				initArgs : [
					keyObj.type,
					true,
					true,
					null,
					keyObj.charCode,
					keyObj.key
				]
			};
			var overwriteFields = keyObj;
			var simulateEventObj = {
				type : keyObj.type,
				init : initialization,
				fields : overwriteFields
			};
			var event = new CustomEvent(injectEventName, {detail:simulateEventObj});
			elem.dispatchEvent(event);
		}

		function triggerMouseEvent(elem, clickObj) {
			var initialization = {
				initializationType : 'construct',
				eventFamily : 'MouseEvent',
				initArgs : [
					clickObj.type,
					{
						view : null,
						bubbles : true,
						cancelable : true
					}
				]
			};
			var overwriteFields = clickObj;
			var simulateEventObj = {
				type : clickObj.type,
				init : initialization,
				fields : overwriteFields
			};
			var event = new CustomEvent(injectEventName, {detail:simulateEventObj});
			elem.dispatchEvent(event);
		}

		function sendMouseEvent (elem, ev) {
			triggerMouseEvent (elem, {
				type : 'mousedown',
				isTrusted : true,
				which : 1
			});
			triggerMouseEvent (elem, {
				type : 'mouseup',
				isTrusted : true,
				which : 1
			});
			triggerMouseEvent (elem, {
				type : 'click',
				isTrusted : true,
				which : 1
			});
		}

		function sendMessage(elem, text) {
			//elem.style.display = '';
			elem.focus();

			//@NOTE : Gmail will have some script error if this is does not happen.
			// elem.CyphorInput.iframe.style.display = 'none';

			setTimeout(function() {
				triggerTextInput(elem, text);
				setTimeout(function () {
					['keydown', 'keypress','keyup'].forEach(function (keyType, ind) {
						triggerKeyEvent(elem, {
							type : keyType,
							charCode : 13,
							isTrusted: true,
							key : 'Enter',
							keyCode:13,
							which:13
						});
					});
				}, 5);
			}, 5);
		}
// })(this);
