(function () {
	angular.module('app')
		.controller('browserCtrl', browserCtrl)

	browserCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log', 'ChromeMessage'];

	function browserCtrl($scope, $timeout, $mdSidenav, $log, ChromeMessage) {
		$scope.query = '';
		$scope.toggleSideNav = function () {
			$mdSidenav('left').toggle();
		};

		$scope.interpret = function () {
			if($scope.query && $scope.query !== '') {
				var prom = ChromeMessage.sendRPC('AI_Browser.nuance.startTextNLU', {
					text : $scope.query,
					tag : AI_Browser.nuance.models.Globalized.tag
				});
				prom.then(function (resp) {
					console.log(resp);
				});
			}
		};
	}
})();
