/**
 * Created by Administrator on 2016/12/7 0007.
 */
define(['jquery',"angular","angular-ui-router","event","ng-grid","controller"],function($,angular,uiGrid,event){
            var app = angular.module("webApp", ['ui.router','personCtrlMod']);
            app.config(function ($stateProvider,$urlRouterProvider) {
                $urlRouterProvider.otherwise('/first');
                $stateProvider.state('first',{
                    url:'/first',
                    templateUrl:'templates/first.html'
                }).state('two',{
                    url:'/two/{perGroup:[0-9]{1,2}}',
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
                }).state('perAdd',{
                    url:'/perAdd',
                    templateUrl:'templates/perAdd.html'
                }).state('perDetail',{
                    url:'/perDetail/:perGroup/:perId',
                    templateUrl:'templates/perDetail.html'
                })
            });
            // event.fn();
            return app;
        })

