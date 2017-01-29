(function () {
	angular.module('app')
		.controller('trainCtrl', trainCtrl)

	trainCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];

	function trainCtrl($scope, $timeout, $mdSidenav, $log) {
		var vm = this;

		$scope.toggleSideNav = function () {
			$mdSidenav('left').toggle();
		};
	}
})();
