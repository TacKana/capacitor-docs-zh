---
title: 使用 Cordova 插件与 Ionic Native
description: 使用 Cordova 插件与 Ionic Native
contributors:
  - dotNetkow
---

# 使用 Cordova 插件与 Ionic Native

在使用 Capacitor 开发应用程序时，可以同时使用 Cordova 和 Ionic Native 插件。

## 安装 Cordova 插件

只需安装你选择的插件，同步你的项目，完成任何必要的原生项目配置，即可开始使用：

```bash
npm install cordova-plugin-name
npx cap sync
```

## 更新 Cordova 插件

步骤与安装类似。只需将 Cordova 插件更新到最新版本，Capacitor 就会获取这些更改：

```bash
npm install cordova-plugin-name@2
npx cap update
```

如果你不希望引入破坏性更改的风险，可以使用 `npm update cordova-plugin-name` 而不是指定 `@2` 版本，因为 `update` 命令遵循语义化版本规范。

## 安装 Ionic Native 插件

[Ionic Native](https://ionicframework.com/docs/native) 为 Cordova 插件提供了 TypeScript 包装器、一致的 API 和命名约定，以便于开发。它在 Capacitor 中得到支持，因此每当你发现想要使用的 Ionic Native 包装器时，只需安装 JavaScript 代码、安装相应的 Cordova 插件，然后同步你的项目：

```bash
npm install @ionic-native/javascript-package-name
npm install cordova-plugin-name
npx cap sync
```

## 更新 Ionic Native 插件

步骤与安装类似。更新 Ionic Native JavaScript 库，移除并重新添加 Cordova 插件，然后更新你的项目：

```bash
npm install @ionic-native/javascript-package-name@2
npm install cordova-plugin-name@2
npx cap update
```

## 确定已安装插件的版本

使用以下命令查看项目中安装的 Capacitor 和 Cordova 插件列表（及其确切的版本号）：

```bash
npx cap ls
```

## 重要提示：配置

由于我们坚持让你控制原生项目源代码的理念（这意味着像钩子这样的东西是不必要的），Capacitor 不支持 Cordova 的安装变量、自动配置或钩子。如果你的插件需要设置变量或配置，你需要通过将插件的 `plugin.xml` 与 iOS 和 Android 上所需的设置进行映射，手动应用这些配置设置。

请查阅 [iOS](/ios/configuration.md) 和 [Android](/android/configuration.md) 配置指南，了解如何配置每个平台。

## 兼容性问题

某些 Cordova 插件无法与 Capacitor 兼容，或者 Capacitor 提供了冲突的替代方案。[请点击此处](/cordova/known-incompatible-plugins.md) 查看详情和已知的不兼容插件列表。