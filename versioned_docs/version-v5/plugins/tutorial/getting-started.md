---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件
contributors:
  - eric-horodyski
sidebar_label: 入门指南
slug: /plugins/tutorial/introduction
---

# 构建 Capacitor 插件

Capacitor 提供了全面的插件 API，用于向 Capacitor 应用添加原生功能。

Capacitor 插件有两种类型：**本地插件**是特定 Capacitor 应用中的自定义原生代码，作为源代码管理的一部分存在于原生项目中；**全局插件**是已发布的 npm 包，开发者可以将其添加到任何 Capacitor 应用中。

在本教程中，我们将从一个空白的 Capacitor 应用开始，向其添加原生代码来构建本地插件，然后将其打包成全局插件，准备发布。

## 那么，我们要构建什么？

假设你在一家快递公司工作，你编写的应用程序让司机能够获取客户的签名，以确认他们已收到货物。法务团队注意到客户签名质量很差，因为司机让客户在纵向模式下签名。他们要求你在捕获签名时强制应用进入横向模式。

我们将构建的插件将实现**屏幕方向**功能来满足这个需求：

- 检测设备的当前**方向**，为纵向和横向模式提供不同的用户界面。
- 为用户提供将屏幕方向**锁定**为横向模式的选项。
- 确认签名后，应用将**解锁**屏幕方向旋转。

在本教程中，我们将模拟一个签名板，但只构建屏幕方向功能。

这个 `ScreenOrientation` 插件将支持 Web、iOS 和 Android 平台。

## 入门准备

克隆<a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial" target="_blank">此仓库</a>并检出 `start` 分支。在项目根目录下运行 `npm install`。

> 本教程使用 `@ionic/react` 构建用户界面。如果您不熟悉 React 或 Ionic 框架，没关系！所涵盖的概念适用于使用任何支持 TypeScript 的 Web 框架的 Capacitor 应用。

向 Capacitor 应用添加 iOS 和 Android 平台：

```bash
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

现在我们已搭建好包含原生平台的 Capacitor 应用，可以继续构建插件的第一个步骤：设计 API。