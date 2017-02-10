/**
 * Created by Administrator on 2017/2/9 0009.
 */

var wId = "w";
var index = 0;
var startX = 0, startY = 0;
var startX1 = 0, startY1 = 0;
var flag = false,flag1=false;
var h,k;
var retcLeft = "0px", retcTop = "0px", retcHeight = "0px", retcWidth = "0px";
document.onmousedown = function(e){


    flag = true;

    try{
        var evt = window.event || e;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;//获取卷去的高度
        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft; //获取卷去的宽度
        //开始的点是当前鼠标的位置加上卷去的宽高，每次开始都要index
        startX = evt.clientX + scrollLeft;
        startY = evt.clientY + scrollTop;
        startX1 = evt.clientX;
        startY2 = evt.clientY;
         index++;
        //index是之后拉动鼠标时候的小点
        if(startX1 >605){
            var  div = document.createElement("div");
            div.id = wId + index;
            div.className = "drag w";


            div.style.marginTop = startY + "px";
            document.body.appendChild(div);

            document.body.removeChild($(".w"));
        }


    }catch(e){
        //alert(e);
    }
};
document.onmouseup = function(){
    try{
        document.body.removeChild($(wId + index));
        var div = document.createElement("div");
        div.className = "retc";
        div.id = "retc";
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

document.onmousemove=function(e,callback){
    if(flag){
        try{
            var evt = window.event || e;
            var callba=picDisplay||callback;
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
            if(startX1>500){
                var ary=[]
                retcLeft = (startX - evt.clientX - scrollLeft > 0 ? evt.clientX + scrollLeft : startX) + "px";
                retcTop = (startY - evt.clientY - scrollTop > 0 ? evt.clientY + scrollTop : startY) + "px";
                retcHeight = Math.abs(startY - evt.clientY - scrollTop) + "px";
                retcWidth = Math.abs(startX - evt.clientX - scrollLeft) + "px";
                $$(wId + index).style.marginLeft = retcLeft;
                $$(wId + index).style.marginTop = retcTop;
                $$(wId + index).style.width = retcWidth;
                $$(wId + index).style.height = retcHeight;
                k=parseFloat(retcLeft)+parseFloat(retcWidth)-700+"px";
                h=parseFloat(retcTop)+parseFloat(retcHeight)+"px";

                // $("#ViewDiv img").css(" clip", "rect(0px, '+k+', '+h+', 0)");




            }
            picDisplay();
        }catch(e){
            //alert(e);
        }
    }
};

var $$ = function(id){
        return document.getElementById(id);
    };

var drag=new Drag("#dragDiv");

function picDisplay() {
    console.log(1)
    console.log(k,h)
    $("#ViewDiv img").css({'opacity':"1","clip":"rect(0px, '+k+', '+h+', 0)"});
    $("#ViewDiv img").css("clip","rect(0px, 500px, 500px, 0)")
    // clip: rect(startX,right,bottom,left);
    // top表示剪切区域顶部离图片顶部的距离
    // right表示剪切区域右边离图片左边的距离，即长+left
    // bottom表示剪切区域底部离图片顶部的距离，即宽+top
    // left表示剪切区域左边离图片左边的距离
    // clip: rect(0, 200px, 200px, 0);
}
// var drag2=new Drag("#retc");

