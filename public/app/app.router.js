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
				display : 'Trainer',
				url: '/train',
				templateUrl: '/public/app/views/train.view.html',
				controller : 'trainCtrl'
			})
			.state('docs', {
				display : 'Documentation',
				url: '/docs',
				templateUrl: '/public/app/views/docs.view.html',
				controller : 'docsCtrl'
			});

		var config = {
			apiKey: "AIzaSyBLM2qYZ0h1zJPNXdTL1EJcVfCGecV9Lqo",
			authDomain: "ai-browser.firebaseapp.com",
			databaseURL: "https://ai-browser.firebaseio.com",
			storageBucket: "ai-browser.appspot.com",
			messagingSenderId: "966241872258"
		};
		firebase.initializeApp(config);
	}
})();
