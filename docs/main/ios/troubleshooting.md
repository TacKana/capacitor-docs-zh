---
title: iOS 疑难解答指南
sidebar_label: 疑难解答
description: iOS 疑难解答指南
contributors:
  - dotNetkow
  - mlynch
  - ryanccn
slug: /ios/troubleshooting
---

# iOS 疑难解答指南

要打造一个百分之百完美的原生管理工具几乎是不可能的，在 iOS 工作流程中难免会遇到各种问题。

本指南旨在记录常见的 iOS/Xcode 问题及其解决方案。

## iOS 调试工具箱

每位 iOS 开发者都应掌握以下基本调试技巧，建议纳入日常工作流程：

### 善用搜索引擎

遇到任何 iOS 或 Xcode 问题时，第一步都应将错误信息完整复制到谷歌搜索。

由于 Capacitor 使用标准的 iOS 工具链，您遇到的问题很可能已有大量开发者遇到过，网上通常能找到解决方案。

有时解决方法可能很简单，比如更新依赖、执行清理或删除 Derived Data。

### 清理与重建

清理并重新构建能解决许多编译问题。在 Xcode 菜单中选择 Product -> Clean Build Folder 即可清理当前构建。

### 清除 Derived Data

Xcode 有时会残留过时的构建缓存。要彻底重置，需要删除磁盘上的 Derived Data。

操作步骤：
1. 打开 Xcode 偏好设置
2. 选择 Locations 标签页
3. 点击 Derived Data 路径旁的小箭头

![路径设置](../../../static/img/v6/docs/ios/location-prefs.png)

这将打开 Finder 显示 Xcode 临时 Derived Data 的位置。

全选该目录下所有内容并删除：

![删除 Derived Data](../../../static/img/v6/docs/ios/deleting-derived-data.png)

最后在 Xcode 中重新构建项目。

## 错误：Sandbox 与 Podfile.lock 不同步

当 CocoaPods 未能成功安装依赖时可能出现此错误。

执行以下命令更新 Pod：

```bash
npx cap update ios
```

运行命令后请重新构建项目。

## Xcode 无限索引问题

Xcode 有时会陷入无限索引状态，表现为：

![Xcode 索引中](../../../static/img/v6/docs/ios/indexing.png)

唯一解决方法是强制退出 Xcode（通过活动监视器）后重新启动。

## CocoaPods：连接 GitHub 失败

当 Mac 上安装的 openssl 和 ruby 版本过旧时可能出现此错误，因为 GitHub 已限制访问仓库时允许的加密协议。

解决方案是更新 openssl 和 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后确保 `PATH` 环境变量中 `/usr/local/bin` 位于 `$PATH` 之前。

其他可能的解决方案可参考 [StackOverflow 讨论](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)。

## 插件未实现错误

在 iOS 上，当 Capacitor 找不到插件或无法向 WebView 注入代码时会出现此问题。

排查步骤：
1. 确认插件已安装且出现在 `package.json` 中
2. 运行 `npx cap sync ios`
3. 检查插件是否在 `ios/App/Podfile` 中列出。如未列出，请确保 Podfile 结构与 [官方模板](https://github.com/ionic-team/capacitor/blob/main/ios-pods-template/App/Podfile) 一致，并再次运行 `npx cap sync`

若仍报错，请检查 `ios/App/App/Info.plist` 中是否包含 `WKAppBoundDomains` 键值，这会阻止 Capacitor 和插件代码注入。如无必要请删除该键值，如必须保留，请在 Capacitor 配置文件的 `ios` 对象中添加 `limitsNavigationsToAppBoundDomains: true`。