---
title: Capacitor 配置文件
description: 配置 Capacitor
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/config
---

# 配置文件

Capacitor 配置文件用于设置 Capacitor 工具的高级选项。

以下是 `capacitor.config.json` 可用配置选项的完整示例：

```json5
{
  // Android 的包名和 iOS 的捆绑标识符。
  "appId": "com.company.appname",

  // 您的应用名称。
  "appName": "Capacitor Kitchen Sink",

  // 设置构建后的 Web 资源目录。这是应用在原生环境中运行时将使用的目录。
  "webDir": "www",

  // JavaScript 包管理器，可以是 npm 或 yarn。
  "npmClient": "npm",

  // 是否使用 capacitor.js 作为复制到 Web 代码中的 bundle，
  // 或者要求通过典型的 typescript/babel/webpack/rollup 工作流进行打包/导入。
  //
  // 起始项目将此设置为 true，但如果您使用 Ionic 或其他框架，
  // 您可能希望将其设为 false（默认值为 false）。
  "bundledWebRuntime": false,

  // 在 Windows 上，如果不了解完整路径，我们无法自动打开 Android Studio。
  // 默认值设置为 Android Studio 的默认安装路径，但您可以手动更改。
  "windowsAndroidStudioPath": "C:\\Program Files\\Android\\Android Studio\\bin\\studio64.exe",

  // 一个布尔值，决定是否隐藏 iOS 和 Android 的原生日志。如果在 ios 或 android 对象内部也声明了该配置项，则忽略此处的设置。
  // 默认值为 false。
  "hideLogs": true,

  // Server 对象包含端口和 URL 配置
  "server": {
    // 您可以让应用加载外部 URL（例如用于实时重载）
    "url": "http://192.168.1.33:8100",
    // 您可以配置本地主机名，但建议保持使用 localhost，
    // 因为这允许运行需要安全上下文的 Web API，例如
    // navigator.geolocation 和 MediaDevices.getUserMedia。
    "hostname": "app",
    // 可以配置使用的本地 scheme。这在从 cordova-plugin-ionic-webview 迁移时很有用，
    // 因为在 iOS 上默认 scheme 是 ionic。
    "iosScheme": "ionic",
    "androidScheme": "http",
    // 通常所有外部 URL 都在浏览器中打开。通过设置此选项，您可以告诉
    // Capacitor 将这些主机所属的 URL 在其 WebView 内打开。
    "allowNavigation": ["example.org", "*.example.org", "192.0.2.1"],
  },
  // iOS 和 Android 上 Capacitor WebView 的 User Agent，除非在 ios 或 android 对象中也声明了
  "overrideUserAgent": "my custom user agent",
  // 附加到 iOS 和 Android 上 Capacitor WebView 原始 User Agent 的字符串，
  // 除非在 ios 或 android 对象中也声明了。仅在未设置 overrideUserAgent 时生效。
  "appendUserAgent": "string to append",
  // iOS 和 Android 上 Capacitor WebView 的背景颜色，除非在 ios 或 android 对象中也声明了
  "backgroundColor": "#ffffff",
  "android": {
    // Android 上 Capacitor WebView 的 User Agent
    "overrideUserAgent": "my custom user agent for Android",
    // 附加到 Android 上 Capacitor WebView 原始 User Agent 的字符串。
    "appendUserAgent": "string to append for Android",
    // 仅 Android 上 Capacitor WebView 的背景颜色
    "backgroundColor": "#ffffff",
    // 在 Android 上，如果您通过 https 协议从远程/测试服务器加载应用，
    // 您需要启用混合内容模式，以允许 WebView 加载来自不同 scheme 的文件，
    // 例如 capacitor-content:// 或 capacitor-file://。
    "allowMixedContent": true,
    // Android 的默认键盘不允许正确的 JS 按键捕获。
    // 启用此选项可以使用更简单的键盘。
    // 请注意，此键盘存在一些问题和限制。
    "captureInput": true,
    // 启用对此应用中所有 WebView 加载的 Web 内容（HTML / CSS / JavaScript）的调试。
    // 可以启用此标志以方便调试 Web 布局和在 WebView 中运行的 JavaScript 代码。
    "webContentsDebuggingEnabled": true,

    // 一个布尔值，决定是否隐藏 Android 原生日志。
    // 默认值为 false。
    "hideLogs": true,
  },
  "ios": {
    // iOS 上 Capacitor WebView 的 User Agent
    "overrideUserAgent": "my custom user agent for iOS",
    // 附加到 iOS 上 Capacitor WebView 原始 User Agent 的字符串。
    "appendUserAgent": "string to append for iOS",
    // 仅 iOS 上 Capacitor WebView 的背景颜色
    "backgroundColor": "#ffffff",
    // 配置 WebView 的 UIScrollView 的 content inset 行为。
    // 默认值为 never。
    // 可选值有 "automatic"、"scrollableAxes"、"never" 和 "always"。
    // https://developer.apple.com/documentation/uikit/uiscrollview/contentinsetadjustmentbehavior
    "contentInset": "always",
    // 配置 Cordova 插件使用的 Swift 版本。
    // 默认值为 5.0。
    "cordovaSwiftVersion": "4.2",
    // 项目支持的最低 iOS 版本。
    // 默认值为 11.0。
    "minVersion": "11.3",
    // 某些 Cordova 插件需要配置链接器标志。
    "cordovaLinkerFlags": ["-ObjC"],
    // 一个布尔值，决定点击链接时是否显示链接目标的预览。
    "allowsLinkPreview": false,

    // 一个布尔值，决定是否隐藏 iOS 原生日志。
    // 默认值为 false。
    "hideLogs": true,
  },
}
```
