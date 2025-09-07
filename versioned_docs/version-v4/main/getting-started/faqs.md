---
title: 常见问题解答
description: Capacitor 常见问题
slug: /getting-started/faqs
sidebar_label: 常见问题
---

# 常见问题

以下是关于 Capacitor 的常见问题清单。如果这里找不到答案，可以访问 [我们的论坛](https://forum.ionicframework.com) 或 [Discord 社区](https://ionic.link/discord)。侧边栏也列出了常见问题 👉

## Capacitor 支持哪些平台？

Capacitor 几乎可以面向任何设备，包括官方支持平台和社区平台。

### 官方平台

Capacitor 正式支持以下平台：
- iOS 13+
- Android 5.1+
  - 需要 Chrome WebView 60+
- 现代网页浏览器
  - Chrome
  - Firefox
  - Safari
  - Edge

### 社区平台

Capacitor 还有面向跨平台桌面框架的社区平台。当前社区支持的目标平台包括：
- Electron
  - https://github.com/capacitor-community/electron

## 必须配合 Ionic Framework 使用 Capacitor 吗？

完全不需要！Capacitor 可以与**任何**网页应用配合使用，不仅限于 Ionic 工具构建的应用。如果你需要特定的界面风格，而 Ionic Framework 不符合需求，完全不必强制使用。应用商店中有许多使用 Capacitor 但未集成 Ionic Framework 的应用程序。

## 在哪里可以找到 Capacitor 项目的插件？

查找项目插件时，建议按以下顺序检查这些资源：

### Capacitor 社区 GitHub ⚡

[Capacitor 社区 GitHub 组织](https://github.com/capacitor-community) 列出了由优秀开发者社区创建的插件。这些是专门为 Capacitor 开发的插件，支持 Capacitor 3+ 版本。如果需要插件，这里应是首选查找地点。

### Awesome Capacitor 清单 😎

与其他 [Awesome 清单](https://github.com/sindresorhus/awesome)类似，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor) 是由社区精心整理的优质插件集合。如果找不到官方或社区插件，这里很可能已有你需要的解决方案。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) 是 Chromium 团队追踪网页 API 的[平台](https://fugu-tracker.web.app/#shipped)。虽然某些功能可能不兼容 Android 和 iOS，但像 [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) 和 [ContactsManager（仅限 Android）](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) 这样的功能，或许能替代 `@capacitor/share` 或 `@capacitor-community/contacts` 插件。

可以通过 [Can I Use...?](https://caniuse.com) 检查这些功能在 Android 和 iOS 上的支持情况，无需依赖原生插件。

### Cordova 插件 🔌

Capacitor 支持 Cordova 插件你知道吗？如果正在从 Cordova 迁移，或有 Cordova 插件没有对应的 Capacitor 版本，可以直接在 Capacitor 中使用大多数 Cordova 插件。具体使用方法请参考 [我们的指南](https://capacitorjs.com/docs/plugins/cordova)。

## 没有 Mac 电脑能构建 iOS 应用吗？

简短回答：不能。详细来说，虽然可以使用 [Ionic AppFlow](https://ionic.io/appflow) 等云服务，但无法在设备或模拟器上测试应用。为确保应用在苹果设备上的可用性，始终建议使用真机测试。

## 为什么 Android 模拟器运行后显示白屏？

Capacitor 需要 Android 5.1 及以上版本，并且 WebView 版本需为 60 或更高。如果创建的是 Android 6 或 7 模拟器，可能未安装最新版 WebView，导致显示白屏。解决方法很简单：安装更新的 Android 模拟器进行测试。

## 在 Apple Silicon 设备上为什么出现 CocoaPods 错误？

如果在 Apple Silicon 芯片的 Mac 上通过 `sudo gem install cocoapods` 安装了 CocoaPods，运行 `npx cap update` 时可能会遇到类似以下错误：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是 `ffi` 在 Apple Silicon 电脑上安装时的 CocoaPods 兼容性问题。
推荐使用 [Homebrew 安装 CocoaPods](/main/getting-started/environment-setup.md#homebrew)。
如果已安装 Rosetta，可以先在 `x86_64` 架构下安装 `ffi`，并首次以 Intel 架构模拟运行 `pod install`：

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后 Capacitor 应该能正常运行。