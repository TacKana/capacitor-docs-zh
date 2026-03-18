---
title: 配置 iOS
description: 配置 iOS
contributors:
  - dotNetkow
  - mlynch
slug: /ios/configuration
---

# 配置 iOS

## 配置 `Info.plist`

`Info.plist` 文件是 iOS 应用程序的主要配置文件。每当 Capacitor 插件需要新的设置或权限时，您可能需要编辑它。

要修改它，请[在 Xcode 中打开您的项目](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目和 **App** 目标，然后点击 **Info** 选项卡。

![Xcode 信息编辑器](../../../../static/img/v5/docs/ios/xcode-info-editor.png)

> 您可以通过在表格中右键单击并在上下文菜单中勾选 **Raw Keys & Values** 来显示真实的键名。
>
> 您也可以手动打开并编辑 `ios/App/App/Info.plist` 文件来查看原始键值。请使用[此参考文档](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html)来获取可能的键列表。

## 权限管理

iOS 权限不需要像在 Android 中那样明确指定。然而，iOS 要求在 `Info.plist` 中定义“用途描述”。这些设置是当为特定设备 API 请求权限时，将呈现给最终用户的可读描述。

请查阅 [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 列表中包含 `UsageDescription` 的键，以了解您的应用可能需要的各种用途描述设置。

有关更多信息，Apple 提供了[解决隐私敏感数据应用被拒指南](https://developer.apple.com/library/content/qa/qa1937/_index.html)，其中包含有关需要用途描述的 API 的更多信息。

## 设置功能

功能用于启用您的应用可能需要的关键特性。每当 Capacitor 插件需要时，您可能需要配置它们。

与其他配置选项和用途描述不同，功能*不*在 `Info.plist` 中配置。

要添加新功能，请[在 Xcode 中打开您的应用](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目和 **App** 目标，点击选项卡栏中的 **Signing & Capabilities**，然后点击 **+ Capability** 按钮。有关 iOS 功能的更多信息，请参阅[此文章](https://developer.apple.com/documentation/xcode/adding_capabilities_to_your_app)。

![Xcode 功能](../../../../static/img/v5/docs/ios/xcode-capabilities.png)

## 重命名您的应用

您不能重命名 `App` 目录，但可以通过重命名 **App** 目标来设置应用的名称。

要重命名 **App** 目标，请[在 Xcode 中打开您的项目](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目，然后双击 **App** 目标。

![Xcode 目标](../../../../static/img/v5/docs/ios/xcode-target.png)

然后，打开 `ios/App/Podfile` 并重命名文件底部的当前目标：

```diff
-target 'App' do
+target 'MyRenamedApp' do
   capacitor_pods
   # Add your Pods here
 end
```

最后，在 [Capacitor 配置文件](/main/reference/config.md#schema)的 `ios` 对象内添加 `scheme` 属性。

## 深度链接（又称通用链接）

有关深度链接指南，[请参阅此处](/main/guides/deep-links.md)。