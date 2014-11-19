angular.module('StaffingUI').config(function($routeProvider) {
    'use strict';

    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html'
        })
        .when('/users', {
            templateUrl: 'templates/users.html',
            controller: 'UserCtrl'
        })
        .when('/titles', {
            templateUrl: 'templates/titles.html',
            controller: 'TitleCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});