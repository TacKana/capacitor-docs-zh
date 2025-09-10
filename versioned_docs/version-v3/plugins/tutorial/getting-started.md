---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件指南
contributors:
  - eric-horodyski
sidebar_label: 入门指南
slug: /plugins/tutorial/introduction
---

# 构建 Capacitor 插件

Capacitor 提供了一套完整的插件 API，用于为 Capacitor 应用添加原生功能。

Capacitor 插件分为两种类型：_本地插件_是专属于特定 Capacitor 应用的自定义原生代码，存在于作为源代码管理一部分的本地项目中；_全局插件_则是可发布的 npm 包，开发者可以将其添加到任何 Capacitor 应用中。

本教程将从空白 Capacitor 应用开始，通过添加原生代码构建本地插件，然后将其打包成可发布的全局插件。

## 我们要构建什么？

假设您在一家快递公司工作，您开发的应用允许司机获取客户签名以确认收货。法务团队注意到由于司机让客户在竖屏模式下签名，导致签名质量不佳。他们要求您在获取签名时强制应用切换到横屏模式。

我们将构建一个实现**屏幕方向**功能的插件来满足这个需求：

- 检测设备当前**方向**，为竖屏和横屏模式提供不同UI
- 允许用户选择旋转并**锁定**屏幕方向至横屏模式
- 签名确认后，应用将**解锁**屏幕方向旋转

本教程将模拟一个签名板界面，但只专注于实现屏幕方向功能。

这个`ScreenOrientation`插件将兼容网页、iOS和Android平台。

## 准备工作

克隆<a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial" target="_blank">此仓库</a>并检出`start`分支。在项目根目录运行`npm install`。

> 本教程使用`@ionic/react`构建用户界面。即使您不熟悉React或Ionic框架也没关系！所涉及的概念同样适用于使用任何支持TypeScript的Web框架的Capacitor应用。

为Capacitor应用添加iOS和Android平台支持：

```bash
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

现在我们已经准备好了一个包含原生平台的Capacitor应用，可以开始插件开发的第一步：设计API。