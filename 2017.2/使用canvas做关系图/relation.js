/**
 * Created by Administrator on 2017/2/21 0021.
 */
/**
 *project: relation widgets
 *version: 1.0
 *create: 2013-9-26
 *update: 2013-9-26 16:00 1.0
 *author: F2E xiechengxiong
 */

(function (win, doc, undefined) {
    var options = {
        "width": 700,
        "height": 600,
        "members": [
            {
                "name": "王菲",
                "desc": "中国女歌手、影视演员。",
                "data": {"x": 500, "y": 150, "size": 40, "color": "#ff0000"}
            },
            {
                "name": "谢霆锋",
                "desc": "中国著名音乐人、歌手、演员、企业家。",
                "data": {"x": 350, "y": 250, "size": 40, "color": "#ff00ff"}
            },
            {
                "name": "周迅",
                "desc": "中国著名女演员、歌手，华人影剧界实力派影视巨星。",
                "data": {"x": 200, "y": 250, "size": 40, "color": "#ffff00"}
            },
            {
                "name": "李亚鹏",
                "desc": "演员、慈善家、商人，1994年毕业于中央戏剧学院表演系。",
                "data": {"x": 500, "y": 400, "size": 40, "color": "#0000ff"}
            },
            {
                "name": "张柏芝",
                "desc": "中国香港著名女演员、歌手。",
                "data": {"x": 200, "y": 400, "size": 40, "color": "#00ff00"}
            },
            {
                "name": "窦唯",
                "desc": "中国男歌手及音乐人。",
                "data": {"x": 350, "y": 50, "size": 30, "color": "#00ffff"}
            },
            {
                "name": "张亚东",
                "desc": "著名音乐制作人",
                "data": {"x": 650, "y": 50, "size": 30, "color": "#00ffff"}
            },
            {
                "name": "宋宁",
                "desc": "演艺界明星，出演《杜拉拉升职记》",
                "data": {"x": 350, "y": 150, "size": 30, "color": "#00ffff"}
            },
            {
                "name": "窦鹏",
                "desc": "资深音乐人",
                "data": {"x": 200, "y": 50, "size": 30, "color": "#00ffff"}
            },
            {
                "name": "王烁",
                "desc": "商业巨富之子，周迅的前男友。",
                "data": {"x": 50, "y": 50, "size": 30, "color": "#00ffff"}
            },
            {
                "name": "朴树",
                "desc": "中国大陆歌手，音乐人",
                "data": {"x": 50, "y": 150, "size": 30, "color": "#00ffff"}
            },
            {
                "name": "李大齐",
                "desc": "女演员周迅的前任男朋友，是目前台湾最炙手可热、风头最劲的造型师之一。",
                "data": {"x": 50, "y": 250, "size": 30, "color": "#00ffff"}
            },
            {
                "name": "贾宏声",
                "desc": "中国著名演员。",
                "data": {"x": 50, "y": 350, "size": 30, "color": "#00ffff"}
            },
            {
                "name": "陈冠希",
                "desc": "中国香港著名艺人。",
                "data": {"x": 200, "y": 550, "size": 30, "color": "#00ffff"}
            },
            {
                "name": "钟欣桐",
                "desc": "香港影视歌三栖明星，香港殿堂级女子组合“Twins”成员。",
                "data": {"x": 50, "y": 550, "size": 30, "color": "#00ffff"}
            },
            {
                "name": "瞿颖",
                "desc": "中国电影演员。",
                "data": {"x": 650, "y": 400, "size": 30, "color": "#00ffff"}
            },
            {
                "name": "窦颖",
                "desc": "窦唯的妹妹，张亚东前妻，窦鹏的堂妹，北京人，歌手。",
                "data": {"x": 500, "y": 50, "size": 30, "color": "#00ffff"}
            },
            {
                "name": "高原",
                "desc": "内地最资深的女摄影师。",
                "data": {"x": 250, "y": 100, "size": 30, "color": "#00ffff"}
            }
        ],
        "lines": [
            {
                "desc": "旧情人",
                "points": ["王菲", "谢霆锋"]
            },
            {
                "desc": "离婚夫妻",
                "points": ["王菲", "李亚鹏"]
            },
            {
                "desc": "离婚夫妻",
                "points": ["王菲", "窦唯"]
            },
            {
                "desc": "同事",
                "points": ["王菲", "张亚东"]
            },
            {
                "desc": "离婚夫妻",
                "points": ["谢霆锋", "张柏芝"]
            },
            {
                "desc": "？",
                "points": ["谢霆锋", "周迅"]
            },
            {
                "desc": "旧情人",
                "points": ["周迅", "宋宁"]
            },
            {
                "desc": "旧情人",
                "points": ["窦鹏", "周迅"]
            },
            {
                "desc": "旧情人",
                "points": ["周迅", "王烁"]
            },
            {
                "desc": "旧情人",
                "points": ["周迅", "朴树"]
            },
            {
                "desc": "旧情人",
                "points": ["周迅", "李大齐"]
            },
            {
                "desc": "旧情人",
                "points": ["周迅", "贾宏声"]
            },
            {
                "desc": "旧情人",
                "points": ["周迅", "李亚鹏"]
            },
            {
                "desc": "旧情人",
                "points": ["张柏芝", "陈冠希"]
            },
            {
                "desc": "旧情人",
                "points": ["陈冠希", "钟欣桐"]
            },
            {
                "desc": "旧情人",
                "points": ["陈冠希", "钟欣桐"]
            },
            {
                "desc": "表姐弟",
                "points": ["高原", "宋宁"]
            },
            {
                "desc": "旧情人",
                "points": ["高原", "窦唯"]
            },
            {
                "desc": "兄妹",
                "points": ["窦唯", "窦颖"]
            },
            {
                "desc": "旧情人",
                "points": ["窦颖", "张亚东"]
            },
            {
                "desc": "旧情人",
                "points": ["瞿颖", "张亚东"]
            },
            {
                "desc": "旧情人",
                "points": ["李亚鹏", "瞿颖"]
            },
            {
                "desc": "堂兄弟",
                "points": ["窦唯", "窦鹏"]
            }
        ]
    };
    var ctx, tempOptions;
    var Relation = function () {
        this.init();
    };
    Relation.prototype = {
        init: function () {
            var canvas = doc.getElementsByTagName('canvas')[0];
            ctx = canvas.getContext('2d');
            tempOptions = this.clone(options);
            this.draw(options);
            this.bindEvent(canvas);
        },
        bindEvent: function (canvas) {
            var _this = this;
            canvas.addEventListener('click', function (e) {
                var member = _this.draw(tempOptions, e.layerX, e.layerY);
                if (member) {
                    tempOptions = _this.clone(options);
                    var basicMember = _this.getMemberByName(options['members'], member['name']);
                    if (member['data']['size'] > basicMember['data']['size']) {
                        _this.draw(tempOptions);
                    } else {
                        member = _this.getMemberByName(tempOptions['members'], member['name']);
                        member['magnify'] = true;
                        member['data']['size'] = member['data']['size'] * 1.5;
                        tempOptions['lines'] = _this.getLinesByName(tempOptions['lines'], member['name']);
                        _this.draw(tempOptions);
                    }
                }
            });
            canvas.addEventListener('mousemove', function (e) {

                var member = _this.draw(tempOptions, e.layerX, e.layerY);
                if (member) {
                    canvas.style.cursor = 'pointer';

                    _this.setTips(member['name'], member['desc'], member['data']['x']+member['data']['size'], member['data']['y']);
                } else {
                    canvas.style.cursor = 'default';
                    _this.setTips('', '', -200, -200);
                }
            });
        },
        clone: function (obj) {
            var newObj;
            if (typeof obj === 'object') {
                if (Object.prototype.toString.call(obj) === '[object Array]') {
                    newObj = [];
                    var i = obj.length;
                    while (i--) {
                        newObj[i] = this.clone(obj[i]);
                    }
                    return newObj;
                } else {
                    newObj = {};
                    for (var j in obj) {
                        newObj[j] = this.clone(obj[j]);
                    }
                }
            } else {
                return obj;
            }
            return newObj;
        },
        draw: function (opts, x, y) {
            ctx.clearRect(0, 0, opts['width'], opts['height']);
            this.drawLines(opts['lines']);
            return this.drawMembers(opts['members'], x, y);
        },
        drawLines: function (lines) {
            for (var i = 0, len = lines.length; i < len; i++) {
                var line = lines[i];
                var start = this.getMemberByName(tempOptions['members'], line['points'][0]);
                var end = this.getMemberByName(tempOptions['members'], line['points'][1]);
                var data1 = start['data'], data2 = end['data'];
                var x1 = data1['x'], y1 = data1['y'], x2 = data2['x'], y2 = data2['y'], s1 = data1['size'], s2 = data2['size'];
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineWidth = lines[i]['magnify'] ? 3 : 1;
                ctx.strokeStyle = 'blue';
                ctx.stroke();
                ctx.closePath();
                var ratio = (y2 - y1) / (x2 - x1);
                var r = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                var rr = (r - s1 - s2) / 2 + s1;
                var x = (x2 - x1 > 0 ? 1 : -1) * Math.sqrt(rr * rr / (1 + ratio * ratio));
                var y = (x2 - x1 === 0 ? (y2 - y1 > 0 ? 1 : -1) * rr : ratio * x);
                ctx.save();
                ctx.translate(x1 + x, y1 + y);
                ctx.rotate((ratio > 0 ? 1 : -1) * Math.acos(Math.abs(x2 - x1) / r));
                ctx.beginPath();
                this.drawText(line['desc'], 0, 0, r, '#ff0000');
                ctx.closePath();
                ctx.restore();
            }
        },
        drawMember: function (member) {
            var data = member['data'];
            ctx.save();
            ctx.beginPath();
            var grd = ctx.createRadialGradient(data['x'], data['y'], data['size'], data['x'], data['y'], 0);
            grd.addColorStop(0, data['color']);
            grd.addColorStop(1, 'white');
            ctx.fillStyle = grd;
            ctx.shadowBlur = member['magnify'] ? 20 : 0;
            ctx.shadowColor = data['color'];
            ctx.arc(data['x'], data['y'], data['size'], 0, 2 * Math.PI, true);
            ctx.fill();
            var c = this.parseColor(data['color']);
            this.drawText(member['name'], data['x'], data['y'], data['size'], 'rgb(' + (255 - c.r) + ',' + (255 - c.g) + ',' + (255 - c.b) + ')');
            ctx.closePath();
            ctx.restore();
        },
        drawMembers: function (members, x, y) {
            var re = null;
            for (var i = 0, len = members.length; i < len; i++) {
                this.drawMember(members[i]);
                if (ctx.isPointInPath(x, y)) {
                    re = members[i];
                }
            }
            return re;
        },
        drawText: function (text, x, y, w, c) {
            ctx.font = '14px Arial';
            ctx.fillStyle = c;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, x, y, w);
        },
        getLinesByName: function (lines, name) {
            for (var i = 0, len = lines.length; i < len; i++) {
                var point = lines[i]['points'];
                lines[i]['magnify'] = point[0] === name || point[1] === name ? true : false;
            }
            return lines;
        },
        getMemberByName: function (members, name) {
            var re = null;
            for (var i = 0, len = members.length; i < len; i++) {
                if (members[i]['name'] === name) {
                    re = members[i];
                }
            }
            return re;
        },
        parseColor: function (val, op) {
            function toHex(r, g, b) {
                var Pr = r.toString(16).length == 1 ? (0 + r.toString(16)) : r.toString(16);
                var Pg = g.toString(16).length == 1 ? (0 + g.toString(16)) : g.toString(16);
                var Pb = b.toString(16).length == 1 ? (0 + b.toString(16)) : b.toString(16);
                return Pr + Pg + Pb;
            }
            var r, g, b, hex, filter;
            op = op || 1;
            if (/r/.test(val)) {
                var arr = val.match(/\d+/g);
                r = parseInt(arr[0]);
                g = parseInt(arr[1]);
                b = parseInt(arr[2]);
                hex = '#' + toHex(r, g, b);
                filter = '#' + Math.floor(op * 255).toString(16) + toHex(r, g, b);
            } else if (/#/.test(val)) {
                var len = val.length;
                if (len === 7) {
                    r = parseInt(val.slice(1, 3), 16);
                    g = parseInt(val.slice(3, 5), 16);
                    b = parseInt(val.slice(5), 16);
                    filter = '#' + Math.floor(op * 255).toString(16) + toHex(r, g, b);
                } else if (len === 4) {
                    r = parseInt(val.charAt(1) + val.charAt(1), 16);
                    g = parseInt(val.charAt(2) + val.charAt(2), 16);
                    b = parseInt(val.charAt(3) + val.charAt(3), 16);
                    filter = '#' + Math.floor(op * 255).toString(16) + toHex(r, g, b);
                }
                hex = '#' + toHex(r, g, b);
            } else {
                alert('颜色格式不正确,请重新输入');
            }
            return {'r': r, 'g': g, 'b': b, 'op': op, 'hex': hex, 'filter': filter};
        },
        setTips: function(name, desc, x, y) {
            if(!this.tips) {
                this.tips = doc.createElement('div');
                doc.body.appendChild(this.tips);
            }
            this.tips.style.left = x +'px';
            this.tips.style.top = y +'px';
            this.tips.innerHTML = '<h4>'+name+'</h4><p>'+desc+'</p>';
        }
    };
    win['Relation'] = Relation;
})(window, document);