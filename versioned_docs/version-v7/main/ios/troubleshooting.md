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

要创建一个 100% 完美的原生管理工具几乎是不可能的，您迟早会在 iOS 工作流程的某个环节遇到各种问题。

本指南尝试记录常见的 iOS/Xcode 问题及其可能的解决方案。

## iOS 工具箱

每位 iOS 开发者都会学习一些调试 iOS 问题的常用技巧，您应该将这些技巧融入您的工作流程中：

### 善用搜索

每当遇到 iOS 或 Xcode 相关的问题时，您的第一步都应该是将错误信息复制并粘贴到搜索引擎中进行搜索。

Capacitor 使用标准的 iOS 工具链，因此如果您遇到了问题，很可能许多 iOS 开发者也曾遇到过，并且已经有现成的解决方案。

解决方案可能很简单，比如更新依赖、执行清理操作或删除派生数据。

### 清理/重新构建

清理和重新构建可以解决许多构建问题。在 Xcode 菜单中导航到“产品”->“清理构建文件夹”来清理当前构建。

### 删除派生数据

有时，Xcode 会保留旧的、过时的构建产物。要重新开始，您需要删除磁盘上的所有派生数据。

具体操作是：打开 Xcode 偏好设置，选择“位置”选项卡，然后点击派生数据路径旁边的小箭头：

![位置](/img/v6/docs/ios/location-prefs.png)

这会打开一个 Finder 窗口，显示 Xcode 临时派生数据的存储位置。

接着，选中该目录中的所有项目并删除：

![删除派生数据](/img/v6/docs/ios/deleting-derived-data.png)

最后，在 Xcode 中执行重新构建。

## 错误：沙盒与 Podfile.lock 不同步

如果 CocoaPods 未能成功运行以安装您的依赖项，就可能发生此错误。

运行以下命令来更新您的 pods：

```bash
npx cap update ios
```

运行此命令后，执行一次新的构建。

## 索引过程卡住

Xcode 有时会陷入无限索引的状态。这种糟糕的情况看起来像这样：

![Xcode 索引中](/img/v6/docs/ios/indexing.png)

唯一的解决方案是强制关闭 Xcode（使用活动监视器）并重新启动它。

## CocoaPods：无法连接到 GitHub

在安装了旧版本 openssl 和 ruby 的 Mac 上可能会出现此错误，因为 GitHub 在访问仓库时限制了允许的加密协议。

解决方案是更新 openssl 和 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后，请确保您的 `PATH` 环境变量没有将 `/usr/local/bin` 放在 `$PATH` 之后，而是要放在它**之前**。

有关此问题的其他可能解决方案，请参阅 [这个 StackOverflow 问题](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)。

## 插件未实现

在 iOS 上，如果 Capacitor 找不到插件或无法将其代码注入到 WebView 中，就可能出现此问题。

首先，请确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync ios`。

最后，检查插件是否在 `ios/App/Podfile` 中。如果插件未列出，请确保您的 Podfile 看起来像 [这个示例](https://github.com/ionic-team/capacitor/blob/main/ios-pods-template/App/Podfile)，并再次运行 `npx cap sync`。

如果仍然收到“插件未实现”错误，请确保您的 `ios/App/App/Info.plist` 中没有 `WKAppBoundDomains` 键，该键会阻止 Capacitor 和插件代码的注入。如果不需要该键，请移除它；如果无法移除，请在您的 capacitor 配置文件中，在 `ios` 对象内添加 `limitsNavigationsToAppBoundDomains` 并设置其值为 `true`。