---
title: Build and Run
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/build-and-run
---

根据您的偏好以及您是想在网页浏览器中测试，还是在真实或模拟的移动设备上测试，有几种不同的方式来构建或运行您的应用。

:::tip
您可以按 `⌥` + R 来运行应用（在 Windows 上按 `ALT` + `R`）。
:::

## 网页测试
点击 `Run` > `Web` 以在默认网页浏览器中构建并启动应用。

:::note
您可以在 VS Code 编辑器内预览应用，方法是点击 `Web` 旁边的 `...` 并选择 `Open App in Editor`。
:::

## 设备测试

使用模拟器或真实移动设备进行测试可以通过以下方式之一完成：
- **原生 IDE** - 在 VS Code 扩展中点击 `Build`，然后在 XCode 或 Android Studio 中运行应用。
- **使用 VS Code** - 点击 `Run` > `iOS` 或 `Android`，选择要启动的设备。

## 实时重载

**实时重载** 功能允许您在移动设备上运行应用，并且每当在 VS Code 中进行代码更改并保存时，应用将重新加载。

要启用此功能，请点击 `Settings` > `Live Reload`

## 调试
您可以通过点击 `Debug` 项目并选择以下选项来进行调试（使用断点、检查变量等）：
- **`Web`** - 启动 Chrome 或 Edge 并开始调试会话。
- **`Android`** - 附加到正在运行的 Android WebView 并开始调试会话。
- **`iOS`** - VS Code 目前不支持 iOS 调试。您可以使用 [Safari](debugging#use-safari)。

## 使用 HTTPS

此功能（`Settings` > `Use HTTPS`）将创建一个证书并使用 HTTPS 提供您的应用。同时会显示在网页、iOS 和 Android 上信任该证书的说明。

如果您进行需要 [安全上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) 的 Web API 调用，例如 [Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)，则需要通过 `HTTPS` 提供应用。

:::note
此功能目前仅适用于 Angular 项目，并且由于 Android WebView 不信任用户安装的 CA 证书的特性，会临时安装 [一个插件](https://github.com/jcesarmobile/ssl-skip)。
:::