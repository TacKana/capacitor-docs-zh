---
title: 开发工作流
description: Capacitor 工作流
slug: /basics/workflow
---

# Capacitor 工作流

使用 Capacitor 与使用传统的 Web 应用略有不同。要制作你的 Web 原生 Capacitor 应用，你需要执行以下步骤。

## 构建 Web 代码

当你准备好在移动设备上测试你的 Web 应用时，你需要构建 Web 应用以进行分发。如果你使用的是 [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/) 等工具，命令是 `npm run build`；而像 [Angular](https://angular.io/) 这样的工具则使用命令 `ng build`。无论你的命令是什么，你都需要构建 Web 代码以进行分发，以便与 Capacitor 一起使用。

## 将 Web 代码同步到 Capacitor 项目

一旦你的 Web 代码已构建为可分发的形式，你需要将 Web 代码推送到 Web 原生 Capacitor 应用中。为此，你可以使用 [Capacitor CLI](/cli/index.md) 来"同步"你的 Web 代码并安装/更新所需的原生依赖项。

要同步你的项目，请运行：

```bash
npx cap sync
```

运行 `npx cap sync` 将**复制**你已经构建好的 Web 资源包到你的 Android 和 iOS 项目中，同时**更新** Capacitor 使用的原生依赖项。

你可以阅读关于 `sync` 的[文档](/cli/commands/sync.md)，以及更多 [Capacitor CLI 参考](/cli/index.md) 文档。

:::info
你遇到了"无法找到 Web 资源目录"的错误？请更新你的 [Capacitor 配置文件](/main/reference/config.md)，使用正确的 `webDir`。
:::

## 测试 Capacitor 应用

一旦你将 Web 资源包同步到原生项目中，就可以在移动设备上测试你的应用了。有几种不同的方法可以做到这一点，但最简单的方法是使用内置的 Capacitor CLI 命令。

要在 iOS 设备上运行 Capacitor 应用的调试构建，可以运行：
```bash
npx cap run ios
```

类似地，要在 Android 设备上运行 Capacitor 应用的调试构建，可以运行：
```bash
npx cap run android
```

当你完成迭代和测试应用后，就可以编译最终的二进制文件以分发给其他移动设备了。

:::info
你也可以[通过 Xcode 在 iOS 上运行应用](/main/ios/index.md#在-xcode-中运行) 或[通过 Android Studio 在 Android 上运行应用](/main/android/index.md#使用-android-studio-运行)。这两种方式都适用于开发。可以都尝试一下，看看你更喜欢哪种方式！
:::

### 打开原生 IDE

如果你希望对原生项目有更多控制，可以使用 Capacitor CLI 快速打开原生 IDE。

要[在 Xcode 中打开 iOS Capacitor `.xcworkspace` 项目](/main/ios/index.md#打开-ios-项目)，可以运行：
```bash
npx cap open ios
```

类似地，要[在 Android Studio 中打开 Android Capacitor 项目](/main/android/index.md#打开-android-项目)，可以运行：
```bash
npx cap open android
```

打开原生项目可以让你完全控制应用的原生运行时。你可以[创建插件](/plugins.mdx)、[添加自定义原生代码](/main/ios/custom-code.md)或[编译应用](#编译原生二进制文件)以进行发布。

## 编译原生二进制文件

在 `sync` 之后，建议你打开目标平台的 IDE：用于 iOS 的 Xcode 或用于 Android 的 Android Studio，以编译你的原生应用。

或者，要在终端或 CI 环境中编译应用，你可以使用 [cap build 命令](/cli/commands/build)来构建原生项目，输出已签名的 AAB、APK 或 IPA 文件，准备分发给设备或最终用户。

```bash
npx cap build android
```

我们也建议使用诸如 [Fastlane](https://fastlane.tools) 之类的工具或像 [Appflow](https://useappflow.com) 这样的云构建工具来自动化这些流程。虽然每个应用都不同，但我们提供了一个 Capacitor 项目通用发布流程的示例。请阅读我们的 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 发布指南，了解如何部署到 Apple App Store 或 Google Play Store 的更多信息。

## 更新 Capacitor

更新你的 Capacitor 运行时就像运行 `npm install` 一样简单。

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

在更新 Capacitor 时，你需要确保 Core、Android 和 iOS 库的版本相同。Capacitor Core、Android 和 iOS 的版本是同时发布的，这意味着如果你同时安装所有库，就不会有问题！

:::info
你可以订阅 [Capacitor 仓库](https://github.com/ionic-team/capacitor) 以获取新版本通知。在仓库首页顶部，点击 **Watch** -> **Releases only**。
:::
