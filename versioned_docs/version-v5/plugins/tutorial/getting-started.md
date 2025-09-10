---
title: 构建Capacitor插件
description: 构建Capacitor插件指南
contributors:
  - eric-horodyski
sidebar_label: 入门指南
slug: /plugins/tutorial/introduction
---

# 构建Capacitor插件

Capacitor提供了一套完整的插件API，用于为Capacitor应用添加原生功能。

Capacitor插件分为两种类型：_本地插件_是专属于特定Capacitor应用的自定义原生代码，存放在作为源码一部分的原生项目中；而_全局插件_则是可发布的npm包，开发者可以将其添加到任何Capacitor应用中。

本教程将从空白Capacitor应用开始，逐步添加原生代码构建本地插件，最后将其打包成可供发布的全局插件。

## 我们要构建什么？

假设你在一家货运公司工作，开发了一款让司机获取客户签收确认的应用。法务团队发现由于司机让客户在竖屏模式下签名，导致签名质量不佳。他们要求你在采集签名时强制应用切换至横屏模式。

我们将构建的插件将实现以下**屏幕方向**功能：

- 检测设备当前**方向**，针对竖屏和横屏模式显示不同UI
- 提供旋转并**锁定**屏幕方向至横屏模式的选项
- 确认签名后，应用将**解除**屏幕方向锁定

本教程会模拟签名面板功能，但仅实际构建屏幕方向控制功能。这个`ScreenOrientation`插件将同时支持Web、iOS和Android平台。

## 准备工作

克隆<a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial" target="_blank">此代码仓库</a>并检出`start`分支。在项目根目录运行`npm install`。

> 本教程使用`@ionic/react`构建用户界面。不熟悉React或Ionic框架也没关系，所涉及的概念同样适用于使用任何支持TypeScript的Web框架的Capacitor应用。

为Capacitor应用添加iOS和Android平台：

```bash
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

现在我们已经准备好了一个包含原生平台的Capacitor应用，可以开始插件开发的第一步：设计API接口。