// public/js/services/UserService.js
angular.module('creepyweb.userservice', []).factory('UserService', ['$http', 'SERVER', function($http, SERVER) {

    return {
        // call to get an access_token
        // @param1 username or email of account
        // @param2 password
        login : function(user) {
            return $http.post(SERVER.url + '/api/login', user)
            .then(function(response){
                return response;
            });
        },

        signUp : function(user) {
            return $http.post(SERVER.url + '/api/register', user)
            .then(function(response){
                return response;
            });
        },

        // call to get user profile information
        getProfile : function(access_token) {
            return $http.get(SERVER.url + '/api/user', {headers: {'x-access-token': access_token}})
            .then(function(response){
                return response;
            });
        },

        getMyCreepypastas: function(access_token){
            return $http.get(SERVER.url + '/api/mycreepypastas', {headers: {'x-access-token': access_token}})
            .then(function(response){
                return response;
            });
        },

        getFavorites: function(access_token){
            return $http.get(SERVER.url + '/api/favorites', {headers: {'x-access-token': access_token}})
            .then(function(response){
                return response;
            });
        },

        addFavorite: function(cpId, access_token){
            return $http.post(SERVER.url + '/api/favorite/' + cpId, null, {headers: {'x-access-token': access_token}})
            .then(function(response){
                return response;
            });
        },

        // call to update user profile information
        updateProfile : function() {

        },

        // call to save a creepypasta in user's favorites
        // @param cpId id of creepypasta
        deleteFavorite : function(cpId, access_token) {
            return $http.delete(SERVER.url + '/api/favorite/' + cpId, {headers: {'x-access-token': access_token}})
            .then(function(response){
                return response;
            });
        }
    }       

}]);
