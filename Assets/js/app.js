(function () {
    'use strict';

    var $app = angular.module('app', ['ngRoute', 'ngMask', 'rzModule', 'duParallax', 'credit-cards','app.config','ngLodash','ngAnimate','toastr']);
    console.log("AppConfig");

    $app.config(function ($routeProvider, $locationProvider,toastrConfig) {

        $routeProvider
        .when("/", {
            templateUrl: "Templates/main.html",
            controller: "mainCtrl",
            reloadOnSearch: false
        })
        .when("/index", {
            templateUrl: "Templates/main.html",
            controller: "mainCtrl",
            reloadOnSearch: false
        })
        .when("/meujeito", {
            templateUrl: "Templates/MeuJeito/dadosBasicos.html",
            controller: "dadosPessoaisCtrl",
            reloadOnSearch: false
        })
        .when("/meujeito/assistencias", {
            templateUrl: "Templates/MeuJeito/assistencias.html",
            controller: "assistenciasCtrl",
            reloadOnSearch: false
        })
        .when("/meujeito/complementares", {
            templateUrl: "Templates/MeuJeito/complementares.html",
            controller: "complementaresCtrl",
            reloadOnSearch: false
        })
        .when("/meujeito/pagamento", {
            templateUrl: "Templates/MeuJeito/pagamento.html",
            controller: "pagamentoCtrl",
            reloadOnSearch: false
        })
        .when("/meujeito/error", {
            templateUrl: "Templates/MeuJeito/risco.html",
            controller: "errorCtrl",
            reloadOnSearch: false
        })
        .when("/meujeito/sucesso", {
            templateUrl: "Templates/MeuJeito/sucesso.html",
            controller: "sucessoCtrl",
            reloadOnSearch: false
        })
        .when("/meujeito/analise", {
            templateUrl: "Templates/MeuJeito/analise.html",
            controller: "errorCtrl",
            reloadOnSearch: false
        })
        .when("/ideal", {
            templateUrl: "Templates/Ideal/dadosBasicos.html",
            controller: "mainController",
            reloadOnSearch: false
        });

        var options = {
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
        };
        
        angular.extend(toastrConfig, options);

    });

    $app.controller('appController', ['$scope', function ($scope) {
        //console.log($scope);
    }]);

})();