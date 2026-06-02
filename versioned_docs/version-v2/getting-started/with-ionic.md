---
title: 将 Capacitor 与 Ionic 一起使用
description: 将 Capacitor 与 Ionic 一起使用
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/getting-started/with-ionic
---

# 将 Capacitor 与 Ionic 一起使用

## 将 Capacitor 安装到 Ionic 项目中

Capacitor 可以轻松地直接安装到任何 Ionic 项目（1.0-4.x+）中。

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

_注意：`npx` 是 npm 5 或更高版本中提供的一个新实用程序，它执行本地二进制文件/脚本以避免全局安装。_

```bash
npx cap init [appName] [appId]
```

其中 `appName` 是您的应用名称，`appId` 是您应用的域标识符（例如：`com.example.app`）。

_注意：使用原生 IDE 在初始配置后更改这些属性。_

### 构建您的 Ionic 应用

在添加任何原生平台之前，您必须至少构建一次 Ionic 项目。

```bash
ionic build
```

这将创建 `www` 文件夹，Capacitor 已在 `capacitor.config.json` 中 [自动配置](/basics/configuring-your-app.md) 将其用作 `webDir`。

### 添加平台

```bash
npx cap add ios
npx cap add android
```

项目根目录下会创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目制品，应被视为您的 Ionic 应用的一部分（即，将它们检入版本控制，在它们自己的 IDE 中编辑等）。

### 打开 IDE 以构建、运行和部署

```bash
npx cap open ios
npx cap open android
```

原生 iOS 和 Android 项目将在其标准 IDE（分别为 Xcode 和 Android Studio）中打开。使用这些 IDE 来运行和部署您的应用。

## 使用 Capacitor 同步您的应用

每次执行构建（例如 `ionic build`）更改了您的 web 目录（默认：`www`）后，您需要将这些更改复制到您的原生项目中：

```bash
npx cap copy
```

## 使用 Cordova 和 Ionic Native 插件

Capacitor 支持 Cordova 和 [Ionic Native](https://ionicframework.com/docs/native/) 插件。请参阅 [使用 Cordova 插件](/cordova/using-cordova-plugins.md) 指南了解更多信息。

想立即开始在 Ionic 应用中使用 Capacitor？[查看此指南](/guides/ionic-framework-app.md)。