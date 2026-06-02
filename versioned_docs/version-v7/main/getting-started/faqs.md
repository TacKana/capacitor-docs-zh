---
title: 常见问题
description: Capacitor 常见问题
slug: /getting-started/faqs
sidebar_label: 常见问题
---

# 常见问题

以下是一系列常见的 Capacitor 问题。如果你在这里找不到答案，请查看[我们的论坛](https://forum.ionicframework.com)或[我们的 Discord](https://ionic.link/discord)。查看侧边栏以获取常见问题列表 👉

## Capacitor 支持哪些平台？

Capacitor 可以通过我们的官方和社区平台 targeting 几乎任何设备。

### 官方平台

Capacitor 官方支持以下平台：
- iOS 14+
- Android 6+
  - 需要 Chrome WebView 60+
- 现代 Web 浏览器
  - Chrome
  - Firefox
  - Safari
  - Edge

### 社区平台

Capacitor 还有针对跨平台桌面框架的社区平台。当前的社区目标如下：
- Electron
  - https://github.com/capacitor-community/electron

## 我需要将 Ionic Framework 与 Capacitor 一起使用吗？

不需要！你不必这样做！Capacitor 适用于**任何** Web 应用，不仅仅是使用其他 Ionic 工具构建的应用。如果你想要为你的 Capacitor 应用实现特定的外观和感觉，而 Ionic Framework 不是适合你的 UI 工具包，你不应该感到被迫使用它。两个应用商店中都有大量使用 Capacitor 而非 Ionic Framework 的应用。

## 在哪里可以找到我 Capacitor 项目的插件？

要为你的项目查找插件，你应该按以下顺序查看以下地方。

### Capacitor Community GitHub ⚡

[Capacitor Community GitHub 组织](https://github.com/capacitor-community)列出了我们优秀的开发者社区创建的插件。它们是优先为 Capacitor 打造的插件，正在积极开发中，应该可以在任何 Capacitor 3+ 项目中使用。如果你需要插件，这应该是你首先查看的地方之一。

### Awesome Capacitor 😎

像许多其他 [Awesome 列表](https://github.com/sindresorhus/awesome)一样，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) 是一个社区精选的优秀 Capacitor 插件列表。如果你找不到官方或社区插件，很可能有人已经在这里制作了你正在寻找的插件。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) 是 Chromium 团队跟踪已添加到 Chromium 浏览器的 Web API 的[跟踪器](https://fugu-tracker.web.app/#shipped)。虽然某些功能可能无法同时在 Android 和 iOS 上得到支持，但像 [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) 和 [ContactsManager（仅限 Android）](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) 等功能，在你的用例中可能会替代 `@capacitor/share` 或 `@capacitor-community/contacts`。

你可以使用 [Can I Use...?](https://caniuse.com) 来检查你是否可以在 Android 和 iOS 上使用这些功能而**无需**任何原生插件。

### Cordova 插件 🔌

你知道 Capacitor 支持 Cordova 插件吗？如果你正在从 Cordova 迁移，或者有一个没有 Capacitor 等效插件的 Cordova 插件，你可以直接在 Capacitor 中使用大多数 Cordova 插件。你可以[阅读我们的指南](https://capacitorjs.com/docs/plugins/cordova)，了解如何在 Capacitor 中使用 Cordova 插件。

## 我可以在没有 Mac 的情况下使用 Capacitor 构建 iOS 应用吗？

简短的回答是：不能。更长的回答是：虽然你可以使用像 [Ionic AppFlow](https://ionic.io/appflow) 这样的云服务，但你将无法在设备或模拟器上测试你的应用。你应该始终确保使用物理设备测试你的应用，以确保你的 Capacitor 应用对使用 Apple 产品的用户是可用的。

## 为什么在 Android 模拟器上运行时会显示空白屏幕？

Capacitor 需要 Android 6 以及 WebView 版本 60 或更高版本。例如，如果你创建了一个 Android 6 或 7 的模拟器，最新版本的 WebView 将不会被安装，你会看到空白的白色屏幕。为了解决这个问题，你可以安装一个更新的 Android 模拟器来测试你的应用。
