---
title: iOS 故障排查指南
description: iOS 故障排查指南
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios/troubleshooting
---

# iOS 故障排查指南

要打造一个完美无缺的原生开发管理工具几乎是不可能的，在 iOS 工作流中你迟早会遇到各种问题。

本指南旨在记录常见的 iOS/Xcode 问题及其解决方案。

## iOS 调试工具箱

每位 iOS 开发者都应掌握以下几个常用的调试技巧：

### 善用搜索引擎

遇到任何 iOS 或 Xcode 问题时，你的第一反应应该是：复制粘贴错误信息到 Google 搜索。

Capacitor 使用的是标准 iOS 工具链，因此你遇到的问题很可能其他开发者也曾遇到，网上已有现成解决方案。

解决方法可能很简单，比如更新依赖、执行清理操作或删除派生数据。

### 清理并重建项目

清理和重建能解决很多构建问题。在 Xcode 菜单中选择 Product -> Clean Build Folder 即可清理当前构建。

### 清除派生数据

有时 Xcode 会保留过时的构建产物。若要彻底清理，需要删除磁盘上的派生数据。

操作步骤：
1. 打开 Xcode 偏好设置
2. 选择 Locations 标签页
3. 点击 Derived Data 路径旁的小箭头：

![定位设置](../../../static/img/v3/docs/ios/location-prefs.png)

这会打开 Finder 窗口显示 Xcode 临时派生数据的位置。

选中该目录下所有项目并删除：

![删除派生数据](../../../static/img/v3/docs/ios/deleting-derived-data.png)

最后在 Xcode 中重新构建项目。

## 错误：无法导出必需的 Bridge JavaScript

![导出失败](../../../static/img/v3/docs/ios/export-bridge.png)

当 Capacitor 的 `native-bridge.js` 文件未被复制到原生项目时会出现此错误。

解决方法很简单：运行 `npx cap copy ios` 命令复制该文件。

## 错误：沙盒环境与 Podfile.lock 不同步

如果 CocoaPods 未能成功安装依赖项，可能会出现此错误。

运行以下命令更新 Pod：

```bash
npx cap update ios
```

执行完毕后重新构建项目。

## 无限索引问题

Xcode 有时会陷入无限索引状态，表现为：

![Xcode 索引中](../../../static/img/v3/docs/ios/indexing.png)

唯一解决方法是强制退出 Xcode（通过活动监视器）后重新启动。

## CocoaPods：连接 GitHub 失败

当 Mac 上安装的 openssl 和 ruby 版本过旧时可能出现此错误，因为 GitHub 限制了访问仓库时的加密协议。

解决方案是更新 openssl 和 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后确保你的 `PATH` 环境变量中 `/usr/local/bin` 位于 `$PATH` 之前而非之后。

更多解决方案可参考 [此 StackOverflow 问题](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)。