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

打造一个完美无缺的原生管理工具几乎是不可能的，在 iOS 工作流程中，你迟早会遇到各种问题。

本指南尝试记录常见的 iOS/Xcode 问题及其可能的解决方案。

## iOS 工具箱

每位 iOS 开发者都会掌握一些调试 iOS 问题的常用技巧，你应该将这些技巧融入日常工作流程：

### 善用搜索引擎

任何时候遇到 iOS 或 Xcode 问题，你的第一步应该是将错误信息复制粘贴到搜索引擎进行搜索。

Capacitor 使用的是标准的 iOS 工具链，因此如果你遇到了问题，很可能许多 iOS 开发者也曾遇到过，并且已经存在解决方案。

解决方法可能很简单，比如更新依赖项、执行清理操作或删除 Derived Data。

### 清理/重新构建

清理并重新构建可以解决许多构建问题。在 Xcode 菜单中导航到 Product -> Clean Build Folder 来清理当前构建。

### 删除 Derived Data

有时，Xcode 会保留旧的、过时的构建产物。为了重新开始，你需要删除磁盘上的所有 Derived Data。

为此，打开 Xcode 偏好设置，选择 Locations 标签页，然后点击 Derived Data 路径旁边的小箭头：

![位置设置](../../../../static/img/v4/docs/ios/location-prefs.png)

这将打开一个 Finder 窗口，显示 Xcode 临时 Derived Data 的位置。

接着，选择该目录中的所有项目并删除：

![删除 Derived Data](../../../../static/img/v4/docs/ios/deleting-derived-data.png)

最后，在 Xcode 中执行重新构建。

## 错误：Sandbox 与 Podfile.lock 不同步

如果 CocoaPods 未能成功运行以安装依赖项，可能会出现此错误。

运行以下命令来更新你的 pods：

```bash
npx cap update ios
```

运行此命令后执行新的构建。

## 索引卡住

Xcode 有时会陷入无限索引状态。这种不幸的情况看起来像这样：

![Xcode 索引](../../../../static/img/v4/docs/ios/indexing.png)

唯一的解决方法是强制关闭 Xcode（使用活动监视器）并重新启动。

## Apple Silicon：`ffi` 总线错误

如果你使用 `sudo gem install cocoapods` 安装了 CocoaPods，并且使用的是 Apple Silicon 芯片的 Mac，在运行 `npx cap update` 时可能会遇到类似这样的错误：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是 CocoaPods 的一个 bug，与 `ffi` 无法在 Apple Silicon 电脑上安装有关。
我们推荐使用 [Homebrew 来安装 CocoaPods](/main/getting-started/environment-setup.md#homebrew)。
或者，如果你安装了 Rosetta，可以在 `x86_64` 架构上安装 `ffi`，并首次使用模拟的 Intel 架构运行 `pod install`。

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后，运行 Capacitor 应该就能正常工作了。

## CocoaPods：无法连接到 GitHub

在安装了旧版本 openssl 和 ruby 的 Mac 上可能会出现此错误，因为 GitHub 在访问仓库时限制了允许的加密协议。

解决方案是更新 openssl 和 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后，确保你的 `PATH` 环境变量没有将 `/usr/local/bin` 放在 `$PATH` 之后，而是应该放在其**前面**。

有关此问题的其他可能解决方案，请参阅 [这个 StackOverflow 问题](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)。

## 插件未实现

在 iOS 上，如果 Capacitor 找不到插件或无法将其代码注入 WebView，可能会发生这种情况。

首先，确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync ios`。

最后，检查插件是否在 `ios/App/Podfile` 中。如果插件未列出，请确保你的 Podfile 看起来像 [这个示例](https://github.com/ionic-team/capacitor/blob/4.x/ios-template/App/Podfile)，然后再次运行 `npx cap sync`。

如果仍然收到“插件未实现”错误，请确保 `ios/App/App/Info.plist` 中没有 `WKAppBoundDomains` 键，该键会阻止 Capacitor 和插件代码注入。如果不需要，请删除该键；如果无法删除，请在 capacitor 配置文件的 `ios` 对象中添加 `limitsNavigationsToAppBoundDomains` 并将其值设为 `true`。