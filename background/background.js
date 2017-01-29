(function functionName(context) {

	// installation
	chrome.runtime.onInstalled.addListener((details) => {
		if (details.reason.search(/install/g) === -1) {
			return;
		}
		chrome.tabs.create({
			url: chrome.extension.getURL("public/welcome.html"),
			active: true
		});
	});

	chrome.runtime.onMessage.addListener(
		function(req, sender, sendResponse) {
			console.log("Proxying Message", req);
			if(req.type == 'rpc') {
				var fn;
				if(typeof req.functionName === 'string') {
					fn = _.get(context, req.functionName.split('.'));
				} else {
					fn = _.get(context, req.functionName);
				}
				if(typeof fn === 'function') {
					fn.apply(null, req.params.concat(function (asyncResp) {
						console.log('Got rpc response', asyncResp);
						sendResponse(asyncResp);
					}));
				}
			}
			return true;
		});
})(this);
