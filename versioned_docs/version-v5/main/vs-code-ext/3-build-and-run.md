---
title: Build and Run
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/build-and-run
---

根据个人偏好以及测试环境（网页浏览器、真实移动设备或模拟器），有几种不同的方式来构建或运行您的应用。

:::tip
您可以按 `⌥` + R 来运行应用（Windows 上是 `ALT` + `R`）。
:::

## 网页测试
点击 `运行` > `网页` 可在默认浏览器中构建并启动应用。

:::note
如需在 VS Code 编辑器内预览应用，点击 `网页` 旁边的 `...` 并选择 `在编辑器中打开应用`。
:::

## 设备测试

通过模拟器或真实移动设备测试，可使用以下任一方式：
- **原生 IDE** - 先在 VS Code 扩展中点击 `构建`，然后在 XCode 或 Android Studio 中运行应用。
- **使用 VS Code** - 点击 `运行` > `iOS` 或 `Android`，选择目标设备启动。

## 实时重载

**实时重载**功能让您能在移动设备上运行应用，每当 VS Code 中的代码变更被保存时，应用会自动重新加载。

开启此功能：点击 `设置` > `实时重载`

## 调试
通过点击 `调试` 菜单项可选择调试方式（使用断点、检查变量等）：
- **`网页`** - 启动 Chrome 或 Edge 开始调试会话
- **`Android`** - 附加到正在运行的 Android WebView 开始调试会话
- **`iOS`** - 目前 VS Code 不支持 iOS 调试，可使用 [Safari](debugging#use-safari)

## 使用 HTTPS

通过 `设置` > `使用 HTTPS` 功能可创建证书并通过 HTTPS 提供服务，界面上会显示在网页、iOS 和 Android 上信任证书的操作指引。

如果您的应用需要调用要求[安全上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)的 Web API（如[地理定位](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)），则必须启用 `HTTPS` 服务选项。

:::note
此功能目前仅支持 Angular 项目，由于 Android WebView 不信任用户安装的 CA 证书的特殊性，会临时安装[一个插件](https://github.com/jcesarmobile/ssl-skip)。
:::