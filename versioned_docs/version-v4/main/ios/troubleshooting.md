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

创建一个100%完美的原生管理工具几乎是不可能的，迟早你会遇到 iOS 工作流程中各种部分的问题。

本指南旨在记录常见的 iOS/Xcode 问题及可能的解决方案。

## iOS 工具箱

每个 iOS 开发者都会学习一些调试 iOS 问题的常用技巧，你应该将这些技巧融入到你的工作流程中：

### 谷歌搜索，谷歌搜索，再谷歌搜索

每当你遇到 iOS 或 Xcode 的问题时，第一步应该将错误信息复制并粘贴到谷歌搜索中。

Capacitor 使用标准的 iOS 工具链，所以如果你遇到问题，很可能许多 iOS 开发者也遇到过，并且已经有解决方案存在。

可能只是更新依赖、执行清理或删除 Derived Data 这样简单的操作。

### 清理/重建

清理和重建可以解决许多构建问题。在 Xcode 菜单中导航到 Product -> Clean Build Folder 来清理当前的构建。

### 删除 Derived Data

有时，Xcode 会保留旧的、过时的构建产物。要重新开始，你需要删除磁盘上的所有 Derived Data。

操作方法：打开 Xcode Preferences，选择 Locations 标签页，点击 Derived Data 路径旁边的小箭头：

![Locations](../../../../static/img/v4/docs/ios/location-prefs.png)

这会打开一个 Finder 窗口，显示 Xcode 临时 Derived Data 的位置。

接下来，选择该目录中的所有项目并删除：

![Deleting Derived Data](../../../../static/img/v4/docs/ios/deleting-derived-data.png)

最后，在 Xcode 中重新构建。

## 错误：Sandbox not in sync with the Podfile.lock

如果 CocoaPods 未能运行以安装你的依赖，可能会发生此错误。

运行以下命令来更新你的 pods：

```bash
npx cap update ios
```

运行此命令后执行一次新的构建。

## 永远在索引中（Indexing FOREVER）

Xcode 有时会卡在永久索引中。这种不幸的情况看起来是这样的：

![Xcode indexing](../../../../static/img/v4/docs/ios/indexing.png)

唯一的解决方案是强制关闭 Xcode（使用活动监视器）并重新启动。

## Apple Silicon：`ffi` 总线错误

如果你使用 `sudo gem install cocoapods` 安装了 CocoaPods，并且使用的是 Apple Silicon 驱动的 Mac，在运行 `npx cap update` 时可能会遇到类似这样的错误：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是与 `ffi` 未在 Apple Silicon 计算机上安装相关的 CocoaPods 错误。
我们建议使用 [Homebrew 安装 CocoaPods](/main/getting-started/environment-setup.md#homebrew)。
或者，如果你已安装 Rosetta，可以在 `x86_64` 架构上安装 `ffi`，并首次使用模拟的 Intel 架构运行 `pod install`。

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后，运行 Capacitor 应该可以正常工作了。

## CocoaPods：无法连接到 GitHub

在安装了旧版本 openssl 和 ruby 的 Mac 上可能会发生此错误，因为 GitHub
限制了访问仓库时允许的加密协议。

解决方案是更新 openssl 和更新 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后，确保你的 `PATH` 环境变量将 `/usr/local/bin` 放在 `$PATH` _之前_，而不是之后。

有关此问题的其他可能解决方案，请参阅 [这个 StackOverflow 问题](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)。

## 插件未实现（Plugin Not Implemented）

在 iOS 上，如果 Capacitor 找不到插件或无法将其代码注入 WebView，可能会发生这种情况。

首先，确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync ios`。

最后，检查插件是否在 `ios/App/Podfile` 中。如果插件未列出，请确保你的 Podfile 看起来像[这个文件](https://github.com/ionic-team/capacitor/blob/4.x/ios-template/App/Podfile)，然后再次运行 `npx cap sync`。

如果仍然收到"Plugin not implemented"错误，请确保 `ios/App/App/Info.plist` 中没有 `WKAppBoundDomains` 键，该键会阻止 Capacitor 和插件的代码注入。如果不需要，请移除该键，或者如果无法移除，请在 capacitor 配置文件的 `ios` 对象中添加 `limitsNavigationsToAppBoundDomains` 并将其值设置为 `true`。
