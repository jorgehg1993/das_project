// public/js/services/MainService.js
angular.module('CreepyWeb.CreepypastaService', [])
.factory('CreepypastaService', ['$http', 'SERVER', function($http, SERVER) {

    return {
        // call to get an specific creepypasta by id
        // @param cpId id of creepypasta
        getCreepypastaDetail : function(cpId) {
            return $http.get(SERVER.url + '/api/creepypasta/' + cpId)
            .then(function(response){
                return response;
            });
        },

        // call to create a new creepypasta
        createCreepypasta : function(creepypasta, access_token) {
            return $http.post(SERVER.url + '/api/creepypasta', creepypasta, {headers: {'x-access-token': access_token}})
            .then(function(response){
                return response;
            });
        },

        // call to update a creepypasta by id
        // @param cpId id of creepypasta
        updateCreepypasta : function(cpId, creepypasta, access_token) {
            return $http.put(SERVER.url + '/api/creepypasta/' + cpId, creepypasta, {headers: {'x-access-token': access_token}})
            .then(function(response){
                return response;
            });
        },

        // call to delete a creepypasta by id
        // @param cpId id of creepypasta
        deleteCreepypasta : function(cpId, access_token) {
            return $http.delete(SERVER.url + '/api/creepypasta/' + cpId, {headers: {'x-access-token': access_token}})
            .then(function(response){
                return response;
            });
        },

        // call to comment on a creepypasta based on its id
        // @param cpId id of creepypasta
        createComment : function(cpId, comment, access_token) {
            return $http.post(SERVER.url + '/api/comments/' + cpId, comment, {headers: {'x-access-token': access_token}})
            .then(function(response){
                return response;
            });
        },

        // call to delete a creepypasta by id
        // @param cpId id of creepypasta
        rateCreepypasta : function(cpId, access_token, vote) {
            return $http.post(SERVER.url + '/api/rating/' + cpId, vote, {headers: {'x-access-token': access_token}})
            .then(function(response){
                return response;
            });
        },

        searchCreepypastas : function(search_params){
            return $http.get(SERVER.url + '/api/creepypastas/search/' + search_params)
            .then(function(response){
                return response;
            });
        },

        getComments : function(cpId) {
            return $http.get(SERVER.url + '/api/comments/' + cpId)
            .then(function(response){
                return response;
            });
        },

        getPopularCreepypastas : function(){
            return $http.get(SERVER.url + '/api/creepypastas/popular')
            .then(function(response){
                return response;
            });
        },

        getLatestCreepypastas : function(){
            return $http.get(SERVER.url + '/api/creepypastas/latest')
            .then(function(response){
                return response;
            });
        }
    }       

}]);
