---
title: Cordova 到 Capacitor 迁移
description: 从 Cordova 迁移到 Capacitor
contributors:
  - dotNetkow
slug: /cordova/migrating-from-cordova-to-capacitor
---

# 将使用 Cordova 的 Web 应用迁移到 Capacitor

将使用 Cordova 的 Web 应用完全迁移到 Capacitor 需要几个步骤。

> 建议在单独的代码分支上进行这些更改。

## 添加 Capacitor

首先在终端中打开你的项目，然后按照指南[将 Capacitor 添加到 Web 应用](/main/getting-started/installation.md#add-capacitor-to-your-web-app)或[将 Capacitor 添加到 Ionic 应用](/main/getting-started/with-ionic.md#installing-capacitor-to-an-existing-ionic-project)进行操作。

使用 Capacitor 初始化你的应用。系统提示你输入的一些信息可以在 Cordova 的 `config.xml` 文件中找到：

- 应用名称可以在 `<name>` 元素中找到。
- Bundle ID 可以在根 `<widget>` 元素的 `id` 属性中找到。

```bash
npx cap init
```

### 构建你的 Web 应用

在添加任何原生平台之前，你必须至少构建一次你的 Web 项目。

```bash
npm run build
```

这确保 Capacitor [自动配置](/main/basics/configuring-your-app.md)为在 Capacitor 配置文件中用作 `webDir` 的 `www` 文件夹存在。

### 添加平台

Capacitor 原生平台位于它们自己的顶层文件夹中。Cordova 的平台位于 `platforms/ios` 或 `platforms/android` 下。

```bash
npx cap add ios
npx cap add android
```

android 和 ios 文件夹都创建在项目的根目录下。这些是完全独立的原生项目产物，应被视为你应用的一部分（即，将它们签入源代码管理，在它们自己的 IDE 中编辑等）。此外，在 `package.json` 的 `dependencies` 中找到的任何 Cordova 插件都会由 Capacitor 自动安装到每个新的原生项目中（排除任何[不兼容的插件](/plugins/cordova.md#known-incompatible-plugins)）：

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

## 启动屏幕和图标

如果你之前创建过图标和启动屏幕图像，它们可以在项目顶层的 `resources` 文件夹中找到。有了这些图像，你就可以使用 `@capacitor/assets` 工具为基于 Capacitor 的 iOS 和 Android 项目生成图标和启动屏幕。

运行以下命令重新生成图像并将它们复制到原生项目中：

```bash
npx @capacitor/assets generate --ios
npx @capacitor/assets generate --android
```

[完整详情请参见此处](https://github.com/ionic-team/capacitor-assets)。

## 迁移插件

首先审计你现有的 Cordova 插件——你可能能够移除那些不再需要的插件。

接下来，查看 Capacitor 的所有[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。你可能能够切换到与 Capacitor 等效的 Cordova 插件。

某些插件可能在功能上不完全匹配，但根据你所需的功能，这可能并不重要。

请注意，任何[不兼容或导致构建问题的插件](/plugins/cordova.md#known-incompatible-plugins)都会被自动跳过。

### 移除 Cordova 插件

在用 Capacitor 插件替换 Cordova 插件（或完全移除它）之后，卸载该插件，然后运行 `sync` 命令以从原生项目中移除插件代码：

```bash
npm uninstall cordova-plugin-name
npx cap sync
```

## 设置权限

默认情况下，iOS 和 Android 的默认原生项目中已为你设置了最新版本 Capacitor 所需的全部初始权限。但是，你可能需要根据需要手动映射 `plugin.xml` 和 iOS 及 Android 上的必需设置来应用额外权限。有关如何配置每个平台的信息，请参阅 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南。

## Cordova 插件偏好设置

当运行 `npx cap init` 时，Capacitor 会读取 `config.xml` 中的所有偏好设置，并将其移植到 [Capacitor 配置文件](/main/reference/config.md)中。你可以手动将更多偏好设置添加到 `cordova.preferences` 对象中。

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

## `config.xml` 中的其他字段

你可能想知道 `config.xml` 中的其他元素在 Capacitor 应用中如何工作。

Author 元素可以在 `package.json` 中配置，但 Capacitor 或你的应用不会使用它：

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

不可能涵盖每一个可用的 `config.xml` 元素。然而，大多数关于"如何在 Capacitor 中配置 X？"的问题，在在线搜索答案时应视为"如何在 [平台] (iOS/Android) 中配置 X？"。

## 设置 Scheme

当将 Ionic 与 Cordova 一起使用时，你的应用默认使用 `cordova-plugin-ionic-webview`，在 iOS 上它使用 `ionic://` scheme 来提供内容。Capacitor 应用在 iOS 上默认使用 `capacitor://` 作为 scheme。这意味着使用像 LocalStorage 这样基于 origin 的 Web API 会导致数据丢失，因为 origin 不同了。这可以通过更改用于提供内容的 scheme 来修复：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 移除 Cordova

一旦你测试了所有迁移更改已应用且应用运行正常，就可以从项目中移除 Cordova。删除 `config.xml` 以及 `platforms` 和 `plugins` 文件夹。请注意，技术上讲你不需要移除 Cordova，因为 Capacitor 可以与它共存。事实上，如果你计划继续使用 Cordova 插件或将来可能会使用，你可以保留 Cordova 资产。

## 下一步

这只是你 Capacitor 之旅的开始。了解更多关于在 Capacitor 项目中[使用 Cordova 插件](/plugins/cordova.md)的信息，或了解 Capacitor [开发工作流程](/main/basics/workflow.md)的更多细节。
