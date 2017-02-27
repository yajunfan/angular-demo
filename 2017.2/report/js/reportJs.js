/**
 * Created by Administrator on 2017/1/3 0003.
 */
var myApp = angular.module('myApp', ['ngRoute','ui.router','ngGrid']);
myApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider.state('litigation',{
        //    首页为 login
        url:'/litigation',
        templateUrl:'./templates/1.html'
        //    需要写一个login.html
    }).state('login',{
        //    新增页为 studAdd
        url:'/login',
        templateUrl:'./templates/login.html'
    })
});
myApp.controller('myCtrl2',['$scope','$http',function($scope,$http){
    $scope.pagingOptions={
        pageSizes:[2,4,6],//定义下拉框的内容 ，显示当前页的数据个数
        pageSize:2,//定义默认下拉框的内容
        currentPage:1,//定义默认当前页
    };
    $scope.users=[{ "name_zh":"认证结果", "value":"查询成功_有数据"},
        {"name_zh":"初次登记期", "value":"2010/9/20"},
        {"name_zh":"车辆类型", "value":"小型普通客车"}];
    $scope.gridOptions={
        data:'users',
        columnDefs:[//定义列

            {
                field:'name_zh',
                displayName:'类别',
            },
            {
                field:'value',
                displayName:'结果'
            }
        ],
    };
    $scope.aaa=111;

}])
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
    $scope.data = [{id:1,value:'第一页'},{id:2,value:'第二页'}];
    $scope.selectValue = $scope.data[0].id;
    $scope.arys=["涉法","通信运营商数据","银行卡验证","车辆基本信息","同住人信息","公积金","犯罪"];
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
    $scope.change=function () {
        alert($scope.selectValue)
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
    $scope.pagingOptions={
        pageSizes:[2,4,6],//定义下拉框的内容 ，显示当前页的数据个数
        pageSize:2,//定义默认下拉框的内容
        currentPage:1,//定义默认当前页
    };
    $scope.users=[{"id":"1", "type":"银行卡实名", "time":"未命中"}, {"id":"2", "type":"房贷", "time":"正常"}, {"id":"3", "type":"银行及非银机构失联名单", "time":"正常"}, {"id":"4", "type":"房贷", "time":"正常" }, {"id":"5", "type":"房贷", "time":"正常"}, {"id":"6", "type":"房贷", "time":"正常"}, {"id":"7", "type":"房贷", "time":"正常"}];
    $scope.gridOptions={
        data:'users',
        columnDefs:[//定义列
            {
                field:'id',
                displayName:'序号',
                 width:100

            },
            {
                field:'type',
                displayName:'反欺诈规则',
                width:550
            },
            {
                field:'time',
                displayName:'结果',
                 width:100
            }
        ],
    };
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



