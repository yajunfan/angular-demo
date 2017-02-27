//
//  arbor-graphics.js
//  canvas fructose
//
//  Copyright (c) 2011 Samizdat Drafting Co.
// 
//  Permission is hereby granted, free of charge, to any person
//  obtaining a copy of this software and associated documentation
//  files (the "Software"), to deal in the Software without
//  restriction, including without limitation the rights to use,
//  copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following
//  conditions:
// 
//  The above copyright notice and this permission notice shall be
//  included in all copies or substantial portions of the Software.
// 
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
//  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
//  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
//  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
//  OTHER DEALINGS IN THE SOFTWARE.
//

(function ($) {

    /*        etc.js */
    var trace = function (msg) {
        if (typeof(window) == "undefined" || !window.console) {
            return
        }
        var len = arguments.length;
        var args = [];
        for (var i = 0; i < len; i++) {
            args.push("arguments[" + i + "]")
        }
        eval("console.log(" + args.join(",") + ")")
    };
    var dirname = function (a) {
        var b = a.replace(/^\/?(.*?)\/?$/, "$1").split("/");
        b.pop();
        return "/" + b.join("/")
    };
    var basename = function (b) {
        var c = b.replace(/^\/?(.*?)\/?$/, "$1").split("/");
        var a = c.pop();
        if (a == "") {
            return null
        } else {
            return a
        }
    };
    var _ordinalize_re = /(\d)(?=(\d\d\d)+(?!\d))/g;
    var ordinalize = function (a) {
        var b = "" + a;
        if (a < 11000) {
            b = ("" + a).replace(_ordinalize_re, "$1,")
        } else {
            if (a < 1000000) {
                b = Math.floor(a / 1000) + "k"
            } else {
                if (a < 1000000000) {
                    b = ("" + Math.floor(a / 1000)).replace(_ordinalize_re, "$1,") + "m"
                }
            }
        }
        return b
    };
    var nano = function (a, b) {
        return a.replace(/\{([\w\-\.]*)}/g, function (f, c) {
            var d = c.split("."), e = b[d.shift()];
            $.each(d, function () {
                if (e.hasOwnProperty(this)) {
                    e = e[this]
                } else {
                    e = f
                }
            });
            return e
        })
    };
    var objcopy = function (a) {
        if (a === undefined) {
            return undefined
        }
        if (a === null) {
            return null
        }
        if (a.parentNode) {
            return a
        }
        switch (typeof a) {
            case"string":
                return a.substring(0);
                break;
            case"number":
                return a + 0;
                break;
            case"boolean":
                return a === true;
                break
        }
        var b = ($.isArray(a)) ? [] : {};
        $.each(a, function (d, c) {
            b[d] = objcopy(c)
        });
        return b
    };
    var objmerge = function (d, b) {
        d = d || {};
        b = b || {};
        var c = objcopy(d);
        for (var a in b) {
            c[a] = b[a]
        }
        return c
    };
    var objcmp = function (e, c, d) {
        if (!e || !c) {
            return e === c
        }
        if (typeof e != typeof c) {
            return false
        }
        if (typeof e != "object") {
            return e === c
        } else {
            if ($.isArray(e)) {
                if (!($.isArray(c))) {
                    return false
                }
                if (e.length != c.length) {
                    return false
                }
            } else {
                var h = [];
                for (var f in e) {
                    if (e.hasOwnProperty(f)) {
                        h.push(f)
                    }
                }
                var g = [];
                for (var f in c) {
                    if (c.hasOwnProperty(f)) {
                        g.push(f)
                    }
                }
                if (!d) {
                    h.sort();
                    g.sort()
                }
                if (h.join(",") !== g.join(",")) {
                    return false
                }
            }
            var i = true;
            $.each(e, function (a) {
                var b = objcmp(e[a], c[a]);
                i = i && b;
                if (!i) {
                    return false
                }
            });
            return i
        }
    };
    var objkeys = function (b) {
        var a = [];
        $.each(b, function (d, c) {
            if (b.hasOwnProperty(d)) {
                a.push(d)
            }
        });
        return a
    };
    var objcontains = function (c) {
        if (!c || typeof c != "object") {
            return false
        }
        for (var b = 1, a = arguments.length; b < a; b++) {
            if (c.hasOwnProperty(arguments[b])) {
                return true
            }
        }
        return false
    };
    var uniq = function (b) {
        var a = b.length;
        var d = {};
        for (var c = 0; c < a; c++) {
            d[b[c]] = true
        }
        return objkeys(d)
    };
    var arbor_path = function () {
        var a = $("script").map(function (b) {
            var c = $(this).attr("src");
            if (!c) {
                return
            }
            if (c.match(/arbor[^\/\.]*.js|dev.js/)) {
                return c.match(/.*\//) || "/"
            }
        });
        if (a.length > 0) {
            return a[0]
        } else {
            return null
        }
    };
    /*     colors.js */
    var Colors = (function () {
        var f = /#[0-9a-f]{6}/i;
        var b = /#(..)(..)(..)/;
        var c = function (h) {
            var g = h.toString(16);
            return (g.length == 2) ? g : "0" + g
        };
        var a = function (g) {
            return parseInt(g, 16)
        };
        var d = function (g) {
            if (!g || typeof g != "object") {
                return false
            }
            var h = objkeys(g).sort().join("");
            if (h == "abgr") {
                return true
            }
        };
        var e = {
            CSS: {
                aliceblue: "#f0f8ff",
                antiquewhite: "#faebd7",
                aqua: "#00ffff",
                aquamarine: "#7fffd4",
                azure: "#f0ffff",
                beige: "#f5f5dc",
                bisque: "#ffe4c4",
                black: "#000000",
                blanchedalmond: "#ffebcd",
                blue: "#0000ff",
                blueviolet: "#8a2be2",
                brown: "#a52a2a",
                burlywood: "#deb887",
                cadetblue: "#5f9ea0",
                chartreuse: "#7fff00",
                chocolate: "#d2691e",
                coral: "#ff7f50",
                cornflowerblue: "#6495ed",
                cornsilk: "#fff8dc",
                crimson: "#dc143c",
                cyan: "#00ffff",
                darkblue: "#00008b",
                darkcyan: "#008b8b",
                darkgoldenrod: "#b8860b",
                darkgray: "#a9a9a9",
                darkgrey: "#a9a9a9",
                darkgreen: "#006400",
                darkkhaki: "#bdb76b",
                darkmagenta: "#8b008b",
                darkolivegreen: "#556b2f",
                darkorange: "#ff8c00",
                darkorchid: "#9932cc",
                darkred: "#8b0000",
                darksalmon: "#e9967a",
                darkseagreen: "#8fbc8f",
                darkslateblue: "#483d8b",
                darkslategray: "#2f4f4f",
                darkslategrey: "#2f4f4f",
                darkturquoise: "#00ced1",
                darkviolet: "#9400d3",
                deeppink: "#ff1493",
                deepskyblue: "#00bfff",
                dimgray: "#696969",
                dimgrey: "#696969",
                dodgerblue: "#1e90ff",
                firebrick: "#b22222",
                floralwhite: "#fffaf0",
                forestgreen: "#228b22",
                fuchsia: "#ff00ff",
                gainsboro: "#dcdcdc",
                ghostwhite: "#f8f8ff",
                gold: "#ffd700",
                goldenrod: "#daa520",
                gray: "#808080",
                grey: "#808080",
                green: "#008000",
                greenyellow: "#adff2f",
                honeydew: "#f0fff0",
                hotpink: "#ff69b4",
                indianred: "#cd5c5c",
                indigo: "#4b0082",
                ivory: "#fffff0",
                khaki: "#f0e68c",
                lavender: "#e6e6fa",
                lavenderblush: "#fff0f5",
                lawngreen: "#7cfc00",
                lemonchiffon: "#fffacd",
                lightblue: "#add8e6",
                lightcoral: "#f08080",
                lightcyan: "#e0ffff",
                lightgoldenrodyellow: "#fafad2",
                lightgray: "#d3d3d3",
                lightgrey: "#d3d3d3",
                lightgreen: "#90ee90",
                lightpink: "#ffb6c1",
                lightsalmon: "#ffa07a",
                lightseagreen: "#20b2aa",
                lightskyblue: "#87cefa",
                lightslategray: "#778899",
                lightslategrey: "#778899",
                lightsteelblue: "#b0c4de",
                lightyellow: "#ffffe0",
                lime: "#00ff00",
                limegreen: "#32cd32",
                linen: "#faf0e6",
                magenta: "#ff00ff",
                maroon: "#800000",
                mediumaquamarine: "#66cdaa",
                mediumblue: "#0000cd",
                mediumorchid: "#ba55d3",
                mediumpurple: "#9370d8",
                mediumseagreen: "#3cb371",
                mediumslateblue: "#7b68ee",
                mediumspringgreen: "#00fa9a",
                mediumturquoise: "#48d1cc",
                mediumvioletred: "#c71585",
                midnightblue: "#191970",
                mintcream: "#f5fffa",
                mistyrose: "#ffe4e1",
                moccasin: "#ffe4b5",
                navajowhite: "#ffdead",
                navy: "#000080",
                oldlace: "#fdf5e6",
                olive: "#808000",
                olivedrab: "#6b8e23",
                orange: "#ffa500",
                orangered: "#ff4500",
                orchid: "#da70d6",
                palegoldenrod: "#eee8aa",
                palegreen: "#98fb98",
                paleturquoise: "#afeeee",
                palevioletred: "#d87093",
                papayawhip: "#ffefd5",
                peachpuff: "#ffdab9",
                peru: "#cd853f",
                pink: "#ffc0cb",
                plum: "#dda0dd",
                powderblue: "#b0e0e6",
                purple: "#800080",
                red: "#ff0000",
                rosybrown: "#bc8f8f",
                royalblue: "#4169e1",
                saddlebrown: "#8b4513",
                salmon: "#fa8072",
                sandybrown: "#f4a460",
                seagreen: "#2e8b57",
                seashell: "#fff5ee",
                sienna: "#a0522d",
                silver: "#c0c0c0",
                skyblue: "#87ceeb",
                slateblue: "#6a5acd",
                slategray: "#708090",
                slategrey: "#708090",
                snow: "#fffafa",
                springgreen: "#00ff7f",
                steelblue: "#4682b4",
                tan: "#d2b48c",
                teal: "#008080",
                thistle: "#d8bfd8",
                tomato: "#ff6347",
                turquoise: "#40e0d0",
                violet: "#ee82ee",
                wheat: "#f5deb3",
                white: "#ffffff",
                whitesmoke: "#f5f5f5",
                yellow: "#ffff00",
                yellowgreen: "#9acd32"
            }, decode: function (h) {
                var g = arguments.length;
                for (var l = g - 1; l >= 0; l--) {
                    if (arguments[l] === undefined) {
                        g--
                    }
                }
                var k = arguments;
                if (!h) {
                    return null
                }
                if (g == 1 && d(h)) {
                    return h
                }
                var j = null;
                if (typeof h == "string") {
                    var o = 1;
                    if (g == 2) {
                        o = k[1]
                    }
                    var n = e.CSS[h.toLowerCase()];
                    if (n !== undefined) {
                        h = n
                    }
                    var m = h.match(f);
                    if (m) {
                        vals = h.match(b);
                        if (!vals || !vals.length || vals.length != 4) {
                            return null
                        }
                        j = {r: a(vals[1]), g: a(vals[2]), b: a(vals[3]), a: o}
                    }
                } else {
                    if (typeof h == "number") {
                        if (g >= 3) {
                            j = {r: k[0], g: k[1], b: k[2], a: 1};
                            if (g >= 4) {
                                j.a *= k[3]
                            }
                        } else {
                            if (g >= 1) {
                                j = {r: k[0], g: k[0], b: k[0], a: 1};
                                if (g == 2) {
                                    j.a *= k[1]
                                }
                            }
                        }
                    }
                }
                return j
            }, validate: function (g) {
                if (!g || typeof g != "string") {
                    return false
                }
                if (e.CSS[g.toLowerCase()] !== undefined) {
                    return true
                }
                if (g.match(f)) {
                    return true
                }
                return false
            }, mix: function (h, g, k) {
                var j = e.decode(h);
                var i = e.decode(g)
            }, blend: function (g, j) {
                j = (j !== undefined) ? Math.max(0, Math.min(1, j)) : 1;
                var h = e.decode(g);
                if (!h) {
                    return null
                }
                if (j == 1) {
                    return g
                }
                var h = g;
                if (typeof g == "string") {
                    h = e.decode(g)
                }
                var i = objcopy(h);
                i.a *= j;
                return nano("rgba({r},{g},{b},{a})", i)
            }, encode: function (g) {
                if (!d(g)) {
                    g = e.decode(g);
                    if (!d(g)) {
                        return null
                    }
                }
                if (g.a == 1) {
                    return nano("#{r}{g}{b}", {r: c(g.r), g: c(g.g), b: c(g.b)})
                } else {
                    return nano("rgba({r},{g},{b},{a})", g)
                }
            }
        };
        return e
    })();
    /* primitives.js */
    var Primitives = function (c, f, g) {
        var b = function (i, m, j, l, k) {
            this.x = i;
            this.y = m;
            this.w = j;
            this.h = l;
            this.style = (k !== undefined) ? k : {}
        };
        b.prototype = {
            draw: function (h) {
                this._draw(h)
            }, _draw: function (i, n, j, l, k) {
                if (objcontains(i, "stroke", "fill", "width")) {
                    k = i
                }
                if (this.x !== undefined) {
                    i = this.x, n = this.y, j = this.w, l = this.h;
                    k = objmerge(this.style, k)
                }
                k = objmerge(f, k);
                if (!k.stroke && !k.fill) {
                    return
                }
                var m = 0.5522848;
                ox = (j / 2) * m, oy = (l / 2) * m, xe = i + j, ye = n + l, xm = i + j / 2, ym = n + l / 2;
                c.save();
                c.beginPath();
                c.moveTo(i, ym);
                c.bezierCurveTo(i, ym - oy, xm - ox, n, xm, n);
                c.bezierCurveTo(xm + ox, n, xe, ym - oy, xe, ym);
                c.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                c.bezierCurveTo(xm - ox, ye, i, ym + oy, i, ym);
                c.closePath();
                if (k.fill !== null) {
                    if (k.alpha !== undefined) {
                        c.fillStyle = Colors.blend(k.fill, k.alpha)
                    } else {
                        c.fillStyle = Colors.encode(k.fill)
                    }
                    c.fill()
                }
                if (k.stroke !== null) {
                    c.strokeStyle = Colors.encode(k.stroke);
                    if (!isNaN(k.width)) {
                        c.lineWidth = k.width
                    }
                    c.stroke()
                }
                c.restore()
            }
        };
        var a = function (i, n, j, l, m, k) {
            if (objcontains(m, "stroke", "fill", "width")) {
                k = m;
                m = 0
            }
            this.x = i;
            this.y = n;
            this.w = j;
            this.h = l;
            this.r = (m !== undefined) ? m : 0;
            this.style = (k !== undefined) ? k : {}
        };
        a.prototype = {
            draw: function (h) {
                this._draw(h)
            }, _draw: function (j, o, k, m, n, l) {
                if (objcontains(n, "stroke", "fill", "width", "alpha")) {
                    l = n;
                    n = 0
                } else {
                    if (objcontains(j, "stroke", "fill", "width", "alpha")) {
                        l = j
                    }
                }
                if (this.x !== undefined) {
                    j = this.x, o = this.y, k = this.w, m = this.h;
                    l = objmerge(this.style, l)
                }
                l = objmerge(f, l);
                if (!l.stroke && !l.fill) {
                    return
                }
                var i = (n > 0);
                c.save();
                c.beginPath();
                c.moveTo(j + n, o);
                c.lineTo(j + k - n, o);
                if (i) {
                    c.quadraticCurveTo(j + k, o, j + k, o + n)
                }
                c.lineTo(j + k, o + m - n);
                if (i) {
                    c.quadraticCurveTo(j + k, o + m, j + k - n, o + m)
                }
                c.lineTo(j + n, o + m);
                if (i) {
                    c.quadraticCurveTo(j, o + m, j, o + m - n)
                }
                c.lineTo(j, o + n);
                if (i) {
                    c.quadraticCurveTo(j, o, j + n, o)
                }
                if (l.fill !== null) {
                    if (l.alpha !== undefined) {
                        c.fillStyle = Colors.blend(l.fill, l.alpha)
                    } else {
                        c.fillStyle = Colors.encode(l.fill)
                    }
                    c.fill()
                }
                if (l.stroke !== null) {
                    c.strokeStyle = Colors.encode(l.stroke);
                    if (!isNaN(l.width)) {
                        c.lineWidth = l.width
                    }
                    c.stroke()
                }
                c.restore()
            }
        };
        var e = function (i, l, h, j, k) {
            if (k !== undefined || typeof j == "number") {
                this.points = [{x: i, y: l}, {x: h, y: j}];
                this.style = k || {}
            } else {
                if ($.isArray(i)) {
                    this.points = i;
                    this.style = l || {}
                } else {
                    this.points = [i, l];
                    this.style = h || {}
                }
            }
        };
        e.prototype = {
            draw: function (h) {
                if (this.points.length < 2) {
                    return
                }
                var j = [];
                if (!$.isArray(this.points[0])) {
                    j.push(this.points)
                } else {
                    j = this.points
                }
                c.save();
                c.beginPath();
                $.each(j, function (n, m) {
                    c.moveTo(m[0].x + 0.5, m[0].y + 0.5);
                    $.each(m, function (o, p) {
                        if (o == 0) {
                            return
                        }
                        c.lineTo(p.x + 0.5, p.y + 0.5)
                    })
                });
                var i = $.extend(objmerge(f, this.style), h);
                if (i.closed) {
                    c.closePath()
                }
                if (i.fill !== undefined) {
                    var l = Colors.decode(i.fill, (i.alpha !== undefined) ? i.alpha : 1);
                    if (l) {
                        c.fillStyle = Colors.encode(l)
                    }
                    c.fill()
                }
                if (i.stroke !== undefined) {
                    var k = Colors.decode(i.stroke, (i.alpha !== undefined) ? i.alpha : 1);
                    if (k) {
                        c.strokeStyle = Colors.encode(k)
                    }
                    if (!isNaN(i.width)) {
                        c.lineWidth = i.width
                    }
                    c.stroke()
                }
                c.restore()
            }
        };
        var d = function (i, h, l, k) {
            var j = Colors.decode(i, h, l, k);
            if (j) {
                this.r = j.r;
                this.g = j.g;
                this.b = j.b;
                this.a = j.a
            }
        };
        d.prototype = {
            toString: function () {
                return Colors.encode(this)
            }, blend: function () {
                trace("blend", this.r, this.g, this.b, this.a)
            }
        };
        return {_Oval: b, _Rect: a, _Color: d, _Path: e}
    };
    /*   graphics.js */
    var Graphics = function (c) {
        var h = $(c);
        var q = $(h).get(0).getContext("2d");
        var i = null;
        var l = "rgb";
        var e = "origin";
        var m = {};
        var p = {background: null, fill: null, stroke: null, width: 0};
        var b = {};
        var g = {
            font: "sans-serif",
            size: 12,
            align: "left",
            color: Colors.decode("black"),
            alpha: 1,
            baseline: "ideographic"
        };
        var k = [];
        var o = Primitives(q, p, g);
        var f = o._Oval;
        var n = o._Rect;
        var d = o._Color;
        var a = o._Path;
        var j = {
            init: function () {
                if (!q) {
                    return null
                }
                return j
            }, size: function (s, r) {
                if (!isNaN(s) && !isNaN(r)) {
                    h.attr({width: s, height: r})
                }
                return {width: h.attr("width"), height: h.attr("height")}
            }, clear: function (r, u, s, t) {
                if (arguments.length < 4) {
                    r = 0;
                    u = 0;
                    s = h.attr("width");
                    t = h.attr("height")
                }
                q.clearRect(r, u, s, t);
                if (p.background !== null) {
                    q.save();
                    q.fillStyle = Colors.encode(p.background);
                    q.fillRect(r, u, s, t);
                    q.restore()
                }
            }, background: function (s, r, v, t) {
                if (s == null) {
                    p.background = null;
                    return null
                }
                var u = Colors.decode(s, r, v, t);
                if (u) {
                    p.background = u;
                    j.clear()
                }
            }, noFill: function () {
                p.fill = null
            }, fill: function (s, r, v, t) {
                if (arguments.length == 0) {
                    return p.fill
                } else {
                    if (arguments.length > 0) {
                        var u = Colors.decode(s, r, v, t);
                        p.fill = u;
                        q.fillStyle = Colors.encode(u)
                    }
                }
            }, noStroke: function () {
                p.stroke = null;
                q.strokeStyle = null
            }, stroke: function (s, r, v, u) {
                if (arguments.length == 0 && p.stroke !== null) {
                    return p.stroke
                } else {
                    if (arguments.length > 0) {
                        var t = Colors.decode(s, r, v, u);
                        p.stroke = t;
                        q.strokeStyle = Colors.encode(t)
                    }
                }
            }, strokeWidth: function (r) {
                if (r === undefined) {
                    return q.lineWidth
                }
                q.lineWidth = p.width = r
            }, Color: function (r) {
                return new d(r)
            }, drawStyle: function (s) {
                if (arguments.length == 0) {
                    return objcopy(p)
                }
                if (arguments.length == 2) {
                    var r = arguments[0];
                    var v = arguments[1];
                    if (typeof r == "string" && typeof v == "object") {
                        var u = {};
                        if (v.color !== undefined) {
                            var t = Colors.decode(v.color);
                            if (t) {
                                u.color = t
                            }
                        }
                        $.each("background fill stroke width".split(" "), function (w, x) {
                            if (v[x] !== undefined) {
                                u[x] = v[x]
                            }
                        });
                        if (!$.isEmptyObject(u)) {
                            m[r] = u
                        }
                    }
                    return
                }
                if (arguments.length == 1 && m[arguments[0]] !== undefined) {
                    s = m[arguments[0]]
                }
                if (s.width !== undefined) {
                    p.width = s.width
                }
                q.lineWidth = p.width;
                $.each("background fill stroke", function (y, x) {
                    if (s[x] !== undefined) {
                        if (s[x] === null) {
                            p[x] = null
                        } else {
                            var w = Colors.decode(s[x]);
                            if (w) {
                                p[x] = w
                            }
                        }
                    }
                });
                q.fillStyle = p.fill;
                q.strokeStyle = p.stroke
            }, textStyle: function (s) {
                if (arguments.length == 0) {
                    return objcopy(g)
                }
                if (arguments.length == 2) {
                    var r = arguments[0];
                    var v = arguments[1];
                    if (typeof r == "string" && typeof v == "object") {
                        var u = {};
                        if (v.color !== undefined) {
                            var t = Colors.decode(v.color);
                            if (t) {
                                u.color = t
                            }
                        }
                        $.each("font size align baseline alpha".split(" "), function (w, x) {
                            if (v[x] !== undefined) {
                                u[x] = v[x]
                            }
                        });
                        if (!$.isEmptyObject(u)) {
                            b[r] = u
                        }
                    }
                    return
                }
                if (arguments.length == 1 && b[arguments[0]] !== undefined) {
                    s = b[arguments[0]]
                }
                if (s.font !== undefined) {
                    g.font = s.font
                }
                if (s.size !== undefined) {
                    g.size = s.size
                }
                q.font = nano("{size}px {font}", g);
                if (s.align !== undefined) {
                    q.textAlign = g.align = s.align
                }
                if (s.baseline !== undefined) {
                    q.textBaseline = g.baseline = s.baseline
                }
                if (s.alpha !== undefined) {
                    g.alpha = s.alpha
                }
                if (s.color !== undefined) {
                    var t = Colors.decode(s.color);
                    if (t) {
                        g.color = t
                    }
                }
                if (g.color) {
                    var t = Colors.blend(g.color, g.alpha);
                    if (t) {
                        q.fillStyle = t
                    }
                }
            }, text: function (s, r, z, v) {
                if (arguments.length >= 3 && !isNaN(r)) {
                    v = v || {};
                    v.x = r;
                    v.y = z
                } else {
                    if (arguments.length == 2 && typeof(r) == "object") {
                        v = r
                    } else {
                        v = v || {}
                    }
                }
                var u = objmerge(g, v);
                q.save();
                if (u.align !== undefined) {
                    q.textAlign = u.align
                }
                if (u.baseline !== undefined) {
                    q.textBaseline = u.baseline
                }
                if (u.font !== undefined && !isNaN(u.size)) {
                    q.font = nano("{size}px {font}", u)
                }
                var w = (u.alpha !== undefined) ? u.alpha : g.alpha;
                var t = (u.color !== undefined) ? u.color : g.color;
                q.fillStyle = Colors.blend(t, w);
                if (w > 0) {
                    q.fillText(s, Math.round(u.x), u.y)
                }
                q.restore()
            }, textWidth: function (r, t) {
                t = objmerge(g, t || {});
                q.save();
                q.font = nano("{size}px {font}", t);
                var s = q.measureText(r).width;
                q.restore();
                return s
            }, Rect: function (s, A, t, v, z, u) {
                return new n(s, A, t, v, z, u)
            }, rect: function (s, A, t, v, z, u) {
                n.prototype._draw(s, A, t, v, z, u)
            }, Oval: function (r, v, s, u, t) {
                return new f(r, v, s, u, t)
            }, oval: function (r, v, s, u, t) {
                t = t || {};
                f.prototype._draw(r, v, s, u, t)
            }, line: function (s, v, r, t, u) {
                var w = new a(s, v, r, t);
                w.draw(u)
            }, lines: function (s, u, r, t) {
                if (typeof t == "number") {
                    k.push([{x: s, y: u}, {x: r, y: t}])
                } else {
                    k.push([s, u])
                }
            }, drawLines: function (r) {
                var s = new a(k);
                s.draw(r);
                k = []
            }
        };
        return j.init()
    };

    arbor = (typeof(arbor) !== 'undefined') ? arbor : {}
    $.extend(arbor, {
        // object constructor (don't use ‘new’, just call it)
        Graphics: function (ctx) {
            return Graphics(ctx)
        },

        // useful methods for dealing with the r/g/b
        colors: {
            CSS: Colors.CSS,           // dict:{colorname:"#fef2e2", ...}
            validate: Colors.validate, // ƒ(str) -> t/f
            decode: Colors.decode,     // ƒ(hexString_or_cssColor) -> {r,g,b,a}
            encode: Colors.encode,     // ƒ({r,g,b,a}) -> hexOrRgbaString
            blend: Colors.blend        // ƒ(color, opacity) -> rgbaString
        }
    })

})(this.jQuery)