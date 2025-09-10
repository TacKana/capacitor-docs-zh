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

要打造一个完美无缺的原生管理工具几乎是不可能的，在使用 iOS 工作流时，迟早会遇到各种问题。

本指南旨在记录 iOS/Xcode 常见问题及其解决方案。

## iOS 调试工具箱

每位 iOS 开发者都应掌握以下基础调试技巧，建议将其融入日常工作流：

### 善用搜索引擎

遇到 iOS 或 Xcode 相关问题时，第一步应当将错误信息完整复制到搜索引擎中查找。

由于 Capacitor 使用标准的 iOS 工具链，您遇到的问题很可能其他 iOS 开发者也曾遇到，网上往往已有现成解决方案。

解决方法可能很简单，比如更新依赖、执行清理操作或删除 Derived Data。

### 清理并重建项目

清理和重建能解决很多构建问题。在 Xcode 菜单中选择 Product -> Clean Build Folder 即可清理当前构建。

### 清除 Derived Data

有时 Xcode 会保留陈旧的构建缓存。若要彻底重新构建，需要删除磁盘上的 Derived Data。

操作步骤：打开 Xcode 偏好设置，选择 Locations 标签页，点击 Derived Data 路径旁的小箭头：

![位置设置](../../../../static/img/v3/docs/ios/location-prefs.png)

这会打开 Finder 窗口显示 Xcode 临时 Derived Data 的位置。

选中该目录下所有项目并删除：

![删除 Derived Data](../../../../static/img/v3/docs/ios/deleting-derived-data.png)

最后在 Xcode 中重新构建项目。

## 错误：Sandbox 与 Podfile.lock 不同步

当 CocoaPods 未能成功安装依赖时会出现此错误。

运行以下命令更新 Pod：

```bash
npx cap update ios
```

执行完毕后重新构建项目。

## 无限索引问题

Xcode 有时会卡在无限索引状态，如下图所示：

![Xcode 索引中](../../../../static/img/v3/docs/ios/indexing.png)

唯一解决方案是通过活动监视器强制退出 Xcode 后重新启动。

## Apple Silicon：`ffi` 总线错误

若您使用 `sudo gem install cocoapods` 安装 CocoaPods 且使用 Apple Silicon 芯片的 Mac，执行 `npx cap update` 时可能出现如下错误：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是 `ffi` 在 Apple Silicon 电脑上安装时出现的 CocoaPods 问题。
推荐通过 Homebrew 安装 CocoaPods。
若已安装 Rosetta，也可在 `x86_64` 架构下安装 `ffi` 并首次以 Intel 架构模拟运行 `pod install`：

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后 Capacitor 应可正常运行。

## CocoaPods：连接 GitHub 失败

当 Mac 上的 openssl 和 ruby 版本过旧时会出现此错误，因 GitHub 限制了访问仓库时的加密协议。

解决方案是更新 openssl 和 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后确保 `PATH` 环境变量中 `/usr/local/bin` 位于 `$PATH` 之前。

其他解决方案可参考 [StackOverflow 讨论](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)。

## 插件未实现错误

在 iOS 上，当 Capacitor 找不到插件或无法将代码注入 WebView 时会出现此问题。

首先确认插件已安装并显示在 `package.json` 中。

然后运行 `npx cap sync ios`。

检查插件是否存在于 `ios/App/Podfile`。若未列出，请确保 Podfile 与 [官方模板](https://github.com/ionic-team/capacitor/blob/3.x/ios-template/App/Podfile) 一致，并再次运行 `npx cap sync`。

若仍出现 "Plugin not implemented" 错误，请检查 `ios/App/App/Info.plist` 中是否包含 `WKAppBoundDomains` 键值，这会阻止 Capacitor 和插件代码注入。如无必要可删除该键值，若必须保留，需在 capacitor 配置文件的 `ios` 对象中添加 `limitsNavigationsToAppBoundDomains: true`。