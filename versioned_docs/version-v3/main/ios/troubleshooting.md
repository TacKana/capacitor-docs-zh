---
title: iOS 问题排查指南
sidebar_label: 问题排查
description: iOS 问题排查指南
contributors:
  - dotNetkow
  - mlynch
  - ryanccn
slug: /ios/troubleshooting
---

# iOS 问题排查指南

创建一个 100% 完美的原生管理工具几乎是不可能的，迟早您会遇到 iOS 工作流中的各种问题。

本指南旨在记录常见的 iOS/Xcode 问题并提供可能的解决方案。

## iOS 工具箱

每位 iOS 开发者都会掌握一些调试 iOS 问题的常用技巧，您也应该将它们纳入您的工作流程：

### Google、Google、再 Google

每当您遇到 iOS 或 Xcode 相关的问题时，第一步应该是将错误信息复制并粘贴到 Google 中搜索。

Capacitor 使用标准的 iOS 工具集，因此如果您遇到问题，很可能许多 iOS 开发者也遇到过，并且已有解决方案。

这可能简单到只需更新依赖项、运行清理或删除 Derived Data。

### 清理/重新构建

清理和重新构建可以修复许多构建问题。在 Xcode 菜单中导航到 Product -> Clean Build Folder 来清理当前的构建。

### 删除 Derived Data

有时，Xcode 会固守旧的、过时的构建产物。要重新开始，您需要删除磁盘上的任何 Derived Data。

为此，请打开 Xcode Preferences，选择 Locations 选项卡，然后点击 Derived Data 路径旁边的小箭头：

![位置](../../../../static/img/v3/docs/ios/location-prefs.png)

这会打开一个 Finder 窗口，指向 Xcode 临时 Derived Data 的位置。

接下来，选择该目录中的所有项目并删除：

![删除 Derived Data](../../../../static/img/v3/docs/ios/deleting-derived-data.png)

最后，在 Xcode 中重新构建。

## 错误：Sandbox not in sync with the Podfile.lock

如果 CocoaPods 无法运行以安装您的依赖项，可能会发生此错误。

运行此命令来更新您的 pods：

```bash
npx cap update ios
```

运行此命令后执行新的构建。

## 一直索引中

Xcode 有时会陷入无限索引的状态。这种不幸的情况如下所示：

![Xcode 索引中](../../../../static/img/v3/docs/ios/indexing.png)

唯一的解决方案是强制关闭 Xcode（使用 Activity Monitor）并重新启动。

## Apple Silicon：`ffi` Bus Error

如果您使用 `sudo gem install cocoapods` 安装了 CocoaPods，并且您使用的是 Apple Silicon 芯片的 Mac，则在运行 `npx cap update` 时可能会遇到类似以下问题：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是与 `ffi` 未能在 Apple Silicon 计算机上安装相关的 CocoaPods 错误。
我们建议使用 Homebrew 安装 CocoaPods。
或者，如果您已安装 Rosetta，您可以在 `x86_64` 架构上安装 `ffi`，并使用模拟的 Intel 架构首次运行 `pod install`。

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后，运行 Capacitor 应该可以正常工作。

## CocoaPods：无法连接到 GitHub

此错误可能出现在安装了旧版本 openssl 和 ruby 的 Mac 上，因为 GitHub 限制了访问仓库时允许的加密协议。

解决方案是更新 openssl 和更新 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后，确保您的 `PATH` 环境变量不会将 `/usr/local/bin` 放在 `$PATH` 之后，而是放在它_之前_。

请参阅 [StackOverflow 上的这个问题](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)以了解此问题的其他解决方案。

## 插件未实现

在 iOS 上，如果 Capacitor 找不到插件或无法将其代码注入到 WebView 中，可能会发生此问题。

首先，确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync ios`。

最后，检查插件是否在 `ios/App/Podfile` 中。如果插件未列出，请确保您的 Podfile 看起来像[这个文件](https://github.com/ionic-team/capacitor/blob/3.x/ios-template/App/Podfile)，然后再次运行 `npx cap sync`。

如果仍然出现 "Plugin not implemented" 错误，请确保您没有在 `ios/App/App/Info.plist` 中包含 `WKAppBoundDomains` 键，因为这会阻止 Capacitor 和插件代码的注入。如果不需要，请移除该键；如果无法移除，请在您的 capacitor 配置文件的 `ios` 对象中添加值为 `true` 的 `limitsNavigationsToAppBoundDomains`。
