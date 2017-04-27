(function () {
    'use strict';

    var $app = angular.module('app');

    $app.controller('pagamentoCtrl', ['$scope', '$location', 'storageService','$filter','$propostaService','toastr', function ($scope, $location, storageService,$filter,$propostaService,toastr) {

        if (storageService.restore('rdStorageStep1') && storageService.restore('rdStorageStep3') 
        && storageService.restore('coberturas') && storageService.restore('assistencias') 
        && storageService.restore('cotacao') && storageService.restore('ramo')
        && storageService.restore('descricaoproduto')) {
            $scope.dadosPessoais = JSON.parse(storageService.restore('rdStorageStep1'));
            $scope.dadosComplementares = JSON.parse(storageService.restore('rdStorageStep3'));
            $scope.coberturas = JSON.parse(storageService.restore('coberturas'));
            $scope.assistencias = JSON.parse(storageService.restore('assistencias'));
            $scope.cotacao = JSON.parse(storageService.restore('cotacao'));
            $scope.ramo = JSON.parse(storageService.restore('ramo'));
            $scope.descricaoproduto = JSON.parse(storageService.restore('descricaoproduto'));
        };

        $scope.passo = 4;

/**
 * go
 * @param param - Url de destino
 */
        $scope.go = function (param) {
            $location.path(param);
        }

        $scope.gerarProposta = function(){
            var data = new Date();
            var mesesVigencias = $scope.cotacao.vigencias[0].mesesVigencia;
            var dataVigenciaFim = (new Date()).setMonth(data.getMonth() + mesesVigencias);
            var dateArray = $scope.dadosComplementares.dataNascimento.split("/");
            var dataNascimento = new Date(dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0] + ' 00:00:00-0300')
            var proposta = {
                numeroProtocolo : "12418901",//Verificar se será necessário executar o serviço no salesforce
                numeroCotacao: $scope.cotacao.id,
                dataVenda: $filter('date')(data, 'yyyy-MM-ddTHH:mm:ssZ'),
                anosCobertura: $scope.cotacao.vigencias[0].mesesVigencia/12,//pegar essa informação do ano selecionado TODO
                dataVigenciaInicio: $filter('date')(data, 'yyyy-MM-ddTHH:mm:ssZ'),// new date
                dataVigenciaFim: $filter('date')(dataVigenciaFim, 'yyyy-MM-ddTHH:mm:ssZ'),// new date + anoscobertura
                numeroRamo: $scope.ramo.codigo, //pegar a informação do ramo do serviço do produto
                codigoCanal: 1, //fixo 1
                descricaoProduto: $scope.descricaoproduto,//pegar a informação do campo descrição do produto do serviço do produto
                valorPremioTotalMes: $scope.cotacao.vigencias[0].valorPremioMensal,//pegar essa informação do ano selecionado TODO
                valorTaxaIofMes: $scope.cotacao.vigencias[0].valorTaxas, //pegar essa informação do ano selecionado TODO
                valorPremioTotalSeguro: $scope.cotacao.vigencias[0].valorTotal,//pegar essa informação do ano selecionado TODO
                cliente: {
                    nome: $scope.dadosComplementares.nomeCompleto,
                    telefone: $scope.dadosComplementares.telefone.replace(/\(/g,"").replace(/\)/g,"").replace(/\-/g,"").replace(/\ /,""),
                    cpf: $scope.dadosComplementares.cpf.replace(/\./g , "").replace(/-/g,""),
                    nacionalidade: "Brasileiro",
                    email: $scope.dadosComplementares.email,
                    profissao: $scope.dadosComplementares.profissao.Value,
                    rendaIndividual: 500,//$scope.dadosComplementares.faixaDeRenda,
                    dataNascimento: $filter('date')(dataNascimento, 'yyyy-MM-ddTHH:mm:ssZ'),
                    sexo: $scope.dadosComplementares.sexo == "Masculino" ? "M" : "F",
                    enderecoLogradouro: angular.isUndefined($scope.dadosComplementares.eCorrespondencia) ? $scope.dadosPessoais.endereco.logradouro : $scope.dadosComplementares.correspondencia.logradouro,
                    enderecoNumero: angular.isUndefined($scope.dadosComplementares.eCorrespondencia) ? $scope.dadosPessoais.endereco.numero : $scope.dadosComplementares.correspondencia.numero,
                    enderecoBairro: angular.isUndefined($scope.dadosComplementares.eCorrespondencia) ? $scope.dadosPessoais.endereco.bairro : $scope.dadosComplementares.correspondencia.bairro,
                    enderecoCidade: angular.isUndefined($scope.dadosComplementares.eCorrespondencia) ? $scope.dadosPessoais.endereco.cidade : $scope.dadosComplementares.correspondencia.cidade,
                    enderecoCep: angular.isUndefined($scope.dadosComplementares.eCorrespondencia) ? $scope.dadosPessoais.cep.replace('-','') : $scope.dadosComplementares.correspondencia.cep.replace('-',''),
                    enderecoUF: angular.isUndefined($scope.dadosComplementares.eCorrespondencia) ? $scope.dadosPessoais.endereco.codUF : $scope.dadosComplementares.correspondencia.estado
                    
                },
                beneficiario: {
                    nome: angular.isUndefined($scope.dadosComplementares.proprietario) ? $scope.dadosComplementares.nomeCompleto : $scope.dadosComplementares.proprietario.nomeCompleto,
                    cpf:  angular.isUndefined($scope.dadosComplementares.proprietario) ? $scope.dadosComplementares.cpf.replace('.','').replace('-','') : $scope.dadosComplementares.proprietario.cpf.replace('.','').replace('-','')
                },
                imovel: {
                    enderecoLogradouro: $scope.dadosPessoais.endereco.endereco,
                    enderecoNumero: $scope.dadosPessoais.endereco.numero,
                    enderecoBairro: $scope.dadosPessoais.endereco.bairro,
                    enderecoCidade: $scope.dadosPessoais.endereco.cidade,
                    enderecoCEP: $scope.dadosPessoais.cep.replace(/-/g,""),
                    enderecoUF: $scope.dadosPessoais.endereco.codUF,
                    imovelProprio: angular.isUndefined($scope.dadosComplementares.proprietario) ? "S" : "N",//verificar de onde pegar essa informação
                    tipoImovel: $scope.dadosPessoais.tipoImovel,
                    usoImovel: "Habitual",//valor fixo
                    valor: $scope.dadosPessoais.valorImovel
                },
                assistencias: [],
                coberturas: [],
                cartaoCredito: {
                    ultimosQuatroDigitosCartao: $scope.card.number.substring($scope.card.number.length,$scope.card.number.length-4),
                    nomeTitular: $scope.pagamento.titular,
                    bandeira: "MASTERCARD"//verificar de onde pegar essa informacao
                },
                formaPagamento: {
                    numeroParcelas: $scope.pagamento.parcelas,
                    valorPago: $scope.cotacao.vigencias[0].valorTotal,//pegar essa informação do ano selecionado TODO
                    tipoPagamento: "CARTAO"
                }

            };

            for(var i in $scope.assistencias) {
                var item = $scope.assistencias[i];

                proposta.assistencias.push({
                    titulo: item.descricao,
                    codigoCoberturaSistemaOrigem : item.coberturaSistema[0].codigoLegado,
                    codigoTermoSistemaOrigem  : item.coberturaSistema[0].codigoTermoLegado,
                    tipoCobertura       : item.indicadorTipo,
                    classificacaoCobertura : item.coberturaSistema[0].classificacaoLegado == 'B' ? 'BASICA' : 'ADICIONAL',
                    valorLimiteIndenizacao : item.valorFranquia
                });

            }

            for(var i in $scope.coberturas) {
                var item = $scope.coberturas[i];

                proposta.coberturas.push({
                    titulo: item.descricao,
                    codigoCoberturaSistemaOrigem : item.coberturaSistema[0].codigoLegado,
                    codigoTermoSistemaOrigem  : item.coberturaSistema[0].codigoTermoLegado,
                    tipoCobertura       : item.indicadorTipo,
                    classificacaoCobertura : item.coberturaSistema[0].classificacaoLegado == 'B' ? 'BASICA' : 'ADICIONAL',
                    valorLimiteIndenizacao : item.valorFranquia
                });

            }

            $propostaService.realizacaoProposta(proposta)
                .then(function (result){

                    var resultado = result.data;

                    storageService.save('proposta', resultado);
                    
                    $scope.go('meujeito/sucesso');

                }, function (error){
                    $scope.changeValue = true;
                    toastr.error('Ocorreu um erro ao realizar a proposta', 'Error');
                });

            
        }

    }]);


})();