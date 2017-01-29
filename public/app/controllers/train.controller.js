(function () {
	angular.module('app')
		.controller('trainCtrl', trainCtrl)

	trainCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log', 'ChromeMessage'];

	function trainCtrl($scope, $timeout, $mdSidenav, $log, ChromeMessage) {

		$scope.demoing = false;
		$scope.demoMessage = 'Start Demonstration';

		ChromeMessage.sendCurrent({
			type : 'demo_query'
		}, function (respObj) {
			$scope.$apply(function() {
				$scope.demoing = respObj.data;
				if(respObj.data){
					$scope.demoMessage = 'Finish Demonstration';
				} else {
					$scope.demoMessage = 'Start Demonstration';
				}
			});
		});

		$scope.startDemo = function () {
			ChromeMessage.sendCurrent({
				type : 'demo_start'
			}, ()=>{});
			$scope.demoing = true;
			$scope.demoMessage = 'Finish Demonstration';
		};

		$scope.stopDemo = function () {
			ChromeMessage.sendCurrent({
				type : 'demo_end'
			}, ()=>{});
			$scope.demoing = false;
			$scope.demoMessage = 'Start Demonstration';
		};
	}
})();
