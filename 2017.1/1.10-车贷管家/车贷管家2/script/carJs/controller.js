/**
 * Created by Administrator on 2017/1/6 0006.
 */
/**
 * Created by Administrator on 2017/1/4 0004.
 */
define(['jquery', "angular", "echarts","angular-route", "angular-ui-router", "ng-grid","china","jquery-cityselect"], function ($, angular,echarts) {
    var carCtrlMod = angular.module('carCtrlMod', ['ngGrid']);
    carCtrlMod.controller('loginCtrl','$location',function ($scope,$location) {
        $scope.loginSucessLocation=function () {
            alert(1)
            var hre = '/main';
            $location.href=hre;
        };

    });
    carCtrlMod.controller('myIndex',function ($scope) {
        $scope.information=function () {
            alert(1)
        };
        $oH4= $('.list h4');
        $oH4.each(function (index) {
           var flag=true;
            $(this).on('click',function () {
                flag=!flag;
                $(this).nextAll().toggle('slow');
                if(flag){
                    $(this).css('background',"#394555");
                    $(this).children('i').css('transform','rotate(0deg)');
                }else{
                    $(this).css('background',"#22282e");
                    $(this).children('i').css('transform','rotate(-90deg)');
                }

            })
        });
        $oLis=$('.list li');
        $oLis.each(function (index) {
            $(this).on('click',function () {
                $(this).css('background',"green").siblings('li').css('background',"black")
                $(this).css('background',"green").parent().siblings().children('li').css('background',"black")


            })
        });
        var flag1=true;
        $('.menu').on('click',function () {
            flag1=!flag1;
            if(!flag1){
                //当menu是显示的时候
                $('.menu-left-wrap').css('width','10%');
                $('.menu-right-wrap').css({"width":"88%","left":"10%"});
                $('.state-content').css('width','54%');
                $('.menu span').css('transform', 'rotate(0deg)');
              //  $('.statistics-list').css({"left":"-15px"});
              //   $('.statistics-list').css({"left":"-15px"});

            }else{
                $('.menu-left-wrap').css('width','50px');
                $('.menu-right-wrap').css({"width":"95%","left":"48px"});
                $('.state-content').css('width','59%');
                $('.menu span').css('transform', 'rotate(-90deg)');
                // $('.statistics-list').css({"left":"-35px"});
                // // $('.list-box').css({"left":"50px"});
                // $('.trend-button').css({"right":'152px',"transform":"rotate(0deg)"});
            }

        })

    });
    carCtrlMod.controller('myMenu',function ($scope,echarts) {
        var dom = document.getElementById("canvas");
        var myChart = echarts.init(dom);
        option = null;
        option = {
            // title: {
            //     text: '数据客户走势'
            // },
            tooltip: {
                trigger: 'axis'
            },
            // legend: {
            //     data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            // },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1/4','1/9','1/12','1/20']
            },
            yAxis: {
                type: 'value'
            },
            series: [

                {
                    name:'客户数据',
                    type:'line',
                    stack: '总量',
                    data:[1, 3, 2, 1]
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

        $scope.detailInfo=function () {
            $('.ind-right-detail').toggle('slow');
        };


    });
    carCtrlMod.controller('myMapTrend',function ($scope,echarts) {
        var dom = document.getElementById("trend");
        var myChart = echarts.init(dom);
        var dom2 = document.getElementById("canvas2");
        var myChart2 = echarts.init(dom2);
       var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            return res;
        };
         var  option = {
            backgroundColor: '#404a59',
            title : {
                text: '回款实时风险分布图',
                // subtext: '数据纯属虚构',
                left: 'left',
                top:'top',
                textStyle : {
                    color: '#fff',
                    fontSize:'22',
                    fontWeight:'normal'

                }
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                data:['北京 Top10', '上海 Top10', '广州 Top10'],
                textStyle: {
                    color: '#fff'
                },
                selectedMode: 'single'
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
        $scope.selectedIndex3="riskMap",$scope.selectedIndex4="dataDynamic", $scope.selectedIndex5="dataNormal";
        $scope.cutoverTab3=function (type) {
            $scope.selectedIndex3=type;
        };
        $scope.cutoverTab4=function (type) {
            $scope.selectedIndex4=type;
        };
        $scope.cutoverTab5=function (type) {
            $scope.selectedIndex5=type;


        };


        option2 = null;
        option2 = {
            // title: {
            //     text: '数据客户走势'
            // },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['逾期','不良','拖车','结清']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: ['1/4','1/9','1/12','1/20']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'逾期',
                    type:'line',
                    stack: '总量',
                    data:[1, 3, 2, 1]
                },
                {
                    name:'不良',
                    type:'line',
                    stack: '总量',
                    data:[0.1, 0.3, 0.2, 0.5]
                },
                {
                    name:'拖车',
                    type:'line',
                    stack: '总量',
                    data:[0.8, 1, 2, 0.7]
                },
                {
                    name:'结清',
                    type:'line',
                    stack: '总量',
                    data:[1, 1, 1, 1]
                }
            ]
        };
        if (option2 && typeof option2 === "object") {
            myChart2.setOption(option2, true);
        }
        $scope.detailInfo=function () {
            $('.ind-right-detail').toggle('slow');
        };
        var flag3=true;
        $scope.trendOn=function () {
           flag3=!flag3;
            if(!flag3){
                $('.trend-button').css({"right":'184px',"transform":"rotate(180deg)"});
                $('.trend-list').css({"left":"-197px"});
                $('.common-right').css({"left":"0","width":"100%"})
            }else{
                $('.trend-button').css({"right":'16px',"transform":"rotate(0deg)"});
                $('.trend-list').css({"left":"-16px"});
                $('.common-right').css({"left":"170px","width":"91%"})
            }

        };

    });
    carCtrlMod.controller('assetsCtrl',function ($scope) {
            $('.listContent').css('opacity',1);
            $scope.selectedIndex = "call";
            $scope.cutoverTab=function (type) {
                $scope.selectedIndex=type;
            }
    });
    carCtrlMod.controller("gridCtrl", ['$scope','$http','$stateParams',function ($scope,$http,$stateParams) {
        $scope.totalServerItems = 0;

        //定义分页部分的数据
        $scope.pagingOptions={
            pageSizes:[2,4,6],//定义下拉框的内容 ，显示当前页的数据个数
            pageSize:2,//定义默认下拉框的内容
            currentPage:1,//定义默认当前页
        };
        $scope.users=[{"id":"1", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }, {"id":"2", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }, {"id":"3", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"}, {"id":"4", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }, {"id":"5", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"}];
        $scope.gridOptions={
            data:'users',
            columnDefs:[
                {
                    field:'id',
                    displayName:'设备名称'
                },
                {
                    field:'id',
                    displayName:'客户姓名'
                },
                {
                    field:'id',
                    displayName:'车型'
                },
                {
                    field:'type',
                    displayName:'类型/型号'
                },
                {
                    field:'type',
                    displayName:'IMEI/ID'
                },
                {
                    field:'type',
                    displayName:'物联网卡号'
                },
                {
                    field:'time',
                    displayName:'所属组织'
                },
                {
                    field:'name',
                    displayName:'在线',
                    cellTemplate:'<div class="dian" style="position:absolute;top:50%;margin-top:-6px;left:50%;margin-left:-6px;width: 12px;height: 12px;border-radius: 50%;background: lightgrey;text-align: center"></div>'

                },
                {
                    field:'id_card',
                    displayName:'设备状态'
                },
                {
                    field:'autoCheck',
                    displayName:'定位类型'
                },
                {
                    field:'rule',
                    displayName:'当前位置'
                },
                {
                    field:'company',
                    displayName:'最后定位时间数据接收时间'
                },
                {
                    field:'personCheck',
                    displayName:'跟踪数据'
                },
                {
                    field:'checkPeople',
                    displayName:'回款状态'
                },
                {
                    field:'report',
                    displayName:'操作',
                     cellTemplate:'<div class="dianji"><a ng-click="ztList()" style="margin-left:42px;">详情</a><a href="http://www.cdguanjia.com/vehicleCloud/monitor/playBack2.html?gpsName=%u6D59A6610W-1&gprsCode=049164000103&gpsId=62232&clientId=73329">轨迹</a><a href="http://www.cdguanjia.com/vehicleCloud/monitor/trackMap.html?gprsCode=049164000103" >位置</a></div>',
                    width:200
                }

            ],
            showSelectionCheckbox:'true',
        };
        $scope.ztList=function () {
            $('.zt-list').css('display','block')
        };
        $('.zt-content ul li').on('click',function () {
            $(this).addClass('on').siblings().removeClass('on')
        });
        $scope.closeOne=function () {
            $('.zt-list').css('display','none');
            $('.messageboxT').css('display','block');

        };
        $scope.closeZtn=function () {
            $('.messageboxT').css('display','none');
        }
    }]);
    carCtrlMod.controller("myMap", ['$scope','$interval',function ($scope, $interval) {
        var h=$(window).height();
        $('.bMap_mask').css('height',h);
        $scope.localInfo="天安门";
        var flag=true;var flag1=true;
        $scope.rowOn=function () {
            flag1=!flag1;
           if(!flag1){
               $('.row-btn').css({"left":'-23px'});
               $('.left-direct').css({"display":"none"});
               $('.row-btn').removeClass("on");
               $('.map-information').css('left','0px')

           }else{
               $('.row-btn').css({"left":'244px'});
                $('.left-direct').css({"display":"block"});
               $('.row-btn').addClass("on");
               $('.map-information').css('left','244px')
           }

        };
        $scope.upDown=function () {
            flag=!flag;
             if(!flag){
                 $("#wrapper1").show();
                 $('#updown').css({"transform":"rotate(0deg)","marginRight":"0"});


           }else{
                 $("#wrapper1").hide();
                 $('#updown').css({"transform":"rotate(180deg)","marginRight":"4px"});
             }

        };
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
        // map.addControl(new BMap.MapTypeControl());
        var opts = {offset: new BMap.Size(80, 50)}
        map.addControl(new BMap.MapTypeControl(opts));
        map.addControl(new BMap.GeolocationControl());
        $scope.searchDi=function () {
        $scope.$watch('localInfo',function (o,n) {
                var local = new BMap.LocalSearch(map, {
                    renderOptions:{map: map}
                });
                local.search(n); //这里要加一个ng-model进行手动输入地点进行搜索
            })
        };
        var myP1 = new BMap.Point(116.380967,39.913285);    //起点
        var myP2 = new BMap.Point(116.424374,39.914668);    //终点
        var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(32, 70), {    //小车图片
            //offset: new BMap.Size(0, -5),    //相当于CSS精灵
            imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
        });
        var driving2 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});    //驾车实例
        driving2.search(myP1, myP2);    //显示一条公交线路
        window.run = function (){
            var driving = new BMap.DrivingRoute(map);    //驾车实例
            driving.search(myP1, myP2);
            driving.setSearchCompleteCallback(function(){
                var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
                var paths = pts.length;    //获得有几个点

                var carMk = new BMap.Marker(pts[0],{icon:myIcon});
                map.addOverlay(carMk);
                i=0;
                function resetMkPoint(i){
                    carMk.setPosition(pts[i]);
                    if(i < paths){
                        setTimeout(function(){
                            i++;
                            resetMkPoint(i);
                        },100);
                    }
                }
                setTimeout(function(){
                    resetMkPoint(5);
                },100)

            });
        };
        setTimeout(function(){
            run();
        },1500);
        var flag=true;
        $scope.changeGroup=function () {
            flag=!flag;
            if(!flag){
                $('.car-detailList span').removeClass('carGuan-close').addClass('group_2_switch');
                $('.car-detailList li').css('display','block');

            }else{

                $('.car-detailList span').addClass('carGuan-close').removeClass('group_2_switch');
                $('.car-detailList li').css('display','none');
            }
        };
        $('.listContent').css('opacity',1);
        $scope.selectedIndex = "allState";
        $scope.selectedIndex1 = "all";
        $scope.cutoverTab=function (type) {
            $scope.selectedIndex=type;
        };
        $scope.cutoverTab1=function (type) {
            $scope.selectedIndex1=type;
        };
        $scope.num=31;

           var timer= $interval(function(){
                $scope.num=$scope.num-1;
                $scope.timeValue=$scope.num;
                if($scope.num<1){
                    $scope.num=31;
                }
            },1000);



    }]);
    carCtrlMod.controller("myMapStatistics", ['$scope',function ($scope) {
        $scope.selectedIndex6 = "polOfflineRep";
        $('.statistics-content').css('opacity',1);
        $scope.statisticsTit="离线超时报警";
        $scope.cutoverTab6=function (type,e) {
            e=e||window.event;
                $scope.selectedIndex6=type;
             $scope.statisticsTit=$(e.target).html()
        };
        var flag4=true,flag5=true;
        $scope.statisticsOn=function () {
            flag4=!flag4;
            if(!flag4){
                $('.trend-button').css({"right":'184px',"transform":"rotate(180deg)"});
                $('.statistics-list').css({"left":"-197px"});
                 $('.common-right').css({"left":"0","width":"100%"})

            }else{
                $('.trend-button').css({"right":'16px',"transform":"rotate(0deg)"});
                $('.statistics-list').css({"left":"-16px"});
                $('.common-right').css({"left":"170px","width":"91%"})
            }
        };
        $scope.statisticsTr=function () {
           flag5=!flag5;
            $('.policeRep-list').toggle();
           if(!flag5){
               $('.policeRep i').css('transform','rotate(-90deg)');
           }else{
               $('.policeRep i').css('transform','rotate(0deg)');
           }
       };
        $scope.totalServerItems = 0;
        //定义分页部分的数据
        $scope.pagingOptions={
            pageSizes:[2,4,6],//定义下拉框的内容 ，显示当前页的数据个数
            pageSize:2,//定义默认下拉框的内容
            currentPage:1,//定义默认当前页
        };
        $scope.users=[
            {"id":"1", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }, {"id":"1", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }];
        $scope.gridOptions={
            data:'users',
            enableRowSelection:false,
            virtualizationThreshold:60,
            columnDefs:[//定义列
                {
                    field:'name',
                    displayName:'设备名称'
                },
                {
                    field:'type',
                    displayName:'车型'

                },
                {
                    field:'name',
                    displayName:'客户姓名'
                },
                {
                    field:'time',
                    displayName:'时间'
                },
                {
                    field:'company',
                    displayName:'公司'
                },
                {
                    field:'personCheck',
                    displayName:'报警时间'
                },
                {
                    field:'checkPeople',
                    displayName:'开始时间'
                },
                {
                    field:'report',
                    displayName:'持续时间'
                }, {
                    field:'play',
                    displayName:'报警地点'
                }
            ],
            showSelectionCheckbox:true,
            enablePaging:true,//显示分页文本框
            showFooter:true,//显示页脚
            pagingOptions:$scope.pagingOptions,//设置分页数据
        };
        $scope.trendOn=function () {
            flag3=!flag3;
            if(!flag3){
                $('.trend-button').css({"right":'184px',"transform":"rotate(180deg)"});
                $('.trend-list').css({"left":"-197px"});
                $('.trend-content').css({"left":"0px"})
            }else{
                $('.trend-button').css({"right":'16px',"transform":"rotate(0deg)"});
                $('.trend-list').css({"left":"-16px"});
                $('.trend-content').css({"left":"170px"})
            }

        };




    }]);
    carCtrlMod.controller("myMapChase", ['$scope',function ($scope) {
        $scope.selectedIndex7 = "chaseCar",$scope.selectedIndex8="chaseAll";
        $scope.chaseTit="暗访追车";
        $scope.cutoverTab7=function (type,e) {
            e=e||window.event;
            $scope.selectedIndex7=type;
            $scope.chaseTit=$(e.target).html()
        };
        $scope.cutoverTab8=function (type) {
            $scope.selectedIndex8=type;
        };
        var flag4=true,flag5=true;
        $scope.totalServerItems = 0;
        //定义分页部分的数据
        $scope.pagingOptions={
            pageSizes:[2,4,6],//定义下拉框的内容 ，显示当前页的数据个数
            pageSize:2,//定义默认下拉框的内容
            currentPage:1,//定义默认当前页
        };
        $scope.users=[
            {"id":"1", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }, {"id":"1", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }]
        $scope.gridOptions={
            data:'users',
            enableRowSelection:false,
            virtualizationThreshold:60,
            columnDefs:[//定义列
                {
                    field:'name',
                    displayName:'车牌号码'
                },
                {
                    field:'type',
                    displayName:'车型'

                },
                {
                    field:'time',
                    displayName:'所属组织'
                },
                {
                    field:'name',
                    displayName:'客户姓名'
                },

                {
                    field:'company',
                    displayName:'暗访人员'
                },
                {
                    field:'personCheck',
                    displayName:'暗访时间'
                },
                {
                    field:'checkPeople',
                    displayName:'暗访结果'
                },
                {
                    field:'play',
                    displayName:'操作',
                    cellTemplate:'<div class="chasePlay"><a class="changePlay" href="#/carChase/changeChaseRecord" >修改</a><a href="JavaScript:;" class="detelePlay" ng-click="detelePlay()">删除</a><a class="detailPlay" href="#/carChase/detailChaseRecord">详情</a></div>'
                }
            ],

            showSelectionCheckbox:true,
            enablePaging:true,//显示分页文本框
            showFooter:true,//显示页脚
            pagingOptions:$scope.pagingOptions,//设置分页数据
        };
        var flag7=true;
        $scope.changePlay=function (e) {
            e=window.event||e;

            $('.change-chase-record').css('display','block')
        };
        $scope.chaseOn=function () {
            flag7=!flag7;
            if(!flag7){
                $('.trend-button').css({"right":'184px',"transform":"rotate(180deg)"});
                $('.chase-list').css({"left":"-197px"});
                $('.common-right').css({"left":"0","width":"100%"})
            }else{
                $('.trend-button').css({"right":'16px',"transform":"rotate(0deg)"});
                $('.chase-list').css({"left":"-16px"});
                $('.common-right').css({"left":"170px","width":"91%"})
            }

        };
        $scope.changeBack=function () {
            $('.change-chase-record').css('display','none');
            $('.detail-chase-record').css('display','none');
        };

        $scope.changeSave=function () {
            $('.change-chase-record').css('display','none');
        };
        $scope.detelePlay=function () {
            $('.tipBox').css('display','block');
        };
        $scope.detailPlay=function () {
            $('.detail-chase-record').css('display','block');
        };
        $scope.Ok=function () {
            $('.tipBox').css('display','none');
        };
        $scope.No=function () {
            $('.tipBox').css('display','none');
        };
        function delPic(object) {
            var fileid = $(object).children("img").attr("id") + "";
            var index = parseInt(fileid.substring(3));
            $("#label").attr("for", "upFile" + index);
            //alert($("#label").attr("for"));
            //隐藏li，src赋值为空字符串，并给input赋值为空字符串
            $(object).hide();
            $(object).children("img").attr("src", "");
            $(object).children("input").val("");

        }
        function addPic(object) {
            var mark = true;
            $("#imgs li").each(function() {
                //alert($(this).children("input").val());
                if ($(this).is(":hidden") && mark) {
                    //如果隐藏了,则显示，并给input的value赋值
                    //	alert($(this).children("img").attr("id"));
                    previewImage(object, $(this).children("img").attr("id"));
                    $(this).show();
                    //$(this).children("input").val($("#upFile").val());
                    //alert($(this).children("input").val());
                    //$("#upFile").val("");//置空，否则会报错
                    //label设置为对应下一个input
                    var fileid = $(this).children("img").attr("id") + "";
                    var index = parseInt(fileid.substring(3));
                    $("#label").attr("for", "upFile" + (index + 1));
                    //alert($("#label").attr("for"));
                    mark = false;

                }
            });

        }

    }]);

    carCtrlMod.controller("profileDataCtrl", ['$scope',function ($scope) {
    var option3,option4;
        var dom3 = document.getElementById("mychart-six");
        var myChart3 = echarts.init(dom3);
        var dom4 = document.getElementById("mychart-year");
        var myChart4 = echarts.init(dom4);
        option3 = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['9月','10月','11月','12月','1月','2月']
            },
            yAxis: {
                type: 'value'
            },
            series: [

                {
                    name:'客户数据',
                    type:'line',
                    stack: '总量',
                    data:[0, 0, 0, 0,3,0]
                }
            ]
        };
        option4 = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            },
            yAxis: {
                type: 'value'
            },
            series: [

                {
                    name:'客户数据',
                    type:'line',
                    stack: '总量',
                    data:[0, 0, 0, 0,3,3,5,1,6,9,0,1]
                }
            ]
        };

        if (option3 && typeof option3 === "object") {
            myChart3.setOption(option3, true);
        }
        if (option4 && typeof option4 === "object") {
            myChart4.setOption(option4, true);
        }

        $scope.selectedIndex9 = "sixMonth";
        $scope.mathAll=3;
        $scope.cutoverTab9=function (type,e) {
            e=window.event;
            $scope.select9=$(e.target).html();
            $scope.selectedIndex9=type;

            if($scope.select9 == "最近6个月"){
               $scope.mathAll=eval(option3.series[0].data.join('+'));
            }else if($scope.select9 == "最近一年"){
                $scope.mathAll=eval(option4.series[0].data.join('+'));
            }
        };

        $scope.pagingOptions={
            pageSizes:[2,4,6],//定义下拉框的内容 ，显示当前页的数据个数
            pageSize:2,//定义默认下拉框的内容
            currentPage:1,//定义默认当前页
        };
        $scope.users=[
            {"id":"1", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }, {"id":"1", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }];
        $scope.gridOptions={
            data:'users',
            enableRowSelection:false,
            rowHeight:50,
            virtualizationThreshold:60,
            columnDefs:[//定义列
                {
                    field:'name',
                    displayName:'设备名称'
                },
                {
                    field:'type',
                    displayName:'车型'

                },
                {
                    field:'name',
                    displayName:'客户姓名'
                },
                {
                    field:'time',
                    displayName:'时间'
                },
                {
                    field:'company',
                    displayName:'公司'
                },
                {
                    field:'personCheck',
                    displayName:'报警时间'
                },
                {
                    field:'checkPeople',
                    displayName:'开始时间'
                },
                {
                    field:'report',
                    displayName:'持续时间'
                }, {
                    field:'play',
                    displayName:'报警地点'
                }
            ],
            showSelectionCheckbox:true,
            enablePaging:true,//显示分页文本框
            showFooter:true,//显示页脚
            pagingOptions:$scope.pagingOptions,//设置分页数据
        };
    }]);
    carCtrlMod.controller("customerCtrl", ['$scope',function ($scope) {
        $scope.pagingOptions={
            pageSizes:[2,4,6],//定义下拉框的内容 ，显示当前页的数据个数
            pageSize:2,//定义默认下拉框的内容
            currentPage:1,//定义默认当前页
        };
        $scope.users=[
            {"id":"1", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }, {"id":"1", "type":"房贷", "time":"2016-11-10 11:49:28", "name":"廖蓉蓉", "id_card":"456546345631514", "autoCheck": "未审核", "rule":"0", "company":"滴滴", "personCheck":"未审核", "checkPeople":"张三", "report":"查看", "play":"删除"
            }];
        $scope.gridOptions={
            data:'users',
            enableRowSelection:false,
            rowHeight:50,
            virtualizationThreshold:60,
            columnDefs:[//定义列
                {
                    field:'name',
                    displayName:'客户姓名'
                },
                {
                    field:'type',
                    displayName:'添加日期'

                },
                {
                    field:'name',
                    displayName:'车牌号码'
                },
                {
                    field:'time',
                    displayName:'车型'
                },
                {
                    field:'company',
                    displayName:'所属组织'
                },
                {
                    field:'personCheck',
                    displayName:'贷款类型'
                },
                {
                    field:'checkPeople',
                    displayName:'客户状态',
                    cellTemplate:'<div style="text-align: center"><span style="display: inline-block;height: 8px;width: 8px;border-radius: 50%;background: green"></span>正常</div>'
                },
                {
                    field:'report',
                    displayName:'设备数量'
                }, {
                    field:'play',
                    displayName:'操作',
                    cellTemplate:'<div class="chasePlay"><a class="changePlay" href="#/profileData/customer/change" >修改</a><a href="JavaScript:;" class="detelePlay" ng-click="detelePlay()">删除</a><a class="detailPlay" href="#/profileData/customer/detail">详情</a></div>'
                }
            ],
            showSelectionCheckbox:true,
            enablePaging:true,//显示分页文本框
            showFooter:true,//显示页脚
            pagingOptions:$scope.pagingOptions,//设置分页数据
        };
    }]);
    carCtrlMod.controller("changeCusCtrl", ['$scope',function ($scope) {
        $("#city").citySelect();
    }]);
    //导出的函数。留存
    function excel() {
        var keypoint = $("#Skeypoint").val();
        var url1 = path + "hunt/excelCount";
        var queryDto = {
            vehicleNo:$("#selectVehicle").val(),
            clientName:$("#clientSearchInput").val(),
            startTime:$("#calen1").val(),
            endTime:$("#calen2").val(),
            keypoint:keypoint
        };
        $.ajax({
            url : url1,
            type : "post",
            data : JSON.stringify(queryDto),
            contentType : 'application/json',
            datatype : "json",
            success : function(data) {
                excelCount = data;
                if(excelCount == 1)
                    doExcel(1);
                else{
                    $("#downloadUl").html("");
                    for(var i = 1;i<=excelCount;i++){
                        var num = 500*(i-1)+1;
                        $("#downloadUl").append("<li value="+i+" ><a onclick='doExcel("+i+")'>下载"+i+"---------(下载内容为第"+num+"到"+500*i+"条)"+"</a></li>");
                    }
                    $("#excelDiv").show();
                }
            }
        })


    }


    function excel(number) {
        keypoint = $("#Skeypoint").val();
        vehicleNo = $("#selectVehicle").val();
        client = $("#clientSearchInput").val();
        name = $("#customerName").val();
        startTime = $("#calen1").val();
        endTime = $("#calen2").val();
        var params = "vehicleNo="+vehicleNo+"&client="+client+"&name="+name+"&startTime="+startTime+"&endTime="+endTime+"&pageNo="+number;
        console.log(params)

        var url = path + "hunt/excel?"+params;
        $.get(url, function(data){
            if(data==null||""==data){
                dialog(0,4,"对不起，您不具备此功能使用权限","");
                return;
            }
            window.location.href = url;
        })
    }
});