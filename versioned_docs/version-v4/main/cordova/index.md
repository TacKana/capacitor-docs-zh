---
title: 概述
description: Cordova 和 PhoneGap
slug: /cordova
---

# Cordova 和 PhoneGap

Apache Cordova（以及 Adobe PhoneGap）创建于 2008 年，是一个开源项目，使 Web 开发者能够使用他们的 HTML、CSS 和 JavaScript 内容为多种移动和桌面平台创建原生应用。

有关 Cordova 历史及其工作原理的更多详细信息，[请参见此处](https://ionicframework.com/resources/articles/what-is-apache-cordova)。

## 为什么创建了 Capacitor？

开源领域充满了在旧项目思想基础上构建的新项目，这些项目在不彻底改变原始产品的情况下实现了实质性的改进。Ionic 团队不想出于技术和政治原因试图将这些激进的改变强行引入 Cordova。

Capacitor 项目的一个优势是 Ionic 团队对技术栈有更多的控制权。当你使用 Ionic Framework 和 Capacitor 构建应用时，Ionic 团队维护着原生运行时层、UI 组件以及创建组件的工具链（[Stencil](https://stenciljs.com/)）。这很重要，因为 Ionic 团队可以更快地进行修复，并提供更一致的技术栈。

## Capacitor 和 Cordova 的区别

在本质上，Capacitor 和 Cordova 非常相似。两者都管理 Web View，并提供将原生功能暴露给 Web 代码的结构化方式。然而，Capacitor 有几个关键区别，要求之前习惯 Cordova 方式的 Web 开发者改变应用开发工作流。

### 原生项目管理

Capacitor 将每个平台项目视为**源代码资产**而不是**构建时资产**。这意味着你需要将 Xcode 和 Android Studio 项目检入源代码管理，并在必要时使用这些 IDE 进行特定平台的配置和构建/测试。

这种方法的改变有几个含义。首先，Capacitor 不使用 `config.xml` 或类似的自定义配置来处理平台设置。相反，配置更改是通过直接编辑相应的平台特定配置文件来完成的，例如 Android 的 `AndroidManifest.xml` 和 iOS 的 `Info.plist`。Capacitor 确实有一些[高级配置选项](/main/basics/configuring-your-app.md)，但这些通常不修改原生功能，而是控制 Capacitor 的工具。

此外，Capacitor 不提供在命令行上构建原生应用的方式。应改用特定平台的工具（或 IDE），这提供了更快、更典型且符合该平台应用开发标准的体验。

虽然这些区别可能会让长期使用 Cordova 的用户感到担忧，但有一些值得注意的好处：

1. 通过 `config.xml` 等抽象工具更新和修改原生项目容易出错，且目标不断变化。熟悉特定平台的工具可以更轻松地进行故障排除。
2. 可以更轻松地添加应用所需的自定义原生代码，而无需在应用代码库之外构建专用插件。此外，原生团队可以与 Web 团队在同一个项目上协作。
3. 由于你"拥有"原生项目，因此可以更轻松地创建更引人注目的应用体验，例如为你的 Web 应用添加原生 UI 外壳。
4. 随着新的移动操作系统版本的发布，可以更好地了解原生项目的变更并提高应用的可维护性。当 Capacitor 引入重大更改或对原生项目模板进行更改时，团队将发布逐步升级说明，以确保更新过程尽可能顺畅。

### 插件管理

Capacitor 以不同于 Cordova 的方式管理插件。首先，Capacitor 在构建之前不会将插件源代码复制到你的应用中。相反，所有插件都作为"框架"（iOS 上）和"库"（Android 上）构建，并使用每个平台的主要依赖管理工具（分别是 CocoaPods 和 Gradle）进行安装。此外，Capacitor 不修改原生源代码，因此任何必需的原生项目设置都必须手动添加（例如，`AndroidManifest.xml` 中的权限）。我们认为这种方法不太容易出错，并使开发者更容易在社区中找到针对每个特定平台的帮助。

一个主要区别是插件处理它们所需的 JavaScript 代码的方式，以便从 WebView 执行。Cordova 要求插件自带 JavaScript 并手动调用 `exec()`。相比之下，Capacitor 根据在运行时检测到的原生方法注册并导出每个插件的所有 JavaScript，因此一旦 WebView 加载，所有插件方法都可用。一个重要的影响是：不再需要 `deviceready` 事件。一旦你的应用代码加载完成，你就可以开始调用插件方法。

虽然 Capacitor 不要求插件为 iOS 或 Android 提供 JavaScript，但插件在 JavaScript 中拥有共享逻辑是很常见的，这也很容易实现。

最后，Capacitor 对插件作者有影响。在 iOS 上，Swift 5 被官方支持甚至**推荐**用于构建插件（也支持 Objective-C）。插件不再导出 `Plugin.xml` 文件；Capacitor 在 iOS 上提供了一些简单的宏，在 Android 上提供了注解，用于向插件源代码添加元数据，Capacitor 在运行时读取这些元数据。

### CLI/版本管理

与 Cordova 不同，Capacitor 不使用全局 CLI。相反，Capacitor CLI 作为 npm 脚本本地安装到每个项目中。这使得跨多个不同应用管理 Capacitor 版本更加容易。

因此，Capacitor 不是直接从命令行运行，而是通过在应用目录中调用 `npx cap` 来调用。

[了解更多关于 Capacitor CLI 的信息 &#8250;](/cli/index.md)

## 开始迁移

了解更多关于[迁移过程](/main/cordova/migration-strategy.md)的信息，或立即[开始迁移](/main/cordova/migrating-from-cordova-to-capacitor.md)。
