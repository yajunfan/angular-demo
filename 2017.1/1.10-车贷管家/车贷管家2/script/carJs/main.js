/**
 * Created by Administrator on 2017/1/6 0006.
 */
require.config({
    paths: {
        'jquery': '../lib/jquery.min',
        'angular': '../lib/angular',
        'angular-route': '../lib/angular-route',
        'angular-ui-router': '../lib/angular-ui-router',
        'ng-grid': '../lib/ng-grid',
        'echarts':'../lib/echarts.min',
        'china':'../lib/china',
        'jquery-cityselect':'../lib/jquery.cityselect',
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'jquery.cityselect': {
            deps: ['jquery']
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
        }
    }
});

require([
        'jquery',
        'angular',
        'angular-route',
        'angular-ui-router',
        'ng-grid',
        'echarts',
        'china',
        'jquery-cityselect',
        'app'
    ],
    function ($, angular) {
        angular.element().ready(function () {
            //手工装配Angular APP
            angular.bootstrap($('#ng-app'), ['webApp']);
        });

    }
);
