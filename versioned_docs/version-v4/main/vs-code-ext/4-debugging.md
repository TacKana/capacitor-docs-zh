---
title: Debugging
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/debugging
---

你可以使用[扩展功能](#在-vs-code-中调试)或[附加到 Web 视图](#附加到-web-视图)来调试你的应用程序。或者，你也可以使用[远程日志记录](#远程日志记录)来进行 `console.log` 风格的调试。

## 在 VS Code 中调试

点击 `Debug` 项目来启动一个网页浏览器，或者附加到一个正在运行的 Android Web 视图进行调试。

点击 `Debug` > `Web` 来启动一个*可调试的*网页浏览器，例如 Chrome 或 MS Edge。这将构建你的应用，然后将 VS Code 置于调试模式，允许你设置断点、检查变量等等。

:::note
你可以通过 `Settings` > `Advanced` > `Browser` 选择要调试的浏览器。
:::

## 附加到 Web 视图

你可以通过点击 `Run` > `Android` 或在 Android Studio 中运行应用，先为 Android 运行，然后调试一个正在运行的真实或模拟的 Android 设备。

点击 `Debug` 项目，所有正在运行的 Android Web 视图都会出现，点击一个即可开始该视图的调试会话。

:::note
你也可以使用 Chrome 或 Safari 附加到 Web 视图，并使用它们内置的调试和检查工具。
:::

### 使用 Chrome 检查工具

当你通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Google Chrome** 并在地址栏输入：`chrome://inspect`，然后按回车键。
- 任何正在运行的 Web 视图都将作为远程目标出现，你可以打开它们。
- 使用 Chrome 的调试和检查工具。

### 使用 Edge 检查工具

当你通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Microsoft Edge** 并在地址栏输入：`edge://inspect`，然后按回车键。
- 任何正在运行的 Web 视图都将作为远程目标出现，你可以打开它们。
- 使用 Edge 的调试和检查工具。

### 使用 Safari {#use-safari}

当你通过 `Run` > `iOS` 或 XCode 运行应用后：
- 打开 **Safari** 并从 `开发` 菜单中选择 iOS 设备。
- 使用 Safari 的调试和检查工具。

:::note
你需要为 Safari 开启开发者模式，方法是前往 `Safari` 菜单 > `设置`，选择 `高级` 并勾选 `在菜单栏中显示“开发”菜单`。

你还需要确保你的移动设备已启用调试功能。
:::

## 远程日志记录

远程日志记录功能会将所有对 `console.log`（以及 `console.error` 等）的调用发送到 VS Code 的 `输出` 窗口。这使得在设备上运行应用时调试变得更加容易，因为你不需要附加到其 Web 视图。

点击 `Settings` > `Remote Logging` 来开启此功能。

:::note
远程日志记录会安装一个依赖项 `@ionic/remote-log`，并修改你的 `main.ts` 或 `index.tsx` 文件以启动远程日志记录。测试后请务必取消勾选 `Remote Logging` 以移除这段代码。
:::