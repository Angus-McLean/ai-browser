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

	var curTabID;
	chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
		curTabID = tabId;
	});

	AI_Browser.actions.createTab = function (respJson, cb=_.noop) {
		if(respJson.concepts && respJson.concepts.websites) {
			var websiteName = (respJson.concepts.websites[0] || respJson.concepts.websites).value;
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
			var websiteName = (respJson.concepts.websites[0] || respJson.concepts.websites).value;
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
				if(tabs.length) {
					chrome.tabs.remove(tabs[0].id, cb);
				} else {
					chrome.tabs.remove(curTabID, cb);
				}
			});
		}
	};

	AI_Browser.actions.globalSearch = function (respJson, cb=_.noop) {
		var query = (respJson.concepts && respJson.concepts.query[0] || respJson.concepts.query).value || '';
		chrome.tabs.create({
			url : 'https://google.com/search?q='+query
		}, cb);
	}

	AI_Browser.actions.goToWebsite = function (respJson, cb=_.noop) {
		var websiteObj = (respJson.concepts.websites[0] || respJson.concepts.websites);
		var websiteName = websiteObj.value || websiteObj.literal;
		var matchedIndex = websiteFuse.search(websiteName);
		chrome.tabs.update({
			url : AI_Browser.libs.websites[matchedIndex[0]]
		}, cb);
	};

	AI_Browser.actions.clickOnElement = function (respJson, cb=_.noop) {
		sendMsgToTab(respJson, cb)
	}

	AI_Browser.actions.typeInElement = function (respJson, cb=_.noop) {
		sendMsgToTab(respJson, cb)
	}

	function sendMsgToTab(msg, cb) {
		chrome.tabs.query({
			currentWindow : true,
			active : true
		}, function (tabs) {
			if(tabs.length) {
				chrome.tabs.sendMessage(tabs[0].id, msg, cb);
			} else {
				chrome.tabs.sendMessage(curTabID, msg, cb);
			}
		});
	}

})(this);
