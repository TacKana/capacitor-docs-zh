---
title: 开发工作流
description: Capacitor 工作流程
slug: /basics/workflow
---

# Capacitor 工作流程

使用 Capacitor 开发与传统网页应用略有不同。要将你的网页应用构建为原生移动应用，需要遵循以下步骤。

## 构建网页代码

当准备在移动设备上测试网页应用时，需要构建用于分发的网页应用包。如果你使用的是 [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/) 这类工具，构建命令通常是 `npm run build`；而像 [Angular](https://angular.io/) 这样的工具则使用 `ng build` 命令。无论使用什么命令，都需要先构建用于分发的网页代码，才能与 Capacitor 配合使用。

## 将网页代码同步到 Capacitor 项目中

网页代码构建完成后，需要将其推送到 Capacitor 原生应用中。可以使用 [Capacitor CLI](/cli/index.md) 来"同步"网页代码，并安装/更新所需的原生依赖项。

运行以下命令同步项目：

```bash
npx cap sync
```

执行 `npx cap sync` 会**复制**已构建的网页包到 Android 和 iOS 项目中，同时**更新** Capacitor 使用的原生依赖项。

你可以在 [Capacitor CLI 参考文档](/cli/index.md)中了解更多关于 `sync` 命令的信息，或查阅[相关文档](/cli/commands/sync.md)。

:::info
如果遇到"找不到网页资源目录"的错误，请更新 [Capacitor 配置文件](/main/reference/config.md)中的 `webDir` 配置。
:::

## 测试 Capacitor 应用

将网页包同步到原生项目后，就可以在移动设备上测试应用了。测试方式有多种，最简单的方法是使用 Capacitor CLI 内置命令。

要在 iOS 设备上运行调试版本，可执行：

```bash
npx cap run ios
```

类似地，在 Android 设备上运行调试版本，可执行：

```bash
npx cap run android
```

完成应用迭代和测试后，就可以编译最终的分发包分发给其他移动设备了。

:::info
你也可以[通过 Xcode 在 iOS 上运行应用](/main/ios/index.md#running-in-xcode)，或[通过 Android Studio 在 Android 上运行应用](/main/android/index.md#running-with-android-studio)。两种方式都适用于开发环境。建议都尝试一下，看看哪种更适合你！
:::

### 打开原生集成开发环境

如果希望更精细地控制原生项目，可以使用 Capacitor CLI 快速打开原生集成开发环境。

要[在 Xcode 中打开 iOS Capacitor 的 `.xcworkspace` 项目](/main/ios/index.md#opening-the-ios-project)，可运行：

```bash
npx cap open ios
```

类似地，要[在 Android Studio 中打开 Android Capacitor 项目](/main/android/index.md#opening-the-android-project)，可运行：

```bash
npx cap open android
```

打开原生项目可以让你完全掌控应用的原生运行时环境。你可以[创建插件](/plugins.mdx)、[添加自定义原生代码](/main/ios/custom-code.md)，或[编译用于发布的应用包](#编译原生二进制文件)。

## 编译原生二进制文件

Capacitor 没有 `build` 或 `compile` 命令，将来也不会有。执行 `sync` 后，建议打开目标平台的集成开发环境：iOS 使用 Xcode，Android 使用 Android Studio，来编译原生应用。

要在终端或 CI 环境中编译应用，可以直接使用 `gradle` 或 `xcodebuild`。我们也建议使用 [Fastlane](https://fastlane.tools) 这类工具或像 [Appflow](https://ionic.io/appflow) 这样的云构建工具来自动化处理这些流程。虽然每个应用情况不同，但我们提供了 Capacitor 项目的一般发布流程示例。请阅读我们的 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 发布指南，了解更多关于部署到 Apple App Store 或 Google Play Store 的信息。

## 更新 Capacitor

更新 Capacitor 运行时非常简单，只需运行 `npm install` 即可。

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

更新 Capacitor 时，需要确保核心库、Android 库和 iOS 库的版本一致。Capacitor 核心库、Android 库和 iOS 库的发布都是同步进行的，这意味着只要同时安装所有库，就不会有问题！

:::info
你可以订阅 [Capacitor 代码仓库](https://github.com/ionic-team/capacitor)来获取新版本通知。在仓库首页顶部，点击 **Watch** -> **Releases only** 即可。
:::