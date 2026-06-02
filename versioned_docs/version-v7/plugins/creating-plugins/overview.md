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

本指南将帮助你开始创建一个可共享的 Capacitor 插件，该插件将发布到 npm。你也可以创建应用本地的 Capacitor 插件。请参阅 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的自定义原生代码指南。

## 设计理念

如果你的插件打算面向公众，我们在你开始之前有一些关于 Capacitor 插件的设计理念需要分享。

### 合作共赢

我们相信合作比竞争能产生更高质量的插件。这是我们创建 [Capacitor Community GitHub 组织](https://github.com/capacitor-community) 的原因之一，与插件托管在个人仓库中相比，该组织促进了社区间更轻松的合作。

如果 [Capacitor Community](https://github.com/capacitor-community) 中已经存在某个主题的插件，请考虑为其做出贡献！如果某个插件缺少主要维护者，Capacitor 团队很乐意考虑将你添加到 GitHub 组织中。

### 范围精简

我们相信 Capacitor 插件的范围应该合理精简。Capacitor 插件会向应用中添加可能使用也可能不使用的原生代码。通过保持插件范围精简，我们可以确保应用只包含最少的必要原生代码。这避免了不必要的应用臃肿以及因 API 缺少使用描述等原因导致的 App Store 警告或拒绝。

当然，范围精简还有其他好处，如更快的部署、更轻松的合作、更好的可维护性等。

### 统一且符合习惯

Capacitor 插件应努力在跨平台之间提供对 JavaScript 开发者来说熟悉的统一体验。这意味着原生平台的值可能需要进行类型转换。

以下是一些示例指南，演示如何创建统一且符合习惯的体验：

- **优先使用 `undefined` 而非 `null` 和其他非值。** 示例：如果 Android API 返回 `0.0` 表示"无值"，则该值应转换为 `undefined` 再传递给 JavaScript 层。
- **优先使用相同的单位。** 示例：如果 iOS API 使用摄氏度而 Android API 使用华氏度，则该值应在到达 JavaScript 消费者之前转换为其中一种单位。
- **优先使用带时区的 ISO 8601 日期时间格式而非其他格式。** 示例：从像 `"2020-12-13T20:21:58.415Z"` 这样的字符串可以轻松获取准确的 JavaScript `Date` 对象，但如果给定 Unix 时间戳（JavaScript 时间戳以毫秒为单位）则会令人困惑。始终包含时区，否则日期时间可能会因不同地区而被不准确地解析。

## 插件生成器

准备好了吗？Capacitor 有一个[插件生成器](https://github.com/ionic-team/create-capacitor-plugin)，你可以用它开始开发你的插件。

> 在继续之前，你可能需要确保你正在使用最新的 Node LTS 版本和 npm 6+。

在新终端中，运行以下命令：

```bash
npm init @capacitor/plugin@latest
```

生成器将提示你输入信息。你也可以提供命令行选项（请参阅 [GitHub 仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 下一步

[了解 Capacitor 插件开发工作流 &#8250;](/plugins/creating-plugins/development-workflow.md)

[了解如何构建 Capacitor Android 插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[了解如何构建 Capacitor iOS 插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[了解如何构建 Capacitor Web/PWA 插件 &#8250;](/plugins/creating-plugins/web-guide.md)
