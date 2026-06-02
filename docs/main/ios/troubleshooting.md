---
title: iOS 故障排除指南
sidebar_label: 故障排除
description: iOS 故障排除指南
contributors:
  - dotNetkow
  - mlynch
  - ryanccn
slug: /ios/troubleshooting
---

# iOS 故障排除指南

创建一个 100% 完美的原生管理工具几乎是不可能的，您迟早会遇到 iOS 工作流程中的各种问题。

本指南旨在记录常见的 iOS/Xcode 问题及其可能的解决方案。

## iOS 工具箱

每个 iOS 开发者都会学到一些调试 iOS 问题的常用技巧，您应该将它们纳入您的工作流程中：

### 搜索，搜索，再搜索

每当您在 iOS 或 Xcode 中遇到问题时，第一步应该是将错误信息复制粘贴到 Google 中搜索。

Capacitor 使用标准的 iOS 工具链，因此如果您遇到问题，很可能许多 iOS 开发者也遇到过，并且存在相应的解决方案。

解决方案可能简单到更新依赖、执行 Clean 或删除 Derived Data。

### Clean/重新构建

清理并重新构建可以解决许多构建问题。在 Xcode 菜单中导航到 Product -> Clean Build Folder 来清理当前构建。

### 删除 Derived Data

有时，Xcode 会保留旧的、过时的构建产物。要重新开始，您需要删除磁盘上的所有 Derived Data。

为此，请打开 Xcode Preferences，选择 Locations 标签，然后点击 Derived Data 路径旁边的小箭头：

![Locations](../../../static/img/v6/docs/ios/location-prefs.png)

这将打开一个 Finder 窗口，指向 Xcode 临时 Derived Data 的位置。

接下来，选择该目录中的所有项目并删除：

![删除 Derived Data](../../../static/img/v6/docs/ios/deleting-derived-data.png)

最后，在 Xcode 中重新构建。

## 错误：Sandbox 与 Podfile.lock 不同步

如果 CocoaPods 无法运行来安装依赖项，可能会出现此错误。

运行以下命令来更新您的 pods：

```bash
npx cap update ios
```

运行此命令后执行一次新的构建。

## 一直处在索引中

Xcode 有时会卡在无限索引中。这种情况看起来是这样的：

![Xcode 索引](../../../static/img/v6/docs/ios/indexing.png)

唯一的解决方法是强制关闭 Xcode（使用活动监视器）并重新启动。

## CocoaPods：无法连接到 GitHub

如果您的 Mac 上安装了旧版本的 openssl 和 ruby，可能会在访问仓库时出现此错误，因为 GitHub 限制了允许的加密协议。

解决方案是更新 openssl 和 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后，请确保您的 `PATH` 环境变量中 `/usr/local/bin` 位于 `$PATH` 之**前**，而不是之后。

有关此问题的其他可能解决方案，请参阅 [StackOverflow 上的这个问题](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)。

## 插件未实现

在 iOS 上，如果 Capacitor 找不到插件或无法将其代码注入 WebView，可能会出现此问题。

首先，确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync ios`。

最后，检查插件是否在 `ios/App/Podfile` 中。如果插件未列出，请确保您的 Podfile 看起来像[这个文件](https://github.com/ionic-team/capacitor/blob/main/ios-pods-template/App/Podfile)，然后再次运行 `npx cap sync`。

如果仍然收到"插件未实现"的错误，请确保您在 `ios/App/App/Info.plist` 中没有 `WKAppBoundDomains` 键，该键会阻止 Capacitor 和插件的代码注入。如果不需要，请移除该键；如果无法移除，请在您的 capacitor 配置文件的 `ios` 对象中添加 `limitsNavigationsToAppBoundDomains` 并将其值设置为 `true`。
