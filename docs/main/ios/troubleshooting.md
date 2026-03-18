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

要打造一个100%完美的原生管理工具几乎是不可能的，在iOS工作流程中，你迟早会遇到各种问题。

本指南尝试记录常见的iOS/Xcode问题及其可能的解决方案。

## iOS 工具箱

每位iOS开发者都会学习一些调试iOS问题的常用技巧，你应该将这些技巧融入你的工作流程中：

### 搜索、搜索、再搜索

每当遇到iOS或Xcode问题时，你的第一步应该是将错误信息复制并粘贴到搜索引擎中进行搜索。

Capacitor使用标准的iOS工具链，所以很可能你遇到的问题，许多iOS开发者也曾遇到过，并且已经存在解决方案。

解决方法可能很简单，比如更新依赖、执行清理操作或删除Derived Data。

### 清理/重新构建

清理并重新构建可以解决许多构建问题。在Xcode菜单中导航至“Product”（产品）->“Clean Build Folder”（清理构建文件夹）来清理当前构建。

### 删除Derived Data

有时，Xcode会保留旧的、过时的构建产物。要重新开始，你需要删除磁盘上的所有Derived Data。

为此，打开Xcode偏好设置，选择“Locations”（位置）选项卡，然后点击Derived Data路径旁边的小箭头：

![位置](../../../static/img/v6/docs/ios/location-prefs.png)

这将打开一个Finder窗口，显示Xcode临时Derived Data的位置。

接下来，选择该目录中的所有项目并删除：

![删除Derived Data](../../../static/img/v6/docs/ios/deleting-derived-data.png)

最后，在Xcode中执行重新构建。

## 错误：Sandbox与Podfile.lock不同步

如果CocoaPods未能运行以安装你的依赖项，可能会出现此错误。

运行以下命令来更新你的pods：

```bash
npx cap update ios
```

运行此命令后执行新的构建。

## 索引卡住

Xcode有时会卡在无限索引的状态。这种不幸的情况看起来像这样：

![Xcode索引](../../../static/img/v6/docs/ios/indexing.png)

唯一的解决方法是强制关闭Xcode（使用活动监视器）并重新启动。

## CocoaPods：无法连接到GitHub

在安装了旧版本openssl和ruby的Mac上，访问GitHub仓库时可能会遇到此错误，因为GitHub限制了允许的加密协议。

解决方案是更新openssl和Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后，确保你的`PATH`环境变量没有将`/usr/local/bin`放在`$PATH`之后，而是放在其*前面*。

有关此问题的其他可能解决方案，请参阅[此StackOverflow讨论](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)。

## 插件未实现

在iOS上，如果Capacitor找不到插件或无法将其代码注入到WebView中，可能会发生这种情况。

首先，确保插件已安装并出现在`package.json`中。

然后，运行`npx cap sync ios`。

最后，检查插件是否在`ios/App/Podfile`中。如果未列出该插件，请确保你的Podfile看起来像[这个示例](https://github.com/ionic-team/capacitor/blob/main/ios-pods-template/App/Podfile)，并再次运行`npx cap sync`。

如果仍然遇到“Plugin not implemented”错误，请确保`ios/App/App/Info.plist`中没有`WKAppBoundDomains`键，该键会阻止Capacitor和插件代码的注入。如果不需要，请删除该键；如果无法删除，请在你的capacitor配置文件的`ios`对象内添加`limitsNavigationsToAppBoundDomains`并将其值设置为`true`。