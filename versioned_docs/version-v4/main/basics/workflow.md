---
title: 开发工作流
description: Capacitor 工作流程
slug: /basics/workflow
---

# Capacitor 工作流程

使用 Capacitor 开发与传统网页应用略有不同。要将你的网页应用构建为原生移动应用，需遵循以下步骤。

## 构建网页代码

当准备在移动设备上测试网页应用时，首先需要构建可发布的网页应用代码。使用不同工具构建命令有所差异：
- [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/)：`npm run build`
- [Angular](https://angular.io/)：`ng build`

无论使用哪个构建命令，都需要先生成可发布的网页代码才能与 Capacitor 配合使用。

## 同步网页代码到 Capacitor 项目

构建完成后，需将网页代码同步到原生移动应用中。使用 [Capacitor CLI](/cli/index.md) 可以完成代码同步和原生依赖的安装/更新。

执行同步命令：
```bash
npx cap sync
```

该命令会执行以下操作：
1. **复制**构建好的网页代码到 Android 和 iOS 项目
2. **更新** Capacitor 使用的原生依赖

关于 `sync` 命令的更多用法，请参考 [CLI 命令文档](/cli/commands/sync.md) 或 [Capacitor CLI 参考手册](/cli/index.md)。

:::info
如果遇到"找不到网页资源目录"的错误，请检查 [Capacitor 配置文件](/main/reference/config.md) 中的 `webDir` 配置是否正确。
:::

## 测试 Capacitor 应用

同步完成后，即可在移动设备上测试应用。最简单的方式是使用 Capacitor CLI 命令：

iOS 设备调试：
```bash
npx cap run ios
```

Android 设备调试：
```bash
npx cap run android
```

测试迭代完成后，即可编译最终版本进行分发。

:::info
你也可以选择：
- [通过 Xcode 运行 iOS 应用](/main/ios/index.md#running-in-xcode)
- [通过 Android Studio 运行 Android 应用](/main/android/index.md#running-with-android-studio)

两种方式都适用于开发环境，建议都尝试以选择你偏好的方式。
:::

### 打开原生 IDE

如需更全面地控制原生项目，可使用 CLI 快速打开对应的 IDE：

打开 Xcode（iOS 项目）：
```bash
npx cap open ios
```

打开 Android Studio（Android 项目）：
```bash
npx cap open android
```

通过原生 IDE 可以：
- 完全控制应用原生运行时
- [创建插件](/plugins.mdx)
- [添加自定义原生代码](/main/ios/custom-code.md)
- [编译应用](#编译原生二进制文件)

## 编译原生二进制文件

Capacitor 不提供也不计划提供 `build` 或 `compile` 命令。同步完成后，应使用对应平台的 IDE：
- iOS：Xcode
- Android：Android Studio

如需在终端或 CI 环境中编译，可直接使用 `gradle` 或 `xcodebuild`。推荐使用自动化工具：
- [Fastlane](https://fastlane.tools)
- 云构建工具 [Appflow](https://useappflow.com)

我们提供了通用的发布流程指南，具体可参考：
- [iOS 发布指南](/main/ios/deploying-to-app-store.md)
- [Android 发布指南](/main/android/deploying-to-google-play.md)

## 更新 Capacitor

更新 Capacitor 运行环境只需执行简单的 npm 安装：

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

注意确保 Core、Android 和 iOS 库版本一致。这些组件会同时发布，因此同时安装即可保持版本同步。

:::info
要获取更新通知，可订阅 [Capacitor 代码仓库](https://github.com/ionic-team/capacitor)。在仓库首页点击 **Watch** → **Releases only** 即可。
:::