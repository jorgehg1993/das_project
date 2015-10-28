// public/js/controllers/CreepypastaCtrl.js
angular.module('creepyweb.creepypastacontrollers', [])

.controller('CreepypastaCtrl', function($scope, CreepypastaService, $localstorage, $location) {
	$scope.creepypasta;

	$scope.createCreepypasta = function(creepypasta){
		var access_token = $localstorage.get('access_token');

		CreepypastaService.createCreepypasta(creepypasta, access_token)
		.then(function(response){
			alert('Creepypasta created successfully');
			$location.path('/profile');
		}, function(err){
			alert('Creepypasta not created. Try again later');
		});
	}
})

.controller('CreepypastaDetailCtrl', function($scope, CreepypastaService, UserService, $localstorage, $routeParams){
	$scope.creepypasta = '';
	$scope.comments = [];
	$scope.empty_comments = true;
	$scope.newComment;
	$scope.rated = false;

	$scope.getCreepypastaDetail = function(cpId){
		CreepypastaService.getCreepypastaDetail(cpId)
		.then(function(response){
			$scope.creepypasta = response.data.creepypasta;
		}, function(err){
			alert('Creepypasta not found.');
		});
	}

	$scope.getComments = function(cpId){
		CreepypastaService.getComments(cpId)
		.then(function(response){
			$scope.comments = response.data.comments;
			$scope.empty_comments = false;
		}, function(err){

		});
	}

	$scope.postComment = function(comment){
		var access_token = $localstorage.get('access_token');
		CreepypastaService.createComment($routeParams.cpId, comment, access_token)
		.then(function(response){
			alert('Comment created');
			$scope.getComments($routeParams.cpId);
			$scope.empty_comments = false;
		}, function(err){

		});
	}

	$scope.addFavorite = function(){
		var access_token = $localstorage.get('access_token');
		UserService.addFavorite($routeParams.cpId, access_token)
		.then(function(response){
			alert('Creepypasta added to favorites');
		}, function(err){

		});
	}


	$scope.rateCreepypasta = function(value){
		var access_token = $localstorage.get('access_token');
		if(value){
			$scope.vote = {upvote: true};
			CreepypastaService.rateCreepypasta($routeParams.cpId, access_token, $scope.vote)
			.then(function(response){
				alert('Creepypasta upvoted');
				$scope.rated = true;
			}, function(err){

			});
		}else{
			$scope.vote = {upvote: false};
			CreepypastaService.rateCreepypasta($routeParams.cpId, access_token, $scope.vote)
			.then(function(response){
				alert('Creepypasta downvoted');
				$scope.rated = true;
			}, function(err){

			});
		}
	}

	$scope.getCreepypastaDetail($routeParams.cpId);
	$scope.getComments($routeParams.cpId);
})

.controller('CreepypastaUpdateCtrl', function($scope, CreepypastaService, $routeParams, $localstorage, $location) {
	$scope.creepypasta;

	$scope.updateCreepypasta = function(creepypasta){
		var access_token = $localstorage.get('access_token');

		CreepypastaService.updateCreepypasta($routeParams.cpId, creepypasta, access_token)
		.then(function(response){
			alert('Creepypasta updated successfully');
			$location.path('/profile');
		}, function(err){
			alert('Creepypasta not updated. Try again later');
		});
	}

	$scope.getCreepypastaDetail = function(cpId){
		CreepypastaService.getCreepypastaDetail(cpId)
		.then(function(response){
			$scope.creepypasta = response.data.creepypasta;
		}, function(err){
			alert('Creepypasta not found.');
		});
	}

	$scope.getCreepypastaDetail($routeParams.cpId);
})
