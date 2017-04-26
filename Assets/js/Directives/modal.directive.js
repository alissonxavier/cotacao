(function () {
    'use strict';

    var $app = angular.module('app');

    $app.directive('modal', function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'Templates/Directives/modal.html',
            scope : {
                display : "@"
            },
            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                $scope.$broadcast('modalEvents');
            }],
            link: function (scope, element, attr) {
                var elem = element[0];
                var $background = angular.element(elem.querySelector('.modals__background'));

                $background.on('click', function () {
                    console.log("Close!");
                });

                scope.$on('modalEvents', function (event, data) {
                    debugger;
                    console.log("Open");
                });
                

            }
        }
    });

})();