'use strict';

angular.module('webApp.kycdoc', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/kycdoc',{
		templateUrl: 'distributerkycdocument/kycdoc.html',
		controller: 'kycCtrl'
	});
}])

.controller('kycCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location){
	$scope.username = CommonProp.getUser();


    $scope.init = function(id) {
        $scope.distributersId = id;
        console.log("Inside Init: " + $scope.distributersId);
    
    }
	if(!$scope.username){
		$location.path('/home');
	}


	var ref = firebase.database().ref().child('KYC');
    $scope.kycdoc = $firebaseArray(ref);	
    
}])
