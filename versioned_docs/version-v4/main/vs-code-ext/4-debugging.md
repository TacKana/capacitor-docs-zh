---
title: 调试
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/debugging
---

你可以通过以下方式调试应用程序：[VS Code 扩展内调试](#debug-in-vs-code) 或 [附加到 Web 视图](#attach-to-web-view)。还可以使用 [远程日志](#remote-logging) 功能进行 `console.log` 风格的调试。

## 在 VS Code 中调试

点击 `Debug` 选项可以启动网页浏览器或附加到正在运行的 Android Web 视图进行调试。

点击 `Debug` > `Web` 会启动一个*可调试*的浏览器（如 Chrome 或 MS Edge）。这将构建你的应用，并将 VS Code 切换至调试模式，允许你设置断点、检查变量等。

:::note
可以通过 `Settings` > `Advanced` > `Browser` 选择要调试的浏览器类型。
:::

## 附加到 Web 视图

要调试正在运行的实体或模拟 Android 设备，首先需通过点击 `Run` > `Android` 或在 Android Studio 中运行应用。

点击 `Debug` 选项后，所有正在运行的 Android Web 视图都会显示，点击其中一个即可开始该视图的调试会话。

:::note
你也可以使用 Chrome 或 Safari 附加到 Web 视图，利用它们内置的调试和检查工具。
:::

### 使用 Chrome 检查器

当通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Google Chrome**，在地址栏输入：`chrome://inspect` 并回车
- 所有正在运行的 Web 视图会显示为可打开的远程目标
- 使用 Chrome 的调试和检查工具

### 使用 Edge 检查器

当通过 `Run` > `Android` 或 Android Studio 运行应用后：
- 打开 **Microsoft Edge**，在地址栏输入：`edge://inspect` 并回车
- 所有正在运行的 Web 视图会显示为可打开的远程目标
- 使用 Edge 的调试和检查工具

### 使用 Safari

当通过 `Run` > `iOS` 或 XCode 运行应用后：
- 打开 **Safari**，从 `Develop` 菜单中选择 iOS 设备
- 使用 Safari 的调试和检查工具

:::note
需要先在 Safari 中启用开发者模式：进入 `Safari` 菜单 > `Settings`，选择 `Advanced` 并勾选 `Show Develop menu in menu bar`。

同时需要确保移动设备已开启调试权限。
:::

## 远程日志

远程日志功能会将所有 `console.log`（及 `console.error` 等）调用发送至 VS Code 的 `output` 窗口。这使得在设备上运行应用时的调试更加便捷，无需附加到 Web 视图。

点击 `Settings` > `Remote Logging` 开启此功能。

:::note
远程日志会安装依赖项 `@ionic/remote-log` 并修改你的 `main.ts` 或 `index.tsx` 文件以启动远程日志。测试完成后请取消勾选 `Remote Logging` 以移除相关代码。
:::