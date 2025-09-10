---
title: Capacitor 配置文件
description: Capacitor 配置指南
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/config
---

# 配置文件

Capacitor 配置文件用于设置工具链的高级选项。

以下是 `capacitor.config.json` 的完整配置示例：

```json5
{
  // Android 的包名和 iOS 的 bundle identifier
  "appId": "com.company.appname",

  // 应用名称
  "appName": "Capacitor Kitchen Sink",

  // 构建后的 web 资源目录，该目录将用于在原生环境中运行应用
  "webDir": "www",

  // 使用的 JavaScript 包管理器，可以是 npm 或 yarn
  "npmClient": "npm",

  // 是否将 capacitor.js 作为打包后的文件复制到 web 代码中，
  // 还是通过常规的 typescript/babel/webpack/rollup 工作流进行导入。
  //
  // 初始项目会设为 true，但如果使用 Ionic 或其他框架，
  // 建议设为 false（默认值为 false）
  "bundledWebRuntime": false,

  // 在 Windows 上，我们需要完整路径才能自动打开 Android Studio
  // 默认设置为标准安装路径，但可以手动修改
  "windowsAndroidStudioPath": "C:\\Program Files\Android\Android Studio\binstudio64.exe",

  // 布尔值，决定是否隐藏 iOS 和 Android 的原生日志（如果在 ios 或 android 节点中重复声明，则以子节点为准）
  // 默认值为 false
  "hideLogs": true,

  // server 对象包含端口和 URL 配置
  "server": {
    // 可设置应用加载外部 URL（例如用于热更新）
    "url": "http://192.168.1.33:8100",
    // 可配置本地主机名，但建议保留 localhost
    // 这样可以使用需要安全上下文的 web API，如
    // navigator.geolocation 和 MediaDevices.getUserMedia
    "hostname": "app",
    // 可配置本地使用的 scheme，在从 cordova-plugin-ionic-webview 迁移时特别有用，
    // 因为在 iOS 上该插件的默认 scheme 是 ionic
    "iosScheme": "ionic",
    "androidScheme": "http",
    // 通常所有外部 URL 都在浏览器中打开。通过此配置，
    // 可以让 Capacitor 在这些主机的 WebView 内打开 URL
    "allowNavigation": ["example.org", "*.example.org", "192.0.2.1"],
  },
  // iOS 和 Android 的 Capacitor WebView 用户代理（除非在 ios 或 android 节点中重复声明）
  "overrideUserAgent": "my custom user agent",
  // 附加到 Capacitor WebView 原始用户代理的字符串（除非在 ios 或 android 节点中重复声明），仅在未设置 overrideUserAgent 时生效
  "appendUserAgent": "string to append",
  // iOS 和 Android 的 Capacitor WebView 背景色（除非在 ios 或 android 节点中重复声明）
  "backgroundColor": "#ffffff",
  "android": {
    // Android 的 Capacitor WebView 用户代理
    "overrideUserAgent": "my custom user agent for Android",
    // 附加到 Android 的 Capacitor WebView 原始用户代理的字符串
    "appendUserAgent": "string to append for Android",
    // 仅 Android 的 Capacitor WebView 背景色
    "backgroundColor": "#ffffff",
    // 在 Android 上，如果从 https 协议的远程/测试服务器加载应用，
    // 需要启用混合内容模式以允许 WebView 加载不同 scheme 的文件，
    // 如 capacitor-content:// 或 capacitor-file://
    "allowMixedContent": true,
    // Android 默认键盘无法正确捕获 JS 按键事件，
    // 可以通过此配置启用更简单的键盘，
    // 但需注意该键盘存在一些问题和限制
    "captureInput": true,
    // 启用应用中所有 WebView 加载的网页内容（HTML/CSS/JavaScript）的调试功能
    // 此标志可用于辅助调试 WebView 内的网页布局和 JavaScript 代码
    "webContentsDebuggingEnabled": true,

    // 布尔值，决定是否隐藏 Android 原生日志
    // 默认值为 false
    "hideLogs": true,
  },
  "ios": {
    // iOS 的 Capacitor WebView 用户代理
    "overrideUserAgent": "my custom user agent for iOS",
    // 附加到 iOS 的 Capacitor WebView 原始用户代理的字符串
    "appendUserAgent": "string to append for iOS",
    // 仅 iOS 的 Capacitor WebView 背景色
    "backgroundColor": "#ffffff",
    // 配置 WebView 的 UIScrollView 内容插入行为
    // 默认值为 never
    // 可选值："automatic"、"scrollableAxes"、"never" 和 "always"
    // 详见 https://developer.apple.com/documentation/uikit/uiscrollview/contentinsetadjustmentbehavior
    "contentInset": "always",
    // 为 Cordova 插件配置使用的 Swift 版本
    // 默认值为 5.0
    "cordovaSwiftVersion": "4.2",
    // 项目支持的最低 iOS 版本
    // 默认值为 11.0
    "minVersion": "11.3",
    // 某些 Cordova 插件需要配置链接器标志
    "cordovaLinkerFlags": ["-ObjC"],
    // 布尔值，决定点击链接时是否显示目标页面预览
    "allowsLinkPreview": false,

    // 布尔值，决定是否隐藏 iOS 原生日志
    // 默认值为 false
    "hideLogs": true,
  },
}
```