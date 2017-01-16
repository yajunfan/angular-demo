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
        $routeProvider .when('/main',{
            templateUrl: './template/main.html', //链接对应的html文件
            controller:'loginCtrl'
        }).when('/1',{
            templateUrl:'./template/1.html'
        }).when('/2',{
            templateUrl:'./2.html'
        }).when('/overduePayment',{
            templateUrl:'./tem/3.html'

        }).otherwise('/');

    })
    return app;
});