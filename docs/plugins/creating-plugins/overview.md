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

本指南将帮助您开始创建可共享的 Capacitor 插件，并将其发布到 npm。您也可以创建仅用于您应用的本地 Capacitor 插件。请参阅 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的自定义原生代码指南。

## 设计理念

如果您的插件打算公开发布，我们在开始之前有一些关于 Capacitor 插件的设计理念与您分享。

### 协作共赢

我们相信协作能够产生比竞争更高质量的插件。这也是我们创建 [Capacitor Community GitHub 组织](https://github.com/capacitor-community) 的原因之一，与将插件托管在个人仓库相比，该组织促进了社区内更便捷的协作。

如果 [Capacitor Community](https://github.com/capacitor-community) 中已存在某个主题的插件，请考虑为其做出贡献！如果某个插件缺少主要维护者，Capacitor 团队很乐意考虑将您添加到该 GitHub 组织中。

### 范围精简

我们相信 Capacitor 插件的范围应该尽可能地精简。Capacitor 插件会向应用中添加原生代码，而这些代码可能被使用也可能不被使用。通过保持插件范围的精简，我们可以确保应用只包含最少的必要原生代码。这可以避免不必要的应用膨胀，以及因 API 缺少使用说明等原因导致的 App Store 警告/拒绝。

当然，范围精简还能带来其他好处，例如更快的部署、更轻松的协作、更好的可维护性等。

### 统一且符合习惯

Capacitor 插件应力求在跨平台提供统一的体验，并且对 JavaScript 开发者来说符合习惯。这意味着来自原生平台的值可能需要进行转换。

以下是一些指南和示例，展示如何创建统一且符合习惯的体验：

- **优先使用 `undefined` 而非 `null` 和其他非值。** 示例：如果某个 Android API 返回 `0.0` 表示"无值"，则该值应转换为 `undefined` 再传递给 JavaScript 层。
- **优先使用相同的单位。** 示例：如果 iOS API 使用摄氏度而 Android API 使用华氏度，则该值应统一转换为其中一种单位后再传递给 JavaScript 使用者。
- **优先使用带时区的 ISO 8601 日期时间格式。** 示例：从 `"2020-12-13T20:21:58.415Z"` 这样的字符串可以轻松获取准确的 JavaScript `Date`，但如果使用 Unix 时间戳则会令人困惑（JavaScript 时间戳以毫秒为单位）。始终包含时区，否则日期时间可能会因不同区域设置而被错误解析。

## 插件生成器

准备好开始了吗？Capacitor 提供了[插件生成器](https://github.com/ionic-team/create-capacitor-plugin)，您可以使用它来开始开发插件。

> 在继续之前，您可能需要确保使用的是最新的 Node LTS 版本和 npm 6+。

在新的终端中，运行以下命令：

```bash
npm init @capacitor/plugin@latest
```

生成器会提示您输入信息。您也可以提供命令行选项（请参阅 [GitHub 仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 后续步骤

[了解 Capacitor 插件开发工作流程 &#8250;](/plugins/creating-plugins/development-workflow.md)

[了解构建 Capacitor Android 插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[了解构建 Capacitor iOS 插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[了解构建 Capacitor Web/PWA 插件 &#8250;](/plugins/creating-plugins/web-guide.md)
