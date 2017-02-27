/**
 * Created by xiao lei on 2016/7/17.
 */
function Drag(idName){
    this.box=$(idName);
    this.init();
}
Drag.prototype={
    constructor:Drag,
    init:function(){
        this.down();//当鼠标按下的时候
    },
    down:function(){
        var _this=this;
        this.box.mousedown(function(e){
            _this.disX= e.clientX-this.offsetLeft;
            _this.disY= e.clientY-this.offsetTop;
            $(document).on('mousemove.move',function(e){
                _this.move(e);
            });
            $(document).on('mouseup.move',function(){
                _this.up();
                _this.box[0].releaseCapture&&_this.box[0].releaseCapture();
            });
            this.setCapture&&this.setCapture();
            return false;
        })
    },
    move:function(e){
        var l= e.clientX-this.disX;
        var t= e.clientY-this.disY;
        // if(l<=100){
        //     l=0;
        // }else if(l>=$(document).width()-this.box.width()-100){
        //     l=$(document).width()-this.box.width()
        // }
        // if(t<=100){
        //     t=0;
        // }else if(t>=$(document).height()-this.box.height()-100){
        //     t=$(document).height()-this.box.height()
        // }
        this.box.css({
            left:l,
            top:t
        })
    },
    up:function(){
        $(document).off('.move');
    }
}

