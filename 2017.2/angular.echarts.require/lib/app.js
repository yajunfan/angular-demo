/**
 * Created by Administrator on 2017/1/6 0006.
 */
define(['jquery',"angular","echarts","controller"],function($, angular,echarts){
    var app = angular.module("webApp", ["echartsCtrlMod"]);
    app.factory('echarts',function(){
        return echarts;
    });
    // app.controller('myCtrl',function ($scope) {
    //     console.log($scope)
    // })

    return app;
});