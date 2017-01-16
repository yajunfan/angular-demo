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
});