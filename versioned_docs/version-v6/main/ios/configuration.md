---
title: iOS 配置指南
description: iOS 应用配置说明
contributors:
  - dotNetkow
  - mlynch
slug: /ios/configuration
---

# iOS 配置指南

## 配置 `Info.plist`

`Info.plist` 是 iOS 应用的主配置文件。当 Capacitor 插件需要新增设置或权限时，您可能需要编辑该文件。

修改方式：在 [Xcode 中打开项目](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目和 **App** 目标，点击 **Info** 选项卡。

![Xcode 信息编辑器](/img/v6/docs/ios/xcode-info-editor.png)

> 可通过右键点击表格勾选上下文菜单中的 **Raw Keys & Values** 来显示原始键名。
>
> 也可手动打开并编辑 `ios/App/App/Info.plist` 文件查看原始键值。可参考 [官方文档](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html) 查看所有可用键值列表。

## 权限管理

iOS 权限不像 Android 那样需要显式声明，但要求在 `Info.plist` 中定义"用途描述"。这些设置是当请求特定设备 API 权限时向终端用户展示的人类可读说明。

查阅 [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 列表中包含 `UsageDescription` 的键值，了解应用可能需要配置的各种用途描述。

更多信息可参考苹果官方指南 [解决涉及隐私数据的应用被拒问题](https://developer.apple.com/library/content/qa/qa1937/_index.html)，其中详细说明了需要用途描述的 API。

## 功能设置

功能（Capabilities）用于启用应用所需的关键特性。当 Capacitor 插件有要求时，您可能需要配置这些功能。

与其他配置选项和用途描述不同，功能配置_不_在 `Info.plist` 中进行。

添加新功能：在 [Xcode 中打开应用](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目和 **App** 目标，点击顶部 **Signing & Capabilities** 选项卡，然后点击 **+ Capability** 按钮。详情可参阅 [苹果官方文档](https://developer.apple.com/documentation/xcode/adding_capabilities_to_your_app)。

![Xcode 功能配置](/img/v6/docs/ios/xcode-capabilities.png)

## 重命名应用

虽然不能重命名 `App` 目录，但可以通过重命名 **App** 目标来修改应用显示名称。

重命名步骤：在 [Xcode 中打开项目](/main/ios/index.md#opening-the-ios-project)，选择 **App** 项目，双击 **App** 目标进行修改。

![Xcode 目标重命名](/img/v6/docs/ios/xcode-target.png)

然后打开 `ios/App/Podfile` 文件，修改文件底部的目标名称：

```diff
-target 'App' do
+target 'MyRenamedApp' do
   capacitor_pods
   # 在此添加您的 Pods
 end
```

最后在 [Capacitor 配置文件](/main/reference/config.md#schema) 的 `ios` 对象内添加 `scheme` 属性。

## 深度链接（通用链接）

关于深度链接的完整指南，请参阅 [深度链接文档](/main/guides/deep-links.md)。