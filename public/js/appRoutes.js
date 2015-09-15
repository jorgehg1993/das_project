// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page with most popular creepypastas
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainCtrl'
        })

        // latests creepypasta page that will use the MainController
        .when('/latests', {
            templateUrl: 'views/latests.html',
            controller: 'MainCtrl'
        });

        // login page that will use the UserController
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'UserCtrl'
        });

        // logout route which will redirect to home page
        .when('/logout', {
            templateUrl: 'views/home.html',
            controller: 'UserCtrl'
        });

        // about page that will use the MainController
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'MainCtrl'
        });

        // page where users create a new creepypasta, 
        // it will use the CreepypastaController
        .when('/creepypasta-create', {
            templateUrl: 'views/creepypasta-create.html',
            controller: 'CreepypastaCtrl'
        });

        // page where users can edit their creepypastas,
        // it will use the CreepypastaController
        .when('/creepypasta-update', {
            templateUrl: 'views/creepypasta-update.html',
            controller: 'CreepypastaCtrl'
        });

        // page where users can read a creepypasta,
        // it will use the CreepypastaController
        .when('/creepypasta-view', {
            templateUrl: 'views/creepypasta-view.html',
            controller: 'CreepypastaCtrl'
        });


        // page where user information will be displayed.
        // it will use the UserCtrl
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'UserCtrl'
        });

        // page where users can see their created creepypastas
        // and the ones they saved
        .when('/mycreepypastas', {
            templateUrl: 'views/mycreepypastas.html',
            controller: 'UserCtrl'
        });

    $locationProvider.html5Mode(true);

}]);
