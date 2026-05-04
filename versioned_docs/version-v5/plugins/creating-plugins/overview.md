---
title: Creating Capacitor Plugins
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

本指南将帮助您开始创建一个可共享的 Capacitor 插件，该插件将发布在 npm 上。您也可以在您的应用中创建本地 Capacitor 插件。有关自定义原生代码，请参阅 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的指南。

## 核心理念

如果您的插件旨在面向公众，在开始之前，我们有一些关于 Capacitor 插件的理念想与您分享。

### 协作共赢

我们相信，协作将比竞争产生更高质量的插件。这也是我们创建 [Capacitor Community GitHub 组织](https://github.com/capacitor-community) 的原因之一，它比将插件托管在个人仓库中更容易促进社区内的协作。

如果 [Capacitor Community](https://github.com/capacitor-community) 中已存在某个特定主题的插件，请考虑为其做出贡献！如果某个插件缺少主要维护者，Capacitor 团队很乐意考虑将您添加到该 GitHub 组织中。

### 范围精简

我们认为 Capacitor 插件的范围应该合理精简。Capacitor 插件会向应用中添加可能用不到的原生代码。通过保持插件的范围精简，我们可以确保应用仅包含所需的最小原生代码量。这可以避免不必要的应用臃肿，以及因使用未声明用途的 API 等导致的 App Store 警告或拒绝。

当然，范围精简还能带来其他好处，例如更快的部署、更轻松的协作、更好的可维护性等。

### 统一且符合惯例

Capacitor 插件应努力提供跨平台的一致体验，并且对 JavaScript 开发者而言是熟悉的。这意味着可能需要转换来自原生平台的值。

以下是一些指导原则和示例，展示了如何创建统一且符合惯例的体验：

- **优先使用 `undefined` 而不是 `null` 和其他非值。** 例如：如果 Android API 返回 `0.0` 表示“无值”，那么该值在到达 JavaScript 层之前应转换为 `undefined`。
- **优先使用相同的单位。** 例如：如果 iOS API 使用摄氏度而 Android API 使用华氏度，那么在值到达 JavaScript 使用者之前，应将其转换为其中一种单位。
- **优先使用带时区的 ISO 8601 日期时间格式，而不是其他格式。** 例如：从像 `"2020-12-13T20:21:58.415Z"` 这样的字符串很容易获得准确的 JavaScript `Date` 对象，但如果给出 Unix 时间戳（JavaScript 时间戳单位是毫秒）则会令人困惑。始终包含时区，否则不同地区的日期时间可能会被错误解析。

## 插件生成器 {#plugin-generator}

准备开始了吗？Capacitor 有一个 [插件生成器](https://github.com/ionic-team/create-capacitor-plugin)，您可以使用它来开始开发您的插件。

> 在继续之前，您可能需要确保您使用的是最新的 Node LTS 版本和 npm 6+。

在新的终端中，运行以下命令：

```bash
npm init @capacitor/plugin@latest
```

生成器会提示您输入信息。您也可以提供命令行选项（请参阅 [GitHub 仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 后续步骤

[了解 Capacitor 插件开发工作流程 &#8250;](/plugins/creating-plugins/development-workflow.md)

[了解如何为 Capacitor 构建 Android 插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[了解如何为 Capacitor 构建 iOS 插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[了解如何为 Capacitor 构建 Web/PWA 插件 &#8250;](/plugins/creating-plugins/web-guide.md)