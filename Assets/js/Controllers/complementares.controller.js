(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('complementaresCtrl', ['$scope', '$location', 'storageService', 'parallaxHelper', function ($scope, $location, storageService, parallaxHelper) {

        $scope.header = parallaxHelper.createAnimator(-0.5, 150, -150);
        $scope.grafismoLeft = parallaxHelper.createAnimator(-0.4, 0, -180, 40);
        $scope.grafismoRight = parallaxHelper.createAnimator(-0.4, 0, -180, 40);

        $scope.dadosPessoais = {};
        $scope.dadosComplementares = {};

        if (storageService.restore('rdStorageStep1')) {
            $scope.dadosPessoais = JSON.parse(storageService.restore('rdStorageStep1'));
        };

        if (storageService.restore('rdStorageStep3')) {
            $scope.dadosComplementares = JSON.parse(storageService.restore('rdStorageStep3'));
        }

        if ($scope.dadosPessoais.nome) {
            $scope.dadosComplementares.nomeCompleto = $scope.dadosPessoais.nome;
        }
        if ($scope.dadosPessoais.email) {
            $scope.dadosComplementares.email = $scope.dadosPessoais.email;
        }
        if ($scope.dadosPessoais.telefone) {
            $scope.dadosComplementares.telefone = $scope.dadosPessoais.telefone;
        }

        $scope.error = {};
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
        $scope.faixaDeRenda = ['Até R$500,00', 'De R$501,00 até R$1.500,00', 'De R$1.500,01 até R$2.500,00', 'De R$1.500,01 até R$2.500,00', 'De R$2.500,01 até R$4.500,00', 'Mais de R$4.500,00'];
        $scope.validarDadosComplementares = function () {

            //Validar Nome Completo
            if (!$scope.dadosComplementares.nomeCompleto) {
                $scope.error.nomeCompleto = {
                    message: "Nome completo é obrigatório.",
                    valid: false
                };
                return false;
            } else {
                var rule = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test($scope.dadosComplementares.nomeCompleto);

                if (!rule || $scope.dadosComplementares.nomeCompleto.length < 4) {
                    $scope.error.nomeCompleto = {
                        message: "A formatação do nome não está correta.",
                        valid: false
                    };
                    return false;
                }

                $scope.error.nomeCompleto = {
                    message: "",
                    valid: true
                }
            }

            //Validar CPF
            if (!$scope.dadosComplementares.cpf) {
                $scope.error.cpf = {
                    message: "Precisamos do seu cpf",
                    valid: false
                }
                return false;
            } else {
                var rule = /^[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[\-][0-9]{2}$/.test($scope.dadosComplementares.cpf);

                if (!rule) {
                    $scope.error.cpf = {
                        message: "CPF inválido",
                        valid: false
                    }
                    return false;
                }
                $scope.error.cpf = {
                    message: "",
                    valid: true
                }
            }

            //Validar Data de Nascimento
            if (!$scope.dadosComplementares.dataNascimento) {
                $scope.error.dataNascimento = {
                    message: "Preenchimento obrigatório",
                    valid: false
                }
                return false;
            } else {
                var rule = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}/.test($scope.dadosComplementares.dataNascimento);

                if (!rule) {
                    $scope.error.dataNascimento = {
                        message: "Data de nascimento inválida",
                        valid: false
                    }
                    return false;
                }
                $scope.error.dataNascimento = {
                    message: "",
                    valid: true
                }

            }

            //Validar Profissao
            if (!$scope.dadosComplementares.profissao) {
                $scope.error.profissao = {
                    message: "Preenchimento obrigatório",
                    valid: false
                }
                return false;
            } else {
                $scope.error.profissao = {
                    message: "",
                    valid: true
                }
            }

            //Validar Faixa de Renda
            if (!$scope.dadosComplementares.faixaDeRenda) {
                $scope.error.faixaDeRenda = {
                    message: "Preenchimento obrigatório",
                    valid: false
                }
                return false;
            } else {
                $scope.error.faixaDeRenda = {
                    message: "",
                    valid: false
                }
            }

            //Validar dados caso não seja proprietário
            if ($scope.dadosComplementares.eProprietario == 'Não') {
                if (!$scope.dadosComplementares.proprietario.nomeCompleto) {
                    $scope.error.nomeCompletoProprietario = {
                        message: "Preenchimento obrigatório.",
                        valid: false
                    }
                    return false;
                } else {
                    var rule = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test($scope.dadosComplementares.proprietario.nomeCompleto);

                    if (!rule || $scope.dadosComplementares.proprietario.nomeCompleto.length < 4) {
                        $scope.error.nomeCompletoProprietario = {
                            message: "A formatação do nome não está correta.",
                            valid: false
                        };
                        return false;
                    } else {
                        $scope.error.nomeCompletoProprietario = {
                            message: "",
                            valid: true
                        };
                    }

                }

                if (!$scope.dadosComplementares.proprietario.cpf) {
                    $scope.error.cpfProprietario = {
                        message: "Preenchimento obrigatório",
                        valid: false
                    }
                    return false;
                } else {
                    $scope.error.cpfProprietario = {
                        message: "",
                        valid: true
                    };
                }

            }

            //Validar E-mail
            if (!$scope.dadosComplementares.email) {
                $scope.error.email = {
                    message: "Preenchimento obrigatório.",
                    valid: false
                }
                return false;
            } else {
                var validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($scope.dadosComplementares.email);

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
            }

            //Validar Telefone
            if (!$scope.dadosComplementares.telefone) {
                $scope.error.telefone = {
                    message: "Preenchimento obrigatório",
                    valid: false
                }
                return false;
            } else {
                $scope.error.telefone = {
                    message: "",
                    valid: true
                }
            }

            storageService.save('rdStorageStep3', $scope.dadosComplementares);
            $scope.go('meujeito/pagamento');
        };

        //Validar dados caso não seja proprietário
        if ($scope.dadosComplementares.eProprietario == 'Não') {
            if (!$scope.dadosComplementares.proprietario.nomeCompleto) {
                $scope.error.nomeCompletoProprietario = {
                    message: "Preenchimento obrigatório.",
                    valid: false
                }
                return false;
            } else {
                var rule = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test($scope.dadosComplementares.proprietario.nomeCompleto);

                if (!rule || $scope.dadosComplementares.proprietario.nomeCompleto.length < 4) {
                    $scope.error.nomeCompletoProprietario = {
                        message: "A formatação do nome não está correta.",
                        valid: false
                    };
                    return false;
                } else {
                    $scope.error.nomeCompletoProprietario = {
                        message: "",
                        valid: true
                    };
                }

            }

            if (!$scope.dadosComplementares.proprietario.cpf) {
                $scope.error.cpfProprietario = {
                    message: "Preenchimento obrigatório",
                    valid: false
                }
                return false;
            } else {
                $scope.error.cpfProprietario = {
                    message: "",
                    valid: true
                };
            }

        }

        //Validar dados caso seja imovel de correspondencia
        if ($scope.dadosComplementares.eCorrespondencia == 'Não') {
            if (!$scope.dadosComplementares.correspondencia.cepCorrespondencia) {
                $scope.error.cepCorrespondencia = {
                    message: "Preenchimento obrigatório.",
                    valid: false
                }
                return false;
            }

            $scope.error.cepCorrespondencia = {
                message: "",
                valid: true
            }

            if (!$scope.dadosComplementares.proprietario.cpf) {
                $scope.error.cpfProprietario = {
                    message: "Preenchimento obrigatório",
                    valid: false
                }
                return false;
            } else {
                $scope.error.cpfProprietario = {
                    message: "",
                    valid: true
                };
            }

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