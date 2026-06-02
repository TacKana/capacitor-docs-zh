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

创建一个 100% 完美的原生管理工具几乎是不可能的，迟早您会遇到 iOS 工作流中的各种问题。

本指南尝试记录常见的 iOS/Xcode 问题及其可能的解决方案。

## iOS 工具箱

每位 iOS 开发者都会学到一些调试 iOS 问题的常用技巧，您应该将这些技巧融入到您的工作流中：

### 谷歌，谷歌，再谷歌

每当您在 iOS 或 Xcode 方面遇到问题时，第一步应该是将错误信息复制粘贴到 Google 搜索中。

Capacitor 使用标准的 iOS 工具链，因此如果您遇到问题，很可能很多 iOS 开发者也遇到过，并且已经有了解决方案。

可能就像更新依赖项、运行清理或删除 Derived Data 一样简单。

### 清理/重建

清理和重建可以修复许多构建问题。导航到 Xcode 菜单中的 Product -> Clean Build Folder 来清理当前的构建。

### 删除 Derived Data

有时，Xcode 会紧抓着过时的构建产物不放。要重新开始，您需要删除磁盘上的所有 Derived Data。

要执行此操作，请打开 Xcode Preferences，选择 Locations 标签，然后点击 Derived Data 路径旁边的小箭头：

![位置](../../../../static/img/v5/docs/ios/location-prefs.png)

这将打开一个 Finder 窗口，指向 Xcode 临时 Derived Data 的位置。

接下来，选择该目录中的所有项目并删除：

![删除 Derived Data](../../../../static/img/v5/docs/ios/deleting-derived-data.png)

最后，在 Xcode 中执行重建。

## 错误：Sandbox not in sync with the Podfile.lock

如果 CocoaPods 未能运行以安装您的依赖项，可能会出现此错误。

运行以下命令来更新您的 pods：

```bash
npx cap update ios
```

运行此命令后执行一次新的构建。

## 索引永远进行中

Xcode 有时会卡在索引中永远进行。这种不幸的情况如下所示：

![Xcode 索引](../../../../static/img/v5/docs/ios/indexing.png)

唯一的解决方案是强制关闭 Xcode（使用活动监视器）并重新启动。

## Apple Silicon：`ffi` 总线错误

如果您使用 `sudo gem install cocoapods` 安装了 CocoaPods，并且使用的是 Apple Silicon 驱动的 Mac，则在运行 `npx cap update` 时可能会遇到类似以下的情况：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是一个与 `ffi` 未在 Apple Silicon 计算机上安装相关的 CocoaPods 错误。我们建议[使用 Homebrew 安装 CocoaPods](/main/getting-started/environment-setup.md#homebrew)。或者，如果您已安装 Rosetta，可以在 `x86_64` 架构上安装 `ffi`，并首次使用模拟的 Intel 架构运行 `pod install`。

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后，运行 Capacitor 应该可以正常工作。

## CocoaPods：无法连接到 GitHub

在安装了旧版本 openssl 和 ruby 的 Mac 上可能会发生此错误，因为 GitHub 限制了访问仓库时允许的加密协议。

解决方案是更新 openssl 并更新 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后，确保您的 `PATH` 环境变量没有将 `/usr/local/bin` 放在 `$PATH` 之后，而是放在它**之前**。

请参阅 [StackOverflow 上的这个问题](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)以获取此问题的其他可能解决方案。

## 插件未实现

在 iOS 上，如果 Capacitor 找不到插件或无法将其代码注入 WebView，可能会发生此情况。

首先，确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync ios`。

最后，检查插件是否在 `ios/App/Podfile` 中。如果插件未列出，请确保您的 Podfile 看起来像[这个](https://github.com/ionic-team/capacitor/blob/5.x/ios-template/App/Podfile)，然后重新运行 `npx cap sync`。

如果仍然出现"Plugin not implemented"错误，请确保您在 `ios/App/App/Info.plist` 中没有 `WKAppBoundDomains` 键，这会阻止 Capacitor 和插件代码的注入。如果不需要，请移除该键，或者如果不能移除，请在您的 capacitor 配置文件的 `ios` 对象中添加 `limitsNavigationsToAppBoundDomains` 并将其值设置为 `true`。
