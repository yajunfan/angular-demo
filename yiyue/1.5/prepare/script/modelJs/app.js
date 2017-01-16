/**
 * Created by Administrator on 2017/1/4 0004.
 */

define(['jquery',"angular","angular-route","angular-ui-router","ng-grid","angular-animate","controller"],function($, angular){
    var app = angular.module("webApp", ['ui.router','ruleCtrlMod','ngRoute']);
    app.run(function ($rootScope,$state,$stateParams) {
        $rootScope.$state=$state;
        $rootScope.$stateParams=$stateParams
    });
    app.config(function ($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider.state('homePage',{
            url:'/homePage/{creditGroup:[0-9]{1,2}}',
            views:{
                '':{
                    templateUrl:'templates/homePage.html'
                },
                'homePageTop@homePage':{
                    templateUrl:'templates/homePageTop.html'
                },
                'homePageBottom@homePage':{
                    templateUrl:'templates/homePageBottom.html'
                }
            }
        }).state('third',{
            url:'/third',
            templateUrl:'templates/dataManage.html'
        }).state('four',{
            url:'/four',
            templateUrl:'templates/four.html'
        }).state('goldModel',{
            url:'/goldModel',
            templateUrl:'templates/goldModel.html'
        }).state('login',{
            url:'/login',
            templateUrl:'templates/login.html'
        })
    });


    return app;
});

