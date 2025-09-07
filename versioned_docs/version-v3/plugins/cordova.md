---
title: Cordova Plugins
description: 使用 Cordova 插件与 Ionic Native
sidebar_label: Cordova 插件
slug: /plugins/cordova
---

# Cordova 插件与 Ionic Native

使用 Capacitor 开发应用时，可以同时使用 Cordova 和 Ionic Native 插件。

## 安装 Cordova 插件

Capacitor 插件通过常规包管理器安装后同步到原生项目中。在 Capacitor 中安装 Cordova 插件的流程与此相同：

```bash
npm install cordova-plugin-name
npx cap sync
```

> 如果 Cordova 插件有 [Ionic Native](https://ionicframework.com/docs/v3/native) 封装器，也可安装它以获得 TypeScript 支持：
>
> ```bash
> npm install @ionic-native/plugin-name
> ```

## 更新 Cordova 插件

使用常规包管理器更新插件后，将更新后的插件同步到原生项目：

```bash
npm install cordova-plugin-name@version
npx cap sync
```

## 查看已安装插件版本

通过以下命令查看项目中安装的 Capacitor 和 Cordova 插件列表（含具体版本号）：

```bash
npx cap ls
```

## 兼容性问题

部分 Cordova 插件可能与 Capacitor 存在兼容性问题。许多官方 Cordova 插件不应使用，因为 Capacitor 提供了[官方替代方案](/plugins/official.md)。使用变量和钩子的 Cordova 插件可能部分兼容。有些 Cordova 插件则完全无法兼容（参见[该列表](/plugins/cordova.md#known-incompatible-plugins)）。

如发现现有 Cordova 插件的问题，请[告知我们](https://github.com/ionic-team/capacitor/issues/new)，并提供问题详情和插件信息。

### 变量与钩子

由于 Capacitor 坚持让开发者掌控原生项目源代码的理念（意味着钩子等功能不再必要），我们不支持 Cordova 的安装变量、自动配置或钩子。如果插件需要设置变量或配置，您需要手动应用这些配置，即根据插件的 `plugin.xml` 映射到 iOS 和 Android 所需的设置。

查阅 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南，了解各平台的配置方法。

### 已知不兼容插件

如果插件已知存在冲突或会导致构建问题，执行 `npx cap sync` 时会跳过它们。

以下是已知不兼容的插件列表：

- [`cordova-plugin-add-swift-support`](https://github.com/akofman/cordova-plugin-add-swift-support)（无需使用，Capacitor 内置 Swift 支持）
- [`cordova-plugin-admobpro`](https://github.com/floatinghotpot/cordova-admob-pro)（[详情](https://github.com/ionic-team/capacitor/issues/1101)）
- [`cordova-plugin-braintree`](https://github.com/Taracque/cordova-plugin-braintree)（[详情](https://github.com/ionic-team/capacitor/issues/1415)）
- [`cordova-plugin-code-push`](https://github.com/microsoft/code-push)（[详情](https://github.com/microsoft/code-push/issues/615)）
- [`cordova-plugin-compat`](https://github.com/apache/cordova-plugin-compat)（无需使用）
- [`cordova-plugin-console`](https://github.com/apache/cordova-plugin-console)（无需使用，Capacitor 自带）
- [`cordova-plugin-crosswalk-webview`](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview)（Capacitor 不允许更换 webview）
- [`cordova-plugin-fcm`](https://github.com/fechanique/cordova-plugin-fcm)（[详情](https://github.com/ionic-team/capacitor/issues/584)）
- [`cordova-plugin-firebase`](https://github.com/arnesson/cordova-plugin-firebase)（[详情](https://github.com/ionic-team/capacitor/issues/815)）
- [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard)（无需使用，Capacitor 自带）
- [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)（无需使用，Capacitor 使用 WKWebView）
- [`cordova-plugin-music-controls`](https://github.com/homerours/cordova-music-controls-plugin)（导致构建失败，已跳过）
- [`cordova-plugin-qrscanner`](https://github.com/bitpay/cordova-plugin-qrscanner)（[详情](https://github.com/ionic-team/capacitor/issues/1213)）
- [`cordova-plugin-splashscreen`](https://github.com/apache/cordova-plugin-splashscreen)（无需使用，Capacitor 自带）
- [`cordova-plugin-statusbar`](https://github.com/apache/cordova-plugin-statusbar)（无需使用，Capacitor 自带）
- [`cordova-plugin-wkwebview-engine`](https://github.com/apache/cordova-plugin-wkwebview-engine)（无需使用，Capacitor 使用 WKWebView）
- [`cordova-plugin-googlemaps`](https://github.com/mapsplugin/cordova-plugin-googlemaps)（在 iOS 上导致构建失败，仅跳过 iOS 平台）