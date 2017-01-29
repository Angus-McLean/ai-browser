(function (context) {
	var AI_Browser = context.AI_Browser = this.AI_Browser || {};
	AI_Browser.actions = AI_Browser.actions || {};

	var options = {
		shouldSort: true,
		threshold: 0.6,
		location: 0,
		distance: 100,
		maxPatternLength: 32,
		minMatchCharLength: 3
	};
	var websiteFuse = new Fuse(AI_Browser.libs.websites, options);

	AI_Browser.actions.createTab = function (respJson, cb=_.noop) {
		if(respJson.concepts && respJson.concepts.websites) {
			var websiteName = respJson.concepts.websites.value;
			var matchedIndex = websiteFuse.search(websiteName);
			chrome.tabs.create({
				url : AI_Browser.libs.websites[matchedIndex[0]]
			}, cb);
		} else {
			chrome.tabs.create({}, cb);
		}
	};

	AI_Browser.actions.closeTab = function (respJson, cb=_.noop) {

		if(respJson.concepts && respJson.concepts.websites) {
			var websiteName = respJson.concepts.websites.value;
			chrome.tabs.query({
				currentWindow : true,
				url : [
					'*://*.'+websiteName+'.com/*',
					'*://*.'+websiteName+'.ca/*',
					'*://*.'+websiteName+'.org/*',
					'*://*.'+websiteName+'.net/*',
					'*://*.'+websiteName+'.gov/*',
					'*://*.'+websiteName+'.edu/*',
					'*://*.'+websiteName+'.ninja/*',
				]
			}, function (tabs) {
				if(tabs.length) {
					chrome.tabs.remove(tabs[0].id, cb);
				} else {
					cb({
						message : 'Couldn\'t find tab'
					})
				}

			});
		} else {
			chrome.tabs.query({
				currentWindow : true,
				active : true
			}, function (tabs) {
				chrome.tabs.remove(tabs[0].id, cb);
			});
		}
	};

})(this);
