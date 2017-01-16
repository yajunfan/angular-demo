/**
 * Created by Administrator on 2016/12/8 0008.
 */
define(['jquery',"angular","angular-ui-router","ng-grid"],function ($,angular) {
    var personCtrlMod = angular.module('personCtrlMod', ['ngGrid']);
    personCtrlMod.controller('loginCtrl',['$scope','$http','$state',function ($scope,$http,$state) {
        $scope.login=function () {
            $scope.userInfo={
                name:$scope.user_name,
                password:$scope.user_password
            };
                $scope.user=[{"email":"fyj@163.com","password":"qwer00"}]
                angular.forEach($scope.user,function (item) {
                    if(item.email==$scope.userInfo.name&&item.password==$scope.userInfo.password){
                        //$state.go可以实现页面的跳转， $state是ui.router的一个服务
                        $state.go('two',{perGroup:1});
                        return;
                    }
                    alert('请先注册')
                })
        }
    }]);

})
