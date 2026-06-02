---
title: 开发工作流
description: Capacitor 工作流
slug: /basics/workflow
---

# Capacitor 工作流

使用 Capacitor 与使用传统 Web 应用略有不同。要制作您的 Web 原生 Capacitor 应用，您需要执行以下步骤。

## 构建您的 Web 代码

当您准备好在移动设备上测试 Web 应用时，您需要构建 Web 应用以进行分发。如果您使用像 [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/) 这样的工具，命令将是 `npm run build`；而像 [Angular](https://angular.io/) 这样的工具则使用 `ng build` 命令。无论您的命令是什么，您都需要构建 Web 代码以进行分发，才能与 Capacitor 一起使用。

## 将 Web 代码同步到 Capacitor 项目

当您的 Web 代码已构建为可分发的版本后，您需要将 Web 代码推送到 Web 原生 Capacitor 应用中。为此，您可以使用 [Capacitor CLI](/cli/index.md) 来"同步"您的 Web 代码并安装/更新所需的原生依赖。

要同步您的项目，请运行：

```bash
npx cap sync
```

运行 `npx cap sync` 将**复制**已构建的 Web 包到您的 Android 和 iOS 项目，并**更新**Capacitor 使用的原生依赖。

您可以阅读关于 `sync` 的[文档](/cli/commands/sync.md)以及更多 [Capacitor CLI 参考](/cli/index.md)文档。

:::info
您是否遇到了"找不到 Web 资源目录"的错误？请更新您的 [Capacitor 配置](/main/reference/config.md) 文件以使用正确的 `webDir`。
:::

## 测试您的 Capacitor 应用

将 Web 包同步到原生项目后，就可以在移动设备上测试应用了。有几种不同的方法可以做到这一点，但最简单的方法是使用内置的 Capacitor CLI 命令。

要在 iOS 设备上运行 Capacitor 应用的调试构建，您可以运行：
```bash
npx cap run ios
```

同样，要在 Android 设备上运行 Capacitor 应用的调试构建，您可以运行：
```bash
npx cap run android
```

当您完成迭代和测试后，就可以编译最终的二进制文件以分发给其他移动设备了。

:::info
您也可以[通过 Xcode 在 iOS 上运行应用](/main/ios/index.md#running-in-xcode) 或[通过 Android Studio 在 Android 上运行应用](/main/android/index.md#running-with-android-studio)。两种方式都适用于开发。您可以尝试两种方式，看看哪种更适合您！
:::

### 打开您的原生 IDE

如果您希望对原生项目有更多控制，可以使用 Capacitor CLI 快速打开原生 IDE。

要[在 Xcode 中打开 iOS Capacitor `.xcworkspace` 项目](/main/ios/index.md#opening-the-ios-project)，您可以运行：
```bash
npx cap open ios
```

同样，要[在 Android Studio 中打开 Android Capacitor 项目](/main/android/index.md#opening-the-android-project)，您可以运行：
```bash
npx cap open android
```

打开原生项目可以让您完全控制应用的原生运行时。您可以[创建插件](/plugins.mdx)、[添加自定义原生代码](/main/ios/custom-code.md)或[编译应用](#compiling-your-native-binary)以供发布。

## 编译原生二进制文件

在 `sync` 之后，建议您打开目标平台的 IDE：用于 iOS 的 Xcode 或用于 Android 的 Android Studio，以编译您的原生应用。

或者，要在终端或 CI 环境中编译应用，您可以使用 [cap build 命令](/cli/commands/build) 来构建原生项目，输出签名的 AAB、APK 或 IPA 文件，准备分发给设备或最终用户。

```bash
npx cap build android
```

我们还建议使用 [Fastlane](https://fastlane.tools) 或 [Appflow](https://useappflow.com) 等云构建工具来自动化这些流程。虽然每个应用都不同，但我们为 Capacitor 项目提供了一个通用的发布流程示例。请阅读我们的 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 发布指南，了解更多关于如何部署到 Apple App Store 或 Google Play Store 的信息。

## 更新 Capacitor

更新 Capacitor 运行时就像运行 `npm install` 一样简单。

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

更新 Capacitor 时，您需要确保 Core、Android 和 iOS 库的版本相同。Capacitor Core、Android 和 iOS 的版本是同时发布的，这意味着如果您同时安装所有库，就不会有问题！

:::info
您可以订阅 [Capacitor 仓库](https://github.com/ionic-team/capacitor) 以接收新版本通知。在仓库索引顶部，点击 **Watch** -> **Releases only**。
:::
