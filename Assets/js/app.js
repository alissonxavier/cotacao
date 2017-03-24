(function(){
    'use strict';

    var $app = angular.module('app', ['ngRoute', 'ngMask', 'rzModule','app.config']);
    console.log("AppConfig");

    $app.config(function ($routeProvider, $locationProvider,APP_CONFIG) {

        console.log('URL' + APP_CONFIG.SERVICO.WEBSERVICE);

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