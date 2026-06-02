---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件
contributors:
  - eric-horodyski
sidebar_label: 开始入门
slug: /plugins/tutorial/introduction
---

# 构建 Capacitor 插件

Capacitor 提供了全面的插件 API，用于向 Capacitor 应用添加原生功能。

Capacitor 插件有两种类型：**本地插件** 是特定于某个 Capacitor 应用的自定义原生代码，位于作为源代码控制一部分的原生项目中。**全局插件** 是一个已发布的 npm 包，开发者可以将其添加到任何 Capacitor 应用中。

在本教程中，我们将从一个空白的 Capacitor 应用开始，向其添加原生代码来构建一个本地插件。然后，我们将把它打包成一个全局插件，准备发布。

## 那么，我们要构建什么？

假设你为一家快递公司工作，你编写的应用让司机能够获取客户的签名，以确认他们已经收到包裹。法务部门注意到客户签名质量很差，因为司机让客户在竖屏模式下签名。他们要求你在捕获签名时将应用强制切换到横屏模式。

我们将构建的插件将实现**屏幕方向**功能以满足这一需求：

- 将检测设备的当前**方向**，并为竖屏和横屏模式显示不同的用户界面。
- 用户将能够旋转并**锁定**屏幕方向为横屏模式。
- 在签名确认后，应用将**解锁**屏幕方向的旋转。

在本教程中，我们将模拟一个签名板，但只构建屏幕方向功能。

这个 `ScreenOrientation` 插件将在 Web、iOS 和 Android 平台上运行。

## 开始入门

克隆 <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial" target="_blank">此仓库</a> 并检出 `start` 分支。在项目根目录下运行 `npm install`。

> 本教程使用 `@ionic/react` 来构建用户界面。如果你不熟悉 React 或 Ionic Framework，没关系！所涵盖的概念适用于使用任何支持 TypeScript 的 Web 框架的 Capacitor 应用。

为 Capacitor 应用添加 iOS 和 Android 平台：

```bash
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

现在我们有了一个已添加原生平台的 Capacitor 应用，我们可以进入构建插件的第一步：设计 API。
