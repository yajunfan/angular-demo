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
    personCtrlMod.controller("gridCtrl", ['$scope','$http','$stateParams',function ($scope,$http,$stateParams) {
        $scope.totalServerItems = 0;
        //定义分页部分的数据
        $scope.pagingOptions={
            pageSizes:[2,4,6],//定义下拉框的内容 ，显示当前页的数据个数
            pageSize:2,//定义默认下拉框的内容
            currentPage:1,//定义默认当前页
        };
        $scope.users=[
            {"id":"1", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }, {"id":"2", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }, {"id":"3", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"}, {"id":"4", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }]
        $scope.gridOptions={
            data:'users',
            enableRowSelection:false,
            columnDefs:[//定义列
                {
                    field:'id',//数据中的属性名
                    displayName:'序号' // 表头显示的内容
                },
                {
                    field:'type',
                    displayName:'类型'
                },
                {
                    field:'time',
                    displayName:'时间'
                },
                {
                    field:'name',
                    displayName:'姓名'
                },
                {
                    field:'id_card',
                    displayName:'身份证号'
                },
                {
                    field:'autoCheck',
                    displayName:'自动审核'
                },
                {
                    field:'rule',
                    displayName:'规则'
                },
                {
                    field:'company',
                    displayName:'公司'
                },
                {
                    field:'personCheck',
                    displayName:'手动审核'
                },
                {
                    field:'checkPeople',
                    displayName:'审核人'
                },
                {
                    field:'report',
                    displayName:'报告'
                }, {
                    field:'id',
                    displayName:'操作',
                    cellTemplate:'<div><a ui-sref="perDetail({perGroup:$stateParams.perGroup,perId:row.getProperty(col.field)})">详情</a></div>' //定义单元格的模板
                }
            ]


        }

    }]);
})
