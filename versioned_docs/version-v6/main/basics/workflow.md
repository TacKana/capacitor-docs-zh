---
title: Development Workflow
description: Capacitor 工作流程
slug: /basics/workflow
---

# Capacitor 工作流程

使用 Capacitor 开发与传统的 Web 应用开发略有不同。要将您的 Web 应用构建为原生应用，您需要遵循以下步骤。

## 构建您的 Web 代码

当您准备在移动设备上测试您的 Web 应用时，您需要为发布而构建您的 Web 应用。如果您使用的是 [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/) 这样的工具，构建命令通常是 `npm run build`；而像 [Angular](https://angular.io/) 这样的工具则使用 `ng build` 命令。无论您的命令是什么，您都需要为发布构建您的 Web 代码，以便与 Capacitor 一起使用。

## 将您的 Web 代码同步到 Capacitor 项目

一旦您的 Web 代码为发布而构建完成，您需要将这些代码推送到 Web 原生 Capacitor 应用中。为此，您可以使用 [Capacitor CLI](/cli/index.md) 来“同步”您的 Web 代码，并安装/更新所需的原生依赖项。

要同步您的项目，请运行：

```bash
npx cap sync
```

运行 `npx cap sync` 将**复制**已构建的 Web 包到您的 Android 和 iOS 项目中，并**更新** Capacitor 使用的原生依赖项。

您可以在 [Capacitor CLI 参考文档](/cli/index.md) 中阅读关于 `sync` 和更多内容的 [文档](/cli/commands/sync.md)。

:::info
是否遇到了“找不到 Web 资产目录”的错误？请更新您的 [Capacitor 配置文件](/main/reference/config.md)，以使用正确的 `webDir`。
:::

## 测试您的 Capacitor 应用

一旦您将 Web 包同步到原生项目中，就该在移动设备上测试您的应用了。有几种不同的方法可以做到这一点，但最简单的方法是使用内置的 Capacitor CLI 命令。

要在 iOS 设备上运行 Capacitor 应用的调试版本，您可以运行：

```bash
npx cap run ios
```

类似地，要在 Android 设备上运行 Capacitor 应用的调试版本，您可以运行：

```bash
npx cap run android
```

在您迭代和测试应用之后，就可以编译最终的可执行文件，以便分发给其他移动设备了。

:::info
您也可以 [通过 Xcode 在 iOS 上运行您的应用](/main/ios/index.md#running-in-xcode) 或 [通过 Android Studio 在 Android 上运行您的应用](/main/android/index.md#running-with-android-studio)。这两种方式都适用于开发。请尝试两种方式，看看您更喜欢哪一种！
:::

### 打开您的原生 IDE

如果您希望对原生项目有更多的控制权，您可以使用 Capacitor CLI 快速打开原生 IDE。

要 [在 Xcode 中打开 iOS Capacitor `.xcworkspace` 项目](/main/ios/index.md#opening-the-ios-project)，您可以运行：

```bash
npx cap open ios
```

类似地，要 [在 Android Studio 中打开 Android Capacitor 项目](/main/android/index.md#opening-the-android-project)，您可以运行：

```bash
npx cap open android
```

打开原生项目可以让您完全控制应用的原生运行时。您可以 [创建插件](/plugins.mdx)、[添加自定义原生代码](/main/ios/custom-code.md) 或为发布 [编译您的应用](#compiling-your-native-binary)。

## 编译您的原生可执行文件

在 `sync` 之后，建议您打开目标平台的 IDE：iOS 使用 Xcode，Android 使用 Android Studio，来编译您的原生应用。

或者，要在终端或 CI 环境中编译您的应用，您可以使用 [cap build 命令](/cli/commands/build) 来构建原生项目，输出已签名的 AAB、APK 或 IPA 文件，准备分发给设备或最终用户。

```bash
npx cap build android
```

我们还建议使用诸如 [Fastlane](https://fastlane.tools) 之类的工具或像 [Appflow](https://useappflow.com) 这样的云构建工具来自动化这些过程。虽然每个应用都不同，但我们有一个针对 Capacitor 项目的一般发布流程示例。请阅读我们的 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 发布指南，了解如何部署到 Apple App Store 或 Google Play Store 的更多信息。

## 更新 Capacitor

更新您的 Capacitor 运行时就像运行 `npm install` 一样简单。

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

更新 Capacitor 时，请确保您的 Core、Android 和 iOS 库都是相同的版本。Capacitor Core、Android 和 iOS 的发布是同时上传的，这意味着如果您同时安装所有库，就不会有问题！

:::info
您可以订阅 [Capacitor 仓库](https://github.com/ionic-team/capacitor) 以接收新版本的通知。在仓库首页顶部，点击 **Watch** -> **Releases only**。
:::