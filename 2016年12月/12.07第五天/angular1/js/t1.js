/**
 * Created by Administrator on 2016/12/7 0007.
 */
define(['../../../12.05第三天/angular2/js/jquery','angular','angular-route','ng-grid'],function ($, angular) {
    function fn() {
        alert("hello world")
        var myGrid=angular.module('myGrid', []);
        myGrid.controller('members',['$scope','$filter',function ($scope,$filter) {

        }]);

        return myGrid;

    }
    return {fn:fn}
})