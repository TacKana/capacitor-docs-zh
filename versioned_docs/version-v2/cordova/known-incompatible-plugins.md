---
title: 已知不兼容的 Cordova 插件
description: 已知不兼容的 Cordova 插件
contributors:
  - dotNetkow
---

# 已知不兼容的 Cordova 插件

虽然我们已经测试了许多流行的 Cordova 插件，但 Capacitor 可能无法支持每一个 Cordova 插件。有些插件与 Capacitor 不兼容，或者 Capacitor 提供了存在冲突的替代方案。如果已知某个插件存在冲突或导致构建问题，在执行 `npx cap update` 时将会跳过该插件。

如果您发现现有 Cordova 插件存在问题，请 [告知我们](https://github.com/ionic-team/capacitor/issues/new)，并提供问题详情及插件信息。

## 已知不兼容的插件（可能会发生变化）

- cordova-plugin-add-swift-support（不需要，Capacitor 内置 Swift 支持）
- cordova-plugin-admobpro（[详见](https://github.com/ionic-team/capacitor/issues/1101)）
- cordova-plugin-braintree（[详见](https://github.com/ionic-team/capacitor/issues/1415)）
- cordova-plugin-code-push（[详见](https://github.com/microsoft/code-push/issues/615)）
- cordova-plugin-compat（不需要）
- cordova-plugin-console（不需要，Capacitor 自带控制台功能）
- cordova-plugin-crosswalk-webview（Capacitor 不允许更改 WebView）
- cordova-plugin-fcm（[详见](https://github.com/ionic-team/capacitor/issues/584)）
- cordova-plugin-firebase（[详见](https://github.com/ionic-team/capacitor/issues/815)）
- cordova-plugin-ionic-keyboard（不需要，Capacitor 自带键盘功能）
- cordova-plugin-ionic-webview（不需要，Capacitor 使用 WKWebView）
- cordova-plugin-music-controls（导致构建失败，已跳过）
- cordova-plugin-qrscanner（[详见](https://github.com/ionic-team/capacitor/issues/1213)）
- cordova-plugin-splashscreen（不需要，Capacitor 自带启动屏功能）
- cordova-plugin-statusbar（不需要，Capacitor 自带状态栏功能）
- cordova-plugin-wkwebview-engine（不需要，Capacitor 使用 WKWebView）
- cordova-plugin-googlemaps（导致 iOS 构建失败，仅在 iOS 上跳过）
- cordova-plugin-lottie-splashscreen（不兼容，需要进行更多开发工作）