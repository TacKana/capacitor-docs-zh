---
title: Development Workflow
description: Capacitor 工作流程
slug: /basics/workflow
---

# Capacitor 工作流程

使用 Capacitor 开发应用与传统网页应用略有不同。要将您的网页应用构建为原生移动应用，您需要遵循以下步骤。

## 构建网页代码

当您准备在移动设备上测试网页应用时，需要先构建用于分发的网页应用版本。如果您使用的是 [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/) 等工具，构建命令通常是 `npm run build`；而像 [Angular](https://angular.io/) 这样的工具则使用 `ng build` 命令。无论具体命令是什么，您都需要构建网页代码的分发版本，以便与 Capacitor 配合使用。

## 将网页代码同步到 Capacitor 项目

构建完网页代码的分发版本后，您需要将其推送到 Capacitor 原生应用中。为此，您可以使用 [Capacitor CLI](/cli/index.md) 来“同步”您的网页代码，并安装或更新所需的原生依赖项。

运行以下命令来同步项目：

```bash
npx cap sync
```

执行 `npx cap sync` 会将您已构建的网页包**复制**到 Android 和 iOS 项目中，同时**更新** Capacitor 使用的原生依赖项。

您可以在 [Capacitor CLI 参考文档](/cli/index.md)中阅读有关 `sync` 命令的[详细说明](/cli/commands/sync.md)。

:::info
如果出现“无法找到网页资源目录”的错误提示，请更新您的 [Capacitor 配置文件](/main/reference/config.md)，确保 `webDir` 设置正确。
:::

## 测试 Capacitor 应用

将网页包同步到原生项目后，就可以在移动设备上测试应用了。测试方式有多种，最简单的方法是使用 Capacitor CLI 内置的命令。

要在 iOS 设备上运行 Capacitor 应用的调试版本，可以执行：

```bash
npx cap run ios
```

类似地，要在 Android 设备上运行调试版本，可以执行：

```bash
npx cap run android
```

完成应用的迭代和测试后，就可以编译最终的分发版本，准备部署到其他移动设备上了。

:::info
您也可以[通过 Xcode 在 iOS 上运行应用](/main/ios/index.md#running-in-xcode)，或[通过 Android Studio 在 Android 上运行应用](/main/android/index.md#running-with-android-studio)。这两种方式都适用于开发环境。不妨都尝试一下，看看您更喜欢哪种方式！
:::

### 打开原生集成开发环境

如果您希望对原生项目有更多控制权，可以使用 Capacitor CLI 快速打开相应的原生集成开发环境。

要[在 Xcode 中打开 iOS 的 Capacitor `.xcworkspace` 项目](/main/ios/index.md#opening-the-ios-project)，可以运行：

```bash
npx cap open ios
```

类似地，要[在 Android Studio 中打开 Android 的 Capacitor 项目](/main/android/index.md#opening-the-android-project)，可以运行：

```bash
npx cap open android
```

打开原生项目可以让您完全掌控应用的原生运行时环境。您可以[创建插件](/plugins.mdx)、[添加自定义原生代码](/main/ios/custom-code.md)，或[编译应用](#compiling-your-native-binary)以进行发布。

## 编译原生二进制文件

执行 `sync` 后，建议您打开目标平台的集成开发环境：iOS 使用 Xcode，Android 使用 Android Studio，来编译您的原生应用。

或者，如果您希望在终端或 CI 环境中编译应用，可以使用 [cap build 命令](/cli/commands/build)来构建原生项目，生成已签名的 AAB、APK 或 IPA 文件，这些文件可以直接分发到设备或最终用户手中。

```bash
npx cap build android
```

我们还建议使用诸如 [Fastlane](https://fastlane.tools) 或云端构建工具如 [Appflow](https://useappflow.com) 来自动化这些流程。虽然每个应用的具体情况不同，但我们为 Capacitor 项目提供了一个通用的发布流程示例。请阅读我们的 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 发布指南，了解更多关于如何部署到 Apple App Store 或 Google Play Store 的信息。

## 更新 Capacitor

更新 Capacitor 运行时非常简单，只需运行 `npm install` 即可。

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

更新 Capacitor 时，请确保 Core、Android 和 iOS 库的版本保持一致。Capacitor Core、Android 和 iOS 的发布是同步进行的，这意味着如果您同时安装所有这些库，就不会有问题！

:::info
您可以订阅 [Capacitor 仓库](https://github.com/ionic-team/capacitor)以接收新版本通知。在仓库首页顶部，点击 **Watch** -> **Releases only**。
:::