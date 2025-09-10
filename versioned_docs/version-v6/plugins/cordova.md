---
title: Cordova 插件
description: 使用 Cordova 插件
sidebar_label: Cordova 插件
slug: /plugins/cordova
---

# Cordova 插件

使用 Capacitor 开发应用时，可以兼容使用 Cordova 插件。

## 安装 Cordova 插件

Capacitor 插件的安装方式与常规包管理器相同，之后会同步到原生项目中。Cordova 插件在 Capacitor 中的安装流程与此一致。

安装插件后执行同步，并完成必要的原生项目配置（参见[变量与钩子](#变量与钩子)）：

```bash
npm install cordova-plugin-name
npx cap sync
```

> 如果 Cordova 插件提供了 [`@awesome-cordova-plugins`](https://ionicframework.com/docs/native) 包装器，可以额外安装以获得 TypeScript 支持：
>
> ```bash
> npm install @awesome-cordova-plugins/plugin-name
> ```

## 更新 Cordova 插件

使用常规包管理器更新插件后，执行同步将更新应用到原生项目：

```bash
npm install cordova-plugin-name@version
npx cap sync
```

## 查看已安装插件版本

通过以下命令查看项目中安装的所有 Capacitor 和 Cordova 插件（含精确版本号）：

```bash
npx cap ls
```

## 兼容性问题

部分 Cordova 插件可能与 Capacitor 存在兼容问题。许多官方 Cordova 插件无需使用，因为 Capacitor 提供了[官方替代方案](/plugins/official.md)。使用变量和钩子的 Cordova 插件可能部分兼容。某些 Cordova 插件完全不可用（参见[已知不兼容插件列表](#已知不兼容插件)）。

如果发现 Cordova 插件存在问题，请通过[提交 Issue](https://github.com/ionic-team/capacitor/issues/new) 提供详细问题描述和插件信息。

### 变量与钩子

基于让开发者完全掌控原生项目源码的设计理念（因此不需要钩子机制），Capacitor 不支持 Cordova 的安装变量、自动配置和钩子功能。若插件需要设置变量或参数，需手动对照插件的 `plugin.xml` 在 iOS 和 Android 平台进行配置。

各平台的配置方法请参考：
- [iOS 配置指南](/main/ios/configuration.md)
- [Android 配置指南](/main/android/configuration.md)

### 已知不兼容插件

执行 `npx cap sync` 时会自动跳过已知存在冲突或导致构建问题的插件。

以下是不兼容插件列表：

- [`cordova-plugin-add-swift-support`](https://github.com/akofman/cordova-plugin-add-swift-support)（非必要，Capacitor 内置 Swift 支持）
- [`cordova-plugin-admobpro`](https://github.com/floatinghotpot/cordova-admob-pro)（[详情](https://github.com/ionic-team/capacitor/issues/1101)）
- [`cordova-plugin-braintree`](https://github.com/Taracque/cordova-plugin-braintree)（[详情](https://github.com/ionic-team/capacitor/issues/1415)）
- [`cordova-plugin-code-push`](https://github.com/microsoft/code-push)（[详情](https://github.com/microsoft/code-push/issues/615)）
- [`cordova-plugin-compat`](https://github.com/apache/cordova-plugin-compat)（非必要）
- [`cordova-plugin-console`](https://github.com/apache/cordova-plugin-console)（非必要，Capacitor 自带控制台）
- [`cordova-plugin-crosswalk-webview`](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview)（Capacitor 不允许替换 WebView）
- [`cordova-plugin-fcm`](https://github.com/fechanique/cordova-plugin-fcm)（[详情](https://github.com/ionic-team/capacitor/issues/584)）
- [`cordova-plugin-firebase`](https://github.com/arnesson/cordova-plugin-firebase)（[详情](https://github.com/ionic-team/capacitor/issues/815)）
- [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard)（非必要，Capacitor 自带键盘插件）
- [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)（非必要，Capacitor 使用 WKWebView）
- [`cordova-plugin-music-controls`](https://github.com/homerours/cordova-music-controls-plugin)（导致构建失败，已跳过）
- [`cordova-plugin-qrscanner`](https://github.com/bitpay/cordova-plugin-qrscanner)（[详情](https://github.com/ionic-team/capacitor/issues/1213)）
- [`cordova-plugin-splashscreen`](https://github.com/apache/cordova-plugin-splashscreen)（非必要，Capacitor 自带启动屏插件）
- [`cordova-plugin-statusbar`](https://github.com/apache/cordova-plugin-statusbar)（非必要，Capacitor 自带状态栏插件）
- [`cordova-plugin-wkwebview-engine`](https://github.com/apache/cordova-plugin-wkwebview-engine)（非必要，Capacitor 使用 WKWebView）
- [`cordova-plugin-googlemaps`](https://github.com/mapsplugin/cordova-plugin-googlemaps)（导致 iOS 构建失败，仅跳过 iOS 平台）