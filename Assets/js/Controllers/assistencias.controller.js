(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('assistenciasCtrl', ['$scope', '$location', 'storageService', '$logService', 'parallaxHelper','lodash', function ($scope, $location, storageService, $logService, parallaxHelper,lodash) {

        $logService.message("assistencias Ctrl");

        $scope.changeValue = false;

        $scope.header = parallaxHelper.createAnimator(-0.5, 150, -150);
        $scope.grafismoLeft = parallaxHelper.createAnimator(-0.4, 0, -140, 40);
        $scope.grafismoRight = parallaxHelper.createAnimator(-0.4, 0, -140, 40);

        $scope.assistencias = [];

        $scope.slider = {
            showSelectionBar: true,
            hideLimitLabels: true,
            hidePointerLabels: true,
            onChange: function () {
                $scope.changeValue = true;
            }
        };

        $scope.coberuraSelecionada = [];

        $scope.assistenciasSelecionadas = [];

        /**
         * diminuiRange
         * @param modelChange - Model value
         * @param range - Valor do salto
         */
        $scope.diminuiRange = function (model, id, range, limit) {
            $scope.changeValue = true;
            if (model == 'inclusas') {
                if (id >= 0) {
                    if ($scope.coberturas[id].valor >= limit) {
                        $scope.coberturas[id].valor = Math.round($scope.coberturas[id].valor - range);
                    }
                    return false;
                }
            }

            if (model == 'ofertas') {
                if (id >= 0) {
                    if ($scope.ofertasCobertura[id].valor >= limit) {
                        $scope.ofertasCobertura[id].valor = Math.round($scope.ofertasCobertura[id].valor - range);
                    }
                }
                return false;
            }
            return false;
        }

        $scope.aumentaRange = function (model, id, range, limit) {

            $scope.changeValue = true;

            if (model == 'inclusas') {
                if (id >= 0) {
                    if ($scope.coberturas[id].valor <= limit) {
                        $scope.coberturas[id].valor = Math.round($scope.coberturas[id].valor + range);
                    }
                }
                return false;
            }

            if (model == 'ofertas') {
                if (id >= 0) {
                    if ($scope.ofertasCobertura[id].valor <= limit) {
                        $scope.ofertasCobertura[id].valor = Math.round($scope.ofertasCobertura[id].valor + range);
                    }
                }
                return false;
            }

            return false;
        }


        if (storageService.restore('rdStorageStep1')) {
            $scope.dadosPessoais = JSON.parse(storageService.restore('rdStorageStep1'));
        }

        //Buscar as informações das coberturas.
        if(storageService.restore('coberturas')){
            $scope.coberturasIniciais = JSON.parse(storageService.restore('coberturas'));
        }

        $scope.coberturas = lodash.filter($scope.coberturasIniciais[0].composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'COBERTURA'; });

        $scope.validarAssistencias = function () {
            storageService.save('rdStorageStep2', $scope.assistencias);
            $scope.go('meujeito/complementares');
        }

        $scope.selecionaCobertura = function (cobertura) {

            $scope.changeValue = true;

            if (!$scope.coberuraSelecionada.length) {
                $scope.coberuraSelecionada.push(cobertura);
                return false;
            }

            var index = $scope.coberuraSelecionada.indexOf(cobertura);

            if (index == -1) {
                $scope.coberuraSelecionada.push(cobertura);
                return false;
            } else {
                $scope.coberuraSelecionada.splice(index, 1);
                return false;
            }

        }

        $scope.assistenciasInclusas = lodash.filter($scope.coberturasIniciais[0].composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'ASSISTENCIA' && o.cobertura.categoria.titulo == 'PADRAO'; });

        $scope.assistenciasInclusasBENS = lodash.filter($scope.coberturasIniciais[0].composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'ASSISTENCIA' && o.cobertura.categoria.titulo == 'BENS'; });

        $scope.assistenciasInclusasVOCE = lodash.filter($scope.coberturasIniciais[0].composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'ASSISTENCIA' && o.cobertura.categoria.titulo == 'VOCE'; });

        $scope.assistenciasInclusasAMIGOS = lodash.filter($scope.coberturasIniciais[0].composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'ASSISTENCIA' && o.cobertura.categoria.titulo == 'AMIGOS'; });

        $scope.selecionaAssistencia = function (assistencia) {

            if (!$scope.assistenciasSelecionadas.length) {
                $scope.assistenciasSelecionadas.push(assistencia);
                return false;
            }

            var index = $scope.assistenciasSelecionadas.indexOf(assistencia);
            if (index == -1) {
                $scope.assistenciasSelecionadas.push(assistencia);
                return false;
            } else {
                $scope.assistenciasSelecionadas.splice(index, 1);
                return false;
            }
            $scope.changeValue = true;
        }

        $scope.recalcular = function () {
            $scope.changeValue = false;
        }

        $scope.go = function (param) {
            $location.path(param);
        }

    }]);


})();