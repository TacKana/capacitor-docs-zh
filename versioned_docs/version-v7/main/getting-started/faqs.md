---
title: 常见问题
description: Capacitor 常见问题解答
slug: /getting-started/faqs
sidebar_label: 常见问题
---

# 常见问题

以下是关于 Capacitor 的一些常见问题解答。如果在这里没有找到答案，可以查看[我们的论坛](https://forum.ionicframework.com)或[加入我们的 Discord](https://ionic.link/discord)。👉 侧边栏也列出了常见问题列表。

## Capacitor 支持哪些平台？

Capacitor 可以通过官方和社区平台支持几乎所有设备。

### 官方平台

Capacitor 官方支持以下平台：
- iOS 14+
- Android 6+
  - 需要 Chrome WebView 60+
- 现代网页浏览器
  - Chrome
  - Firefox
  - Safari
  - Edge

### 社区平台

Capacitor 也有社区平台支持跨平台桌面框架。目前的社区目标平台如下：
- Electron
  - https://github.com/capacitor-community/electron

## 我必须和 Ionic Framework 一起使用 Capacitor 吗？

不！完全不需要！Capacitor 可以与**任何**网络应用程序配合使用，不仅限于使用其他 Ionic 工具构建的应用程序。如果你希望应用有特定的外观和感觉，而 Ionic Framework 不适合作为你的 UI 工具包，那就不必强制使用它。在两个应用商店中，都有许多使用 Capacitor 而没有使用 Ionic Framework 的应用程序。

## 在哪里可以找到 Capacitor 项目的插件？

要为你的项目寻找插件，建议按以下顺序查看这些地方。

### Capacitor 社区 GitHub ⚡

[Capacitor 社区 GitHub 组织](https://github.com/capacitor-community)列出了我们优秀的开发者社区创建的插件。这些是 Capacitor 优先的插件，积极开发，并且应该能在任何 Capacitor 3+ 项目中运行。如果你需要插件，这应该是你首先查看的地方之一。

### Awesome Capacitor 😎

与其他许多 [Awesome 列表](https://github.com/sindresorhus/awesome)类似，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) 是一个社区策划的优秀 Capacitor 插件列表。如果你找不到官方或社区插件，很可能有人已经在这里制作了你需要的插件。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) 是 Chromium 团队追踪已添加到 Chromium 浏览器中的 Web API 的[跟踪器](https://fugu-tracker.web.app/#shipped)。虽然某些功能可能无法同时在 Android 和 iOS 上得到支持，但像 [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) 和 [ContactsManager (仅限 Android)](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) 这样的功能，可能会在你的使用场景中替代 `@capacitor/share` 或 `@capacitor-community/contacts`。

你可以使用 [Can I Use...?](https://caniuse.com) 来检查是否可以在 Android 和 iOS 上使用这些功能，而**不需要**任何原生插件。

### Cordova 插件 🔌

你知道 Capacitor 支持 Cordova 插件吗？如果你正在从 Cordova 迁移，或者有一个 Cordova 插件没有对应的 Capacitor 版本，你可以在 Capacitor 中直接使用大多数 Cordova 插件。你可以[阅读我们的指南](https://capacitorjs.com/docs/plugins/cordova)了解如何在 Capacitor 中使用 Cordova 插件。

## 我可以不用 Mac 来构建 iOS 应用吗？

简短的回答是：不行。更详细的解释是：虽然你可以使用像 [Ionic AppFlow](https://ionic.io/appflow) 这样的云服务，但你将无法在设备或模拟器上测试你的应用程序。你应该始终确保在物理设备上测试你的应用程序，以确保使用 Apple 产品的用户能够正常使用你的 Capacitor 应用。

## 为什么在 Android 模拟器上运行时会出现白屏？

Capacitor 需要 Android 6 以及 WebView 版本 60 或更高。例如，如果你创建了一个 Android 6 或 7 的模拟器，最新的 WebView 版本将不会被安装，你将会看到一个空白的白屏。为了解决这个问题，你可以安装一个较新版本的 Android 模拟器来测试你的应用程序。