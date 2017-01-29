(function (context) {
	var AI_Browser = context.AI_Browser = this.AI_Browser || {};
	AI_Browser.nuance = AI_Browser.nuance || {};

	// requires tag
	AI_Browser.nuance.startTextNLU = function (query, cb) {
		var finalObj = AI_Browser.libs.createOptions(query);
		finalObj.onresult = function (resp) {
			if(resp.result_type == "NDSP_APP_CMD" && resp.result_format === "nlu_interpretation_results") {
				cb(resp.nlu_interpretation_results.payload.interpretations[0]);
			}
		};
		Nuance.startTextNLU(finalObj);
	};
})(this);
