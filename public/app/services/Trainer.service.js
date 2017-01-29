(function () {
	angular.module('app')
		.factory('Trainer', Trainer)

	Trainer.$inject = ['$q', '$firebaseObject', '$firebaseArray'];

	function Trainer($q, $firebaseObject, $firebaseArray) {

		var ref = firebase.database().ref().child("demonstrations");
		var demonstrations = $firebaseArray(ref);

		return {
			demonstrations : demonstrations
		};
	}
})();
