/**
 * Created by Administrator on 2016/12/15 0015.
 */
define(['jquery'],function ($) {
    //document.body.style.background="url('"+canvas.toDataURL()+"')";//这个
    //小put框的右键左键事件
    // $(document).on("mousedown", "div[name='test']", function (e) {
    //     // //操作动态增加的元素，在添加完之后可增加事件
    //     // e = e || window.event;
    //     // var follow1= $("#put").children('.follow')[0];
    //     // var follow2=$('.largePut').children('.follow')[0];
    //     // if (e.which == '3') {
    //     //     follow1.style.display = "block";
    //     //     follow2.style.display="none";
    //     //     follow1.style.left = parseFloat(e.pageX - 100) + "px";
    //     //     follow1.style.top = parseFloat(e.pageY - 55) + "px";
    //     // }
    //     // if (e.which == '1') {
    //     //     follow1.style.display = "none";
    //     //     if (e.target.tagName.toLowerCase() == "input" && e.target.className== "addUser" ) {
    //     //         $(".warnBorder")[0].style.display = "block";
    //     //         // follow1.style.opacity="0";
    //     //         // follow2.style.opacity="0";
    //     //         $(".warnBorder .firstName").val("");
    //     //         $(".close").click(function () {
    //     //             $(".warnBorder")[0].style.display = "none";
    //     //         })
    //     //         //进行事件委托，取消冒泡事件
    //     //         e.stopPropagation()
    //     //     }
    //     // }
    //     // //处理鼠标右键默认弹出的菜单框
    //     // $(document).bind("contextmenu", function (e) {
    //     //     return false
    //     // });
    // });
    // $(document).on("mousedown", "div[name='largePut']", function (e) {
    //     //操作动态增加的元素，在添加完之后可增加事件
    //     e = e || window.event;
    //     var follow1= $("#put").children('.follow')[0];
    //     var follow2 = $(".largePut").children('.follow')[0];
    //     if (e.which == '3') {
    //         follow2.style.display = "block";
    //         follow1.style.display = "none";
    //         follow2.style.left = parseFloat(e.pageX - 130) + "px";
    //         follow2.style.top = parseFloat(e.pageY - 310) + "px";
    //     }
    //     if(follow2.style.display == "block"){
    //
    //     }
    //
    //     if (e.which == '1') {
    //         if (e.target.tagName.toLowerCase() == "input") {
    //             $(".ruleEvent")[0].style.display = "block";
    //
    //             follow1.style.opacity="0";
    //             follow2.style.opacity="0";
    //             //进行事件委托，取消冒泡事件
    //             e.stopPropagation();
    //         }
    //     }
    //     //处理鼠标右键默认弹出的菜单框
    //    if($(".ruleEvent")[0].style.display == "block") {
    //
    //    }
    //
    //     $(document).bind("contextmenu", function (e) {
    //         return false
    //     });
    // });

    $(document).on("click", "div[name='firstDisplay']", function (){
        $(".firstDisplay span").click(function() {
            $(this).addClass("bg3").parent().siblings().children().removeClass("bg3");
            $(this).addClass("bg3").siblings().removeClass("bg3");
        })

    });

    //大put框的点击右键的事件和左键的事件
    $('#right').on("click",function (e) {
        var follow1= $("#put").children('.follow')[0];
        var follow2=$('.largePut').children('.follow')[0];
        var change=$('.curButton')[0];
        var largeDelete=$(".largeDelete")[0];
                follow1.style.display = "none";
                follow2.style.display="none";
                change.style.display="none";
                largeDelete.style.display="none";

    });

    //侧边栏导航的点击事件

    $(document).on("click", "li[name='cc']", function (e) {
        // e.target.index = "bg";
        // e.target.style.width = "80%";

        e.target.style.background = "-webkit-linear-gradient(left,lightblue,white,lightblue)";
         // e.target.style.fontSize = "1.5rem";
        // for (var i = 0; i < $(e.target).siblings().length; i++) {
        //     var curEle = $(e.target).siblings()[i];
        //     curEle.style.width = "22%";
        //     curEle.style.fontSize = "15px";
        //     // switch (i) {
        //     //     case 1:
        //     //         curEle.style.background = "#bde9ff";
        //     //         break;
        //     //     case 2:
        //     //         curEle.style.background = "#88ecff";
        //     //         break;
        //     //     default:
        //     //         curEle.style.background = "#bde9ff";
        //     // }
        // }
        //      var reg =/<br>/g;
        //     var reg2=/集/g;
        // $(".title_rule:first").html(e.target.innerHTML.replace(reg,function (argument) {
        //     return "";
        // }))
        // $(".title_rule:eq(1)").html(e.target.innerHTML.replace(reg,function (argument) {
        //     return "";
        // }).replace(reg2,function (argument) {
        //     return ""
        // }))
    });

    //每一页的选项卡事件
    $(document).on("click", "div[name='page']", function () {
        var oPages = document.getElementById("page");
        var oUl = oPages.getElementsByTagName("ul")[0];
        var oLis = oUl.getElementsByTagName("li");
        var oDivs = oPages.getElementsByClassName("container");
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].index = i;
            oLis[i].onclick = function () {
                for (var j = 0; j < oLis.length; j++) {
                    oLis[j].style.background = "";
                    oLis[j].style.color = "black";
                    oDivs[j].style.display = "none";
                }
                oLis[this.index].style.background = "lightgreen";
                oLis[this.index].style.color = "red";
                oDivs[this.index].style.display = "block";

            }
        }
    });
    //增加页的事件，当增加一项到大put框后，当前的列表减少这一项
    $(document).on("click", "input[name='save']", function () {
        if ($('.aaa').children('input').val() == "保存") {
            var ary = [];
            var aryInput = $('.aaa').parent().children('.selection').children('label').children('input');
            for (var i = 0; i < aryInput.length; i++) {
                if (aryInput[i].checked) {
                    ary.push(aryInput[i]);
                    $(".selection label input:checkbox:checked").parent().remove()
                }
            }
            for (var j = 0; j < ary.length; j++) {
                var oSpan = document.createElement('span');
                oSpan.innerHTML = ary[j].value;
                $('#put')[0].appendChild(oSpan);

            }
        }
    });

    // 弹出框的拖拽事件
    function drag(curEle) {
        var $box = $(curEle).children('h5');
        var that= $(curEle)[0];
        $box.mousedown(function (e) {
            var disX = e.clientX - that.offsetLeft;
            var disY = e.clientY - that.offsetTop;
            $(document).on('mousemove.move', function (e) {
                var l = e.clientX - disX;
                var t = e.clientY - disY;
                if (l <= 0) {
                    l = -300;
                } else if (l >= $(document).width() -  $(curEle).width()) {
                    l = $(document).width() -  $(curEle).width();

                }
                if (t <= 0) {
                    t = 0;
                } else if (t >= $(document).height() -  $(curEle).height()) {
                    t = $(document).height() -  $(curEle).height();
                }
                $(curEle).css('left', l);
                $(curEle).css('top', t);
            });
            $(document).on('mouseup.move', function () {
                $(document).off('.move');
                $box[0].releaseCapture &&  $box[0].releaseCapture();
            });
            $box[0].setCapture &&  $box[0].setCapture();
            return false;
        })

    }
    $(document).on("mousedown",function(){
        drag(".warnBorder");
        drag(".changeInfo");
        drag(".ruleEvent")
        });

    //大put框中的多选框的选中事件
    $(document).on("click","div[name='ruleEvent']",function () {
        var $oInput=$('#gridStyle table tbody input');
        var $firstInput=$('#gridStyle table thead input');
        for(var i=0;i<$oInput.length;i++){
            var count=0,num=0;
            for(var i=0;i<$oInput.length-1;i++){
                if($oInput[i+1].checked==true){
                    count++;
                }
                if($oInput[i+1].checked==false){
                    num++;
                }
            }
            if(count==$oInput.length-1) {
                $firstInput[0].checked=true;
            }
            if(num>0){
                if($firstInput[0].checked==true){
                    $firstInput[0].checked=false;
                }
            }
        }

    });


});









