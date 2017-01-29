(function () {
	angular.module('app')
		.factory('ChromeMessage', ChromeMessage)

	ChromeMessage.$inject = ['$q'];

	function ChromeMessage($q) {
		function sendRPC(fn, ...params) {
			return send({
				functionName : fn,
				type : 'rpc',
				params : params
			});
		}

		function send(msg) {
			var def = $q.defer();
			chrome.runtime.sendMessage(msg, function(response) {
				console.log('sendmessage args', arguments);
				def.resolve(response);
			});
			return def.promise;
		}


		return {
			sendRPC : sendRPC,
			send : send
		};
	}
})();
