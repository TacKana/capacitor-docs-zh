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

本指南将帮助您开始创建一个可共享的 Capacitor 插件，该插件将发布在 npm 上。您也可以创建专用于应用本地的 Capacitor 插件。请参阅 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的自定义原生代码指南。

## 设计理念

如果您的插件面向公众发布，在开始之前，我们想分享一些关于 Capacitor 插件的理念。

### 协同合作

我们相信协作比竞争能产出更高质量的插件。这也是我们创建 [Capacitor 社区 GitHub 组织](https://github.com/capacitor-community) 的原因之一，与个人仓库相比，它更便于社区内的合作。

如果 [Capacitor 社区](https://github.com/capacitor-community) 中已有某个特定主题的插件，请考虑为其贡献代码！如果某个插件缺少主要维护者，Capacitor 团队很乐意考虑将您加入该 GitHub 组织。

### 小而精

我们相信 Capacitor 插件应保持合理的精简范围。插件向应用添加的原生代码可能被使用，也可能不被使用。通过保持插件的精简，我们可以确保应用包含最必需的原生代码。这避免了不必要的应用膨胀，以及因未使用 API 描述等问题导致的 App Store 警告或拒绝。

当然，保持精简范围还有其他好处，例如更快的部署、更轻松的合作、更好的可维护性等。

### 统一且符合习惯

Capacitor 插件应努力提供跨平台的统一体验，并符合 JavaScript 开发者的习惯。这意味着可能需要将原生平台的值进行转换。

以下是一些示例指南，展示了如何创建统一且符合习惯的体验：

- **优先使用 `undefined` 而非 `null` 或其他无意义值。** 例如：如果 Android API 返回 `0.0` 表示“无值”，那么在传递给 JavaScript 层之前，应将该值转换为 `undefined`。
- **优先使用统一的单位。** 例如：如果 iOS API 使用摄氏度而 Android API 使用华氏度，那么在提供给 JavaScript 使用者之前，应将值统一转换为其中一种单位。
- **优先使用带时区的 ISO 8601 日期时间格式。** 例如：从类似 `"2020-12-13T20:21:58.415Z"` 的字符串可以轻松获得准确的 JavaScript `Date` 对象，但如果给出 Unix 时间戳（JavaScript 时间戳以毫秒为单位）则容易混淆。始终包含时区信息，否则不同地区的日期时间可能会被错误解析。

## 插件生成器

准备好开始了吗？Capacitor 提供了 [一个插件生成器](https://github.com/ionic-team/create-capacitor-plugin)，您可以使用它来开始开发您的插件。

> 在继续之前，您可能需要确保您使用的是最新的 Node LTS 版本和 npm 6+。

在新的终端中，运行以下命令：

```bash
npm init @capacitor/plugin@latest
```

生成器将提示您输入信息。您也可以提供命令行选项（参见 [GitHub 仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 下一步

[了解 Capacitor 插件开发工作流程 &#8250;](/plugins/creating-plugins/development-workflow.md)

[了解为 Capacitor 构建 Android 插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[了解为 Capacitor 构建 iOS 插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[了解为 Capacitor 构建 Web/PWA 插件 &#8250;](/plugins/creating-plugins/web-guide.md)