(function (context) {
	var AI_Browser = context.AI_Browser = context.AI_Browser || {};
	AI_Browser.libs = AI_Browser.libs || {};

	// Credentials

	// var URL = 'wss://ws.dev.nuance.com/?';
	var URL = 'wss://httpapi.labs.nuance.com/v1?';

	var APP_ID = "NMDPTRIAL_angus_studentworks_gmail_com20170128150056";
	var APP_KEY = "b7299e52c2eda8885207df61d3ac4a1a568c445f588916354c1c66eb63cc8a1af6296cb8161441681c20caefcd140923a04d82f9d6982e22b4940d1761983257";
	var USER_ID = "";
	var NLU_TAG = "M5042_A2339_V1";

	// ASR
	// See: https://developer.nuance.com/public/index.php?task=supportedLanguages
	var ASR_LANGUAGE = "eng-USA";

	// TTS
	// See: https://developer.nuance.com/public/index.php?task=supportedLanguages
	var TTS_LANGUAGE = "eng-USA";
	var TTS_VOICE = "";

	var defaultOptions = {
		onopen: function() {
			console.log("Websocket Opened");
		},
		onclose: function() {
			console.log("Websocket Closed");
		},
		onvolume: function(vol) {
			viz(vol);
		},
		onresult: function(msg) {
			console.log(msg);
			if (msg.result_type === "NMDP_TTS_CMD" || msg.result_type === "NVC_TTS_CMD") {
				console.log(JSON.stringify(msg, null, 2));

			} else if (msg.result_type === "NVC_ASR_CMD") {
				console.log(JSON.stringify(msg, null, 2));

			} else if (msg.result_type == "NDSP_ASR_APP_CMD") {
				if(msg.result_format === "nlu_interpretation_results") {
					try{
						console.log("interpretations = " + JSON.stringify(msg.nlu_interpretation_results.payload.interpretations, null, 2));
					}catch(ex){
						console.log(JSON.stringify(msg, null, 2), true);
					}
				} else {
					console.log(JSON.stringify(msg, null, 2));
				}

			} else if (msg.result_type === "NDSP_APP_CMD") {
				if(msg.result_format === "nlu_interpretation_results") {
					try{
						console.log("interpretations = " + JSON.stringify(msg.nlu_interpretation_results.payload.interpretations, null, 2));
					}catch(ex){
						console.log(JSON.stringify(msg, null, 2), true);
					}
				} else {
					console.log(JSON.stringify(msg, null, 2));
				}
			}
		},
		onerror: function(error) {
			console.error(error);
		}
	};

	function createOptions(overrides) {
		var options = Object.assign(overrides, defaultOptions);
		options.appId = APP_ID;
		options.appKey = APP_KEY;
		options.userId = '';
		options.language = 'eng-USA';
		options.url = URL;
		return options;
	}

	AI_Browser.libs.createOptions = createOptions;

})(this);
