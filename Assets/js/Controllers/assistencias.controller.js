(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('assistenciasCtrl', ['$scope', '$location', 'storageService', '$logService', 'parallaxHelper','lodash', function ($scope, $location, storageService, $logService, parallaxHelper,lodash) {

        $logService.message("assistencias Ctrl");

        $scope.header = parallaxHelper.createAnimator(-0.5, 150, -150);
        $scope.grafismoLeft = parallaxHelper.createAnimator(-0.4, 0, -140, 40);
        $scope.grafismoRight = parallaxHelper.createAnimator(-0.4, 0, -140, 40);

        $scope.assistencias = [];

        $scope.coberuraSelecionada = [];

        $scope.assistenciasSelecionadas = [];

        /**
         * diminuiRange
         * @param modelChange - Model value
         * @param range - Valor do salto
         */
        $scope.diminuiRange = function (model, id, range, limit) {
            debugger;

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
        }

        $scope.aumentaRange = function (model, id, range, limit) {
            debugger;
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

        $scope.addCoberturas = function (assistencia) {
            console.log(assistencia);
        }

        if (storageService.restore('coberturas')) {
            $scope.coberturasIniciais = JSON.parse(storageService.restore('coberturas'));
        }
        //Coberturas Básicas
        $scope.coberturas = lodash.filter($scope.coberturasIniciais.composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'COBERTURA'; });
        /*$scope.coberturas = [
            {
                "sequencial": 1,//sequencial
                "descricao": "Incêndio, queda de raio e explosão",//descricao
                "valorFranquia": 9000,//valorFranquia
                "curta": "Em caso de incêndio, explosão ou queda de raio, você poderá receber até 100% da cobertura para reparar os danos causados ao imóvel e aos seus bens.",//não existe
                "texto": "Se ocorrer um incêndio de qualquer natureza no imóvel, se um raio cair no terreno do imóvel ou uma explosão de qualquer natureza começar dentro da área de seu terreno, você poderá receber até 100% do valor dessa cobertura para reparar danos causados ao imóvel e aos seus bens.",//texto
                "coberturaLimiteCanal" : [
                    {
                    "valorMinimo": 7000,//coberturaLimiteCanal.valorMinimo
                    "valorMaximo": 50000,//coberturaLimiteCanal.ValorMaximo
                    }
                ],
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-01.svg",//não existe
                "franquia": "Não há"//não existe

            }/*,
            {
                "id": 2,
                "nome": "Danos Elétricos",
                "valor": 200000,
                "curta": "Cobre perdas e danos causados por curto-circuito, descarga elétrica e outros danos causados por queda de raio fora do terreno.",
                "completa": "Essa cobertura garante o pagamento das perdas e danos causados por curto-circuito, descarga elétrica e outros danos causados por queda de raio fora do terreno.",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-02.svg",
                "franquia": "10% do valor do sinistro com mínimo de R$ 200,00"
            },
            {
                "id": 3,
                "nome": "Furto, extorsão e roubo",
                "valor": 9000,
                "curta": "Em caso de roubo, furto ou extorsão, essa cobertura garante o pagamento dos bens levados ou danificados e dos danos causados ao imóvel.",
                "completa": "Em caso de roubo, furto ou extorsão, essa cobertura garante o pagamento dos bens levados ou danificados e dos danos causados ao imóvel. Mas, essa cobertura só pode ser contratada para sua moradia permanente.",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-03.svg",
                "franquia": "Não há"
            },
            {
                "id": 4,
                "nome": "Vendaval, furacão, ciclone, tornado, granizo, e fumaça",
                "valor": 9000,
                "curta": "Cobre perdas e danos causados por um desses eventos ou por incêndio e explosão decorrentes desses eventos.",
                "completa": "Garante o pagamento das perdas e danos causados diretamente por um desses eventos ou por incêndio e explosão decorrentes desses eventos. Também inclui os prejuízos ocorridos por penetração de água em telhados e paredes antes inexistentes.",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-04.svg",
                "franquia": "10% do valor do sinistro com mínimo de R$ 300,00"
            }
        ];*/
        //Coberturas Adicionais
        /*$scope.ofertasCobertura = [
            {
                "id": 1,
                "nome": "Roubo e furto de equipamentos portáteis",
                "valor": 9000,
                "curta": "Definir",
                "completa": "Definir",
                "valorMinimo": 7000,
                "valorMaximo": 50000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-05.svg",
                "franquia": "Não há"
            },
            {
                "id": 2,
                "nome": "Impacto de veículos terrestres e queda de aeronaves",
                "valor": 200000,
                "curta": "Cobre perdas e danos causados ao imóvel e outros bens pela colisão de veículos terrestres ou queda de aeronaves.",
                "completa": "Cobre perdas e danos causados ao imóvel e outros bens pela colisão de veículos terrestres ou queda de aeronaves, inclusive incêndio e explosão causados por eles.",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-06.svg",
                "franquia": "10% do valor do sinistro com mínimo de R$ 200"
            },
            {
                "id": 3,
                "nome": "Quebra de Vidros, Blindex, Espelhos e Mármore",
                "valor": 9000,
                "curta": "Cobre perdas e danos gerados pela quebra de vidros, espelhos, blindex, mármores e granito.",
                "completa": "Não importa se foi espontaneamente, por imprudência ou por causa da chuva, essa cobertura cobre perdas e danos gerados pela quebra de vidros, espelhos, blindex, mármores e granito.",
                "valorMinimo": 80000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-07.svg",
                "franquia": "10% do valor do sinistro com mínimo de R$ 70"
            },
            {
                "id": 4,
                "nome": "Perda ou pagamento de aluguel",
                "valor": 9000,
                "curta": "Se for necessário deixar o imóvel desocupado por causa de algum sinistro, você recebe reembolso dos aluguéis que deixar de receber ou que tiver que pagar.",
                "completa": "Se for necessário deixar o imóvel desocupado por causa de algum sinistro, você recebe reembolso dos aluguéis que deixar de receber ou que tiver que pagar.",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-08.svg",
                "franquia": "Não há"
            }
        ];*/

        $scope.validarAssistencias = function () {
            storageService.save('rdStorageStep2', $scope.assistencias);
            $scope.go('meujeito/complementares');
        }

        $scope.selecionaCobertura = function (cobertura) {

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

        $scope.ofertasAssistencias = [
            {
                "id": 1,
                "nome": "Consultoria e orientações ambientais",
                "valor": 2500,
                "curta": "Definir",
                "completa": "Definir",
                "valorMinimo": 7000,
                "valorMaximo": 50000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-20.svg",
                "franquia": "Não há"

            },
            {
                "id": 2,
                "nome": "Projetos ecoeficientes",
                "valor": 1200,
                "curta": "Definir",
                "completa": "Definir",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-19.svg",
                "franquia": "10% do valor do sinistro com mínimo de R$ 200,00"
            },
            {
                "id": 3,
                "nome": "Manutenção residencial",
                "valor": 2500,
                "curta": "Definir",
                "completa": "Definir",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-23.svg",
                "franquia": "Não há"
            },
            {
                "id": 4,
                "nome": "Assistência fogão, geladeira e lavadora",
                "valor": 1490,
                "curta": "Definir",
                "completa": "Definir",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-25.svg",
                "franquia": "10% do valor do sinistro com mínimo de R$ 300,00"
            },
            {
                "id": 5,
                "nome": "Assistência TV, vídeo e som",
                "valor": 1490,
                "curta": "Definir",
                "completa": "Definir",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-24.svg",
                "franquia": "10% do valor do sinistro com mínimo de R$ 300,00"
            }
        ];

        $scope.assistenciasInclusas = lodash.filter($scope.coberturasIniciais.composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'ASSISTENCIA'; });
        /*$scope.assistenciasInclusas = [
            {
                "id": 1,
                "nome": "Chaveiro",
                "valor": null,
                "curta": "Se a porta for arrombada, a casa for assaltada ou simplesmente você perder as chaves, a gente manda alguém até você.",
                "completa": "Se a porta for arrombada, a casa for assaltada ou simplesmente você perder as chaves, a gente manda alguém até você.",
                "utilizacao": "R$ 400,00 por ocorrência e 2 (duas) utilizações por ano.",
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-11.svg",
                "franquia": "Não há"
            },
            {
                "id": 2,
                "nome": "Eletricista",
                "valor": 200000,
                "curta": "A gente envia eletricista para reparar o que for necessário para restabelecer a energia elétrica ou solucionar problemas elétricos, dependendo do evento ocorrido.",
                "completa": "A gente envia eletricista para reparar o que for necessário para restabelecer a energia elétrica ou solucionar problemas elétricos, dependendo do evento ocorrido.",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-12.svg",
                "franquia": "10% do valor do sinistro com mínimo de R$ 200"
            },
            {
                "id": 3,
                "nome": "Hidráulica",
                "valor": 9000,
                "curta": "Cobre perdas e danos gerados pela quebra de vidros, espelhos, blindex, mármores e granito.",
                "completa": "Não importa se foi espontaneamente, por imprudência ou por causa da chuva, essa cobertura cobre perdas e danos gerados pela quebra de vidros, espelhos, blindex, mármores e granito.",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-13.svg",
                "franquia": "10% do valor do sinistro com mínimo de R$ 70"
            },
            {
                "id": 4,
                "nome": "Vidraceiro",
                "valor": 9000,
                "curta": "Em caso de emergência, enviamos vidraceiro para consertar portas ou janelas externas ou colocar tapume caso não seja possível a execução do serviço.",
                "completa": "Em caso de emergência, enviamos vidraceiro para consertar portas ou janelas externas ou colocar tapume caso não seja possível a execução do serviço.",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-14.svg",
                "franquia": "Não há"
            },
            {
                "id": 5,
                "nome": "Armazenamento e transporte de móveis",
                "valor": 9000,
                "curta": "Se for necessário deixar o imóvel desocupado por causa de algum sinistro, você recebe reembolso dos aluguéis que deixar de receber ou que tiver que pagar.",
                "completa": "Se for necessário deixar o imóvel desocupado por causa de algum sinistro, você recebe reembolso dos aluguéis que deixar de receber ou que tiver que pagar.",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-16.svg",
                "franquia": "Não há"
            },
            {
                "id": 6,
                "nome": "Cobertura provisória de telhados",
                "valor": 9000,
                "curta": "Definir",
                "completa": "Definir",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-39.svg",
                "franquia": "Não há"
            },
            {
                "id": 7,
                "nome": "Assistência Informática",
                "valor": 9000,
                "curta": "Se for necessário deixar o imóvel desocupado por causa de algum sinistro, você recebe reembolso dos aluguéis que deixar de receber ou que tiver que pagar.",
                "completa": "Se for necessário deixar o imóvel desocupado por causa de algum sinistro, você recebe reembolso dos aluguéis que deixar de receber ou que tiver que pagar.",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-17.svg",
                "franquia": "Não há"
            },
            {
                "id": 8,
                "nome": "Tira-dúvida com professor online",
                "valor": 9000,
                "curta": "Se for necessário deixar o imóvel desocupado por causa de algum sinistro, você recebe reembolso dos aluguéis que deixar de receber ou que tiver que pagar.",
                "completa": "Se for necessário deixar o imóvel desocupado por causa de algum sinistro, você recebe reembolso dos aluguéis que deixar de receber ou que tiver que pagar.",
                "valorMinimo": 8000,
                "valorMaximo": 500000,
                "icone": "../images/SVGs/ilustracoes_caixa_am_export-18.svg",
                "franquia": "Não há"
            }
        ];*/

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
        }


        $scope.go = function (param) {
            $location.path(param);
        }

    }]);


})();