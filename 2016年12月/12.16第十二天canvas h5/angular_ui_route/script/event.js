/**
 * Created by Administrator on 2016/12/15 0015.
 */
define(['jquery'],function ($) {
    // document.body.style.background="url('"+canvas.toDataURL()+"')";//这个是来控制canvas做的图作为背景，首先要在index页面写上canvas以及js
    //name是text的做的事，就是点右键就出现添加盒子
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
    //这是侧边栏的点击效果
    $(document).on("click","a[name='cc']",function (e) {
        e.target.index="bg";
             e.target.style.width="130px";
            e.target.style.background="-webkit-linear-gradient(left,blue,lightblue,blue)";
            e.target.style.fontSize="24px";
        for(var i=0;i< $(e.target).siblings().length;i++){
            var curEle=$(e.target).siblings()[i];
            curEle.style.width="40px";
            curEle.style.fontSize="12px";
                switch(i){
                    case 1:
                        curEle.style.background="#ffc2cf" ;
                        break;
                    case 2:
                        curEle.style.background="#ffc79d";
                        break;
                    default:
                        curEle.style.background="#d2ffc3";
                }
        }
            $(".title_rule:first").html(e.target.innerHTML)
    });
    // $(document).on("mouseleave","a[name='cc']",function (e) {
    //
    //     for(var i=0;i<$(".list-group-item").length;i++){
    //         var curEle=$(".list-group-item")[i];
    //        switch(i){
    //            case 1:
    //                curEle.style.background="#ffc79d" ;
    //                break;
    //            case 2:
    //                curEle.style.background="#d2ffc3";
    //                break;
    //            default:
    //                curEle.style.background="#ffc2cf";
    //        }
    //
    //
    //
    //     }
    //
    // });
    $(document).on("change","select[name='myLink']",function (e) {
        alert(1);

    });
    //这是选项卡的事件
    $(document).on("click","div[name='page']",function () {
      var oPages=document.getElementById("page");
      var oUl=oPages.getElementsByTagName("ul")[0];
      var oLis=oUl.getElementsByTagName("li");
      var oDivs=oPages.getElementsByClassName("container");
      for(var i=0;i<oLis.length;i++){
          oLis[i].index=i;
          oLis[i].onclick=function () {
              for(var j=0;j<oLis.length;j++){
                  oLis[j].style.background="";
                  oLis[j].style.color="black";
                  oDivs[j].style.display="none";
              }
              oLis[this.index].style.background="lightgreen";
              oLis[this.index].style.color="red";
              oDivs[this.index].style.display="block";

          }
      }
    });

    });









