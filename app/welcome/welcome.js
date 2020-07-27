'use strict';

angular.module('webApp.welcome', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome',{
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl',
		styleUrls: 'welcome/component.css'
	});
}])


.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location){
	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}

	var ref = firebase.database().ref().child('Distributors');
	$scope.distributers = $firebaseArray(ref);	

	$scope.editPost = function(id){
		var ref = firebase.database().ref().child('Articles/' + id);
		$scope.editPostData = $firebaseObject(ref);
	};

	$scope.viewDistributers =function()

	{
		$location.path('/distributers');
	}

	$scope.kycDocumentPage =function(id)
	{
		$scope.distributersid =id;
		console.log("User distributers" + id);

		var ref = firebase.database().ref().child('KYC').child(id);
		$scope.kycdoc = $firebaseObject(ref);
		console.log("User kyc doc" +$scope.kycdoc.qrlink );
	

	};
	$scope.updatePost = function(id){
		var ref = firebase.database().ref().child('Articles/' + id);
		ref.update({
			title: $scope.editPostData.title,
			post: $scope.editPostData.post
		}).then(function(ref){
			$scope.$apply(function(){
				$("#editModal").modal('hide');
			});
		}, function(error){
			console.log(error);
		});
	};

	$scope.deleteCnf = function(article){
		$scope.deleteArticle = article;
	};

	$scope.deletePost = function(deleteArticle){
		$scope.articles.$remove(deleteArticle);
		$("#deleteModal").modal('hide');
	};

	$scope.logout = function(){
		CommonProp.logoutUser();
		
	}
}])