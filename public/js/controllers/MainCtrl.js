// public/js/controllers/MainCtrl.js
angular.module('creepyweb.maincontroller', [])
.controller('MainCtrl', function($scope, $location, $localstorage) {
	$scope.search_params;
	$scope.logged = false;

	$scope.searchCreepypastas = function(search_params){
		if(!search_params || search_params.trim() == ''){
			alert('Please write some search parameters');
			return;
		}
		search_params = search_params.split(' ').join('+');
		$location.path('/creepypastas/search/'+search_params);
	}

	$scope.logOut = function(){
		$localstorage.destroy('access_token');
		$localstorage.destroy('username');
		$location.path('/popular');
		$scope.logged = false;
	}

	var access_token = $localstorage.get('access_token');
	
	if(access_token !== undefined){
		$scope.logged = true;
		$scope.username = $localstorage.get('username');
	}

	$scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
	    var access_token = $localstorage.get('access_token');
	
		if(access_token !== undefined){
			$scope.logged = true;
			$scope.username = $localstorage.get('username');
		}
	});
});
