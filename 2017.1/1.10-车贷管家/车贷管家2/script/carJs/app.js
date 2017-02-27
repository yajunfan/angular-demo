/**
 * Created by Administrator on 2017/1/6 0006.
 */
define(['jquery',"angular","echarts","angular-route","angular-ui-router","ng-grid","controller","china","jquery-cityselect"],function($, angular,echarts){
    var app = angular.module("webApp", ['ui.router','carCtrlMod','ngRoute']);
    app.run(function ($rootScope,$routeParams) {
        $rootScope.$routeParams=$routeParams;
        $rootScope.$on('$routeChangeStart', function(event, next, current){
        })
    });
    app.factory('echarts',function(){
        return echarts;
    });
    app.config(function ($routeProvider) {
        $routeProvider .when('/',{
            templateUrl: './template/index.html' //链接对应的html文件
        }).when('/assets',{
            templateUrl:'./template/assets.html'
        }).when('/followPosition',{
            templateUrl:'./template/followPosition.html'

        }).when('/trend',{
            templateUrl:'./template/trend.html'

        }).when('/statistics',{
            templateUrl:'./template/Statistics.html'

        }).when('/carChase',{
            templateUrl:'./template/carChase.html'

        }).when('/carChase/changeChaseRecord',{
            templateUrl:'./template/changeChaseRecord.html'

        }).when('/carChase/detailChaseRecord',{
            templateUrl:'./template/detailChaseRecord.html'

        }).when('/carChase/addChase',{
            templateUrl:'./template/addChase.html'

        }).when('/carChase/logCar',{
            templateUrl:'./template/logCar.html'

        }).when('/profileData',{
            templateUrl:'./template/profileData.html'

        }).when('/profileData/customer',{
            templateUrl:'./template/customer_list.html'

        }).when('/profileData/customer/change',{
            templateUrl:'./template/customer_change.html'

        }).when('/profileData/customer/detail',{
            templateUrl:'./template/customer_detail.html'

        }).when('/cusManagement',{
            templateUrl:'./template/cusManagement.html'

        }).when('/equCenter',{
            templateUrl:'./template/equCenter.html'

        }).when('/regManagement',{
            templateUrl:'./template/regManagement.html'

        }).when('/eventCenter',{
            templateUrl:'./template/eventCenter.html'

        }).when('/accManagement',{
            templateUrl:'./template/accManagement.html'

        }).when('/annInform',{
            templateUrl:'./template/annInform.html'

        }).when('/workManagement',{
            templateUrl:'./template/workManagement.html'

        }).when('/trainCenter',{
            templateUrl:'./template/trainCenter.html'

        }).otherwise('/');

    })
    return app;
});