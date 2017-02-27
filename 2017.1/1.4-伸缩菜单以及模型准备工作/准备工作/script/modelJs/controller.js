/**
 * Created by Administrator on 2017/1/4 0004.
 */
define(['jquery',"angular","angular-route","angular-ui-router","ng-grid",'angular-animate'],function ($,angular) {
    var ruleCtrlMod = angular.module('ruleCtrlMod', ['ngGrid']);
    ruleCtrlMod.controller('loginCtrl',['$scope','$http','$state',function ($scope,$http,$state) {
        $scope.login=function () {
            $scope.userInfo={
                name:$scope.user_name,
                password:$scope.user_password
            };
            $scope.user=[{"email":"fyj@163.com","password":"qwer00"}];
            angular.forEach($scope.user,function (item) {
                if(item.email==$scope.userInfo.name&&item.password==$scope.userInfo.password){
                    $('.wrapContainer').fadeOut('slow',function () {
                        $state.go('homePage');
                    });

                    return;
                }
                alert('请先注册')
            })
        }
    }]);
    ruleCtrlMod.controller('myMenu',['$scope','$http','$state',function ($scope,$http,$state) {
        $scope.importLists=['贷前审核','贷中跟踪','逾期催款'];
        $scope.shrinkage=function () {
            if(parseFloat($('.ribbon').css('left')) == 0){
                $('.ribbon').css({"left":"-1050px","transition":"0.5s all"});
                $('.arrow span').removeClass('off').addClass('on');
            }else{
                $('.ribbon').css({"left":"0px","transition":"0.5s all"});
                $('.arrow span').removeClass('on').addClass('off');
            }
        };
        $scope.getName=function (e) {
           e=e||window.event;
          $('.contentDisplay').html($(e.target).children().html());
        }
    }]);
});