---
title: Debugging
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/debugging
---

您可以通过两种方式调试应用：[使用扩展](#debug-in-vs-code) 或 [附加到 WebView](#attach-to-web-view)。此外还可以使用 [远程日志](#remote-logging) 功能实现类似 `console.log` 的调试方式。

:::tip
快捷键提示：按 `⌥` + D 可快速启动调试（Windows 上是 `ALT` + `D`）。
:::

## 在 VS Code 中调试

点击 `Debug` 菜单项可以启动浏览器调试，或者附加到正在运行的 Android WebView 进行调试。

选择 `Debug` > `Web` 会启动可调试的浏览器（如 Chrome 或 Edge）。这将构建您的应用并使 VS Code 进入调试模式，支持设置断点、检查变量等操作。

:::note
您可以在 `Settings` > `Advanced` > `Browser` 中选择要调试的浏览器类型。
:::

## 附加到 WebView

要对真实设备或模拟器上运行的 Android 应用进行调试：
1. 首先通过点击 `Run` > `Android` 或在 Android Studio 中运行应用
2. 点击 `Debug` 菜单项
3. 所有正在运行的 Android WebView 都会显示，选择其中一个即可开始调试会话

:::note
您也可以使用 Chrome 或 Safari 附加到 WebView，利用它们内置的调试和检查工具。
:::

### 使用 Chrome 检查工具

当您通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Google Chrome** 浏览器
- 在地址栏输入：`chrome://inspect` 并回车
- 所有运行的 WebView 会显示为可连接的远程目标
- 使用 Chrome 的调试和检查工具

### 使用 Edge 检查工具

当您通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Microsoft Edge** 浏览器
- 在地址栏输入：`edge://inspect` 并回车
- 所有运行的 WebView 会显示为可连接的远程目标
- 使用 Edge 的调试和检查工具

### 使用 Safari 调试 iOS

当您通过 `Run` > `iOS` 或 XCode 运行应用后：
- 打开 **Safari** 浏览器
- 从 `Develop` 菜单中选择对应的 iOS 设备
- 使用 Safari 的调试和检查工具

:::note
使用前需要开启 Safari 开发者模式：
1. 点击 `Safari` 菜单 > `设置`
2. 进入 `高级` 标签页
3. 勾选 `在菜单栏中显示"开发"菜单`

同时请确保您的移动设备已启用调试功能。
:::

## 远程日志

远程日志功能会将所有 `console.log`（以及 `console.error` 等）调用输出到 VS Code 的 `output` 窗口。这使得在设备上运行应用时无需附加 WebView 即可轻松调试。

使用方法：
1. 在设备上安装 Nexus Browser（[App Store](https://apps.apple.com/us/app/nexus-web-browser/id6445866986) 或 [Play Store](https://play.google.com/store/apps/details?id=com.nexusconcepts.nexus)）
2. 在 VS Code 中以 Web 模式运行应用
3. 如果设备在同一 WiFi 网络下，Nexus Browser 会自动检测到您的应用

:::tip
通过 `Settings` > `Logging` 可以过滤输出到日志窗口的内容。
:::