---
title: Cordova 插件
description: 使用 Cordova 插件
sidebar_label: Cordova 插件
slug: /plugins/cordova
---

# Cordova 插件

在使用 Capacitor 开发应用时，可以使用 Cordova 插件。

## 安装 Cordova 插件

Capacitor 插件通过常规的包管理器安装，然后同步到原生项目中。在 Capacitor 中安装 Cordova 插件的过程与此相同。

安装插件、同步，然后完成任何必需的原生项目配置（请参阅 [变量与钩子](/plugins/cordova.md#变量与钩子)）：

```bash
npm install cordova-plugin-name
npx cap sync
```

> 如果 Cordova 插件有 [`@awesome-cordova-plugins`](https://ionicframework.com/docs/native) 包装器，你也可以安装它以获得 TypeScript 支持：
>
> ```bash
> npm install @awesome-cordova-plugins/plugin-name
> ```

## 更新 Cordova 插件

使用常规的包管理器更新插件。然后，将更新后的插件同步到原生项目中：

```bash
npm install cordova-plugin-name@version
npx cap sync
```

## 确定已安装的插件版本

要查看项目中安装的 Capacitor 和 Cordova 插件列表（及其精确版本号），请运行：

```bash
npx cap ls
```

## 兼容性问题

Capacitor 与某些 Cordova 插件之间可能存在兼容性问题。许多官方的 Cordova 插件不应使用，因为 Capacitor 提供了 [官方替代方案](/plugins/official.md)。使用变量和钩子的 Cordova 插件可能部分兼容。有些 Cordova 插件则完全不兼容（请参阅 [此列表](/plugins/cordova.md#已知不兼容插件)）。

如果你发现现有 Cordova 插件存在问题，请通过提供问题详情和插件信息 [告知我们](https://github.com/ionic-team/capacitor/issues/new)。

### 变量与钩子

由于我们的理念是让你控制原生项目源代码（这意味着钩子之类的东西是不必要的），因此 Capacitor 不支持 Cordova 的安装变量、自动配置或钩子。如果你的插件需要设置变量或配置，你需要通过将插件的 `plugin.xml` 与 iOS 和 Android 上的所需设置进行映射，来手动应用这些配置设置。

请查阅 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南，了解如何配置每个平台。

### 已知不兼容插件

如果已知某个插件存在冲突或导致构建问题，在运行 `npx cap sync` 时将会跳过该插件。

以下是已知不兼容插件的列表：

- [`cordova-plugin-add-swift-support`](https://github.com/akofman/cordova-plugin-add-swift-support)（不需要，Capacitor 内置 Swift 支持）
- [`cordova-plugin-admobpro`](https://github.com/floatinghotpot/cordova-admob-pro)（[详见](https://github.com/ionic-team/capacitor/issues/1101)）
- [`cordova-plugin-braintree`](https://github.com/Taracque/cordova-plugin-braintree)（[详见](https://github.com/ionic-team/capacitor/issues/1415)）
- [`cordova-plugin-code-push`](https://github.com/microsoft/code-push)（[详见](https://github.com/microsoft/code-push/issues/615)）
- [`cordova-plugin-compat`](https://github.com/apache/cordova-plugin-compat)（不需要）
- [`cordova-plugin-console`](https://github.com/apache/cordova-plugin-console)（不需要，Capacitor 有自己的实现）
- [`cordova-plugin-crosswalk-webview`](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview)（Capacitor 不允许更改 WebView）
- [`cordova-plugin-fcm`](https://github.com/fechanique/cordova-plugin-fcm)（[详见](https://github.com/ionic-team/capacitor/issues/584)）
- [`cordova-plugin-firebase`](https://github.com/arnesson/cordova-plugin-firebase)（[详见](https://github.com/ionic-team/capacitor/issues/815)）
- [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard)（不需要，Capacitor 有自己的实现）
- [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)（不需要，Capacitor 使用 WKWebView）
- [`cordova-plugin-music-controls`](https://github.com/homerours/cordova-music-controls-plugin)（导致构建失败，已跳过）
- [`cordova-plugin-qrscanner`](https://github.com/bitpay/cordova-plugin-qrscanner)（[详见](https://github.com/ionic-team/capacitor/issues/1213)）
- [`cordova-plugin-splashscreen`](https://github.com/apache/cordova-plugin-splashscreen)（不需要，Capacitor 有自己的实现）
- [`cordova-plugin-statusbar`](https://github.com/apache/cordova-plugin-statusbar)（不需要，Capacitor 有自己的实现）
- [`cordova-plugin-wkwebview-engine`](https://github.com/apache/cordova-plugin-wkwebview-engine)（不需要，Capacitor 使用 WKWebView）
- [`cordova-plugin-googlemaps`](https://github.com/mapsplugin/cordova-plugin-googlemaps)（在 iOS 上导致构建失败，仅在 iOS 上跳过）