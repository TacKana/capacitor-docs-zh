---
title: 开发流程
description: Capacitor 工作流
slug: /basics/workflow
---

# Capacitor 工作流

使用 Capacitor 开发与传统的网页应用略有不同。要将你的网页应用转变为原生移动应用，需要遵循以下步骤。

## 构建网页代码

当准备在移动设备上测试网页应用时，需要先构建用于分发的网页应用代码。如果使用 [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/) 等工具，构建命令通常是 `npm run build`；而 [Angular](https://angular.io/) 项目则使用 `ng build` 命令。无论使用哪种工具，都需要先构建网页代码才能与 Capacitor 配合使用。

## 同步网页代码到 Capacitor 项目

构建完成后，需要将网页代码同步到 Capacitor 原生应用中。可以使用 [Capacitor CLI](/cli/index.md) 执行同步操作，同时安装/更新所需的原生依赖。

运行以下命令进行同步：

```bash
npx cap sync
```

`npx cap sync` 命令会执行两个操作：
- **复制** 已构建的网页包到 Android 和 iOS 项目目录
- **更新** Capacitor 所需的原生依赖

关于 `sync` 命令的更多信息，可以参考 [CLI 命令文档](/cli/commands/sync.md) 和 [Capacitor CLI 参考文档](/cli/index.md)。

:::info
如果遇到 "无法找到网页资源目录" 的错误，请检查 [Capacitor 配置文件](/main/reference/config.md) 中的 `webDir` 配置项是否正确。
:::

## 测试应用

同步完成后，就可以在移动设备上测试应用了。有多种测试方式，最简单的就是使用 Capacitor CLI 命令：

在 iOS 设备上运行调试版本：
```bash
npx cap run ios
```

在 Android 设备上运行调试版本：
```bash
npx cap run android
```

完成测试和迭代后，就可以编译最终的二进制文件分发给其他设备了。

:::info
你也可以选择：
- [通过 Xcode 运行 iOS 应用](/main/ios/index.md#running-in-xcode)
- [通过 Android Studio 运行 Android 应用](/main/android/index.md#running-with-android-studio)

两种方式都适用于开发环境，建议都尝试一下选择你偏好的方式！
:::

### 打开原生 IDE

如果需要更多控制权，可以使用 CLI 快速打开原生开发环境：

打开 Xcode 中的 iOS 项目 (`.xcworkspace`)：
```bash
npx cap open ios
```

打开 Android Studio 中的 Android 项目：
```bash
npx cap open android
```

通过原生 IDE 可以完全控制应用的原生运行时环境，你可以：
- [开发插件](/plugins.mdx)
- [添加自定义原生代码](/main/ios/custom-code.md)
- [编译应用](#compiling-your-native-binary) 准备发布

## 编译原生二进制文件

Capacitor 不提供也不计划提供 `build` 或 `compile` 命令。同步后，你应该：
- iOS 项目：使用 Xcode
- Android 项目：使用 Android Studio

在终端或 CI 环境中，可以直接使用 `gradle` 或 `xcodebuild` 命令编译。我们也推荐使用 [Fastlane](https://fastlane.tools) 或云端构建工具如 [Appflow](https://ionic.io/appflow) 来自动化这些流程。

关于发布到应用商店的详细指南，请参考：
- [iOS 应用商店发布指南](/main/ios/deploying-to-app-store.md)
- [Google Play 商店发布指南](/main/android/deploying-to-google-play.md)

## 更新 Capacitor

更新 Capacitor 运行时非常简单，只需运行：

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

更新时请确保 Core、Android 和 iOS 库版本一致。Capacitor 团队会同时发布这些组件的更新版本，因此只要同时安装所有库就能保持版本同步。

:::info
可以在 [Capacitor 代码库](https://github.com/ionic-team/capacitor) 点击 **Watch** → **Releases only** 订阅新版本通知。
:::