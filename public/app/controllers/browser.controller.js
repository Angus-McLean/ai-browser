(function () {
	angular.module('app')
		.controller('browserCtrl', browserCtrl)

	browserCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];

	function browserCtrl($scope, $timeout, $mdSidenav, $log) {
		var vm = this;

		$scope.toggleSideNav = function () {
			$mdSidenav('left').toggle();
		};
	}
})();
