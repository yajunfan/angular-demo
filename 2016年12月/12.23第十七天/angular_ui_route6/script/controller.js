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
    personCtrlMod.controller("myUser", ['$scope','$rootScope',function ($scope,$rootScope) {
        //小put框增加按钮的盒子
        var follow1= $("#put").children('.follow')[0];
        //大put框增加规则的盒子
        var follow2 = $(".largePut").children('.follow')[0];
        //修改规则集的盒子
        var change=$('.curButton')[0];
        //移除规则的盒子
        var largeDelete=$(".largeDelete")[0];
        $scope.fraudGroups=[];
        $scope.creditGroups=[];
        $scope.largeRuleLists=[];
        $scope.rules=[
            {"id":"1","name":"银行卡实名验证YF","proportion":"20","describe":"银行卡实名验证，验证银行卡号、姓名、身份证号是否一致","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" },
            {"id":"2","name":"手机号实名","proportion":"20","describe":"手机号是否为本人手机号","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"3","name":"司法涉诉信息","proportion":"20","describe":"查询是否有涉案信息","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"4","name":"短信催收名单查询","proportion":"20","describe":"查询是否存在连续三个月短信催收情况","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"5","name":"电话催收黑名单查询","proportion":"20","describe":"查询手机号码是否连续接到催收电话","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"6","name":"银行及非银机构失联名单查询","proportion":"20","describe":"查询客户是否命中银行及非银机构失联名单","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除"}, {"id":"7","name":"银行及非银机构逾期情况","proportion":"10","describe":"查询客户是否在银行及非银机构有过逾期","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除"}];

        $scope.ruleLists=$scope.rules;
        //小put框中的增加按钮
        $scope.smallPut=function (e) {
            //操作动态增加的元素，在添加完之后可增加事件
            e = e || window.event;
            if (e.which == '3') {
                follow1.style.display = "block";
                follow2.style.display="none";
                change.style.display="none";
                largeDelete.style.display="none";
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

        //小put框中的保存按钮
        $scope.firstSave=function () {
            var $selectedType=$('.firstWrite .ruleType option:selected').val(),
                $checked= $('.firstWrite input:radio:checked').val();
                $selectedjieDuan=$('.firstWrite .jieduan option:selected').val();
            $scope.obj={};
            $scope.obj.name=$scope.firstName;
            $scope.obj.ifUser=$checked;
            $scope.obj.type=$selectedType;
            $scope.obj.jieduan=$selectedjieDuan;
            $scope.obj.rules=[];
            if($selectedType== "反欺诈规则"){
                $scope.fraudGroups.push($scope.obj);
                for(var i=0;i<$scope.fraudGroups.length;i++){
                    if(!$scope.fraudGroups[i].rules){
                        $scope.ruleLists=$scope.rules;
                    }
                }
              }else if($selectedType== "信用反欺诈规则"){
                $scope.creditGroups.push($scope.obj);
            }
            console.log(test);
            $scope.firstDisplay();
            $('.warnBorder')[0].style.display="none";


        };

        //这是两个点击上方的规则集，显示对应的下方的规则
        $scope.mmm=function (i) {
            $scope.fraudGroups[i].rules=$scope.fraudGroups[i].rules||[];
            $scope.largeRuleLists=$scope.fraudGroups[i].rules;

        };
        $scope.mmmx=function (i) {
            $scope.creditGroups[i].rules=$scope.creditGroups[i].rules||[];
            $scope.largeRuleLists=$scope.creditGroups[i].rules;
        };

        //大put框中右键增加规则按钮
        $scope.largePut=function (e) {

            e = e || window.event;
            if (e.which == '3') {
                follow2.style.display = "block";
                follow1.style.display = "none";
                change.style.display="none";
                largeDelete.style.display="none";
                follow2.style.left = parseFloat(e.pageX - 130) + "px";
                follow2.style.top = parseFloat(e.pageY - 310) + "px";
            }
            if (e.which == '1') {
                follow2.style.display = "none";
                for(var i=0;i< $scope.fraudGroups.length;i++){
                    if(!$scope.fraudGroups[i].rules){
                        $scope.ruleLists=[
                            {"id":"1","name":"银行卡实名验证YF","proportion":"20","describe":"银行卡实名验证，验证银行卡号、姓名、身份证号是否一致","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" },
                            {"id":"2","name":"手机号实名","proportion":"20","describe":"手机号是否为本人手机号","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"3","name":"司法涉诉信息","proportion":"20","describe":"查询是否有涉案信息","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"4","name":"短信催收名单查询","proportion":"20","describe":"查询是否存在连续三个月短信催收情况","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"5","name":"电话催收黑名单查询","proportion":"20","describe":"查询手机号码是否连续接到催收电话","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除" }, {"id":"6","name":"银行及非银机构失联名单查询","proportion":"20","describe":"查询客户是否命中银行及非银机构失联名单","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除"}, {"id":"7","name":"银行及非银机构逾期情况","proportion":"10","describe":"查询客户是否在银行及非银机构有过逾期","ruleStatus":"启用","logic":"逻辑","edit":"编辑","delete":"删除"}];
                    }
                }
                if (e.target.tagName.toLowerCase() == "input") {
                    $(".ruleEvent")[0].style.display = "block";
                    console.log($("#gridStyle").text());
                    change.style.display="none";

                    //进行事件委托，取消冒泡事件
                    e.stopPropagation();
                }
            }
            //处理鼠标右键默认弹出的菜单框
            $('.largePut').bind("contextmenu", function (e) {
                return false
            });
        };

        //大put框中的弹出的规则集的取消按钮
        $scope.ruleClose=function () {
            $('.ruleEvent')[0].style.display="none";
        };

        //弹出框的取消按钮事件
       $scope.firstCancel=function () {
            $('.ruleEvent')[0].style.display="none";
            $('.warnBorder')[0].style.display="none";
            $('.changeInfo')[0].style.display="none";
        };

        //小put框中新创建的规则集的span的右键事件以及对应的修改事件
        $scope.firstDisplay=function () {
                $('.firstDisplay').find('span').on('mousedown',function (e) {
                    //当这个div下创建的span的鼠标右键按下去的时候，发生的事件
                    if(e.which == '3'){
                        change.style.display="block";
                        follow1.style.display="none";
                        follow2.style.display="none";
                        change.style.left = parseFloat(e.pageX -80) + "px";
                        change.style.top = parseFloat(e.pageY - 55) + "px";
                        $(".curButton input").on("click",function () {
                            $('.changeInfo')[0].style.display="block";
                        });
                    }
                    if (e.which == '1') {
                       //  $(".curButton")[0].style.display = "none";
                        $(".firstDisplay span").click(function() {
                            $(e.target).addClass("bg3").siblings().removeClass("bg3");
                        })
                    }
                    //修改框事件
                    $scope.firstChange=function () {
                        var $changeCheck=$('.changeInfo .firstWrite .changeType option:selected');
                        var $changeSelect=$('.changeInfo .firstWrite input:radio:checked');
                            if($changeSelect.val()== "是"){
                                e.target.style.background="#88eee3";
                                if($changeCheck.val()== "反欺诈规则"){
                                    $(e.target).appendTo($('.firstDisplay ul .fraud'));
                                }else if($changeCheck.val()== "信用反欺诈规则"){
                                    $(e.target).appendTo($('.firstDisplay ul .credit'));
                                }
                            }else if($changeSelect.val() == "否"){
                                e.target.style.background="lightgrey";
                                if($changeCheck.val()== "反欺诈规则"){
                                    $(e.target).appendTo($('.firstDisplay ul .fraud'));
                                }else if($changeCheck.val()== "信用反欺诈规则"){
                                    $(e.target).appendTo($('.firstDisplay ul .credit'));
                                }
                            }

                            if($('.changeInfo .firstName').val()== ""){
                                e.target.innerHTML=e.target.innerHTML;
                            }else{
                                e.target.innerHTML=$('.changeInfo .firstName').val();
                            }
                        $('.changeInfo')[0].style.display="none";
                    };
                    return false;
                });
        };

        //定义表格的分页以及页脚
//         $scope.pagingOptions={
//             pageSizes:[1,10,20],
// //            设置下拉空的内容
//             pageSize:1,
// //            设置下拉框的默认值
//             currentPage:1
// //            设置当前页的默认值
//         };
//         //表格所需要的数据
//         $scope.gridOptions={
//             data:'rules',
//             enableRowSelection:false,
//             columnDefs:[//定义列
//                 {
//                     field:'id',//数据中的属性名
//                     displayName:'序号', // 表头显示的内容
//                     width:50
//                 },
//                 {
//                     field:'type',
//                     displayName:'选中',
//                     cellTemplate:'<input type="checkbox"/>',
//                     width:50
//                 },
//                 {
//                     field:'name',
//                     displayName:'名称'
//                 },
//                 {
//                     field:'describe',
//                     displayName:'说明'
//                 }
//             ],
//             enablePaging:true,//显示分页文本框
//             showFooter:true,//显示页脚
//             pagingOptions:$scope.pagingOptions//设置分页数据
//         };

       // 大put框中点击保存按钮的事件
        $scope.largeRuleAdd=function () {

            var $firstInput=$('#gridStyle table thead input');
            var $oInput=$('#gridStyle table tbody input');
            var $oInputCheak=$('#gridStyle table tbody input:checked');
            $scope.ruleObj={};
            test = $("#gridStyle").text();
            for(var i=0;i<$oInputCheak.length;i++){
                $scope.ruleObj={};
                $scope.ruleObj.id=$($oInputCheak[i]).parent().prev().html();
                $scope.ruleObj.name=$($oInputCheak[i]).parent().next().html();
                $scope.ruleObj.describe=$($oInputCheak[i]).parent().next().next().html();
                $scope.largeRuleLists.push($scope.ruleObj);
                for(var j=0;j<$scope.ruleLists.length;j++){
                    var m=$scope.ruleLists[j].id;
                    var n=$scope.ruleObj.id;
                    if(parseFloat(m)==parseFloat(n)){
                        // $scope.ruleLists.splice(j,1)
                    }
                }


            }





            // for(var i=0;i<$oInputCheak.length;i++){
            //     $("<span/>").html($($oInputCheak[i]).parent().next().html()).appendTo($(".largeDisplay li"));
            //
            //     $($oInputCheak[i]).parent().parent().remove()
            // }
            $('.ruleEvent')[0].style.display="none";

        };
        //大put下的每个span规则的右键删除事件
        $scope.largeDisplay=function () {
            $('.largeDisplay').find('span').on('mousedown',function (e) {
                //当这个div下创建的span的鼠标右键按下去的时候，发生的事件
                e=e||window.event;
                if(e.which == '3'){
                    largeDelete.style.display="block";
                    follow1.style.display="none";
                    follow2.style.display="none";
                    change.style.display="none";
                    largeDelete.style.left = parseFloat(e.pageX -110) + "px";
                    largeDelete.style.top = parseFloat(e.pageY-310) + "px";
                    $(".largeDelete input").on("click",function () {
                        for(var i=0;i< $scope.largeRuleLists.length;i++){
                            if($scope.largeRuleLists[i].name == $(e.target).html()){
                               $scope.ruleLists.push($scope.largeRuleLists[i]);
                                function tableSort(){
                                    $scope.ruleLists.sort(function(a,b){
                                        var pre =  a.id;
                                        var next = b.id;
                                        if(isNaN(pre)||isNaN(next)){//不是有效数,也就是说td里的内容是中文字符串
                                            return  pre.localeCompare(next);
                                        }
                                        return parseFloat(pre)-parseFloat(next);
                                    });
                                }
                                tableSort();
                                $scope.largeRuleLists.splice(i,1);

                            }
                        }
                    });
                    return false;
                }

                if (e.which == '1') {
                    largeDelete.style.display = "none";
                }
                $('#put').bind("contextmenu", function (e) {
                    return false
                });
            });
            $('.ruleEvent').css('display',"none");
        };

        //当大put框上的每个span标签的鼠标离开的时候，显示框消失
        $scope.itemN=function (e) {
            $('.itemDisplay')[0].style.display="none";
        };
        $scope.followItemArys=[];

        //给每个大put框中的span标签增加一个鼠标跟随效果
        $scope.itemDisplay=function (e) {
            e=e||window.event;
            //获取当前span元素的数据
            var $itemDis=$('.itemDisplay')[0];
            $itemDis.style.display="block";
            $itemDis.style.left=e.pageX-180+"px";
            $itemDis.style.top=e.pageY-300+"px";
            for(var i=0;i<$scope.largeRuleLists.length;i++){
                console.log($scope.largeRuleLists.length)
                if($scope.largeRuleLists[i].name==$(e.target).html()){
                    $scope.followItemArys=$scope.largeRuleLists[i];
                }
            }
        };
        //大put框增加规则中的多选框的全选与反选事件
        $scope.selectAll=function () {
            var $firstInput=$('#gridStyle table thead input');
            var $oInput=$('#gridStyle table tbody input');
            if($firstInput[0].checked){
                for(var i = 0;i<$oInput.length;i++){
                    if($oInput[i].type == "checkbox") {
                        $oInput[i].checked = true;
                    }
                }
            }else{
                for(var i = 0;i<$oInput.length;i++){
                    if($oInput[i].type == "checkbox"){
                        $oInput[i].checked = false;
                    }
                }
            }
        };
        // personCtrlMod.filter('fraudFilter', function () {
        //     return function (data) {
        //         if(data.type == "反欺诈规则"){
        //             if(data.obj.ifUser== "是"){
        //                 $('.firstDisplay span').css("background","blue")
        //             }else if(data.ifUser == "否"){
        //                 $('.firstDisplay span').css("background","grey")
        //             }
        //         }
        //         return data;
        //     }
        // });
        // personCtrlMod.filter('creditFilter', function () {
        //     return function (data) {
        //         if(data.type == "信用反欺诈规则"){
        //             if(data.obj.ifUser== "是"){
        //                 $('.firstDisplay span').css("background","blue")
        //             }else if(data.ifUser == "否"){
        //                 $('.firstDisplay span').css("background","grey")
        //             }
        //         }
        //         return data;
        //     }
        // });

    }]);
    personCtrlMod.controller("myGold", ['$scope',function ($scope) {
       $scope.goldDisplay=function () {
           $('.addGold')[0].style.display="block";
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
    personCtrlMod.controller("mySider", ['$scope','$rootScope','hsdghjs',function ($scope,$rootScope,hsdghjs) {
        $scope.reg =/<br>/g;
        $scope.reg2=/集/g;
        $scope.cc1=function () {
            $rootScope.asideName=$('.list-group a')[0].innerHTML.replace($scope.reg,function (argument) {
             return "";
         }).replace($scope.reg2,function (argument) {
             return ""
         });
        };
        $scope.cc2=function () {
            $rootScope.asideName=$('.list-group a')[1].innerHTML.replace($scope.reg,function (argument) {
                return "";
            }).replace($scope.reg2,function (argument) {
                return ""
            });
        };
        $scope.cc3=function () {
            $rootScope.asideName=$('.list-group a')[2].innerHTML.replace($scope.reg,function (argument) {
                return "";
            }).replace($scope.reg2,function (argument) {
                return ""
            });
        }
    }]);
    personCtrlMod.factory('hsdghjs',function () {

        return {
            setName:function (name) {
                aName=name;
            }
        }
    })

});
