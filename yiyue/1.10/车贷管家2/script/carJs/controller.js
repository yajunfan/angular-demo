/**
 * Created by Administrator on 2017/1/6 0006.
 */
/**
 * Created by Administrator on 2017/1/4 0004.
 */
define(['jquery', "angular", "angular-route", "angular-ui-router", "ng-grid"], function ($, angular) {
    var carCtrlMod = angular.module('carCtrlMod', ['ngGrid']);
    carCtrlMod.controller('loginCtrl','$location',function ($scope,$location) {
        $scope.loginSucessLocation=function () {
            alert(1)
            var hre = '/main';
            $location.href=hre;
        };

    })
    carCtrlMod.controller('myIndex',function ($scope) {
        $scope.information=function () {
            alert(1)
        };
       $oH4= $('.list h4');
        $oH4.each(function (index) {
           var flag=true;
            $(this).on('click',function () {
                flag=!flag;
                $(this).nextAll().toggle('slow');
                if(flag){
                    $(this).children('i').css('transform','rotate(0deg)');
                }else{
                    $(this).children('i').css('transform','rotate(-90deg)');
                }

            })
        });
        var flag1=true;
        $('.menu').on('click',function () {
            flag1=!flag1;
            if(!flag1){
                $('.menu-left-wrap').css('width','180px');
                $('.menu span').css('transform', 'rotate(0deg)')
            }else{
                $('.menu-left-wrap').css('width','50px');
                $('.menu span').css('transform', 'rotate(-90deg)')
            }

        })
    })
    carCtrlMod.controller('assetsCtrl','$scope',function ($scope) {
            $('.listContent').css('opacity',1);
            $scope.selectedIndex = "allState";
            $scope.cutoverTab=function (type) {
                $scope.selectedIndex=type;


            }

    })
});