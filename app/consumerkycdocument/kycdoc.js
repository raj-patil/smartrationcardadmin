'use strict';

angular.module('webApp.kycdocconsumer', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/kycdocconsumer',{
		templateUrl: 'consumerkycdocument/kycdoc.html',
		controller: 'ConkycCtrl'
	});
}])

.controller('ConkycCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location' , 'distributeridservice' , function($scope, CommonProp, $firebaseArray, $firebaseObject, $location ,distributeridservice ){
	$scope.username = CommonProp.getUser();

	

    $scope.init = function(id) {
        $scope.distributersId = id;
		console.log("Inside Init: " + $scope.distributersId);
	
    
    }
	if(!$scope.username){
		$location.path('/home');
	}

			
	var ref = firebase.database().ref().child('CustomerKYC').child(distributeridservice.get()).child('profilepic');
	$scope.kycdoc = $firebaseObject(ref);	
	

	console.log("distributerid " + distributeridservice.get());
	console.log("Inside Init: " + $scope.kycdoc.url);



	$scope.approveKyc = function(id)
    {
        var ref = firebase.database().ref().child('Customers').child(distributeridservice.get());
            ref.update({
                accountStatus: "approved",
                kycDone: true
            }).then(function(ref){
                $scope.$apply(function(){
					$location.path('/consumers');
                });
            }, function(error){
                console.log(error);
            });
        };


        $scope.rejectKyc = function(id)
        {
            var ref = firebase.database().ref().child('Customers').child(distributeridservice.get());
                ref.update({
                    accountStatus: "reject",
                    kycDone: false
                }).then(function(ref){
                    $scope.$apply(function(){
                        $location.path('/consumers');
                    });
                }, function(error){
                    console.log(error);
                });
            };
    

    
}])
