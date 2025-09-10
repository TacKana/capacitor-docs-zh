---
title: Cordova and PhoneGap
description: Cordova 与 PhoneGap
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cordova
---

# Cordova 与 PhoneGap

Apache Cordova（以及 Adobe PhoneGap）诞生于 2008 年，是一个开源项目，让网页开发者能够使用 HTML、CSS 和 JavaScript 内容为多种移动和桌面平台创建原生应用。

关于 Cordova 的历史及其工作原理的更多细节，[请参阅此处](https://ionicframework.com/resources/articles/what-is-apache-cordova)。

## 为何要创建新项目？

开源领域充满了在旧项目基础上构建的新项目，它们实现了无法通过简单改进原产品就能获得的实质性提升。这正是 Capacitor 需要做到的。Ionic 团队认为，由于技术和政策原因，这在 Cordova 上无法实现。无论对错，这就是团队得出的结论。尽管如此，Ionic 仍大量使用 Cordova，并将长期持续投入该平台。

从积极的一面看，Ionic 现在几乎掌控了整个技术栈。当你构建 Ionic 应用并使用 Capacitor 时，我们控制了原生运行时层、UI 控件以及用于构建控件的"框架"（[Stencil](https://stenciljs.com/)）。唯一不受我们控制的部分是你选择的前端框架（Angular、React、Vue 或不使用任何框架）。这意义重大：如果我们控制的任何部分出现问题，我们可以立即修复。Capacitor 已被证明是一项值得的投资——它使我们能够构建更强大的 Ionic，并专注于我们独特的优势。

## Capacitor 与 Cordova 的区别

本质上，Capacitor 和 Cordova 非常相似。两者都管理 Web View，并提供了将原生功能暴露给网页代码的结构化方式。但 Capacitor 有几个关键差异，要求习惯于 Cordova 方式的开发者调整应用开发流程。

### 原生项目管理

Capacitor 将每个平台项目视为_源资产_而非_构建时资产_。这意味着你需要将 Xcode 和 Android Studio 项目纳入版本控制，并在必要时使用这些 IDE 进行平台特定配置及运行/测试。

这种方式的改变有几层含义。首先，Capacitor 不使用 `config.xml` 或类似的定制配置来管理平台设置。相反，配置变更需要直接编辑平台特定的配置文件，例如 Android 的 `AndroidManifest.xml` 和 iOS 的 `Info.plist`。Capacitor 确实有一些[高级配置选项](/basics/configuring-your-app.md)，这些选项在 `capacitor.config.json` 中设置，通常不修改原生功能，而是控制 Capacitor 的工具链。

此外，Capacitor 不通过命令行"在设备上运行"或模拟。这类操作通过平台特定的 IDE 完成，提供更快速、更符合该平台应用开发标准的体验。例如，Apple 本就不正式支持从命令行运行 iOS 应用，因此首选 Xcode。

虽然这些改变可能让长期使用 Cordova 的用户感到不适，但它们带来了显著优势：

1. 通过抽象工具（如 `config.xml`）更新和修改原生项目容易出错且目标多变。熟悉平台特定工具能大大简化问题排查。
2. 无需构建新插件就能更容易地添加应用所需的自定义原生代码。此外，原生团队可以与网页团队在同一项目上协作。
3. 由于你"拥有"原生项目，现在更容易创建引人入胜的应用体验，比如围绕网页应用添加原生 UI 外壳。
4. 随着新移动操作系统版本的发布，能更清晰地看到原生项目的变更，并提高应用可维护性。当 Capacitor 引入重大变更或对原生项目模板进行调整时，团队将发布逐步升级指南，确保更新过程尽可能顺畅。

### 插件管理

Capacitor 以不同于 Cordova 的方式管理插件。首先，Capacitor 不会在构建前将插件源代码复制到应用中。所有插件都构建为 Framework（iOS）和 Library（Android），并使用各平台的主流依赖管理工具（分别为 CocoaPods 和 Gradle/Maven）安装。此外，Capacitor 不修改原生源代码，因此必须手动添加任何必要的原生项目设置（例如 `AndroidManifest.xml` 中的权限）。我们认为这种方式更不易出错，且开发者能更容易地在社区中找到针对特定平台的帮助。

一个主要区别在于插件处理 WebView 中执行的 JavaScript 代码的方式。Cordova 要求插件自带 JavaScript 并手动调用 `exec()`。而 Capacitor 根据运行时检测到的方法，为每个插件注册并导出所有 JavaScript，因此所有插件方法在 WebView 加载后立即可用。这一变化的一个重要影响是：不再需要 `deviceready` 事件。应用代码加载后，即可立即调用插件方法。

虽然 Capacitor 不要求插件提供 JavaScript，但许多插件仍需要在 JavaScript 中包含逻辑。这种情况下，为插件添加额外 JavaScript 就像发布传统 JavaScript 库（bundle、模块等）一样简单，但不再像 Cordova 中调用 `exec()`，而是通过 `Capacitor.Plugins.MyPlugin` 引用 Capacitor 插件。

最后，Capacitor 对插件开发者也有影响。在 iOS 上，Swift 4 是官方支持甚至_推荐_的插件开发语言（同时也支持 Objective-C）。插件不再导出 `Plugin.xml` 文件；Capacitor 在 iOS 上提供了一些简单的宏，在 Android 上提供了注解，用于向插件源代码添加元数据，Capacitor 在运行时读取这些元数据。

### CLI/版本管理

与 Cordova 不同，Capacitor 不使用全局 CLI。相反，Capacitor 的"CLI"作为 npm 脚本本地安装到每个项目中。这使得跨多个应用管理 Capacitor 版本更加容易。

因此，不是在命令行直接运行 `capacitor`，而是在应用目录中调用 `npx cap` 来使用 Capacitor。

## 开始迁移

了解更多关于[迁移过程](/cordova/migration-strategy.md)的信息，或立即[开始迁移](/cordova/migrating-from-cordova-to-capacitor.md)。