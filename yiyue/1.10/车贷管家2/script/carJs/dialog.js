var dialogDiv = 
'<div id="div1"  class="messagebox none">'+
	'<div class="messageboxBg"></div>'+
	'<div class="messageboxT">'+
		'<h1>提示</h1>'+
	    '<div class="messagebox-text">'+
	    	'<p id="pc" class="mt20">你确定要删除这些记录吗？</p>'+
	        '<div class="mt40 mc">'+
	        '<input id="confirm" class="save btn w120 fl" value="确定" type="submit">'+
	        '<input id="cancel" class="cancel btn w120 fr" type="submit" value="取消" onClick="closeZtn(this)" />'+
	    '</div>'+
	'</div>'
'</div>';
// "<div class='zt-list white-dialog' id='div1' style='display: none;'>"
// +"<h1>提示</h1>"
// +"<div class='zt-content'>"
// +"<p id='pc' class='mt20'></p>"
// +"<div>"
// +"<input id='confirm' class='save btn w120 mc mt40 fl' type='submit' value='确定' />"
// +"<input id='cancel' class='cancel btn w120 mc mt40 fr ml70' type='submit' value='取消' onClick='closeZt()' />"	
// +"</div></div></div>";	
$(document).ready(function() {
	$("body").append(dialogDiv);
});
function closeZtn(e){
	$(e).parents(".messagebox").hide();
}