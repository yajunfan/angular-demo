/**
 * Created by Administrator on 2016/12/15 0015.
 */
define(['jquery'],function ($) {
    $(document).on("mousedown","div[name='test']",function (e) {
        //操作动态增加的元素，在添加完之后可增加事件
            e=e||window.event;
            if(e.which== '3'){
                $(".follow")[0].style.display="block";
                $(".follow")[0].style.left=parseFloat(e.pageX-80)+"px";
                $(".follow")[0].style.top=parseFloat(e.pageY-70)+"px";
            }
            if(e.which== '1'){
                $(".follow")[0].style.display="none";
                if(e.target.tagName.toLowerCase()=="input"){
                    $(".warnBorder")[0].style.display="block";
                    $(".close").click(function () {
                        $(".warnBorder")[0].style.display="none";
                    })
                    //进行事件委托，取消冒泡事件
                    e.stopPropagation()
                }
            }
            //处理鼠标右键默认弹出的菜单框
            $(document).bind("contextmenu",function (e) {
                return false
            });
        });


    });









