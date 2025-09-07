---
title: 创建 Capacitor 插件
description: 创建 Capacitor 插件指南
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: 概述
slug: /plugins/creating-plugins
---

# 创建 Capacitor 插件

Capacitor 插件能让 JavaScript 直接调用原生 API 接口。

本指南将帮助你创建可发布到 npm 的共享 Capacitor 插件。你也可以创建仅限当前应用使用的本地插件，请参阅 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的自定义原生代码指南。

## 设计理念

如果你计划开发面向公众的插件，在开始前我们想分享一些关于 Capacitor 插件的核心理念。

### 协作开发

我们相信协作开发能比竞争带来更高质量的插件。这也是我们创建 [Capacitor 社区 GitHub 组织](https://github.com/capacitor-community) 的原因之一，相比个人仓库托管插件，该组织能促进社区成员更便捷地协作。

如果 [Capacitor 社区](https://github.com/capacitor-community) 中已存在某个主题的插件，请考虑为其贡献代码！如果某个插件缺少主要维护者，Capacitor 团队很乐意邀请你加入 GitHub 组织。

### 功能精简

我们建议 Capacitor 插件应保持适当的功能精简度。插件为应用添加的原生代码不一定都会被使用。通过保持插件功能精简，可以确保应用只包含必要的原生代码。这能避免应用体积膨胀，以及因未使用的 API 导致的应用商店警告或拒绝等问题。

当然，功能精简还带来其他优势，如更快部署、更易协作、更易维护等。

### 统一规范

Capacitor 插件应努力为 JavaScript 开发者提供跨平台的统一开发体验。这意味着可能需要转换原生平台的返回值。

以下是通过示例说明如何创建统一规范体验的指导原则：

- **优先使用 `undefined` 而非 `null` 或其他空值**。示例：如果 Android API 返回 `0.0` 表示"无值"，则应在 JavaScript 层将其转换为 `undefined`
- **保持单位统一**。示例：如果 iOS API 使用摄氏度而 Android API 使用华氏度，应在数据到达 JavaScript 调用方前统一转换为其中一种单位
- **优先使用带时区的 ISO 8601 日期时间格式**。示例：从 `"2020-12-13T20:21:58.415Z"` 这样的字符串很容易获得准确的 JavaScript `Date` 对象，但 Unix 时间戳（JavaScript 时间戳使用毫秒）则可能造成混淆。务必包含时区信息，否则不同地区可能对日期时间做出错误解析

## 插件生成器

准备开始了吗？Capacitor 提供了 [插件生成器工具](https://github.com/ionic-team/create-capacitor-plugin) 帮助你快速创建插件。

> 继续之前，请确保你使用的是最新的 Node LTS 版本和 npm 6+。

在新终端中运行以下命令：

```bash
npm init @capacitor/plugin@latest
```

生成器会提示你输入信息。你也可以通过命令行参数指定选项（参见 [GitHub 仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 下一步

[了解 Capacitor 插件开发工作流程 &#8250;](/plugins/creating-plugins/development-workflow.md)

[学习构建 Android 平台插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[学习构建 iOS 平台插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[学习构建 Web/PWA 平台插件 &#8250;](/plugins/creating-plugins/web-guide.md)