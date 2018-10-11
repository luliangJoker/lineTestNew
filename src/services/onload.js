(function(doc, win) {
// 分辨率Resolution适配
var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 50 * (clientWidth / 375) + 'px';
    };

// Abort if browser does not support addEventListener
if (!doc.addEventListener) return;
win.addEventListener(resizeEvt, recalc, false);
doc.addEventListener('DOMContentLoaded', recalc, false);

// 一物理像素在不同屏幕的显示效果不一样。要根据devicePixelRatio来修改meta标签的scale,要注释上面的meta标签
(function() {
    return;
    var dpr = scale = 1;
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
            dpr = 3;
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1;
    }
    scale = 1 / dpr;

    //
    var metaEl = "";
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(metaEl);
    } else {
        var wrap = doc.createElement('div');
        wrap.appendChild(metaEl);
        doc.write(wrap.innerHTML);
    }
})();

})(document, window);

window.setupWebViewJavascriptBridge = function(callback) {
if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
}
if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
}
window.WVJBCallbacks = [callback];
var WVJBIframe = document.createElement('iframe');
WVJBIframe.style.display = 'none';
WVJBIframe.src = 'https://__bridge_loaded__';
document.documentElement.appendChild(WVJBIframe);
setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe)
}, 0);
//兼容Android端
document.addEventListener(
    'WebViewJavascriptBridgeReady', function() {
        callback(WebViewJavascriptBridge)
    },
    false
);

}

var statusBarHeight = 24;

function getStatusBarHeight() {
    // window.bridge.callHandler('getTranslucentStatus', {}, function(response) {
    //     if (typeof response == "string") {
    //         response = JSON.parse(response)
    //     }
    //     if (response.supported == '1') {
    //         statusBarHeight = parseInt(response.statusbar_height);
    //         //更新状态栏高度
    //
    //     }
    // })
}

console.log("call setupWebViewJavascriptBridge");
window.setupWebViewJavascriptBridge(function(bridge) {
    window.bridge = bridge;
    //初始化,Android用到
    if (bridge.init && typeof (bridge.init) == "function") {
        console.log("call bridge.init");
        bridge.init(function(message, responseCallback) {
            console.log("call bridge.init finished");
            var data = {
                'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
        });

    }

    getStatusBarHeight();
    //函数说明 注册Android的返回键处理
    window.bridge.registerHandler('androidBack', function(data, responseCallback) {
        //回调返回处理,当androidBack的函数存在时，处理页面跳转，否则处理退出app

        if (window.androidBack) {
            window.androidBack();
            responseCallback(false);
        } else {
            responseCallback(true);
        }
    });
})