
### 通用方法
```js
/**
 * 判断是安卓还是IOS环境
 */
function isAndroid() {
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或者uc浏览器
  // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  return isAndroid
}

/**
 * 安卓 注册事件监听
 */
function connectWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        callback(WebViewJavascriptBridge)
      },
      false
    )
  }
}
/**
 * ios 注册事件监听
 */
function setupWebViewJavascriptBridge(callback) {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
  } else {
    if (!isAndroid()) {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge)
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)
      }
      window.WVJBCallbacks = [callback] // 创建一个 WVJBCallbacks 全局属性数组，并将 callback 插入到数组中
      var WVJBIframe = document.createElement('iframe')  // 创建一个 iframe 元素
      WVJBIframe.style.display = 'none' // 不显示
      WVJBIframe.src = 'https://__bridge_loaded__'  // 设置 iframe 的 src 属性
      document.documentElement.appendChild(WVJBIframe) // 把 iframe 添加到当前文导航上。
      setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
      }, 0)
    }
  }
}

// 安卓 ios公用执行方法
function onExecuteWebViewFn(funcName, cb, params = {}) {
  if (isAndroid()) {
    connectWebViewJavascriptBridge(bridge => {
      bridge.callHandler(funcName, params, cb)
    })
  } else {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(funcName, params, cb)
    })
  }
}

```

### demo使用
vue中使用需要在mounted注册

:::demo
```vue
<script>
export default {
  mounted(){
    window.H5Func = this.H5Func
   },
   destroyed(){
     window.H5Func = null
   },
   onLoad(){
     if(!isAndroid()){
      try{
        /** 
         * WKWebView有一个内容交互控制器，该对象提供了通过JS向WKWebView发送消息的途径。
         * 需要设置MessageHandler，我把这个功能简称为MessageHandler
         * */ 
        window.webkit.messageHandlers.appFunc.postMessage('')
      }catch(err){
        console.log('执行中错误');
      }}
     // 监听回调方法
     onExecuteWebViewFn("H5Func",(res)=>{
      console.log('H5Func')
     })
   },
  methods: {
    H5Func() {}
  }
}
</script>

```


:::