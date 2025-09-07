---
title: 概述
description: Cordova 与 PhoneGap
slug: /cordova
---

# Cordova 与 PhoneGap

Apache Cordova（以及 Adobe PhoneGap）诞生于 2008 年，是一个开源项目，它让 Web 开发者能够使用 HTML、CSS 和 JavaScript 来为多种移动和桌面平台创建原生应用。

想了解 Cordova 的发展历程及其工作原理的更多细节，[请参阅此处](https://ionicframework.com/resources/articles/what-is-apache-cordova)。

## 为什么需要 Capacitor？

开源世界充满了基于旧项目理念的新项目，它们带来了根本性变革才能实现的实质性改进。由于技术和社区治理方面的考虑，Ionic 团队不愿将这些激进改动强加给 Cordova。

Capacitor 项目的优势之一是 Ionic 团队对整个技术栈拥有更强的掌控力。当你使用 Ionic Framework 和 Capacitor 构建应用时，Ionic 团队负责维护原生运行时层、UI 组件以及创建这些组件的工具链（[Stencil](https://stenciljs.com/)）。这意味着 Ionic 团队能够更快地修复问题，并提供更紧密集成的技术栈。

## Capacitor 与 Cordova 的区别

本质上，Capacitor 和 Cordova 非常相似。两者都管理 WebView 并提供结构化方式将原生功能暴露给 Web 代码。但 Capacitor 有几个关键差异，需要习惯 Cordova 方式的开发者调整应用开发流程。

### 原生项目管理

Capacitor 将每个平台项目视为_源代码资产_而非_构建时资产_。这意味着你需要将 Xcode 和 Android Studio 项目纳入版本控制，并在必要时使用这些 IDE 进行平台专属的配置与构建/测试。

这种理念转变带来几点影响。首先，Capacitor 不使用 `config.xml` 或类似的定制化配置来设置平台参数，而是直接编辑平台专属配置文件，例如 Android 的 `AndroidManifest.xml` 和 iOS 的 `Info.plist`。Capacitor 确实提供了一些[高层级配置选项](/main/basics/configuring-your-app.md)，但这些通常不会修改原生功能，而是控制 Capacitor 工具链的行为。

此外，Capacitor 不支持通过命令行构建原生应用。开发者应使用平台专属工具（或 IDE），这能提供更快速、更符合平台标准的开发体验。

虽然这些差异可能让 Cordova 老用户感到担忧，但它们带来了显著优势：

1. 通过抽象工具（如 `config.xml`）更新和修改原生项目容易出错且需要持续适配。熟悉平台专属工具能更轻松地排查问题
2. 无需在应用代码库外构建独立插件，就能更便捷地添加所需的自定义原生代码。原生开发团队可与 Web 团队协同工作
3. 由于开发者"拥有"原生项目，现在能更轻松地打造引人入胜的应用体验，例如为 Web 应用添加原生 UI 外壳
4. 当新版移动操作系统发布时，能更清晰地追踪原生项目变更并提高应用可维护性。如果 Capacitor 引入破坏性变更或更新原生项目模板，团队会发布分步升级指南确保平滑过渡

### 插件管理

Capacitor 以不同方式管理插件。首先，它不会在构建前将插件源代码复制到应用中，而是将所有插件构建为 iOS 的"框架"和 Android 的"库"，并使用各平台的主流依赖管理工具（分别是 CocoaPods 和 Gradle）进行安装。此外，Capacitor 不修改原生源代码，因此必须手动添加必要的原生项目设置（例如 `AndroidManifest.xml` 中的权限）。我们认为这种方式更不易出错，也便于开发者针对特定平台寻求社区帮助。

一个重要区别是插件处理 WebView 执行所需 JavaScript 代码的方式。Cordova 要求插件自带 JavaScript 并手动调用 `exec()`。而 Capacitor 会根据运行时检测的原生方法自动注册和导出每个插件的所有 JavaScript，因此 WebView 加载后立即可用所有插件方法。这意味着：不再需要等待 `deviceready` 事件，应用代码加载后就能直接调用插件方法。

虽然 Capacitor 不强制插件为 iOS 或 Android 提供 JavaScript，但插件通常会在 JavaScript 中封装共享逻辑，这也易于实现。

最后，Capacitor 对插件作者有所影响。在 iOS 上，官方支持甚至推荐使用 Swift 5 构建插件（同时也支持 Objective-C）。插件不再导出 `Plugin.xml` 文件，Capacitor 在 iOS 上提供简单宏、在 Android 上提供注解，用于向插件源代码添加元数据供 Capacitor 运行时读取。

### CLI/版本管理

与 Cordova 不同，Capacitor 不使用全局 CLI，而是将 CLI 作为 npm 脚本本地安装到每个项目中。这使得跨多个应用管理 Capacitor 版本更为简便。

因此，不是在命令行直接运行，而是在应用目录中通过 `npx cap` 调用 Capacitor。

[了解更多关于 Capacitor CLI 的信息 &#8250;](/cli/index.md)

## 开始迁移

立即了解[迁移流程](/main/cordova/migration-strategy.md)或[开始迁移](/main/cordova/migrating-from-cordova-to-capacitor.md)。