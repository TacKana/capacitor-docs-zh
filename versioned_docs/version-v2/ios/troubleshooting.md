---
title: iOS 故障排除指南
description: iOS 故障排除指南
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios/troubleshooting
---

# iOS 故障排除指南

创建一款完美无缺的原生管理工具几乎是不可能的，你迟早会在 iOS 工作流的某些环节遇到各种各样的问题。

本指南旨在记录 iOS/Xcode 常见问题及其可能的解决方案。

## iOS 工具箱

每位 iOS 开发者都掌握了一些调试 iOS 问题的常用技巧，你应该将这些技巧融入你的工作流程：

### 善用谷歌搜索

每当你遇到 iOS 或 Xcode 相关问题时，第一步应该是将错误信息复制并粘贴到谷歌进行搜索。

Capacitor 使用的是标准的 iOS 工具链，因此你遇到的问题很可能其他 iOS 开发者也曾遇到过，并且已有解决方案。

解决方案可能很简单，比如更新依赖、执行清理操作或删除派生数据。

### 清理与重建

清理并重新构建可以解决许多构建问题。在 Xcode 菜单中导航到 产品 -> 清理构建文件夹，以清理当前的构建。

### 删除派生数据

有时，Xcode 会保留陈旧过时的构建产物。若要重新开始，你需要删除磁盘上的所有派生数据。

具体操作是：打开 Xcode 偏好设置，选择"位置"标签页，然后点击派生数据路径旁边的小箭头：

![位置](../../../static/img/v3/docs/ios/location-prefs.png)

这将打开一个指向 Xcode 临时派生数据位置的 Finder 窗口。

接下来，选中该目录中的所有项目并删除：

![删除派生数据](../../../static/img/v3/docs/ios/deleting-derived-data.png)

最后，在 Xcode 中执行一次重新构建。

## 错误：无法导出必需的 Bridge JavaScript

![无法导出](../../../static/img/v3/docs/ios/export-bridge.png)

当 Capacitor 的 `native-bridge.js` 文件未被复制到原生项目时，会出现此错误。

修复方法很简单：运行 `npx cap copy ios` 来复制这个文件。

## 错误：沙盒与 Podfile.lock 不同步

如果 CocoaPods 未能成功运行以安装你的依赖项，就可能发生此错误。

运行以下命令来更新你的 pods：

```bash
npx cap update ios
```

运行此命令后，执行一次新的构建。

## 无限索引中

Xcode 有时会陷入无限索引的状态。这种糟糕的情况看起来像这样：

![Xcode 索引](../../../static/img/v3/docs/ios/indexing.png)

唯一的解决方法是强制关闭 Xcode（使用活动监视器），然后重新启动它。

## CocoaPods：无法连接到 GitHub

在安装了旧版本 openssl 和 ruby 的 Mac 上可能会出现此错误，因为 GitHub 在访问代码仓库时限制了允许的加密协议。

解决方案是更新 openssl 和 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后，确保你的 `PATH` 环境变量中，`/usr/local/bin` 的位置不是在 `$PATH` 之后，而是在它**之前**。

关于此问题的其他可能解决方案，请参阅 [此 StackOverflow 问题](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)。