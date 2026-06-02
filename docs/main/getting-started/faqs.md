---
title: 常见问题
description: Capacitor 常见问题
slug: /getting-started/faqs
sidebar_label: 常见问题
---

# 常见问题

以下是一些 Capacitor 的常见问题。如果在此处找不到答案，请查看[我们的论坛](https://forum.ionicframework.com)或[我们的 Discord](https://ionic.link/discord)。请查看侧边栏中的常见问题列表 👉

## Capacitor 支持哪些平台？

Capacitor 可以通过我们的官方平台和社区平台支持几乎任何设备。

### 官方平台

Capacitor 官方支持以下平台：
- iOS 15+
- Android 7+
  - 需要 Chrome WebView 60+
- 现代 Web 浏览器
  - Chrome
  - Firefox
  - Safari
  - Edge

### 社区平台

Capacitor 还拥有社区平台，以支持跨平台桌面框架。当前的社区目标如下：
- Electron
  - https://github.com/capacitor-community/electron

## 我是否需要将 Capacitor 与 Ionic Framework 一起使用？

不需要！Capacitor 可以**任何** Web 应用程序配合使用，不仅仅是那些使用其他 Ionic 工具构建的应用。如果你希望为 Capacitor 应用实现特定的外观和风格，而 Ionic Framework 不适合你的 UI 工具包，你完全不必被迫使用它。两个应用商店中都有大量应用使用 Capacitor 而非 Ionic Framework。

## 在哪里可以找到 Capacitor 项目的插件？

要查找项目的插件，请按以下顺序查看这些地方。

### Capacitor Community GitHub ⚡

[Capacitor Community GitHub 组织](https://github.com/capacitor-community)列出了我们优秀开发者社区创建的插件。这些是优先为 Capacitor 开发的插件，处于积极开发状态，应该可以在任何 Capacitor 3+ 项目中使用。如果你需要插件，这应该是你优先查看的地方之一。

### Awesome Capacitor 😎

与其他许多 [Awesome 列表](https://github.com/sindresorhus/awesome)一样，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) 是一个由社区精选的优秀 Capacitor 插件列表。如果你找不到官方或社区插件，很可能已经有人在这里创建了你需要的插件。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) 是 Chromium 团队用于追踪已添加到 Chromium 浏览器中的 Web API 的[跟踪器](https://fugu-tracker.web.app/#shipped)。虽然某些特性可能无法同时在 Android 和 iOS 上得到支持，但像 [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) 和 [ContactsManager（仅限 Android）](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) 这样的特性，在某些使用场景下可以替代 `@capacitor/share` 或 `@capacitor-community/contacts`。

你可以使用 [Can I Use...?](https://caniuse.com) 来检查是否可以在 Android 和 iOS 上使用这些特性，而**无需**任何原生插件。

### Cordova 插件 🔌

你知道 Capacitor 支持 Cordova 插件吗？如果你正在从 Cordova 迁移，或者有某个 Cordova 插件没有对应的 Capacitor 版本，你可以在 Capacitor 中直接使用大多数 Cordova 插件。你可以[阅读我们的指南](https://capacitorjs.com/docs/plugins/cordova)，了解如何在 Capacitor 中使用 Cordova 插件。

## 没有 Mac 也能用 Capacitor 构建 iOS 应用吗？

简短的回答是：不能。更详细的回答是：虽然你可以使用像 [Ionic AppFlow](https://ionic.io/appflow) 这样的云服务，但你将无法在设备或模拟器上测试你的应用。你应该始终确保在物理设备上测试应用，以保证你的 Capacitor 应用对使用 Apple 产品的用户是可用的。

## 为什么在 Android 模拟器上运行时会出现空白屏幕？

Capacitor 需要 Android 7 以及 WebView 版本 60 或更高版本。例如，如果你创建了一个 Android 7 模拟器，但未安装最新版本的 WebView，就会出现空白屏幕。要解决此问题，你可以安装更新的 Android 模拟器来测试你的应用。

