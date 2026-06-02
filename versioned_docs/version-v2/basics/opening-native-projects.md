---
title: 打开原生项目
description: 通过原生 IDE 打开原生项目
contributors:
  - dotNetkow
  - mlynch
---

# 打开原生项目

Capacitor 使用每个平台的原生 IDE 来提供必要的配置，以及构建、测试和部署应用。

对于 iOS 开发，这意味着您必须安装 [Xcode 11](https://developer.apple.com/xcode/) 或更高版本。对于 Android，需要 [Android Studio](https://developer.android.com/studio/index.html) 3 或更高版本。

这两种 IDE 都可以手动打开，或使用 `npx cap open` 命令打开：

## 打开 Xcode

```bash
npx cap open ios
```

或者，您可以手动打开 Xcode：

```bash
open ios/App/App.xcworkspace
```

## 打开 Android Studio

```bash
npx cap open android
```

或者，您可以打开 Android Studio 并将 `android/` 目录作为 Android Studio 项目导入。