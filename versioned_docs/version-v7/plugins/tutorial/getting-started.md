---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件
contributors:
  - eric-horodyski
sidebar_label: 入门指南
slug: /plugins/tutorial/introduction
---

# 构建 Capacitor 插件

Capacitor 提供了一套全面的插件 API，用于向 Capacitor 应用程序添加原生功能。

Capacitor 插件主要分为两种类型：**本地插件** 是特定于某个 Capacitor 应用程序的自定义原生代码，它位于作为源代码管理一部分提交的原生项目中。**全局插件** 则是一个已发布的 npm 包，开发者可以将其添加到任何 Capacitor 应用程序中。

在本教程中，我们将从一个空白的 Capacitor 应用程序开始，向其添加原生代码来构建一个本地插件。然后，我们会将其打包成一个全局插件，为发布做好准备。

## 那么，我们要构建什么？

假设您为一家快递公司工作，您编写的应用程序能让司机获取客户的签名，以确认他们已收到包裹。法务团队注意到，由于司机让客户在竖屏模式下签名，导致签名质量不佳。他们要求您在捕获签名时强制应用程序进入横屏模式。

我们构建的插件将实现**屏幕方向**功能以满足这一需求：

- 检测设备的当前**方向**，为竖屏和横屏模式提供不同的用户界面。
- 为用户提供选项，以旋转并**锁定**屏幕方向至横屏模式。
- 确认签名后，应用程序将**解锁**屏幕方向旋转。

在本教程中，我们将模拟一个签名板，但只构建屏幕方向功能。

这个 `ScreenOrientation` 插件将在 Web、iOS 和 Android 平台上运行。

## 开始之前

克隆 <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial" target="_blank">此仓库</a> 并检出 `start` 分支。在项目根目录下运行 `npm install`。

> 本教程使用 `@ionic/react` 来构建用户界面。如果您不熟悉 React 或 Ionic 框架，没关系！所涵盖的概念适用于使用任何支持 TypeScript 的 Web 框架的 Capacitor 应用程序。

将 iOS 和 Android 平台添加到 Capacitor 应用程序中：

```bash
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

现在我们已经准备好了一个包含原生平台的 Capacitor 应用程序，接下来可以进入构建插件的第一步：设计 API。