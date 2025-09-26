---
title: 常见问题解答
description: Capacitor 常见问题
slug: /getting-started/faqs
sidebar_label: 常见问题
---

# 常见问题

以下是关于 Capacitor 的常见问题列表。如果这里没有您需要的答案，可以访问 [我们的论坛](https://forum.ionicframework.com) 或 [Discord 社区](https://ionic.link/discord)。侧边栏也提供了常见问题列表 👉

## Capacitor 支持哪些平台？

Capacitor 可以通过官方和社区平台支持几乎所有设备。

### 官方支持平台

Capacitor 官方支持以下平台：
- iOS 14+
- Android 6+
  - 需要 Chrome WebView 60+ 版本
- 现代网页浏览器
  - Chrome
  - Firefox
  - Safari
  - Edge

### 社区平台

Capacitor 社区还提供了面向跨平台桌面框架的支持。目前的社区目标平台包括：
- Electron
  - https://github.com/capacitor-community/electron

## 必须配合 Ionic 框架使用 Capacitor 吗？

不需要！Capacitor 可以与**任何**网页应用程序配合使用，不仅限于 Ionic 工具构建的应用。如果您需要特定的应用外观和体验，而 Ionic 框架不是适合的 UI 工具包，您完全不必强制使用它。应用商店中有许多应用只使用了 Capacitor 而没有使用 Ionic 框架。

## 在哪里可以找到 Capacitor 项目所需的插件？

查找插件时，建议按以下顺序检查这些资源：

### Capacitor 社区 GitHub ⚡

[Capacitor 社区 GitHub 组织](https://github.com/capacitor-community) 列出了由优秀开发者社区创建的插件。这些是专为 Capacitor 3+ 项目设计的插件，且持续维护。如需插件，这里应该是您的首选之一。

### Awesome Capacitor 列表 😎

与其他 [Awesome 列表](https://github.com/sindresorhus/awesome)类似，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) 是由社区精选的优秀 Capacitor 插件集合。如果官方或社区没有您需要的插件，这里很可能已有开发者实现了您想要的功能。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) 是 Chromium 团队追踪新增网页 API 的[项目](https://fugu-tracker.web.app/#shipped)。虽然某些功能可能不兼容 Android 和 iOS，但像 [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) 和 [ContactsManager（仅限 Android）](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) 这样的功能可能直接替代 `@capacitor/share` 或 `@capacitor-community/contacts` 插件。

您可以通过 [Can I Use...?](https://caniuse.com) 查询这些功能在 Android 和 iOS 上的支持情况，有时甚至无需安装原生插件。

### Cordova 插件 🔌

您知道 Capacitor 支持 Cordova 插件吗？如果您正从 Cordova 迁移，或需要某个没有对应 Capacitor 版本的 Cordova 插件，大部分 Cordova 插件都可以直接在 Capacitor 中使用。请参阅 [我们的指南](https://capacitorjs.com/docs/plugins/cordova) 了解详细使用方法。

## 不使用 Mac 能构建 iOS 应用吗？

简短回答：不行。更详细的解释是，虽然可以使用 [Ionic AppFlow](https://ionic.io/appflow) 等云服务，但您将无法在设备或模拟器上测试应用。为确保应用对苹果用户友好，始终建议使用真机进行测试。

## 为什么 Android 模拟器运行时显示白屏？

Capacitor 需要 Android 6 及以上系统，并且 WebView 版本不低于 60。如果您创建的是 Android 6 或 7 的模拟器，系统不会预装最新版 WebView，导致出现空白白屏。解决方法是为测试创建新版 Android 模拟器。