(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('dadosPessoaisCtrl', ['$scope', '$location', 'storageService', 'parallaxHelper','$cepService','toastr', function ($scope, $location, storageService, parallaxHelper,$cepService,toastr) {
		$scope.passo = 1;

        $scope.dadosPessoais = {};

        if (storageService.restore('rdStorageStep1')) {
            $scope.dadosPessoais = JSON.parse(storageService.restore('rdStorageStep1'));
        };

        $scope.estados = [{
            "ID": "1",
            "Sigla": "AC",
            "Nome": "Acre"
        },
     {
         "ID": "2",
         "Sigla": "AL",
         "Nome": "Alagoas"
     },
     {
         "ID": "3",
         "Sigla": "AM",
         "Nome": "Amazonas"
     },
     {
         "ID": "4",
         "Sigla": "AP",
         "Nome": "Amapá"
     },
     {
         "ID": "5",
         "Sigla": "BA",
         "Nome": "Bahia"
     },
     {
         "ID": "6",
         "Sigla": "CE",
         "Nome": "Ceará"
     },
     {
         "ID": "7",
         "Sigla": "DF",
         "Nome": "Distrito Federal"
     },
     {
         "ID": "8",
         "Sigla": "ES",
         "Nome": "Espírito Santo"
     },
     {
         "ID": "9",
         "Sigla": "GO",
         "Nome": "Goiás"
     },
     {
         "ID": "10",
         "Sigla": "MA",
         "Nome": "Maranhão"
     },
     {
         "ID": "11",
         "Sigla": "MG",
         "Nome": "Minas Gerais"
     },
     {
         "ID": "12",
         "Sigla": "MS",
         "Nome": "Mato Grosso do Sul"
     },
     {
         "ID": "13",
         "Sigla": "MT",
         "Nome": "Mato Grosso"
     },
     {
         "ID": "14",
         "Sigla": "PA",
         "Nome": "Pará"
     },
     {
         "ID": "15",
         "Sigla": "PB",
         "Nome": "Paraíba"
     },
     {
         "ID": "16",
         "Sigla": "PE",
         "Nome": "Pernambuco"
     },
     {
         "ID": "17",
         "Sigla": "PI",
         "Nome": "Piauí"
     },
     {
         "ID": "18",
         "Sigla": "PR",
         "Nome": "Paraná"
     },
     {
         "ID": "19",
         "Sigla": "RJ",
         "Nome": "Rio de Janeiro"
     },
     {
         "ID": "20",
         "Sigla": "RN",
         "Nome": "Rio Grande do Norte"
     },
     {
         "ID": "21",
         "Sigla": "RO",
         "Nome": "Rondônia"
     },
     {
         "ID": "22",
         "Sigla": "RR",
         "Nome": "Roraima"
     },
     {
         "ID": "23",
         "Sigla": "RS",
         "Nome": "Rio Grande do Sul"
     },
     {
         "ID": "24",
         "Sigla": "SC",
         "Nome": "Santa Catarina"
     },
     {
         "ID": "25",
         "Sigla": "SE",
         "Nome": "Sergipe"
     },
     {
         "ID": "26",
         "Sigla": "SP",
         "Nome": "São Paulo"
     },
     {
         "ID": "27",
         "Sigla": "TO",
         "Nome": "Tocantins"
     }];

        $scope.steps = {
            passo1: true
        }
        $scope.error = {};
        $scope.valorAproximado = 70000;

        /**
         * slider
         * @description Método de configuração do slider
         */
        $scope.slider = {
            value: $scope.valorAproximado,
            options: {
                showSelectionBar: true,
                floor: 70000,
                ceil: 500000,
                step: 1000,
                translate: function (value) {
                    $scope.slider.value = value;
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

            if (!$scope.dadosPessoais.nome) {
                $scope.error.nome = {
                    message: "Precisamos do seu nome",
                    valid: false
                };
                return false;
            }

            if (!rule) {
                $scope.error.nome = {
                    message: "Preencher com seu nome completo.",
                    valid: false
                };
                return false;
            };

            var primeiroNome = $scope.dadosPessoais.nome.match(/[A-z]*/i);
            $scope.dadosPessoais.primeiroNome = primeiroNome[0];

            $scope.error.nome = {
                message: "",
                valid: true
            };

            $scope.isValid = true;
            $scope.steps.passo2 = true;
            $scope.passo = 1.1;
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
                    $scope.passo = 1.2;
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
                $scope.passo = 1.2;
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
                $scope.passo = 1.3;
            }

        };

        /**
         * validarCepOuLocalizacao
         * @description Validar o preenchimentos dos campos de CEP ou localização
         */

        $scope.consultarCep = function () {
            var cep = $scope.dadosPessoais.cep;

            var cepSemMascara = cep.replace("-", "");
            
			$cepService.consultaCEP(cepSemMascara).
                then(function (result){
                        if(result.data.codRetorno == "0"){

                            $scope.dadosPessoais.endereco = {
                                logradouro: result.data.indTipoLogradouro.trim(),
                                bairro: result.data.nomBairro.trim(),
                                cidade: result.data.nomLocalidade.trim(),
								localidade: result.data.nomLocalidade.trim(),
                                codUF: result.data.codUF
                            }
							
							$scope.dadosPessoais.cepIsValid = true;
                    

                        } else {
                            toastr.error('Ocorreu um erro ao buscar as informações do cep consultado', 'Error');
                        }

                }, function (error){
                    toastr.error('Ocorreu um erro ao buscar as informações do cep consultado', 'Error');
                })
        }

        $scope.validarCepOuLocalizacao = function () {

            var cep = $scope.dadosPessoais.cep;

            if (!cep) {
                $scope.error.cep = {
                    message: "Preencha o seu CEP",
                    valid: false
                };
            } else {

                $scope.error.cep = {
                    message: "",
                    valid: true
                };

                $scope.isValid = true;
                $scope.steps.passo5 = true;
                $scope.passo = 1.4;
			}

        };

        /**
         * Definir tipo de imóvel
         * @description Tipo de imóvel
         * @param {string} tipo - Casa ou Apartamento
         */
        $scope.defineImovel = function (tipo) {

            if (tipo.toLowerCase() == 'casa') {
                $scope.dadosPessoais.tipoImovel = "CASA";
            }

            if (tipo.toLowerCase() == 'apartamento') {
                $scope.dadosPessoais.tipoImovel = "APARTAMENTO";
            }

        };

        /**
        * validarCepOuLocalizacao
        * @description Validar o preenchimentos dos campos de CEP ou localização
        */
        $scope.validarTipoImovel = function () {
            if ($scope.dadosPessoais.tipoImovel) {
                if ($scope.dadosPessoais.tipoImovel == 'CASA') {
                    $scope.isValid = true;
                    $scope.steps.passo6 = true;
					$scope.passo = 1.5;
                } else if ($scope.dadosPessoais.tipoImovel == 'APARTAMENTO') {
                    $scope.isValid = true;
                    $scope.steps.passo6 = false;
                    $scope.steps.passo7 = true;
					$scope.passo = 1.6;
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
				$scope.passo = 1.7;
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
				$scope.passo = 1.7;
            };
        };

        /**
         * somarValorImovel
         * @returns void
         */
        $scope.somaValorImovel = function () {
            if ($scope.slider.value < 500000) {
                $scope.slider.value = Math.round($scope.slider.value + 5000);
            }
            return false;
        }

        /**
         * diminuirValorImovel
         * @returns void
         */
        $scope.diminuirValorImovel = function () {
            if ($scope.slider.value > 70000) {
                $scope.slider.value = Math.round($scope.slider.value - 5000);
            }
            return false;
        }

        /**
         * validarValorAproximado
         */
        $scope.validarValorAproximado = function () {
            if (!$scope.valorAproximado) {
                return false;
            }

            $scope.dadosPessoais.valorAproximado = $scope.slider.value;

            $scope.isValid = true;
            $scope.steps.passo9 = true;
            $scope.passo = 1.9;
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
            $scope.passo = 2;

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