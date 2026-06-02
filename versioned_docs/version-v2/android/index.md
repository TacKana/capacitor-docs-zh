---
title: Capacitor Android 文档
description: Capacitor Android 文档
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/android
---

# Capacitor Android 文档

Capacitor 提供了一个原生 Android 运行时，使开发者能够实现 JavaScript 与 Android Java 原生代码之间的通信。

Capacitor Android 应用通常通过 Android Studio 进行配置和管理。请遵循以下指南了解更多信息：

## 开始使用

开发 Android 应用需要安装一些 Android SDK 依赖项。请确保安装了 Android SDK Tools（需要 26.0.1 或更高版本），以及 API 21 或更高版本的 Android SDK Platforms。

您可以通过打开 Android Studio，然后从顶部菜单栏进入 Tools -> Android -> SDK Manager 轻松安装这些组件：

![SDK Platforms](../../../static/img/v3/docs/android/sdk-platforms.png)
![SDK Tools](../../../static/img/v3/docs/android/sdk-tools.png)

### 创建 Android 项目

默认情况下，每个 Capacitor 项目都会创建一个 Android 项目。如果您正在为现有项目添加 Capacitor，可以使用以下命令手动添加 Android 项目：

```bash
npx cap add android
npx cap sync
```

`sync` 命令会更新依赖项，并将 web 资源复制到您的项目中。您也可以运行：

```bash
npx cap copy
```

仅复制 web 资源，如果您知道不需要更新原生依赖项，这样会更快。

### 打开 Android 项目

要在 Android Studio 中打开项目，请运行：

```bash
npx cap open android
```

### 运行您的应用

> **注意：** 目前要使用 Android 模拟器，您必须使用至少 API 24 上 Android 7.0 的系统镜像。这是因为模拟器上的 System WebView 版本无法更新。只要物理设备的 System WebView 已更新，Android 5.0（API 21）及以上版本即可正常工作。

打开 Android Studio 后，您应该能够在设备或模拟器上运行您的应用。点击运行或调试：

![Running App](../../../static/img/v3/docs/android/running.png)

### 故障排除

如果您在以上过程中遇到任何问题，请通过在仓库中提交 issue 告知我们，并查阅 [Android 故障排除](/android/troubleshooting.md) 页面以获取常见 Android 问题的解决方案。

### 下一步

如果您的应用成功运行，现在可以继续开发和构建您的应用了。使用各种可用的 API、Capacitor 或 Cordova 插件，或自定义原生代码来完成应用的其余部分。

## 延伸阅读

请阅读以下 Android 专属指南，了解更多关于设置应用权限、更新依赖项、构建插件等信息：

[配置和设置 Android 权限 &#8250;](/android/configuration.md)

[构建 Android 原生插件 &#8250;](/plugins.md)