(function () {
	angular.module('app')
		.controller('docsCtrl', docsCtrl)

	docsCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$log'];

	function docsCtrl($scope, $timeout, $mdSidenav, $log) {
		var vm = this;

		$scope.toggleSideNav = function () {
			$mdSidenav('left').toggle();
		};
	}
})();
