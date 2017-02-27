/*header*/
$("#code").hover(function(){
	$(this).children(".everycode").toggle();
});
$(".head-sec-t").click(function(){
	if($(this).siblings(".head-sec").hasClass("none")){
		$(this).siblings(".head-sec").removeClass("none");
		$(this).removeClass("hlist-move");
		$(this).addClass("open");
		$(this).children(".icon").addClass("icon-upblack");
	}else{
		$(this).siblings(".head-sec").addClass("none");
		$(this).removeClass("open");
		$(this).addClass("hlist-move");
		$(this).children(".icon").removeClass("icon-upblack");
	}
});

//关闭状态弹框
function closeZt(){$(".zt-list").hide();}
function closeBind(ele){$(ele).parents(".bind-sb").hide();}
/*切换*/
$(".switch").children().click(function(){
	var index=$(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$(this).parent().parent().parent().find(".switch-content").hide();
	$(this).parent().parent().parent().find(".switch-content").eq(index).show()
})

/*下拉框*/
$(document).click(function (event) { 
	$(".choose").find(".chooseOption").hide(); //任何地方点击都隐藏
	$(".vehicleChoose").find(".voption").hide();
	$(".vehicleChoose").find(".voption").hide();
	$(".clientChoose").find(".coption").hide();
	$(".clientChoose2").find(".coption2").hide();
	$(".simChoose").find(".soption").hide();
});
$(".choose").click(function(event){
	alert(1)
	event.stopPropagation(); //当前点击时阻止隐藏
	$(this).find(".chooseOption").toggle().parents().siblings().find(".chooseOption").hide();
	/*$(".chooseOption li").each(function(index) {
        var chooseliTit=$(this).attr("title");
	    $(this).attr("title",$(this).text());
    });*/
});
$(".treeChoose").click(function(event) {
	event.stopPropagation();
	$(this).find(".option").show().parents().siblings().find(".option").hide();
});
$(".choose").on("click","li",function(){
	var type = $(this).parent().parent().attr("data-type");
	$(this).parent().parent().find(".chooseTitle").text($(this).text());
	var chooseTit = $(".chooseTitle").attr("title");
	//alert($(this).text());
	$(".chooseTitle").attr("title", $(this).text());
	//alert($(this).val());
	//alert($(this).val());
	var val = $(this).val();
	if($(this).text()=="")
		val = "";
	$(this).parent().parent().children("input").val(val);
	//alert($(this).parent().parent().children("input").val());
	return;
});
$(".vehicleChoose").on("click", "li", function() {
	
		$('#selectVehicle').val($(this).val());
		$('#vehicleNoSearchInput').val($(this).html());
		$(this).parents().find(".voption").hide();
		//return;
	});
$('#vehicleNoSearchInput').bind(
		'input propertychange',
		function() {
			var vehicleNo = $('#vehicleNoSearchInput').val();
			$(this).parents().find(".voption").show();

			var vehicleList = $(this).parents().find(".voption");
			
			$.ajax( {
				type : "POST",
				url : '/vehicleCloud/investigate/getVeliche',
				data : {
					vehicleNo : vehicleNo
				},
				dataType : 'json',
				async : true,
				success : function(jsonData) {
					vehicleList.empty();
					for ( var i = 0; i < jsonData.length; i++) {
						var htmlLi = "  <li value=" + jsonData[i].id + ">"
								+ jsonData[i].vehicleno +"("+jsonData[i].vehiclevin+")"+"</li>";
						vehicleList.append(htmlLi);
					}
				}
			});
		});
/*复选框*/
$('.all-chk').click(function(){
	if($(this).prop('checked')){
		$('.detail-chk:visible').prop('checked','checked')
	}else{
		$('.detail-chk:visible').removeProp('checked','checked')
	}
});


$(".chkWrap").on('click','.chk-check-wrap',function(){
	if($(this).hasClass("chk-checked")){
		$(this).toggleClass("chk-check-on");
	}
})
/*单选框*/
$(".radios").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
});
/*侧边导航*/
$(document).ready(function(){
	$(".main-box",parent.document.body).css({"left":180+"px"});
	$("body>iframe",parent.document).css({"left":0+"px"});
	$(".menu-first-tit").click(function(){
		if($(this).siblings().css("display")=="block"){
			$(this).find(".icon-down").css("transform","rotate(-90deg)");
			$(this).siblings().slideUp();
			$(this).css({"background-color":"#37424e","border-bottom":"1px solid #414d5c"});
		}else{
			$(this).find(".icon-down").css("transform","rotate(0deg)");
			$(this).siblings().slideDown();
			$(this).css({"background-color":"#22282e","border":"none"});
		}
	});
	$(".menu-second a").hover(function(){
		$(this).children("span").addClass("on");
	},function(){
		$(this).children("span").removeClass("on");
	});
	$(".menu-btn").click(function(){
		if($(this).width()==180){
			$(this).width("50");
			$(this).find("span").css("transform","rotate(-90deg)");
			$(".nav-tit").hide();
			$(".menu-left-wrap").width("50");	
			$(".menu-left-box").width("70");
			$(".main-right",parent.document.body).css("left",50+"px");
			$("#leftFrame",parent.document.body).width(50);
			
		}else{
			$(this).width("180");
			$(this).find("span").css("transform","rotate(0deg)");
			$(".nav-tit").show();
			$(".menu-left-wrap").width("180");	
			$(".menu-left-box").width("200");
			$(".main-right",parent.document.body).css("left",180+"px");
			$("#leftFrame",parent.document.body).width(180);
		}
	});
	$(".menu-third-btn").click(function(){
		//if($(".menu-third").offset().left>=0){
		if($("body>iframe",parent.document).offset().left>=0){
			//$(".menu-third").animate({"left":-180},250);
			$(this).addClass("collapse-right");
			//$(".main-box").animate({"left":0},250);
			//$(".menu-third").animate({"left":-180},250);
			$("body>iframe",parent.document).animate({"left":-180},250);
			//parent.$("body>iframe")[0].contentWindow.animate({"left":-170},250);
			//$("#accountLeftFrame",parent.document.body).width(13);
			$(".main-box",parent.document.body).animate({"left":0},250);
		}else{
			//$(".menu-third").animate({"left":0},250);
			$(this).removeClass("collapse-right");
			//$(".main-box").animate({"left":180},250);
			//$(".menu-third").animate({"left":0},250);
			$("body>iframe",parent.document).animate({"left":0},250);
			//$("#accountLeftFrame",parent.document.body).width(193);
			$(".main-box",parent.document.body).animate({"left":180},250);
		}
	});
	$(".menu-third-tit").click(function(){
		if($(this).siblings(".menu-fourth").css("display")=="block"){
			$(this).find(".icon-down-black").css("transform","rotate(-90deg)");
			$(this).siblings().slideUp();
		}else{
			$(this).find(".icon-down-black").css("transform","rotate(0deg)");
			$(this).siblings().slideDown();
		}
	});
});

/*汽车估价select*/
$(document).ready(function(){
	$(".selectTitle").click(function(event){
		event.stopPropagation();//阻止隐藏、
		$(this).parent().siblings().find(".selectOption").hide();
		$(this).siblings(".selectOption").toggle().parent().parent().siblings().find(".selectOption").hide();
		var _rightList=$(this).siblings().find(".selectRight ul");
		var _leftList=$(this).siblings().find(".selectLeft li");
		_rightList.parent().scrollTop(0);
		var nums=_rightList.length;
		var array=new Array();   
		for(var i=0;i<nums;i++){
			array[i]=_rightList.eq(i).offset().top-_rightList.parent().offset().top+1;
		}
		_leftList.click(function(event){
			event.stopPropagation();
			var _thisIndex=$(this).index();
			var _thistop=array[_thisIndex];
			$(this).parent().find("a").removeClass("on");
			$(this).children("a").addClass("on");
			$(this).parent().siblings(".selectRight").scrollTop(_thistop);
		});	
		_rightList.parent().scroll(function(){
			_leftList.find("a").removeClass("on");
			_leftList.eq(0).children("a").addClass("on");
			for(var i=0;i<nums;i++){
				if($(this).scrollTop()>=array[i]){
					$(this).siblings().find("a").removeClass("on");
					$(this).siblings().children("li").eq(i).children("a").addClass("on");
				}
			};
		});
		
	});
	$(".selectRight li").click(function(){
		var thisText=$(this).children("span").text();
		$(this).parents(".selectWrap").children(".selectTitle").html(thisText);
		$(this).parent().siblings("input").val($(this).text());//赋给input
	});
	$(document).click(function (event) { 
		$(".selectOption").hide();//隐藏
	});
	/*日历*/
	$(".timeList ul").on("click","li",function(event){
		var type=$(this).parent().attr("data-type");//获取类型值
		$(this).addClass("on").siblings().removeClass("on");//切换当前选中值
		if(type=="year"){
			event.stopPropagation();		
		}else{
			$(".year").text($(".yearList .on").text());//插入当前选中年份的值
			$(".month").text($(".monthList .on").text());//插入当前选中月份的值
			var yearVal=$(".yearList .on").attr("data-val");//获取当前选中年份的data-val数据
			$(".yearList").siblings("input").val(yearVal);//并把data-val数据插入对应的input中
			var monthVal=$(".monthList .on").attr("data-val");//获取当前选中月份的data-val数据
			$(".monthList").siblings("input").val(monthVal);//并把data-val数据插入对应的input中
		}
	});
	/*地址*/
	$(".dateList ul").on("click","li",function(event){
		var type=$(this).parent().attr("data-type");//获取类型值
		$(this).addClass("on").siblings().removeClass("on");//切换当前选中值
		if(type=="prov"){
			event.stopPropagation();
			var provVal=$(".provList .on").attr("data-val");//获取当前选中省份的data-val数据
			
			
			//匹配开始
			//$(".cityList").empty();
			//$(".cityList").append('<li data-val="4">天津哦</li>');
			
			
			
		}else{
			$(".prov").text($(".provList .on").text());//插入当前选中省份的值
			$(".city").text($(".cityList .on").text());//插入当前选中城市的值
			var provVal=$(".provList .on").attr("data-val");//获取当前选中省份的data-val数据
			$(".provList").siblings("input").val(provVal);//并把data-val数据插入对应的input中
			var cityVal=$(".cityList .on").attr("data-val");//获取当前选中城市的data-val数据
			$(".cityList").siblings("input").val(cityVal);//并把data-val数据插入对应的input中
		}
		
	});
	
});
//图片放大
$(function(){
	$("#upImg li").mouseover(function(e){
		var thisX = $(this).position().left;
		var thisImg=$(this).children("img").attr("src");
		var tooltip = "<div id='tooltip'><img style='width:100%;height:100%;vertical-align:middle;' src='"+ thisImg +"' alt='预览图'/><\/div>";
		$("#upImg").append(tooltip);             
		$("#tooltip").css({
			"width":350+"px",
			"height":350+"px",
			"line-height":350+"px",
			"text-align":"center",
			"border":"1px solid #ddd",
			"position":"absolute",
			"padding":"5px",
			"background-color":"#fff",
			"top":-370+"px",
			"left":thisX-10+"px"
		}).show("fast");
	}).mouseout(function(){  
		$("#tooltip").remove();
	});
})


/**
 * 根据输入进行组织的模糊查询
 */
$('#clientSearchInput').bind(
		'input propertychange',
		function() {
			var clientName = $('#clientSearchInput').val();
			$(this).parents().find(".coption").show();
			
			var vehicleList = $(this).parents().find(".coption");
			
			$.ajax( {
				type : "POST",
				url : '/vehicleCloud/client/myClients',
				data : {
					clientName : clientName
				},
				dataType : 'json',
				async : true,
				success : function(jsonData) {
					vehicleList.empty();
					for ( var i = 0; i < jsonData.length; i++) {
						var htmlLi = "  <li value=" + jsonData[i].id + ">"
								+ jsonData[i].name + "</li>";
						vehicleList.append(htmlLi);
					}
				}
			});
		});

/**
 * 下拉框选择组织
 */
$(".clientChoose").on("click", "li", function() {
	//$('#vehicleNoSearchInput').val($(this).text());
		$('#selectClient').val($(this).val());
		$('#clientSearchInput').val($(this).html());
		$("#selectClientName").val($(this).html());
		$(this).parents().find(".coption").hide();
		
		if ($.isFunction(window.findClientPro))
			findClientPro($(this).val());
		 
		event.stopPropagation();
		//return;
	});

/**
 * 根据输入进行组织的模糊查询
 */
$('#clientSearchInput').bind(
		'input propertychange',
		function() {
			var clientName = $('#clientSearchInput').val();
			$(this).parents().find(".coption").show();
			
			var vehicleList = $(this).parents().find(".coption");
			
			$.ajax( {
				type : "POST",
				url : '/vehicleCloud/client/myClients',
				data : {
					clientName : clientName
				},
				dataType : 'json',
				async : true,
				success : function(jsonData) {
					vehicleList.empty();
					for ( var i = 0; i < jsonData.length; i++) {
						var htmlLi = "  <li value=" + jsonData[i].id + ">"
								+ jsonData[i].name + "</li>";
						vehicleList.append(htmlLi);
					}
				}
			});
		});

/**
 * 下拉框选择组织
 */
$(".clientChoose").on("click", "li", function() {
	//$('#vehicleNoSearchInput').val($(this).text());
		
		$('#selectClient').val($(this).val());
		$('#clientSearchInput').val($(this).html());
		$("#selectClientName").val($(this).html());
		$(this).parents().find(".coption").hide();
		event.stopPropagation();
		//return;
	});

/**
 * 仅对上一级进行搜索
 */
$('.clientSearchClass').bind(
		'input propertychange',
		function() {
			var clientName = $(this).val();
			
			$(this).parent().find(".coption2").show();
			var vehicleList = $(this).parent().find(".coption2");			
			$.ajax( {
				type : "POST",
				url : '/vehicleCloud/client/myClients',
				data : {
					clientName : clientName
				},
				dataType : 'json',
				async : true,
				success : function(jsonData) {
					vehicleList.empty();
					for ( var i = 0; i < jsonData.length; i++) {
						var htmlLi = "  <li value=" + jsonData[i].id + ">"
								+ jsonData[i].name + "</li>";
						vehicleList.append(htmlLi);
					}
				}
			});
		});

	$(".clientChoose2").on("click", "li", function() {
		$('#selectClient2').val($(this).val());
		$(this).parent().parent().find(".clientSearchHidden").val($(this).val());
		$(this).parent().parent().find(".clientSearchClass").val($(this).html());
		$(this).parent().parent().find(".coption").hide();
	});
	
	
/**
 * 根据输入进行sim的模糊查询
 */
$('#simSearchInput').bind(
		'input propertychange',
		function() {
			var simCord = $('#simSearchInput').val();
			$(this).parents().find(".soption").show();
			
			var simCordList = $(this).parents().find(".soption");
			
			$.ajax( {
				type : "POST",
				url : '/vehicleCloud/simCord/getSimCord',
				data : {
					simCord : simCord
				},
				dataType : 'json',
				async : true,
				success : function(jsonData) {
					simCordList.empty();
					for ( var i = 0; i < jsonData.length; i++) {
						var htmlLi = "  <li value=" + jsonData[i].simcode + ">"
								+ jsonData[i].simcode + "</li>";
						simCordList.append(htmlLi);
					}
				}
			});
		});

/**
 * 下拉框选择sim卡
 */
$(".simChoose").on("click", "li", function() {
	//$('#vehicleNoSearchInput').val($(this).text());
		$('#selectSim').val($(this).html());
		$('#simSearchInput').val($(this).html());
		$(this).parents().find(".soption").hide();
		event.stopPropagation();
		//return;
	});


$('.chk-check-wrap').click(function() {
	$(this).toggleClass('chk-check-on');
	if ($(this).attr("id") == 'ca') {
		cbAll(this);
	}
});

//自定义checkbox的全选事件
function cbAll(o) {
	$("i").each(function() {
		if($(this).attr("id") != 'ca' && $(this).hasClass('chk-check-wrap'))
			$(this).toggleClass('chk-check-on');		
	});	
}



var LocString=String(window.document.location.href);   
//获取html传过来的参数   
function getQueryStr(str){   
    var rs = new RegExp("(^|)"+str+"=([^/&]*)(/&|$)","gi").exec(LocString), tmp;   
   
    if(tmp=rs){   
        return tmp[2];   
    }   
   
    // parameter cannot be found   
    return "";   
} 

var eStatusArr=new Array("正常","维修中","已报废");

var typeArr=new Array("","有线","无线","OBD");
var modelNameArr=new Array("","GM06","GM09","WY200","WY220","GT06S","WY800","WY900","WY710","WYA5C-3","WYMini","GV20","WYT1S","WY900S","WY600","GT16","WY900C","WY-T2A","WYminiS");

$(".gpsModelOption").append('<li value="1">GM06</li><li value="2">GM09</li><li value="3">WY200</li><li value="4">WY220</li>'
		+'<li value="5">GT06S</li><li value="6">WY800</li><li value="7">WY900</li><li value="8">WY710</li>'
		+'<li value="9">WYA5C-3</li><li value="10">WYMini</li><li value="11">GV20</li><li value="12">WYT1S</li>'
		+'<li value="13">WY900S</li><li value="14">WY600</li><li value="15">GT16</li><li value="16">WY900C</li>'
		+'<li value="17">WY-T2A</li><li value="18">WYminiS</li>');

var MODEL_GM06=1;
var MODEL_GM09=2;
var MODEL_WY200=3;
var MODEL_WY220=4;
var MODEL_GT06s=5;
var MODEL_WY800=6
var MODEL_WY900=7;
var MODEL_WY710=8;
var MODEL_WYA5C3=9;
var MODEL_WYMini=10;
var MODEL_GV20=11;
var MODEL_WYT1S=12;
var MODEL_WY900S=13;
var MODEL_WY600=14;  //无线
var MODEL_GT16=15;   //有线
var MODEL_WY900C=16; 
var MODEL_WYT2A=17; 
var MODEL_WYminiS=18;//220

function getGpsType(model){
	if(model==2 || model==6 || model==7 || model==8 || model==9 || model==13 || model ==14 || model==16)
		return 2;
	if(model==1 || model==3 || model==4  || model==5 || model==10 || model==11 || model ==12 || model == 15 || model==17 || model==18)
		return 1;	
}

var loanTypeArr = new Array("","抵押贷款","按揭贷款","分期贷款");
//套餐类
var pTypeArr = new Array("","5M/月","10M/月","20M/月","30M/月");
//卡商
var cardArr = new Array("","移动","联通","电信");
//卡商
var cardArr = new Array("","移动","联通","电信");

var payWayArr=new Array("","包年收费","终身服务","赠送服务");
var statusArr=["","行驶","停车","报警","离线","参考定位","基站定位"];

//回款状态
var payStatusArr = new Array("","正常", "逾期", "不良", "拖车" ,"结清");
var psColorArr = new Array("","green", "red", "purple", "orange","skyblue");
var psColorArr2 = new Array("","greencir", "redcir", "purplecir", "orangecir","skybluecir");
var traStatusArr = new Array("","正常", "可疑", "高危");
var traColorArr = new Array("","greencir", "orangecir", "redcir");
//消息类型
var arrMsgType = new Array("","车贷管家消息","产品消息","升级消息","服务消息","活动消息");
//日期
//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
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
//日期+天
function AddDays(d, n) {
  var t = new Date(d);//复制并操作新对象，避免改动原对象
  t.setDate(t.getDate() + n);
  return t;
}

//日期+月。日对日，若目标月份不存在该日期，则置为最后一日
function AddMonths(d, n) {
  var t = new Date(d);
  t.setMonth(t.getMonth() + n);
  if (t.getDate() != d.getDate()) { t.setDate(0); }
  return t;
}

//日期初始化
function initDate(date){
	if(date.length == 0){
	var time2 = new Date();
	var date2 = time2.Format("yyyy-MM-dd");
	$("#calen3").val(date2);
	var time1 = AddDays(time2,-7);
	var date1 = time1.Format("yyyy-MM-dd");
	$("#calen2").val(date1);
	}
}

/*对话框*/
//显示对话框
function dialog(id, type, content, url) {
	//type=1:单个删除；type=2:多个删除;type=3:错误提示;type=4:成功提示
	if (type == 1)
		$("#confirm").unbind("click").click(function() {
			singleDel(id,url);
			closeDialog(); 
		});
	else if (type == 2)
		$("#confirm").unbind("click").click(function() {
			mutipleDel(url);
			closeDialog(); 
		});
	else if (type == 3) {
		$("#cancel").hide();
		$("#confirm").addClass("fr");
		$("#confirm").unbind("click").click(function() {
			closeDialog();
		});
	} else if (type == 4) {
		$("#cancel").hide();
		$("#confirm").addClass("fr");
		$("#confirm").unbind("click").click(function() {
			closeDialog();
		});
	}
	$("#pc").html(content);
	$("#div1").show();
}

//关闭对话框
function closeDialog() {
	$("#confirm").removeClass("fr");
	$("#cancel").show();
	$("#div1").hide();
	$("#message").val("");
}

//单个删除
function singleDel(id,url) {
	$.ajax({
		url:path + url,
		type:"POST",
		datatype:"json",
		success:function (data){
			if(data != ''){
				//返回的数据不为null
				if (data.success) {
					refresh();
				} else {
					dialog(0, 4, data.msg,"");
				}
			}else
				dialog(0, 4, "对不起，您没有该权限！","");
				//alert("对不起，您没有该权限！")
		}
	})		
}


//多个删除（自定义checkbox）
function mutipleDel(url) {
	var selectedUseIds = new Array();
	$('.chk-check-on').each(function() {
		if($(this).attr("id") != 'ca')
			selectedUseIds.push($(this).children().val());
	});
	if (selectedUseIds.length == 0) {
		alert("至少选择一个待删除记录！");
		return false;
	}
	var url = path + url;
	$.ajax({
		url : url,
		type : "post",
		data : {
			delids : selectedUseIds.join(",")
		},
		datatype : "json",
		success : function(data) {
			if(data != ''){
				//返回的数据不为null
				if (data.success) {
					refresh();
				} else {
					dialog(0, 4, data.msg,"");
				}
			}else
				alert("对不起，您没有该权限！")
		}
	})
}



//时间格式化显示 
var ymdStyle="yyyy-MM-dd";
var ymdhmsStyle="yyyy-MM-dd hh:mm:ss"
function format(date,style){
	var time = new Date(date);
	return time.Format(style)
}

// $("#mapChoose").on('click', '.mapTit', function(event) {
//     alert(0);
//     event.preventDefault();
//     /* Act on the event */
// });
$(document).click(function(mapT) {
	$(".mapListShow").hide();
});
$(".mapTit").click(function(mapT){
	mapT.stopPropagation();
	$(this).parent().children("ul").show();
})

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
var path = getRootPath();
//全局的ajax访问，处理ajax清求时sesion超时  
$.ajaxSetup({  
    contentType:"application/x-www-form-urlencoded;charset=utf-8",  
    complete:function(XMLHttpRequest,textStatus){  
        //通过XMLHttpRequest取得响应头，sessionstatus，  
        var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");   
        if(sessionstatus=="timeout"){  
        //如果超时就处理 ，指定要跳转的页面  
        	top.location.href = path+ "login.html";  
        }  
    }  
});  