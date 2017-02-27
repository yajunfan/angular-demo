/**
 * Created by Administrator on 2017/1/16 0016.
 */
var myMod = angular.module('myMod', ['ngRoute']);
myMod.config(function ($routeProvider) {
    $routeProvider.when('/',{
        templateUrl:'c.html'
    }).when('/a',{
        templateUrl:'a.html'
    }).when('/c',{
        templateUrl:'b.html',
        controller: function ($scope) {
            $scope.arr=['javascript','html5 css3','node']
        }

    })
}).controller('myCtrl', function ($scope) {
    $scope.flag='index'
}).factory('myFactory',[myFactory]);
function myFactory() {
    var list={};
    return {
        get:function (id) {
            return list[id]
        },
        set:function (id,v) {
            list[id]=v;
        }
    }
}

// myApp.factory('')
