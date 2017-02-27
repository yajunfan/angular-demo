/**
 * Created by Administrator on 2017/2/8 0008.
 */
var Class = {
    create: function() {
        return function() { this.initialize.apply(this, arguments); }
    }
}

var Extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
}

var Bind = function(object, fun) {
    return function() {
        return fun.apply(object, arguments);
    }
}

var BindAsEventListener = function(object, fun) {
    var args = Array.prototype.slice.call(arguments).slice(2);
    return function(event) {
        return fun.apply(object, [event || window.event].concat(args));
    }
}

var CurrentStyle = function(element) {
    return element.currentStyle || document.defaultView.getComputedStyle(element, null);
}

function addEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = fnHandler;
    }
};

function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = null;
    }
};