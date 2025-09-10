---
title: 运行你的应用
description: 运行你的应用
contributors:
  - dotNetkow
  - mlynch
---

# 运行你的应用

Capacitor 依赖于各平台的首选 IDE 来运行和测试你的应用。

## iOS

iOS 平台需要使用 Xcode 来运行你的应用。

```bash
npx cap open ios
```

Xcode 启动后，你可以通过标准的 Xcode 工作流程进行构建/模拟/运行操作。

## Android

```bash
npx cap open android
```

Android Studio 启动后，你可以通过标准的 Android Studio 工作流程进行构建/模拟/运行操作。

## 渐进式 Web 应用 (PWA)

Capacitor 提供了一个轻量级的开发用 Web 服务器用于本地测试，但建议使用你选择的前端框架自带的服务器工具来运行 Web 应用。

```bash
npx cap serve
```

这将在浏览器中通过本地 Web 服务器实例打开你的 Web 应用。