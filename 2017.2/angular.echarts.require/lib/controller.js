/**
 * Created by Administrator on 2017/1/6 0006.
 */
/**
 * Created by Administrator on 2017/1/4 0004.
 */
define(['jquery', "angular", "echarts"], function ($, angular,echarts) {

    var echartsCtrlMod = angular.module('echartsCtrlMod', []);
    echartsCtrlMod.controller('myCtrl',function ($scope,echarts) {
        console.log(echarts)
        var dom = document.getElementById("main");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        option = {
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [

                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
   })

});