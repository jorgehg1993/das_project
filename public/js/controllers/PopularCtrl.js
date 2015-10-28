angular.module('creepyweb.popularcontroller', [])
.controller('PopularCtrl', function($scope, CreepypastaService) {

	$scope.creepypastas = [];

	$scope.getPopularCreepypastas = function(){
		CreepypastaService.getPopularCreepypastas().then(function(response){
			$scope.creepypastas = response.data.creepypastas;
		}, function(err){

		});
	}

	$scope.getPopularCreepypastas();
});
