/**
 * Created by Administrator on 2017/1/4 0004.
 */

require.config({
    paths: {
        'jquery': '../lib/jquery.min',
        'angular': '../lib/angular',
        'angular-route': '../lib/angular-route',
        'angular-ui-router': '../lib/angular-ui-router',
        'ng-grid': '../lib/ng-grid',
        'angular-animate':'../lib/angular-animate'

    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'ng-grid': {
            deps: ['jquery', 'angular'],
            exports: 'ng-grid'
        },
        'angular-ui-router': {
            deps: ['angular'],
            exports: 'angular-ui-router'
        },
        'angular-route':{
            deps: ['angular'],
            exports: 'angular-route'
        },
        'angular-animate': {
            deps: ['jquery','angular'],
            exports: 'angular-animate'
        }


    }
});

require([
        'jquery',
        'angular',
        'angular-route',
        'angular-ui-router',
        'ng-grid',
        'angular-animate',
        'app'
    ],
    function ($, angular) {
        angular.element().ready(function () {
            //手工装配Angular APP
            angular.bootstrap($('#ng-app'), ['webApp']);
        });

    }
);
