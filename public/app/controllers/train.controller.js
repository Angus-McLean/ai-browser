(function () {
	angular.module('app')
		.controller('trainCtrl', trainCtrl);

	trainCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log', 'ChromeMessage', 'Trainer', '$mdDialog'];

	function trainCtrl($scope, $timeout, $mdSidenav, $log, ChromeMessage, Trainer, $mdDialog) {
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
				confirmTraining(demoData);
			});
			$scope.demoing = false;
			$scope.demoMessage = 'Start Demonstration';
		};

		function updateTrainingData(demoData) {

			Trainer.demonstrations.$add(demoData);
			$scope.query = '';
			localStorage.setItem('query', $scope.query);
		}

		function confirmTraining(trainingData) {
			var json = JSON.parse(JSON.stringify(trainingData));
			json.events.forEach(function (inputEv) {
				inputEv.path = (inputEv.path.match(/\> ?[^>]+$/)||[inputEv.path])[0];
			});

			var confirm = $mdDialog.confirm()
				.title('Does this look about right?')
				.textContent(JSON.stringify(json, null, 3))
				.ok('Yep!')
				.cancel('No');

			$mdDialog.show(confirm).then(function() {
				updateTrainingData(trainingData);
			}, function() {

			});
		}

	}
})();
