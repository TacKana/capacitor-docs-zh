---
title: 使用 Cordova 插件与 Ionic Native
description: 使用 Cordova 插件与 Ionic Native 的方法
contributors:
  - dotNetkow
---

# 使用 Cordova 插件与 Ionic Native

在使用 Capacitor 开发应用时，您可以同时使用 Cordova 和 Ionic Native 插件。

## 安装 Cordova 插件

只需安装您选择的插件，同步项目，完成必要的原生项目配置即可：

```bash
npm install cordova-plugin-name
npx cap sync
```

## 更新 Cordova 插件

步骤与安装类似。只需将 Cordova 插件更新至最新版本，Capacitor 会自动获取变更：

```bash
npm install cordova-plugin-name@2
npx cap update
```

如果不希望引入破坏性变更，可以使用 `npm update cordova-plugin-name` 代替 `@2`，因为 `update` 会遵循语义化版本规范。

## 安装 Ionic Native 插件

[Ionic Native](https://ionicframework.com/docs/native) 为 Cordova 插件提供了 TypeScript 封装、一致的 API 和命名规范，使开发更加便捷。Capacitor 支持 Ionic Native，当您找到需要的封装时，只需安装 JavaScript 代码和对应的 Cordova 插件，然后同步项目：

```bash
npm install @ionic-native/javascript-package-name
npm install cordova-plugin-name
npx cap sync
```

## 更新 Ionic Native 插件

步骤与安装类似。更新 Ionic Native JavaScript 库，重新安装 Cordova 插件，然后更新项目：

```bash
npm install @ionic-native/javascript-package-name@2
npm install cordova-plugin-name@2
npx cap update
```

## 查看已安装插件版本

通过以下命令查看项目中安装的 Capacitor 和 Cordova 插件（及其精确版本号）：

```bash
npx cap ls
```

## 重要提示：配置说明

由于 Capacitor 坚持让开发者完全掌控原生项目源代码的理念（这意味着像钩子这样的功能变得不必要），因此不支持 Cordova 的安装变量、自动配置或钩子。如果您的插件需要设置变量或参数，您需要手动完成这些配置，通过将插件的 `plugin.xml` 与 iOS 和 Android 所需设置进行映射来实现。

请查阅 [iOS](/ios/configuration.md) 和 [Android](/android/configuration.md) 配置指南了解各平台的配置方法。

## 兼容性问题

部分 Cordova 插件与 Capacitor 不兼容，或与 Capacitor 提供的替代方案存在冲突。[点击此处](/cordova/known-incompatible-plugins.md)查看详细信息和已知不兼容插件列表。