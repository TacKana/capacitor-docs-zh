---
title: Development Workflow
description: Capacitor 工作流程
slug: /basics/workflow
---

# Capacitor 工作流程

使用 Capacitor 开发与传统 Web 应用略有不同。要将您的 Web 应用构建成原生移动应用，需要遵循以下步骤。

## 构建 Web 代码

当您准备在移动设备上测试 Web 应用时，需要先构建可供分发的 Web 应用。如果您使用 [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/) 等工具，构建命令通常是 `npm run build`；而像 [Angular](https://angular.io/) 这样的工具则使用 `ng build` 命令。无论使用何种命令，都需要先构建 Web 代码以供分发，才能与 Capacitor 配合使用。

## 将 Web 代码同步到 Capacitor 项目

构建好 Web 代码后，需要将其推送到原生 Capacitor 应用中。您可以使用 [Capacitor CLI](/cli/index.md) 来“同步”Web 代码，并安装/更新所需的原生依赖。

运行以下命令同步项目：

```bash
npx cap sync
```

执行 `npx cap sync` 会将已构建的 Web 包**复制**到 Android 和 iOS 项目中，同时**更新** Capacitor 使用的原生依赖。

您可以在 [Capacitor CLI 参考文档](/cli/index.md) 中查看关于 `sync` 及其他命令的 [详细说明](/cli/commands/sync.md)。

:::info
如果遇到“找不到 Web 资源目录”的错误，请更新 [Capacitor 配置文件](/main/reference/config.md) 中的 `webDir` 配置项。
:::

## 测试 Capacitor 应用

将 Web 包同步到原生项目后，就可以在移动设备上测试应用了。测试方式有多种，最简单的是使用 Capacitor CLI 内置命令。

要在 iOS 设备上运行调试版本，可执行：
```bash
npx cap run ios
```

类似地，在 Android 设备上运行调试版本可执行：
```bash
npx cap run android
```

完成应用迭代测试后，就可以编译最终二进制文件以分发到其他移动设备。

:::info
您也可以 [通过 Xcode 在 iOS 上运行应用](/main/ios/index.md#running-in-xcode) 或 [通过 Android Studio 在 Android 上运行应用](/main/android/index.md#running-with-android-studio)。两种方式都适用于开发环境，建议都尝试一下，选择您更喜欢的方式！
:::

### 打开原生集成开发环境

如需更精细地控制原生项目，可以使用 Capacitor CLI 快速打开原生集成开发环境。

要 [在 Xcode 中打开 iOS Capacitor `.xcworkspace` 项目](/main/ios/index.md#opening-the-ios-project)，可执行：
```bash
npx cap open ios
```

类似地，要 [在 Android Studio 中打开 Android Capacitor 项目](/main/android/index.md#opening-the-android-project)，可执行：
```bash
npx cap open android
```

打开原生项目可以让您完全掌控应用的原生运行时环境。您可以 [创建插件](/plugins.mdx)、[添加自定义原生代码](/main/ios/custom-code.md)，或 [编译应用](#编译原生二进制文件) 进行发布。

## 编译原生二进制文件

执行 `sync` 后，建议打开目标平台的集成开发环境：iOS 使用 Xcode，Android 使用 Android Studio，以编译原生应用。

另外，如果需要在终端或 CI 环境中编译应用，可以使用 [cap build 命令](/cli/commands/build) 构建原生项目，生成已签名的 AAB、APK 或 IPA 文件，直接可用于设备分发或发布给最终用户。

```bash
npx cap build android
```

我们还建议使用 [Fastlane](https://fastlane.tools) 等工具或 [Appflow](https://useappflow.com) 等云端构建工具来自动化这些流程。虽然每个应用的具体情况不同，但我们提供了 Capacitor 项目的一般发布流程示例。请参阅 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 发布指南，了解如何部署到 Apple App Store 或 Google Play Store 的更多信息。

## 更新 Capacitor

更新 Capacitor 运行时非常简单，只需运行 `npm install` 即可。

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

更新 Capacitor 时，请确保 Core、Android 和 iOS 库的版本保持一致。Capacitor Core、Android 和 iOS 的版本会同时发布，因此只要同时安装所有库，就能保证版本匹配！

:::info
您可以订阅 [Capacitor 代码仓库](https://github.com/ionic-team/capacitor) 以获取新版本通知。在仓库首页顶部点击 **Watch** -> **Releases only** 即可。
:::