---
title: Capacitor Android 文档
description: Capacitor Android 文档
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/android
---

# Capacitor Android 文档

Capacitor 提供了原生 Android 运行时环境，使开发者能够在 JavaScript 和 Android 原生 Java 代码之间进行通信。

一般来说，Capacitor Android 应用是通过 Android Studio 进行配置和管理的。请参阅以下指南获取各主题的详细信息：

## 快速开始

开发 Android 应用需要安装部分 Android SDK 依赖项。请确保安装 Android SDK Tools（要求 26.0.1 或更高版本）以及 API 21 或更高版本的 Android SDK Platforms。

您可以通过打开 Android Studio，从顶部菜单栏选择 Tools -> Android -> SDK Manager 轻松安装这些组件：

![SDK 平台](../../../static/img/v3/docs/android/sdk-platforms.png)
![SDK 工具](../../../static/img/v3/docs/android/sdk-tools.png)

### 创建 Android 项目

默认情况下，每个 Capacitor 项目都会创建一个对应的 Android 项目。如果您需要将 Capacitor 添加到现有项目中，可以手动执行以下命令添加 Android 项目：

```bash
npx cap add android
npx cap sync
```

`sync` 命令会更新依赖项并将所有 Web 资源复制到项目中。您也可以运行：

```bash
npx cap copy
```

仅复制 Web 资源，如果您确定不需要更新原生依赖项，这个命令执行速度更快。

### 打开 Android 项目

要在 Android Studio 中打开项目，请运行：

```bash
npx cap open android
```

### 运行应用

> **注意：** 当前使用 Android 模拟器时，必须使用 API 24 及以上（Android 7.0 或更高版本）的系统镜像。这是因为模拟器上的 System WebView 版本无法更新。物理设备只要 System WebView 保持更新，最低可支持 Android 5.0 (API 21)。

当 Android Studio 启动后，您就可以在设备或模拟器上运行应用了。点击 Run 或 Debug 按钮：

![运行应用](../../../static/img/v3/docs/android/running.png)

### 故障排除

如果您遇到上述任何问题，请通过仓库提交 issue 告知我们，然后查阅 [Android 故障排除](/android/troubleshooting.md) 页面获取常见问题的解决方案。

### 后续步骤

如果您的应用已经成功运行，接下来就可以继续开发和构建应用了。您可以使用各种可用的 API、Capacitor 或 Cordova 插件，或者编写自定义原生代码来完成应用的其余部分。

## 延伸阅读

请查阅以下 Android 专属指南，获取关于应用权限配置、依赖项更新、插件构建等更多信息：

[配置 Android 应用权限 &#8250;](/android/configuration.md)

[构建 Android 原生插件 &#8250;](/plugins.md)