---
title: Cordova 插件
description: 使用 Cordova 插件
sidebar_label: Cordova 插件
slug: /plugins/cordova
---

# Cordova 插件

在开发使用 Capacitor 的应用时，可以使用 Cordova 插件。

## 安装 Cordova 插件

Capacitor 插件使用您常用的包管理器安装，然后同步到原生项目中。Capacitor 中 Cordova 插件的安装过程是相同的。

安装插件，同步，然后完成任何必要的原生项目配置（参见[变量和钩子](/plugins/cordova.md#variables-and-hooks)）：

```bash
npm install cordova-plugin-name
npx cap sync
```

> 如果 Cordova 插件有一个 [`@awesome-cordova-plugins`](https://ionicframework.com/docs/native) 包装器，您也可以安装它以获得 TypeScript 支持：
>
> ```bash
> npm install @awesome-cordova-plugins/plugin-name
> ```

## 更新 Cordova 插件

使用您常用的包管理器来更新插件。然后，将更新后的插件同步到原生项目中：

```bash
npm install cordova-plugin-name@version
npx cap sync
```

## 确定已安装的插件版本

查看项目中安装的 Capacitor 和 Cordova 插件列表（及其确切版本号）：

```bash
npx cap ls
```

## 兼容性问题

Capacitor 与某些 Cordova 插件可能存在兼容性问题。许多官方 Cordova 插件不应使用，因为 Capacitor 提供了[官方替代方案](/plugins/official.md)。使用变量和钩子的 Cordova 插件可能部分兼容。某些 Cordova 插件完全不相容（参见[此列表](/plugins/cordova.md#known-incompatible-plugins)）。

如果您发现现有 Cordova 插件的问题，请[告诉我们](https://github.com/ionic-team/capacitor/issues/new)，并提供问题的详细信息和插件信息。

### 变量和钩子

Capacitor 不支持 Cordova 安装变量、自动配置或钩子，这是因为我们的理念是让您控制原生项目源代码（这意味着钩子之类的东西是不必要的）。如果您的插件需要设置变量或配置，您需要通过映射插件的 `plugin.xml` 与 iOS 和 Android 上的必要设置来手动应用这些配置设置。

请查阅 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南，了解如何配置各个平台。

### 已知不兼容的插件

如果某个插件已知会引起冲突或导致构建问题，它在运行 `npx cap sync` 时将被跳过。

以下是已知不兼容的插件列表：

- [`cordova-plugin-add-swift-support`](https://github.com/akofman/cordova-plugin-add-swift-support)（不需要，Capacitor 内置了 Swift 支持）
- [`cordova-plugin-admobpro`](https://github.com/floatinghotpot/cordova-admob-pro)（[查看详情](https://github.com/ionic-team/capacitor/issues/1101)）
- [`cordova-plugin-braintree`](https://github.com/Taracque/cordova-plugin-braintree)（[查看详情](https://github.com/ionic-team/capacitor/issues/1415)）
- [`cordova-plugin-code-push`](https://github.com/microsoft/code-push)（[查看详情](https://github.com/microsoft/code-push/issues/615)）
- [`cordova-plugin-compat`](https://github.com/apache/cordova-plugin-compat)（不需要）
- [`cordova-plugin-console`](https://github.com/apache/cordova-plugin-console)（不需要，Capacitor 有自己的）
- [`cordova-plugin-crosswalk-webview`](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview)（Capacitor 不允许更改 WebView）
- [`cordova-plugin-fcm`](https://github.com/fechanique/cordova-plugin-fcm)（[查看详情](https://github.com/ionic-team/capacitor/issues/584)）
- [`cordova-plugin-firebase`](https://github.com/arnesson/cordova-plugin-firebase)（[查看详情](https://github.com/ionic-team/capacitor/issues/815)）
- [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard)（不需要，Capacitor 有自己的）
- [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)（不需要，Capacitor 使用 WKWebView）
- [`cordova-plugin-music-controls`](https://github.com/homerours/cordova-music-controls-plugin)（导致构建失败，已跳过）
- [`cordova-plugin-qrscanner`](https://github.com/bitpay/cordova-plugin-qrscanner)（[查看详情](https://github.com/ionic-team/capacitor/issues/1213)）
- [`cordova-plugin-splashscreen`](https://github.com/apache/cordova-plugin-splashscreen)（不需要，Capacitor 有自己的）
- [`cordova-plugin-statusbar`](https://github.com/apache/cordova-plugin-statusbar)（不需要，Capacitor 有自己的）
- [`cordova-plugin-wkwebview-engine`](https://github.com/apache/cordova-plugin-wkwebview-engine)（不需要，Capacitor 使用 WKWebView）
- [`cordova-plugin-googlemaps`](https://github.com/mapsplugin/cordova-plugin-googlemaps)（在 iOS 上导致构建失败，仅对 iOS 跳过）
