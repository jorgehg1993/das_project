// public/js/controllers/SearchCtrl.js
angular.module('creepyweb.searchcontroller', [])
.controller('SearchCtrl', function($scope, $routeParams, CreepypastaService) {
	$scope.creepypastas = [];
	$scope.cp_found = true;

	$scope.searchCreepypastas = function(search_params){
		CreepypastaService.searchCreepypastas(search_params)
		.then(function(response){
			if(response.data.creepypastas.hits.total == 0){
				alert('No results found');
				$scope.cp_found = false;
				return;
			}
			$scope.creepypastas = response.data.creepypastas.hits.hits;
		}, function(err){
			alert(err);
		});
	}

	$scope.searchCreepypastas($routeParams.search_params);
});
