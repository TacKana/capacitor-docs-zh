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

Capacitor 中的插件使 JavaScript 能够直接与原生 API 进行交互。

本指南将帮助您开始创建可共享的 Capacitor 插件，该插件将发布到 npm。您也可以创建特定于应用的本地 Capacitor 插件。请参阅 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的自定义原生代码指南。

## 理念

如果您的插件面向公众，我们在您开始之前有几点关于 Capacitor 插件的理念要分享。

### 协作共赢

我们相信合作将比竞争产生更高质量的插件。这是我们创建 [Capacitor Community GitHub 组织](https://github.com/capacitor-community) 的原因之一，与将插件托管在个人仓库相比，它促进了社区之间更轻松的合作。

如果在 [Capacitor Community](https://github.com/capacitor-community) 中存在针对某个特定主题的插件，请考虑为其做出贡献！如果某个插件缺少主要维护者，Capacitor 团队将很乐意考虑将您添加到 GitHub 组织中。

### 范围适中

我们相信 Capacitor 插件的范围应该适中。Capacitor 插件向应用中添加了可能使用也可能不使用的原生代码。通过保持插件的小范围，我们可以确保应用拥有最少的必要原生代码。这避免了不必要的应用臃肿，以及因 API 缺少使用描述等导致的 App Store 警告/拒绝。

当然，小范围还带来了其他好处，如更快速的部署、更轻松的协作、可维护性等。

### 统一且惯用

Capacitor 插件应努力在跨平台提供统一的体验，这种体验对 JavaScript 开发者来说是熟悉的。这意味着来自原生平台的值可能需要进行强制转换。

以下是一些指导原则和示例，演示如何创建统一且惯用的体验：

- **优先使用 `undefined` 而非 `null` 和其他非值。** 示例：如果 Android API 返回 `0.0` 表示"无值"，则该值应被强制转换为 `undefined` 以供 JavaScript 层使用。
- **优先使用相同的单位。** 示例：如果 iOS API 使用摄氏度而 Android API 使用华氏度，则该值在到达 JavaScript 使用者之前应被强制转换为其中一种。
- **优先使用带时区的 ISO 8601 日期时间格式而非其他格式。** 示例：从像 `"2020-12-13T20:21:58.415Z"` 这样的字符串中获取准确的 JavaScript `Date` 很容易，但如果给的是 Unix 时间戳（JavaScript 时间戳以毫秒为单位）则会令人困惑。始终包含时区，否则不同地区的日期时间可能会被不准确地解释。

## 插件生成器

准备好了吗？Capacitor 有[一个插件生成器](https://github.com/ionic-team/create-capacitor-plugin)，您可以使用它开始开发插件。

> 在继续之前，您可能希望确保使用的是最新的 Node LTS 版本和 npm 6+。

在一个新的终端中，运行以下命令：

```bash
npm init @capacitor/plugin@latest
```

生成器会提示您输入信息。您也可以提供命令行选项（请参阅 [GitHub 仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 下一步

[了解 Capacitor 插件开发工作流 &#8250;](/plugins/creating-plugins/development-workflow.md)

[了解如何为 Capacitor 构建 Android 插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[了解如何为 Capacitor 构建 iOS 插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[了解如何为 Capacitor 构建 Web/PWA 插件 &#8250;](/plugins/creating-plugins/web-guide.md)
