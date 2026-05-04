---
title: 概述
description: Cordova 与 PhoneGap
slug: /cordova
---

# Cordova 与 PhoneGap

Apache Cordova（以及 Adobe PhoneGap）创建于 2008 年，这是一个开源项目，使 Web 开发者能够利用他们的 HTML、CSS 和 JavaScript 内容，为各种移动和桌面平台创建原生应用程序。

关于 Cordova 历史的更多细节以及其工作原理的详细信息，[请参阅此处](https://ionicframework.com/resources/articles/what-is-apache-cordova)。

## 为什么要创建 Capacitor？

开源领域充满了许多新项目，它们建立在旧项目理念之上，实现了那些无法在不彻底改变原始产品情况下完成的实质性改进。出于技术和政治原因，Ionic 团队不想将这些根本性变革强加给 Cordova。

Capacitor 项目的一个优势在于，Ionic 团队对技术栈拥有更多的控制权。当你使用 Ionic Framework 和 Capacitor 构建应用时，Ionic 团队负责维护原生运行时层、UI 组件以及创建组件的工具链（[Stencil](https://stenciljs.com/)）。这一点非常重要，因为 Ionic 团队可以更快地修复问题，并提供更加统一的技术栈。

## Capacitor 与 Cordova 的区别

在本质上，Capacitor 和 Cordova 非常相似。两者都管理着一个 Web 视图，并提供了将原生功能暴露给你的 Web 代码的结构化方式。然而，Capacitor 有一些关键差异，这要求之前习惯于 Cordova 方式的 Web 开发者改变应用开发工作流程。

### 原生项目管理 {#native-project-management}

Capacitor 将每个平台项目视为**源代码资产**，而非**构建时资产**。这意味着你需要将 Xcode 和 Android Studio 项目纳入版本控制，并在必要时使用这些 IDE 进行特定平台的配置和构建/测试。

这种方式的改变带来了一些影响。首先，Capacitor 不使用 `config.xml` 或类似的定制配置来处理平台设置。相反，配置更改是通过直接编辑相应的平台特定配置文件来完成的，例如 Android 的 `AndroidManifest.xml` 和 iOS 的 `Info.plist`。Capacitor 也确实有一些[高级配置选项](/main/basics/configuring-your-app.md)。这些选项通常不修改原生功能，而是控制 Capacitor 的工具。

此外，Capacitor 不提供在命令行上构建原生应用的方法。应该使用特定平台的工具（或在 IDE 中），这提供了更快、更典型的体验，遵循了该平台应用开发的标准。

虽然这些差异可能会让长期使用 Cordova 的用户感到担忧，但也有一些值得的好处：

1. 通过诸如 `config.xml` 这样的抽象工具更新和修改原生项目容易出错，且是一个不断变化的目标。更熟悉特定平台的工具会使故障排除变得更容易。
2. 更容易添加应用所需的自定义原生代码，而无需在应用代码库之外构建专门的插件。此外，原生团队可以与 Web 团队在同一项目上协作。
3. 现在更容易创建更吸引人的应用体验，因为你“拥有”原生项目，例如在 Web 应用周围添加原生 UI 外壳。
4. 随着新移动操作系统的发布，原生项目的变更更加透明，应用的可维护性更好。当 Capacitor 引入破坏性更改或对原生项目模板应用更改时，团队将发布逐步升级说明，以确保更新过程尽可能顺利。

### 插件管理

Capacitor 以不同于 Cordova 的方式管理插件。首先，Capacitor 在构建前不会将插件源代码复制到你的应用中。相反，所有插件都构建为“框架”（在 iOS 上）和“库”（在 Android 上），并使用每个平台领先的依赖管理工具（分别是 CocoaPods 和 Gradle）进行安装。此外，Capacitor 不修改原生源代码，因此任何必要的原生项目设置必须手动添加（例如，`AndroidManifest.xml` 中的权限）。我们认为这种方法不容易出错，并且使开发者更容易在社区中找到每个特定平台的帮助。

一个主要区别在于插件处理它们需要的 JavaScript 代码以便从 WebView 执行的方式。Cordova 要求插件提供自己的 JavaScript 并手动调用 `exec()`。相比之下，Capacitor 根据运行时检测到的原生方法，为每个插件注册并导出所有 JavaScript，因此所有插件方法在 WebView 加载后立即可用。这一点的一个重要含义是：不再需要 `deviceready` 事件。一旦你的应用代码加载，你就可以开始调用插件方法。

虽然 Capacitor 不要求插件为 iOS 或 Android 提供 JavaScript，但插件通常会有共享的 JavaScript 逻辑，这也容易实现。

最后，Capacitor 对插件作者有影响。在 iOS 上，官方支持 Swift 5，甚至**更推荐**用于构建插件（也支持 Objective-C）。插件不再导出 `Plugin.xml` 文件；Capacitor 在 iOS 上提供了一些简单的宏，在 Android 上提供了注解，用于向插件源代码添加元数据，Capacitor 在运行时读取这些元数据。

### CLI/版本管理

与 Cordova 不同，Capacitor 不使用全局 CLI。相反，Capacitor CLI 作为 npm 脚本安装到每个项目的本地。这使得跨许多不同应用管理 Capacitor 的版本变得更加容易。

因此，Capacitor 不是直接从命令行运行，而是通过在应用目录中调用 `npx cap` 来执行。

[了解更多关于 Capacitor CLI 的信息 &#8250;](/cli/index.md)

## 开始迁移

了解更多关于[迁移过程](/main/cordova/migration-strategy.md)的信息，或[立即开始迁移](/main/cordova/migrating-from-cordova-to-capacitor.md)。