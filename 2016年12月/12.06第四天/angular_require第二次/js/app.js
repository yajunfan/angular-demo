/**
 * Created by Administrator on 2016/12/6 0006.
 */
define('app',['angular','grid'],function (angular) {
    var myApp=angular.module('myApp',[])
    myApp.controller('myCtrl',function ($scope) {
        $scope.a="11"
    })

})