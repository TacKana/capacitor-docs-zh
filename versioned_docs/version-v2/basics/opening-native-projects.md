---
title: 打开原生项目
description: 通过原生 IDE 打开项目
contributors:
  - dotNetkow
  - mlynch
---

# 打开原生项目

Capacitor 使用各平台的原生 IDE 来提供必要的配置，并用于构建、测试和部署应用程序。

对于 iOS 开发，这意味着您必须安装 [Xcode 11](https://developer.apple.com/xcode/) 或更高版本。对于 Android，则需要 [Android Studio](https://developer.android.com/studio/index.html) 3 或更高版本。

这两个 IDE 都可以手动打开，也可以使用 `npx cap open` 命令：

## 打开 Xcode

```bash
npx cap open ios
```

或者，您也可以手动打开 Xcode：

```bash
open ios/App/App.xcworkspace
```

## 打开 Android Studio

```bash
npx cap open android
```

另外，您也可以打开 Android Studio 并导入 `android/` 目录作为 Android Studio 项目。