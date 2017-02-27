//将url中?之后的参数转换为数组
function GetRequest()  
{  
	var url = location.search; //获取url中"?"符后的字串  
	var theRequest = new Object();  
	if(url.indexOf("?") != -1)  {
		var str = url.substr(1);  
		strstrs = str.split("&");  
		for(var i = 0; i < strs.length; i ++)  {  
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
		}  
	}  
	return theRequest;  
}

//获取url中参数
function GetQueryString(name)     
{     
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");     
     var r = window.location.search.substr(1).match(reg);     
     if(r!=null)
    	 return unescape(r[2]);
     return null;     
} 

//将null值转换为""
function nullToString(aa){
	if(aa == null || aa == "null"){
		return "";
	}else{
		return aa;
	}
}

//将空值转换为&nbsp;
function nullToNbsp(aa){
	if(aa == null || aa == "null" || $.trim(aa) == ""){
		return "&nbsp;";
	}else{
		return aa;
	}
}

//将null只转换为空格
function nullToBlank(aa){
	if(aa == null || aa == "null"){
		return " ";
	}else{
		return aa;
	}
}

//将null只转换0
function nullToZero(aa){
	if(aa == null || aa == "null"){
		return "0";
	}else{
		return aa;
	}
}

//将null只转换为100000000
function nullToOther(aa){
	if(aa == null || aa == "null" || aa == ""){
		return "100000000";
	}else{
		return aa;
	}
}

//处理返回的二维json值
function jsonTras(str0,str1,data){
	if(data[str0] != null && data[str0][str1] != null){
		return data[str0][str1];
	}else{
		return "";
	}
}

/*	处理返回值为一维的json值
 * @param String
 */
function jsonToArray(jsonData){
	var data = new Array();
	if(jsonData != null){
		var jsonString = JSON.stringify(jsonData);
		jsonString = jsonString.substring(2, jsonString.length-2);
		jsonString = jsonString.replace(/\\/g, "");	//去除数据中的斜杠
		jsonString = jsonString.replace(/\"/g, "");	//去除数据中的引号
		var dataTemp = new Array();
		dataTemp = jsonString.split(",");
		if(dataTemp != null && dataTemp.length > 0){
			var data = new Array(dataTemp.length);
			for(var i = 0; i < dataTemp.length; i++){
				var temp = dataTemp[i].split(":");
				data[temp[0]] = nullToString(temp[1]);
			}
		}
	}
	return data;
}

/*	处理返回值为一维的json值
 * @param Object
 */
function jsonToArrayNew(json){
	var jsonData = JSON.stringify(json);;
	var data = new Array();
	if(jsonData != null){
		var jsonString = JSON.stringify(jsonData);
		jsonString = jsonString.substring(2, jsonString.length-2);
		jsonString = jsonString.replace(/\\/g, "");	//去除数据中的斜杠
		jsonString = jsonString.replace(/\"/g, "");	//去除数据中的引号
		var dataTemp = new Array();
		dataTemp = jsonString.split(",");
		if(dataTemp != null && dataTemp.length > 0){
			var data = new Array(dataTemp.length);
			for(var i = 0; i < dataTemp.length; i++){
				var temp = dataTemp[i].split(":");
				data[temp[0]] = nullToString(temp[1]);
			}
		}
	}
	return data;
}

function isEmpty(v){
	switch (typeof v){
		case 'undefined' : return true;
		case 'string' : if($.trim(v).length == 0) return true; break;
		case 'boolean' : if(!v) return true; break;
		case 'number' : if(0 === v) return true; break;
		case 'object' :
			if(null == v) return true;
		break;
	}
	return false;
}

function stringIfEmpty(v){
	if(v == null || $.trim(v).length == 0){
		return true;
	}else{
		return false;
	}
}

function stringIfEqual(o,v){
	if(o == null || $.trim(o).length == 0){
		if(v != null && v != ""){
			return false;
		}else{
			return true;
		}
	}else{
		if(o == v){
			return true;
		}
	}
}

function openMiddle(url, name, para, height, width){
	var iLeft=(window.screen.availWidth-width)/2;
	var iTop=(window.screen.availHeight-height)/2;
	if(iLeft<0) iLeft=0;
	if(iTop<0) iTop=0;
	para = para + ",top=" + iTop + ",left=" + iLeft + ',height=' + height + ',width=' + width;
	window.open(url, name, para);
}

//判断浏览器
function checkExpoler(){
	var ua = navigator.userAgent.toLowerCase();
	var type = "";
	if(ua.indexOf("msie") > 0){
		type = "msie";
	}
	if(ua.indexOf("chrome") > 0){
		type = "chrome";
	}
	if(ua.indexOf("firefox") > 0){
		type = "firefox";
	}
    return type;
}

//判断值是否为空或者null，如果是返回false
function isNotNull(aa){
	if(aa == null || aa == "null" || aa == ""){
		return false;
	}else{
		return true;
	}
}


/******************************************日期相关Begin******************************************/
//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
//(new Date()).Format("yyyy-MM-dd")      ==> 2006-07-02 
Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
}

//获得当前时间格式换为YYYY-MM-DD HH:MM:SS.0
function getCurentTime(){ 
    var now;
    var url = '/zjyzgl/publicUtilsAction/getCurrentDate'+getDc2();  
    $.get(url, function(dataCurrTime) {
		 now = timeToLongDate2(dataCurrTime);
    });
    return now;
}

//获得当前时间格式换为YYYY-MM-DD
function getCurentTimeShort(){ 
    var now;
    var url = '/zjyzgl/publicUtilsAction/getCurrentDate'+getDc2();  
	 $.get(url, function(dataCurrTime) {
		 now = timeToDate(dataCurrTime);
	 });

    return now;
}

//将标准日期格式（Thu Mar 01 2018 00:00:00 GMT+0800）转为YYYY-MM-DD
function tranShortDate(date){
	var year = date.getFullYear();       //年
    var month = date.getMonth() + 1;     //月
    var day = date.getDate();            //日
   
    var clock = year + "-" + GetFullDate(month) + "-" + GetFullDate(day);

    return clock;
}

//将标准日期格式（Thu Mar 01 2018 00:00:00 GMT+0800）转为YYYY-MM-DD HH:MM:SS.0
function tranLongDate(date){
	var year = date.getFullYear();       //年
    var month = date.getMonth() + 1;     //月
    var day = date.getDate();            //日
   
    var hh = date.getHours();            //时
    var mm = date.getMinutes();          //分
    var ss = date.getSeconds();
   
    var clock = year + "-" + GetFullDate(month) + "-" + GetFullDate(day) + " " + GetFullDate(hh) + ":" + GetFullDate(mm) + ":" + GetFullDate(ss) + ".0";
    return clock;
}

//计算日期 日期+天  
function   AddDays(date,value){
	var tempD = new Date(date);
	tempD.setDate(tempD.getDate()+value);
	return tempD;
} 
 
//计算日期 日期+月  
function   AddMonths(date,value){
	var tempD = new Date(date);
	tempD.setMonth(tempD.getMonth()+value);  
	return tempD;
}  
 


//计算日期 日期+月  
function   datePlusMonth(date,value){
	var dateT =  new Date(date.replace(/-/g,"/"));
	var finalMonth = dateT.getMonth()+value;
	dateT.setMonth(finalMonth);  
	return tranShortDate(dateT);
}  


  
//计算日期 日期+年数
function datePlusYears(date, years){
	//date为YYYY-MM-DD格式的字符串
	var dateT =  new Date(date.replace(/-/g,"/"));
	dateT.setFullYear(dateT.getFullYear() + years);
	return tranShortDate(dateT);
//　　　　case "q " : 
//　　　　　　dateT.setMonth(dateT.getMonth()+number*3);
//　　　　　　return dateT;
//　　　　　　break;
//　　　　case "m " : 
//　　　　　　dateT.setMonth(dateT.getMonth()+number);
//　　　　　　return dateT;
//　　　　　　break;
//　　　　case "w " : 
//　　　　　　dateT.setDate(dateT.getDate()+number*7);
//　　　　　　return dateT;
//　　　　　　break;
//　　　　case "d " : 
//　　　　　　dateT.setDate(dateT.getDate()+number);
//　　　　　　return dateT;
//　　　　　　break;
//　　　　case "h " : 
//　　　　　　dateT.setHours(dateT.getHours()+number);
//　　　　　　return dateT;
//　　　　　　break;
//　　　　case "m " : 
//　　　　　　dateT.setMinutes(dateT.getMinutes()+number);
//　　　　　　return dateT;
//　　　　　　break;
//　　　　case "s " :
//　　　　　　dateT.setSeconds(dateT.getSeconds()+number);
//　　　　　　return dateT;
//　　　　　　break;
//　　　　default : 
//　　　　　　dateT.setDate(dateT.getDate()+number);
//　　　　　　return dateT;
//　　　　　　break;
}


//将YYYY-MM-DD格式日期转换为YYYY-MM-DD HH:MM:SS.0
function trTimeType(time){
	if(time == null || $.trim(time) == ""){
		time = '2999-01-01 00:00:00.0';
	}else{
		time = time + ' 00:00:00.0';
	}
	return time;
}


//将YYYY-MM-DD格式日期转换为YYYY-MM-DD HH:MM:SS.0
function trTimeType2(time){
	if(time == null || $.trim(time) == ""){
		time = '';
	}else{
		time = time + ' 00:00:00.0';
	}
	return time;
}

//将string(yyyy-MM-dd) 格式转换为date格式
function stringTodate(time){
	var arr = time.split("-");
	if(arr[1].substring(0,1) == "0"){
		arr[1] = arr[1].substring(1);
	}
	if(arr[2].substring(0,1) == "0"){
		arr[2] = arr[2].substring(1);
	}
	var date = new Date(arr[0],parseInt(arr[1])-1,arr[2]);
	return date;
}

//将秒转换为YYYY-MM-DD格式的日期
function timeToDate(timeTemp){
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
		var validDateBegin = timeBegin.getFullYear() + "-" + GetFullDate(timeBegin.getMonth()+1) + "-" + GetFullDate(timeBegin.getDate());
		return validDateBegin;
	}else{
		return time;
	}
}

//将秒转换为YYYY-MM-DD HH:MM格式的日期
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
		var validDateBegin = timeBegin.getFullYear() + "-" + GetFullDate(timeBegin.getMonth()+1) + "-" + GetFullDate(timeBegin.getDate()) + " " + GetFullDate(timeBegin.getHours()) + ":" + GetFullDate(timeBegin.getMinutes());
		return validDateBegin;
	}else{
		return time;
	}
}

//将秒转换为YYYY年MM月DD日 HH时MM分格式的日期
function timeToLongDateFormat(timeTemp){
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
		var validDateBegin = timeBegin.getFullYear() + "年" + GetFullDate(timeBegin.getMonth()+1) + "月" + GetFullDate(timeBegin.getDate()) + "日 " + GetFullDate(timeBegin.getHours()) + "时" + GetFullDate(timeBegin.getMinutes())+"分";
		return validDateBegin;
	}else{
		return time;
	}
}

//将秒转换为YYYY年MM月DD日 格式的日期
function timeToShortDateFormat(timeTemp){
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
		var validDateBegin = timeBegin.getFullYear() + "年" + GetFullDate(timeBegin.getMonth()+1) + "月" + GetFullDate(timeBegin.getDate()) + "日 ";
		return validDateBegin;
	}else{
		return time;
	}
}

//将秒转换为YYYY-MM-DD HH:MM:SS.0格式的日期
function timeToLongDate2(timeTemp){
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
		var validDateBegin = timeBegin.getFullYear() + "-" + GetFullDate(timeBegin.getMonth()+1) + "-" + GetFullDate(timeBegin.getDate()) + " " + GetFullDate(timeBegin.getHours()) + ":" + GetFullDate(timeBegin.getMinutes()) + ":" + GetFullDate(timeBegin.getSeconds()) + ".0";
		return validDateBegin;
	}else{
		return time;
	}
}
//将秒转换为YYYY-MM-DD HH:MM:SS格式的日期
function timeToLongDate3(timeTemp){
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
//将秒转化为几天几小时几分钟
function formatDuring(timeTemp) {  
    var days = timeTemp / (1000 * 60 * 60 * 24);  
    var hours = (timeTemp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);  
    var minutes = (timeTemp % (1000 * 60 * 60)) / (1000 * 60);  
    var seconds = (timeTemp % (1000 * 60)) / 1000;  
    return parseInt(days) + "天" + parseInt(hours) + "小时" + parseInt(minutes) + "分钟";  
}  

//返回日月 （修正为两位数） 
function GetFullDate(date){
	if(date <= 9){
		return "0" + date.toString();
	}else{
		return date;
	}
}

//判断两个日期大小
function compareDate(date1, date2) {
	//date1,date2格式为yyyy-MM-dd
	var date1 = date1.split('-');
	var date2 = date2.split('-');
	
	for (var i = 0; i < 3; i++) {
		var first = new Number(date1[i]);
		var second = new Number(date2[i]);
		
		if (first < second) {
			//date1<date2
			return -1;
		} else if (first > second) {
			//date1>date2
			return 1;
		}
	}
	//date1=date2
	return 0;
}

function  dateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式    
    var  aDate,  oDate1,  oDate2,  iDays;
    aDate  =  sDate1.split("-");
    oDate1  =  new Date(aDate[0],aDate[1],aDate[2]);    //转换为2006-01-01格式    
    aDate  =  sDate2.split("-");
    oDate2  =  new Date(aDate[0],aDate[1],aDate[2]);   
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数   
    return  iDays + 1;
}

//获得一年年底格式为yyyy-12-31
function getEndOfYear(tempDate){ 
  var year = tempDate.getFullYear();       //年
  var month = 12;     //月
  var day = 31;            //日
 
  var clock = year + "-" + GetFullDate(month) + "-" + GetFullDate(day);

  return clock;
}

//时间参数 &dc=******
function getDc1(){
	var date = new Date();
	return "&dc=" + date.getTime();
}

//时间参数 ?dc=******
function getDc2(){
	var date = new Date();
	return "?dc=" + date.getTime();
}

/******************************************日期相关End******************************************/
   //根据行政区划判断地区车牌开头
    function decidePlant(data,id){
    	var orgaCode=data.substring(0,4);
    	if(orgaCode=="3301"){
    		$(id).val('浙A.');
    	}else if(orgaCode=="3302"){
    		$(id).val('浙B.');
    	}else if(orgaCode=="3303"){
    		$(id).val('浙C.');
    	}else if(orgaCode=="3304"){
    		$(id).val('浙F.');
    	}else if(orgaCode=="3305"){
    		$(id).val('浙E.');
    	}else if(orgaCode=="3306"){
    		$(id).val('浙D.');
    	}else if(orgaCode=="3307"){
    		$(id).val('浙G.');
    	}else if(orgaCode=="3308"){
    		$(id).val('浙H.');
    	}else if(orgaCode=="3309"){
    		$(id).val('浙L.');
    	}else if(orgaCode=="3310"){
    		$(id).val('浙J.');
    	}else if(orgaCode=="3311"){
    		$(id).val('浙K.');
    	}else{
    		$(id).val('浙');
    	}
    }
    
    //根据经营范围获得最短有效期
    function getShortestYear(a){
    	var years = 6;
    	if(a != null && a != ""){
        	var codesArray = a.split(",");
        	$.each(codesArray,function(n,v){
        		if(v.substring(0, 1) == "1"
                        || v.substring(0, 1) == "2"
                        || v.substring(0, 1) == "3"
                        || v.substring(0, 1) == "6"){
                    //从事道路客、货运输及客、货运站场类经营业务的许可证件有效期为4年
                    if(years > 4){
                        years = 4;
                    }
                }else if(v.substring(0, 2) == "41"
                        || v.substring(0, 2) == "42"){
                    //从事一、二类汽车维修业务以及一类摩托车维修业务的经营许可证有效期为6年，
                    if(years > 6){
                        years = 6;
                    }
                }else if(v.substring(0, 2) == "43"
                        || v.substring(0, 2) == "44"
                        || v.substring(0, 2) == "45"){
                    //从事三类汽车维修业务、二类摩托车维修业务以及其他机动车维修业务的经营许可证有效期为3年，
                    if(years > 3){
                        years = 3;
                    }
                }else if(v.substring(0, 2) == "51"
                        || v.substring(0, 2) == "53"){
                    //从事普通机动车驾驶员培训业务和机动车驾驶员培训教练场经营业务的许可证件有效期为6年
                    if(years > 6){
                        years = 6;
                    }
                }else if(v.substring(0, 2) == "52"
                    || v.substring(0, 1) == "7"
                    || v.substring(0, 1) == "8"){
                    //从事道路运输驾驶员从业资格培训业务的许可证件有效期为4年
                    //从事国际道路运输经营业务的许可证件有效期为4年
                    if(years > 4){
                        years = 4;
                    }
                }
        	});
        	return years;
        }else{
        	return 4;
        }
    }
    

    function addComboboxBlank(id,a,b){
    	//学历
        var data = $('#' + id).combobox('getData');
        var dataStrings = JSON.stringify($('#' + id).combobox('getData')).substring(1,JSON.stringify($('#' + id).combobox('getData')).length-1);
        var recordTemp = '{"' + a + '":"","' + b + '":"&nbsp;","selected":true}';
        dataStrings = recordTemp + ',' + dataStrings;
        var localData = '[' + dataStrings +']';
        $('#' + id).combobox('loadData', JSON.parse(localData));
        $('#' + id).combobox('setText','');
    }

    //以**结尾
    String.prototype.endWith=function(s){
  	  if(s==null||s==""||this.length==0||s.length>this.length)
  	     return false;
  	  if(this.substring(this.length-s.length)==s)
  	     return true;
  	  else
  	     return false;
  	  return true;
  	 }
  //以**开始
  	 String.prototype.startWith=function(s){
  	  if(s==null||s==""||this.length==0||s.length>this.length)
  	   return false;
  	  if(this.substr(0,s.length)==s)
  	     return true;
  	  else
  	     return false;
  	  return true;
  	 }