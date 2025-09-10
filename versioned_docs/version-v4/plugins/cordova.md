---
title: Cordova 插件
description: 使用 Cordova 插件
sidebar_label: Cordova 插件
slug: /plugins/cordova
---

# Cordova 插件

在使用 Capacitor 开发应用时，可以兼容使用 Cordova 插件。

## 安装 Cordova 插件

Capacitor 插件通过常规的包管理器安装后，会自动同步到原生项目中。对于 Cordova 插件，安装流程与 Capacitor 插件相同。

安装插件后执行同步操作，并完成所需的原生项目配置（参见[变量与钩子](/plugins/cordova.md#variables-and-hooks)）：

```bash
npm install cordova-plugin-name
npx cap sync
```

> 如果 Cordova 插件提供了 [`@awesome-cordova-plugins`](https://ionicframework.com/docs/native) 封装包，可以同时安装以获得 TypeScript 支持：
>
> ```bash
> npm install @awesome-cordova-plugins/plugin-name
> ```

## 更新 Cordova 插件

使用常规包管理器更新插件后，执行同步操作将更新应用到原生项目：

```bash
npm install cordova-plugin-name@version
npx cap sync
```

## 查看已安装插件版本

通过以下命令查看项目中安装的所有 Capacitor 和 Cordova 插件（包含具体版本号）：

```bash
npx cap ls
```

## 兼容性问题

部分 Cordova 插件可能与 Capacitor 存在兼容性问题。许多官方 Cordova 插件不应再使用，因为 Capacitor 已提供[官方替代方案](/plugins/official.md)。使用变量和钩子的 Cordova 插件可能部分兼容。某些 Cordova 插件则完全无法兼容（参见[已知不兼容插件列表](/plugins/cordova.md#known-incompatible-plugins)）。

如果发现现有 Cordova 插件存在问题，请通过[提交 issue](https://github.com/ionic-team/capacitor/issues/new) 告知我们，并提供问题详情和插件信息。

### 变量与钩子

由于 Capacitor 坚持让开发者完全控制原生项目源代码的设计理念（这意味着钩子等机制变得不必要），因此不支持 Cordova 的安装变量、自动配置或钩子功能。如果插件需要设置变量或配置，您需要手动应用这些配置，方法是参照插件的 `plugin.xml` 文件在 iOS 和 Android 平台上进行相应设置。

请查阅 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南了解各平台的配置方法。

### 已知不兼容插件

如果某插件已知会导致冲突或构建问题，执行 `npx cap sync` 时会自动跳过该插件。

以下是已知不兼容插件列表：

- [`cordova-plugin-add-swift-support`](https://github.com/akofman/cordova-plugin-add-swift-support) （无需使用，Capacitor 内置 Swift 支持）
- [`cordova-plugin-admobpro`](https://github.com/floatinghotpot/cordova-admob-pro) （[详情](https://github.com/ionic-team/capacitor/issues/1101)）
- [`cordova-plugin-braintree`](https://github.com/Taracque/cordova-plugin-braintree) （[详情](https://github.com/ionic-team/capacitor/issues/1415)）
- [`cordova-plugin-code-push`](https://github.com/microsoft/code-push) （[详情](https://github.com/microsoft/code-push/issues/615)）
- [`cordova-plugin-compat`](https://github.com/apache/cordova-plugin-compat) （无需使用）
- [`cordova-plugin-console`](https://github.com/apache/cordova-plugin-console) （无需使用，Capacitor 已内置）
- [`cordova-plugin-crosswalk-webview`](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview) （Capacitor 不允许更换 WebView）
- [`cordova-plugin-fcm`](https://github.com/fechanique/cordova-plugin-fcm) （[详情](https://github.com/ionic-team/capacitor/issues/584)）
- [`cordova-plugin-firebase`](https://github.com/arnesson/cordova-plugin-firebase) （[详情](https://github.com/ionic-team/capacitor/issues/815)）
- [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard) （无需使用，Capacitor 已内置）
- [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview) （无需使用，Capacitor 使用 WKWebView）
- [`cordova-plugin-music-controls`](https://github.com/homerours/cordova-music-controls-plugin) （导致构建失败，已跳过）
- [`cordova-plugin-qrscanner`](https://github.com/bitpay/cordova-plugin-qrscanner) （[详情](https://github.com/ionic-team/capacitor/issues/1213)）
- [`cordova-plugin-splashscreen`](https://github.com/apache/cordova-plugin-splashscreen) （无需使用，Capacitor 已内置）
- [`cordova-plugin-statusbar`](https://github.com/apache/cordova-plugin-statusbar) （无需使用，Capacitor 已内置）
- [`cordova-plugin-wkwebview-engine`](https://github.com/apache/cordova-plugin-wkwebview-engine) （无需使用，Capacitor 使用 WKWebView）
- [`cordova-plugin-googlemaps`](https://github.com/mapsplugin/cordova-plugin-googlemaps) （导致 iOS 构建失败，仅在 iOS 平台跳过）