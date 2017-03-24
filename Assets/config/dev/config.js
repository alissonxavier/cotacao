/*jslint
 devel:true, maxerr: 10
 */

/*global
 angular
 */


(function () {

    'use strict';

    /*
     *  App Config
     *  @namespace app.config
     */

    angular
    .module('app.config', [])
    .constant('APP_CONFIG', {
        'SERVICO': {
            'WEBSERVICE': 'https://servicosdev2.caixaseguros.intranet/',
        }
    });

}());
