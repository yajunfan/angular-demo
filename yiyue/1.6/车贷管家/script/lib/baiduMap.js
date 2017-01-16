var baidMap;
var panorama;
var panoramaService;
var clientAreas=[]; 
var gpsPosCache=[];
var gpss={};
var gpsKey=[];
var commonAreas=[];
//var markers={};
//var markerKey=[]; //存放makers 的索引
var trackList={}; //位置跟踪里的数据
var namekg=false;
var areaKg2=false;
var areaKg3=false;

function showPopWindow(gpsId){
	if(gpss[gpsId]){
		var markerManage=gpss[gpsId];
		markerManage.marker.dispatchEvent("click"); 
		//BMapLib.EventWrapper.trigger(ckmarker, 'click', {'type': 'onclick', target: ckmarker});
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
	 baidMap.addControl(new BMap.ScaleControl());   // 添加默认比例尺控件	
}

function panorama(){
	panorama = new BMap.Panorama('panorama'); 
	panorama.setPov({heading: -40, pitch: 6});
	//panorama.setPosition(new BMap.Point(120.320032, 31.589666));
	$("#panoramaIcon").hide(); //默认隐藏
	$("#panorama").hide(); //默认隐藏
	
	panoramaService = new BMap.PanoramaService();
}

function showCarName(){
	if(namekg == true){
       namekg = false;
       for(var j=0;j<gpsKey.length;j++){    	  
      		//if(gpss[gpsKey[j]]!=null && gpss[gpsKey[j]].label != null && gpss[gpsKey[j]].traceStatus==1){
      		if(typeof(gpss[gpsKey[j]]) != "undefined" && typeof(gpss[gpsKey[j]].label) != "undefined"  && gpss[gpsKey[j]].traceStatus==1){
      			baidMap.removeOverlay(gpss[gpsKey[j]].label);
      		}
	  	 }
    }else{
      namekg = true;
      	for(var j=0;j<gpsKey.length;j++){      	
      		if(typeof(gpss[gpsKey[j]]) != "undefined" && typeof(gpss[gpsKey[j]].label) != "undefined" && gpss[gpsKey[j]].traceStatus==1){
      		//if(gpss[gpsKey[j]]!=null && gpss[gpsKey[j]].label != null && gpss[gpsKey[j]].traceStatus==1){
      			baidMap.addOverlay(gpss[gpsKey[j]].label);
      		}
	  	 }
    
    }
}

function _showSusAreaInMap(){
	for(var j=0;j<clientAreas.length;j++){
		var markerManage =clientAreas[j];
		baidMap.addOverlay(markerManage.marker);
		baidMap.addOverlay(markerManage.label);
	}
}
function _hindSusAreaInMap(){
	for(var j=0;j<clientAreas.length;j++){
		var markerManage =clientAreas[j];
		baidMap.removeOverlay(markerManage.marker);
		baidMap.removeOverlay(markerManage.label);
	}
}
function _showCommonAreaInMap(areaType){
	for(var j=0;j<gpsKey.length;j++){
		var gpsId=gpsKey[j];
		if(commonAreas[gpsId]){
			for (var i = 0; i < commonAreas[gpsId].length; i++) {
				var markerManage =commonAreas[gpsId][i];
				baidMap.addOverlay(markerManage.marker);
				baidMap.addOverlay(markerManage.label);				
			}
		}
  	 }	
}
function _hindCommonAreaInMap(areaType){
	for(var j=0;j<gpsKey.length;j++){
		var gpsId=gpsKey[j];
		if(commonAreas[gpsId]){
			for (var i = 0; i < commonAreas[gpsId].length; i++) {
				var markerManage =commonAreas[gpsId][i];
				baidMap.removeOverlay(markerManage.marker);
				baidMap.removeOverlay(markerManage.label);				
			}
		}
  	 }	
}

function showArea(areaType){
	if(areaType==2){
		if(areaKg2==false){
			areaKg2 = true;
			_showCommonAreaInMap();
		}else{
			areaKg2=false;
			_hindCommonAreaInMap();
		}
	}else{
		if(areaKg3==false){
			areaKg3 = true;
			_showSusAreaInMap();
		}else{
			areaKg3=false;
			_hindSusAreaInMap();
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

function removeGpsOverlays(gpsId){
	if(gpss[gpsId]){
		var markerManage =gpss[gpsId];
		baidMap.removeOverlay(markerManage.marker);
		baidMap.removeOverlay(markerManage.label);
		gpss[gpsId]=null;
	}
	removeArrVal(gpsKey,gpsId);
	if(commonAreas[gpsId]){
		for (var i = 0; i < commonAreas[gpsId].length; i++) {
			var markerManage =commonAreas[gpsId][i];
			baidMap.removeOverlay(markerManage.marker);
			baidMap.removeOverlay(markerManage.label);			
		}
		commonAreas[gpsId]=null;
	}
}

function clearBaiduMap(){	
	//markers={};
	//markerKey=[]; 
	trackList={}; 
	baidMap.clearOverlays();	
	gpss={};
	gpsKey=[];
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
var modelNameArr=new Array("","GM06","GM09","WY200","WY220","GT06S","WY800","WY900","WY710");
	
var loanTypeArr=new Array("","抵押贷款","按揭贷款"); //<a href='javascript:;' onclick=\"_posInfoTrans('"+itemData.gprsCode+"',"+itemData.lng+","+itemData.lat+");\">[点击查看]</a>
function _getContentHtml(itemData,statusInfo,address){
	var analyst;
	if(itemData.analyst!=null){
		analyst = itemData.analyst +"(" +itemData.aphone+")";
	}else{
		analyst = "";
	}
	return "\
	<div class='state-box'>\
		<div class='tit'>\
			<ul class='fl'>\
				<li class='on' style='list-style-type:none;'  onClick='stateTab(this)'>位置状态</li>\
				<li style='list-style-type:none;' onClick='stateTab(this)'>金融信息</li>\
			</ul>\
			<em class='fr'>车牌号码："+ itemData.vehicleNo+"（" +itemData.vehicleType+"）</em>\
		</div>\
		<div class='state-content'>\
			<div class='state-wrap'>\
				<div class='state-list'>\
					<ul>\
						<li class='cols90'><b>设备名称：</b>"+ itemData.gpsName+"（" +itemData.gprsCode+"）</li>\
						<div style='clear:both'></div>\
						<li class='cols90'><b>客户姓名：</b>"+ itemData.customerName+"（" +itemData.customerTel+"）</li>\
						<div style='clear:both'></div>\
						<li><b>设备类型：</b>"+ typeArr[itemData.gpsType] +"（" +modelNameArr[itemData.model]+"）</li>\
						<li><b>物联网卡：</b>"+ itemData.simCode +"</li>\
						<li><b>服务器时间：</b>"+ timeToLongDate3(itemData.updatetime) +"</li>\
						<li><b>定位时间：</b>"+ timeToLongDate3(itemData.lastgpstime) +"</li>\
						<li><b>速度：</b>"+ parseInt(itemData.speed) +"公里/小时</li>\
						<div style='clear:both'></div>\
						<li class='cols90'><b>位置：</b>"+ address+"</li>\
						<div style='clear:both'></div>\
						<li class='cols90'><b>状态：</b>"+ itemData.statusName+itemData.statusPlus+" | "+itemData.statusDes+" "+ itemData.alarmDes +"</li>\
					</ul>\
					<div class='pic'><img id='posImg_"+itemData.gprsCode+"' src='../img/af/"+posImg[itemData.traceStatus]+"' alt='' /></div>\
				</div>\
				<div class='state-list' style='display:none;'>\
					<ul>\
						<li><b>金融性质：</b>"+ loanTypeArr[itemData.loanType] +"</li>\
						<li><b>放款时间：</b>"+ timeToDate(itemData.loanDate) +"</li>\
						<li><b>放款额：</b>"+ itemData.loanAmount +"万</li>\
						<li><b>还款期数：</b>"+ itemData.repayTimes +"期</li>\
						<li><b>还款周期：</b>"+ timeToDate(itemData.repayStartDate)+"—"+ timeToDate(itemData.repayEndDate)+"</li>\
						<li><b>业务经理：</b>"+ itemData.busManager+"（" +itemData.bphone+"）</li>\
						<li><b>风控专员：</b>"+ analyst+"</li>\
					</ul>\
					<div class='pic'><img id='financeImg_"+itemData.gprsCode+"' src='../img/af/"+financeImg[itemData.payStatus]+"' alt='' /></div>\
				</div>\
			</div>\
			<div class='state-foot'>\
				<a class='state-btn' href='playBack.html?gpsName="+escape(itemData.gpsName)+"&gprsCode="+itemData.gprsCode+"' target='_blank'>轨迹回放</a>\
				<a class='state-btn' href='javascript:;' onclick=\"showUpdateCustomerPanel('"+itemData.gpsId+"');\">资料修改</a>\
				<a class='state-btn' href='trackMap.html?gprsCode="+itemData.gprsCode+"' target='_blank'>跟踪街景</a>\
				<a class='state-btn' href='javascript:;' onclick=\"showInstruct('"+itemData.gpsId+"');\">指令下发</a>\
				<a class='state-btn' href='javascript:;' onclick=\"showHistory('"+itemData.gprsCode+"');\">历史报警</a>\
				<a class='state-btn' href='javascript:;' onclick=\"showStatus('"+itemData.gprsCode+"','"+itemData.customerName+"',"+itemData.customerId+","+itemData.traceStatus+","+itemData.payStatus+",'"+itemData.vehicleNo+"');\">状态修改</a>\
				<a class='state-btn' href='javascript:;' onclick=\"show7DaysPark('"+itemData.gpsId+"');\">七日停留</a>\
			</div>\
		</div>\
	</div>";
}


function _getContentHtml2(itemData,statusInfo,address){ 
	var directInfo=getDirectInfo(itemData.direct);
	var statusdes="";
	if(itemData.statusdes!=null && typeof(itemData.statusdes) != "undefined")
		statusdes=itemData.statusdes;
	//alert(statusdes=="undefined");
	//alert(statusdes+"1");
	var alarmdes="";
	if(itemData.alarmdes!=null && typeof(itemData.alarmdes) != "undefined")
		alarmdes=itemData.alarmdes;
	
	var simcode="";
	if(itemData.simcode !=null)
		simcode=itemData.simcode;
	var html =	"<div id='app_"+itemData.gprsCode+"' style='font-weight:normal;'>"
		    +"<div id='app1_"+itemData.gprsCode+"'><b>设备名称：</b>"+itemData.gpsName+"</br></div>"
		    +"<div id='app2_"+itemData.gprsCode+"'><b>设备类型：</b>"+modelNameArr[itemData.model]+"</br></div>"
		    +"<div id='app3_"+itemData.gprsCode+"'><b>物联网卡：</b>"+simcode+"</br></div>"
		    +"<div id='app9_"+itemData.gprsCode+"'><b>服务器时间：</b>"+timeToLongDate3(itemData.updatetime)+"</br></div>"
			+"<div id='app4_"+itemData.gprsCode+"'><b>接收时间：</b>"+timeToLongDate3(itemData.lastgpstime)+"</br></div>"
			+"<div id='app5_"+itemData.gprsCode+"'><b>速度：</b>"+parseInt(itemData.speed)+"公里/小时</br></div>"
			+"<div id='app6_"+itemData.gprsCode+"'><b>方向：</b>"+directInfo["direction"]+"</div>"
			+"<div id='app7_"+itemData.gprsCode+"'><b>状态：</b>"+statusInfo[0]+" | "+statusdes+" "+ alarmdes+"</br></div>"
			+"<div id='app8_"+itemData.gprsCode+"'><b>位置：</b>"+address+"</br></div>";
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

function _createInfoWindow(_marker,istrack,jsonData,statusInfo,address){
	if(istrack==0){
		info_html=_getContentHtml(jsonData,statusInfo);
		opts=_contentOpts1;
	}else{
		info_html=_getContentHtml2(jsonData,statusInfo,address);
		opts=_contentOpts2;
	}
	var _infoWindow = new BMap.InfoWindow(info_html,opts);
	_marker.openInfoWindow(_infoWindow); 
}
function _updateMapInternal(gpsData,upnum,myLatlng,address){
	var directInfo=getDirectInfo(gpsData.direct);
	var statusInfo=getStatusInfo(gpsData.status);
	var pngicon = "../img/monitor/"+statusInfo[1];  
	var _info_html;
	var _contentOpts
	if(_istrack==0){
		_info_html=_getContentHtml(gpsData,statusInfo,address);
		_contentOpts=_contentOpts1;
	}else{
		_info_html=_getContentHtml2(gpsData,statusInfo,address);
		_contentOpts=_contentOpts2;
	}
	if(gpss[gpsData.gpsId]){
		gpss[gpsData.gpsId].latlng=myLatlng;
		gpss[gpsData.gpsId].marker.setIcon(new BMap.Icon(pngicon+directInfo["image"], new BMap.Size(30,30)));
		gpss[gpsData.gpsId].infowindow.setContent(_info_html);
		gpss[gpsData.gpsId].marker.setPosition(myLatlng);
		if(_istrack==0){
			gpss[gpsData.gpsId].label.setPosition(myLatlng);
		}
		gpss[gpsData.gpsId].traceStatus=gpsData.traceStatus;
	}else{	
		var createMark = function(myLatlng, icon,info_html) {  
			var _marker = new BMap.Marker(myLatlng,icon);
			var _infoWindow = new BMap.InfoWindow(info_html,_contentOpts);
            _marker.addEventListener("click", function() {  
                this.openInfoWindow(_infoWindow);  
            });  				           
            return [_marker,_infoWindow];  
        };
        var myIcon = new BMap.Icon(pngicon+directInfo["image"], new BMap.Size(30,30));
        var createArr = createMark(myLatlng, {icon:myIcon},_info_html);
        var marker=createArr[0];
        var infoWindow=createArr[1];
        baidMap.addOverlay(marker);  	
        if(upnum==0){
        	if(_istrack==1){
        	   panorama.setPosition(myLatlng);
        	   panoramaService.getPanoramaByLocation(myLatlng, function(data){
        			if (data == null) {
        				    alert("该坐标街景暂不存在！")
        				    panorama.setPosition(new BMap.Point(120.320032, 31.589666));
        					return;
        				}
        		})
        	}
    		baidMap.setCenter(myLatlng);
    		
    		if(_istrack!=0)
    			marker.openInfoWindow(infoWindow);  
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
    		label = new BMap.Label(gpsData.customerName+" | "+gpsData.gpsName, opts);  // 创建文本标注对象
			label.setStyle({
				padding: "3px 8px",
				color : textColorArr[gpsData.traceStatus],
				backgroundColor : backGroundColorArr[gpsData.traceStatus],//statusInfo[2]
				boxShadow:boxShadowArr[gpsData.traceStatus],
				border: borderArr[gpsData.traceStatus],
				fontSize : "12px",
				fontFamily:"Microsoft YaHei",
				borderRadius:"3px"
			});
			if( namekg == true || (gpsData.traceStatus!=1) ){
				baidMap.addOverlay(label);
			}	
    	}
		var markerManage = new Object();
		markerManage.id = gpsData.gprsCode;
		markerManage.label = label;
		markerManage.marker = marker;
		markerManage.infowindow = infoWindow;
		markerManage.latlng = myLatlng;
		markerManage.traceStatus=gpsData.traceStatus;
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
function geocodeSearch(myLatlng,index){
	var gpsId=_newdata[index].gpsId;
	var myGeo = new BMap.Geocoder(); 
	myGeo.getLocation(myLatlng, function (rs) { 
		var address=rs.address;
		gpsPosCache[gpsId]={};
		gpsPosCache[gpsId].lng=_newdata[index].lng;
		gpsPosCache[gpsId].lat=_newdata[index].lat;
		gpsPosCache[gpsId].myLatlng=myLatlng;
		gpsPosCache[gpsId].posinfo=rs.address;
		_updateMapInternal(_newdata[index],_upnum,myLatlng,address);	
		_upnum++;
	}); 
}
//地址解析
function geocodeSearchTest(lng,lat,myLatlng,index){
	var gpsId=_newdata[index].gpsId;
	var url="http://api.map.baidu.com/geocoder/v2/?ak=fj0xpHMgZtpsrlKnWLGpUdeOOl6idBRo&callback=callback&location=" 
		+ lat + "," + lng + "&output=json&pois=1";
	$.ajax({
		url:url,
		dataType:"jsonp",
		jsonp:"callback",
		type:"get",
		success:function(json){
			//alert(json.result.formatted_address+","+json.result.sematic_description)
			var address=json.result.formatted_address+","+json.result.sematic_description;
			gpsPosCache[gpsId]={};
			gpsPosCache[gpsId].lng=_newdata[index].lng;
			gpsPosCache[gpsId].lat=_newdata[index].lat;
			gpsPosCache[gpsId].myLatlng=myLatlng;
			gpsPosCache[gpsId].posinfo=address;
			_updateMapInternal(_newdata[index],_upnum,myLatlng,address);	
			_upnum++;
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
					
					//geocodeSearch(myLatlng,index);	
					geocodeSearchTest(lng,lat,myLatlng,index);
				}
				
			}
		}
	});
}

//istrack  0最新状态 1跟踪 2轨迹回放
function updateBaiduMap(newdata,istrack){
	_upnum=0;	
	for(var i=newdata.length-1;i>=0;i--){
		var gpsId=newdata[i].gpsId;
		if(gpsPosCache[gpsId] && gpsPosCache[gpsId].lat==newdata[i].lat && gpsPosCache[gpsId].lng==newdata[i].lng){
			_updateMapInternal(newdata[i],_upnum,gpsPosCache[gpsId].myLatlng,gpsPosCache[gpsId].posinfo);
			newdata.splice(i, 1);
			_upnum++;
		}
	}
	_istrack=istrack;
	_newdata=newdata;
	startTransIndex=0;
	trans();
	/**
	var start=0;
	//设定每次处理50个
	var doupdate = function(_start,_end){
		var points = [];
		for(var i=_start;i<_end;i++){
			var point = new BMap.Point(newdata[i].lng,newdata[i].lat);
			points.push(point);
		}
		//坐标转换
		var translateCallback = function (data){
			if(data.status === 0) {
				if(istrack!=0){
					var gprsCode=newdata[0].gprsCode;
					//如果位置跟踪
					if(trackList[gprsCode]){
						var length=trackList[gprsCode].length;
						var old=trackList[gprsCode][length-1];
						trackList[gprsCode].push(data.points[0]);
						addTrack(data.points[0],old);
					} else{
						trackList={};
						trackList[gprsCode]=[];
						trackList[gprsCode].push(data.points[0]);
					}
				}
				for (var i = 0; i < data.points.length; i++) {
					var index=_start+i;
					var myLatlng =data.points[i];
					var myGeo = new BMap.Geocoder(); 
					myGeo.getLocation(myLatlng, function (rs) { 
						var address=rs.address;
						_updateMapInternal(newdata,index,istrack,myLatlng,address);							
					}); 
				}
			}
	    }
		var convertor = new BMap.Convertor();
        convertor.translate(points, 1, 5, translateCallback);
    };
    
    while(newdata.length-start>50){
		var end=start+50;
		doupdate(start,end);
		start=start+50;
	}
	doupdate(start,newdata.length);	
	*/
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
function dealAreaData(areaData){
	clearBaiduMap();
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
			if( areaKg3){
				baidMap.addOverlay(myPolygon);
				baidMap.addOverlay(label);
			}
		}
	}
}

function dealCommonAreaData(gpsId,areaData){
	commonAreas[gpsId]=[];
	for(var i=0;i<areaData.length;i++){	
		var point=new BMap.Point(areaData[i].baidulng,areaData[i].baidulat);
		var circle = new BMap.Circle(point,1000,{
			fillColor:"#13AB77", 
			strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
		var opts = {
			position : point,    // 指定文本标注所在的地理位置
			offset   : new BMap.Size(-10, -10)    //设置文本偏移量						 
		}		
		var label = new BMap.Label(areaData[i].name, opts);  // 创建文本标注对象		
		label.setStyle(areaLabelStyle2);
		
		var markerManage = new Object();
		markerManage.label = label;
		markerManage.marker = circle;	
		commonAreas[gpsId].push(markerManage);
		if( areaKg2){
			baidMap.addOverlay(circle);
			baidMap.addOverlay(label);
		}		
		
	}
}

/*function getStatusInfo(status){
	/*var statusArr=["正常行驶","停车","报警","离线","不定位","停车超时","离线","离线超时"];
	var imageArr=["car_green_","car_red_","car_yellow_","car_gray_","car_no_monitor_","car_purple_","car_black_"];
	var colorArr=["#02df82","#ff0000","#f9f900","#e0e0e0","#e0e0e0","#8080c0","#000000"];
	var statusArr=["行驶","停车","报警","离线","参考定位","基站定位"];
	var imageArr=["car_green_","car_red_","car_yellow_","car_black_","car_no_monitor_","car_purple_"];
	var colorArr=["#02df82","#ff0000","#f9f900","#000000","#e0e0e0","#8080c0"];
	return [statusArr[status-1],imageArr[status-1],colorArr[status-1]];
}*/

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


