var DEMO_RUNNING = false;
(function () {

	var events_log = [];

	var relevantProps = ['type', 'which', 'x', 'y', 'target', 'altKey', 'metaKey', 'shiftKey']

	document.addEventListener('click', trackEvent)
	document.addEventListener('keypress', trackEvent)

	function trackEvent(ev) {
		if (DEMO_RUNNING) {
			var info = _.pick(ev, relevantProps);
			info.path = fullPath(info.target);
			info.origin = window.location.origin;
			delete info.target;
			events_log.push(info);
		}
	}

	function fullPath(el){
		var names = [];
		while (el.parentNode){
			if (el.id){
				names.unshift('#'+el.id);
				break;
			}else{
				if (el==el.ownerDocument.documentElement) names.unshift(el.tagName);
				else{
					for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
					names.unshift(el.tagName+":nth-child("+c+")");
				}
				el=el.parentNode;
			}
		}
		return names.join(" > ");
	}

	chrome.runtime.onMessage.addListener(function (msg, sender, sendResp) {
		if(msg.type === 'demo_start') {
			DEMO_RUNNING = true;
			events_log = [];
			sendResp();
		} else if (msg.type === 'demo_end') {
			var traingingObj = {
				events : events_log
			};
			sendResp(traingingObj);
			DEMO_RUNNING = false;
			events_log = false;
		} else if (msg.type === 'demo_query') {
			sendResp({data:DEMO_RUNNING});
		}
	});
})(this);
