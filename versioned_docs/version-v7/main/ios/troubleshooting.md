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

创建一个 100% 完美的原生管理工具几乎是不可能的，迟早你会遇到 iOS 工作流程中的各种问题。

本指南试图记录常见的 iOS/Xcode 问题及可能的解决方案。

## iOS 工具箱

每个 iOS 开发者都会学到一些调试 iOS 问题的常用技术，你应该将它们纳入你的工作流程：

### 善用搜索

每当你遇到 iOS 或 Xcode 的问题时，第一步应该是将错误信息复制并粘贴到搜索引擎中进行搜索。

Capacitor 使用标准的 iOS 工具链，所以如果你遇到问题，很可能许多 iOS 开发者也遇到过，并且已经有解决方案存在。

可能只需要更新依赖、执行清理或删除 Derived Data。

### 清理/重建

清理和重建可以解决许多构建问题。在 Xcode 菜单中导航到 Product -> Clean Build Folder 来清理当前构建。

### 删除 Derived Data

有时，Xcode 会保留旧的、过时的构建产物。要重新开始，你需要删除磁盘上的所有 Derived Data。

要执行此操作，打开 Xcode Preferences，选择 Locations 选项卡，然后点击 Derived Data 路径旁边的小箭头：

![位置](/img/v6/docs/ios/location-prefs.png)

这会在 Finder 中打开 Xcode 临时 Derived Data 的位置。

接下来，选择该目录中的所有项目并删除：

![删除 Derived Data](/img/v6/docs/ios/deleting-derived-data.png)

最后，在 Xcode 中重新构建。

## 错误：Sandbox not in sync with the Podfile.lock

如果 CocoaPods 无法运行来安装你的依赖，可能会发生此错误。

运行以下命令来更新你的 pods：

```bash
npx cap update ios
```

运行此命令后执行一次新的构建。

## 无限索引

Xcode 有时会陷入无限索引的状态。这种不幸的情况看起来像这样：

![Xcode 索引](/img/v6/docs/ios/indexing.png)

唯一的解决方案是强制关闭 Xcode（使用活动监视器）并重新启动。

## CocoaPods：无法连接到 GitHub

此错误可能发生在安装了旧版本 openssl 和 ruby 的 Mac 上，因为 GitHub 限制了访问仓库时允许的加密协议。

解决方案是更新 openssl 和 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后，确保你的 `PATH` 环境变量没有将 `/usr/local/bin` 放在 `$PATH` 之后，而是放在_之前_。

有关此问题的其他可能解决方案，请参阅 [这个 StackOverflow 问题](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)。

## 插件未实现

在 iOS 上，如果 Capacitor 找不到插件或无法将其代码注入到 WebView 中，可能会发生此问题。

首先，确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync ios`。

最后，检查插件是否在 `ios/App/Podfile` 中。如果插件未列出，请确保你的 Podfile 看起来像[这个](https://github.com/ionic-team/capacitor/blob/main/ios-pods-template/App/Podfile)，然后再次运行 `npx cap sync`。

如果仍然出现"Plugin not implemented"错误，请确保你在 `ios/App/App/Info.plist` 中没有 `WKAppBoundDomains` 键，该键会阻止 Capacitor 和插件的代码注入。如果不需要则删除该键，如果无法删除，请在你的 capacitor 配置文件的 `ios` 对象中添加 `limitsNavigationsToAppBoundDomains` 并设置为 `true`。
