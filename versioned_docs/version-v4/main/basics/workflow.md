---
title: Development Workflow
description: Capacitor 工作流程
slug: /basics/workflow
---

# Capacitor 工作流程

使用 Capacitor 与传统 Web 应用开发略有不同。要将你的 Web 应用转化为原生移动应用，需要遵循以下步骤。

## 构建 Web 代码

当准备在移动设备上测试 Web 应用时，需要先构建用于分发的版本。如果使用 [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/) 等工具，构建命令通常是 `npm run build`；而 [Angular](https://angular.io/) 则使用 `ng build`。无论使用哪个命令，都需要先构建 Web 代码才能与 Capacitor 配合使用。

## 将 Web 代码同步到 Capacitor 项目

构建完成后，需要将 Web 代码推送到原生 Capacitor 应用中。可以使用 [Capacitor CLI](/cli/index.md) 来“同步”Web 代码并安装/更新所需的原生依赖。

运行以下命令同步项目：

```bash
npx cap sync
```

执行 `npx cap sync` 会将已构建的 Web 包**复制**到 Android 和 iOS 项目中，同时**更新** Capacitor 使用的原生依赖。

你可以在 [Capacitor CLI 参考文档](/cli/index.md)中查阅关于 `sync` 及更多命令的[详细说明](/cli/commands/sync.md)。

:::info
如果遇到“找不到 Web 资源目录”的错误，请检查并更新 [Capacitor 配置文件](/main/reference/config.md)中的 `webDir` 设置。
:::

## 测试 Capacitor 应用

将 Web 包同步到原生项目后，就可以在移动设备上测试应用了。测试方式有多种，最简单的是使用 Capacitor CLI 内置命令。

要在 iOS 设备上运行调试版本，可执行：
```bash
npx cap run ios
```

类似地，在 Android 设备上运行调试版本：
```bash
npx cap run android
```

完成应用迭代测试后，即可编译最终二进制文件以便分发到其他移动设备。

:::info
你也可以通过 [Xcode 运行 iOS 应用](/main/ios/index.md#running-in-xcode)或通过 [Android Studio 运行 Android 应用](/main/android/index.md#running-with-android-studio)。两种方式都适用于开发，建议都尝试一下，选择你偏好的工作流程！
:::

### 打开原生集成开发环境

如果需要更精细地控制原生项目，可以使用 Capacitor CLI 快速打开对应的集成开发环境。

要在 [Xcode 中打开 iOS Capacitor `.xcworkspace` 项目](/main/ios/index.md#opening-the-ios-project)，运行：
```bash
npx cap open ios
```

类似地，要在 [Android Studio 中打开 Android Capacitor 项目](/main/android/index.md#opening-the-android-project)，运行：
```bash
npx cap open android
```

打开原生项目可以让你完全掌控应用的原生运行时环境。你可以[创建插件](/plugins.mdx)、[添加自定义原生代码](/main/ios/custom-code.md)，或为发布[编译应用](#编译原生二进制文件)。

## 编译原生二进制文件

Capacitor 没有 `build` 或 `compile` 命令，未来也不会提供。`sync` 完成后，建议打开目标平台的集成开发环境：iOS 使用 Xcode，Android 使用 Android Studio 来编译原生应用。

若需在终端或 CI 环境中编译应用，可直接使用 `gradle` 或 `xcodebuild`。我们也推荐使用 [Fastlane](https://fastlane.tools) 或云端构建工具 [Appflow](https://useappflow.com) 来自动化这些流程。虽然每个应用的需求不同，但我们提供了 Capacitor 项目的一般发布流程示例。请参阅 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 发布指南，了解如何部署到 Apple App Store 或 Google Play Store。

## 更新 Capacitor

更新 Capacitor 运行时就像运行 `npm install` 一样简单。

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

更新时需确保 Core、Android 和 iOS 库的版本保持一致。Capacitor 的所有组件都是同步发布的，因此同时安装所有库即可保证版本统一。

:::info
你可以关注 [Capacitor 代码仓库](https://github.com/ionic-team/capacitor)来获取新版本通知。在仓库首页点击 **Watch** -> **Releases only** 即可订阅版本更新。
:::