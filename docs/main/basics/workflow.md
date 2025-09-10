---
title: 开发工作流
description: Capacitor 工作流程
slug: /basics/workflow
---

# Capacitor 工作流程

使用 Capacitor 开发与传统网页应用略有不同。要将你的网页应用构建为原生移动应用，需要遵循以下步骤。

## 构建网页代码

当准备在移动设备上测试网页应用时，首先需要构建用于分发的网页应用包。如果你使用 [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/) 等工具，构建命令通常是 `npm run build`；而 [Angular](https://angular.io/) 则使用 `ng build`。无论使用何种工具，都需要先构建网页代码才能与 Capacitor 配合使用。

## 同步网页代码到 Capacitor 项目

完成网页代码构建后，你需要将这些代码同步到原生移动应用中。可以使用 [Capacitor CLI](/cli/index.md) 来执行代码同步，并安装/更新所需的原生依赖。

执行同步命令：

```bash
npx cap sync
```

运行 `npx cap sync` 会执行两项操作：
1. **复制** 已构建的网页包到 Android 和 iOS 项目
2. **更新** Capacitor 使用的原生依赖

更多关于 `sync` 命令的说明可查阅 [文档](/cli/commands/sync.md) 或 [Capacitor CLI 参考](/cli/index.md)。

:::info
如果遇到 "无法找到网页资源目录" 的错误，请检查并更新 [Capacitor 配置文件](/main/reference/config.md) 中的 `webDir` 设置。
:::

## 测试 Capacitor 应用

完成代码同步后，就可以在移动设备上测试应用了。测试方式有多种，最简单的是使用 Capacitor CLI 内置命令。

在 iOS 设备上运行调试版本：
```bash
npx cap run ios
```

在 Android 设备上运行调试版本：
```bash
npx cap run android
```

测试完成后，就可以编译最终版本准备分发了。

:::info
你也可以选择：
- [通过 Xcode 运行 iOS 应用](/main/ios/index.md#running-in-xcode)
- [通过 Android Studio 运行 Android 应用](/main/android/index.md#running-with-android-studio)
两种方式都适用于开发，建议都尝试后选择你偏好的方式！
:::

### 打开原生 IDE

如果需要更多控制权，可以使用 CLI 快速打开原生开发环境。

[在 Xcode 中打开 iOS 项目](/main/ios/index.md#opening-the-ios-project)：
```bash
npx cap open ios
```

[在 Android Studio 中打开 Android 项目](/main/android/index.md#opening-the-android-project)：
```bash
npx cap open android
```

打开原生项目可以让你完全控制应用的原生运行时环境，方便进行以下操作：
- [开发插件](/plugins.mdx)
- [添加自定义原生代码](/main/ios/custom-code.md)
- [编译应用](#编译原生二进制包)

## 编译原生二进制包

同步完成后，建议打开对应平台的 IDE（iOS 用 Xcode，Android 用 Android Studio）来编译原生应用。

如果需要在终端或 CI 环境中编译，可以使用 [cap build 命令](/cli/commands/build) 构建原生项目，生成已签名的 AAB、APK 或 IPA 文件用于分发。

```bash
npx cap build android
```

我们推荐使用自动化工具如 [Fastlane](https://fastlane.tools) 或云端构建服务 [Appflow](https://useappflow.com) 来简化流程。虽然每个应用需求不同，但我们提供了通用的发布流程示例。具体部署到苹果应用商店或谷歌应用商店的指南，请参考 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 发布文档。

## 更新 Capacitor

更新 Capacitor 非常简单，只需运行安装命令：

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

更新时需确保核心库、Android 和 iOS 库的版本一致。Capacitor 会同时发布这些组件的更新，因此同时安装它们可以保证版本匹配。

:::info
要获取新版本通知，可以订阅 [Capacitor 代码库](https://github.com/ionic-team/capacitor)。在仓库首页点击 **Watch** → **Releases only** 即可。
:::