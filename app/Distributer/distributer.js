'use strict';

angular.module('webApp.distributers', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/distributers',{
		templateUrl: 'Distributer/distributers.html',
		controller: 'DistributerCtrl',
	
	});
}])




.controller('DistributerCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location){
	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
    }
    
    var ref = firebase.database().ref().child('Distributors');
	$scope.distributers = $firebaseArray(ref);	

    $scope.kycDocumentPage =function(id)
	{
		$scope.distributersid =id;
		console.log("User distributers" + id);

		var ref = firebase.database().ref().child('KYC').child(id);
		$scope.kycdoc = $firebaseObject(ref);
		console.log("User kyc doc" +$scope.kycdoc.qrlink );
	

	};

}])