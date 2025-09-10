---
title: 在Ionic中使用Capacitor
description: 在Ionic项目中集成Capacitor
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/getting-started/with-ionic
---

# 在Ionic中使用Capacitor

## 在Ionic项目中安装Capacitor

Capacitor可以轻松集成到任何版本的Ionic项目中（1.0-4.x+）。

### 新建Ionic项目

```bash
ionic start myApp tabs --capacitor
cd myApp
```

### 已有Ionic项目

```bash
cd myApp
ionic integrations enable capacitor
```

### 初始化Capacitor应用信息

_注意：`npx`是npm 5及以上版本提供的新工具，用于执行本地二进制文件/脚本，避免全局安装。_

```bash
npx cap init [appName] [appId]
```

其中`appName`是您的应用名称，`appId`是应用的域名标识符（例如：`com.example.app`）。

_注意：初始配置后，请使用原生IDE来修改这些属性。_

### 构建Ionic应用

在添加任何原生平台前，您必须至少构建一次Ionic项目。

```bash
ionic build
```

这会创建`www`文件夹，Capacitor已[自动配置](/basics/configuring-your-app.md)将其作为`capacitor.config.json`中的`webDir`。

### 添加平台

```bash
npx cap add ios
npx cap add android
```

这将在项目根目录创建`android`和`ios`文件夹。这些都是完全独立的原生项目产物，应视为Ionic应用的一部分（即纳入版本控制、在各自IDE中编辑等）。

### 打开IDE进行构建、运行和部署

```bash
npx cap open ios
npx cap open android
```

原生iOS和Android项目将在各自的IDE中打开（分别是Xcode和Android Studio）。使用这些IDE来运行和部署您的应用。

## 使用Capacitor同步应用

每次执行构建命令（如`ionic build`）并更改了web目录（默认：`www`）后，都需要将这些更改同步到原生项目：

```bash
npx cap copy
```

## 使用Cordova和Ionic Native插件

Capacitor支持Cordova和[Ionic Native](https://ionicframework.com/docs/native/)插件。更多信息请参阅[使用Cordova插件](/cordova/using-cordova-plugins.md)指南。

想立即在Ionic应用中使用Capacitor？[查看本指南](/guides/ionic-framework-app.md)