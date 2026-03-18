---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件
contributors:
  - eric-horodyski
sidebar_label: 入门指南
slug: /plugins/tutorial/introduction
---

# 构建 Capacitor 插件

Capacitor 提供了一套全面的插件 API，用于为 Capacitor 应用添加原生功能。

Capacitor 插件有两种类型：**本地插件**是特定于某个 Capacitor 应用的自定义原生代码，存在于作为源代码管理一部分提交的原生项目中。**全局插件**则是已发布的 npm 包，开发者可以将其添加到任何 Capacitor 应用中。

在本教程中，我们将从一个空白的 Capacitor 应用开始，为其添加原生代码来构建一个本地插件。然后，我们会将其打包成一个随时可以发布的全局插件。

## 那么，我们要构建什么？

假设你在一家物流公司工作，你编写的应用程序能让司机获取客户的签名，以确认他们已收到货物。法务团队注意到，由于司机让客户在纵向模式下签名，导致签名质量不佳。他们要求你在获取签名时强制应用切换到横向模式。

我们构建的插件将实现**屏幕方向**功能来满足这一需求：

- 检测设备的当前**方向**，为纵向和横向模式提供不同的用户界面。
- 为用户提供选项，可以旋转并**锁定**屏幕方向为横向模式。
- 确认签名后，应用将**解锁**屏幕方向旋转。

在本教程中，我们将模拟一个签名板，但只构建屏幕方向功能。

这个 `ScreenOrientation` 插件将能够在 Web、iOS 和 Android 平台上运行。

## 开始之前

克隆<a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial" target="_blank">此仓库</a>并检出 `start` 分支。在项目的根目录中运行 `npm install`。

> 本教程使用 `@ionic/react` 来构建用户界面。如果你不熟悉 React 或 Ionic Framework，也没关系！所涵盖的概念适用于使用任何支持 TypeScript 的 Web 框架的 Capacitor 应用。

将 iOS 和 Android 平台添加到 Capacitor 应用中：

```bash
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

现在我们已经有了一个添加了原生平台的 Capacitor 应用，可以开始构建插件的第一步了：设计 API。