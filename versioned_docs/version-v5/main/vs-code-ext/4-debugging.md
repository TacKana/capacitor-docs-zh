---
title: 调试
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/debugging
---

你可以使用 [扩展](#debug-in-vs-code) 或 [附加到 Web 视图](#attach-to-web-view) 来调试你的应用。此外，你也可以使用 [远程日志记录](#remote-logging) 进行类似 `console.log` 风格的调试。

:::tip
你可以按下 `⌥` + D 来调试你的应用（Windows 上是 `ALT` + `D`）。
:::

## 在 VS Code 中调试 {#debug-in-vs-code}

点击 `Debug` 项目以启动一个 Web 浏览器或附加到正在运行的 Android Web 视图进行调试。

点击 `Debug` > `Web` 以启动一个**可调试的** Web 浏览器，例如 Chrome 或 MS Edge。这将构建你的应用，然后将 VS Code 置于调试模式，允许你设置断点、检查变量等。

:::note
你可以从 `Settings` > `Advanced` > `Browser` 中选择要调试的浏览器。
:::

## 附加到 Web 视图 {#attach-to-web-view}

你可以通过先点击 `Run` > `Android` 或在 Android Studio 中运行应用来调试正在运行的真实或模拟 Android 设备。

点击 `Debug` 项目，所有正在运行的 Android Web 视图都会显示出来，点击其中一个即可开始该视图的调试会话。

:::note
你也可以使用 Chrome 或 Safari 附加到 Web 视图，并使用它们内置的调试和检查工具。
:::

### 使用 Chrome 检查工具

当你从 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Google Chrome**，在地址栏输入：`chrome://inspect` 并按回车。
- 任何正在运行的 Web 视图将作为远程目标显示，你可以打开它们。
- 使用 Chrome 的调试和检查工具。

### 使用 Edge 检查工具

当你从 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Microsoft Edge**，在地址栏输入：`edge://inspect` 并按回车。
- 任何正在运行的 Web 视图将作为远程目标显示，你可以打开它们。
- 使用 Edge 的调试和检查工具。

### 使用 Safari {#use-safari}

当你从 `Run` > `iOS` 或 XCode 运行应用后：
- 打开 **Safari**，从 `Develop` 菜单中选择 iOS 设备。
- 使用 Safari 的调试和检查工具。

:::note
你需要通过进入 `Safari` 菜单 > `设置` > `高级`，并勾选 `在菜单栏中显示“开发”菜单` 来启用 Safari 的开发模式。

你还需要确保你的移动设备已启用调试功能。
:::

## 远程日志记录 {#remote-logging}

远程日志记录功能会将所有对 `console.log`（以及 `console.error` 等）的调用发送到 VS Code 的 `output` 窗口。这使得在设备上运行应用时进行调试变得更加容易，因为你不需要附加到其 Web 视图。

要使用此功能，请在设备上安装 Nexus 浏览器（[App Store](https://apps.apple.com/us/app/nexus-web-browser/id6445866986) 或 [Play Store](https://play.google.com/store/apps/details?id=com.nexusconcepts.nexus)），并在 VS Code 中为 Web 运行你的应用。如果设备在同一 Wi-Fi 网络中，它将检测到你的应用并允许你启动它。

:::tip
选择 `Settings` > `Logging` 以过滤要记录到输出窗口的内容。
:::