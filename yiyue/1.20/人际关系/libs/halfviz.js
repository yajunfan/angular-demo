// halfviz.js
//
// instantiates all the helper classes, sets up the particle system + renderer
// and maintains the canvas/editor splitview
//
(function(){
  
  trace = arbor.etc.trace;
  objmerge = arbor.etc.objmerge;
  objcopy = arbor.etc.objcopy;
  var parse = Parseur().parse;

  var HalfViz = function(elt){
    var dom = $(elt);

    sys = arbor.ParticleSystem(2600, 512, 1);
    sys.renderer = Renderer("#viewport") ;// our newly created renderer will have its .init() method called shortly by sys...
    sys.screenPadding(20);
    
    var _ed = dom.find('#editor');
    var _code = dom.find('textarea');
    var _canvas = dom.find('#viewport').get(0);
    var _grabber = dom.find('#grabber');
    
    var _updateTimeout = null;
    var _current = null ;// will be the id of the doc if it's been saved before
    var _editing = false ;// whether to undim the Save menu and prevent navigating away
    var _failures = null;
    
    var that = {
      dashboard:Dashboard("#dashboard", sys),
      io:IO("#editor .io"),
      init:function(){
        $(window).resize(that.resize);
        that.resize();
        that.updateLayout(Math.max(1, $(window).width()-340));

        _code.keydown(that.typing);
        _grabber.bind('mousedown', that.grabbed);

        $(that.io).bind('get', that.getDoc);
        $(that.io).bind('clear', that.newDoc);
        return that
      },
      //当点击examples的列表中的每一项的时候，发送请求，获取数据进行重新绘制
      getDoc:function(e){
        $.getJSON('data/'+e.id+'.json', function(doc){
          // update the system parameters
          if (doc.sys){
            sys.parameters(doc.sys);
            that.dashboard.update();
          }

          // modify the graph in the particle system
          _code.val(doc.src);
          that.updateGraph();
          that.resize();
          _editing = false;
        })
        
      },
      //当使用clear的时候，这里进行的操作
      newDoc:function(){
        var lorem = "; some example nodes\nhello {color:red, label:HELLO}\nworld {color:orange}\n\n; some edges\nhello -> world {color:yellow}\nfoo -> bar {weight:5}\nbar -> baz {weight:2}"
        
        _code.val(lorem).focus();
        $.address.value("");
        that.updateGraph();
        that.resize();
        _editing = false;
      },
        //文本框中有改变的时候这里要进行重新的绘制
      updateGraph:function(e){
        var src_txt = _code.val();
        var network = parse(src_txt);
        $.each(network.nodes, function(nname, ndata){
          if (ndata.label===undefined) ndata.label = nname
        });
        sys.merge(network);
        _updateTimeout = null
      },
      //重新绘制
      resize:function(){        
        var w = $(window).width() - 40;
        var x = w - _ed.width();
        that.updateLayout(x);
        sys.renderer.redraw();
      },
      //实时更新竖条的位置以及左右两边的宽度
      updateLayout:function(split){
        //_grabber这个是文本框旁边的那个竖条，可以左右拉动，然后改变显示的宽度
        var w = dom.width();//获取id的宽度
        var h = _grabber.height();//获取这个元素的高度
        //  console.log( _grabber);//获取这个元素的高度
        var split = split || _grabber.offset().left;
       // console.log(_grabber.offset());//获取他的左偏移量
        var splitW = _grabber.width();//获取这个元素的宽度
        _grabber.css('left',split);

        var edW = w - split;
        var edH = h;
        _ed.css({width:edW, height:edH});//编辑文本框这个元素，随着竖条的改变而改变
        //console.log(_ed);
        if (split > w-20) _ed.hide(); //当竖条与右侧屏幕的宽度不足20px时，隐藏文本框
        else _ed.show();

        var canvW = split - splitW;//设置canvas的宽度
        var canvH = h;
        _canvas.width = canvW;
        _canvas.height = canvH;
        sys.screenSize(canvW, canvH);
                
        _code.css({height:h-20,  width:edW-4, marginLeft:2})
      },

      //抓取的函数，都是为处理竖条而做的处理
      grabbed:function(e){
        $(window).bind('mousemove', that.dragged);
        $(window).bind('mouseup', that.released);
        return false
      },
      dragged:function(e){ //这个函数是为了改变屏宽的竖条准备,抓取的时候
        var w = dom.width()
          console.log(w)
        that.updateLayout(Math.max(10, Math.min(e.pageX-10, w)) );
        sys.renderer.redraw()
        return false
      },
      released:function(e){ //这个是改变屏宽的竖条放开的时候的函数
        $(window).unbind('mousemove', that.dragged)
        return false
      },
      typing:function(e){ //这个是文本框中
        var c = e.keyCode
          console.log(c)
        if ($.inArray(c, [37, 38, 39, 40, 16])>=0){
          return
        }
        
        if (!_editing){
          $.address.value("")
        }
        _editing = true
        
        if (_updateTimeout) clearTimeout(_updateTimeout)
        _updateTimeout = setTimeout(that.updateGraph, 900)
      }
    }
    
    return that.init()    
  }


  $(document).ready(function(){
    var mcp = HalfViz("#halfviz")    
  })

  
})()