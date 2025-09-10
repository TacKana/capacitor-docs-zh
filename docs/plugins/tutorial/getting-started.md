---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件指南
contributors:
  - eric-horodyski
sidebar_label: 入门指南
slug: /plugins/tutorial/introduction
---

# 构建 Capacitor 插件

Capacitor 提供了全面的插件 API，用于为 Capacitor 应用添加原生功能。

Capacitor 插件分为两种类型：_本地插件_是仅限于特定 Capacitor 应用的自定义原生代码，存在于作为源代码控制一部分提交的原生项目中；_全局插件_则是可发布的 npm 包，开发者可以将其添加到任何 Capacitor 应用中。

本教程我们将从一个空白 Capacitor 应用开始，通过添加原生代码构建本地插件，然后将其打包成可发布的全局插件。

## 我们要构建什么？

假设您在一家物流公司工作，您开发的应用程序让司机能够获取客户签名以确认收货。法务团队发现由于司机让客户在竖屏模式下签名，导致签名质量不佳。他们要求您在获取签名时强制应用切换至横屏模式。

我们将构建的插件将实现以下**屏幕方向**功能：

- 检测设备当前**朝向**，为竖屏和横屏模式提供不同界面
- 允许用户选择旋转并**锁定**屏幕为横屏模式
- 签名确认后，应用将**解除**屏幕方向锁定

本教程中，我们会模拟签名板功能，但主要聚焦于屏幕方向控制的实现。

这个`ScreenOrientation`插件将兼容网页、iOS 和 Android 平台。

## 准备工作

克隆<a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial" target="_blank">此代码库</a>并检出`start`分支。在项目根目录运行`npm install`。

> 本教程使用`@ionic/react`构建用户界面。即使您不熟悉 React 或 Ionic 框架也没关系！所涉及的概念适用于使用任何支持 TypeScript 的 Web 框架的 Capacitor 应用。

为 Capacitor 应用添加 iOS 和 Android 平台：

```bash
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

现在我们已准备好带有原生平台的 Capacitor 应用，可以开始构建插件的第一步：设计 API 接口。