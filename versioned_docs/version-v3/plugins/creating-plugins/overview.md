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

Capacitor 中的插件使得 JavaScript 能够直接与原生 API 进行交互。

本指南将帮助你开始创建一个可在 npm 上发布的、可共享的 Capacitor 插件。你也可以创建仅用于自己应用内部的 Capacitor 插件。请参阅针对 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的自定义原生代码指南。

## 核心理念

如果你的插件是面向公众的，在开始之前，我们有一些关于 Capacitor 插件的理念想与你分享。

### 协作共赢

我们相信协作将比竞争产生更高质量的插件。这也是我们创建 [Capacitor Community GitHub 组织](https://github.com/capacitor-community) 的原因之一，相比将插件托管在个人仓库中，它能更便捷地促进社区间的协作。

如果 [Capacitor Community](https://github.com/capacitor-community) 中已经存在针对某个特定主题的插件，请考虑为其做出贡献！如果某个插件缺少主要维护者，Capacitor 团队很乐意考虑将你添加到 GitHub 组织中。

### 小而精

我们相信 Capacitor 插件应该保持合理的、较小的范围。Capacitor 插件为应用添加了可能用也可能不用的原生代码。通过保持插件的范围较小，我们可以确保应用只包含其所需的最少量的原生代码。这避免了不必要的应用臃肿，以及由于未使用 API 的描述等原因而导致的应用商店警告或拒绝。

当然，保持较小范围还能带来其他好处，例如更快的部署、更轻松的协作、更好的可维护性等。

### 统一且符合习惯

Capacitor 插件应努力为熟悉 JavaScript 的开发人员提供跨平台的统一体验。这意味着来自原生平台的值可能需要进行转换。

以下是一些指导原则和示例，展示了如何创建统一且符合习惯的体验：

- **倾向于使用 `undefined` 而不是 `null` 或其他表示“无值”的方式。** 示例：如果 Android API 返回 `0.0` 来表示“无值”，那么在到达 JavaScript 层之前，该值应转换为 `undefined`。
- **倾向于使用相同的单位。** 示例：如果 iOS API 使用摄氏度而 Android API 使用华氏度，那么在值到达 JavaScript 使用者之前，应将其转换为其中一种单位。
- **倾向于使用带时区的 ISO 8601 日期时间格式，而不是其他格式。** 示例：从像 `"2020-12-13T20:21:58.415Z"` 这样的字符串很容易获得准确的 JavaScript `Date` 对象，但如果给出 Unix 时间戳（JavaScript 时间戳以毫秒为单位）则会令人困惑。始终包含时区，否则日期时间可能会因不同地区而被错误解析。

## 插件生成器 {#plugin-generator}

准备好开始了吗？Capacitor 有一个 [插件生成器](https://github.com/ionic-team/create-capacitor-plugin)，你可以用它来开始开发你的插件。

> 继续之前，你可能需要确保你正在使用最新的 Node LTS 版本和 npm 6 以上版本。

在新的终端中，运行以下命令：

```bash
npm init @capacitor/plugin
```

生成器将提示你输入信息。你也可以提供命令行选项（请参阅 [GitHub 仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 后续步骤

[了解 Capacitor 插件开发工作流程 &#8250;](/plugins/creating-plugins/development-workflow.md)

[了解如何为 Capacitor 构建 Android 插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[了解如何为 Capacitor 构建 iOS 插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[了解如何为 Capacitor 构建 Web/PWA 插件 &#8250;](/plugins/creating-plugins/web-guide.md)