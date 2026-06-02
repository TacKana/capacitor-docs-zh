---
title: 构建和运行
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/build-and-run
---

根据您的偏好以及您是想在 Web 浏览器中测试，还是在真实或模拟的移动设备上测试，有几种不同的方式来构建或运行您的应用。

## Web 测试
点击 `Run` > `Web` 以构建并在默认浏览器中启动。

:::note
您可以通过点击 `Web` 旁边的 `...` 并选择 `Open App in Editor`，在 VS Code 编辑器内部预览您的应用。
:::

## 设备测试

使用模拟器或真实移动设备进行测试可以通过以下方式之一完成：
- **原生 IDE** - 点击 VS Code 扩展中的 `Build`，然后在 XCode 或 Android Studio 中运行应用。
- **使用 VS Code** - 点击 `Run` > `iOS` 或 `Android`，选择要启动的设备。

## Live Reload

**Live Reload** 功能允许您在移动设备上运行应用，每当在 VS Code 中修改代码并保存时，它将自动重新加载应用程序。

要开启此功能，请点击 `Settings` > `Live Reload`

## 调试
您可以通过点击 `Debug` 项目并选择以下选项来进行调试（使用断点、检查变量等）：
- **`Web`** - 启动 Chrome 或 Edge 并开始调试会话。
- **`Android`** - 附加到正在运行的 Android web view 并开始调试会话。
- **`iOS`** - VS Code 目前不支持 iOS。您可以使用 [Safari](debugging#使用-safari)。

## 使用 HTTPS

该功能（`Settings` > `Use HTTPS`）将创建一个证书并通过 HTTPS 提供您的应用。系统会显示在 Web、iOS 和 Android 上信任该证书的说明。

如果您需要进行需要[安全上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)的 Web API 调用（如 [Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)），则需要通过 `HTTPS` 提供您的应用。

:::note
此功能目前仅适用于 Angular 项目，并且由于 Android web view 不信任用户安装的 CA 证书的 quirck，会临时安装[一个插件](https://github.com/jcesarmobile/ssl-skip)。
:::
