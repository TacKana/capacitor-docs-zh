---
title: Build and Run
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/build-and-run
---

根据个人偏好以及测试环境（网页浏览器、真实移动设备或模拟器）的不同，您可以通过多种方式构建或运行应用。

## 网页端测试
点击 `Run` > `Web` 可在默认浏览器中构建并启动应用。

:::note
点击 `Web` 旁的 `...` 并选择 `Open App in Editor`，即可在 VS Code 编辑器内预览应用。
:::

## 设备测试

通过模拟器或真实移动设备测试可通过以下任一方式实现：
- **原生 IDE** - 在 VS Code 扩展中点击 `Build`，然后在 XCode 或 Android Studio 中运行应用。
- **使用 VS Code** - 点击 `Run` > `iOS` 或 `Android`，选择目标设备启动。

## 实时重载

**实时重载**功能允许您在移动设备上运行应用，当 VS Code 中的代码变更保存后，应用会自动刷新。

启用此功能：点击 `Settings` > `Live Reload`

## 调试
通过点击 `Debug` 并选择以下选项进行调试（使用断点、检查变量等）：
- **`Web`** - 启动 Chrome 或 Edge 开始调试会话。
- **`Android`** - 附加到正在运行的 Android WebView 开始调试会话。
- **`iOS`** - 当前 VS Code 不支持 iOS 调试，可使用 [Safari](debugging#use-safari)。

## 使用 HTTPS

启用功能（`Settings` > `Use HTTPS`）将创建证书并通过 HTTPS 提供服务，同时显示网页/iOS/Android平台上信任证书的操作指南。

当调用需要[安全上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)的 Web API（如[地理位置](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)）时，必须通过 `HTTPS` 提供服务。

:::note
此功能目前仅适用于 Angular 项目，由于 Android WebView 不信任用户安装的 CA 证书的特殊性，会临时安装[此插件](https://github.com/jcesarmobile/ssl-skip)。
:::