---
title: 构建和运行
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/build-and-run
---

根据你的偏好以及你是想在 Web 浏览器中测试，还是想在真实或模拟的移动设备上测试，有几种不同的方式来构建或运行你的应用。

:::tip
你可以按 `⌥` + R 来运行你的应用（Windows 上是 `ALT` + `R`）。
:::

## 在 Web 上测试
点击 `Run` > `Web` 以构建并在默认 Web 浏览器中启动。

:::note
你可以点击 `Web` 旁边的 `...` 并选择`在编辑器中打开应用`，在 VS Code 编辑器内部预览你的应用。
:::

## 在设备上测试

使用模拟器或真实移动设备进行测试可以通过以下方式之一完成：
- **原生 IDE** - 在 VS Code 扩展中点击 `Build`，然后在 XCode 或 Android Studio 中运行应用。
- **使用 VS Code** - 点击 `Run` > `iOS` 或 `Android`，选择要启动的设备。

## 实时重载

**实时重载**功能允许你在移动设备上运行应用，每当在 VS Code 中更改代码并保存时，应用将自动重新加载。

要开启此功能，请点击 `Settings` > `Live Reload`

## 调试
你可以通过点击 `Debug` 项并选择以下选项进行调试（使用断点、检查变量等）：
- **`Web`** - 启动 Chrome 或 Edge 并开始调试会话。
- **`Android`** - 附加到正在运行的 Android Web 视图并开始调试会话。
- **`iOS`** - VS Code 目前不支持 iOS。你可以使用 [Safari](debugging#使用-safari)。

## 使用 HTTPS

此功能（`Settings` > `Use HTTPS`）将创建证书并通过 HTTPS 提供你的应用服务。将显示如何在 Web、iOS 和 Android 上信任该证书的说明。

如果你进行的 Web API 调用需要[安全上下文](https://developer.mozilla.org/zh-CN/docs/Web/Security/Secure_Contexts)（如[地理位置](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/geolocation)），则必须通过 `HTTPS` 提供应用服务。

:::note
此功能目前仅适用于 Angular 项目，并且由于 Android Web 视图不信任用户安装的 CA 证书的特性，将临时安装[一个插件](https://github.com/jcesarmobile/ssl-skip)。
:::

