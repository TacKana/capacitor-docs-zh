---
title: 开发工作流
description: Capacitor 工作流
contributors:
  - dotNetkow
  - mlynch
slug: /basics/workflow
---

# Capacitor 工作流

使用 Capacitor 工作需要在您的工作流中增加几个关键步骤。

## 开发并构建您的 Web 应用

Capacitor 将您的 Web 应用转换为每个平台的原生二进制文件。因此，您的大部分工作将包括开发和构建一个以移动端为主的 Web 应用。

您将使用 Capacitor 的插件（例如 [Camera](/apis/camera.md)）或使用现有 Cordova 插件通过 Capacitor 的 [Cordova 兼容性](/main/cordova/index.md) 与底层原生平台进行交互。

要将 Web 应用部署到原生设备，您首先需要将 Web 资源构建到输出目录中。请查阅您的 JavaScript 框架文档以获取确切的命令。对于大多数框架来说，命令是 `npm run build`。

## 同步您的项目

在以下情况下，您可能希望将 Web 应用与原生项目同步：

- 当您想要将 Web 资源复制到原生项目中时。
- 在使用原生 IDE 运行项目之前。
- 在安装新的 Capacitor 插件之后。
- 在克隆项目之后。
- 当您想要为 Capacitor 设置或重新配置原生项目时。
- 当您想要安装原生依赖项时（例如使用 Gradle 或 CocoaPods）。

要同步项目，请运行：

```bash
npx cap sync
```

> 如果遇到无法找到 Web 资源目录的错误，您可能需要在 [Capacitor 配置](/main/reference/config.md) 中配置 `webDir`。

[了解更多关于 `sync` 的信息 &#8250;](/cli/commands/sync.md)

## 运行您的项目

有几种方法可以将项目部署到原生设备上，具体取决于您的用例。最常见的方式是使用命令行运行 `npx cap run`。

[了解更多关于在 iOS 上运行应用的信息 &#8250;](/main/ios/index.md#运行您的应用)

[了解更多关于在 Android 上运行应用的信息 &#8250;](/main/android/index.md#运行您的应用)

## 构建您的项目

在构建 Web 资源（例如使用 `npm run build`）并使用 `npx cap sync` 将其复制到原生项目后，您就可以构建原生二进制文件了。

Capacitor 没有 "build" 命令。在 `sync` 之后，建议您打开目标平台的 IDE 来构建原生应用。

对于在命令行或 CI 环境中构建应用，建议您使用目标平台的工具：Android 使用 Gradle，iOS 使用 `xcodebuild`。第三方工具如 [Fastlane](https://fastlane.tools) 可能会使这个过程更加简单。使用 [Appflow](https://useappflow.com) 还可以实现云构建等功能。

要了解 Capacitor 的发布流程，请阅读 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 的发布指南。

## 打开原生 IDE

在以下情况下，您可能希望在原生 IDE（例如 Xcode 和 Android Studio）中打开项目：

- 当您想使用 IDE 在原生设备上运行项目时。
- 当您想调试原生 Java/Kotlin 或 Swift/Objective-C 代码时。
- 当您想在应用的原生侧工作时。
- 当您想为应用商店编译发布版本时。

[了解更多关于在 Xcode 中打开应用的信息 &#8250;](/main/ios/index.md#打开-ios-项目)

[了解更多关于在 Android Studio 中打开应用的信息 &#8250;](/main/android/index.md#打开-android-项目)

## 更新 Capacitor

要更新 Capacitor Core 和 CLI：

```bash
npm install @capacitor/cli
npm install @capacitor/core
```

要更新您正在使用的一个或多个平台：

```bash
npm install @capacitor/ios
npm install @capacitor/android
```

> 您可以订阅 [Capacitor 仓库](https://github.com/ionic-team/capacitor) 以接收新版本通知。在仓库首页顶部，点击 **Watch** -> **Releases only**。

## 钩子

需要介入 Capacitor CLI 命令事件吗？请查看这里的 [钩子文档](/cli/hooks.md)。
