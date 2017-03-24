(function(){
    'use strict';

    var $app = angular.module('app', ['ngRoute', 'ngMask', 'rzModule']);
    console.log("AppConfig");

    $app.config(function ($routeProvider, $locationProvider) {

        $routeProvider
        .when("/", {
            templateUrl: "Templates/main.html",
            controller: "mainController"
        })
        .when("/index", {
            templateUrl: "Templates/main.html",
            controller: "mainController"
        })
        .when("/meujeito", {
            templateUrl: "Templates/MeuJeito/dadosBasicos.html",
            controller: "mainController"
        });
    });

    $app.controller('appController', ['$scope', function ($scope) {
        //console.log($scope);
    }]);

})();