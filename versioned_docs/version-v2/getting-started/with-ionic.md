---
title: 在 Ionic 中使用 Capacitor
description: 在 Ionic 中使用 Capacitor
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/getting-started/with-ionic
---

# 在 Ionic 中使用 Capacitor

## 在 Ionic 项目中安装 Capacitor

Capacitor 可以直接轻松安装到任何 Ionic 项目（1.0-4.x+ 版本）中。

### 新建 Ionic 项目

```bash
ionic start myApp tabs --capacitor
cd myApp
```

### 现有 Ionic 项目

```bash
cd myApp
ionic integrations enable capacitor
```

### 使用应用信息初始化 Capacitor

_注意：`npx` 是 npm 5 或更高版本中提供的一个新工具，用于执行本地二进制文件/脚本，以避免全局安装。_

```bash
npx cap init [appName] [appId]
```

其中 `appName` 是您的应用名称，`appId` 是您的应用的域名标识符（例如：`com.example.app`）。

_注意：在初始配置后，请使用原生 IDE 来更改这些属性。_

### 构建您的 Ionic 应用

在添加任何原生平台之前，您必须至少构建一次 Ionic 项目。

```bash
ionic build
```

这将创建 `www` 文件夹，Capacitor 已[自动配置](/basics/configuring-your-app.md)将其用作 `capacitor.config.json` 中的 `webDir`。

### 添加平台

```bash
npx cap add ios
npx cap add android
```

项目根目录下会创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目产物，应视为 Ionic 应用的一部分（即，将它们纳入版本控制，在各自的 IDE 中编辑等）。

### 打开 IDE 进行构建、运行和部署

```bash
npx cap open ios
npx cap open android
```

原生的 iOS 和 Android 项目将在其标准 IDE 中打开（分别是 Xcode 和 Android Studio）。使用 IDE 来运行和部署您的应用。

## 使用 Capacitor 同步您的应用

每次执行构建（例如 `ionic build`）并更改了您的 Web 目录（默认：`www`）时，您需要将这些更改复制到您的原生项目中：

```bash
npx cap copy
```

## 使用 Cordova 和 Ionic Native 插件

Capacitor 支持 Cordova 和 [Ionic Native](https://ionicframework.com/docs/native/) 插件。有关更多信息，请参阅[使用 Cordova 插件](/cordova/using-cordova-plugins.md)指南。

想立即在 Ionic 应用中使用 Capacitor 吗？[请查看本指南](/guides/ionic-framework-app.md)。