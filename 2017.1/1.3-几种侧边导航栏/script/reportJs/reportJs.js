/**
 * Created by Administrator on 2017/1/3 0003.
 */
var myApp = angular.module('myApp', []);
myApp.controller("myCtrl",['$scope',function ($scope) {
    $scope.show=function () {
        $('.fraudScore ul.first li.more').css("display","none");
        $('.fraudScore ul.two').show('slow');
    };
    $scope.blank=function () {
        $('.fraudScore ul.first li.more').css("display","block");
        $('.fraudScore ul.two').hide('slow');
    }


}]);

