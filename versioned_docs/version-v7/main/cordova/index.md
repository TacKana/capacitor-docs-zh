---
title: 概述
description: Cordova 与 PhoneGap
slug: /cordova
---

# Cordova 与 PhoneGap

Apache Cordova（以及 Adobe PhoneGap）诞生于 2008 年，是一个开源项目，它让 Web 开发者能够利用自己的 HTML、CSS 和 JavaScript 内容，为多种移动和桌面平台创建原生应用。

关于 Cordova 历史的更多详细信息及其工作原理，[请参阅此处](https://ionicframework.com/resources/articles/what-is-apache-cordova)。

## 为什么需要创建 Capacitor？

开源领域充满了许多在旧项目理念基础上构建的新项目，它们带来了实质性的改进，而这些改进如果不彻底改变原始产品是无法实现的。出于技术和政策原因，Ionic 团队并不想将这些彻底的改变强加给 Cordova。

Capacitor 项目的一个好处是，Ionic 团队对整个技术栈拥有更强的控制力。当你使用 Ionic Framework 和 Capacitor 构建应用时，Ionic 团队负责维护原生运行时层、UI 组件以及创建这些组件的工具链（[Stencil](https://stenciljs.com/)）。这一点非常重要，因为 Ionic 团队能够更快地修复问题，并提供一个更具凝聚力的技术栈。

## Capacitor 与 Cordova 的区别

从本质上讲，Capacitor 和 Cordova 非常相似。两者都管理 Web View，并提供一种结构化的方式将原生功能暴露给你的 Web 代码。然而，Capacitor 有一些关键差异，这要求之前习惯于 Cordova 开发方式的 Web 开发者调整应用开发的工作流程。

### 原生项目管理 {#native-project-management}

Capacitor 将每个平台项目视为**源代码资产**，而非**构建时资产**。这意味着你需要将 Xcode 和 Android Studio 项目纳入版本控制，并在必要时使用这些 IDE 进行平台特定的配置和构建/测试。

这种方法的改变带来了一些影响。首先，Capacitor 不使用 `config.xml` 或类似的定制配置来管理平台设置。相反，配置修改是通过直接编辑相应的平台特定配置文件来完成的，例如 Android 的 `AndroidManifest.xml` 和 iOS 的 `Info.plist`。Capacitor 确实也提供了一些[高级配置选项](/main/basics/configuring-your-app.md)，但这些选项通常不会修改原生功能，而是控制 Capacitor 的工具链。

此外，Capacitor 不提供在命令行中构建原生应用的方式。应该使用平台特定的工具（或在 IDE 中）进行构建，这能提供更快速、更符合该平台应用开发标准的典型体验。

虽然这些差异可能让长期使用 Cordova 的用户感到担忧，但它们也带来了实实在在的好处：

1.  通过抽象工具（如 `config.xml`）更新和修改原生项目容易出错，且目标不断变化。更熟悉平台特定工具会使问题排查变得更容易。
2.  添加应用所需的自定义原生代码变得更加容易，无需在应用代码库之外专门构建插件。此外，原生团队可以与 Web 团队在同一项目上协同工作。
3.  由于你“拥有”原生项目，现在可以更轻松地创建更具吸引力的应用体验，例如在 Web 应用周围添加原生 UI 外壳。
4.  随着新移动操作系统版本的发布，对原生项目变更的可见性更高，应用的可维护性更好。当引入破坏性更改或对原生项目模板应用更改时，团队会发布逐步升级指南，以确保更新过程尽可能顺利。

### 插件管理

Capacitor 以不同于 Cordova 的方式管理插件。首先，Capacitor 在构建前不会将插件源代码复制到你的应用中。相反，所有插件都被构建为“框架”（在 iOS 上）和“库”（在 Android 上），并使用各自平台的主流依赖管理工具（分别是 CocoaPods 和 Gradle）进行安装。此外，Capacitor 不会修改原生源代码，因此任何必要的原生项目设置都必须手动添加（例如 `AndroidManifest.xml` 中的权限）。我们认为这种方法更不易出错，并且使开发者更容易在每个特定平台的社区中找到帮助。

一个主要区别在于插件处理其从 WebView 执行所需 JavaScript 代码的方式。Cordova 要求插件提供自己的 JavaScript 并手动调用 `exec()`。相比之下，Capacitor 会根据运行时检测到的原生方法，为每个插件注册并导出所有 JavaScript，因此所有插件方法在 WebView 加载后立即可用。这带来了一个重要的影响：不再需要 `deviceready` 事件。一旦你的应用代码加载完成，你就可以开始调用插件方法。

虽然 Capacitor 不要求插件为 iOS 或 Android 提供 JavaScript，但插件通常会在 JavaScript 中包含共享逻辑，这也很容易实现。

最后，Capacitor 对插件作者也有影响。在 iOS 上，官方支持甚至**推荐**使用 Swift 5 构建插件（也支持 Objective-C）。插件不再导出 `Plugin.xml` 文件；Capacitor 在 iOS 上提供了一些简单的宏，在 Android 上提供了注解，用于向插件源代码添加元数据，这些元数据在运行时由 Capacitor 读取。

### CLI/版本管理

与 Cordova 不同，Capacitor 不使用全局 CLI。相反，Capacitor CLI 作为 npm 脚本本地安装到每个项目中。这使得跨多个不同应用管理 Capacitor 版本变得更加容易。

因此，不是直接从命令行运行，而是在你的应用目录中调用 `npx cap` 来使用 Capacitor。

[了解更多关于 Capacitor CLI 的信息 &#8250;](/cli/index.md)

## 开始迁移

了解更多关于[迁移过程](/main/cordova/migration-strategy.md)，或立即[开始迁移](/main/cordova/migrating-from-cordova-to-capacitor.md)。