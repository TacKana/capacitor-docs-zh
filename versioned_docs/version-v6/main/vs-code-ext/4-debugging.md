---
title: Debugging
description: Visual Studio Code 扩展 for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/debugging
---

你可以使用 [扩展功能](#debug-in-vs-code) 或 [附加到网页视图](#attach-to-web-view) 来调试应用程序。此外，也可以使用 [远程日志](#remote-logging) 功能进行 `console.log` 风格的调试。

:::tip
你可以按下 `⌥` + D 来调试应用（Windows 上是 `ALT` + `D`）。
:::

## 在 VS Code 中调试 {#debug-in-vs-code}

点击 `Debug` 选项来启动一个网页浏览器，或附加到正在运行的 Android 网页视图进行调试。

点击 `Debug` > `Web` 会启动一个*可调试*的网页浏览器，例如 Chrome 或 MS Edge。这将构建你的应用，然后将 VS Code 切换到调试模式，允许你设置断点、检查变量等。

:::note
你可以从 `Settings` > `Advanced` > `Browser` 中选择要调试的浏览器。
:::

## 附加到网页视图 {#attach-to-web-view}

你可以通过点击 `Run` > `Android` 或在 Android Studio 中运行应用，先为 Android 运行应用，然后调试正在运行的真实或模拟 Android 设备。

点击 `Debug` 选项，所有正在运行的 Android 网页视图都会显示出来，点击其中一个即可为该视图启动调试会话。

:::note
你也可以使用 Chrome 或 Safari 附加到网页视图，并使用它们内置的调试和检查工具。
:::

### 使用 Chrome 检查工具

当你通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Google Chrome**，在地址栏输入：`chrome://inspect` 并按回车。
- 任何正在运行的网页视图都会显示为可打开的远程目标。
- 使用 Chrome 的调试和检查工具。

### 使用 Edge 检查工具

当你通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Microsoft Edge**，在地址栏输入：`edge://inspect` 并按回车。
- 任何正在运行的网页视图都会显示为可打开的远程目标。
- 使用 Edge 的调试和检查工具。

### 使用 Safari {#use-safari}

当你通过 `Run` > `iOS` 或 XCode 运行应用后：
- 打开 **Safari**，从 `Develop` 菜单中选择 iOS 设备。
- 使用 Safari 的调试和检查工具。

:::note
你需要为 Safari 开启开发模式：前往 `Safari` 菜单 > `Settings`，`Advanced`，然后勾选 `Show Develop menu in menu bar`。

你还需要确保你的移动设备已启用调试功能。
:::

## 远程日志 {#remote-logging}

远程日志功能会将所有对 `console.log`（以及 `console.error` 等）的调用发送到 VS Code 的 `output` 窗口。这使得在设备上运行应用时调试变得更加容易，因为你无需附加到其网页视图。

要使用此功能，请在设备上安装 Nexus Browser（[App Store](https://apps.apple.com/us/app/nexus-web-browser/id6445866986) 或 [Play Store](https://play.google.com/store/apps/details?id=com.nexusconcepts.nexus)），然后在 VS Code 中运行你的 Web 应用。如果设备在同一 WiFi 网络下，它将检测到你的应用并允许你启动它。

:::tip
选择 `Settings` > `Logging` 可以过滤输出到窗口的日志内容。
:::