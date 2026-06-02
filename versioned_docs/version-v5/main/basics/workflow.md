---
title: 开发工作流
description: Capacitor 工作流
slug: /basics/workflow
---

# Capacitor 工作流

使用 Capacitor 与传统 Web 应用略有不同。要制作您的 Web 原生 Capacitor 应用程序，您需要执行以下步骤。

## 构建您的 Web 代码

当您准备好在移动设备上测试您的 Web 应用时，您需要构建您的 Web 应用以进行分发。如果您使用的是 [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/) 等工具，命令将是 `npm run build`；而 [Angular](https://angular.io/) 等工具使用 `ng build` 命令。无论您的命令是什么，您都需要构建您的 Web 代码以进行分发，以便在 Capacitor 中使用它。

## 同步您的 Web 代码到 Capacitor 项目

一旦您的 Web 代码构建完成以进行分发，您需要将您的 Web 代码推送到 Web 原生 Capacitor 应用程序。为此，您可以使用 [Capacitor CLI](/cli/index.md) 来"同步"您的 Web 代码并安装/更新所需的原生依赖项。

要同步您的项目，请运行：

```bash
npx cap sync
```

运行 `npx cap sync` 会将您已构建的 Web 包**复制**到您的 Android 和 iOS 项目中，同时**更新** Capacitor 使用的原生依赖项。

您可以阅读我们的文档，了解关于 `sync` 的更多信息，请参阅 [Capacitor CLI 参考](/cli/index.md) 文档。

:::info
您是否遇到了"找不到 Web 资源目录"的错误？请更新您的 [Capacitor 配置](/main/reference/config.md) 文件以使用正确的 `webDir`。
:::


## 测试您的 Capacitor 应用

将您的 Web 包同步到原生项目后，就可以在移动设备上测试您的应用程序了。有几种不同的方法可以做到这一点，但最简单的方法是使用内置的 Capacitor CLI 命令。

要在 iOS 设备上运行您的 Capacitor 应用的调试版本，您可以运行：
```bash
npx cap run ios
```

同样，要在 Android 设备上运行调试版本，您可以运行：
```bash
npx cap run android
```


在对您的应用程序进行迭代和测试之后，就可以编译最终的二进制文件以分发给其他移动设备了。

:::info
您也可以通过 [Xcode 在 iOS 上运行您的应用](/main/ios/index.md#在-xcode-中运行) 或通过 [Android Studio 在 Android 上运行您的应用](/main/android/index.md#使用-android-studio-运行)。这两种方式都适用于开发。请尝试两种方式，看看您更喜欢哪一种！
:::

### 打开您的原生 IDE

如果您想对原生项目有更多的控制，可以使用 Capacitor CLI 快速打开原生 IDE。

要 [在 Xcode 中打开 iOS Capacitor `.xcworkspace` 项目](/main/ios/index.md#打开-ios-项目)，您可以运行：
```bash
npx cap open ios
```

同样，要 [在 Android Studio 中打开 Android Capacitor 项目](/main/android/index.md#打开-android-项目)，您可以运行：
```bash
npx cap open android
```

打开原生项目可以让您完全控制应用程序的原生运行时。您可以 [创建插件](/plugins.mdx)、[添加自定义原生代码](/main/ios/custom-code.md) 或 [编译您的应用程序](#编译您的原生二进制文件) 以进行发布。

## 编译您的原生二进制文件

Capacitor 没有 `build` 或 `compile` 命令，将来也不会有。在 `sync` 之后，建议您打开目标平台的 IDE：用于 iOS 的 Xcode 或用于 Android 的 Android Studio，来编译您的原生应用。

要在终端或 CI 环境中编译您的应用，您可以直接使用 `gradle` 或 `xcodebuild`。我们还建议使用 [Fastlane](https://fastlane.tools) 等工具或 [Appflow](https://ionic.io/appflow) 等云构建工具来自动化这些流程。虽然每个应用程序都不同，但我们提供了一个 Capacitor 项目通用发布流程的示例。请阅读我们关于 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 的发布指南，了解更多关于如何部署到 Apple App Store 或 Google Play Store 的信息。

## 更新 Capacitor

更新您的 Capacitor 运行时就像运行 `npm install` 一样简单。

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

在更新 Capacitor 时，您需要确保您的 Core、Android 和 iOS 库版本一致。Capacitor Core、Android 和 iOS 版本是同时发布的，这意味着如果您同时安装所有库，就不会有问题！

:::info
您可以订阅 [Capacitor 仓库](https://github.com/ionic-team/capacitor) 以获取新版本通知。在仓库首页顶部，点击 **Watch** -> **Releases only**。
:::

