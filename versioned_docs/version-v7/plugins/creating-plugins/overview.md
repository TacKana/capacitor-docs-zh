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

本指南将帮助你开始创建可分享的 Capacitor 插件（可发布到 npm）。你也可以创建仅供当前应用使用的本地插件，具体请参阅 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的自定义原生代码指南。

## 设计理念

如果你的插件计划公开分享，在开始前我们想分享一些关于 Capacitor 插件的核心理念。

### 协作开发

我们相信合作比竞争更能产出高质量的插件。这也是我们创建 [Capacitor 社区 GitHub 组织](https://github.com/capacitor-community) 的原因之一，相比个人仓库托管插件，社区组织能更便利地促进协作。

如果 [Capacitor 社区](https://github.com/capacitor-community) 已存在某个功能的插件，请考虑为其贡献代码！如果某插件缺少主要维护者，Capacitor 团队很乐意邀请你加入 GitHub 组织。

### 功能精简

我们主张 Capacitor 插件应保持合理的功能范围。插件添加的原生代码可能被使用也可能闲置。通过保持插件功能精简，可以确保应用只包含必要的原生代码，避免以下问题：
- 不必要的应用体积膨胀
- 应用商店因未使用的 API 描述缺失而发出警告/拒绝上架

当然，功能精简还能带来部署更快、协作更容易、可维护性更高等优势。

### 统一与规范

Capacitor 插件应力求为 JavaScript 开发者提供跨平台的统一使用体验，这意味着可能需要转换原生平台返回值。

以下是一些创建统一规范体验的指导原则及示例：
- **优先使用 `undefined` 而非 `null` 等特殊值**：例如 Android API 返回 `0.0` 表示"无值"时，应将其转换为 JavaScript 层的 `undefined`
- **保持计量单位统一**：例如 iOS API 使用摄氏度而 Android API 使用华氏度，应在数据到达 JavaScript 调用方前统一转换
- **优先采用带时区的 ISO 8601 时间格式**：例如从 `"2020-12-13T20:21:58.415Z"` 这样的字符串可以轻松获得准确的 JavaScript `Date` 对象，而 Unix 时间戳（JavaScript 使用毫秒）则容易造成混淆。务必包含时区信息，否则不同地区可能对时间产生错误解读

## 插件生成器

准备开始了？Capacitor 提供了 [插件生成工具](https://github.com/ionic-team/create-capacitor-plugin) 帮助你快速搭建插件结构。

> 开始前请确保你使用的是最新的 Node LTS 版本和 npm 6+

在新终端中运行以下命令：

```bash
npm init @capacitor/plugin@latest
```

生成器将提示你输入信息。你也可以使用命令行参数（参见 [GitHub 仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 下一步

[了解 Capacitor 插件开发工作流程 &#8250;](/plugins/creating-plugins/development-workflow.md)

[学习构建 Android 平台插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[学习构建 iOS 平台插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[学习构建 Web/PWA 平台插件 &#8250;](/plugins/creating-plugins/web-guide.md)