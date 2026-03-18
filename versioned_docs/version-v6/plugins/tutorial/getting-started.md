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

Capacitor 插件有两种类型：**本地插件**是特定 Capacitor 应用程序中的自定义原生代码，存在于作为源代码管理一部分提交的原生项目中。**全局插件**是已发布的 npm 包，开发者可将其添加到任何 Capacitor 应用程序中。

在本教程中，我们将从一个空白的 Capacitor 应用开始，为其添加原生代码来构建一个本地插件。然后将其打包成全局插件，准备发布。

## 那么，我们要构建什么？

假设你在一家物流公司工作，你编写的应用程序让司机获取客户签名以确认收货。法务团队发现客户签名质量很差，因为司机让客户在竖屏模式下签名。他们要求你在捕获签名时强制应用进入横屏模式。

我们将构建的插件将实现**屏幕方向**功能以满足这一要求：

- 检测设备当前**方向**，为竖屏和横屏模式提供不同的用户界面。
- 用户可以选择旋转并**锁定**屏幕方向为横屏模式。
- 签名确认后，应用将**解锁**屏幕方向旋转。

在本教程中，我们将模拟一个签名板，但只构建屏幕方向功能。

这个 `ScreenOrientation` 插件将在 Web、iOS 和 Android 平台上运行。

## 入门指南

克隆<a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial" target="_blank">此仓库</a>并检出 `start` 分支。在项目根目录运行 `npm install`。

> 本教程使用 `@ionic/react` 构建用户界面。如果你不熟悉 React 或 Ionic Framework，没关系！所涵盖的概念适用于使用任何支持 TypeScript 的 Web 框架的 Capacitor 应用。

将 iOS 和 Android 平台添加到 Capacitor 应用：

```bash
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

现在我们已经有了一个添加了原生平台的 Capacitor 应用，可以继续构建插件的第一个步骤：设计 API。