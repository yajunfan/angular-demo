/**
 * Created by Administrator on 2016/12/15 0015.
 */
define(['jquery'],function ($) {
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


    //每一页的选项卡事件
    $(document).on("click", "div[name='page']", function () {
        $oLis = $("#page ul li");
        $oDivs = $("#page .container");
        $oLis.each(function (index) {
           $(this).attr('aa',index);
           $(this).on('click',function () {
               $oLis.each(function (index) {
                   $(this).css('background',"");
                   $(this).css('color',"black");
                   $oDivs.eq(index).css('display','none')
               });
               $(this).css('background',"lightgreen");
               $(this).css('color',"red");
               $oDivs.eq(index).css('display','block')
           });

        });


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









