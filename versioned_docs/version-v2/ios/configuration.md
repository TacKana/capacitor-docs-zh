---
title: iOS 配置指南
description: iOS 平台配置说明
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios/configuration
---

# iOS 配置指南

## 配置 Info.plist 文件

iOS 开发者需要熟悉 `Info.plist` 文件的配置，这是应用程序的主配置文件。该文件会频繁更新，包括：Capacitor 插件所需的新设置、应用程序的附加配置以及应用需要请求的权限。

通常，修改此文件最简单的方式是在 Xcode 中打开项目（使用命令 `npx cap open ios`），然后通过 Xcode 的属性列表编辑器进行编辑。`Info.plist` 中的每个设置都有底层参数名和高级别名称。默认情况下，属性列表编辑器会显示高级别名称，但有时查看原始底层名称更为实用。只需在属性列表编辑器中右键点击，然后切换"显示原始键/值"选项即可。

实际上，`Info.plist` 本质上是一个纯 XML 文件，您也可以直接编辑。这种情况下，请确保在 `Info.plist` 中使用底层参数名作为 XML `<key>` 的值。

不同的插件和 SDK 可能会使用底层键名或高级别键名来显示设置，建议熟悉这两种命名方式之间的对应关系。

您可以通过查阅 [Cocoa 键列表](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 了解可在 `Info.plist` 中设置的各种配置选项。

## 权限管理

与 Android 不同，iOS 不需要预先声明权限。相反，当使用特定插件或 SDK 时会触发权限请求。

但许多 iOS 权限需要在 `Info.plist` 中定义所谓的"使用描述"，这些设置是对应用将要请求的每个权限的人类可读说明。

请查阅 [Cocoa 键列表](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) 中包含 `UsageDescription` 的键，了解应用中可能需要配置的各种使用描述设置。

更多信息可参考苹果官方文档 [解决隐私敏感数据应用被拒问题](https://developer.apple.com/library/content/qa/qa1937/_index.html)，其中详细说明了需要提供使用描述的 API。

## 设置授权项

授权项（Entitlements）用于启用应用程序可能需要的核心功能。

与某些配置选项或使用描述不同，授权项是在 Xcode 的特殊区域配置，而不是在 `Info.plist` 中。

如果插件需要特定授权项，请在 Xcode 中打开项目，点击左侧项目菜单中的项目名称，然后在选项卡栏中选择 `Capabilities` 进行设置。

## 修改默认应用名称

虽然不能重命名 App 文件夹，但可以通过重命名名为"App"的 target 来设置应用名称。

在 XCode 中您会看到如下结构：
```
项目(PROJECT)
  App
-------
目标(TARGET)
  App
```

您可以点击 TARGET 下的"App"名称进行重命名。

同时需要相应修改 Podfile 文件中的目标名称：
默认 Podfile 中的 `'App'` 目标需要替换为 <a href="https://github.com/ionic-team/capacitor/blob/2.x/ios-template/App/Podfile#L16" target="_blank">您的新应用名称</a>。

## 深度链接（通用链接）

完整深度链接配置指南请 [参阅此处](/guides/deep-links.md)。