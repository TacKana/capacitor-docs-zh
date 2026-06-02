---
title: 运行您的应用
description: 运行您的应用
contributors:
  - dotNetkow
  - mlynch
---

# 运行您的应用

Capacitor 依赖每个平台的首选 IDE 来运行和测试您的应用。

## iOS

iOS 需要使用 Xcode 来运行您的应用。

```bash
npx cap open ios
```

Xcode 启动后，您可以通过标准 Xcode 工作流来构建/模拟/运行您的应用。

## Android

```bash
npx cap open android
```

Android Studio 启动后，您可以通过标准 Android Studio 工作流来构建/模拟/运行您的应用。

## Progressive Web App

Capacitor 有一个用于本地测试的小型开发 Web 服务器，但建议使用您所选用框架的服务器工具来运行您的 Web 应用。

```bash
npx cap serve
```

这将在浏览器中启动一个本地 Web 服务器实例来运行您的 Web 应用。