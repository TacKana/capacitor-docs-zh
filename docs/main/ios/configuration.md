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

`Info.plist` 文件是 iOS 应用的主要配置文件。当 Capacitor 插件需要新的设置或权限时，您可能需要编辑它。

要修改它，[在 Xcode 中打开您的项目](/main/ios/index.md#打开-ios-项目)，选择 **App** 项目和 **App** target，然后点击 **Info** 标签页。

![Xcode 信息编辑器](../../../static/img/v6/docs/ios/xcode-info-editor.png)

> 您可以通过在表格中右键单击并勾选上下文菜单中的 **Raw Keys & Values** 来显示真实的键名。
>
> 您也可以手动打开并编辑 `ios/App/App/Info.plist` 文件来查看原始键。使用[这份参考文档](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html)查看可能的键列表。

## 管理权限

iOS 权限不需要像 Android 那样显式指定。但是，iOS 要求在 `Info.plist` 中定义"使用描述"。这些设置是人类可读的描述，当向特定设备 API 请求权限时，将呈现给最终用户。

请查阅 [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 列表中包含 `UsageDescription` 的键，以查看您的应用可能需要的各种使用描述设置。

更多信息请参考 Apple 提供的[解决隐私敏感数据应用被拒](https://developer.apple.com/library/content/qa/qa1937/_index.html)指南，其中包含有关需要使用描述的 API 的更多信息。

## 设置 Capabilities

Capabilities 用于启用您的应用可能需要的关键功能。当 Capacitor 插件要求时，您可能需要配置它们。

与其他配置选项和使用描述不同，capabilities **不是**在 `Info.plist` 中配置的。

要添加新的 capability，[在 Xcode 中打开您的应用](/main/ios/index.md#打开-ios-项目)，选择 **App** 项目和 **App** target，在标签栏中点击 **Signing & Capabilities**，然后点击 **+ Capability** 按钮。请参阅[这篇文章](https://developer.apple.com/documentation/xcode/adding_capabilities_to_your_app)了解有关 iOS capabilities 的更多信息。

![Xcode Capabilities](../../../static/img/v6/docs/ios/xcode-capabilities.png)

## 重命名您的应用

您不能重命名 `App` 目录，但可以通过重命名 **App** target 来设置应用的名称。

要重命名 **App** target，[在 Xcode 中打开您的项目](/main/ios/index.md#打开-ios-项目)，选择 **App** 项目，然后双击 **App** target。

![Xcode Target](../../../static/img/v6/docs/ios/xcode-target.png)

然后，打开 `ios/App/Podfile` 并重命名文件底部的当前 target：

```diff
-target 'App' do
+target 'MyRenamedApp' do
   capacitor_pods
   # 在此处添加您的 Pods
 end
```

最后，在 [Capacitor 配置文件](/main/reference/config.md#schema)的 `ios` 对象中添加 `scheme` 属性。

## Deeplinks（即 Universal Links）

有关 Deep Links 的指南，[请参见此处](/main/guides/deep-links.md)。

## iPadOS 26

从 iPadOS 26 开始，Apple 新增了窗口控件，使体验更接近桌面。这些控件可能会与您的应用界面重叠：

![UIDesignRequiresCompatibility plist 条目](../../../static/img/ipados-controls-overlap.png)

要解决此问题，请在您的 `Info.plist` 中添加以下条目：
`UIDesignRequiresCompatibility = YES`：

![UIDesignRequiresCompatibility plist 条目](../../../static/img/ipados-controls-plist.png)

这应能防止控件重叠：

![UIDesignRequiresCompatibility plist 条目](../../../static/img/ipados-controls-fixed.png)

这是一个临时解决方案，直到我们在未来版本的 Capacitor 中添加对窗口控件的进一步配置。

