(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('complementaresCtrl', ['$scope', '$location', 'storageService', 'parallaxHelper', function ($scope, $location, storageService, parallaxHelper) {

        //$scope.header = parallaxHelper.createAnimator(-0.5, 150, -150);
        //$scope.grafismoLeft = parallaxHelper.createAnimator(-0.4, 0, -180, 40);
        //$scope.grafismoRight = parallaxHelper.createAnimator(-0.4, 0, -180, 40);

        $scope.passo = 3;

        $scope.dadosPessoais = {};
        $scope.dadosComplementares = {};

        $scope.passo = 3;

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
        $scope.profissoes = [
            {
                "Value": "Administração de empresas",
                "Texto": "Administração de empresas"
            },
            {
                "Value": "Administração Pública",
                "Texto": "Administração Pública"
            },
            {
                "Value": "Agronegócios",
                "Texto": "Agronegócios"
            },
            {
                "Value": "Agronomia",
                "Texto": "Agronomia"
            },
            {
                "Value": "Antropologia",
                "Texto": "Antropologia"
            },
            {
                "Value": "Arqueologia",
                "Texto": "Arqueologia"
            },
            {
                "Value": "Arquitetura",
                "Texto": "Arquitetura"
            },
            {
                "Value": "Arquivologia",
                "Texto": "Arquivologia"
            },
            {
                "Value": "Artes Cênicas",
                "Texto": "Artes Cênicas"
            },
            {
                "Value": "Artes Plásticas",
                "Texto": "Artes Plásticas"
            },
            {
                "Value": "Artes Visuais",
                "Texto": "Artes Visuais"
            },
            {
                "Value": "Astronomia",
                "Texto": "Astronomia"
            },
            {
                "Value": "Biblioteconomia",
                "Texto": "Biblioteconomia"
            },
            {
                "Value": "Biologia",
                "Texto": "Biologia"
            },
            {
                "Value": "Biomedicina",
                "Texto": "Biomedicina"
            },
            {
                "Value": "Biotecnologia",
                "Texto": "Biotecnologia"
            },
            {
                "Value": "Ciência da Computação",
                "Texto": "Ciência da Computação"
            },
            {
                "Value": "Ciências Ambientais",
                "Texto": "Ciências Ambientais"
            },
            {
                "Value": "Ciências Atuárias",
                "Texto": "Ciências Atuárias"
            },
            {
                "Value": "Ciências Biológicas",
                "Texto": "Ciências Biológicas"
            },
            {
                "Value": "Ciências Contábeis",
                "Texto": "Ciências Contábeis"
            },
            {
                "Value": "Ciências Exatas",
                "Texto": "Ciências Exatas"
            },
            {
                "Value": "Ciências Naturais",
                "Texto": "Ciências Naturais"
            },
            {
                "Value": "Ciências Políticas",
                "Texto": "Ciências Políticas"
            },
            {
                "Value": "Ciências Sociais",
                "Texto": "Ciências Sociais"
            },
            {
                "Value": "Cinema",
                "Texto": "Cinema"
            },
            {
                "Value": "Comércio Exterior",
                "Texto": "Comércio Exterior"
            },
            {
                "Value": "Comunicação Social",
                "Texto": "Comunicação Social"
            },
            {
                "Value": "Dança",
                "Texto": "Dança"
            },
            {
                "Value": "Desenho Industrial",
                "Texto": "Desenho Industrial"
            },
            {
                "Value": "Design de Games",
                "Texto": "Design de Games"
            },
            {
                "Value": "Design Gráfico",
                "Texto": "Design Gráfico"
            },
            {
                "Value": "Direito",
                "Texto": "Direito"
            },
            {
                "Value": "Economia",
                "Texto": "Economia"
            },
            {
                "Value": "Educação Física",
                "Texto": "Educação Física"
            },
            {
                "Value": "Enfermagem",
                "Texto": "Enfermagem"
            },
            {
                "Value": "Engenharia Aeronáutica",
                "Texto": "Engenharia Aeronáutica"
            },
            {
                "Value": "Engenharia Aerospacial",
                "Texto": "Engenharia Aerospacial"
            },
            {
                "Value": "Engenharia Agrícola",
                "Texto": "Engenharia Agrícola"
            },
            {
                "Value": "Engenharia Ambiental",
                "Texto": "Engenharia Ambiental"
            },
            {
                "Value": "Engenharia Biomédica",
                "Texto": "Engenharia Biomédica"
            },
            {
                "Value": "Engenharia Civil",
                "Texto": "Engenharia Civil"
            },
            {
                "Value": "Engenharia da Computação",
                "Texto": "Engenharia da Computação"
            },
            {
                "Value": "Engenharia de Agrimensura",
                "Texto": "Engenharia de Agrimensura"
            },
            {
                "Value": "Engenharia de Alimentos",
                "Texto": "Engenharia de Alimentos"
            },
            {
                "Value": "Engenharia de Controle e Automação",
                "Texto": "Engenharia de Controle e Automação"
            },
            {
                "Value": "Engenharia de Alimentos",
                "Texto": "Engenharia de Alimentos"
            },
            {
                "Value": "Engenharia de Energia",
                "Texto": "Engenharia de Energia"
            },
            {
                "Value": "Engenharia de Materiais",
                "Texto": "Engenharia de Materiais"
            },
            {
                "Value": "Engenharia de Minas",
                "Texto": "Engenharia de Minas"
            },
            {
                "Value": "Engenharia de Pesca",
                "Texto": "Engenharia de Pesca"
            },
            {
                "Value": "Engenharia de Petróleo",
                "Texto": "Engenharia de Petróleo"
            },
            {
                "Value": "Engenharia de Produção",
                "Texto": "Engenharia de Produção"
            },
            {
                "Value": "Engenharia Elétrica",
                "Texto": "Engenharia Elétrica"
            },
            {
                "Value": "Engenharia Florestal",
                "Texto": "Engenharia Florestal"
            },
            {
                "Value": "Engenharia Mecânica",
                "Texto": "Engenharia Mecânica"
            },
            {
                "Value": "Engenharia Mecatrônica",
                "Texto": "Engenharia Mecatrônica"
            },
            {
                "Value": "Engenharia Metalúrgica",
                "Texto": "Engenharia Metalúrgica"
            },
            {
                "Value": "Engenharia Naval",
                "Texto": "Engenharia Naval"
            },
            {
                "Value": "Engenharia Química",
                "Texto": "Engenharia Química"
            },
            {
                "Value": "Engenharia de Telecomunicações",
                "Texto": "Engenharia de Telecomunicações"
            },
            {
                "Value": "Estética",
                "Texto": "Estética"
            },
            {
                "Value": "Farmácia",
                "Texto": "Farmácia"
            },
            {
                "Value": "Filosofia",
                "Texto": "Filosofia"
            },
            {
                "Value": "Física",
                "Texto": "Física"
            },
            {
                "Value": "Fisioterapia",
                "Texto": "Fisioterapia"
            },
            {
                "Value": "Fonoaudiologia",
                "Texto": "Fonoaudiologia"
            },
            {
                "Value": "Fotografia",
                "Texto": "Fotografia"
            },
            {
                "Value": "Gastronomia",
                "Texto": "Gastronomia"
            },
            {
                "Value": "Geografia",
                "Texto": "Geografia"
            },
            {
                "Value": "Geologia",
                "Texto": "Geologia"
            },
            {
                "Value": "Gestão Ambiental",
                "Texto": "Gestão Ambiental"
            },
            {
                "Value": "Gestão Comercial",
                "Texto": "Gestão Comercial"
            },
            {
                "Value": "Gestão de Recursos Humanos",
                "Texto": "Gestão de Recursos Humanos"
            },
            {
                "Value": "Gestão Financeira",
                "Texto": "Gestão Financeira"
            },
            {
                "Value": "Gestão Hospitalar 2",
                "Texto": "Gestão Hospitalar 2"
            },
            {
                "Value": "Hotelaria e Turismo",
                "Texto": "Hotelaria e Turismo"
            },
            {
                "Value": "Jornalismo",
                "Texto": "Jornalismo"
            },
            {
                "Value": "Letras",
                "Texto": "Letras"
            },
            {
                "Value": "Logística",
                "Texto": "Logística"
            },
            {
                "Value": "Matemática",
                "Texto": "Matemática"
            },
            {
                "Value": "Mecânica Industrial",
                "Texto": "Mecânica Industrial"
            },
            {
                "Value": "Medicina",
                "Texto": "Medicina"
            },
            {
                "Value": "Medicina Veterinária",
                "Texto": "Medicina Veterinária"
            },
            {
                "Value": "Meteorologia",
                "Texto": "Meteorologia"
            },
            {
                "Value": "Moda",
                "Texto": "Moda"
            },
            {
                "Value": "Multimídia",
                "Texto": "Multimídia"
            },
            {
                "Value": "Música",
                "Texto": "Música"
            },
            {
                "Value": "Negócios Imobiliários",
                "Texto": "Negócios Imobiliários"
            },
            {
                "Value": "Nutrição",
                "Texto": "Nutrição"
            },
            {
                "Value": "Oceanografia",
                "Texto": "Oceanografia"
            },
            {
                "Value": "Odontologia",
                "Texto": "Odontologia"
            },
            {
                "Value": "Pedagogia",
                "Texto": "Pedagogia"
            },
            {
                "Value": "Processos Gerenciais",
                "Texto": "Processos Gerenciais"
            },
            {
                "Value": "Psicologia",
                "Texto": "Psicologia"
            },
            {
                "Value": "Publicidade e Propaganda",
                "Texto": "Publicidade e Propaganda"
            },
            {
                "Value": "Química",
                "Texto": "Química"
            },
            {
                "Value": "Rádio e TV",
                "Texto": "Rádio e TV"
            },
            {
                "Value": "Radiologia",
                "Texto": "Radiologia"
            },
            {
                "Value": "Relações Internacionais",
                "Texto": "Relações Internacionais"
            },
            {
                "Value": "Relações Públicas",
                "Texto": "Relações Públicas"
            },
            {
                "Value": "Secretariado",
                "Texto": "Secretariado"
            },
            {
                "Value": "Segurança do Trabalho",
                "Texto": "Segurança do Trabalho"
            },
            {
                "Value": "Serviço Social",
                "Texto": "Serviço Social"
            },
            {
                "Value": "Sistemas de Informação",
                "Texto": "Sistemas de Informação"
            },
            {
                "Value": "Teatro",
                "Texto": "Teatro"
            },
            {
                "Value": "Tecnologia da Informação",
                "Texto": "Tecnologia da Informação"
            },
            {
                "Value": "Teologia",
                "Texto": "Teologia"
            },
            {
                "Value": "Terapia Ocupacional",
                "Texto": "Terapia Ocupacional"
            },
            {
                "Value": "Zootecnia",
                "Texto": "Zootecnia"
            }   
        ];
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

            storageService.save('rdStorageStep1', $scope.dadosPessoais);
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