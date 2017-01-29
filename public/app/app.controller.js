(function () {
	angular.module('app')
		.controller('mainCtrl', mainCtrl)

	mainCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log', '$state'];

	function mainCtrl($scope, $timeout, $mdSidenav, $log, $state) {

		$scope.toggleSideNav = function () {
			$mdSidenav('left').toggle();
		};

		$scope.$state = $state;
	}
})();
