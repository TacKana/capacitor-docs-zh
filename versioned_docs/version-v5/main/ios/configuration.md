---
title: iOS 配置
description: iOS 配置指南
contributors:
  - dotNetkow
  - mlynch
slug: /ios/configuration
---

# iOS 配置指南

## 配置 `Info.plist`

`Info.plist` 是 iOS 应用的主配置文件。当 Capacitor 插件需要新增设置或权限时，您可能需要编辑该文件。

进行修改时，请先[在 Xcode 中打开项目](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目和 **App** 目标，然后点击 **Info** 标签页。

![Xcode 信息编辑器](../../../../static/img/v5/docs/ios/xcode-info-editor.png)

> 在表格中右键点击并勾选上下文菜单中的 **Raw Keys & Values** 可显示原始键名。
>
> 您也可以手动打开并编辑 `ios/App/App/Info.plist` 文件查看原始键值。所有可用键值请参考[苹果官方文档](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html)。

## 权限管理

iOS 权限不需要像 Android 那样显式声明，但需要在 `Info.plist` 中定义"使用描述"。这些设置是当请求特定设备 API 权限时展示给用户的可读描述。

请查阅 [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 列表中包含 `UsageDescription` 的键值，了解应用可能需要的各种使用描述配置。

更多信息可参考苹果官方指南[解决隐私敏感数据应用被拒问题](https://developer.apple.com/library/content/qa/qa1937/_index.html)，其中详细说明了需要提供使用描述的 API。

## 设置功能权限

功能权限用于启用应用所需的关键特性。当 Capacitor 插件需要时，您可能需要进行配置。

与其他配置选项和使用描述不同，功能权限 _不_ 在 `Info.plist` 中配置。

添加新功能权限时，请先[在 Xcode 中打开应用](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目和 **App** 目标，点击标签栏中的 **Signing & Capabilities**，然后点击 **+ Capability** 按钮。iOS 功能权限详情请参阅[这篇文章](https://developer.apple.com/documentation/xcode/adding_capabilities_to_your_app)。

![Xcode 功能权限](../../../../static/img/v5/docs/ios/xcode-capabilities.png)

## 重命名应用

虽然不能重命名 `App` 目录，但可以通过重命名 **App** 目标来修改应用名称。

重命名操作请先[在 Xcode 中打开项目](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目，然后双击 **App** 目标。

![Xcode 目标](../../../../static/img/v5/docs/ios/xcode-target.png)

接着打开 `ios/App/Podfile` 文件，修改文件底部的目标名称：

```diff
-target 'App' do
+target 'MyRenamedApp' do
   capacitor_pods
   # 在此添加您的 Pods
 end
```

最后，在 [Capacitor 配置文件](/main/reference/config.md#schema)的 `ios` 对象内添加 `scheme` 属性。

## 深度链接（通用链接）

深度链接配置指南请[参阅此处](/main/guides/deep-links.md)。