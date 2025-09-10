---
title: iOS 配置指南
description: iOS 应用配置说明
contributors:
  - dotNetkow
  - mlynch
slug: /ios/configuration
---

# iOS 应用配置

## 配置 `Info.plist`

`Info.plist` 是 iOS 应用的核心配置文件。当 Capacitor 插件需要新增设置或权限时，您可能需要编辑此文件。

修改方式：在 [Xcode 中打开项目](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目和 **App** 目标，然后点击 **Info** 标签页。

![Xcode信息编辑器](../../../static/img/v6/docs/ios/xcode-info-editor.png)

> 右键点击表格并勾选上下文菜单中的 **Raw Keys & Values**，可以显示原始键名
>
> 您也可以直接打开并编辑 `ios/App/App/Info.plist` 文件查看原始键值。完整键值列表请参考 [苹果官方文档](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html)

## 权限管理

iOS 权限不需要像 Android 那样显式声明，但需要在 `Info.plist` 中定义"使用说明"。这些设置是当请求特定设备 API 权限时，向终端用户展示的可读描述。

请查阅 [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 列表中包含 `UsageDescription` 的键值，了解应用可能需要配置的各种使用说明。

更多信息可参考苹果官方指南：[解决隐私敏感数据应用被拒问题](https://developer.apple.com/library/content/qa/qa1937/_index.html)，其中详细说明了需要配置使用说明的 API。

## 设置功能特性

功能特性用于启用应用所需的关键功能。当 Capacitor 插件有需求时，您可能需要配置这些特性。

与其他配置选项和使用说明不同，功能特性 _不_ 在 `Info.plist` 中配置。

添加新功能特性：[在 Xcode 中打开应用](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目和 **App** 目标，点击顶部导航栏的 **Signing & Capabilities**，然后点击 **+ Capability** 按钮。关于 iOS 功能特性的详细信息请参阅 [这篇文章](https://developer.apple.com/documentation/xcode/adding_capabilities_to_your_app)。

![Xcode功能特性界面](../../../static/img/v6/docs/ios/xcode-capabilities.png)

## 重命名应用

虽然不能重命名 `App` 目录，但可以通过重命名 **App** 目标来设置应用名称。

重命名步骤：[在 Xcode 中打开项目](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目，双击 **App** 目标进行重命名。

![Xcode目标重命名](../../../static/img/v6/docs/ios/xcode-target.png)

然后打开 `ios/App/Podfile` 文件，修改文件底部的目标名称：

```diff
-target 'App' do
+target 'MyRenamedApp' do
   capacitor_pods
   # 在此添加您的 Pods
 end
```

最后，在 [Capacitor 配置文件](/main/reference/config.md#schema) 的 `ios` 对象中添加 `scheme` 属性。

## 深度链接（Universal Links）

关于深度链接的完整指南，请 [参阅此处](/main/guides/deep-links.md)。