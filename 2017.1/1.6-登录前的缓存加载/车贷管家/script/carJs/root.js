/**
 * 获取项目基准path
 *
 * @returns http://localhost:8083/vehicleCloud/
 */
function getRootPath(){  
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp  
     var curWwwPath=window.document.location.href; 
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp  
      var pathName=window.document.location.pathname;  
    var pos=curWwwPath.indexOf(pathName);  
    //获取主机地址，如： http://localhost:8083  
    var localhostPaht=curWwwPath.substring(0,pos);  
    //获取带"/"的项目名，如：/uimcardprj  
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
    return(localhostPaht+projectName+"/");  

}  


//时间转2010-10-20 10:00:00
function getLocalTime(ns) {     
    //return new Date(parseInt(ns)).toLocaleString().substr(0,17);
    //return new Date(parseInt(ns) ).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");  
    
    var   now=new   Date(parseInt(ns));     
    var   year=now.getFullYear();     
    var   month=now.getMonth()+1;     
    var   date=now.getDate();     
    var   hour=now.getHours();     
    var   minute=now.getMinutes();     
    var   second=now.getSeconds();     
    return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
}  
//将秒转换为YYYY-MM-DD HH:MM:SS格式的日期
function timeToLongDate(timeTemp){
	var time = 0;
	if(typeof(timeTemp) != "number" && timeTemp != null && timeTemp != "null" && timeTemp != ""){
		time = parseInt(timeTemp);
	}else if(typeof(timeTemp) == "number"){
		time = timeTemp;
	}else{
		time = '';
	}
	if(time != null && time != ''){
		var timeBegin = new Date(time);
		var validDateBegin = timeBegin.getFullYear() + "-" + GetFullDate(timeBegin.getMonth()+1) + "-" + GetFullDate(timeBegin.getDate()) + " " + GetFullDate(timeBegin.getHours()) + ":" + GetFullDate(timeBegin.getMinutes()) + ":" + GetFullDate(timeBegin.getSeconds());
		return validDateBegin;
	}else{
		return time;
	}
}
//2014年6月18日 
function getDayDate(ns){
	if(ns==null)
		return "";
	var   now=new   Date(parseInt(ns));     
    var   year=now.getFullYear();     
    var   month=now.getMonth()+1;     
    var   date=now.getDate();    
    return   year+"-"+month+"-"+date; 
}


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}


/**
 * 中文转译
 * @param name
 * @returns
 */
function getUrlParam2(name) {
	var params = decodeURIComponent(window.location.href).split("?")[1].split("&");
	for(var i= 1 ;i<params.length; i++){
		var en = params[i].split("=");
		if(en[0]==name){
			return en[1];
		}
	}
}
//显示对话框
function dialog2(content) {
	$("#cancel").hide();
	$("#confirm").addClass("fr");
	$("#confirm").click(function() {
		$("#div1").hide();
	});
	$("#pc").html(content);
	$("#div1").show();
}

function deepCopy(source) { 
	var result={};
	for (var key in source) {
      result[key] = typeof source[key]==='object'? deepCoyp(source[key]): source[key];
   } 
   return result; 
}

var customerStatusArr=["","正常","可疑","高危"];	
var alarmArr=[];
alarmArr["011"]="低电报警";
alarmArr["010"]="断电报警";
alarmArr["001"]="震动报警";
alarmArr["100"]="sos求救";
alarmArr["101"]="未进常用区域";
alarmArr["102"]="进可疑区域";
alarmArr["103"]="可疑区域停车超时";
alarmArr["104"]="出行政区域";
alarmArr["105"]="停车超时";
alarmArr["106"]="离线超时";
