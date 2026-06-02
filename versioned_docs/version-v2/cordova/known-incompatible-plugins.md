---
title: 已知不兼容的 Cordova 插件
description: 已知不兼容的 Cordova 插件
contributors:
  - dotNetkow
---

# 已知不兼容的 Cordova 插件

虽然我们已经测试了许多流行的 Cordova 插件，但 Capacitor 可能不支持每个 Cordova 插件。有些插件无法与 Capacitor 一起使用，或者 Capacitor 提供了冲突的替代方案。如果已知该插件存在冲突或导致构建问题，则在运行 `npx cap update` 时会跳过该插件。

如果您发现现有 Cordova 插件存在问题，请通过提供问题详细信息和插件信息 [告知我们](https://github.com/ionic-team/capacitor/issues/new)。

## 已知不兼容的插件（可能发生变化）

- cordova-plugin-add-swift-support（不需要，Capacitor 内置了 Swift 支持）
- cordova-plugin-admobpro（[查看详情](https://github.com/ionic-team/capacitor/issues/1101)）
- cordova-plugin-braintree（[查看详情](https://github.com/ionic-team/capacitor/issues/1415)）
- cordova-plugin-code-push（[查看详情](https://github.com/microsoft/code-push/issues/615)）
- cordova-plugin-compat（不需要）
- cordova-plugin-console（不需要，Capacitor 有自己的实现）
- cordova-plugin-crosswalk-webview（Capacitor 不允许更改 webview）
- cordova-plugin-fcm（[查看详情](https://github.com/ionic-team/capacitor/issues/584)）
- cordova-plugin-firebase（[查看详情](https://github.com/ionic-team/capacitor/issues/815)）
- cordova-plugin-ionic-keyboard（不需要，Capacitor 有自己的实现）
- cordova-plugin-ionic-webview（不需要，Capacitor 使用 WKWebView）
- cordova-plugin-music-controls（导致构建失败，已跳过）
- cordova-plugin-qrscanner（[查看详情](https://github.com/ionic-team/capacitor/issues/1213)）
- cordova-plugin-splashscreen（不需要，Capacitor 有自己的实现）
- cordova-plugin-statusbar（不需要，Capacitor 有自己的实现）
- cordova-plugin-wkwebview-engine（不需要，Capacitor 使用 WKWebView）
- cordova-plugin-googlemaps（在 iOS 上导致构建失败，仅对 iOS 跳过）
- cordova-plugin-lottie-splashscreen（不兼容，需要进一步的工作）