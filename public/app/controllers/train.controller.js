(function () {
	angular.module('app')
		.controller('trainCtrl', trainCtrl);

	trainCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log', 'ChromeMessage', 'Trainer'];

	function trainCtrl($scope, $timeout, $mdSidenav, $log, ChromeMessage, Trainer) {
		var ref = firebase.database().ref();
		var _timeout;

		$scope.demoing = false;
		$scope.demoMessage = 'Start Demonstration';
		$scope.query = localStorage.getItem('query') || '';

		ChromeMessage.sendCurrent({
			type : 'demo_query'
		}, function (respObj) {
			$scope.$apply(function() {
				$scope.demoing = respObj && respObj.data;
				if($scope.demoing){
					$scope.demoMessage = 'Finish Demonstration';
				} else {
					$scope.demoMessage = 'Start Demonstration';
				}
			});
		});

		$scope.updateQuery = function () {

			if(_timeout) {
				$timeout.cancel(_timeout);
			}
			_timeout = $timeout(function() {
				localStorage.setItem('query', $scope.query);
				_timeout = null;
			}, 500);
		}

		$scope.startDemo = function () {
			if(!$scope.query) {
				return alert('AI Action has to be defined');
			}
			ChromeMessage.sendCurrent({
				type : 'demo_start'
			}, ()=>{});
			localStorage.setItem('query', $scope.query);
			$scope.demoing = true;
			$scope.demoMessage = 'Finish Demonstration';
		};

		$scope.stopDemo = function () {
			ChromeMessage.sendCurrent({
				type : 'demo_end'
			}, function (demoData) {
				angular.extend(demoData, {
					query : localStorage.getItem('query'),
					date_created : Date.now()
				});
				Trainer.demonstrations.$add(demoData);
			});
			$scope.demoing = false;
			$scope.demoMessage = 'Start Demonstration';
		};

	}
})();
