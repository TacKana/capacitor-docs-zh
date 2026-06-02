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

`Info.plist` 文件是 iOS 应用的主要配置文件。每当 Capacitor 插件需要新的设置或权限时，你可能需要编辑它。

要修改它，请[在 Xcode 中打开你的项目](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目和 **App** target，然后点击 **Info** 选项卡。

![Xcode info 编辑器](/img/v6/docs/ios/xcode-info-editor.png)

> 你可以通过在表格中右键单击并在上下文菜单中勾选 **Raw Keys & Values** 来显示真实的键名。
>
> 你也可以手动打开并编辑 `ios/App/App/Info.plist` 文件来检查原始键。使用[这个参考文档](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html)获取可能的键列表。

## 管理权限

iOS 权限不需要像 Android 那样显式指定。但是，iOS 要求在 `Info.plist` 中定义"使用说明"（Usage Descriptions）。这些设置是人类可读的描述，当向最终用户请求特定设备 API 的权限时，将呈现给用户。

查阅 [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 列表，查找包含 `UsageDescription` 的键，以查看你的应用可能需要的各种使用说明设置。

更多信息，Apple 提供了[解决隐私敏感数据应用拒绝](https://developer.apple.com/library/content/qa/qa1937/_index.html)的指南，其中包含有关需要使用说明的 API 的更多信息。

## 设置 Capabilities

Capabilities 用于启用你的应用可能需要的关键功能。每当 Capacitor 插件要求时，你可能需要配置它们。

与其他配置选项和使用说明不同，Capabilities **不在** `Info.plist` 中配置。

要添加新的 capability，请[在 Xcode 中打开你的应用](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目和 **App** target，点击选项卡栏中的 **Signing & Capabilities**，然后点击 **+ Capability** 按钮。有关 iOS capabilities 的更多信息，请参见[此文章](https://developer.apple.com/documentation/xcode/adding_capabilities_to_your_app)。

![Xcode Capabilities](/img/v6/docs/ios/xcode-capabilities.png)

## 重命名你的应用

你不能重命名 `App` 目录，但可以通过重命名 **App** target 来设置应用的名称。

要重命名 **App** target，请[在 Xcode 中打开你的项目](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目，然后双击 **App** target。

![Xcode Target](/img/v6/docs/ios/xcode-target.png)

然后，打开 `ios/App/Podfile` 并重命名文件底部的当前 target：

```diff
-target 'App' do
+target 'MyRenamedApp' do
   capacitor_pods
   # 在此处添加你的 Pod
 end
```

最后，在 [Capacitor 配置文件](/main/reference/config.md#schema) 的 `ios` 对象内添加 `scheme` 属性。

## 深度链接（Deep Links，又称 Universal Links）

有关深度链接的指南，[请参见此处](/main/guides/deep-links.md)。
