/**
 * Created by Administrator on 2016/12/7 0007.
 */
require.config({
    paths:{
        //一些库文件
        'jquery': 'lib/jquery.min',
        'angular': 'lib/angular',
        'angular-route': 'lib/angular-ui-router',
        //js文件
        // 'bootstrap': "lib/bootstrap",
        // 'mainController': "controller/mainController",
        'ng-grid':'lib/ng-grid',
        // 'app': "app",
        // 'router': "router"
    },

shim:{
    'angular':{
        exports:'angular'
    },
    'ng-grid':{
        deps:['jquery','angular'],
        exports:'ng-grid'
    },
    'angular-route':{
        deps:['angular'],
            exports: 'angular-route'
    }
}
    // deps:['bootstrap']
//     urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用
});

require([
        'jquery',
        'angular',
        // 'mainController',
        'angular-route',
        'ng-grid',
        'app',
        // 'controller/controller1',
        // 'controller/controller2'

    ],
    function ($, angular) {
        angular.element().ready(function () {
            //手工装配Angular APP
            // var n=angular.bootstrap('document', ['webApp']);
           angular.bootstrap($('#ng-app'), ['webApp']);

            //关闭启动画面
            // $('.splash-window').remove();
        });

        // mainController.add()
    }
);