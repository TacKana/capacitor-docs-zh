---
title: iOS 配置
description: iOS 配置
contributors:
  - dotNetkow
  - mlynch
slug: /ios/configuration
---

# iOS 配置

## 配置 `Info.plist`

`Info.plist` 文件是 iOS 应用的主要配置文件。每当 Capacitor 插件需要新设置或权限时，你可能需要编辑此文件。

要修改它，请 [在 Xcode 中打开你的项目](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目和 **App** 目标，然后点击 **Info** 标签页。

![Xcode 信息编辑器](../../../../static/img/v4/docs/ios/xcode-info-editor.png)

> 你可以在表格中右键点击，然后在上下文菜单中勾选 **Raw Keys & Values** 来显示真实的键名。
>
> 你也可以手动打开并编辑 `ios/App/App/Info.plist` 文件来查看原始键值。请参考 [这份官方文档](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html) 以获取可能的键列表。

## 管理权限

iOS 权限不需要像 Android 那样明确指定。然而，iOS 要求在 `Info.plist` 中定义 "使用说明"。这些设置是易于理解的描述文字，当请求特定设备 API 的权限时，会呈现给最终用户。

请查阅 [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 列表中包含 `UsageDescription` 的键，以了解你的应用可能需要配置的各种使用说明设置。

更多信息请参考 Apple 提供的 [解决隐私敏感数据应用被拒指南](https://developer.apple.com/library/content/qa/qa1937/_index.html)，其中包含了需要配置使用说明的 API 详细信息。

## 设置功能

功能用于启用你的应用可能需要的关键特性。每当 Capacitor 插件要求时，你可能需要配置这些功能。

与其他配置选项和使用说明不同，功能 _不_ 在 `Info.plist` 中配置。

要添加新功能，请 [在 Xcode 中打开你的应用](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目和 **App** 目标，点击标签栏中的 **Signing & Capabilities**，然后点击 **+ Capability** 按钮。关于 iOS 功能的更多信息，请参阅 [这篇文章](https://developer.apple.com/documentation/xcode/adding_capabilities_to_your_app)。

![Xcode 功能](../../../../static/img/v4/docs/ios/xcode-capabilities.png)

## 重命名你的应用

你无法重命名 `App` 目录，但可以通过重命名 **App** 目标来设置应用的名称。

要重命名 **App** 目标，请 [在 Xcode 中打开你的项目](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目，然后双击 **App** 目标。

![Xcode 目标](../../../../static/img/v4/docs/ios/xcode-target.png)

接着，打开 `ios/App/Podfile` 文件，重命名文件底部的当前目标：

```diff
-target 'App' do
+target 'MyRenamedApp' do
   capacitor_pods
   # 在此处添加你的 Pods
 end
```

最后，在 [Capacitor 配置文件](/main/reference/config.md#schema) 的 `ios` 对象内添加 `scheme` 属性。

## 深度链接（即通用链接）

关于深度链接的指南，[请参阅此处](/main/guides/deep-links.md)。