/**
 * Created by Administrator on 2016/12/7 0007.
 */
    define(['jquery',"angular","angular-ui-router","event","ng-grid","controller"],function($, angular, uiGrid, event){
            var app = angular.module("webApp", ['ui.router','ruleCtrlMod']);
            app.config(function ($stateProvider,$urlRouterProvider) {
                $urlRouterProvider.otherwise('/two/1');
                $stateProvider.state('first',{
                    url:'/first',
                    templateUrl:'templates/first.html'
                }).state('two',{
                    url:'/two/{ruleGroup:[0-9]{1,2}}',
                    views:{
                        '':{
                            templateUrl:'templates/user.html'
                        },
                        'two_1@two':{
                            templateUrl:'templates/user_1.html'
                        },
                        'two_2@two':{
                            templateUrl:'templates/user_2.html'
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
                })
            });
            return app;
        })

