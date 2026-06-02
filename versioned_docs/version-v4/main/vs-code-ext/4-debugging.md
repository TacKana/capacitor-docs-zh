---
title: 调试
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/debugging
---

使用[扩展](#在-vs-code-中调试)或[附加到 web view](#附加到-web-view) 来调试您的应用程序。您也可以使用[远程日志](#远程日志)来执行 `console.log` 风格的调试。

## 在 VS Code 中调试

点击 `Debug` 项目以启动 Web 浏览器或附加到正在运行的 Android web view 进行调试。

点击 `Debug` > `Web` 以启动一个*可调试的* Web 浏览器，如 Chrome 或 MS Edge。这将构建您的应用，然后将 VS Code 置于调试模式，允许您设置断点、检查变量等。

:::note
您可以从 `Settings` > `Advanced` > `Browser` 中选择要调试的浏览器。
:::

## 附加到 Web View

您可以通过首先点击 `Run` > `Android` 或在 Android Studio 中运行应用来调试正在运行的真实或模拟 Android 设备。

点击 `Debug` 项目，所有正在运行的 Android web view 将显示出来，点击其中一个即可开始该视图的调试会话。

:::note
您也可以使用 Chrome 或 Safari 附加到 Web View，并使用其内置的调试和检查工具。
:::

### 使用 Chrome Inspect

当您通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Google Chrome** 并在地址栏中输入：`chrome://inspect` 并按回车。
- 任何正在运行的 web view 将显示为可打开的远程目标
- 使用 Chrome 的调试和检查工具。

### 使用 Edge Inspect

当您通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Microsoft Edge** 并在地址栏中输入：`edge://inspect` 并按回车。
- 任何正在运行的 web view 将显示为可打开的远程目标
- 使用 Edge 的调试和检查工具。

### 使用 Safari

当您通过 `Run` > `iOS` 或 XCode 运行应用后：
- 打开 **Safari** 并从 `Develop` 菜单中选择 iOS 设备
- 使用 Safari 的调试和检查工具。

:::note
您需要开启 Safari 的开发模式，进入 `Safari` 菜单 > `Settings`、`Advanced`，并勾选 `Show Develop menu in menu bar`。

您还需要确保您的移动设备已启用调试功能。
:::

## 远程日志

远程日志功能会将所有对 `console.log`（以及 `console.error` 等）的调用发送到 VS Code 的 `output` 窗口。这使得在设备上运行应用时进行调试更加容易，因为您无需附加到其 web view。

点击 `Settings` > `Remote Logging` 以开启此功能。

:::note
远程日志将安装依赖 `@ionic/remote-log` 并修改您的 `main.ts` 或 `index.tsx` 文件以启动远程日志。测试完成后请务必取消勾选 `Remote Logging` 以移除这些代码。
:::
