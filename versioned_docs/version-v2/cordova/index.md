---
title: Cordova 和 PhoneGap
description: Cordova 和 PhoneGap
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cordova
---

# Cordova 与 PhoneGap

Apache Cordova（以及 Adobe PhoneGap）创建于 2008 年，是一个开源项目，它使 Web 开发者能够利用其 HTML、CSS 和 JavaScript 内容为各种移动和桌面平台创建原生应用程序。

有关 Cordova 历史的更多详细信息及其工作原理，[请参阅此处](https://ionicframework.com/resources/articles/what-is-apache-cordova)。

## 为何创建新项目？

开源领域充满了在旧项目基础上构建的新项目，它们带来了切实的改进，而这些改进往往需要对原始产品进行根本性变革才能实现。这正是 Capacitor 希望达成的目标。Ionic 团队认为，出于技术和政策原因，这在 Cordova 上无法实现。无论对错，团队得出了这个结论。尽管如此，Ionic 仍然大量使用 Cordova，并将在未来很长一段时间内继续投资该平台。

从积极的一面看，Ionic 现在几乎控制了其整个技术栈。当你构建 Ionic 应用并使用 Capacitor 时，我们控制了原生运行时层、UI 控件以及用于构建控件的“框架”（[Stencil](https://stenciljs.com/)）。唯一不受控制的部分是你使用的前端框架（Angular、React、Vue 或不使用框架）。这很重要：如果我们控制的技术栈的任何部分出现问题，我们可以立即修复。Capacitor 已被证明是一项值得的投资——它使我们能够构建更强大的 Ionic，并专注于我们独特擅长的领域。

## Capacitor 与 Cordova 的差异

在理念上，Capacitor 和 Cordova 非常相似。两者都管理 WebView，并提供了将原生功能暴露给 Web 代码的结构化方式。然而，Capacitor 有一些关键差异，要求之前习惯 Cordova 方法的 Web 开发者改变应用开发工作流程。

### 原生项目管理

Capacitor 将每个平台项目视为 **源代码资产** 而非 **构建时资产**。这意味着你需要将 Xcode 和 Android Studio 项目纳入版本控制，并在必要时使用这些 IDE 进行平台特定配置以及运行/测试。

这种方法的改变带来了一些影响。首先，Capacitor 不使用 `config.xml` 或类似的定制配置来处理平台设置。相反，配置更改是通过直接编辑相应平台特定的配置文件来完成的，例如 Android 的 `AndroidManifest.xml` 和 Xcode 的 `Info.plist`。Capacitor 确实有一些 [高级配置选项](/basics/configuring-your-app.md)，这些选项在 `capacitor.config.json` 中设置。这些通常不修改原生功能，而是控制 Capacitor 的工具链。

此外，Capacitor 不通过命令行“在设备上运行”或模拟。相反，此类操作通过平台特定的 IDE 进行，这提供了更快速、更典型的体验，遵循该平台应用开发的标准。例如，苹果官方不支持从命令行运行 iOS 应用，因此 Xcode 是首选。

虽然这些变化可能会让长期使用 Cordova 的用户感到担忧，但它们带来了值得的好处：

1.  通过抽象化的工具（如 `config.xml`）更新和修改原生项目容易出错，且目标不断变化。更熟悉平台特定工具使故障排除变得更加容易。
2.  更容易添加应用所需的定制原生代码，而无需为其构建新插件。此外，原生团队可以与 Web 团队在同一项目上协作。
3.  现在创建更具吸引力的应用体验变得更加容易，因为你“拥有”原生项目，例如为你的 Web 应用添加原生 UI 外壳。
4.  随着新移动操作系统版本的发布，对原生项目更改的可见性更高，应用的可维护性更好。当引入 Capacitor 的重大变更或对原生项目模板应用更改时，团队将发布逐步升级说明，以确保更新过程尽可能顺利。

### 插件管理

Capacitor 以与 Cordova 不同的方式管理插件。首先，Capacitor 在构建前不会将插件源代码复制到你的应用中。相反，所有插件都构建为框架（在 iOS 上）和库（在 Android 上），并使用每个平台领先的依赖管理工具（分别为 CocoaPods 和 Gradle/Maven）进行安装。此外，Capacitor 不修改原生源代码，因此任何必要的原生项目设置必须手动添加（例如，`AndroidManifest.xml` 中的权限）。我们认为这种方法更不容易出错，并且使开发者更容易在社区中找到每个特定平台的帮助。

一个主要区别在于插件处理 WebView 执行所需 JavaScript 代码的方式。Cordova 要求插件自带 JavaScript 并手动调用 `exec()`。相比之下，Capacitor 根据运行时检测到的方法，为每个插件注册并导出所有 JavaScript，因此所有插件方法在 WebView 加载后立即可用。这带来一个重要影响：不再需要 `deviceready` 事件。只要你的应用代码加载完成，你就可以开始调用插件方法。

虽然 Capacitor 不要求插件提供 JavaScript，但许多插件会希望在 JavaScript 中包含逻辑。在这种情况下，为插件提供额外的 JavaScript 就像发布传统的 JavaScript 库（包、模块等）一样简单，但不是在 Cordova 中调用 `exec()`，而是通过 `Capacitor.Plugins.MyPlugin` 引用 Capacitor 插件。

最后，Capacitor 对插件作者有影响。在 iOS 上，官方支持 Swift 4，甚至 **首选** 用于构建插件（也支持 Objective-C）。插件不再导出 `Plugin.xml` 文件；Capacitor 在 iOS 上提供了一些简单的宏，在 Android 上提供了注解，用于向插件源代码添加元数据，Capacitor 在运行时读取这些元数据。

### CLI/版本管理

与 Cordova 不同，Capacitor 不使用全局 CLI。相反，Capacitor 的“CLI”作为 npm 脚本本地安装到每个项目中。这使得跨多个不同应用管理 Capacitor 版本变得更加容易。

因此，不是直接从命令行运行 `capacitor`，而是通过在应用目录中调用 `npx cap` 来启动 Capacitor。

## 开始迁移

了解更多关于 [迁移过程](/cordova/migration-strategy.md) 的信息，或者 [立即开始迁移](/cordova/migrating-from-cordova-to-capacitor.md)。