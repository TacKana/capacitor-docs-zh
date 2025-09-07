---
title: 常见问题解答
description: Capacitor 常见问题
slug: /getting-started/faqs
sidebar_label: 常见问题
---

# 常见问题

以下是关于 Capacitor 的常见问题列表。如果您在这里找不到答案，可以访问[我们的论坛](https://forum.ionicframework.com) 或 [Discord 社区](https://ionic.link/discord)。侧边栏也列出了更多常见问题 👉

## Capacitor 支持哪些平台？

Capacitor 能够支持几乎所有设备平台，包括官方维护和社区开发的平台。

### 官方平台

Capacitor 官方支持以下平台：
- iOS 13+
- Android 5.1+
  - 需要 Chrome WebView 60+ 版本
- 现代网页浏览器
  - Chrome
  - Firefox
  - Safari
  - Edge

### 社区平台

Capacitor 还有社区开发的跨平台桌面框架支持。目前社区支持的目标平台包括：
- Electron
  - https://github.com/capacitor-community/electron

## 必须配合 Ionic 框架使用 Capacitor 吗？

完全不需要！Capacitor 可以与任何网页应用配合使用，不仅限于 Ionic 工具构建的应用。如果您需要特定的界面风格，而 Ionic 框架不符合需求，完全不必强制使用。应用商店中有许多使用 Capacitor 但未采用 Ionic 框架的应用案例。

## 在哪里能找到 Capacitor 项目所需的插件？

查找插件建议按照以下顺序检查这些资源：

### 官方插件 ⚡

[Capacitor 官方插件库](https://github.com/ionic-team/capacitor-plugins) 由 Capacitor 团队维护，提供常用原生 API 的访问。需要插件时应优先考虑这里。

### 社区 GitHub ⚡

[Capacitor 社区 GitHub 组织](https://github.com/capacitor-community) 收录了开发者社区开发的优质插件。这些专为 Capacitor 3+ 项目设计的插件都在积极维护中。若官方插件不满足需求，这里应是您的下一站。

### 精选插件合集 😎

与其他众多 [Awesome 列表](https://github.com/sindresorhus/awesome) 类似，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) 是社区整理的优质插件合集。如果前两者都没有您需要的插件，很可能在这里能找到现成方案。

### 网页能力项目 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) 是 Chromium 团队追踪[已实现网页 API](https://fugu-tracker.web.app/#shipped) 的项目。虽然部分功能可能不兼容 iOS，但如 [网页分享](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) 和 [联系人管理（仅 Android）](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) 等功能，或许能直接替代 `@capacitor/share` 或 `@capacitor-community/contacts` 插件。

您可以通过 [Can I Use...?](https://caniuse.com) 查询这些功能在 Android 和 iOS 上的支持情况，无需依赖原生插件也能实现需求。

### Cordova 插件 🔌

Capacitor 兼容 Cordova 插件！无论是从 Cordova 迁移，还是需要使用没有 Capacitor 替代方案的 Cordova 插件，大多数 Cordova 插件都可以直接在 Capacitor 中使用。具体使用方法请参阅[我们的指南](https://capacitorjs.com/docs/plugins/cordova)。

## 没有 Mac 电脑能开发 iOS 应用吗？

简单回答：不能。详细来说，虽然可以使用 [Ionic AppFlow](https://ionic.io/appflow) 等云服务，但您将无法在设备或模拟器上测试应用。为确保应用在苹果设备上的可用性，始终建议使用真机测试。

## 为什么 Android 模拟器上运行显示空白屏幕？

Capacitor 要求 Android 5.1 及以上版本，且 WebView 版本需 60+。如果创建的是 Android 6 或 7 模拟器，默认不会安装最新版 WebView，导致出现空白屏幕。解决方法：创建新版 Android 模拟器进行测试。

## 为什么在 Apple Silicon 设备上出现 CocoaPods 错误？

如果在 Apple Silicon 芯片的 Mac 上通过 `sudo gem install cocoapods` 安装 CocoaPods，运行 `npx cap update` 时可能会遇到类似错误：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是 CocoaPods 在 Apple Silicon 电脑上安装 `ffi` 时的兼容性问题。我们推荐使用 [Homebrew 安装 CocoaPods](/main/getting-started/environment-setup.md#homebrew)。

如果已安装 Rosetta，也可以通过 x86_64 架构安装 `ffi` 并首次运行：

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后 Capacitor 即可正常运行。