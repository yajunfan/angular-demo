/**
 * Created by Administrator on 2016/12/7 0007.
 */
define(['jquery',"angular",
    'ng-grid'],function($,angular){
    // return angular.module("webapp",['ui.router','ngStorage','ngSanitize','webapp.controllers','webapp.directive']);
        var app = angular.module("webApp", ['ngGrid'])
        app.controller("myCtrl", function ($scope) {
            $scope.users=[{id:'1',type:'房贷',time:'2016-11-10 11:49:28',name:'廖蓉蓉',id_card:'456546345631514',autoCheck:
                '未审核',rule:'0',company:'滴滴',personCheck:'未审核',checkPeople:'张三',report:'查看',play:'删除'},{id:'1',type:'房贷',time:'2016-11-10 11:49:28',name:'廖蓉蓉',id_card:'456546345631514',autoCheck:
                '未审核',rule:'0',company:'滴滴',personCheck:'未审核',checkPeople:'张三',report:'查看',play:'删除'},{id:'1',type:'房贷',time:'2016-11-10 11:49:28',name:'廖蓉蓉',id_card:'456546345631514',autoCheck:
                '未审核',rule:'0',company:'滴滴',personCheck:'未审核',checkPeople:'张三',report:'查看',play:'删除'},{id:'1',type:'房贷',time:'2016-11-10 11:49:28',name:'廖蓉蓉',id_card:'456546345631514',autoCheck:
                '未审核',rule:'0',company:'滴滴',personCheck:'未审核',checkPeople:'张三',report:'查看',play:'删除'},{id:'1',type:'房贷',time:'2016-11-10 11:49:28',name:'廖蓉蓉',id_card:'456546345631514',autoCheck:
                '未审核',rule:'0',company:'滴滴',personCheck:'未审核',checkPeople:'张三',report:'查看',play:'删除'},{id:'1',type:'房贷',time:'2016-11-10 11:49:28',name:'廖蓉蓉',id_card:'456546345631514',autoCheck:
                '未审核',rule:'0',company:'滴滴',personCheck:'未审核',checkPeople:'张三',report:'查看',play:'删除'},{id:'1',type:'房贷',time:'2016-11-10 11:49:28',name:'廖蓉蓉',id_card:'456546345631514',autoCheck:
                '未审核',rule:'0',company:'滴滴',personCheck:'未审核',checkPeople:'张三',report:'查看',play:'删除'},];
            $scope.pagingOptions={
                pageSizes:[1,10,20],
//            设置下拉空的内容
                pageSize:1,
//            设置下拉框的默认值
                currentPage:1
//            设置当前页的默认值
            };
            $scope.gridOptions={
                data:'users',//要显示的数据，只能是字符串
                enableRowSelection:false,//不让选中行
                multiSelect:false,//不可以复选
                enableCellSelection:true,//可以选中单元格
                enableCellEdit:true,//可编辑单元格
                enablePinning:true,//单元格可固定
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
                        field:'time',//数据中的属性名
                        displayName:'时间' // 表头显示的内容
                    },
                    {
                        field:'name',//数据中的属性名
                        displayName:'姓名' // 表头显示的内容
                    }, {
                        field:'id_card',//数据中的属性名
                        displayName:'身份证号' // 表头显示的内容
                    }, {
                        field:'autoCheck',//数据中的属性名
                        displayName:'自动审核' // 表头显示的内容
                    }, {
                        field:'rule',//数据中的属性名
                        displayName:'规则' // 表头显示的内容
                    }, {
                        field:'company',//数据中的属性名
                        displayName:'公司' // 表头显示的内容
                    },

                    {
                        field:'personCheck',//数据中的属性名
                        displayName:'手动审核' // 表头显示的内容
                    }, {
                        field:'checkPeople',//数据中的属性名
                        displayName:'审核人' // 表头显示的内容
                    }, {
                        field:'report',//数据中的属性名
                        displayName:'报告' // 表头显示的内容
                    }, {
                        field:'play',//数据中的属性名
                        displayName:'操作' // 表头显示的内容
                    }





                ],
                enablePaging:true,//显示分页文本框
                showFooter:true,//显示页脚
                pagingOptions:$scope.pagingOptions,//设置分页数据
            }
        })
        return app;


})