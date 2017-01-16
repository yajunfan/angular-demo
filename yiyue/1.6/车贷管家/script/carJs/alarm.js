var	alarmList;  //报警列表
var maxAlarmId=0;   //当前报警列表最大id
function getAlarmData(){
	 $.ajax({
	        type: "POST",
	    	url : 'alarm/getNewAlarmCount',
	    	data: {"alarmStartId":maxAlarmId},  
			dataType : 'json',
	        async:true,
	        success: function(json) {
	    		//判断是否开启报警声音
	    		if(maxAlarmId>0 && json[0] && $("#sound").val() == 1){
	    			//播放报警音	    		
	    			var media = $('#media')[0];
					media.play();
					//alert("播放报警音");
	    		}    		
	        	/*dealAlarm(json);
	        	if(json.alarmList.length>0){
	        		var num=Number($(".mms-num").text())+json.alarmList.length;
	        		$(".mms-num").text(num);
	        	}*/	
	    		//if(json[0]>0){
	    			//var num=Number($(".yj-tips").text())+json[0];
	    			var num=json[2];
	        		if(num==0){
	        			$(".yj-tips").hide();
	        		} else{
	        			$(".yj-tips").text(num);
	        			$(".yj-tips").show();
	        		}
	        	//}
	    		maxAlarmId=json[1];
	        }
	   });		
	 setTimeout("getAlarmData()",1000*60);
}

function dealAlarm(jsonData){
	updateMsgTable(jsonData.alarmList);
}

function removeAlarm(alarmId){
	$.ajax({
        type: "POST",
    	url : path+'alarm/updateAlarmStatus',
    	data: {"alarmId":alarmId,"alarmStatus":2},  
		dataType : 'json',
        async:true,
        success: function(json) {
        	$('#tr'+alarmId).remove(); 
        	//消息提醒数量减一
        	var num = $(".mms-num").text();
        	num--;
        	$(".mms-num").text(num);
        	//alert('解除成功！');	
        	
        },
        error : function() {
			//alert('error');
		}
   });	
}

function updateMsgTable(alarmList){
	for(var i=0;i<alarmList.length;i++){
    	if(maxAlarmId<alarmList[i].id){
			maxAlarmId=alarmList[i].id;
		} 
    	$('#alarmpanel tr').eq(0).after("<tr id='tr"+alarmList[i].id+"'><td style='text-align: center;'>"+(alarmList[i].gpsName)+"</td><td style='text-align: center;'>"+(alarmList[i].customerName)+"</td><td style='text-align: center;'>"+(alarmList[i].gpstime)+"</td><td style='text-align: center;'>"+(alarmList[i].alarmDes)+"</td><td><a style='cursor:pointer;color:#069;' href='monitor/trackMap.jsp?gprsCode="+alarmList[i].gprsCode+"' target='_blank' >跟踪</a>&nbsp;&nbsp;<a style='cursor:pointer;color:#069;' href='javascript:;' onclick='removeAlarm("+alarmList[i].id+");'>解除</a></td></tr>"); 
    	
   }
}

//请求url
var _url;
var _alarmList;
var _mark;

var alarmArr=[];
alarmArr["8"]="低电报警";
alarmArr["256"]="断电报警";
alarmArr["16"]="震动报警";
alarmArr["1"]="sos求救";
alarmArr["1024"]="未进常用区域";
alarmArr["4"]="进可疑区域";
alarmArr["32"]="可疑区域停车超时";
alarmArr["128"]="出行政区域";
alarmArr["64"]="停车超时";
alarmArr["2"]="离线超时";
alarmArr["512"]="脱落报警";
alarmArr["32768"]="关机报警";
alarmArr["8192"]="脱离报警";
alarmArr["4096"]="剪线报警";
alarmArr["2048"]="开盖报警";
alarmArr["16384"]="拆除报警";
mapTwo = new BMap.Map("map2");    // 创建Map实例
	mapTwo.enableScrollWheelZoom(true);
	mapTwo.addControl(new BMap.MapTypeControl());   //添加地图类型控件
function _showAlarmDetail(alarmData){
	document.getElementById('his_detail_name').innerHTML =alarmData.customerName+"  "+alarmData.gpsName+"("+modelNameArr[alarmData.model]+")";
	document.getElementById('his_detail_type').innerHTML =alarmData.alarmName//alarmArr[alarmData.alarmType];
	document.getElementById('his_detail_time').innerHTML =timeToLongDate3(alarmData.updatetime);
	document.getElementById('his_detail_pos').innerHTML =alarmData.posinfo;
	var point = new BMap.Point(alarmData.baiduLng,alarmData.baiduLat);
	console.log(alarmData.baiduLng);
	console.log(alarmData.baiduLat);
	mapTwo.centerAndZoom(point, 11);  // 初始化地图,设置中心点坐标和地图级别
	var icon = new BMap.Icon(path+"img/monitor/car_red_0.png", new BMap.Size(35,35));
	if(_mark){
		_mark.setIcon(icon);
		_mark.setPosition(point);
	}else{
		_mark = new BMap.Marker(point,{icon:icon});  
		mapTwo.addOverlay(_mark);
	}
	
	
	if(alarmData.status==0){
		$.ajax({
	        type: "POST",
	    	url : 'alarm/updateAlarmStatus',
	    	data: {"alarmId":alarmData.id,"alarmStatus":1},  
			dataType : 'json',
	        async:true,
	        success: function(json) {	
	        	$("#mail_"+alarmData.id).attr("class","icon-mail-open mc mt3");
	        }
	   });	
   }
}

function removeAlarmByMonitor(alarmId){
	removeAlarm(alarmId);
	var _p=$(".history-content .page-bot .page_index").text();
	showPage(parseInt(_p));
}

function addToHistoryTable(alarmData,index,isNeedReplay){
	var className='';
	var iconMailClass="icon-mail";
	if(alarmData.status==1 || alarmData.status==2)
		iconMailClass="icon-mail-open";
	if(index==0){
		className='on';
		_showAlarmDetail(alarmData);
	}
	
	var str="<tr id="+index+" class="+className+">"
	+"<td style='width:140px;text-align:left;padding-left:10px'><p>"+alarmData.gpsName+"</p><p class='mt3'>"+timeToLongDate3(alarmData.updatetime)+"</p></td>"
	+"<td style='width:90px;text-align:center;font-size:12px'><p>"+alarmData.alarmName+"</p><p id=mail_"+alarmData.id+" class='"+iconMailClass+" mc mt3'></p></td>";
	if(alarmData.status==2)
		str=str+"<td style='width:50px;text-align:center;font-size:12px'><p class='hisBtnlose'>已解除</p>";
	else
		str=str+"<td style='width:50px;text-align:center;font-size:12px'><p class='hisBtn crp' onClick='removeAlarmByMonitor("+alarmData.id+")'>解除</p>";
	if(isNeedReplay)
		str=str+"<p class='hisBtn crp' onclick='window.open(\"monitor/playBack.html?gpsName="+escape(alarmData.gpsName)+"&gprsCode="+alarmData.gprsCode+"&gpsId="+alarmData.gpsId+"&clientId="+alarmData.clientId+"\")'>回放</p>";
	str=str+"</td></tr>";
	
	$('#historyListTab').append(str);
}

function showPage(page){
	var page_size=7;
	$('#historyListTab').empty();	
	var type=$(".history-content .history-tit ul li.on").attr("data-type");	
	var searchType=0;
	if(type=='全部'){
	}else if(type=='未解除'){
		searchType=1;
	}else{
		searchType=2;
	}
	
	var gprsCode;
	var isNeedReplay=true;
	if(_url=='alarm/gpsAlarmHistoryInfo'){
		gprsCode=_gpsCode; 
		isNeedReplay=false;
	}
	$.ajax({
        type: "POST",
    	url : path+_url,//'alarm_gpsAlarmHistoryInfo.action',
    	data: {gpsCode:gprsCode,alarmStatus:searchType,gpsHistoyPage:page},  
		dataType : 'json',
        async:true,
        success: function(jsonData) {	
        	_alarmList=jsonData.alarmList;
        	for (var i = 0; i < jsonData.alarmList.length; i++) {
				var alarmData =jsonData.alarmList[i];
				addToHistoryTable(alarmData,i,isNeedReplay);
			}
			$(".history-content .tab-cont tr").css("display","block");
			$("#historyGeneral").text(jsonData.totalCount+"条, 未解除"+jsonData.unRemoveCount+"条");			
			$(".history-content .tab-cont tr:visible:even").css("background","#f5f5f5");
			$(".history-content .tab-cont tr:visible:odd").css("background","#fff");
			$(".history-content .page-bot .page_count").text(Math.ceil(jsonData.totalCount/page_size));
        }
	});
	   
	$(".history-content .page-bot .page_index").text(page);
	
}
$(function(){
    $(".history-content .history-tit ul li").click(function(){
        showPage(1);
    });
    
    $(".history-content .page-bot .page-left").click(function(){
        var _p=$(".history-content .page-bot .page_index").text();
        _p=parseInt(_p);
        if (_p<=1) return;
        showPage(_p-1);
    });
    $(".history-content .page-bot .page-right").click(function(){
        var _p=$(".history-content .page-bot .page_index").text(),
        _t=$(".history-content .page-bot .page_count").text();
        _p=parseInt(_p);
        _t=parseInt(_t);
        if (_p>=_t) return;
        showPage(_p+1);
    });
});

$(".tab-list").delegate("tr","click",function(){	
	var alarm=_alarmList[this.id];
	
	_showAlarmDetail(alarm);
		
	$(this).addClass("on").siblings().removeClass("on");
	
});


$(".la").click(function(){$(".detail-top").slideToggle();})


