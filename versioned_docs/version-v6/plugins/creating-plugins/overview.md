---
title: 创建 Capacitor 插件
description: 创建 Capacitor 插件
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: 概述
slug: /plugins/creating-plugins
---

# 创建 Capacitor 插件

Capacitor 中的插件使 JavaScript 能够直接与原生 API 交互。

本指南将帮助你入门创建可共享的 Capacitor 插件，并将其发布到 npm。你也可以创建仅限于应用本地使用的 Capacitor 插件。请参阅 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的自定义原生代码指南。

## 设计理念

如果你的插件是面向公开发布的，我们在开始之前有一些关于 Capacitor 插件的设计理念与你分享。

### 合作共赢

我们相信合作能产生比竞争更高质量的插件。这也是我们创建 [Capacitor Community GitHub 组织](https://github.com/capacitor-community) 的原因之一，该组织比个人仓库托管插件更能促进社区间的合作。

如果 [Capacitor Community](https://github.com/capacitor-community) 中已存在某个主题的插件，请考虑为其做出贡献！如果某个插件缺少主要维护者，Capacitor 团队很乐意考虑将你添加到该 GitHub 组织中。

### 范围适中

我们相信 Capacitor 插件应保持适中的范围。Capacitor 插件为应用添加了可能被使用也可能不被使用的原生代码。通过保持插件范围小巧，我们可以确保应用只包含最少的必要原生代码。这避免了不必要的应用臃肿，以及因 API 缺少使用说明等原因导致的 App Store 警告或拒绝。

当然，范围适中还能带来其他好处，如更快的部署、更轻松的合作、更好的可维护性等。

### 统一且惯用

Capacitor 插件应力求在跨平台间提供统一的、JavaScript 开发者熟悉的体验。这意味着可能需要转换来自原生平台的值。

以下是一些指南和示例，展示如何创建统一且惯用的体验：

- **优先使用 `undefined` 而非 `null` 和其他非值。** 例如：如果 Android API 返回 `0.0` 表示"无值"，则应在 JavaScript 层将该值转换为 `undefined`。
- **优先使用相同的单位。** 例如：如果 iOS API 使用摄氏度而 Android API 使用华氏度，则应在值到达 JavaScript 消费者之前将其转换为其中一种单位。
- **优先使用带时区的 ISO 8601 日期时间格式而非其他格式。** 例如：从类似 `"2020-12-13T20:21:58.415Z"` 的字符串可以轻松获取准确的 JavaScript `Date` 对象，但如果使用 Unix 时间戳（JavaScript 时间戳以毫秒为单位）则会令人困惑。始终包含时区，否则日期时间可能会因不同地区而被错误解析。

## 插件生成器

准备好开始了吗？Capacitor 有一个[插件生成器](https://github.com/ionic-team/create-capacitor-plugin)，你可以使用它来开始开发插件。

> 在继续之前，你可能需要确保使用的是最新的 Node LTS 版本和 npm 6+。

在新的终端中，运行以下命令：

```bash
npm init @capacitor/plugin@latest
```

生成器会提示你输入信息。你也可以提供命令行选项（请参见 [GitHub 仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 下一步

[了解 Capacitor 插件开发工作流 &#8250;](/plugins/creating-plugins/development-workflow.md)

[了解为 Capacitor 构建 Android 插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[了解为 Capacitor 构建 iOS 插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[了解为 Capacitor 构建 Web/PWA 插件 &#8250;](/plugins/creating-plugins/web-guide.md)
