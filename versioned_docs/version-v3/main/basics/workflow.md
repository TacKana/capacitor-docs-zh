---
title: 开发工作流程
description: Capacitor 工作流程
contributors:
  - dotNetkow
  - mlynch
slug: /basics/workflow
---

# Capacitor 工作流程

使用 Capacitor 涉及对您工作流程的几个关键补充。

## 开发和构建您的 Web 应用

Capacitor 将您的 Web 应用转换为每个平台的原生二进制文件。因此，您的大部分工作将包括开发并构建一个面向移动端的 Web 应用。

您将通过 Capacitor 的插件（例如 [Camera](/apis/camera.md)），或者通过使用现有的 Cordova 插件配合 Capacitor 的 [Cordova 兼容性](/main/cordova/index.md) 来与底层的原生平台进行交互。

要将您的 Web 应用部署到原生设备，您首先需要将 Web 资源构建到一个输出目录中。请查阅您所使用的 JavaScript 框架的文档以获取确切的命令。对于大多数框架，命令是 `npm run build`。

## 同步您的项目

在以下情况下，您可能希望将 Web 应用与您的原生项目同步：

- 当您想要将 Web 资源复制到原生项目中时。
- 在您使用原生 IDE 运行项目之前。
- 在您安装了新的 Capacitor 插件之后。
- 在您克隆项目之后。
- 当您想要为 Capacitor 设置或重新配置原生项目时。
- 当您想要安装原生依赖项（例如使用 Gradle 或 CocoaPods）时。

要同步您的项目，请运行：

```bash
npx cap sync
```

> 如果收到关于找不到 Web 资源目录的错误，您可能需要在 [Capacitor 配置](/main/reference/config.md) 中配置 `webDir`。

[了解更多关于 `sync` 的信息 &#8250;](/cli/commands/sync.md)

## 运行您的项目

根据您的使用场景，有几种方法可以在原生设备上部署您的项目。最常见的方法是在命令行中使用 `npx cap run`。

[了解更多关于在 iOS 上运行应用的信息 &#8250;](/main/ios/index.md#running-your-app)

[了解更多关于在 Android 上运行应用的信息 &#8250;](/main/android/index.md#running-your-app)

## 构建您的项目

在您构建了 Web 资源（例如使用 `npm run build`）并使用 `npx cap sync` 将它们复制到原生项目中之后，您就可以构建原生二进制文件了。

Capacitor 没有专门的“构建”命令。在 `sync` 之后，建议您打开目标平台的 IDE 来构建您的原生应用。

对于在命令行或 CI 环境中构建应用，建议使用目标平台的工具：Android 使用 Gradle，iOS 使用 `xcodebuild`。第三方工具如 [Fastlane](https://fastlane.tools) 可能会使此过程更容易。使用 [Appflow](https://useappflow.com) 时，还可以获得云端构建等功能。

要了解 Capacitor 的发布流程是怎样的，请阅读 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 的发布指南。

## 打开您的原生 IDE

在以下情况下，您可能希望在原生 IDE（例如 Xcode 和 Android Studio）中打开您的项目：

- 当您想要使用 IDE 在原生设备上运行项目时。
- 当您想要调试原生的 Java/Kotlin 或 Swift/Objective-C 代码时。
- 当您想要处理应用的原生端时。
- 当您想要为应用商店编译发布版本时。

[了解更多关于在 Xcode 中打开应用的信息 &#8250;](/main/ios/index.md#opening-the-ios-project)

[了解更多关于在 Android Studio 中打开应用的信息 &#8250;](/main/android/index.md#opening-the-android-project)

## 更新 Capacitor

要更新 Capacitor Core 和 CLI：

```bash
npm install @capacitor/cli
npm install @capacitor/core
```

要更新您正在使用的任何或所有平台：

```bash
npm install @capacitor/ios
npm install @capacitor/android
```

> 您可以订阅 [Capacitor 代码仓库](https://github.com/ionic-team/capacitor) 以接收新版本通知。在仓库主页的顶部，点击 **Watch** -> **Releases only**。

## 钩子 (Hooks)

需要关联到 capacitor cli 命令事件？请查看 [这里的钩子](/cli/hooks.md)。