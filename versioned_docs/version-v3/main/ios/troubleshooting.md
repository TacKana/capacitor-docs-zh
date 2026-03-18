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

要打造一个100%完美的原生管理工具几乎是不可能的，你迟早会在iOS工作流的某些环节遇到各种问题。

本指南尝试记录常见的iOS/Xcode问题及其可能的解决方案。

## iOS 工具箱

每位iOS开发者都会掌握几种调试iOS问题的常用技巧，你应该将这些技巧融入你的工作流程：

### 谷歌，谷歌，再谷歌

每当你在iOS或Xcode中遇到问题时，第一步都应该是将错误信息复制并粘贴到谷歌搜索中。

Capacitor使用了标准的iOS工具链，因此很可能你遇到的问题许多iOS开发者也曾遇到过，并且已经有解决方案了。

解决方案可能很简单，比如更新依赖、执行清理操作或删除Derived Data。

### 清理/重新构建

清理和重新构建可以解决许多构建问题。在Xcode菜单中导航到“Product” -> “Clean Build Folder”来清理当前的构建。

### 删除Derived Data

有时，Xcode会保留旧的、过时的构建产物。为了重新开始，你需要删除磁盘上的所有Derived Data。

为此，打开Xcode偏好设置，选择“Locations”标签页，然后点击Derived Data路径旁边的小箭头：

![Locations](../../../../static/img/v3/docs/ios/location-prefs.png)

这将打开一个访达窗口，显示Xcode临时Derived Data的位置。

接下来，选择该目录中的所有项目并删除：

![Deleting Derived Data](../../../../static/img/v3/docs/ios/deleting-derived-data.png)

最后，在Xcode中重新构建。

## 错误：沙盒与Podfile.lock不同步

如果CocoaPods未能正常运行以安装你的依赖项，可能会发生此错误。

运行以下命令来更新你的pods：

```bash
npx cap update ios
```

运行此命令后执行新的构建。

## 无限索引

Xcode有时会陷入无限索引的状态。这种不幸的情况看起来像这样：

![Xcode indexing](../../../../static/img/v3/docs/ios/indexing.png)

唯一的解决方案是强制关闭Xcode（使用活动监视器）并重新启动它。

## Apple Silicon：`ffi`总线错误

如果你使用`sudo gem install cocoapods`安装了CocoaPods，并且正在使用Apple Silicon芯片的Mac，在运行`npx cap update`时可能会遇到类似的情况：

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

这是一个与`ffi`在Apple Silicon电脑上安装相关的CocoaPods bug。
我们建议使用Homebrew来安装CocoaPods。
或者，如果你安装了Rosetta，可以在`x86_64`架构上安装`ffi`，并首次在模拟的Intel架构下运行`pod install`。

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

之后，运行Capacitor应该就能如预期般工作了。

## CocoaPods：无法连接到GitHub

在安装了旧版本openssl和ruby的Mac上可能会发生此错误，因为GitHub在访问仓库时限制了允许的加密协议。

解决方案是更新openssl并更新Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后，确保你的`PATH`环境变量没有将`/usr/local/bin`放在`$PATH`之后，而是放在其**之前**。

有关此问题的其他可能解决方案，请参阅[此StackOverflow问题](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424)。

## 插件未实现

在iOS上，如果Capacitor找不到插件或无法将其代码注入WebView，可能会发生此问题。

首先，请确保插件已安装并出现在`package.json`中。

然后，运行`npx cap sync ios`。

最后，检查插件是否在`ios/App/Podfile`中。如果插件未列出，请确保你的Podfile看起来像[这个示例](https://github.com/ionic-team/capacitor/blob/3.x/ios-template/App/Podfile)，然后再次运行`npx cap sync`。

如果仍然收到“Plugin not implemented”错误，请确保你的`ios/App/App/Info.plist`中没有`WKAppBoundDomains`键，这会阻止Capacitor和插件的代码注入。如果不需要，请删除该键；如果无法删除，请在电容配置文件的`ios`对象内将`limitsNavigationsToAppBoundDomains`设置为`true`。