/**
 * Created by Administrator on 2016/12/6 0006.
 */

var myMod = angular.module('myMod', ['ngRoute', 'myGrid']);
myMod.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'temples/index3.html',
        controller: function ($scope) {
            $scope.types = ['全部', '房贷', '信用贷', '车辆抵押'];
            $scope.stas = ['全部', '未审核', '通过', '拒绝', '错误'];
        }
    }).when('/flower', {
        templateUrl: 'temples/flower.html',
        controller:function ($scope) {
            
        }
    }).when('/setting', {
        templateUrl: 'temples/setting.html',
    })
}).controller('myCtrl', function ($scope) {
    $scope.flag = 'index'
})
