---
title: 常见问题
description: Capacitor 常见问题解答
slug: /getting-started/faqs
sidebar_label: 常见问题
---

# 常见问题

以下是关于 Capacitor 的常见问题列表。如果在这里找不到答案，请查看[我们的论坛](https://forum.ionicframework.com)或[我们的 Discord](https://ionic.link/discord)。👉 请查看侧边栏，了解其他常见问题列表。

## Capacitor 支持哪些平台？

Capacitor 可以通过我们的官方平台和社区平台，支持几乎任何设备。

### 官方平台

Capacitor 官方支持以下平台：
- iOS 15+
- Android 7+
  - 需要 Chrome WebView 60+
- 现代网页浏览器
  - Chrome
  - Firefox
  - Safari
  - Edge

### 社区平台

Capacitor 还有社区平台，可以支持跨平台桌面框架。目前的社区目标平台如下：
- Electron
  - https://github.com/capacitor-community/electron

## 我必须将 Ionic Framework 与 Capacitor 一起使用吗？

不！完全不需要！Capacitor 可以配合**任何**网页应用使用，不仅仅是使用其他 Ionic 工具构建的应用。如果你希望为 Capacitor 应用定制特定的外观和体验，而 Ionic Framework 并不适合你，那么你完全不必强制使用它。应用商店中有很多应用使用了 Capacitor 而没有使用 Ionic Framework。

## 我可以在哪里为我的 Capacitor 项目找到插件？

要为你的项目寻找插件，你应该按以下顺序查看以下地方。

### Capacitor Community GitHub ⚡

[Capacitor Community GitHub 组织](https://github.com/capacitor-community) 列出了我们优秀的开发者社区创建的插件。它们是原生支持 Capacitor 的插件，正在积极开发中，应该可以在任何 Capacitor 3+ 项目中运行。如果你需要插件，这里应该是你首先查看的地方之一。

### Awesome Capacitor 😎

与许多其他 [Awesome 列表](https://github.com/sindresorhus/awesome) 类似，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) 是一个社区策划的优秀 Capacitor 插件列表。如果你找不到官方或社区插件，很可能已经有人在这里制作了你需要的插件。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) 是 Chromium 团队追踪已添加到 Chromium 浏览器中的 Web API 的[跟踪器](https://fugu-tracker.web.app/#shipped)。虽然某些功能可能无法在 Android 和 iOS 上同时得到支持，但像 [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) 和 [ContactsManager（仅限 Android）](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) 这样的功能，可能会替代你用例中的 `@capacitor/share` 或 `@capacitor-community/contacts`。

你可以使用 [Can I Use...?](https://caniuse.com) 来检查是否可以在 Android 和 iOS 上使用这些功能，而**无需**任何原生插件。

### Cordova 插件 🔌

你知道吗？Capacitor 支持 Cordova 插件！如果你正从 Cordova 迁移，或者有一个没有对应 Capacitor 版本的 Cordova 插件，你可以在 Capacitor 中直接使用大多数 Cordova 插件。你可以[阅读我们的指南](https://capacitorjs.com/docs/plugins/cordova)，了解如何在 Capacitor 中使用 Cordova 插件。

## 我可以不使用 Mac 来构建 iOS 应用吗？

简短回答：不行。更详细的解释是，虽然你可以使用像 [Ionic AppFlow](https://ionic.io/appflow) 这样的云服务，但你将无法在设备或模拟器上测试你的应用。你应该始终确保使用物理设备测试你的应用，以确保你的 Capacitor 应用对使用 Apple 产品的用户是可用的。

## 为什么在 Android 模拟器上运行时会出现空白屏幕？

Capacitor 需要 Android 7 以及 WebView 版本为 60 或更高。例如，如果你创建一个 Android 7 模拟器，最新版本的 WebView 将不会被安装，你会看到一个空白的白色屏幕。为了解决这个问题，你可以安装一个更新版本的 Android 模拟器来测试你的应用。