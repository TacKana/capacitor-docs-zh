---
title: Known Incompatible Cordova Plugins
description: 已知不兼容的Cordova插件列表
contributors:
  - dotNetkow
---

# 已知不兼容的Cordova插件

虽然我们已经测试了许多流行的Cordova插件，但Capacitor可能并不支持所有Cordova插件。有些插件无法与Capacitor兼容，或者Capacitor已经提供了替代方案。如果已知某个插件存在冲突或会导致构建问题，在执行`npx cap update`时将会自动跳过该插件。

如果您发现现有Cordova插件存在问题，请[告知我们](https://github.com/ionic-team/capacitor/issues/new)，并提供问题详情和插件信息。

## 已知不兼容插件列表（可能变更）

- cordova-plugin-add-swift-support（无需使用，Capacitor内置Swift支持）
- cordova-plugin-admobpro（[详情](https://github.com/ionic-team/capacitor/issues/1101)）
- cordova-plugin-braintree（[详情](https://github.com/ionic-team/capacitor/issues/1415)）
- cordova-plugin-code-push（[详情](https://github.com/microsoft/code-push/issues/615)）
- cordova-plugin-compat（无需使用）
- cordova-plugin-console（无需使用，Capacitor自带控制台功能）
- cordova-plugin-crosswalk-webview（Capacitor不允许更换WebView）
- cordova-plugin-fcm（[详情](https://github.com/ionic-team/capacitor/issues/584)）
- cordova-plugin-firebase（[详情](https://github.com/ionic-team/capacitor/issues/815)）
- cordova-plugin-ionic-keyboard（无需使用，Capacitor自带键盘功能）
- cordova-plugin-ionic-webview（无需使用，Capacitor使用WKWebView）
- cordova-plugin-music-controls（会导致构建失败，已跳过）
- cordova-plugin-qrscanner（[详情](https://github.com/ionic-team/capacitor/issues/1213)）
- cordova-plugin-splashscreen（无需使用，Capacitor自带启动屏功能）
- cordova-plugin-statusbar（无需使用，Capacitor自带状态栏功能）
- cordova-plugin-wkwebview-engine（无需使用，Capacitor使用WKWebView）
- cordova-plugin-googlemaps（在iOS上会导致构建失败，仅iOS平台跳过）
- cordova-plugin-lottie-splashscreen（不兼容且需要额外开发工作）