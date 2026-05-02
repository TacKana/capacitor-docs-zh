---
title: Capacitor 配置文件
description: Capacitor 配置说明
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/config
---

# 配置文件

Capacitor 配置文件用于设置工具链的高级选项。

以下是 `capacitor.config.json` 所有可用配置选项的完整示例：

```json5
{
  // Android 的包名和 iOS 的 bundle identifier
  "appId": "com.company.appname",

  // 你的应用名称
  "appName": "Capacitor Kitchen Sink",

  // 设置构建后 Web 资源的目录。该目录将用于在原生环境中运行你的应用
  "webDir": "www",

  // 使用的 JavaScript 包管理器，可以是 npm 或 yarn
  "npmClient": "npm",

  // 是否将 capacitor.js 作为复制到 Web 代码中的捆绑包使用，
  // 还是需要通过典型的 typescript/babel/webpack/rollup 工作流进行捆绑/导入
  //
  // 初始项目将此设置为 true，但如果你使用 Ionic 或其他框架，
  // 可能需要将此设置为 false（默认为 false）
  "bundledWebRuntime": false,

  // 在 Windows 上，我们无法在不知道完整路径的情况下自动打开 Android Studio
  // 默认设置为默认的 Android Studio 安装路径，但你可以手动更改它
  "windowsAndroidStudioPath": "C:\\Program Files\Android\Android Studio\binstudio64.exe",

  // 布尔值，决定是否隐藏 iOS 和 Android 的原生日志。如果在 ios 或 android 配置中也有声明，则忽略此设置
  // 默认为 false
  "hideLogs": true,

  // server 对象包含端口和 URL 配置
  "server": {
    // 你可以让应用加载外部 URL（例如用于实时重载）
    "url": "http://192.168.1.33:8100",
    // 可以配置本地主机名，但建议保持 localhost
    // 因为它允许运行需要安全上下文的 Web API，例如
    // navigator.geolocation 和 MediaDevices.getUserMedia
    "hostname": "app",
    // 可以配置使用的本地方案。这在从
    // cordova-plugin-ionic-webview 迁移时很有用，因为 iOS 上的默认方案是 ionic
    "iosScheme": "ionic",
    "androidScheme": "http",
    // 通常所有外部 URL 都在浏览器中打开。通过设置此选项，你可以告诉
    // Capacitor 在它的 WebView 中打开属于这些主机的 URL
    "allowNavigation": ["example.org", "*.example.org", "192.0.2.1"],
  },
  // iOS 和 Android 的 Capacitor WebView 用户代理，除非在 ios 或 android 对象中也声明了
  "overrideUserAgent": "my custom user agent",
  // 附加到 iOS 和 Android 的 Capacitor WebView 原始用户代理的字符串，
  // 除非在 ios 或 android 对象中也声明了。仅在未设置 overrideUserAgent 时生效
  "appendUserAgent": "string to append",
  // iOS 和 Android 的 Capacitor WebView 背景颜色，除非在 ios 或 android 对象中也声明了
  "backgroundColor": "#ffffff",
  "android": {
    // Android 的 Capacitor WebView 用户代理
    "overrideUserAgent": "my custom user agent for Android",
    // 附加到 Android 的 Capacitor WebView 原始用户代理的字符串
    "appendUserAgent": "string to append for Android",
    // 仅 Android 的 Capacitor WebView 背景颜色
    "backgroundColor": "#ffffff",
    // 在 Android 上，如果通过 https 协议从远程/测试服务器加载应用，
    // 需要启用混合内容模式以允许 WebView 加载
    // 来自不同方案的文件，例如 capacitor-content:// 或 capacitor-file://
    "allowMixedContent": true,
    // Android 的默认键盘不允许正确的 JS 按键捕获
    // 你可以通过启用此设置来使用更简单的键盘
    // 请注意这个键盘存在一些问题和限制
    "captureInput": true,
    // 启用对此应用程序中加载到任何 WebView 的 Web 内容（HTML / CSS / JavaScript）的调试
    // 可以启用此标志以便于调试 WebView 中的 Web 布局和 JavaScript 代码
    "webContentsDebuggingEnabled": true,

    // 布尔值，决定是否隐藏 Android 的原生日志
    // 默认为 false
    "hideLogs": true,
  },
  "ios": {
    // iOS 的 Capacitor WebView 用户代理
    "overrideUserAgent": "my custom user agent for iOS",
    // 附加到 iOS 的 Capacitor WebView 原始用户代理的字符串
    "appendUserAgent": "string to append for iOS",
    // 仅 iOS 的 Capacitor WebView 背景颜色
    "backgroundColor": "#ffffff",
    // 配置 WebView 的 UIScrollView 的内容插入行为
    // 默认为 never
    // 可能的值有 "automatic"、"scrollableAxes"、"never" 和 "always"
    // https://developer.apple.com/documentation/uikit/uiscrollview/contentinsetadjustmentbehavior
    "contentInset": "always",
    // 配置 Cordova 插件使用的 Swift 版本
    // 默认为 5.0
    "cordovaSwiftVersion": "4.2",
    // 项目支持的最低 iOS 版本
    // 默认为 11.0
    "minVersion": "11.3",
    // 一些 Cordova 插件需要配置链接器标志
    "cordovaLinkerFlags": ["-ObjC"],
    // 布尔值，决定点击链接时是否显示链接目标的预览
    "allowsLinkPreview": false,

    // 布尔值，决定是否隐藏 iOS 的原生日志
    // 默认为 false
    "hideLogs": true,
  },
}
```

<span id="schema"></span>

<span id="schema"></span>

<span id="schema"></span>

<span id="schema"></span>

<span id="schema"></span>
