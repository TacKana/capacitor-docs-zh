---
title: Cordova 插件
description: 使用 Cordova 插件
sidebar_label: Cordova 插件
slug: /plugins/cordova
---

# Cordova 插件

在使用 Capacitor 开发应用时，可以兼容使用 Cordova 插件。

## 安装 Cordova 插件

Capacitor 插件的安装方式与 Cordova 插件相同，都是通过包管理器安装后同步到原生项目中。

安装插件后执行同步操作，并完成必要的原生项目配置（参见[变量与钩子](#变量与钩子)）：

```bash
npm install cordova-plugin-name
npx cap sync
```

> 如果 Cordova 插件有 [`@awesome-cordova-plugins`](https://ionicframework.com/docs/native) 封装器，可以同时安装以获得 TypeScript 支持：
>
> ```bash
> npm install @awesome-cordova-plugins/plugin-name
> ```

## 更新 Cordova 插件

使用常规包管理器更新插件，然后将更新后的插件同步到原生项目：

```bash
npm install cordova-plugin-name@version
npx cap sync
```

## 查看已安装插件版本

通过以下命令查看项目中安装的所有 Capacitor 和 Cordova 插件（及其精确版本号）：

```bash
npx cap ls
```

## 兼容性问题

Capacitor 可能会与某些 Cordova 插件存在兼容性问题。许多官方 Cordova 插件不应使用，因为 Capacitor 提供了[官方替代方案](/plugins/official.md)。使用变量和钩子的 Cordova 插件可能部分兼容。有些 Cordova 插件则完全不兼容（参见[已知不兼容插件列表](#已知不兼容插件)）。

如果发现现有 Cordova 插件存在问题，请通过[提交 issue](https://github.com/ionic-team/capacitor/issues/new) 告知我们，并提供问题详情和插件信息。

### 变量与钩子

Capacitor 不支持 Cordova 的安装变量、自动配置或钩子功能，这是基于我们的设计理念——让开发者完全掌控原生项目源代码（因此钩子等功能并非必需）。如果插件需要设置变量或参数，您需要手动应用这些配置，根据插件的 `plugin.xml` 映射到 iOS 和 Android 所需的设置。

请参考 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南了解各平台的配置方法。

### 已知不兼容插件

如果某个插件已知会导致冲突或构建问题，在执行 `npx cap sync` 时会被自动跳过。

以下是已知不兼容的插件列表：

- [`cordova-plugin-add-swift-support`](https://github.com/akofman/cordova-plugin-add-swift-support)（不需要，Capacitor 内置 Swift 支持）
- [`cordova-plugin-admobpro`](https://github.com/floatinghotpot/cordova-admob-pro)（[详情](https://github.com/ionic-team/capacitor/issues/1101)）
- [`cordova-plugin-braintree`](https://github.com/Taracque/cordova-plugin-braintree)（[详情](https://github.com/ionic-team/capacitor/issues/1415)）
- [`cordova-plugin-code-push`](https://github.com/microsoft/code-push)（[详情](https://github.com/microsoft/code-push/issues/615)）
- [`cordova-plugin-compat`](https://github.com/apache/cordova-plugin-compat)（不需要）
- [`cordova-plugin-console`](https://github.com/apache/cordova-plugin-console)（不需要，Capacitor 自带控制台功能）
- [`cordova-plugin-crosswalk-webview`](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview)（Capacitor 不允许更换 WebView）
- [`cordova-plugin-fcm`](https://github.com/fechanique/cordova-plugin-fcm)（[详情](https://github.com/ionic-team/capacitor/issues/584)）
- [`cordova-plugin-firebase`](https://github.com/arnesson/cordova-plugin-firebase)（[详情](https://github.com/ionic-team/capacitor/issues/815)）
- [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard)（不需要，Capacitor 自带键盘插件）
- [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)（不需要，Capacitor 使用 WKWebView）
- [`cordova-plugin-music-controls`](https://github.com/homerours/cordova-music-controls-plugin)（导致构建失败，已跳过）
- [`cordova-plugin-qrscanner`](https://github.com/bitpay/cordova-plugin-qrscanner)（[详情](https://github.com/ionic-team/capacitor/issues/1213)）
- [`cordova-plugin-splashscreen`](https://github.com/apache/cordova-plugin-splashscreen)（不需要，Capacitor 自带启动屏功能）
- [`cordova-plugin-statusbar`](https://github.com/apache/cordova-plugin-statusbar)（不需要，Capacitor 自带状态栏功能）
- [`cordova-plugin-wkwebview-engine`](https://github.com/apache/cordova-plugin-wkwebview-engine)（不需要，Capacitor 使用 WKWebView）
- [`cordova-plugin-googlemaps`](https://github.com/mapsplugin/cordova-plugin-googlemaps)（导致 iOS 构建失败，仅跳过 iOS 平台）