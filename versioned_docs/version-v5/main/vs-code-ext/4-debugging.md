---
title: Debugging
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/debugging
---

您可以通过[扩展功能](#debug-in-vs-code)或[附加到网页视图](#attach-to-web-view)来调试应用程序。还可以使用[远程日志](#remote-logging)功能进行类似 `console.log` 的调试操作。

:::tip
按下 `⌥` + D 键（Windows 系统为 `ALT` + `D`）即可启动调试模式。
:::

## 在 VS Code 中调试

点击 `Debug` 选项可启动网页浏览器或附加到正在运行的 Android 网页视图进行调试。

选择 `Debug` > `Web` 将启动 Chrome 或 MS Edge 等可调试浏览器。此操作会构建您的应用，并将 VS Code 切换到调试模式，支持设置断点、检查变量等功能。

:::note
可通过 `Settings` > `Advanced` > `Browser` 选择调试使用的浏览器。
:::

## 附加到网页视图

要调试真实或模拟的 Android 设备，请先通过 `Run` > `Android` 或 Android Studio 运行应用。

点击 `Debug` 选项，所有正在运行的 Android 网页视图都会显示，选择任意视图即可开启调试会话。

:::note
您也可以使用 Chrome 或 Safari 附加到网页视图，利用其内置的调试和检查工具。
:::

### 使用 Chrome 检查工具

通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Google Chrome**，在地址栏输入 `chrome://inspect` 并回车
- 所有运行中的网页视图将显示为可打开的远程目标
- 使用 Chrome 的调试和检查工具

### 使用 Edge 检查工具

通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Microsoft Edge**，在地址栏输入 `edge://inspect` 并回车
- 所有运行中的网页视图将显示为可打开的远程目标
- 使用 Edge 的调试和检查工具

### 使用 Safari

通过 `Run` > `iOS` 或 XCode 运行应用后：
- 打开 **Safari**，从 `Develop` 菜单中选择 iOS 设备
- 使用 Safari 的调试和检查工具

:::note
需先在 Safari 菜单 > `设置` > `高级` 中勾选 `在菜单栏显示"开发"菜单` 启用开发模式。

同时确保移动设备已开启调试权限。
:::

## 远程日志

远程日志功能会将所有 `console.log`（及 `console.error` 等）调用发送至 VS Code 的 `output` 窗口。这使得在设备上运行应用时的调试更加便捷，无需附加到网页视图。

使用此功能需在设备上安装 Nexus Browser（[App Store](https://apps.apple.com/us/app/nexus-web-browser/id6445866986) 或 [Play Store](https://play.google.com/store/apps/details?id=com.nexusconcepts.nexus)），并通过 VS Code 以网页模式运行应用。若设备处于同一 WiFi 网络，将自动检测到您的应用并允许启动。

:::tip
通过 `Settings` > `Logging` 可筛选输出窗口显示的日志内容。
:::