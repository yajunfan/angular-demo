/**
 * Created by Administrator on 2017/1/9 0009.
 */
var app = angular.module('ngRouteWxCtb', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/0', {
            templateUrl: '0.html',
            controller: 'loginCtrl'
        }).when('/1', {
            templateUrl: '1.html',
            controller: '1Ctrl'
        }).when('/2', {
            templateUrl: '2.html',
            controller: '2Ctrl'
        }).otherwise({redirectTo: '/login'});
    }]);
app.controller('loginCtrl', function ($scope, $http, $interval, $cookies, $location, userService) {

    $scope.LoginSucessLocation = function () {
        var hre = './main#/1';
        location.href = hre;
    }

})
