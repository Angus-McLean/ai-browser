(function () {
	angular.module('app')
		.controller('mainCtrl', mainCtrl)

	mainCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log', '$state'];

	function mainCtrl($scope, $timeout, $mdSidenav, $log, $state) {
		var vm = this;

		$scope.toggleSideNav = function () {
			$mdSidenav('left').toggle();
		};
	}
})();
