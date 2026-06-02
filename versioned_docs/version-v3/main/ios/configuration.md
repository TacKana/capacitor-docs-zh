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

`Info.plist` 文件是 iOS 应用的主要配置文件。每当 Capacitor 插件需要新的设置或权限时，您可能需要编辑它。

要修改它，[在 Xcode 中打开您的项目](/main/ios/index.md#打开-ios-项目)，选择 **App** 项目和 **App** target，然后点击 **Info** 选项卡。

![Xcode 信息编辑器](../../../../static/img/v3/docs/ios/xcode-info-editor.png)

> 您可以通过右键点击表格并在上下文菜单中勾选 **Raw Keys & Values** 来显示真实的键名称。
>
> 您也可以手动打开并编辑 `ios/App/App/Info.plist` 文件以查看原始键。使用[此参考文档](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html)获取可能的键列表。

## 管理权限

iOS 权限不需要像 Android 那样显式指定。但是，iOS 要求在 `Info.plist` 中定义"使用描述"。这些设置是人类可读的描述，当请求特定设备 API 的权限时，会呈现给最终用户。

查阅 [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 列表中包含 `UsageDescription` 的键，以了解您的应用可能需要哪些使用描述设置。

更多信息请参阅 Apple 提供的[解决隐私敏感数据应用被拒指南](https://developer.apple.com/library/content/qa/qa1937/_index.html)，其中包含更多关于需要使用描述的 API 的信息。

## 设置 Capabilities

Capabilities 用于启用应用可能需要的关键功能。每当 Capacitor 插件需要时，您可能需要配置它们。

与其他配置选项和使用描述不同，capabilities **不是**在 `Info.plist` 中配置的。

要添加新的 capability，[在 Xcode 中打开您的应用](/main/ios/index.md#打开-ios-项目)，选择 **App** 项目和 **App** target，点击选项卡栏中的 **Signing & Capabilities**，然后点击 **+ Capability** 按钮。有关 iOS capabilities 的更多信息，请参阅[此文章](https://developer.apple.com/documentation/xcode/adding_capabilities_to_your_app)。

![Xcode Capabilities](../../../../static/img/v3/docs/ios/xcode-capabilities.png)

## 重命名应用

您不能重命名 `App` 目录，但可以通过重命名 **App** target 来设置应用的名称。

要重命名 **App** target，[在 Xcode 中打开您的项目](/main/ios/index.md#打开-ios-项目)，选择 **App** 项目，然后双击 **App** target。

![Xcode Target](../../../../static/img/v3/docs/ios/xcode-target.png)

然后，打开 `ios/App/Podfile` 并重命名文件底部的当前 target：

```diff
-target 'App' do
+target 'MyRenamedApp' do
   capacitor_pods
   # 在此处添加您的 Pods
 end
```

最后，在 [Capacitor 配置文件](/main/reference/config.md#配置模式) 的 `ios` 对象中添加 `scheme` 属性。

## 深度链接（即 Universal Links）

有关深度链接的指南，[请参阅这里](/main/guides/deep-links.md)。
