---
title: 开发工作流
description: Capacitor 工作流程
slug: /basics/workflow
---

# Capacitor 工作流程

使用 Capacitor 开发与传统网页应用略有不同。要构建原生混合应用，您需要遵循以下步骤。

## 构建网页代码

当准备在移动设备上测试网页应用时，需要先构建用于分发的网页应用。如果您使用 [Create React App](https://create-react-app.dev) 或 [Vite](https://vitejs.dev) 等工具，构建命令通常是 `npm run build`；而 [Angular](https://angular.io) 则使用 `ng build` 命令。无论使用什么构建命令，都需要先构建网页代码才能与 Capacitor 配合使用。

## 同步网页代码到 Capacitor 项目

构建完成后，需要将网页代码推送到 Capacitor 原生应用中。可以使用 [Capacitor CLI](/cli/index.md) 来"同步"网页代码并安装/更新所需的原生依赖。

运行以下命令同步项目：

```bash
npx cap sync
```

`npx cap sync` 命令会执行两个操作：
1. 将已构建的网页资源**复制**到 Android 和 iOS 项目中
2. **更新** Capacitor 使用的原生依赖

您可以在 [sync 命令文档](/cli/commands/sync.md) 或 [Capacitor CLI 参考文档](/cli/index.md) 中了解更多信息。

:::info
如果遇到"找不到网页资源目录"的错误，请检查 [Capacitor 配置文件](/main/reference/config.md) 中的 `webDir` 设置是否正确。
:::

## 测试 Capacitor 应用

同步完成后，就可以在移动设备上测试应用了。有以下几种测试方式，最简单的是使用 Capacitor CLI 命令。

在 iOS 设备上运行调试版本：
```bash
npx cap run ios
```

在 Android 设备上运行调试版本：
```bash
npx cap run android
```

测试并迭代开发完成后，就可以编译最终版本分发了。

:::info
您也可以选择：
- [通过 Xcode 运行 iOS 应用](/main/ios/index.md#running-in-xcode)
- [通过 Android Studio 运行 Android 应用](/main/android/index.md#running-with-android-studio)

两种方式都适用于开发，建议都尝试以选择您偏好的方式！
:::

### 打开原生 IDE

如需更深入地控制原生项目，可以使用 CLI 快速打开原生开发环境。

[在 Xcode 中打开 iOS 项目](/main/ios/index.md#opening-the-ios-project)：
```bash
npx cap open ios
```

[在 Android Studio 中打开 Android 项目](/main/android/index.md#opening-the-android-project)：
```bash
npx cap open android
```

打开原生项目后，您可以完全控制应用的原生运行时环境，包括：
- [创建插件](/plugins.mdx)
- [添加自定义原生代码](/main/ios/custom-code.md)
- [编译应用](#编译原生二进制)

## 编译原生二进制

同步完成后，建议在对应平台的 IDE 中编译应用：
- iOS：使用 Xcode
- Android：使用 Android Studio

如果需要在终端或 CI 环境中编译，可以使用 [cap build 命令](/cli/commands/build) 来构建原生项目，生成已签名的 AAB、APK 或 IPA 文件。

```bash
npx cap build android
```

我们还建议使用自动化工具：
- [Fastlane](https://fastlane.tools)
- 云构建工具如 [Appflow](https://useappflow.com)

关于发布应用到应用商店的完整流程，请参考我们的发布指南：
- [iOS 应用商店发布指南](/main/ios/deploying-to-app-store.md)
- [Google Play 发布指南](/main/android/deploying-to-google-play.md)

## 更新 Capacitor

更新 Capacitor 非常简单，只需运行 npm install 命令：

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

更新时请确保核心库、Android 和 iOS 库版本一致。Capacitor 团队会同时发布这些库，因此同时安装即可保持版本同步。

:::info
如需获取新版本通知，可以订阅 [Capacitor 代码库](https://github.com/ionic-team/capacitor)。在仓库首页点击 **Watch** -> **Releases only** 即可只接收版本更新通知。
:::