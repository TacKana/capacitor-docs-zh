---
title: 构建与运行
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/build-and-run
---

根据您的偏好以及是否希望在 Web 浏览器、真实移动设备或模拟器中进行测试，有几种不同的方式来构建或运行您的应用。

:::tip
您可以按 `⌥` + R 来运行应用（Windows 系统为 `ALT` + `R`）。
:::

## Web 测试
点击 `运行` > `Web`，即可在默认的 Web 浏览器中构建并启动应用。

:::note
您可以通过点击 `Web` 旁的 `...` 并选择 `在编辑器中打开应用`，在 VS Code 编辑器内预览应用。
:::

## 设备测试

使用模拟器或真实移动设备进行测试可以通过以下方式之一实现：
- **原生 IDE** - 在 VS Code 扩展中点击 `构建`，然后在 XCode 或 Android Studio 中运行应用。
- **使用 VS Code** - 点击 `运行` > `iOS` 或 `Android`，选择要启动的设备。

## 实时重载

**实时重载**功能允许您在移动设备上运行应用，每当在 VS Code 中进行代码更改并保存时，应用将重新加载。

要开启此功能，请点击 `设置` > `实时重载`

## 调试
您可以通过点击 `调试` 项并选择以下选项来进行调试（使用断点、检查变量等）：
- **`Web`** - 启动 Chrome 或 Edge 并开始调试会话。
- **`Android`** - 附加到正在运行的 Android WebView 并开始调试会话。
- **`iOS`** - VS Code 目前不支持 iOS 调试。您可以使用 [Safari](debugging#use-safari) 进行调试。

## 使用 HTTPS

此功能（`设置` > `使用 HTTPS`）将创建证书并使用 HTTPS 提供您的应用。界面上会显示在 Web、iOS 和 Android 上信任证书的说明。

如果您需要调用要求[安全上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)的 Web API（如[地理位置](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)），则必须通过 `HTTPS` 提供应用。

:::note
此功能目前仅适用于 Angular 项目，并且由于 Android WebView 不信任用户安装的 CA 证书的特殊性，会临时安装[一个插件](https://github.com/jcesarmobile/ssl-skip)。
:::