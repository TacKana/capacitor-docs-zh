---
title: 创建 Capacitor 插件
description: 开发 Capacitor 插件指南
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: 概述
slug: /plugins/creating-plugins
---

# 创建 Capacitor 插件

Capacitor 插件能让 JavaScript 直接调用原生平台 API。

本指南将帮助你开始创建一个可发布到 npm 的共享 Capacitor 插件。你也可以为应用创建本地插件，具体参考 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的自定义原生代码指南。

## 设计理念

如果你计划开发公开插件，我们有一些关于 Capacitor 插件的核心理念需要分享。

### 协作开发

我们相信协作能比竞争产生更高质量的插件。这正是我们创建 [Capacitor 社区 GitHub 组织](https://github.com/capacitor-community) 的原因之一，相比个人仓库，该组织能更便捷地促进社区协作。

如果 [Capacitor 社区](https://github.com/capacitor-community) 中已存在某个功能的插件，请考虑为其贡献代码！若某个插件缺少主要维护者，Capacitor 团队很乐意邀请你加入 GitHub 组织。

### 小而专注

我们建议 Capacitor 插件应保持合理的功能范围。插件会为应用添加可能用不到的原生代码，保持小巧的体积能确保应用只包含必要的原生代码，避免不必要的应用膨胀，以及应用商店因未使用的 API 描述等问题发出的警告或拒绝。

当然，小巧的插件还能带来更快的部署、更轻松的协作、更好的可维护性等优势。

### 统一与符合习惯

Capacitor 插件应致力于为 JavaScript 开发者提供跨平台的统一体验，这意味着可能需要转换原生平台返回的值。

以下是通过示例说明如何创建统一且符合习惯的体验：

- **优先使用 `undefined` 而非 `null` 或其他空值**。例如：若 Android API 返回 `0.0` 表示"无值"，应将其转换为 JavaScript 层的 `undefined`。
- **保持单位一致**。例如：若 iOS API 使用摄氏度而 Android API 使用华氏度，应在数据到达 JavaScript 前统一转换。
- **优先使用带时区的 ISO 8601 时间格式**。例如：从 `"2020-12-13T20:21:58.415Z"` 这样的字符串可以准确获取 JavaScript `Date` 对象，而 Unix 时间戳（JavaScript 使用毫秒）则容易造成混淆。务必包含时区，否则不同地区可能对时间产生不同解读。

## 插件生成器

准备好开始了吗？Capacitor 提供 [插件生成器](https://github.com/ionic-team/create-capacitor-plugin) 帮助你快速搭建插件项目。

> 继续之前，请确保你使用的是最新的 Node LTS 版本和 npm 6+。

在新终端中运行以下命令：

```bash
npm init @capacitor/plugin
```

生成器会提示你输入信息。你也可以通过命令行参数指定选项（参见 [GitHub 仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 后续步骤

[了解 Capacitor 插件开发工作流程 &#8250;](/plugins/creating-plugins/development-workflow.md)

[学习构建 Android 平台插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[学习构建 iOS 平台插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[学习构建 Web/PWA 平台插件 &#8250;](/plugins/creating-plugins/web-guide.md)