(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('dadosPessoaisCtrl', ['$scope', '$attrs', '$location', 'storageService', 'parallaxHelper', function ($scope, $attrs, $location, storageService, parallaxHelper) {

        $scope.header = parallaxHelper.createAnimator(-0.5, 150, -150);
        $scope.grafismoLeft = parallaxHelper.createAnimator(-0.4, 0, -180, 40);
        $scope.grafismoRight = parallaxHelper.createAnimator(-0.4, 0, -180, 40);
        
        $scope.dadosPessoais = {};

        if (storageService.restore('rdStorageStep1')) {
            $scope.dadosPessoais = JSON.parse(storageService.restore('rdStorageStep1'));
        };

        $scope.steps = {
            passo1: true
        }
        $scope.error = {};
        $scope.valorAproximado = 7000000;

        /**
         * slider
         * @description Método de configuração do slider
         */
        $scope.slider = {
            value: $scope.valorAproximado,
            options: {
                showSelectionBar: true,
                floor: 7000000,
                ceil: 50000000,
                step: 100,
                translate: function (value) {
                    $scope.valorAproximado = value;
                    return '';
                }
            }
        };

        /**
         * @function validarNopme
         * @description Método usado para validar o preenchimento do campo nome
         */
        $scope.validarNome = function () {
            var rule = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test($scope.dadosPessoais.nome);

            //var ruleNumber = /^[0-9]$/;

            //if (!ruleNumber) {
            //    $scope.error.nome = {
            //        message: "Tem certeza?",
            //        valid: false
            //    };
            //    return false;
            //}

            if (!rule) {
                $scope.error.nome = {
                    message: "Preencher com seu nome completo.",
                    valid: false
                };
                return false;
            };

            $scope.error.nome = {
                message: "",
                valid: true
            };

            $scope.isValid = true;
            $scope.steps.passo2 = true;
        };

        /**
         * validarTelefoneOuEmail
         * @description Valida o preenchimento de telefone ou e-mail
         */
        $scope.validarTelefoneOuEmail = function () {

            var email = $scope.dadosPessoais.email;
            var telefone = $scope.dadosPessoais.telefone;

            if (!email) {
                if (!telefone) {
                    $scope.error.email = {
                        message: "Preencha com seu e-mail",
                        valid: false
                    };
                    $scope.error.telefone = {
                        message: "ou o seu telefone.",
                        valid: false
                    };
                    return false;
                } else {
                    $scope.error.email = {
                        message: "",
                        valid: true
                    };

                    $scope.error.telefone = {
                        message: "",
                        valid: true
                    };

                    $scope.isValid = true;
                    $scope.steps.passo3 = true;
                }
            } else {

                var validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($scope.dadosPessoais.email);

                if (!validMail) {
                    $scope.error.email = {
                        message: "O e-mail é inválido",
                        valid: false
                    };
                    return false;
                }

                $scope.error.email = {
                    message: "",
                    valid: true
                };

                $scope.error.telefone = {
                    message: "",
                    valid: true
                };

                $scope.isValid = true;
                $scope.steps.passo3 = true;
            }

        };

        /**
         * validarTipoImovel
         * @description Validar o tipo de imóvel
         */
        $scope.validarImovel = function () {


            if ($scope.dadosPessoais.all1) {
                $scope.dadosPessoais.error = "coletiva";
                storageService.save('rdStorageStep1', $scope.dadosPessoais);
                $scope.go('meujeito/error');
                return false;
            }

            if ($scope.dadosPessoais.all2) {
                $scope.dadosPessoais.error = "madeira";
                storageService.save('rdStorageStep1', $scope.dadosPessoais);
                $scope.go('meujeito/error');
                return false;
            }

            if ($scope.dadosPessoais.all3) {
                $scope.dadosPessoais.error = "patrimonio";
                storageService.save('rdStorageStep1', $scope.dadosPessoais);
                $scope.go('meujeito/error');
                return false;
            }

            if ($scope.dadosPessoais.all4) {
                $scope.dadosPessoais.error = "rural";
                storageService.save('rdStorageStep1', $scope.dadosPessoais);
                $scope.go('meujeito/error');
                return false;
            }

            if ($scope.dadosPessoais.all5) {
                $scope.dadosPessoais.error = "construcao";
                storageService.save('rdStorageStep1', $scope.dadosPessoais);
                $scope.go('meujeito/error');
                return false;
            }

            if ($scope.dadosPessoais.all6) {
                $scope.dadosPessoais.error = "";
                storageService.save('rdStorageStep1', $scope.dadosPessoais);
                $scope.steps.passo4 = true;
            }

        };

        /**
         * validarCepOuLocalizacao
         * @description Validar o preenchimentos dos campos de CEP ou localização
         */
        $scope.validarCepOuLocalizacao = function () {

            var cep = $scope.dadosPessoais.cep;
            var localizacao = $scope.dadosPessoais.localizacao;

            if (!cep) {
                if (!localizacao) {
                    $scope.error.cep = {
                        message: "Preencha o seu CEP",
                        valid: false
                    };
                    $scope.error.localizacao = {
                        message: "ou sua localização.",
                        valid: false
                    };
                    return false;
                } else {
                    $scope.error.cep = {
                        message: "",
                        valid: true
                    };

                    $scope.error.localizacao = {
                        message: "",
                        valid: true
                    };

                    $scope.isValid = true;
                    $scope.steps.passo5 = true;
                }
            } else {
                $scope.dadosPessoais.endereco = {
                    endereco: "SQN 206 Bloco H",
                    bairro: "Asa Norte",
                    cidade: "Brasília"
                }

                $scope.error.cep = {
                    message: "",
                    valid: true
                };

                $scope.error.localizacao = {
                    message: "",
                    valid: true
                };

                $scope.isValid = true;
                $scope.steps.passo5 = true;
            }

        };

        /**
         * Definir tipo de imóvel
         * @description Tipo de imóvel
         * @param {string} tipo - Casa ou Apartamento
         */
        $scope.defineImovel = function (tipo) {

            if (tipo.toLowerCase() == 'casa') {
                $scope.dadosPessoais.tipoImovel = "Casa";
            }

            if (tipo.toLowerCase() == 'apartamento') {
                $scope.dadosPessoais.tipoImovel = "Apartamento";
            }

        };

        /**
        * validarCepOuLocalizacao
        * @description Validar o preenchimentos dos campos de CEP ou localização
        */
        $scope.validarTipoImovel = function () {
            if ($scope.dadosPessoais.tipoImovel) {
                if ($scope.dadosPessoais.tipoImovel == 'Casa') {
                    $scope.isValid = true;
                    $scope.steps.passo6 = true;
                } else if ($scope.dadosPessoais.tipoImovel == 'Apartamento') {
                    $scope.isValid = true;
                    $scope.steps.passo6 = false;
                    $scope.steps.passo7 = true;
                }
            };
        };

        /**
         * Definir tipo de imóvel
         * @description Tipo de imóvel
         * @param {string} tipo - Casa ou Apartamento
         */
        $scope.defineCondominioFechado = function (valor) {

            if (valor.toLowerCase() == 'sim') {
                $scope.dadosPessoais.condominioFechado = "Sim";
            }

            if (valor.toLowerCase() == 'nao') {
                $scope.dadosPessoais.condominioFechado = "Nao";
            }

        };

        /**
         * 
         */
        $scope.validarCondominioFechado = function () {
            if ($scope.dadosPessoais.condominioFechado) {
                $scope.isValid = true;
                $scope.steps.passo7 = true;
            };
        };

        /**
         * Definir tipo de imóvel
         * @description Tipo de imóvel
         * @param {string} tipo - Casa ou Apartamento
         */
        $scope.defineMoradiaPrincipal = function (valor) {

            if (valor.toLowerCase() == 'sim') {
                $scope.dadosPessoais.moradiaPrincial = "Sim";
            }

            if (valor.toLowerCase() == 'nao') {
                $scope.dadosPessoais.moradiaPrincial = "Nao";
            }

        };

        /**
         * validarmMoradiaPrincipal
         * @returns void
         */
        $scope.validarMoradiaPrincipal = function () {
            if ($scope.dadosPessoais.moradiaPrincial) {
                $scope.isValid = true;
                $scope.steps.passo8 = true;
            };
        };

        /**
         * somarValorImovel
         * @returns void
         */
        $scope.somaValorImovel = function () {
            $scope.valorAproximado = Math.round($scope.valorAproximado + 100);
        }

        /**
         * diminuirValorImovel
         * @returns void
         */
        $scope.diminuirValorImovel = function () {
            $scope.valorAproximado = Math.round($scope.valorAproximado - 100);
        }

        /**
         * validarValorAproximado
         */
        $scope.validarValorAproximado = function () {
            if (!$scope.valorAproximado) {
                return false;
            }

            $scope.isValid = true;
            $scope.steps.passo9 = true;
        }

        /**
         * definePossuiSeguroOutraEmpresa
         */
        $scope.definePossuiSeguroOutraEmpresa = function (valor) {
            if (valor.toLowerCase() == 'sim') {
                $scope.dadosPessoais.possuiSeguroOutraEmpresa = "Sim";
            }

            if (valor.toLowerCase() == 'nao') {
                $scope.dadosPessoais.possuiSeguroOutraEmpresa = "Nao";
            }
        }

        /**
         * validarImovelComSeguroOutraEmpresa
         */
        $scope.validarImovelComSeguroOutraEmpresa = function () {
            $scope.isValid = true;
            $scope.steps.passo10 = true;

            storageService.save('rdStorageStep1', $scope.dadosPessoais);
            $scope.go('meujeito/assistencias');
            //console.log(storageService.restore('rdStorageStep1'));
        }

        /**
         * go
         * @param param - Url de destino
         */
        $scope.go = function (param) {
            $location.path(param);
        }

    }]);


})();