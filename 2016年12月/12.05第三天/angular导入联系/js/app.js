/**
 * Created by Administrator on 2016/12/5 0005.
 */
define('app',['angular'],function (angular) {
    var app=angular.module('myApp',[]);
    app.controller('myCtrl',['$scope',function ($scope) {
        $scope.types=['全部','房贷','信用贷','车辆抵押'];
       $scope.greeting="hello word!"
    }]);
    return app;

});
