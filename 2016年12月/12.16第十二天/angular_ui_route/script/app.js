/**
 * Created by Administrator on 2016/12/7 0007.
 */
define(['jquery',"angular","angular-ui-router","event","ng-grid","controller"],function($,angular,uiGrid,event){
            var app = angular.module("webApp", ['ui.router','personCtrlMod']);
            app.config(function ($stateProvider,$urlRouterProvider) {
                $urlRouterProvider.otherwise('/two');
                $stateProvider.state('first',{
                    url:'/first',
                    templateUrl:'templates/first.html'
                }).state('two',{
                    url:'/two',
                    views:{
                        '':{
                            templateUrl:'templates/two.html'
                        },
                        'two_1@two':{
                            templateUrl:'templates/two_1.html'
                        },
                        'two_2@two':{
                            templateUrl:'templates/two_2.html'
                        }
                    }
                }).state('third',{
                    url:'/third',
                    templateUrl:'templates/dataManage.html'
                })
            });

            return app;
        })

