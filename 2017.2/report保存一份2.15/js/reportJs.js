/**
 * Created by Administrator on 2017/1/3 0003.
 */
var myApp = angular.module('myApp', ['ngRoute','ngGrid']);
 
myApp.controller("myCtrl",['$scope',"$http","$routeParams","$location",function ($scope,$http,$routeParams,$location) {
    $scope.show=function () {
        $('.fraudScore ul.first li.more').css("display","none");
        $('.fraudScore ul.two').show('slow');
    };
    $scope.blank=function () {
        $('.fraudScore ul.first li.more').css("display","block");
        $('.fraudScore ul.two').hide('slow');
    };
    $scope.showHide=function(){
    	
    	$(".first").toggle('slow');
    	 
    };
   function  getUrlParams(str) {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

   	$scope.code=getUrlParams($location.$$absUrl);
   	console.log($scope.code);
    $http.get('/dumai_ht/report/report.do?code='+$scope.code.code+'').success(function(data){ 
    	 console.log(data); 
    	$scope.basics=angular.fromJson(data.basic);
    	$scope.basicInputs=angular.fromJson(data.basic.input);
    	console.log($scope.basicInputs);
    	if(!data.cheat){
    		$scope.totals=0;
    		$scope.cheats=[];
    		
    	}else{
    		$scope.totals=data.cheat.total_score;
    		$scope.cheats=angular.fromJson(data.cheat.result);	
    	}
    	if(!data.credit){
    		$scope.creditTotals=0;
    		$scope.credits=[];
    	}else{
    		$scope.creditTotals=data.credit.total;
    		$scope.credits=angular.fromJson(data.credit.result);
    
    	}
    	if(!data.personinfo){
    		$scope.personinfos=[];
    	}else{
    		$scope.personinfos=angular.fromJson(data.personinfo);
    	}

    	console.log($scope.personinfos);
    });
}]).directive('myDirective', function() {
    return {
        restrict: 'ECMA',
        link:function(scope,element,attrs){
        	element.on('click',function(){
        		element.nextAll().toggle('slow');      		
        	});
        	
      
        }
    };
});
myApp.filter('aa',function () {
//  定义过滤器的方法是return 后面的方法
  return function (data) {
      return parseFloat(data)/100;
  };
});



