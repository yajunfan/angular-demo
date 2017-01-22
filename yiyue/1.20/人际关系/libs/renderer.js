(function(){
  //这里进行的是对画布的进行绘制
  Renderer = function(canvas){
    //初始化canvas
    var canvas = $(canvas).get(0);
    var ctx = canvas.getContext("2d");
    var gfx = arbor.Graphics(canvas);
    var particleSystem = null; //创建了一个粒子系统，用来更新点和线

    var that = {
      init:function(system){
        //console.log(system); // 包括了arbor中的所有方法
        particleSystem = system;
        particleSystem.screenSize(canvas.width, canvas.height); //给 particleSystem增加属性，屏幕的宽高
        particleSystem.screenPadding(40);//屏幕的填充是padding是40
        that.initMouseHandling()
      },

      redraw:function(){
        if (!particleSystem) return;

        gfx.clear() ;// convenience ƒ: clears the whole canvas rect

        // draw the nodes & save their bounds for edge drawing
        var nodeBoxes = {};
        particleSystem.eachNode(function(node, pt){
          // node: {mass:#, p:{x,y}, name:"", data:{}}
          // pt:   {x:#, y:#}  node position in screen coords

          // determine the box size and round off the coords if we'll be 
          // drawing a text label (awful alignment jitter otherwise...)
          var label = node.data.label||"";  //label是每个节点中的文字

          var w = ctx.measureText(""+label).width + 70;  //measureText在画布上输出文本之前，检查字体的宽度：w就是字体的宽度加上10像素

          if (!(""+label).match(/^[ \t]*$/)){
            pt.x = Math.floor(pt.x);
            pt.y = Math.floor(pt.y);
             // console.log(pt.x,pt.y)  //这里是获取到每个点的位置
          }else{
            label = null
          }

          // draw a rectangle centered at pt


         // if (node.data.color) ctx.fillStyle = node.data.color;
            if (node.data.color){
                var img = new Image();
                img.src="./images/ren3.jpg";
                img.style.display="block";
                img.style.width="60px";
                img.style.height="60px";

                // img.onload=function() {
                    var pattern = ctx.createPattern(img, "repeat");
                    ctx.fillStyle = pattern;
                // }

                var aa=ctx.createLinearGradient(0,0,30,30);
                 aa.addColorStop(0,"white");
                aa.addColorStop(1,"black");
                // ctx.fillStyle=aa;

                // ctx.fillStyle = "blue";
            }
          else ctx.fillStyle = "rgba(0,0,0,.2)";
          if (node.data.color=='none') ctx.fillStyle = "white";

          if (node.data.shape !=='dot'){
            gfx.oval(pt.x-w/2, pt.y-w/2, w,w, {fill:ctx.fillStyle});

            nodeBoxes[node.name] = [pt.x-w/2, pt.y-w/2, w,w]
          }else{
            gfx.rect(pt.x-w/2, pt.y-10, w,20, 4, {fill:ctx.fillStyle});
            nodeBoxes[node.name] = [pt.x-w/2, pt.y-11, w, 22]
          }

          // draw the text
          if (label){
            ctx.font = "12px Helvetica";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            if (node.data.color=='none') ctx.fillStyle = '#333333';
            ctx.fillText(label||"", pt.x, pt.y+4);
            ctx.fillText(label||"", pt.x, pt.y+4);

          }
        })    			


        // draw the edges
        particleSystem.eachEdge(function(edge, pt1, pt2){
          // edge: {source:Node, target:Node, length:#, data:{}}
          // pt1:  {x:#, y:#}  source position in screen coords
          // pt2:  {x:#, y:#}  target position in screen coords

          var weight = edge.data.weight;
          var color = edge.data.color;

          if (!color || (""+color).match(/^[ \t]*$/)) color = null;

          // find the start point
          var tail = intersect_line_box(pt1, pt2, nodeBoxes[edge.source.name]);
          var head = intersect_line_box(tail, pt2, nodeBoxes[edge.target.name]);

          ctx.save() ;
            ctx.beginPath();
            ctx.lineWidth = (!isNaN(weight)) ? parseFloat(weight) : 1;
            ctx.strokeStyle = (color) ? color : "#000";
            ctx.fillStyle = null;

            ctx.moveTo(tail.x, tail.y);
            ctx.lineTo(head.x, head.y);
            ctx.stroke();
            ctx.restore();

          // draw an arrowhead if this is a -> style edge
          if (edge.data.directed){ //是一个boolean值
               ctx.save();


              // move to the head position of the edge we just drew
              var wt = !isNaN(weight) ? parseFloat(weight) : 1;
              var arrowLength = 6 + wt;
              var arrowWidth = 2 + wt;
              ctx.fillStyle = (color) ? color : "#cccccc";
              ctx.translate(head.x, head.y);
              ctx.rotate(Math.atan2(head.y - tail.y, head.x - tail.x));

              // delete some of the edge that's already there (so the point isn't hidden)
              ctx.clearRect(-arrowLength/2,-wt/2, arrowLength/2,wt);

              // draw the chevron
              ctx.beginPath();
              ctx.moveTo(-arrowLength, arrowWidth);
              ctx.lineTo(0, 0);
              ctx.lineTo(-arrowLength, -arrowWidth);
              ctx.lineTo(-arrowLength * 0.8, -0);
              ctx.fillStyle="black";
              ctx.fillText(edge.target.data["label"],arrowLength/2,arrowWidth);
              ctx.closePath();
              ctx.fill();
              ctx.restore()
          }
        })



      },
      initMouseHandling:function(){ //初始化鼠标的处理
        // no-nonsense drag and drop (thanks springy.js) 实际的拖放(感谢springy.js)
        selected = null;
        nearest = null;
        var dragged = null;
        var oldmass = 1;

        // set up a handler object that will initially listen for mousedowns then  建立一个处理程序对象用来侦听mousedowns
        // for moves and mouseups while dragging 当dragging的试试会产生移动和鼠标上升的动作
        var handler = {
          clicked:function(e){  //点击canvas画布上的任何一个位置的时候进行操作

            var pos = $(canvas).offset(); //获取到canvas的偏移量
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top); //获取到当前点击的位置的坐标

            selected = nearest = dragged = particleSystem.nearest(_mouseP);//获取到一个对象，这个对象包括的是距离。还有离他最近点的对应的数字
            sys.eachNode(function(node,pt){//获得当前节点的位置
               if(Math.abs(pt.x-_mouseP.x)<= 60 && Math.abs(pt.y-_mouseP.y)<= 60) { //与屏幕点击的位置进行比较，
                   sys.getNode(node._id);

                   if(!node)return;
                   console.log(node.name)
                  sys.addEdge('张三', '张思', {label:111,directed:1,length:0.75})
               }
              });

            if (dragged.node !== null) {dragged.node.fixed = true;}//当有这个最近的点的时候，将他的fixed赋值为true;

            $(canvas).bind('mousemove', handler.dragged);
            $(window).bind('mouseup', handler.dropped);
            return false
          },
          dragged:function(e){ //这个就是抓取的时候做的事情
            var old_nearest = nearest && nearest.node._id; //对应133行   获取的是id名，没有找到是对应谁
            var pos = $(canvas).offset();   //left:20,top:56
            var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top); //获取到当前点击的位置的坐标
            if (!nearest) return;
            if (dragged !== null && dragged.node !== null){
              var p = particleSystem.fromScreen(s);//fromScreen是arbor中的一个方法
              dragged.node.p = p;
            }

            return false
          },
          dropped:function(e){ //当抓取松开的时候做的事情
            if (dragged===null || dragged.node===undefined) return;
            if (dragged.node !== null) dragged.node.fixed = false;
            dragged.node.tempMass = 50;
            dragged = null;
            selected = null;
            $(canvas).unbind('mousemove', handler.dragged);
            $(window).unbind('mouseup', handler.dropped);
            _mouseP = null;
            return false;
          },

        };
        $(canvas).mousedown(handler.clicked);

      }

    };

    // helpers for figuring out where to draw arrows (thanks springy.js)
    var intersect_line_line = function(p1, p2, p3, p4)
    {
      var denom = ((p4.y - p3.y)*(p2.x - p1.x) - (p4.x - p3.x)*(p2.y - p1.y));
      if (denom === 0) return false // lines are parallel
      var ua = ((p4.x - p3.x)*(p1.y - p3.y) - (p4.y - p3.y)*(p1.x - p3.x)) / denom;
      var ub = ((p2.x - p1.x)*(p1.y - p3.y) - (p2.y - p1.y)*(p1.x - p3.x)) / denom;

      if (ua < 0 || ua > 1 || ub < 0 || ub > 1)  return false
      return arbor.Point(p1.x + ua * (p2.x - p1.x), p1.y + ua * (p2.y - p1.y));
    }

    var intersect_line_box = function(p1, p2, boxTuple)
    {
      var p3 = {x:boxTuple[0], y:boxTuple[1]},
          w = boxTuple[2],
          h = boxTuple[3]

      var tl = {x: p3.x, y: p3.y};
      var tr = {x: p3.x + w, y: p3.y};
      var bl = {x: p3.x, y: p3.y + h};
      var br = {x: p3.x + w, y: p3.y + h};

      return intersect_line_line(p1, p2, tl, tr) ||
            intersect_line_line(p1, p2, tr, br) ||
            intersect_line_line(p1, p2, br, bl) ||
            intersect_line_line(p1, p2, bl, tl) ||
            false
    }

    return that
  }    
  
})()