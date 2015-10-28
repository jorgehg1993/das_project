angular.module('creepyweb.latestcontroller', [])
.controller('LatestCtrl', function($scope, CreepypastaService) {

	$scope.creepypastas = [];

	$scope.getLatestCreepypastas = function(){
		CreepypastaService.getLatestCreepypastas().then(function(response){
			$scope.creepypastas = response.data.creepypastas;
		}, function(err){
			alert(err);
		});
	}

	$scope.getLatestCreepypastas();
});