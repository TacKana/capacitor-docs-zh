---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件
contributors:
  - eric-horodyski
sidebar_label: 开始入门
slug: /plugins/tutorial/introduction
---

# 构建 Capacitor 插件

Capacitor 提供了一套全面的插件 API，用于向 Capacitor 应用添加原生功能。

有两种类型的 Capacitor 插件：_本地插件_ 是特定于某个 Capacitor 应用的自定义原生代码，位于作为源代码控制一部分提交的原生项目中。_全局插件_ 是已发布的 npm 包，开发者可以将其添加到任何 Capacitor 应用中。

在本教程中，我们将从一个空白的 Capacitor 应用开始，向其添加原生代码以构建一个本地插件。然后，我们将其打包成一个全局插件，准备发布。

## 那么，我们要构建什么呢？

假设您为一家快递公司工作，您编写的应用让司机能够从客户那里获取签名，确认他们已收到快递。法务团队注意到客户签名质量很差，因为司机让客户在竖屏模式下签名。他们要求您在获取签名时将应用强制设置为横屏模式。

我们将构建的插件实现**屏幕方向**功能以满足这一需求：

- 设备的当前**方向**将被检测到，竖屏和横屏模式将有不同的 UI。
- 用户将可以选择旋转并**锁定**屏幕方向为横屏模式。
- 在签名确认后，应用将**解锁**屏幕方向的旋转。

在本教程中，我们将模拟一个签名板，但只构建屏幕方向功能。

这个 `ScreenOrientation` 插件将适用于 Web、iOS 和 Android 平台。

## 开始入门

克隆 <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial" target="_blank">这个仓库</a> 并 checkout `start` 分支。在项目根目录运行 `npm install`。

> 本教程使用 `@ionic/react` 构建用户界面。如果您不熟悉 React 或 Ionic Framework，也没关系！所涉及的概念适用于使用任何支持 TypeScript 的 Web 框架的 Capacitor 应用。

将 iOS 和 Android 平台都添加到 Capacitor 应用：

```bash
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

现在我们已经有了一个添加了原生平台的 Capacitor 应用，准备进入构建插件的第一步：设计 API。
