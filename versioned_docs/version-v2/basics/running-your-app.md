---
title: 运行您的应用
description: 运行您的应用
contributors:
  - dotNetkow
  - mlynch
---

# 运行您的应用

Capacitor 依赖各平台首选的 IDE 来运行和测试您的应用。

## iOS

iOS 需要使用 Xcode 来运行您的应用。

```bash
npx cap open ios
```

Xcode 启动后，您可以通过标准的 Xcode 工作流来构建、模拟或运行您的应用。

## Android

```bash
npx cap open android
```

Android Studio 启动后，您可以通过标准的 Android Studio 工作流来构建、模拟或运行您的应用。

## 渐进式 Web 应用（PWA）

Capacitor 提供了一个轻量级的开发 Web 服务器用于本地测试，但推荐使用您所选框架自带的服务器工具来运行您的 Web 应用。

```bash
npx cap serve
```

这将在浏览器中打开一个本地 Web 服务器实例来运行您的 Web 应用。