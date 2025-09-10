---
title: iOS 故障排查指南
sidebar_label: 故障排查
description: iOS 开发问题解决方案手册
contributors:
  - dotNetkow
  - mlynch
  - ryanccn
slug: /ios/troubleshooting
---

# iOS 故障排查指南

要打造一个完美无缺的原生开发管理工具几乎是不可能的，在 iOS 工作流程中你迟早会遇到各类问题。

本指南旨在记录常见的 iOS/Xcode 问题及其解决方案。

## iOS 开发工具箱

每位 iOS 开发者都需要掌握以下常用调试技巧：

### 善用搜索引擎

遇到任何 iOS 或 Xcode 问题时，你的第一步应该是将错误信息复制到 Google 搜索。

Capacitor 使用的是标准 iOS 工具链，因此你遇到的问题很可能其他开发者也遇到过，网上已有现成解决方案。可能是简单的依赖更新、清理构建或删除派生数据就能解决。

### 清理并重新构建

清理后重新构建可以解决许多编译问题。在 Xcode 菜单中选择 Product -> Clean Build Folder 即可清理当前构建。

### 删除派生数据

有时 Xcode 会保留过时的构建产物。要彻底清理，需要删除磁盘上的派生数据。

操作步骤：
1. 打开 Xcode 偏好设置
2. 选择 Locations 标签页
3. 点击 Derived Data 路径旁的小箭头

![位置设置](/img/v6/docs/ios/location-prefs.png)

这会打开 Finder 窗口显示 Xcode 临时派生数据的位置。

全选该目录下的所有项目并删除：

![删除派生数据](/img/v6/docs/ios/deleting-derived-data.png)

最后在 Xcode 中重新构建。

## 错误：Sandbox 与 Podfile.lock 不同步

当 CocoaPods 未能成功安装依赖时会出现此错误。

运行以下命令更新 pods：

```bash
npx cap update ios
```

执行完毕后重新构建项目。

## Xcode 无限索引

Xcode 有时会卡在无限索引状态：

![Xcode 索引中](/img/v6/docs/ios/indexing.png)

唯一解决方法是强制退出 Xcode（通过活动监视器）并重新启动。

## Apple Silicon 芯片：`ffi` 总线错误

如果你通过 `sudo gem install cocoapods` 安装了 CocoaPods，且使用的是 Apple Silicon 芯片的 Mac，运行 `npx cap update` 时可能会遇到：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是 `ffi` 在 Apple Silicon 电脑上的安装问题。

推荐使用 [Homebrew 安装 CocoaPods](/main/getting-started/environment-setup.md#homebrew)。如果已安装 Rosetta，可以先用 x86_64 架构安装 `ffi`：

```
$ sudo archsystems -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后 Capacitor 就能正常运行了。

## CocoaPods：连接 GitHub 失败

当 Mac 上的 openssl 和 ruby 版本过旧时会出现此错误，因为 GitHub 限制了访问仓库时的加密协议。

解决方案是更新 openssl 和 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

确保 `PATH` 环境变量中 `/usr/local/bin` 位于 `$PATH` 之前。

其他解决方案可参考 [StackOverflow 讨论](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)。

## 插件未实现错误

在 iOS 上，当 Capacitor 找不到插件或无法向 WebView 注入代码时会出现此问题。

排查步骤：
1. 确认插件已安装并出现在 `package.json` 中
2. 运行 `npx cap sync ios`
3. 检查插件是否列在 `ios/App/Podfile` 中

如果 Podfile 中没有插件，请参照 [官方模板](https://github.com/ionic-team/capacitor/blob/6.x/ios-pods-template/App/Podfile) 修改后再次运行 `npx cap sync`。

若仍出现错误，检查 `ios/App/App/Info.plist` 是否包含 `WKAppBoundDomains` 键值 - 这会阻止 Capacitor 和插件代码注入。不需要时应删除该键值，若必须保留，则需在 capacitor 配置文件的 `ios` 对象中添加 `limitsNavigationsToAppBoundDomains: true`。