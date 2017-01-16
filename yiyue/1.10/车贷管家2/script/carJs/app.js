/**
 * Created by Administrator on 2017/1/6 0006.
 */
define(['jquery',"angular","angular-route","angular-ui-router","ng-grid","controller"],function($, angular){
    var app = angular.module("webApp", ['ui.router','carCtrlMod','ngRoute']);
    app.run(function ($rootScope,$routeParams) {
        $rootScope.$routeParams=$routeParams;
        $rootScope.$on('$routeChangeStart', function(event, next, current){
        })
    });

    app.config(function ($routeProvider) {
        $routeProvider .when('/',{
            templateUrl: './template/index.html' //链接对应的html文件
        }).when('/assets',{
            templateUrl:'./template/assets.html'
        }).when('/2',{
            templateUrl:'./template/2.html'

        }).otherwise('/');

    })
    return app;
});