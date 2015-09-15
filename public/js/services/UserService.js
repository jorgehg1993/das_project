// public/js/services/UserService.js
angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        // call to get an access_token
        // @param1 username or email of account
        // @param2 password
        login : function(username, password) {

        },

        // call to disable access_token
        logout : function() {

        },

        // call to get user profile information
        getProfile : function() {

        },

        // call to update user profile information
        updateProfile : function() {

        },

        // call to delete user account
        updateProfile : function() {

        }

        // call to save a creepypasta in user's favorites
        // @param cpId id of creepypasta
        saveCreepypasta : function(cpId) {

        },

    }       

}]);
