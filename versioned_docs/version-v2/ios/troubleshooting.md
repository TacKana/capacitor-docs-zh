---
title: iOS 故障排除指南
description: iOS 故障排除指南
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios/troubleshooting
---

# iOS 故障排除指南

创建一个 100% 完美的原生管理工具几乎是不可能的，您迟早会遇到 iOS 工作流各个部分的各种问题。

本指南旨在记录常见的 iOS/Xcode 问题及可能的解决方案。

## iOS 工具箱

每位 iOS 开发者都会学到一些调试 iOS 问题的常用技巧，您应该将它们融入到您的工作流中：

### Google、Google 再 Google

每当您遇到 iOS 或 Xcode 的问题时，第一步应该是将错误信息复制并粘贴到 Google 中搜索。

Capacitor 使用标准的 iOS 工具链，因此如果您遇到问题，很可能许多 iOS 开发者也遇到过，并且存在相应的解决方案。

解决方案可能简单到更新依赖项、运行 clean 或删除 Derived Data。

### 清理/重新构建

清理和重新构建可以解决许多构建问题。导航到 Xcode 菜单中的 Product -> Clean Build Folder 来清理当前构建。

### 删除 Derived Data

有时，Xcode 会紧抓着旧的、过时的构建工件不放。要重新开始，您需要删除磁盘上的任何 Derived Data。

为此，请打开 Xcode Preferences，选择 Locations 选项卡，然后点击 Derived Data 路径旁边的小箭头：

![Locations](../../../static/img/v3/docs/ios/location-prefs.png)

这将打开一个 Finder 窗口，指向 Xcode 临时 Derived Data 的位置。

接下来，选择该目录中的所有项目并删除：

![Deleting Derived Data](../../../static/img/v3/docs/ios/deleting-derived-data.png)

最后，在 Xcode 中重新构建。

## 错误：Unable to export required Bridge JavaScript

![Can't export](../../../static/img/v3/docs/ios/export-bridge.png)

当 Capacitor 的 `native-bridge.js` 文件未复制到原生项目时，会出现此错误。

解决方法很简单：运行 `npx cap copy ios` 复制此文件。

## 错误：Sandbox not in sync with the Podfile.lock

如果 CocoaPods 未能运行以安装您的依赖项，可能会出现此错误。

运行此命令来更新您的 pods：

```bash
npx cap update ios
```

运行此命令后执行一次新的构建。

## 无限索引

Xcode 有时会卡在无限索引中。这种不幸的情况看起来像这样：

![Xcode indexing](../../../static/img/v3/docs/ios/indexing.png)

唯一的解决方案是强制关闭 Xcode（使用活动监视器）并重新启动。

## CocoaPods：Failed to connect to GitHub

如果 Mac 上安装了旧版本的 openssl 和 ruby，可能会发生此错误，因为 GitHub
限制了访问仓库时允许的加密协议。

解决方案是更新 openssl 和更新 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后，确保您的 `PATH` 环境变量没有将 `/usr/local/bin` 放在 `$PATH` 之后，而是放在 _其之前_。

请参见 [此 StackOverflow 问题](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424) 了解此问题的其他可能解决方案。