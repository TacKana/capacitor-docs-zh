---
title: 使用 Cordova 插件和 Ionic Native
description: 使用 Cordova 插件和 Ionic Native
contributors:
  - dotNetkow
---

# 使用 Cordova 插件和 Ionic Native

在开发使用 Capacitor 的应用时，可以同时使用 Cordova 和 Ionic Native 插件。

## 安装 Cordova 插件

只需安装您选择的插件，同步您的项目，完成任何必要的原生项目配置，然后就可以开始了：

```bash
npm install cordova-plugin-name
npx cap sync
```

## 更新 Cordova 插件

与安装步骤类似。只需将 cordova 插件更新到最新版本，然后 Capacitor 就会获取更改：

```bash
npm install cordova-plugin-name@2
npx cap update
```

如果您不想冒引入重大更改的风险，请使用 `npm update cordova-plugin-name` 而不是 `@2`，因为 `update` 遵循 semver。

## 安装 Ionic Native 插件

[Ionic Native](https://ionicframework.com/docs/native) 提供 TypeScript 包装器以及一致的 API 和命名约定，以便更轻松地使用 Cordova 插件进行开发。Capacitor 支持它，因此每当您找到想要使用的 Ionic Native 包装器时，安装 JavaScript 代码，安装相应的 Cordova 插件，然后同步您的项目：

```bash
npm install @ionic-native/javascript-package-name
npm install cordova-plugin-name
npx cap sync
```

## 更新 Ionic Native 插件

与安装步骤类似。更新 Ionic Native JavaScript 库，移除然后重新添加 Cordova 插件，然后更新您的项目：

```bash
npm install @ionic-native/javascript-package-name@2
npm install cordova-plugin-name@2
npx cap update
```

## 确定已安装的插件版本

使用以下命令查看您项目中安装的 Capacitor 和 Cordova 插件（及其确切版本号）列表：

```bash
npx cap ls
```

## 重要：配置

Capacitor 不支持 Cordova 安装变量、自动配置或 hooks，因为我们秉持让您控制原生项目源代码的理念（意味着 hooks 之类的东西是不必要的）。如果您的插件需要设置变量或设置，您需要通过映射插件的 `plugin.xml` 与 iOS 和 Android 上的必需设置来手动应用这些配置设置。

请查阅 [iOS](/ios/configuration.md) 和 [Android](/android/configuration.md) 配置指南，了解如何配置每个平台。

## 兼容性问题

某些 Cordova 插件无法与 Capacitor 一起使用，或者 Capacitor 提供了冲突的替代方案。详细信息和不兼容列表 [请参见此处](/cordova/known-incompatible-plugins.md)。