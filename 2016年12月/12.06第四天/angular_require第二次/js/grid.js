/**
 * Created by Administrator on 2016/12/6 0006.
 */
define('grid',['angular','jquery','ng-grid'],function ($scope,$,ngGrid){
    var grid=angular.module('myGrid', ['ngGrid']);
    return {
        grid: grid
    };
});
