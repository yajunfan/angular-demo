/**
 * Created by Administrator on 2016/12/7 0007.
 */
require.config({
    paths: {
        'jquery': 'lib/jquery.min',
        'angular': 'lib/angular',
        'angular-ui-router': 'lib/angular-ui-router',
        'ng-grid': 'lib/ng-grid',
        // 'bootstrap':'lib/bootstrap'
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
        // 'bootstrap':{
        //     deps: ['jquery']
        // }
    }
});

require([
        'jquery',
        'angular',
        'angular-ui-router',
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