// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page with most popular creepypastas
        .when('/popular', {
            templateUrl: 'views/popular.html',
            controller: 'PopularCtrl'
        })

        // latests creepypasta page that will use the MainController
        .when('/latests', {
            templateUrl: 'views/latests.html',
            controller: 'LatestCtrl'
        })

        // login page that will use the UserController
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignUpCtrl'
        })

        // about page that will use the MainController
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'MainCtrl'
        })

        // about page that will use the MainController
        .when('/creepypastas/search/:search_params', {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        })

        // page where users create a new creepypasta, 
        // it will use the CreepypastaController
        .when('/creepypasta-create', {
            templateUrl: 'views/creepypasta-create.html',
            controller: 'CreepypastaCtrl'
        })

        // page where users can edit their creepypastas,
        // it will use the CreepypastaController
        .when('/creepypasta-update/:cpId', {
            templateUrl: 'views/creepypasta-update.html',
            controller: 'CreepypastaUpdateCtrl'
        })

        // page where users can read a creepypasta,
        // it will use the CreepypastaController
        .when('/creepypasta-detail/:cpId', {
            templateUrl: 'views/creepypasta-detail.html',
            controller: 'CreepypastaDetailCtrl'
        })


        // page where user information will be displayed.
        // it will use the UserCtrl
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'UserCtrl'
        })

        // page where users can see their created creepypastas
        // and the ones they saved
        .when('/mycreepypastas', {
            templateUrl: 'views/mycreepypastas.html',
            controller: 'UserCtrl'
        })

        .otherwise({redirectTo: '/popular'});

    $locationProvider.html5Mode(true);

}]);
