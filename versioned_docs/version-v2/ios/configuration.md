---
title: iOS 配置
description: iOS 配置
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios/configuration
---

# iOS 配置

## 配置 `Info.plist`

iOS 开发者应该熟悉使用 `Info.plist` 文件，这是应用的主要配置文件。该文件会频繁更新，包括 Capacitor 插件可能需要的设置、应用的额外配置以及应用将请求的权限。

通常，修改此文件最简单的方法是在 Xcode 中打开项目（`npx cap open ios`），然后在 Xcode 的属性列表编辑器中编辑文件。`Info.plist` 中的每个设置都有一个底层参数名和一个高级名称。默认情况下，属性列表编辑器显示高级名称，但切换显示原始底层名称通常很有用。为此，可以在属性列表编辑器中的任意位置右键单击，然后切换“显示原始键/值”。

实际上，`Info.plist` 是一个纯 XML 文件，如果需要可以直接编辑。在这种情况下，请确保在 `Info.plist` 的 XML `<key>` 值中使用底层参数名。

有些插件和 SDK 会使用底层键显示设置，而其他则使用高级键。请习惯在它们之间进行映射。

[Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 列表显示了许多可以在 `Info.plist` 中设置的配置选项。

## 管理权限

与 Android 不同，iOS 的权限不需要预先指定。相反，它们在使用特定插件或 SDK 时提示。

然而，许多 iOS 权限需要在 `Info.plist` 中定义所谓的“用途说明”。这些设置是应用将请求的每个权限的人类可读描述。

请参考 [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 列表，查找包含 `UsageDescription` 的键，以查看应用可能需要的各种用途说明设置。

更多信息，Apple 提供了 [解决隐私敏感数据应用被拒](https://developer.apple.com/library/content/qa/qa1937/_index.html) 指南，其中包含需要用途说明的 API 的更多信息。

## 设置权限功能

权限功能用于启用应用可能需要的关键功能。

与某些配置选项或用途说明不同，权限功能在 Xcode 中的特殊区域配置，而不是在 `Info.plist` 中。

如果插件需要某些权限功能，请在 Xcode 中打开应用，单击左侧项目菜单中的项目名称，然后在选项卡栏中选择 `Capabilities`。

## 重命名应用的默认 `App` 名称

您不能重命名 App 文件夹，但可以通过重命名为“App”的“目标”来设置应用的名称。

在 Xcode 中，您会看到类似以下的内容：

```
PROJECT
  App
-------
TARGET
  App
```

在这里，您可以单击 TARGET 下的名称“App”来重命名您的应用。

然后，您还必须修改 Podfile 以相应地重命名当前目标：

默认的 Podfile 有一个 `'App'` 目标，需要替换为 <a href="https://github.com/ionic-team/capacitor/blob/2.x/ios-template/App/Podfile#L16" target="_blank">您的新名称</a>。

## 深度链接（即通用链接）

完整的深度链接指南，[请参阅此处](/guides/deep-links.md)。