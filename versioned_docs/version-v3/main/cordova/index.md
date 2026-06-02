---
title: 概述
description: Cordova 和 PhoneGap
slug: /cordova
---

# Cordova 和 PhoneGap

Apache Cordova（以及 Adobe PhoneGap）创建于 2008 年，是一个开源项目，使 Web 开发者能够使用其 HTML、CSS 和 JavaScript 内容为多种移动和桌面平台创建原生应用。

有关 Cordova 的历史及其工作原理的更多详细信息，[请参阅这里](https://ionicframework.com/resources/articles/what-is-apache-cordova)。

## 为什么创建 Capacitor？

开源领域充满了在旧项目理念基础上构建的新项目，它们做出了切实的改进，而这些改进如果不从根本上改变原始产品是无法实现的。Ionic 团队出于技术和政治原因，不想强行将这些根本性的改变引入 Cordova。

Capacitor 项目的一个好处是 Ionic 团队对技术栈拥有更多控制权。当您使用 Ionic Framework 和 Capacitor 构建应用时，Ionic 团队是原生运行时层、UI 组件以及创建组件的工具链（[Stencil](https://stenciljs.com/)）的维护者。这意义重大，因为 Ionic 团队可以更快速地修复问题，并提供更紧密集成的技术栈。

## Capacitor 与 Cordova 的区别

从本质上讲，Capacitor 和 Cordova 非常相似。两者都管理 Web View 并提供将原生功能暴露给 Web 代码的结构化方式。然而，Capacitor 有一些关键区别，需要习惯 Cordova 方法的 Web 开发者改变应用开发工作流。

### 原生项目管理

Capacitor 将每个平台项目视为**源资产**而非**构建时资产**。这意味着您需要将 Xcode 和 Android Studio 项目纳入源代码管理，并在需要时使用这些 IDE 进行平台特定的配置和构建/测试。

这种方法的改变有几个影响。首先，Capacitor 不使用 `config.xml` 或类似的自定义配置来处理平台设置。相反，配置更改是通过直接编辑相应的平台特定配置文件来完成的，例如 Android 的 `AndroidManifest.xml` 和 iOS 的 `Info.plist`。Capacitor 确实有一些[高级配置选项](/main/basics/configuring-your-app.md)。这些通常不会修改原生功能，而是控制 Capacitor 的工具链。

此外，Capacitor 不提供在命令行上构建原生应用的方式。应使用特定平台的工具（或在 IDE 中），这提供了更快、更典型且符合该平台应用开发标准的体验。

虽然这些差异可能会让长期使用 Cordova 的用户有所顾虑，但它们带来了值得注意的好处：

1. 通过诸如 `config.xml` 之类的抽象工具来更新和修改原生项目容易出错，且目标不断变化。熟悉特定平台的工具会使问题排查变得更加容易。
2. 添加应用所需的自定义原生代码变得更加容易，无需在应用代码库之外为其构建专用插件。此外，原生团队可以与 Web 团队在同一个项目上协同工作。
3. 由于您"拥有"原生项目，创建更引人入胜的应用体验变得更加容易，例如在 Web 应用周围添加原生 UI 外壳。
4. 随着新移动操作系统版本的发布，可以更清楚地了解原生项目的变更，并提高应用的可维护性。当 Capacitor 引入重大更改或对原生项目模板应用更改时，团队将发布逐步升级说明，以确保更新过程尽可能顺畅。

### 插件管理

Capacitor 管理插件的方式与 Cordova 不同。首先，Capacitor 在构建之前不会将插件源代码复制到您的应用中。相反，所有插件都作为"框架"（iOS 上）和"库"（Android 上）构建，并使用每个平台的主流依赖管理工具（分别是 CocoaPods 和 Gradle）进行安装。此外，Capacitor 不会修改原生源代码，因此任何必要的原生项目设置都必须手动添加（例如 `AndroidManifest.xml` 中的权限）。我们认为这种方法不太容易出错，并且使开发者更容易在社区中为每个特定平台找到帮助。

一个主要区别在于插件处理从 WebView 执行所需的 JavaScript 代码的方式。Cordova 要求插件自带 JavaScript 并手动调用 `exec()`。相比之下，Capacitor 会根据运行时检测到的原生方法为每个插件注册并导出所有 JavaScript，因此 WebView 加载后所有插件方法立即可用。一个重要的含义是：不再需要 `deviceready` 事件。一旦您的应用代码加载完成，就可以开始调用插件方法。

虽然 Capacitor 不要求插件为 iOS 或 Android 提供 JavaScript，但插件通常在 JavaScript 中包含共享逻辑，这也很容易实现。

最后，Capacitor 对插件作者也有影响。在 iOS 上，Swift 5 被正式支持，甚至是构建插件的**首选**语言（Objective-C 也受支持）。插件不再需要导出 `Plugin.xml` 文件；Capacitor 在 iOS 上提供了一些简单的宏，在 Android 上提供了注解，用于向插件源代码添加 Capacitor 在运行时读取的元数据。

### CLI/版本管理

与 Cordova 不同，Capacitor 不使用全局 CLI。相反，Capacitor CLI 作为 npm 脚本本地安装到每个项目中。这使得在多个不同应用之间管理 Capacitor 版本变得更加容易。

因此，Capacitor 不是直接从命令行运行，而是通过在应用目录中调用 `npx cap` 来执行。

[了解更多关于 Capacitor CLI 的信息 &#8250;](/cli/index.md)

## 开始迁移

了解更多关于[迁移过程](/main/cordova/migration-strategy.md)的信息，或立即[开始迁移](/main/cordova/migrating-from-cordova-to-capacitor.md)。
