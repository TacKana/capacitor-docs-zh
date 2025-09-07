---
title: Overview
description: Cordova 与 PhoneGap
slug: /cordova
---

# Cordova 与 PhoneGap

Apache Cordova（以及 Adobe PhoneGap）诞生于 2008 年，是一个开源项目，它让网页开发者能够利用 HTML、CSS 和 JavaScript 内容为多种移动和桌面平台创建原生应用。

想了解更多关于 Cordova 的历史背景及其工作原理的详细信息，请参阅[这篇文章](https://ionicframework.com/resources/articles/what-is-apache-cordova)。

## 为什么要开发 Capacitor？

开源领域充满了在旧项目理念基础上构建的新项目，这些改进通常需要对原有产品进行根本性变革。出于技术和社区管理方面的考虑，Ionic 团队不愿强行将这些变革引入 Cordova。

Capacitor 项目的优势之一在于 Ionic 团队对技术栈拥有更强的掌控力。当你使用 Ionic Framework 和 Capacitor 构建应用时，Ionic 团队同时维护着原生运行时层、UI 组件以及创建这些组件的工具链（[Stencil](https://stenciljs.com/)）。这意味着 Ionic 团队能够更快地修复问题，并提供更加协调统一的技术栈。

## Capacitor 与 Cordova 的区别

在核心理念上，Capacitor 和 Cordova 非常相似。两者都管理着 WebView，并为网页代码访问原生功能提供了结构化方式。但 Capacitor 存在几个关键差异，要求习惯 Cordova 开发方式的网页开发者调整应用开发流程。

### 原生项目管理

Capacitor 将每个平台项目视为_源代码资产_而非_构建时资产_。这意味着你需要将 Xcode 和 Android Studio 项目纳入版本控制，并在需要进行平台特定配置和构建/测试时使用这些 IDE。

这种理念转变带来几点影响：首先，Capacitor 不使用 `config.xml` 或类似的定制配置来管理平台设置，而是直接编辑对应的平台配置文件，如 Android 的 `AndroidManifest.xml` 和 iOS 的 `Info.plist`。当然，Capacitor 也提供了一些[高层级配置选项](/main/basics/configuring-your-app.md)，但这些通常不修改原生功能，仅用于控制 Capacitor 工具链。

此外，Capacitor 不提供命令行构建原生应用的方式，开发者应改用平台专用工具（或 IDE），这种方式遵循各平台应用开发标准，能提供更快速、更专业的体验。

虽然这些差异可能让长期使用 Cordova 的开发者感到不安，但它们带来了显著优势：

1. 通过 `config.xml` 等抽象工具更新和修改原生项目容易出错且标准多变，熟悉平台专用工具能大幅降低排错难度
2. 无需在应用代码库外单独构建插件，就能更便捷地添加所需的自定义原生代码，原生开发团队可与网页团队协同工作
3. 由于"拥有"原生项目所有权（例如在网页应用外添加原生 UI 外壳），现在能更轻松打造引人入胜的应用体验
4. 当移动操作系统新版本发布时，能更清晰地追踪原生项目变更并提升应用可维护性。如果 Capacitor 出现重大变更或原生项目模板更新，团队会发布分步升级指南确保流程顺畅

### 插件管理

Capacitor 采用不同于 Cordova 的插件管理方式。首先，Capacitor 不会在构建前将插件源代码复制到应用中，而是将所有插件构建为 iOS 的"框架"和 Android 的"库"，分别通过各平台主流依赖管理工具（CocoaPods 和 Gradle）安装。此外，Capacitor 不修改原生源代码，因此必须手动添加必要的原生项目设置（如 `AndroidManifest.xml` 中的权限）。我们认为这种方式更不易出错，也便于开发者针对特定平台寻求社区帮助。

一个重要差异在于插件处理 WebView 执行所需 JavaScript 代码的方式：Cordova 要求插件自带 JavaScript 并手动调用 `exec()`，而 Capacitor 会根据运行时检测的原生方法自动注册并导出每个插件的所有 JavaScript，因此 WebView 加载后立即可用所有插件方法。这意味着不再需要 `deviceready` 事件——应用代码加载完成后就能立即调用插件方法。

虽然 Capacitor 不强制要求插件为 iOS 或 Android 提供 JavaScript，但插件通常会在 JavaScript 中实现共享逻辑，这种方式同样易于实现。

最后，Capacitor 对插件开发者也有影响：在 iOS 上官方支持（甚至_推荐_）使用 Swift 5 构建插件（同时支持 Objective-C）；插件不再导出 `Plugin.xml` 文件，Capacitor 在 iOS 上提供简单宏、在 Android 上提供注解，用于向插件源代码添加运行时读取的元数据。

### CLI/版本管理

与 Cordova 不同，Capacitor 不使用全局 CLI，而是将 CLI 作为 npm 脚本本地安装到每个项目中。这使得跨多个应用管理 Capacitor 版本更加方便。

因此，调用 Capacitor 时需要在应用目录中执行 `npx cap` 而非直接运行命令行。

[了解更多关于 Capacitor CLI 的信息 &#8250;](/cli/index.md)

## 开始迁移

详细了解[迁移流程](/main/cordova/migration-strategy.md)或立即[开始迁移](/main/cordova/migrating-from-cordova-to-capacitor.md)。