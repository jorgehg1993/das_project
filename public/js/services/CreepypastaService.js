// public/js/services/MainService.js
angular.module('CreepypastaService', []).factory('Creepypasta', ['$http', function($http) {

    return {
        // call to get an specific creepypasta by id
        // @param cpId id of creepypasta
        getCreepypasta : function(cpId) {

        },

        // call to create a new creepypasta
        createCreepypasta : function() {

        },

        // call to update a creepypasta by id
        // @param cpId id of creepypasta
        updateCreepypasta : function(cpId) {

        },

        // call to delete a creepypasta by id
        // @param cpId id of creepypasta
        deleteCreepypasta : function(cpId) {

        },

        // call to comment on a creepypasta based on its id
        // @param cpId id of creepypasta
        createComment : function(cpId) {

        },

        // call to delete a creepypasta by id
        // @param cpId id of creepypasta
        rateCreepypasta : function(cpId) {

        }
    }       

}]);
