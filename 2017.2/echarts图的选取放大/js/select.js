/**
 * Created by Administrator on 2017/2/8 0008.
 */
var wId = "w";
var index = 0;
var startX = 0, startY = 0;
var flag = false;
var retcLeft = "0px", retcTop = "0px", retcHeight = "0px", retcWidth = "0px";
document.onmousedown = function(e){
    flag = true;
    try{
        var evt = window.event || e;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        startX = evt.clientX + scrollLeft;
        startY = evt.clientY + scrollTop;
        index++;
        var div = document.createElement("div");
        div.id = wId + index;
        div.className = "div";
        div.style.marginLeft = startX + "px";
        div.style.marginTop = startY + "px";
        document.body.appendChild(div);
    }catch(e){
        //alert(e);
    }
};
document.onmouseup = function(){
    try{
        document.body.removeChild($(wId + index));
        var div = document.createElement("div");
        div.className = "retc";
        div.style.marginLeft = retcLeft;
        div.style.marginTop = retcTop;
        div.style.width = retcWidth;
        div.style.height = retcHeight;
        document.body.appendChild(div);
    }catch(e){
        //alert(e);
    }
    flag = false;
};
document.onmousemove = function(e){
    if(flag){
        try{
            var evt = window.event || e;
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
            retcLeft = (startX - evt.clientX - scrollLeft > 0 ? evt.clientX + scrollLeft : startX) + "px";
            retcTop = (startY - evt.clientY - scrollTop > 0 ? evt.clientY + scrollTop : startY) + "px";
            retcHeight = Math.abs(startY - evt.clientY - scrollTop) + "px";
            retcWidth = Math.abs(startX - evt.clientX - scrollLeft) + "px";
            $(wId + index).style.marginLeft = retcLeft;
            $(wId + index).style.marginTop = retcTop;
            $(wId + index).style.width = retcWidth;
            $(wId + index).style.height = retcHeight;
        }catch(e){
            //alert(e);
        }
    }
};
var $ = function(id){
    return document.getElementById(id);
}