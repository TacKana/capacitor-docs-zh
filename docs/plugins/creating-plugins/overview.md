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

本指南将帮助你开始创建一个可共享的 Capacitor 插件，该插件将发布在 npm 上。你也可以创建仅限应用内部使用的本地 Capacitor 插件。请参阅 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的自定义原生代码指南。

## 设计理念

如果你的插件面向公众，在开始之前，我们有一些关于 Capacitor 插件的理念想与你分享。

### 协作共赢

我们相信协作比竞争更能产出高质量的插件。这也是我们创建 [Capacitor 社区 GitHub 组织](https://github.com/capacitor-community) 的原因之一，它比将插件托管在个人仓库中更能促进社区间的轻松协作。

如果 [Capacitor 社区](https://github.com/capacitor-community) 中已经存在针对特定主题的插件，请考虑为其做出贡献！如果某个插件缺少主要维护者，Capacitor 团队很乐意考虑将你添加到 GitHub 组织中。

### 小而精

我们认为 Capacitor 插件的范围应该合理的小。Capacitor 插件会向应用中添加可能用不到的原生代码。通过保持插件的范围小巧，我们可以确保应用只包含所需的最小量原生代码。这能避免不必要的应用臃肿，以及因未使用的 API 缺乏使用描述等原因导致的 App Store 警告或拒绝。

当然，保持小巧范围还能带来其他好处，如更快的部署、更轻松的协作、更好的可维护性等。

### 统一且符合习惯

Capacitor 插件应努力为 JavaScript 开发者提供跨平台的统一且熟悉的体验。这意味着来自原生平台的值可能需要进行适当转换。

以下是一些指导原则和示例，展示了如何创建统一且符合习惯的体验：

- **优先使用 `undefined` 而不是 `null` 或其他非值。** 示例：如果某个 Android API 返回 `0.0` 表示“无值”，那么在 JavaScript 层应将该值转换为 `undefined`。
- **优先使用统一的单位。** 示例：如果某个 iOS API 使用摄氏度而某个 Android API 使用华氏度，那么在值到达 JavaScript 使用者之前，应将其转换为其中一种单位。
- **优先使用带时区的 ISO 8601 日期时间格式而非其他格式。** 示例：从像 `"2020-12-13T20:21:58.415Z"` 这样的字符串获取准确的 JavaScript `Date` 对象很容易，但如果给的是一个 Unix 时间戳（JavaScript 时间戳以毫秒为单位）就会令人困惑。请务必包含时区，否则不同地区的日期时间可能被不准确地解析。

## 插件生成器 {#plugin-generator}

准备开始了吗？Capacitor 提供了一个 [插件生成器](https://github.com/ionic-team/create-capacitor-plugin)，你可以用它来开始开发你的插件。

> 在继续之前，你可能需要确保你正在使用最新的 Node LTS 版本和 npm 6+。

在新的终端中，运行以下命令：

```bash
npm init @capacitor/plugin@latest
```

生成器会提示你输入信息。你也可以提供命令行选项（参见 [GitHub 仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 后续步骤

[了解 Capacitor 插件开发工作流程 &#8250;](/plugins/creating-plugins/development-workflow.md)

[了解为 Capacitor 构建 Android 插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[了解为 Capacitor 构建 iOS 插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[了解为 Capacitor 构建 Web/PWA 插件 &#8250;](/plugins/creating-plugins/web-guide.md)