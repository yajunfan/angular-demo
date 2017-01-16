/**
 * Created by Administrator on 2016/12/7 0007.
 */
require.config({
    paths: {
        'jquery': 'lib/jquery.min',
        'angular': 'lib/angular',
        'angular-route': 'lib/angular-route',
        'ng-grid': 'lib/ng-grid'

    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'ng-grid': {
            deps: ['jquery', 'angular'],
            exports: 'ng-grid'
        },
        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        }
    }
});

require([
        'jquery',
        'angular',
        'angular-route',
        'ng-grid',
        'app'
    ],
    function ($, angular) {
        angular.element().ready(function () {
            //手工装配Angular APP
            angular.bootstrap($('#ng-app'), ['webApp']);
        });

    }
);