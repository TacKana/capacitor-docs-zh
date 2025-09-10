---
title: Development Workflow
description: Capacitor 工作流程
contributors:
  - dotNetkow
  - mlynch
slug: /basics/workflow
---

# Capacitor 工作流程

使用 Capacitor 开发需要遵循以下几个关键工作流程。

## 开发并构建 Web 应用

Capacitor 会将您的 Web 应用转换为各平台的原生二进制文件。因此，您的主要工作集中在开发和构建面向移动端的 Web 应用。

您可以通过 Capacitor 插件（如[相机插件](/apis/camera.md)）或使用 Capacitor 的[Cordova 兼容层](/main/cordova/index.md)集成现有 Cordova 插件，与底层原生平台进行交互。

要将 Web 应用部署到原生设备，您需要先将 Web 资源构建到输出目录中。具体构建命令请参考您使用的 JavaScript 框架文档，大多数框架使用的是 `npm run build`。

## 同步项目

在以下情况下您可能需要同步 Web 应用与原生项目：
- 需要将 Web 资源复制到原生项目中时
- 准备使用原生 IDE 运行项目前
- 安装新 Capacitor 插件后
- 克隆项目后
- 需要为 Capacitor 配置或重新配置原生项目时
- 需要安装原生依赖（如通过 Gradle 或 CocoaPods）时

运行以下命令同步项目：

```bash
npx cap sync
```

> 如果出现找不到 Web 资源目录的错误，您可能需要配置 [Capacitor 配置文件](/main/reference/config.md)中的 `webDir` 参数。

[了解更多关于 `sync` 命令的信息 &#8250;](/cli/commands/sync.md)

## 运行项目

根据使用场景不同，有几种方式可以在原生设备上部署项目，最常用的是通过命令行运行 `npx cap run`。

[了解如何在 iOS 上运行应用 &#8250;](/main/ios/index.md#running-your-app)

[了解如何在 Android 上运行应用 &#8250;](/main/android/index.md#running-your-app)

## 构建项目

完成 Web 资源构建（如使用 `npm run build`）并通过 `npx cap sync` 同步到原生项目后，即可开始构建原生二进制文件。

Capacitor 本身不提供 "build" 命令。执行 `sync` 后，建议打开目标平台的 IDE 来构建原生应用。

对于命令行或 CI 环境中的构建，推荐使用各平台的原生工具：Android 使用 Gradle，iOS 使用 `xcodebuild`。第三方工具如 [Fastlane](https://fastlane.tools) 可以简化此过程。使用 [Appflow](https://useappflow.com) 还可获得云端构建等功能。

要了解 Capacitor 的发布流程，请阅读 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 的发布指南。

## 打开原生 IDE

在以下情况下您可能需要打开原生 IDE（如 Xcode 和 Android Studio）：
- 需要通过 IDE 在原生设备上运行项目时
- 需要调试原生 Java/Kotlin 或 Swift/Objective-C 代码时
- 需要处理应用原生部分功能时
- 需要为应用商店编译发布版本时

[了解如何在 Xcode 中打开项目 &#8250;](/main/ios/index.md#opening-the-ios-project)

[了解如何在 Android Studio 中打开项目 &#8250;](/main/android/index.md#opening-the-android-project)

## 更新 Capacitor

更新核心库和命令行工具：
```bash
npm install @capacitor/cli
npm install @capacitor/core
```

更新各平台支持库：
```bash
npm install @capacitor/ios
npm install @capacitor/android
```

> 您可以订阅 [Capacitor 代码库](https://github.com/ionic-team/capacitor)获取新版本通知。在仓库首页点击 **Watch** -> **Releases only** 即可。

## 钩子函数

需要接入 capacitor cli 命令事件？查看[钩子函数文档](/cli/hooks.md)。