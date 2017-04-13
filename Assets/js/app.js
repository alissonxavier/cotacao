(function () {
    'use strict';

    var $app = angular.module('app', ['ngRoute', 'ngMask', 'rzModule', 'duParallax', 'credit-cards','app.config','ngLodash','ngAnimate','toastr']);
    console.log("AppConfig");

    $app.config(function ($routeProvider, $locationProvider,toastrConfig) {

        $routeProvider
        .when("/", {
            templateUrl: "Templates/main.html",
            controller: "mainCtrl"
        })
        .when("/index", {
            templateUrl: "Templates/main.html",
            controller: "mainCtrl"
        })
        .when("/meujeito", {
            templateUrl: "Templates/MeuJeito/dadosBasicos.html"
        })
        .when("/meujeito/assistencias", {
            templateUrl: "Templates/MeuJeito/assistencias.html",
            controller: "assistenciasCtrl"
        })
        .when("/meujeito/complementares", {
            templateUrl: "Templates/MeuJeito/complementares.html",
            controller: "complementaresCtrl"
        })
        .when("/meujeito/pagamento", {
            templateUrl: "Templates/MeuJeito/pagamento.html",
            controller: "pagamentoCtrl"
        })
        .when("/meujeito/error", {
            templateUrl: "Templates/MeuJeito/risco.html",
            controller: "errorCtrl"
        })
        .when("/meujeito/sucesso", {
            templateUrl: "Templates/MeuJeito/sucesso.html",
            controller: "sucessoCtrl"
        })
        .when("/meujeito/analise", {
            templateUrl: "Templates/MeuJeito/analise.html",
            controller: "errorCtrl"
        })
        .when("/ideal", {
            templateUrl: "Templates/Ideal/dadosBasicos.html",
            controller: "mainController"
        });

        angular.extend(toastrConfig, {
            autoDismiss: true,
            closeButton: false,
            extendedTimeout: "1000",
            html: false,
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-top-full-width',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            progressBar: false,
            tapToDismiss: true,
            timeout: 0
        });
    });

    $app.controller('appController', ['$scope', function ($scope) {
        //console.log($scope);
    }]);

})();