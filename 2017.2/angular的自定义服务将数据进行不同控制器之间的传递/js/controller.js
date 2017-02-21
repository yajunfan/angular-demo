/**
 * Created by Administrator on 2017/2/17 0017.
 */
var myApp = angular.module('myApp', ['ngRoute','ngGrid']);
myApp.config(function ($routeProvider) {
    $routeProvider .when('/one',{
        templateUrl: './templates/1.html' //链接对应的html文件
    }).when('/two',{
        templateUrl:'./templates/2.html',

    }).otherwise('/one')
})

myApp.controller('myCtrl2',function ($scope,db,$http) {

  db.list('tsconfig.json').success(function (data) {
        console.log(data)
      $scope.aa=data.ID
    })

})
//
myApp.controller('myCtrl1',['$scope','db',function($scope,db){
    db.list('tsconfig.json').success(function (data) {
        console.log(data)
        $scope.aa=data.code
    })
}]);


myApp.service('db', ['$http', '$q', function($http, $q) {
    var this_ = this;
    this_.list = function (url,opt) {
        return $http.post(url);
    };
    return this_;
}]);
