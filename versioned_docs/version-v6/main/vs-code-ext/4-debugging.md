---
title: 调试
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/debugging
---

使用[扩展](#在-vs-code-中调试)或[附加到 Web View](#附加到-web-view) 来调试您的应用。您也可以使用[远程日志记录](#远程日志记录)来执行 `console.log` 风格的调试。

:::tip
您可以按 `⌥` + D 来调试应用（Windows 上为 `ALT` + `D`）。
:::

## 在 VS Code 中调试

点击 `Debug` 项以启动 Web 浏览器或附加到正在运行的 Android Web View 进行调试。

点击 `Debug` > `Web` 以启动一个_可调试的_ Web 浏览器，如 Chrome 或 MS Edge。这将构建您的应用，然后将 VS Code 置于调试模式，允许您设置断点、检查变量等。

:::note
您可以从 `Settings` > `Advanced` > `Browser` 选择用于调试的浏览器。
:::

## 附加到 Web View

您可以通过先点击 `Run` > `Android` 运行 Android 应用或在 Android Studio 中运行应用，然后调试正在运行的真实或模拟 Android 设备。

点击 `Debug` 项，所有正在运行的 Android Web View 将出现，点击一个以开始该视图的调试会话。

:::note
您也可以使用 Chrome 或 Safari 附加到 Web View，并使用它们内置的调试和检查工具。
:::

### 使用 Chrome Inspect

当您通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Google Chrome** 并在地址栏中输入：`chrome://inspect` 并按回车。
- 任何正在运行的 Web View 将作为远程目标出现，您可以打开它们。
- 使用 Chrome 的调试和检查工具。

### 使用 Edge Inspect

当您通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Microsoft Edge** 并在地址栏中输入：`edge://inspect` 并按回车。
- 任何正在运行的 Web View 将作为远程目标出现，您可以打开它们。
- 使用 Edge 的调试和检查工具。

### 使用 Safari

当您通过 `Run` > `iOS` 或 Xcode 运行应用后：
- 打开 **Safari**，从 `Develop` 菜单中选择 iOS 设备。
- 使用 Safari 的调试和检查工具。

:::note
您需要开启 Safari 的开发模式，方法是进入 `Safari` 菜单 > `Settings`、`Advanced`，然后勾选 `Show Develop menu in menu bar`。

您还需要确保您的移动设备已启用调试功能。
:::

## 远程日志记录

远程日志记录功能会将所有对 `console.log`（以及 `console.error` 等）的调用发送到 VS Code 的 `output` 窗口。这使得在设备上运行应用时调试更加容易，因为您不需要附加到其 Web View。

要使用此功能，请在设备上安装 Nexus 浏览器（[App Store](https://apps.apple.com/us/app/nexus-web-browser/id6445866986) 或 [Play Store](https://play.google.com/store/apps/details?id=com.nexusconcepts.nexus)），并在 VS Code 中为 Web 运行应用。如果设备在同一个 Wi-Fi 网络上，它将检测到您的应用并允许您启动它。

:::tip
选择 `Settings` > `Logging` 以过滤输出窗口中记录的内容。
:::
