(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('assistenciasCtrl', ['$scope', '$location', 'storageService', '$logService', 'parallaxHelper','lodash','$filter','$cotacaoService','toastr', function ($scope, $location, storageService, $logService, parallaxHelper,lodash,$filter,$cotacaoService,toastr) {

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

        $scope.coberturaSelecionada = [];

        $scope.assistenciasSelecionadas = [];

        /**
         * diminuiRange
         * @param object - Model
         * @param range - Valor do salto
         */
        $scope.diminuiRange = function (object, range) {
            $scope.changeValue = true;

            if (object) {
                if ( Math.floor(object.cobertura.valorFranquia - range) <= object.cobertura.coberturaLimiteCanal[0].valorMinimo) {
                    return false;
                }
                
                object.cobertura.valorFranquia = Math.floor(object.cobertura.valorFranquia - range);
                return true;

            }

        }

        /**
         * aumentaRange
         * @param object - Model
         * @param range - Valor do salto
         */
        $scope.aumentaRange = function (object, range) {
            $scope.changeValue = true;
            if (object) {
                if (Math.floor(object.cobertura.valorFranquia + range) >= object.cobertura.coberturaLimiteCanal[0].valorMaximo) {
                    return false;
                }

                object.cobertura.valorFranquia = Math.floor(object.cobertura.valorFranquia + range);
                return true;

            }
        }


        if (storageService.restore('rdStorageStep1')) {
            $scope.dadosPessoais = JSON.parse(storageService.restore('rdStorageStep1'));
        }

        
        //Buscar as informações das coberturas.
        if(storageService.restore('coberturas')){
            $scope.coberturasIniciais = JSON.parse(storageService.restore('coberturas'));
        }

        $scope.coberturas = lodash.filter($scope.coberturasIniciais[0].composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'COBERTURA'; });

        $scope.coberturaSelecionada = lodash.filter($scope.coberturasIniciais[0].composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'COBERTURA' && o.tipoComposicao == 'B'; });

        $scope.validarAssistencias = function () {
            storageService.save('rdStorageStep2', $scope.assistencias);
            $scope.go('meujeito/complementares');
        }

        $scope.selecionaCobertura = function (cobertura) {

            $scope.changeValue = true;

            if (!$scope.coberturaSelecionada.length) {
                $scope.coberturaSelecionada.push(cobertura);
                return false;
            }

            var index = $scope.coberturaSelecionada.indexOf(cobertura);

            if (index == -1) {
                $scope.coberturaSelecionada.push(cobertura);
                return false;
            } else {
                $scope.coberturaSelecionada.splice(index, 1);
                return false;
            }

        }

        $scope.assistenciasInclusas = lodash.filter($scope.coberturasIniciais[0].composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'ASSISTENCIA' && o.cobertura.categoria.titulo == 'PADRAO'; });

        $scope.assistenciasSelecionadas = lodash.filter($scope.coberturasIniciais[0].composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'ASSISTENCIA' && o.cobertura.categoria.titulo == 'PADRAO'; });
        
        $scope.assistenciasInclusasBENS = lodash.filter($scope.coberturasIniciais[0].composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'ASSISTENCIA' && o.cobertura.categoria.titulo == 'BENS'; });

        $scope.assistenciasInclusasVOCE = lodash.filter($scope.coberturasIniciais[0].composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'ASSISTENCIA' && o.cobertura.categoria.titulo == 'VOCE'; });

        $scope.assistenciasInclusasAMIGOS = lodash.filter($scope.coberturasIniciais[0].composicaoOferta, function(o) { return o.cobertura.indicadorTipo == 'ASSISTENCIA' && o.cobertura.categoria.titulo == 'AMIGOS'; });

        $scope.selecionaAssistencia = function (assistencia) {
            
            $scope.changeValue = true;

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

        $scope.recalcular = function () {
            $scope.changeValue = false;
            gerarCotacao();
        }

        $scope.go = function (param) {
            $location.path(param);
        }
        

        var gerarCotacao = function() {
                 alert('Cotação');
                var data = new Date();

                var cotacao = {
                    clienteNome : $scope.dadosPessoais.nome,
                    clienteEmail : angular.isUndefined($scope.dadosPessoais.email) ? "" : $scope.dadosPessoais.email,
                    clienteTelefone :  angular.isUndefined($scope.dadosPessoais.telefone) ? "" : $scope.dadosPessoais.telefone.replace('(','').replace(')','').replace('-','').replace(' ',''),
                    dataInclusao : $filter('date')(data, 'yyyy-MM-ddTHH:mm:ssZ'),
                    canal : "WEB",
                    coberturas: [],
                    imoveis: []
                };

                //Coberturas Selecionadas
                for(var i in $scope.coberturaSelecionada) {  
                    var item = $scope.coberturaSelecionada[i]; 

                    cotacao.coberturas.push({ 
                        "codigoCoberturaSistemaOrigem" : item.cobertura.coberturaSistema[0].codigoLegado,
                        "codigoTermoSistemaOrigem"  : item.cobertura.coberturaSistema[0].codigoTermoLegado,
                        "tipoCobertura"       : item.cobertura.indicadorTipo,
                        "classificacaoCobertura" : item.cobertura.coberturaSistema[0].classificacaoLegado == 'B' ? 'BASICA' : 'ADICIONAL',
                        "valorLimiteIndenizacao" : item.cobertura.valorFranquia
                    });
                }

                //Assistencias Selecionadas
                for(var i in $scope.assistenciasSelecionadas) {  
                    var item = $scope.assistenciasSelecionadas[i]; 

                    cotacao.coberturas.push({ 
                        "codigoCoberturaSistemaOrigem" : item.cobertura.coberturaSistema[0].codigoLegado,
                        "codigoTermoSistemaOrigem"  : item.cobertura.coberturaSistema[0].codigoTermoLegado,
                        "tipoCobertura"       : item.cobertura.indicadorTipo,
                        "classificacaoCobertura" : item.cobertura.coberturaSistema[0].classificacaoLegado == 'B' ? 'BASICA' : 'ADICIONAL',
                        "valorLimiteIndenizacao" : item.cobertura.valorFranquia
                    });
                }

                cotacao.imoveis.push({
                        "logradouro" : $scope.dadosPessoais.endereco.endereco,
                        "numero" : 0,
                        "bairro" : $scope.dadosPessoais.endereco.bairro,
                        "cidade": $scope.dadosPessoais.endereco.cidade,
                        "cep" : $scope.dadosPessoais.cep.replace('-',''),
                        "uf" : $scope.dadosPessoais.endereco.codUF,
                        "proprio" : $scope.dadosPessoais.moradiaPrincial == "Sim" ? true : false,
                        "tipo" : $scope.dadosPessoais.tipoImovel.toUpperCase(),
                        "uso" : "HABITUAL",
                        "valor" : $scope.dadosPessoais.valorImovel,
                        "questionarioCotacao": {
                                "terrenoBaldio": false,
                                "condominioFechado": $scope.dadosPessoais.condominioFechado == "Sim" ? true: false,
                                "empregadoGoverno": false,
                                "possuiOutrosSegurosPropriedade": $scope.dadosPessoais.possuiSeguroOutraEmpresa == "Sim" ? true : false,
                                "possuiOutrosProdutosCaixa": false,
                                "seguroPropriaResidencia": false,
                                "economiario": false
                        }

                });

                $cotacaoService.realizacaoCotacao(cotacao)
                .then(function (result){
                    var resultado = result.data;
                    
                    var vigencias = resultado.vigencias;

                    var vigenciaFinal12Meses = lodash.filter(vigencias, function(o) { return o.mesesVigencia == 12 });

                    $scope.vigencia = vigenciaFinal12Meses;

                }, function (error){
                    $scope.changeValue = true;
                    toastr.error('Ocorreu um erro ao buscar as informações da cotação', 'Error');
                });
        };

        angular.element(document).ready(gerarCotacao);


    }]);


})();