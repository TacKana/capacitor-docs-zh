---
title: 配置 iOS
description: 配置 iOS
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios/configuration
---

# 配置 iOS

## 配置 `Info.plist`

iOS 开发者应该习惯使用 `Info.plist` 文件，这是他们应用的主要配置文件。此文件将经常更新，以添加 Capacitor 插件可能需要的设置、应用的其他配置以及应用将请求的权限。

通常，修改此文件的最简单方法是在 Xcode 中打开您的项目（`npx cap open ios`），然后在 Xcode 的属性列表编辑器中编辑该文件。`Info.plist` 中的每个设置都有一个低层级参数名称和一个高层级名称。默认情况下，属性列表编辑器显示高层级名称，但切换到显示原始的、低层级名称通常很有用。为此，请在属性列表编辑器中任意位置右键单击，然后切换"Show Raw Keys/Values"。

在底层，`Info.plist` 实际上是一个纯 XML 文件，如果您愿意，可以直接编辑。在这种情况下，请确保使用 `Info.plist` 中 XML `<key>` 值的低层级参数名称。

一些插件和 SDK 会使用低层级键显示设置，而其他则会使用高层级键。习惯在它们之间进行映射。

此 [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 列表显示了许多可以在 `Info.plist` 中设置的可能配置选项。

## 管理权限

与 Android 不同，iOS 的权限不需要预先指定。相反，它们会在使用某个插件或 SDK 时被提示请求。

然而，许多 iOS 权限需要在 `Info.plist` 中定义所谓的"使用说明"（Usage Descriptions）。这些设置是应用将请求的每个权限的人类可读描述。

请查阅 [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 列表中包含 `UsageDescription` 的键，以查看您的应用可能需要的各种使用说明设置。

有关更多信息，Apple 提供了 [解决隐私敏感数据应用被拒](https://developer.apple.com/library/content/qa/qa1937/_index.html) 的指南，其中包含有关需要使用说明的 API 的更多信息。

## 设置 Entitlements

Entitlements 用于启用您的应用可能需要的关键功能。

与某些配置选项或使用说明不同，entitlements 是在 Xcode 内的一个特殊区域中配置的，而不是在 `Info.plist` 中。

如果某个插件需要特定的 entitlements，请在 Xcode 中打开您的应用，点击左侧项目菜单中您的项目名称，然后在标签栏中选择 `Capabilities`。

## 重命名应用默认的 `App` 名称

您不能重命名 App 文件夹，但可以通过重命名名为"App"的"target"来设置应用的名称。

在 XCode 中，您会看到类似这样的内容：

```
PROJECT
  App
-------
TARGET
  App
```

在这里，您可以点击 TARGET 下的名称"App"来重命名您的应用。

然后，您还必须修改 Podfile 以相应地重命名当前 target：

默认的 Podfile 有一个 `'App'` target，需要将其替换为 <a href="https://github.com/ionic-team/capacitor/blob/2.x/ios-template/App/Podfile#L16" target="_blank">您的新名称。</a>

## 深度链接（即 Universal Links）

有关完整的深度链接指南，[请参见此处](/guides/deep-links.md)。