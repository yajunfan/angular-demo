var baidMap;
var panorama;
var myDis;
var panoramaService;
var clientAreas=[]; 
var clientAreas2=[]; 
var gpsPosCache=[];
var gpss={};
var baiduGpsKey=[];
var commonAreas=[];
//var markers={};
//var markerKey=[]; //存放makers 的索引
var trackList={}; //位置跟踪里的数据
var namekgBd=false;
var areaKg2=false;
var areaKg3=false;
var areaKg4=false;
var status_cion; //存放图标
var onShowGps;

function showPopWindowBd(gpsId){
	baidMap.removeOverlay(onShowCircle);
	baidMap.removeOverlay(onShowFence);
	if(gpss[gpsId]){
		//alert(gpss[gpsId].gps.gpsId);
		//onShowGps = gpss[gpsId].gps;
		var markerManage=gpss[gpsId];
		markerManage.marker.dispatchEvent("click"); 
		baidMap.setCenter(markerManage.latlng);
	}
}

//istrack  0最新状态 1跟踪 2轨迹回放
function baiduMap(istrack){
	 baidMap = new BMap.Map("allmap");      // 创建地图实例    	 
	 //var point = new BMap.Point(111, 34);  // 创建点坐标
	 if(istrack==0)
		 baidMap.centerAndZoom("杭州", 11);
	 else
		 baidMap.centerAndZoom("杭州", 14);
	 baidMap.addControl(new BMap.NavigationControl());  //缩放轴
	 baidMap.addControl(new BMap.OverviewMapControl());    //缩略图
	 baidMap.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]})); //地图类型
	 baidMap.enableScrollWheelZoom(); //启用滚轮放大缩小
	 //baidMap.addControl(new BMap.ScaleControl());   // 添加默认比例尺控件
	 myDis = new BMapLib.DistanceTool(baidMap);
}

function panorama(){
	panorama = new BMap.Panorama('panorama'); 
	panorama.setPov({heading: -40, pitch: 6});
	//panorama.setPosition(new BMap.Point(120.320032, 31.589666));
	$("#panoramaIcon").hide(); //默认隐藏
	$("#panorama").hide(); //默认隐藏
	
	panoramaService = new BMap.PanoramaService();
}
function clearBaiduMap(){	
	trackList={}; 
	baidMap.clearOverlays();	
	gpss={};
	baiduGpsKey=[];
}

function showCarNameBd(){
	if(namekgBd == true){
       namekgBd = false;
       for(var j=0;j<baiduGpsKey.length;j++){    	  
      		//if(gpss[baiduGpsKey[j]]!=null && gpss[baiduGpsKey[j]].label != null && gpss[baiduGpsKey[j]].traceStatus==1){
      		if(typeof(gpss[baiduGpsKey[j]]) != "undefined" && typeof(gpss[baiduGpsKey[j]].label) != "undefined"  && gpss[baiduGpsKey[j]].traceStatus==1){
      			baidMap.removeOverlay(gpss[baiduGpsKey[j]].label);
      		}
	  	 }
    }else{
      namekgBd = true;
      	for(var j=0;j<baiduGpsKey.length;j++){      	
      		if(typeof(gpss[baiduGpsKey[j]]) != "undefined" && typeof(gpss[baiduGpsKey[j]].label) != "undefined" && gpss[baiduGpsKey[j]].traceStatus==1){
      		//if(gpss[baiduGpsKey[j]]!=null && gpss[baiduGpsKey[j]].label != null && gpss[baiduGpsKey[j]].traceStatus==1){
      			baidMap.addOverlay(gpss[baiduGpsKey[j]].label);
      		}
	  	 }
    
    }
}

function _showSusAreaInBaiduMap(){
	for(var j=0;j<clientAreas.length;j++){
		var markerManage =clientAreas[j];
		baidMap.addOverlay(markerManage.marker);
		baidMap.addOverlay(markerManage.label);
	}
}
function _hindSusAreaInBaiduMap(){
	for(var j=0;j<clientAreas.length;j++){
		var markerManage =clientAreas[j];
		baidMap.removeOverlay(markerManage.marker);
		baidMap.removeOverlay(markerManage.label);
	}
}

function _showSusAreaInBaiduMap2(){
	for(var j=0;j<clientAreas2.length;j++){
		var markerManage =clientAreas2[j];
		baidMap.addOverlay(markerManage.marker);
		baidMap.addOverlay(markerManage.label);
	}
}
function _hindSusAreaInBaiduMap2(){
	for(var j=0;j<clientAreas2.length;j++){
		var markerManage =clientAreas2[j];
		baidMap.removeOverlay(markerManage.marker);
		baidMap.removeOverlay(markerManage.label);
	}
}
function _showCommonAreaInMapGoogle(){
	for(var j=0;j<baiduGpsKey.length;j++){
		var gpsId=baiduGpsKey[j];
		if(commonAreas[gpsId]){
			for (var i = 0; i < commonAreas[gpsId].length; i++) {
				var markerManage =commonAreas[gpsId][i];
				baidMap.addOverlay(markerManage.marker);
				baidMap.addOverlay(markerManage.label);				
			}
		}
  	 }	
}
function _hindCommonAreaInMapGoogle(areaType){
	for(var j=0;j<baiduGpsKey.length;j++){
		var gpsId=baiduGpsKey[j];
		if(commonAreas[gpsId]){
			for (var i = 0; i < commonAreas[gpsId].length; i++) {
				var markerManage =commonAreas[gpsId][i];
				baidMap.removeOverlay(markerManage.marker);
				baidMap.removeOverlay(markerManage.label);				
			}
		}
  	 }	
}


function showAreaBd(areaType){
	if(areaType==2){
		if(areaKg2==false){
			areaKg2 = true;
			_showCommonAreaInMapGoogle();
		}else{
			areaKg2=false;
			_hindCommonAreaInMapGoogle();
		}
	}else if(areaType == 3){
		if(areaKg3==false){
			areaKg3 = true;
			_showSusAreaInBaiduMap();
		}else{
			areaKg3=false;
			_hindSusAreaInBaiduMap();
		}
	}else if(areaType == 4){
		if(areaKg4==false){
			areaKg4 = true;
			_showSusAreaInBaiduMap2();
		}else{
			areaKg4=false;
			_hindSusAreaInBaiduMap2();
		}
	}
		
}


function addTrack(obj1,obj2){	
	//var length=trackList[gprsCode].length;
	//var myLatlng = new BMap.Point(obj1.lng,obj1.lat);
	//var befLatlng = new BMap.Point(obj2.lng,obj2.lat);
	var polyline = new BMap.Polyline([obj1,obj2], {strokeColor:"#00CD00", strokeWeight:3, strokeOpacity:1});
	baidMap.addOverlay(polyline);	
}

function removeClientOverlays(clientId){
	/*if(clientAreas[clientId] && clientAreas[clientId].length>0){
		for(var i = 0; i < clientAreas[clientId].length; i++){
			var markerManage =clientAreas[clientId][i];
			baidMap.removeOverlay(markerManage.marker);
			baidMap.removeOverlay(markerManage.label);
		}
		clientAreas[clientId]=null;
	}*/
}

function  indexOf(arr,val) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == val) 
			return i;
	}
	return -1;
};

function removeArrVal(arr,val){
	var index=indexOf(arr,val);
	if(index!=-1)
		arr.splice(index, 1);
}

function removeGpsOverlaysBd(gpsId){
	if(gpss[gpsId]){
		var markerManage =gpss[gpsId];
		baidMap.removeOverlay(markerManage.marker);
		baidMap.removeOverlay(markerManage.label);
		baidMap.removeOverlay(markerManage.scale);
		baidMap.removeOverlay(onShowCircle);//清除画的围栏
		baidMap.removeOverlay(onShowFence);//清除围栏轨迹
		gpss[gpsId]=null;
	}
	parent.checkedGpsList[gpsId]=null;
	removeArrVal(baiduGpsKey,gpsId);
	if(commonAreas[gpsId]){
		for (var i = 0; i < commonAreas[gpsId].length; i++) {
			var markerManage =commonAreas[gpsId][i];
			baidMap.removeOverlay(markerManage.marker);
			baidMap.removeOverlay(markerManage.label);			
		}
		commonAreas[gpsId]=null;
	}
}

function addMapMark(url,data){
	var point = new BMap.Point(data.baiduLng,data.baiduLat);
	var icon = new BMap.Icon(url, new BMap.Size(35,35));
	var mark = new BMap.Marker(
			point
			,{icon:icon}
	);  
	baidMap.addOverlay(mark);
}

function _posInfoTrans(gprsCode,lng,lat){
	var app1_ = document.getElementById("app8_"+gprsCode);
	//var myGeo = new BMap.Geocoder(); 
	//var myLatlng = new BMap.Point(lng,lat);
	//myGeo.getLocation(myLatlng, function (rs) { 
	//	app1_.innerHTML = "<b>位置：</b>"+rs.address;
	//}); 
	var url="http://api.map.baidu.com/geocoder/v2/?ak=fj0xpHMgZtpsrlKnWLGpUdeOOl6idBRo&callback=callback&location=" 
		+ lat + "," + lng + "&output=json&pois=1";
	$.ajax({
		url:url,
		dataType:"jsonp",
		jsonp:"callback",
		type:"get",
		success:function(json){
			app1_.innerHTML = "<b>位置：</b>"+json.result.formatted_address+","+json.result.sematic_description;
		}
	});
}

var posImg=new Array("","right.png","suspicious.png","gw.png");
var financeImg=new Array("","right2.png","overdue.png","badness.png","trail.png","financeEnd.png");
var typeArr=new Array("","有线","无线","OBD");
var modelNameArr=new Array("","GM06","GM09","WY200","WY220","GT06S","WY800","WY900","WY710","WYA5C-3","WYMini","GV20","WYT1S","WY900S","WY600","GT16");
var positionArr=new Array("其他","电瓶","副驾驶杂物箱","左侧踏板","右侧踏板","方向盘下面","前顶灯","后顶灯","后备箱");

var loanTypeArr=new Array("","抵押贷款","按揭贷款"); //<a href='javascript:;' =\"_posInfoTrans('"+itemData.gprsCode+"',"+itemData.lng+","+itemData.lat+");\">[点击查看]</a>
function _getContentHtml(itemData,statusInfo,address,myLatlng){
	//onShowGps = itemData;
	var analyst;
	if(itemData.analyst!=null){
		analyst = itemData.analyst;
	}else if(itemData.analyst!=null && itemData.aphone!=null){
		analyst = itemData.analyst +"(" +itemData.aphone+")";
	}else{
		analyst = "";
	}
	var moveMsg;
	if((itemData.alarmType & 524288) == 524288)
		moveMsg = "关闭异动";
	else
		moveMsg = "开启异动";
	//
	var imgSrc1="";
	var imgSrc2="";
	if(itemData.gpsName !=null && itemData.gpsName!=""){
		imgSrc1 = "<img id='posImg_"+itemData.gprsCode+"' src='../img/af/"+posImg[itemData.traceStatus]+"' alt='' />";
		imgSrc2 = "<img id='financeImg_"+itemData.gprsCode+"' src='../img/af/"+financeImg[itemData.payStatus]+"' alt='' />";
	}else{
		imgSrc1="";
		imgSrc2="";
	}
	return "\
	<div class='state-box'>\
		<div class='tit'>\
			<ul class='fl'>\
				<li class='on' style='list-style-type:none;'  onClick='stateTab(this)'>位置状态</li>\
				<li style='list-style-type:none;' onClick='stateTab(this)'>金融信息</li>\
			</ul>\
			<em class='fr'>车牌号码："+ nullToBlank(itemData.vehicleNo)+"（" +nullToBlank(itemData.vehicleType)+"）</em>\
		</div>\
		<div class='state-content'>\
			<div class='state-wrap'>\
				<div class='state-list'>\
					<ul>\
						<li class='cols90'><b>设备名称：</b>"+ itemData.gpsName+"（" +nullToBlank(itemData.gprsCode)+"）</li>\
						<div style='clear:both'></div>\
						<li><b>客户姓名：</b>"+ itemData.customerName+"（" +nullToBlank(itemData.customerTel)+"）</li>\
						<li><b>安装位置：</b><em id='insPosition'>"+ positionArr[nullToZero(itemData.installPosition)] +"</em></li>\
						<div style='clear:both'></div>\
						<li><b>设备类型：</b>"+ typeArr[itemData.gpsType] +"（" +modelNameArr[itemData.model]+"）</li>\
						<li><b>物联网卡：</b>"+ itemData.simCode +"</li>\
						<li><b>服务器时间：</b>"+ timeToLongDate3(itemData.updatetime) +"</li>\
						<li><b>定位时间：</b>"+ timeToLongDate3(itemData.lastgpstime) +"</li>\
						<li><b>速度：</b>"+ parseInt(itemData.speed) +"公里/小时</li>\
						<div style='clear:both'></div>\
						<li class='cols90'><b>位置：</b>"+ nullToBlank(address)+"</li>\
						<div style='clear:both'></div>\
						<li class='cols90'><b>状态：</b>"+ nullToBlank(itemData.statusName)+nullToBlank(itemData.statusPlus)+" | "+nullToBlank(itemData.statusDes)+" "+ nullToBlank(itemData.alarmDes) +"</li>\
					</ul>\
					<div class='pic' >"+imgSrc1+"</div>\
				</div>\
				<div class='state-list' style='display:none;'>\
					<ul>\
						<li><b>金融性质：</b>"+ loanTypeArr[itemData.loanType] +"</li>\
						<li><b>放款时间：</b>"+ timeToDate(itemData.loanDate) +"</li>\
						<li><b>放款额：</b>"+ nullToBlank(itemData.loanAmount) +"万</li>\
						<li><b>还款期数：</b>"+ nullToBlank(itemData.repayTimes) +"期</li>\
						<li><b>还款周期：</b>"+ timeToDate(itemData.repayStartDate)+"—"+ timeToDate(itemData.repayEndDate)+"</li>\
						<li><b>业务经理：</b>"+ nullToBlank(itemData.busManager)+"（" +nullToBlank(itemData.bphone)+"）</li>\
						<li><b>风控专员：</b>"+ analyst+"</li>\
					</ul>\
					<div class='pic' >"+imgSrc2+"</div>\
				</div>\
			</div>\
			<div class='state-foot'>\
				<a class='state-btn' href='playBack2.html?gpsName="+escape(itemData.gpsName)+"&gprsCode="+itemData.gprsCode+"&gpsId="+itemData.gpsId+"&clientId="+itemData.clientId+"' target='_blank'>轨迹回放</a>\
				<a id='updateCustomer' class='state-btn' href='javascript:;' onclick=\"showUpdateCustomerPanel('"+itemData.gpsId+"');\">资料修改</a>\
				<a class='state-btn' href='trackMap.html?gprsCode="+itemData.gprsCode+"' target='_blank'>跟踪街景</a>\
				<a class='state-btn' href='javascript:;' onclick=\"showInstruct('"+itemData.gpsId+"');\">指令下发</a>\
				<a class='state-btn' href='javascript:;' onclick=\"showHistory('"+itemData.gprsCode+"');\">历史报警</a>\
				<a class='state-btn' href='javascript:;' onclick=\"showStatus('"+itemData.gprsCode+"','"+itemData.customerName+"',"+itemData.customerId+","+itemData.traceStatus+","+itemData.payStatus+",'"+itemData.vehicleNo+"');\">状态修改</a>\
				<a class='state-btn' href='javascript:;' onclick=\"show7DaysPark('"+itemData.gpsId+"');\">七日停留</a>\
				<a class='state-btn state_other' onClick='stateOther(this)'>其他\
					<ul class='state_other_ul' onMouseLeave='stateOtherMove(this)'>\
						<li onClick=\"showScale('"+itemData.gpsId+"','"+myLatlng.lat+"','"+myLatlng.lng+"');\">新建围栏</li>\
						<li onClick=\"lookScale('"+itemData.gpsId+"');\">查看围栏</li>\
						<li onClick=\"delScale('"+itemData.gpsId+"');\">删除围栏</li>\
						<li onClick=\"updateMoveMsg('"+itemData.gpsId+"','"+itemData.alarmType+"');\"><em id='moveMsg'>"+moveMsg+"<em></li>\
						<li onClick=\"addReMark('"+itemData.gpsId+"');\">备注</li>\
							</ul>\
				</a>\
			</div>\
		</div>\
	</div>";
}

function _getContentHtml2(itemData,statusInfo,address){
	var remark;
	if(_istrack == 1)
		remark = "<div id='app7_"+itemData.gprsCode+"'><b>状态：</b><em id='app7'>"+ nullToBlank(itemData.statusName)+nullToBlank(itemData.statusPlus)+" | "+nullToBlank(itemData.statusDes)+" "+ nullToBlank(itemData.alarmDes) +"<em></br></div>";
	else
		remark = "<div id='app7_"+itemData.gprsCode+"'><b>状态：</b><em id='app7'>"+ nullToBlank(statusInfo[0])+" | "+nullToBlank(itemData.statusdes)+" "+ nullToBlank(itemData.alarmdes) +"<em></br></div>";
	var directInfo=getDirectInfo(itemData.direct);
	var statusdes="";
	if(itemData.statusdes!=null && typeof(itemData.statusdes) != "undefined")
		statusdes=itemData.statusdes;
	//alert(statusdes=="undefined");
	//alert(statusdes+"1");
	var alarmdes="";
	if(itemData.alarmdes!=null && typeof(itemData.alarmdes) != "undefined")
		alarmdes=itemData.alarmdes;
	var html =	"<div id='app_"+itemData.gprsCode+"' style='font-weight:normal;'>"
		    +"<div id='app1_"+itemData.gprsCode+"'><b>设备名称：</b>"+itemData.gpsName+"</br></div>"
		    +"<div id='app2_"+itemData.gprsCode+"'><b>设备类型：</b>"+modelNameArr[itemData.model]+"</br></div>"
		    +"<div id='app3_"+itemData.gprsCode+"'><b>物联网卡：</b>"+itemData.simcode+"</br></div>"
		    +"<div id='app9_"+itemData.gprsCode+"'><b>服务器时间：</b><em id='app9'>"+timeToLongDate3(itemData.updatetime)+"<em></br></div>"
			+"<div id='app4_"+itemData.gprsCode+"'><b>接收时间：</b><em id='app4'>"+timeToLongDate3(itemData.lastgpstime)+"<em></br></div>"
			+"<div id='app5_"+itemData.gprsCode+"'><b>速度：</b><em id='app5'>"+parseInt(itemData.speed)+"<em>公里/小时</br></div>"
			+"<div id='app6_"+itemData.gprsCode+"'><b>方向：</b><em id='app6'>"+directInfo["direction"]+"<em></div>"
			//+"<div id='app7_"+itemData.gprsCode+"'><b>状态：</b><em id='app7'>"+ nullToBlank(itemData.statusName)+nullToBlank(itemData.statusPlus)+" | "+nullToBlank(itemData.statusDes)+" "+ nullToBlank(itemData.alarmDes) +"<em></br></div>";
			//+"<div id='app7_"+itemData.gprsCode+"'><b>状态：</b><em id='app7'>"+ nullToBlank(statusInfo[0])+" | "+nullToBlank(itemData.statusdes)+" "+ nullToBlank(itemData.alarmdes) +"<em></br></div>";
			+ remark;
			//+"<div id='app8_"+itemData.gprsCode+"'><b>位置：</b><em id='app8'>"+address+"<em></br></div>";
	if(address!="")
		html=html+"<div id='app8_"+itemData.gprsCode+"'><b>位置：</b><em id='app8'>"+address+"<em></br></div>";
	return html;
}

function _getContentHtml22(itemData,statusInfo,address){ 
	var directInfo=getDirectInfo(itemData.direct);
	var statusdes="";
	if(itemData.statusdes!=null && typeof(itemData.statusdes) != "undefined")
		statusdes=itemData.statusdes;
	//alert(statusdes=="undefined");
	//alert(statusdes+"1");
	var alarmdes="";
	if(itemData.alarmdes!=null && typeof(itemData.alarmdes) != "undefined")
		alarmdes=itemData.alarmdes;
	
	var html =	"<div id='app_"+itemData.gprsCode+"' style='font-weight:normal;'>"
		    +"<div id='app1_"+itemData.gprsCode+"'><b>设备名称：</b>"+itemData.gpsName+"</br></div>"
		    +"<div id='app2_"+itemData.gprsCode+"'><b>设备类型：</b>"+modelNameArr[itemData.model]+"</br></div>"
		    +"<div id='app3_"+itemData.gprsCode+"'><b>物联网卡：</b>"+itemData.simcode+"</br></div>"
		    +"<div id='app9_"+itemData.gprsCode+"'><b>服务器时间：</b><em >"+timeToLongDate3(itemData.updatetime)+"<em></br></div>"
			+"<div id='app4_"+itemData.gprsCode+"'><b>接收时间：</b><em >"+timeToLongDate3(itemData.lastgpstime)+"<em></br></div>"
			+"<div id='app5_"+itemData.gprsCode+"'><b>速度：</b><em >"+parseInt(itemData.speed)+"<em>公里/小时</br></div>"
			+"<div id='app6_"+itemData.gprsCode+"'><b>方向：</b><em >"+directInfo["direction"]+"<em></div>"
			//+"<div id='app7_"+itemData.gprsCode+"'><b>状态：</b><em >"+ nullToBlank(itemData.statusName)+nullToBlank(itemData.statusPlus)+" | "+nullToBlank(itemData.statusDes)+" "+ nullToBlank(itemData.alarmDes) +"<em></br></div>";
			+"<div id='app7_"+itemData.gprsCode+"'><b>状态：</b><em >"+ nullToBlank(statusInfo[0])+" | "+nullToBlank(itemData.statusdes)+" "+ nullToBlank(itemData.alarmdes) +"<em></br></div>";
	if(address!="")
		html=html+"<div id='app8_"+itemData.gprsCode+"'><b>位置：</b><em id='app8'>"+address+"<em></br></div>";
	return html;
}

function _getContentHtml3(stopData,address){ 
	var html =	"<div  style='font-weight:normal;'>"
		    +"<div ><b>停车时间：</b>"+stopData.stopTimeStr+"</br></div>"
		    +"<div ><b>开始时间：</b>"+timeToLongDate3(stopData.parkstarttime)+"</br></div>"
		    +"<div ><b>结束时间：</b>"+timeToLongDate3(stopData.parkendtime)+"</br></div>"
			+"<div ><b>位置：</b>"+address+"</br></div>";
	return html;
}

var _contentOpts1 = {
		  width : 480,     // 信息窗口宽度
		  height: "",     // 信息窗口高度
		  title : "" , // 信息窗口标题
		  enableMessage:true,//设置允许信息窗发送短息
		  message:""
		};

var _contentOpts2 = {
		  width : 260,     // 信息窗口宽度
		  height: "",     // 信息窗口高度
		  title : "" , // 信息窗口标题
		  enableMessage:true,//设置允许信息窗发送短息
		  message:""
		};

function windowShowClick(gpsId,myLatlng,marker,statusInfo){
	$.ajax( {
		type : 'post',
		url : path+'gps/getGpsPositionList',
		data : {gpss:gpsId},  
		dataType : 'json',
		success : function(gpsData) {
			onShowGps = gpsData[0];
			if(typeof(onShowGps.simcode)=='undefined')
				onShowGps.simcode = gpsData[0].simCode;
			/*if(gpsPosCache[gpsId] && gpsPosCache[gpsId].posinfo!=null){
				var info_html;
				var _contentOpts;
				if(_istrack==0){
					info_html = _getContentHtml(onShowGps,statusInfo,gpsPosCache[gpsId].posinfo,myLatlng);
					_contentOpts=_contentOpts1;
				}else{
					info_html=_getContentHtml2(onShowGps,statusInfo,gpsPosCache[gpsId].posinfo);
					_contentOpts=_contentOpts2;
				}
				//var info_html=_getContentHtml(onShowGps,statusInfo,gpsPosCache[gpsId].posinfo,myLatlng);
	        	var _infoWindow = new BMap.InfoWindow(info_html,_contentOpts);
	        	marker.openInfoWindow(_infoWindow);  
			}else{
				
			}*/
			geocodeSearchTest(gpsId,myLatlng,marker,statusInfo,onShowGps);
		},
		error : function() {
		}
	});
	
}

function _updateMapInternal(gpsData,upnum,myLatlng,address){
	var directInfo=getDirectInfo(gpsData.direct);
	var statusInfo=getStatusInfo(gpsData.status);
	var pngicon = "../img/monitor/"+statusInfo[1];  
	var _info_html;
	var _contentOpts
	//if(_istrack==0){
		//_info_html=_getContentHtml(gpsData,statusInfo,address,myLatlng);
		//_contentOpts=_contentOpts1;
	//}else{
		//_info_html=_getContentHtml2(gpsData,statusInfo,address);
		//_contentOpts=_contentOpts2;
	//}
	if(gpss[gpsData.gpsId]){
		gpss[gpsData.gpsId].latlng=myLatlng;
		gpss[gpsData.gpsId].marker.setIcon(new BMap.Icon(pngicon+directInfo["image"], new BMap.Size(30,30)));
		//更新弹窗内容
		if(typeof(onShowGps)!='undefined'){
			if(onShowGps.gpsId==gpsData.gpsId){
				windowShowClick(gpsData.gpsId,myLatlng,gpss[gpsData.gpsId].marker,statusInfo);				
			}
		} 
		
		//gpss[gpsData.gpsId].infowindow.setContent(_info_html);
		gpss[gpsData.gpsId].marker.setPosition(myLatlng);
		if(_istrack==0){
			gpss[gpsData.gpsId].label.setPosition(myLatlng);
		}
		//gpss[gpsData.gpsId].traceStatus=gpsData.traceStatus;
	}else{
		status_cion = pngicon;
		var createMark = function(gpsId,myLatlng,statusInfo, icon) { 
			var _marker = new BMap.Marker(myLatlng,icon);			
            _marker.addEventListener("click", function() {            	
            	windowShowClick(gpsId,myLatlng,_marker,statusInfo);

            });  				           
            return _marker;  
        };
		var myIcon = new BMap.Icon(pngicon+directInfo["image"], new BMap.Size(30,30));
		//var marker = new BMap.Marker(myLatlng,{icon:myIcon});
        var marker = createMark(gpsData.gpsId,myLatlng,statusInfo, {icon:myIcon});
        //var marker=createArr[0];
        //var infoWindow=createArr[1];
        baidMap.addOverlay(marker);
        if(upnum==0){
        	if(_istrack==1){
        	   onShowGps = gpsData;
        	   windowShowClick(gpsData.gpsId,myLatlng,marker,statusInfo);
        	   panorama.setPosition(myLatlng);
        	   panoramaService.getPanoramaByLocation(myLatlng, function(data){
        			if (data == null) {
        					//dialog(0,4,"该坐标街景暂不存在","");
        				    //panorama.setPosition(new BMap.Point(120.320032, 31.589666));
        					$("#panorama").hide();
        					$("#panoramaIcon").css("right",0);
        					$("#allmap").css("width","100%");
        					
        					//marker.setPosition(myLatlng);
        					
        					return;
        				}
        		})
        	}
        	
    		baidMap.setCenter(myLatlng);
    		
    		//if(_istrack!=0)
    		//marker.openInfoWindow(infoWindow);  
    	}
               
        var opts = {
		  position : myLatlng,    // 指定文本标注所在的地理位置
		  offset   : new BMap.Size(15, -10)    //设置文本偏移量						 
		}

        var borderArr=["","1px solid #009c9f","1px solid #ea8a23","1px solid #dc383b"]
		var boxShadowArr=["","0 0 5px #009c9f","",""];
        var backGroundColorArr=["","#ffffff","#fdae2a","#fc5255"];
    	var textColorArr=["","#333333","#ffffff","#ffffff"];
    	var label;    	
    	if(_istrack==0){
    		var carName;
    		if(gpsData.gName==null || gpsData.gName==""){
    			carName = gpsData.gprsCode;
	    		label = new BMap.Label(carName, opts);  // 创建文本标注对象
				label.setStyle({
					padding: "3px 8px",
					color : "#000000",
					backgroundColor : "#FFFAFA",//statusInfo[2]
					boxShadow:"",
					border: "",
					fontSize : "12px",
					fontFamily:"Microsoft YaHei",
					borderRadius:"3px"
				});
				baidMap.addOverlay(label);
    		}else{
    			carName = gpsData.cName+" | "+gpsData.gName;
    			label = new BMap.Label(carName, opts);  // 创建文本标注对象
    			label.setStyle({
    				padding: "3px 8px",
    				color : textColorArr[gpsData.ts],
    				backgroundColor : backGroundColorArr[gpsData.ts],//statusInfo[2]
    				boxShadow:boxShadowArr[gpsData.ts],
    				border: borderArr[gpsData.ts],
    				fontSize : "12px",
    				fontFamily:"Microsoft YaHei",
    				borderRadius:"3px"
    			});
    			if( namekgBd == true || (gpsData.ts!=1) ){
    				baidMap.addOverlay(label);
    			}	
    		}
    	}
		var markerManage = new Object();
		markerManage.id = gpsData.gprsCode;
		markerManage.label = label;
		markerManage.marker = marker;
		//markerManage.infowindow = null;
		markerManage.latlng = myLatlng;
		markerManage.traceStatus=gpsData.ts;
		//markerManage.gps = gpsData;
		gpss[gpsData.gpsId]=markerManage;
	}
}

var _upnum=0;
var startTransIndex=0;
var _newdata;
var _istrack;
function trans(){	
	if(_newdata.length>100){
		var end=startTransIndex+100;
		if(end>_newdata.length)
			end=_newdata.length;
		_baiduTransInterval(startTransIndex,end);
		if(_newdata.length>end){
			startTransIndex=startTransIndex+100;
			transtime=setTimeout("trans()",500);				
		}else{
			clearTimeout(transtime);
		}
	}else{
		_baiduTransInterval(0,_newdata.length);
	}
}

//地址解析
function geocodeSearchTest(gpsId,myLatlng,marker,statusInfo,data){
	var url="http://api.map.baidu.com/geocoder/v2/?ak=fj0xpHMgZtpsrlKnWLGpUdeOOl6idBRo&callback=callback&location=" 
		+ myLatlng.lat + "," + myLatlng.lng + "&output=json&pois=1";
	$.ajax({
		url:url,
		dataType:"jsonp",
		jsonp:"callback",
		type:"get",
		success:function(json){
			var address=json.result.formatted_address+","+json.result.sematic_description;
			gpsPosCache[gpsId].posinfo=address;	
			var info_html;
			var _contentOpts;
			if(_istrack==0){
				info_html = _getContentHtml(onShowGps,statusInfo,gpsPosCache[gpsId].posinfo,myLatlng);
				_contentOpts=_contentOpts1;
			}else{
				info_html=_getContentHtml2(onShowGps,statusInfo,gpsPosCache[gpsId].posinfo);
				_contentOpts=_contentOpts2;
			}
        	var _infoWindow = new BMap.InfoWindow(info_html,_contentOpts);
        	marker.openInfoWindow(_infoWindow);  
			//var info_html=_getContentHtml(data,statusInfo,address,myLatlng);
        	//var _infoWindow = new BMap.InfoWindow(info_html,_contentOpts1);
        	//marker.openInfoWindow(_infoWindow);  		        	
			
		}
	});
}

function _baiduTransInterval(_start,_end){
	var points = "";
	for(var i=_start;i<_end;i++){		
		points=points+_newdata[i].lng+","+_newdata[i].lat+";";
	}
	var url="http://api.map.baidu.com/geoconv/v1/?coords="+points.substring(0,points.length-1)+"&ak=fEZcKjIaZD6EZkUOyyFugdA5&output=json";
	$.ajax({
		url:url,
		dataType:"jsonp",
		jsonp:"callback",
		type:"get",
		success:function(json){
			if(json.status==0){
				for (var pointIndex=0;pointIndex < json.result.length; pointIndex++) {
					var index=_start+pointIndex;
					var gpsId=_newdata[index].gpsId;
					var lng =json.result[pointIndex].x;	
					var lat =json.result[pointIndex].y;
					var myLatlng=new BMap.Point(lng,lat);					
										
					if(_istrack!=0){
						var gprsCode=_newdata[index].gprsCode;
						//如果位置跟踪
						if(trackList[gprsCode]){
							var length=trackList[gprsCode].length;
							var old=trackList[gprsCode][length-1];
							trackList[gprsCode].push(myLatlng);
							addTrack(myLatlng,old);
						} else{
							trackList={};
							trackList[gprsCode]=[];
							trackList[gprsCode].push(myLatlng);
						}
					}
					
					//geocodeSearchTest(lng,lat,myLatlng,index);
					gpsPosCache[gpsId]={};
					gpsPosCache[gpsId].lng=_newdata[index].lng;
					gpsPosCache[gpsId].lat=_newdata[index].lat;
					gpsPosCache[gpsId].myLatlng=myLatlng;
					gpsPosCache[gpsId].posinfo=null;
					
					_updateMapInternal(_newdata[index],_upnum,myLatlng,"");	
					_upnum++;
				}
				
			}
		}
	});
}

//istrack  0最新状态 1跟踪 2轨迹回放 3库存设备
function updateBaiduMap1(newdata,istrack){
	_istrack=istrack;
	_upnum=0;	
	for(var i=newdata.length-1;i>=0;i--){
		var gpsId=newdata[i].gpsId;
		if(gpsPosCache[gpsId] && gpsPosCache[gpsId].lat==newdata[i].lat && gpsPosCache[gpsId].lng==newdata[i].lng){
			_updateMapInternal(newdata[i],_upnum,gpsPosCache[gpsId].myLatlng,gpsPosCache[gpsId].posinfo);
			newdata.splice(i, 1);
			_upnum++;
		}
	}
	_newdata=newdata;
	startTransIndex=0;
	trans();

}

var areaLabelStyle={
   color : "#ffffff",
   backgroundColor : "#fd8424",//statusInfo[2]
   borderColor : "#ea8a23",
   padding:"3px 8px",
   fontFamily:"Microsoft YaHei",
   borderRadius:"3px",
   fontSize:"12px",
};
var areaLabelStyle2={
   color : "#ffffff",
   backgroundColor : "#34ab1c",//statusInfo[2]
   borderColor : "#369b21",
   padding:"3px 8px",
   fontFamily:"Microsoft YaHei",
   borderRadius:"3px",
   fontSize:"12px",
};
var areaLabelStyle3={
		   color : "#ffffff",
		   backgroundColor : "#EE82EE",//statusInfo[2]
		   borderColor : "#DA70D6",
		   padding:"3px 8px",
		   fontFamily:"Microsoft YaHei",
		   borderRadius:"3px",
		   fontSize:"12px",
		};
function dealAreaDataBaidu(areaData){
	if(!areaKg4)
		clearBaiduMap();
	
	clientAreas=[];
	for(var i=0;i<areaData.length;i++){	
		var myOverlay = [];
		var jsonobj=eval(areaData[i].pointJsoinData);
		var labelLatlng;
		for(var j=0;j<jsonobj.length;j++){
			myOverlay[j]=new BMap.Point(jsonobj[j].baiduLng,jsonobj[j].baiduLat);
			if(j==0)
				labelLatlng=myOverlay[j];
			if(jsonobj[j].baiduLat>labelLatlng.lat)
				labelLatlng=myOverlay[j];
		}
		var opts = {
			position : labelLatlng,    // 指定文本标注所在的地理位置
			offset   : new BMap.Size(15, -10)    //设置文本偏移量						 
		}
		
		var label = new BMap.Label(areaData[i].name, opts);  // 创建文本标注对象
		
		label.setStyle(areaLabelStyle);
		
		var fillColor="#7AC5CD";
		if(areaData[i].areaType==2)
			fillColor="#FF7F00";//
		var areaStyleOptions = {
		    strokeColor: "#00868B",    //边线颜色。
		    fillColor: fillColor,      //填充颜色。当参数为空时，圆形将没有填充效果。
		    strokeWeight: 1,       //边线的宽度，以像素为单位。
		    strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
		    fillOpacity: 0.2,      //填充的透明度，取值范围0 - 1。
		    strokeStyle: 'solid' //边线的样式，solid或dashed。   
		}
		
		if(myOverlay.length>0){
			var myPolygon = new BMap.Polygon(myOverlay, areaStyleOptions);
			var markerManage = new Object();
			markerManage.label = label;
			markerManage.marker = myPolygon;	
			markerManage.areaType=areaData[i].areaType;
			clientAreas.push(markerManage);
			if(areaKg3){
				baidMap.addOverlay(myPolygon);
				baidMap.addOverlay(label);
			}
		}
	}
}

function dealAreaDataBaidu2(areaData){
	if(!areaKg3){
		clearBaiduMap();
	}
	if(areaKg4&&areaKg3)
		clearBaiduMap();
	clientAreas2=[];
	for(var i=0;i<areaData.length;i++){	
		var myOverlay = [];
		var jsonobj=eval(areaData[i].pointJsoinData);
		var labelLatlng;
		for(var j=0;j<jsonobj.length;j++){
			myOverlay[j]=new BMap.Point(jsonobj[j].baiduLng,jsonobj[j].baiduLat);
			if(j==0)
				labelLatlng=myOverlay[j];
			if(jsonobj[j].baiduLat>labelLatlng.lat)
				labelLatlng=myOverlay[j];
		}
		var opts = {
			position : labelLatlng,    // 指定文本标注所在的地理位置
			offset   : new BMap.Size(15, -10)    //设置文本偏移量						 
		}
		
		var label = new BMap.Label(areaData[i].name, opts);  // 创建文本标注对象
		
		label.setStyle(areaLabelStyle3);
		
		var fillColor="#7AC5CD";
		if(areaData[i].areaType==2)
			fillColor="#FF7F00";//
		var areaStyleOptions = {
		    strokeColor: "#00868B",    //边线颜色。
		    fillColor: fillColor,      //填充颜色。当参数为空时，圆形将没有填充效果。
		    strokeWeight: 1,       //边线的宽度，以像素为单位。
		    strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
		    fillOpacity: 0.2,      //填充的透明度，取值范围0 - 1。
		    strokeStyle: 'solid' //边线的样式，solid或dashed。   
		}
		
		if(myOverlay.length>0){
			var myPolygon = new BMap.Polygon(myOverlay, areaStyleOptions);
			var markerManage = new Object();
			markerManage.label = label;
			markerManage.marker = myPolygon;	
			markerManage.areaType=areaData[i].areaType;
			clientAreas2.push(markerManage);
			if(areaKg4){
				baidMap.addOverlay(myPolygon);
				baidMap.addOverlay(label);
			}
		}
	}
}


function dealCommonAreaDataBd(gpss,areaData){
	var arr = gpss.split(",")
	if(arr.length==0)
		return;
	for(var j = 0;j<arr.length;j++){
		var gpsId = arr[j];
		commonAreas[gpsId]=[];
		var Data = areaData[gpsId];
		for(var i=0;i<Data.length;i++){	
			var point=new BMap.Point(Data[i].baidulng,Data[i].baidulat);
			var circle = new BMap.Circle(point,1000,{
				fillColor:"#13AB77", 
				strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
			var opts = {
				position : point,    // 指定文本标注所在的地理位置
				offset   : new BMap.Size(-10, -10)    //设置文本偏移量						 
			}		
			var label = new BMap.Label(Data[i].name, opts);  // 创建文本标注对象		
			label.setStyle(areaLabelStyle2);
			
			var markerManage = new Object();
			markerManage.label = label;
			markerManage.marker = circle;	
			commonAreas[gpsId].push(markerManage);
			if(areaKg2){
				baidMap.addOverlay(circle);
				baidMap.addOverlay(label);
			}		
		}
	}
	
}

function getStatusInfo(status){
	/*var statusArr=["正常行驶","停车","报警","离线","不定位","停车超时","离线","离线超时"];
	var imageArr=["car_green_","car_red_","car_yellow_","car_gray_","car_no_monitor_","car_purple_","car_black_"];
	var colorArr=["#02df82","#ff0000","#f9f900","#e0e0e0","#e0e0e0","#8080c0","#000000"];*/
	var statusArr=["行驶","停车","报警","离线","参考定位","基站定位","离线","WIFI定位"];
	var imageArr=["car_green_","car_red_","car_yellow_","car_black_","car_no_monitor_","car_purple_","car_blue_","car_wifi_"];
	var colorArr=["#02df82","#ff0000","#f9f900","#000000","#e0e0e0","#8080c0","","#ff0000"];
	return [statusArr[status-1],imageArr[status-1],colorArr[status-1]];
}

function getDirectInfo(direct){
	var rtDirect={};
	if(direct>27 && direct<=72){
  		image="45.png";	  		
		direction="东北";
	}else if(direct>72 && direct<=117){
		image="90.png";
		direction="东";
	}else if(direct>117 && direct<=162){
		image="135.png";
		direction="东南";
	}else if(direct>162 && direct<=207){
		image="180.png";
		direction="西南";
	}else if(direct>207 && direct<=252){
		image="225.png";
		direction="西";
	}else if(direct>252 && direct<=297){
		image="270.png";
		direction="西北";
	}else if(direct>297 && direct<=342){
		image="315.png";
		direction="东南";
	}else{
		image="0.png";
		direction="北";
	}
	rtDirect["image"]=image;
	rtDirect["direction"]=direction;
	return rtDirect;
}

function showStatusChangeWin(){
	$("#statusChangeWin").show();
	$("#statusChangeWin").center();
}

/*切换*/
function stateTab(ele){
	var index=$(ele).index()
	$(ele).addClass("on").siblings().removeClass("on");
	$('.state-list').hide();
	$('.state-list').eq(index).show();
}


