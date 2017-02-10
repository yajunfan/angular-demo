/**
 * Created by Administrator on 2017/1/6 0006.
 */
require.config({
    paths: {
        'jquery': 'jquery.min',
        'angular': 'angular',
        'echarts':'echarts.min'

    },

    shim: {
        'angular': {
            exports: 'angular'
        },

    }
});

require([
        'jquery',
        'angular',
        'echarts',
        'app'
    ],
    function ($, angular) {
        angular.element().ready(function () {
            //手工装配Angular APP
            angular.bootstrap($('#ng-app'), ['webApp']);
        });

    }
);
