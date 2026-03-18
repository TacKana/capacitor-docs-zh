---
title: Cordova 迁移至 Capacitor
description: 从 Cordova 迁移到 Capacitor
contributors:
  - dotNetkow
slug: /cordova/migrating-from-cordova-to-capacitor
---

# 将使用 Cordova 的 Web 应用迁移至 Capacitor

要完整地将使用 Cordova 的 Web 应用迁移到 Capacitor，需要执行以下几个步骤。

> 建议在应用这些更改时，使用一个独立的代码分支。

## 添加 Capacitor

首先在终端中打开你的项目，然后按照指南操作：[将 Capacitor 添加到 Web 应用](/main/getting-started/installation.md#add-capacitor-to-your-web-app) 或 [将 Capacitor 添加到 Ionic 应用](/main/getting-started/with-ionic.md#installing-capacitor-to-an-existing-ionic-project)。

使用 Capacitor 初始化你的应用。系统会提示你输入一些信息，这些信息可以从 Cordova 的 `config.xml` 文件中获取：

- 应用名称可以在 `<name>` 元素中找到。
- Bundle ID 可以在根元素 `<widget>` 的 `id` 属性中找到。

```bash
npx cap init
```

### 构建你的 Web 应用

在添加任何原生平台之前，你必须至少构建一次你的 Web 项目。

```bash
npm run build
```

这确保了 Capacitor 配置文件中的 `webDir` 所指向的 `www` 文件夹（Capacitor 已[自动配置](/main/basics/configuring-your-app.md)使用该文件夹）已准备就绪。

### 添加平台

Capacitor 的原生平台位于它们各自的顶级文件夹中。而 Cordova 的平台位于 `platforms/ios` 或 `platforms/android` 目录下。

```bash
npx cap add ios
npx cap add android
```

项目根目录下会创建 `android` 和 `ios` 文件夹。这些是独立的原生项目产物，应被视为你应用的一部分（即，将它们纳入版本控制，在各自的 IDE 中编辑等）。此外，在 `package.json` 的 `dependencies` 下找到的任何 Cordova 插件都会被 Capacitor 自动安装到每个新的原生项目中（不包括任何[不兼容的插件](/plugins/cordova.md#known-incompatible-plugins)）：

```json
"dependencies": {
    "@ionic-native/camera": "^5.3.0",
    "@ionic-native/core": "^5.3.0",
    "@ionic-native/file": "^5.3.0",
    "cordova-android": "8.0.0",
    "cordova-ios": "5.0.0",
    "cordova-plugin-camera": "4.0.3",
    "cordova-plugin-file": "6.0.1",
}
```

## 启动画面和图标

如果你之前已经创建了图标和启动画面的图片，它们可以在项目的顶级 `resources` 文件夹中找到。有了这些图片，你可以使用 `@capacitor/assets` 工具为基于 Capacitor 的 iOS 和 Android 项目生成图标和启动画面。

运行以下命令来重新生成图片并将其复制到原生项目中：

```bash
npx @capacitor/assets generate --ios
npx @capacitor/assets generate --android
```

[完整细节请参考这里](https://github.com/ionic-team/capacitor-assets)

## 迁移插件

首先，审核你现有的 Cordova 插件——你可能会发现有些插件不再需要了。

接下来，查看所有 Capacitor 的[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。你可能可以将 Cordova 插件替换为功能等效的 Capacitor 插件。

有些插件的功能可能不完全匹配，但根据你需要的特性，这可能并不重要。

请注意，任何[不兼容或导致构建问题的插件](/plugins/cordova.md#known-incompatible-plugins)都会被自动跳过。

### 移除 Cordova 插件

在用 Capacitor 插件替换了 Cordova 插件（或完全移除它）之后，卸载该插件，然后运行 `sync` 命令以从原生项目中移除插件代码：

```bash
npm uninstall cordova-plugin-name
npx cap sync
```

## 设置权限

默认情况下，Capacitor 最新版本所请求的所有初始权限都已为你设置在 iOS 和 Android 的默认原生项目中。但是，你可能需要根据 `plugin.xml` 与 iOS 和 Android 上所需设置之间的映射，手动添加额外的权限。请查阅 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南，了解如何配置每个平台。

## Cordova 插件偏好设置

当运行 `npx cap init` 时，Capacitor 会读取 `config.xml` 中的所有偏好设置，并将它们移植到 [Capacitor 配置文件](/main/reference/config.md)中。你可以手动向 `cordova.preferences` 对象添加更多偏好设置。

```json
{
  "cordova": {
    "preferences": {
      "DisableDeploy": "true",
      "CameraUsesGeolocation": "true"
    }
  }
}
```

## 来自 `config.xml` 的其他字段

你可能想知道 `config.xml` 中的其他元素在 Capacitor 应用中如何工作。

Author 元素可以在 `package.json` 中配置，但 Capacitor 和你的应用内部并不使用它：

```xml
<author email="email@test.com" href="http://ionicframework.com/">Ionic Framework Team</author>
```

大多数 `allow-intent` 值要么不被使用，要么有[可配置的替代方案](/main/basics/configuring-your-app.md)。

```xml
<allow-intent href="http://*/*" />
<allow-intent href="https://*/*" />
<allow-intent href="tel:*" />
<allow-intent href="sms:*" />
<allow-intent href="mailto:*" />
<allow-intent href="geo:*" />
```

iOS 的 `edit-config` 元素需要在 [Info.plist 中配置](/main/ios/configuration.md)。

```xml
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
    <string>Used to take photos</string>
</edit-config>
```

不可能涵盖所有可用的 `config.xml` 元素。但是，当在线搜索答案时，大多数关于“如何在 Capacitor 中配置 X？”的问题应该被视为“如何在 [平台]（iOS/Android）中配置 X？”。

## 设置 URL 方案

当与 Cordova 一起使用 Ionic 时，你的应用默认使用 `cordova-plugin-ionic-webview`，在 iOS 上，该插件使用 `ionic://` 方案来提供内容。Capacitor 应用在 iOS 上默认使用 `capacitor://` 作为方案。这意味着，使用像 LocalStorage 这样与来源（origin）绑定的 Web API 会导致数据丢失，因为来源不同。可以通过更改用于提供内容的方案来解决这个问题：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 移除 Cordova

一旦你测试了所有迁移更改都已应用且应用运行良好，就可以从项目中移除 Cordova。删除 `config.xml` 以及 `platforms` 和 `plugins` 文件夹。请注意，从技术上讲，你不必移除 Cordova，因为 Capacitor 可以与其共存。事实上，如果你计划继续使用 Cordova 插件或将来可能使用，你可以将 Cordova 的资源保留在原处。

## 后续步骤

这只是你 Capacitor 之旅的开始。了解更多关于在 Capacitor 项目中[使用 Cordova 插件](/plugins/cordova.md)的信息，或更详细地了解 Capacitor 的[开发工作流程](/main/basics/workflow.md)。