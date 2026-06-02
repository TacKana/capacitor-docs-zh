---
title: Cordova 和 PhoneGap
description: Cordova 和 PhoneGap
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cordova
---

# Cordova 和 PhoneGap

Apache Cordova（以及 Adobe PhoneGap）创建于 2008 年，是一个开源项目，使 Web 开发者能够使用他们的 HTML、CSS 和 JavaScript 内容为多种移动和桌面平台创建原生应用程序。

有关 Cordova 历史及其工作原理的更多详细信息，[请参见此处](https://ionicframework.com/resources/articles/what-is-apache-cordova)。

## 为什么创建新项目？

开源领域充满了在旧项目基础上构建的新项目，它们做出了如果不从根本上改变原有产品就无法实现的实质性改进。这就是 Capacitor 本应做到的事情。Ionic 团队认为，由于技术和政治原因，这在 Cordova 中是不可能的。无论是对是错，这都是团队得出的结论。尽管如此，Ionic 仍然大量使用 Cordova，并将在未来很长一段时间内继续在该平台上进行投入。

从好的方面来看，Ionic 现在几乎完全掌控了自己的技术栈。当您构建 Ionic 应用并使用 Capacitor 时，我们控制原生运行时层、UI 控件以及用于构建控件的"框架"（[Stencil](https://stenciljs.com/)）。我们唯一不控制的部分是您在上面使用的前端框架（Angular、React、Vue 或不使用）。这意义重大：如果在我们控制的任何部分出现问题，我们可以立即修复。Capacitor 已经证明是一项值得的投入——它使我们能够构建更强大的 Ionic，并专注于我们独有擅长的领域。

## Capacitor 和 Cordova 之间的差异

从本质上讲，Capacitor 和 Cordova 非常相似。两者都管理 Web View，并提供了一种结构化的方式将原生功能暴露给您的 web 代码。然而，Capacitor 有一些关键差异，要求以前习惯于 Cordova 方式的 Web 开发者改变应用开发工作流。

### 原生项目管理

Capacitor 将每个平台项目视为一个 _源资产_ 而不是一个 _构建时资产_。这意味着您会将您的 Xcode 和 Android Studio 项目检入到版本控制中，并在需要时使用这些 IDE 进行特定平台的配置和运行/测试。

这种方法上的改变有一些影响。首先，Capacitor 不使用 `config.xml` 或类似的自定义配置来进行平台设置。相反，配置更改是通过直接编辑相应的平台特定配置文件来完成的，例如 Android 的 `AndroidManifest.xml` 和 Xcode 的 `Info.plist`。Capacitor 确实有一些在 `capacitor.config.json` 中设置的 [高级配置选项](/basics/configuring-your-app.md)。这些通常不会修改原生功能，而是控制 Capacitor 的工具链。

此外，Capacitor 不通过命令行"在设备上运行"或模拟。相反，此类操作是通过特定于平台的 IDE 进行的，这提供了更快、更典型的体验，遵循该平台的应用开发标准。例如，从命令行运行 iOS 应用本就不是 Apple 官方支持的，因此 Xcode 是首选。

虽然这些变化可能会让长期使用 Cordova 的用户感到担忧，但也有值得注意的好处：

1. 通过 `config.xml` 等抽象工具来更新和修改原生项目容易出错且目标不断变化。熟悉特定平台工具使故障排除变得更加容易。
2. 更容易添加应用所需的自定义原生代码，而不必为此构建新插件。此外，原生团队可以与 Web 团队在同一项目上协作。
3. 由于您"拥有"原生项目，因此可以更轻松地创建更具吸引力的应用体验，例如在您的 web 应用周围添加原生 UI 外壳。
4. 随着新移动操作系统版本的发布，原生项目变更更加可见，应用可维护性更好。当 Capacitor 引入重大更改或对原生项目模板应用更改时，团队将发布逐步升级说明，以确保更新过程尽可能顺利。

### 插件管理

Capacitor 以不同于 Cordova 的方式管理插件。首先，Capacitor 在构建之前不会将插件源代码复制到您的应用中。相反，所有插件都构建为 Frameworks（在 iOS 上）和 Libraries（在 Android 上），并使用每个平台的主要依赖管理工具（分别为 CocoaPods 和 Gradle/Maven）安装。此外，Capacitor 不会修改原生源代码，因此任何必要的原生项目设置都必须手动添加（例如，`AndroidManifest.xml` 中的权限）。我们认为这种方法不太容易出错，并使开发者更容易在社区中找到每个特定平台的帮助。

一个主要区别是插件处理它们从 WebView 执行所需的 JavaScript 代码的方式。Cordova 要求插件自带 JavaScript 代码并手动调用 `exec()`。相反，Capacitor 根据其在运行时检测到的方法为每个插件注册和导出所有 JavaScript，因此一旦 WebView 加载，所有插件方法都是可用的。一个重要的含义是：不再需要 `deviceready` 事件。一旦您的应用代码加载，您就可以开始调用插件方法。

虽然 Capacitor 不要求插件提供 JavaScript，但许多插件希望有 JavaScript 逻辑。在这种情况下，为插件提供额外的 JavaScript 就像提供一个传统的 JavaScript 库（bundle、module 等）一样简单，但插件不是调用 Cordova 中的 `exec()`，而是通过 `Capacitor.Plugins.MyPlugin` 引用 Capacitor 插件。

最后，Capacitor 对插件作者也有影响。在 iOS 上，Swift 4 被官方支持甚至 _推荐_ 用于构建插件（Objective-C 也支持）。插件不再导出 `Plugin.xml` 文件；Capacitor 在 iOS 上提供了一些简单的宏，在 Android 上提供了 Annotations，用于向插件源代码添加元数据，Capacitor 在运行时读取这些元数据。

### CLI/版本管理

与 Cordova 不同，Capacitor 不使用全局 CLI。相反，Capacitor "CLI" 作为 npm 脚本本地安装到每个项目中。这使得跨多个不同应用管理 Capacitor 版本变得更加容易。

因此，Capacitor 不是直接从命令行运行 `capacitor`，而是通过在应用目录中调用 `npx cap` 来调用。

## 开始迁移

了解更多关于 [迁移过程](/cordova/migration-strategy.md) 的信息，或立即 [开始迁移](/cordova/migrating-from-cordova-to-capacitor.md)。