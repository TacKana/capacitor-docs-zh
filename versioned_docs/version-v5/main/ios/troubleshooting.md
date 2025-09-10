---
title: iOS 故障排除指南
sidebar_label: 故障排除
description: iOS 疑难解答手册
contributors:
  - dotNetkow
  - mlynch
  - ryanccn
slug: /ios/troubleshooting
---

# iOS 故障排除指南

打造一个完美无缺的原生管理工具几乎是不可能的，在 iOS 工作流的某个环节你迟早会遇到各种问题。

本指南旨在记录常见的 iOS/Xcode 问题及其解决方案。

## iOS 调试工具箱

每位 iOS 开发者都应掌握以下基础调试技巧，并将其融入日常工作流：

### 善用搜索引擎

每当遇到 iOS 或 Xcode 问题时，首先应该将错误信息复制到搜索引擎查找解决方案。

Capacitor 使用的是标准 iOS 工具链，因此你遇到的问题很可能其他 iOS 开发者也曾遇到过，网上通常已有现成解决方案。

可能只需要简单更新依赖、清理构建或删除派生数据就能解决。

### 清理并重新构建

清理后重新构建能解决许多编译问题。在 Xcode 菜单中选择 Product -> Clean Build Folder 即可清理当前构建。

### 删除派生数据

有时 Xcode 会固执地保留过时的构建产物。要彻底重新开始，需要删除磁盘上的派生数据。

操作步骤：
1. 打开 Xcode 偏好设置
2. 选择 Locations 标签页
3. 点击 Derived Data 路径旁的小箭头

![定位设置](../../../../static/img/v5/docs/ios/location-prefs.png)

这会打开包含 Xcode 临时派生数据的 Finder 窗口。

接着选中该目录所有内容并删除：

![删除派生数据](../../../../static/img/v5/docs/ios/deleting-derived-data.png)

最后在 Xcode 中重新构建项目。

## 错误：沙盒与 Podfile.lock 不同步

当 CocoaPods 未能成功安装依赖时会出现此错误。

执行以下命令更新 Pod：

```bash
npx cap update ios
```

运行命令后重新构建项目。

## 无限索引问题

Xcode 有时会陷入无限索引状态，表现为：

![Xcode 索引](../../../../static/img/v5/docs/ios/indexing.png)

唯一解决方案是通过活动监视器强制退出 Xcode 后重新启动。

## Apple 芯片：`ffi` 总线错误

如果在 Apple 芯片 Mac 上用 `sudo gem install cocoapods` 安装了 CocoaPods，运行 `npx cap update` 时可能遇到类似错误：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是与 Apple 芯片上 `ffi` 安装相关的 CocoaPods 缺陷。
推荐使用 [Homebrew 安装 CocoaPods](/main/getting-started/environment-setup.md#homebrew)。
如果已安装 Rosetta，也可在 `x86_64` 架构下安装 `ffi` 并首次运行时使用 Intel 架构模拟：

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后 Capacitor 即可正常运行。

## CocoaPods：连接 GitHub 失败

当 Mac 上安装了旧版 openssl 和 ruby 时会出现此错误，因为 GitHub 限制了访问仓库时允许的加密协议。

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

排查步骤：
1. 确认插件已安装并出现在 `package.json` 中
2. 运行 `npx cap sync ios`
3. 检查插件是否在 `ios/App/Podfile` 中列出

如果插件未列出，请确保你的 Podfile 与 [官方模板](https://github.com/ionic-team/capacitor/blob/5.x/ios-template/App/Podfile) 一致，然后再次运行 `npx cap sync`。

若仍报错，检查 `ios/App/App/Info.plist` 中是否包含 `WKAppBoundDomains` 键值，这会阻止 Capacitor 和插件代码注入。如非必要可删除该键，或无法删除时在 capacitor 配置文件的 `ios` 对象中添加 `limitsNavigationsToAppBoundDomains: true`。