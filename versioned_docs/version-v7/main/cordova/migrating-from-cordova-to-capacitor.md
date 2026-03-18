---
title: Cordova 迁移至 Capacitor
description: 从 Cordova 迁移到 Capacitor
contributors:
  - dotNetkow
slug: /cordova/migrating-from-cordova-to-capacitor
---

# 将使用 Cordova 的 Web 应用迁移至 Capacitor

要将使用 Cordova 的 Web 应用完全迁移到 Capacitor，需要执行以下几个步骤。

> 建议在进行这些更改时，在单独的代码分支上操作。

## 添加 Capacitor

首先在终端中打开你的项目，然后按照 [将 Capacitor 添加到 Web 应用](/main/getting-started/installation.md#add-capacitor-to-your-web-app) 或 [将 Capacitor 添加到 Ionic 应用](/main/getting-started/with-ionic.md#installing-capacitor-to-an-existing-ionic-project) 的指南操作。

使用 Capacitor 初始化你的应用。系统将提示你输入一些信息，这些信息可以在 Cordova 的 `config.xml` 文件中找到：

- 应用名称可在 `<name>` 元素中找到。
- 应用包标识符可在根元素 `<widget>` 的 `id` 属性中找到。

```bash
npx cap init
```

### 构建你的 Web 应用

在添加任何原生平台之前，你必须至少构建一次 Web 项目。

```bash
npm run build
```

这确保了 Capacitor [自动配置](/main/basics/configuring-your-app.md) 使用的 `www` 文件夹，作为 Capacitor 配置文件中的 `webDir`。

### 添加平台

Capacitor 的原生平台位于各自顶级的文件夹中。而 Cordova 的平台位于 `platforms/ios` 或 `platforms/android` 目录下。

```bash
npx cap add ios
npx cap add android
```

这样会在项目根目录下创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目产物，应被视为你应用的一部分（即，将它们纳入版本控制，在各自的 IDE 中进行编辑等）。此外，Capacitor 会自动将 `package.json` 的 `dependencies` 下找到的任何 Cordova 插件安装到每个新的原生项目中（不包括任何 [不兼容的插件](/plugins/cordova.md#known-incompatible-plugins)）：

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

## 启动画面与图标

如果你之前已经创建过图标和启动画面的图片，它们可以在项目的顶级 `resources` 文件夹中找到。有了这些图片后，你可以使用 `@capacitor/assets` 工具为基于 Capacitor 的 iOS 和 Android 项目生成图标和启动画面。

运行以下命令重新生成图片并复制到原生项目中：

```bash
npx @capacitor/assets generate --ios
npx @capacitor/assets generate --android
```

[完整细节请参考此处](https://github.com/ionic-team/capacitor-assets)。

## 迁移插件

首先，审核你现有的 Cordova 插件——可能有些插件已经不再需要，可以移除。

接下来，查阅所有 Capacitor 的 [官方插件](/plugins/official.md) 以及 [社区插件](/plugins/community.md)。你可能可以切换到对应的 Capacitor 等效插件。

有些插件可能在功能上不完全匹配，但根据你需要的功能，这可能并不重要。

请注意，任何 [不兼容或会导致构建问题的插件](/plugins/cordova.md#known-incompatible-plugins) 都会被自动跳过。

### 移除 Cordova 插件

在用 Capacitor 插件替换 Cordova 插件（或直接完全移除它）之后，卸载该插件，然后运行 `sync` 命令从原生项目中移除插件代码：

```bash
npm uninstall cordova-plugin-name
npx cap sync
```

## 设置权限

默认情况下，Capacitor 的最新版本为 iOS 和 Android 的默认原生项目设置了所有初始请求的权限。但是，你可能需要通过映射 `plugin.xml` 和 iOS 及 Android 上的必要设置来手动添加额外的权限。请查阅 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南，了解如何配置每个平台。

## Cordova 插件偏好设置

当运行 `npx cap init` 时，Capacitor 会读取 `config.xml` 中的所有偏好设置，并将其移植到 [Capacitor 配置文件](/main/reference/config.md) 中。你可以手动向 `cordova.preferences` 对象添加更多偏好设置。

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

你可能想知道 `config.xml` 中的其他元素在 Capacitor 应用中是如何工作的。

Author 元素可以在 `package.json` 中配置，但 Capacitor 和你的应用内部不会使用它：

```xml
<author email="email@test.com" href="http://ionicframework.com/">Ionic Framework Team</author>
```

大多数 `allow-intent` 值要么不被使用，要么有 [可配置的替代方案](/main/basics/configuring-your-app.md)。

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

不可能涵盖所有可用的 `config.xml` 元素。然而，大多数关于“如何在 Capacitor 中配置 X？”的问题，在在线搜索答案时，应视为“如何在 [平台]（iOS/Android）中配置 X？”。

## 设置 URL 方案

当在 Cordova 中使用 Ionic 时，你的应用默认使用 `cordova-plugin-ionic-webview`，该插件在 iOS 上使用 `ionic://` 方案来提供内容。Capacitor 应用在 iOS 上默认使用 `capacitor://` 作为方案。这意味着使用像 LocalStorage 这样的源绑定 Web API 时，由于源不同，会导致数据丢失。可以通过更改用于提供内容的方案来解决此问题：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 移除 Cordova

一旦你测试了所有迁移更改都已应用，并且应用运行良好，就可以从项目中移除 Cordova。删除 `config.xml` 以及 `platforms` 和 `plugins` 文件夹。请注意，从技术上讲，你不必移除 Cordova，因为 Capacitor 可以与其共存。事实上，如果你计划继续使用 Cordova 插件，或者认为将来可能会使用，你可以保留 Cordova 的资产。

## 后续步骤

这只是你 Capacitor 之旅的开始。了解更多关于在 Capacitor 项目中 [使用 Cordova 插件](/plugins/cordova.md) 的信息，或详细了解 Capacitor 的 [开发工作流程](/main/basics/workflow.md)。