(function () {
	angular.module('app')
	.config(routerFn);

	routerFn.$inject = ['$stateProvider', '$urlRouterProvider'];

	function routerFn($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/browse');

		$stateProvider
			.state('browser', {
				display : 'Browse',
				url: '/browse',
				templateUrl: '/public/app/views/browser.view.html',
				controller : 'browserCtrl'
			})
			.state('train', {
				display : 'Train',
				url: '/train',
				templateUrl: '/public/app/views/train.view.html',
				controller : 'trainCtrl'
			});
	}
})();
