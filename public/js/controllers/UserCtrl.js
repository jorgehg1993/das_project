// public/js/controllers/UserCtrl.js
angular.module('creepyweb.usercontroller', ['ui.bootstrap'])

.controller('UserCtrl', function($scope, UserService, CreepypastaService, $localstorage, $location, $uibModal) {

	$scope.getProfile = function(access_token){
		UserService.getProfile(access_token)
		.then(function(response){
			$scope.user = response.data.profile;
		}, function(err){
			alert(err);
		});
	}

	$scope.getMyCreepypastas = function(access_token){
		UserService.getMyCreepypastas(access_token)
		.then(function(response){
			$scope.myCreepypastas = response.data.creepypastas;
		}, function(err){
			
		});
	}

	$scope.getFavorites = function(access_token){
		UserService.getFavorites(access_token)
		.then(function(response){
			$scope.favorites = response.data.favorites;
		}, function(err){
			
		});
	}

	$scope.openModalRemoveCreepypasta = function (creepypasta) {

    	var modalInstance = $uibModal.open({
	     	animation: true,
	      	templateUrl: 'views/modal-template.html',
	      	controller: 'ModalInstanceCtrl',
	      	size: 'sm'
	    });

	    modalInstance.result.then(function () {
	    	var access_token = $localstorage.get('access_token');
	      	CreepypastaService.deleteCreepypasta(creepypasta._id, access_token)
	      	.then(function(){
	      		alert('Creepypasta deleted!');
	      		deleteCreepypastaUI(creepypasta);
	      	}, function(err){

	      	});
	    }, function () {
	      	alert('No actions taken');
	    });
	}

	function deleteCreepypastaUI(creepypasta){
		for(i=0; i<$scope.myCreepypastas.length; i++){
			if($scope.myCreepypastas[i]._id == creepypasta._id){
				$scope.myCreepypastas.splice(i, 1);
				return;
			}
		}
	}

	$scope.openModalRemoveFavorites = function (creepypasta) {

    	var modalInstance = $uibModal.open({
	     	animation: true,
	      	templateUrl: 'views/modal-favorite-template.html',
	      	controller: 'ModalInstanceCtrl',
	      	size: 'sm'
	    });

	    modalInstance.result.then(function () {
	      	var access_token = $localstorage.get('access_token');
	      	UserService.deleteFavorite(creepypasta._id, access_token)
	      	.then(function(){
	      		alert('Favorite removed!');
	      		deleteFavoriteUI(creepypasta);
	      	}, function(err){

	      	});
	    }, function () {
	      	alert('No actions taken');
	    });
	}

	function deleteFavoriteUI(creepypasta){
		for(i=0; i<$scope.favorites.length; i++){
			if($scope.favorites[i]._id == creepypasta._id){
				$scope.favorites.splice(i, 1);
				return;
			}
		}
	}

	var access_token = $localstorage.get('access_token');
	
	if(access_token !== undefined){
		$scope.getProfile(access_token);
		$scope.getMyCreepypastas(access_token);
		$scope.getFavorites(access_token);
	}else{
		$location.path('/popular');
	}
})

.controller('SignUpCtrl', function($scope, UserService, $location, $localstorage){
	$scope.newUser;
	$scope.user;

	$scope.signUp = function(user){
		if(!user.username || !user.email || !user.password || !user.passwordv){
			alert('Missing fields. Please enter all the fields');
			return;
		}
		if(user.password != user.passwordv){
			alert("Passwords don't match");
			return;
		}
		UserService.signUp(user)
		.then(function(response){
			$localstorage.set('access_token', response.data.token);
			$localstorage.set('username', user.username);
			$location.path('/profile');
		}, function(err){
			alert(err);
		});
	}

	$scope.login = function(user){
		if(!user.username || !user.password){
			alert('Missing fields. Please enter all the fields');
			return;
		}

		UserService.login(user)
		.then(function(response){
			$localstorage.set('access_token', response.data.token);
			$localstorage.set('username', user.username);
			$location.path('/profile');
		}, function(err){
			alert(err);
		});
	}
})

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
