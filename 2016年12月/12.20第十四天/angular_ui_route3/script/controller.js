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
    personCtrlMod.controller("myRule", ['$scope',function ($scope) {
        $scope.rules=[
            {"id":"1","name":"银行卡实名验证YF","proportion":"20","describe":"银行卡实名验证，验证银行卡号、姓名、身份证号是否一致","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"2","name":"手机号实名","proportion":"20","describe":"手机号是否为本人手机号","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"3","name":"司法涉诉信息","proportion":"20","describe":"查询是否有涉案信息","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"4","name":"短信催收名单查询","proportion":"20","describe":"查询是否存在连续三个月短信催收情况","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"5","name":"电话催收黑名单查询","proportion":"20","describe":"查询手机号码是否连续接到催收电话","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"6","name":"银行及非银机构失联名单查询","proportion":"20","describe":"查询客户是否命中银行及非银机构失联名单","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除"}, {"id":"7","name":"银行及非银机构逾期情况","proportion":"10","describe":"查询客户是否在银行及非银机构有过逾期","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除"}];
        $scope.editRule=function () {
            $(".addRuleInfo")[0].style.display="block";
            $(".addRuleInfo").children(".right").on('click',function () {
                $(".addRuleInfo")[0].style.display="none";
            })
            $(".addRuleInfo").find('.getBack').on('click',function () {
                $(".addRuleInfo")[0].style.display="none";
            })
        };
        $scope.refer=function () {
            $(".addRuleInfo").find('.refer').on('click',function () {
                $scope.obj={};
                $scope.obj.name=$scope.name;
                $scope.obj.proportion=$scope.proportion;
                $scope.obj.describe=$scope.describe;
                $scope.obj.id=$scope.rules.length+1;
                $scope.obj.ruleStatus="启用";
                $scope.obj.logic="逻辑";
                $scope.obj.edit="编辑";
                $scope.obj.delete="删除";
                $scope.rules.push($scope.obj);
                return $scope.rules;
            })
        };
    }]);
    personCtrlMod.controller("myUser", ['$scope',function ($scope) {
        $scope.rules=[
            {"id":"1","name":"银行卡实名验证YF","proportion":"20","describe":"银行卡实名验证，验证银行卡号、姓名、身份证号是否一致","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"2","name":"手机号实名","proportion":"20","describe":"手机号是否为本人手机号","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"3","name":"司法涉诉信息","proportion":"20","describe":"查询是否有涉案信息","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"4","name":"短信催收名单查询","proportion":"20","describe":"查询是否存在连续三个月短信催收情况","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"5","name":"电话催收黑名单查询","proportion":"20","describe":"查询手机号码是否连续接到催收电话","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"6","name":"银行及非银机构失联名单查询","proportion":"20","describe":"查询客户是否命中银行及非银机构失联名单","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除"}, {"id":"7","name":"银行及非银机构逾期情况","proportion":"10","describe":"查询客户是否在银行及非银机构有过逾期","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除"}];
        //小put框中的弹出的规则框的取消的按钮
        $scope.smallPut=function (e) {
            //操作动态增加的元素，在添加完之后可增加事件
            e = e || window.event;
            var follow1= $("#put").children('.follow')[0];
            var follow2=$('.largePut').children('.follow')[0];
            if (e.which == '3') {
                follow1.style.display = "block";
                follow2.style.display="none";
                $(".curButton")[0].style.display="none";
                follow1.style.left = parseFloat(e.pageX - 100) + "px";
                follow1.style.top = parseFloat(e.pageY - 55) + "px";
            }
            if (e.which == '1') {
                follow1.style.display = "none";
                if (e.target.tagName.toLowerCase() == "input" && e.target.className== "addUser" ) {
                    $(".warnBorder")[0].style.display = "block";
                    $(".warnBorder .firstName").val("");
                    $(".close").click(function () {
                        $(".warnBorder")[0].style.display = "none";
                    });
                    //进行事件委托，取消冒泡事件
                    e.stopPropagation()
                }
            }
            //处理鼠标右键默认弹出的菜单框
            $('#put').bind("contextmenu", function (e) {
                return false
            });
        };
        $scope.largePut=function (e) {
            e = e || window.event;
            var follow1= $("#put").children('.follow')[0];
            var follow2 = $(".largePut").children('.follow')[0];
            if (e.which == '3') {
                follow2.style.display = "block";
                follow1.style.display = "none";
                $(".curButton")[0].style.display="none";
                follow2.style.left = parseFloat(e.pageX - 130) + "px";
                follow2.style.top = parseFloat(e.pageY - 310) + "px";
            }
            if (e.which == '1') {
                follow2.style.display = "none";
                if (e.target.tagName.toLowerCase() == "input") {
                    $(".ruleEvent")[0].style.display = "block";
                    $(".curButton")[0].style.display="none";
                    //进行事件委托，取消冒泡事件
                    e.stopPropagation();
                }
            }
            //处理鼠标右键默认弹出的菜单框
            $('.largePut').bind("contextmenu", function (e) {
                return false
            });
        };

       $scope.firstCancel=function () {
            $('.ruleEvent')[0].style.display="none";
            $('.warnBorder')[0].style.display="none";
            $('.changeInfo')[0].style.display="none";
        };
        //新创建的规则集的span的右键事件
        $scope.firstDisplay=function () {
            //修改按钮，当我点击的时候，弹出修改框，然后获取当前的input中的文本，以及单选框中的值，然后赋值给我当前的span，
                $('.firstDisplay').children('span').on('mousedown',function (e) {
                    //当这个div下创建的span的鼠标右键按下去的时候，发生的事件
                    var follow1= $("#put").children('.follow')[0];
                    var follow2 = $(".largePut").children('.follow')[0];
                    if(e.which == '3'){
                        $(".curButton")[0].style.display="block";
                        follow1.style.display="none";
                        follow2.style.display="none";
                        $(".curButton")[0].style.left = parseFloat(e.pageX -80) + "px";
                        $(".curButton")[0].style.top = parseFloat(e.pageY - 55) + "px";
                        $(".curButton input").on("click",function () {
                            $('.changeInfo')[0].style.display="block";
                        });
                    }
                    if (e.which == '1') {
                         $(".curButton")[0].style.display = "none";
                    }
                    //修改框事件
                    $scope.firstChange=function () {
                            e.target.innerHTML=$('.changeInfo .firstName').val();
                            console.log(e.target.value);
                            if($('.changeInfo .firstWrite input:radio:checked').val()== "是"){
                                e.target.style.background="#88eee3";
                            }else if($('.changeInfo .firstWrite input:radio:checked').val() == "否"){
                                e.target.style.background="lightgrey";
                            }
                        $('.changeInfo')[0].style.display="none";
                    };
                    return false;
                });
        };
        //小put框中的保存按钮
        $scope.firstSave=function () {
            if($('.firstWrite input:radio:checked').val()== "是"){
                $("<span/>").css("background"," #88eee3").html($('.firstName').val()).appendTo($('.firstDisplay'));
            }else if($('.firstWrite input:radio:checked').val()== "否"){
                $("<span/>").css("background","lightgrey").html($('.firstName').val()).appendTo($('.firstDisplay'));
            }
            $scope.firstDisplay();

            $('.warnBorder')[0].style.display="none";
        };

        //大put框中的弹出的规则集的取消按钮
        $scope.ruleClose=function () {
            $('.ruleEvent')[0].style.display="none";
        };
        $scope.pagingOptions={
            pageSizes:[1,10,20],
//            设置下拉空的内容
            pageSize:1,
//            设置下拉框的默认值
            currentPage:1
//            设置当前页的默认值
        };
        $scope.gridOptions={
            data:'rules',
            enableRowSelection:false,
            columnDefs:[//定义列
                {
                    field:'id',//数据中的属性名
                    displayName:'序号', // 表头显示的内容
                    width:50
                },
                {
                    field:'type',
                    displayName:'选中',
                    cellTemplate:'<input type="checkbox"/>',
                    width:50
                },
                {
                    field:'name',
                    displayName:'名称'
                },
                {
                    field:'describe',
                    displayName:'说明'
                }
            ],
            enablePaging:true,//显示分页文本框
            showFooter:true,//显示页脚
            pagingOptions:$scope.pagingOptions,//设置分页数据
        }

    }]);
    personCtrlMod.controller("myGold", ['$scope',function ($scope) {
       $scope.goldDisplay=function () {
           $('.addGold')[0].style.display="block";
       }
        $scope.pagingOptions={
            pageSizes:[1,10,20],
//            设置下拉空的内容
            pageSize:1,
//            设置下拉框的默认值
            currentPage:1
//            设置当前页的默认值
        };
        $scope.gridOptions={
            data:'rules',
            enableRowSelection:false,
            columnDefs:[//定义列
                {
                    field:'id',//数据中的属性名
                    displayName:'序号', // 表头显示的内容
                    width:50
                },
                {
                    field:'type',
                    displayName:'选中',
                    cellTemplate:'<input type="checkbox"/>',
                    width:50
                },
                {
                    field:'name',
                    displayName:'名称'
                },
                {
                    field:'describe',
                    displayName:'说明'
                }
            ],
            enablePaging:true,//显示分页文本框
            showFooter:true,//显示页脚
            pagingOptions:$scope.pagingOptions,//设置分页数据
        }

    }]);


});
