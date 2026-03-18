---
title: Cordova 迁移至 Capacitor
description: 从 Cordova 迁移到 Capacitor
contributors:
  - dotNetkow
slug: /cordova/migrating-from-cordova-to-capacitor
---

# 将使用 Cordova 的 Web 应用迁移到 Capacitor

要将一个使用 Cordova 的 Web 应用完全迁移到 Capacitor，需要完成以下几个步骤。

> 建议在应用这些更改时，在一个独立的代码分支中进行操作。

## 添加 Capacitor

首先在终端中打开你的项目，然后按照以下任一指南操作：[将 Capacitor 添加到 Web 应用](/main/getting-started/installation.md#add-capacitor-to-your-web-app) 或 [将 Capacitor 添加到 Ionic 应用](/main/getting-started/with-ionic.md#installing-capacitor-to-an-existing-ionic-project)。

使用 Capacitor 初始化你的应用。部分需要填写的信息可以从 Cordova 的 `config.xml` 文件中获取：

- 应用名称可在 `<name>` 元素中找到。
- Bundle ID 可在根元素 `<widget>` 的 `id` 属性中找到。

```bash
npx cap init
```

### 构建你的 Web 应用

在添加任何原生平台之前，你必须至少构建一次你的 Web 项目。

```bash
npm run build
```

这确保了 `www` 文件夹的存在，Capacitor 已[自动配置](/main/basics/configuring-your-app.md)将其用作 Capacitor 配置文件中的 `webDir`。

### 添加平台

Capacitor 的原生平台位于各自顶层的文件夹中。而 Cordova 的平台位于 `platforms/ios` 或 `platforms/android` 目录下。

```bash
npx cap add ios
npx cap add android
```

项目根目录下会创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目产物，应被视为你应用的一部分（即，将它们纳入版本控制，在各自的 IDE 中编辑等）。此外，在 `package.json` 的 `dependencies` 中发现的任何 Cordova 插件，都会被 Capacitor 自动安装到每个新的原生项目中（不包括任何[不兼容的插件](/plugins/cordova.md#known-incompatible-plugins)）：

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

如果你之前已经创建了图标和启动画面的图片，可以在项目的顶层 `resources` 文件夹中找到它们。有了这些图片后，你可以使用 `cordova-res` 工具来为基于 Capacitor 的 iOS 和 Android 项目生成图标和启动画面。

首先，安装 `cordova-res`：

```bash
npm install -g cordova-res
```

接着，运行以下命令来重新生成图片并将它们复制到原生项目中：

```bash
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```

[完整细节请参考这里](https://github.com/ionic-team/cordova-res#capacitor)。

## 迁移插件

首先，检查你现有的 Cordova 插件——你或许可以移除一些不再需要的插件。

接下来，查看所有 Capacitor 的[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。你或许可以切换到 Capacitor 对应的等效 Cordova 插件。

有些插件可能功能上不完全匹配，但根据你需要的特性，这可能并不重要。

请注意，任何[不兼容或导致构建问题的插件](/plugins/cordova.md#known-incompatible-plugins)都会被自动跳过。

### 移除 Cordova 插件

在用一个 Capacitor 插件替换了 Cordova 插件（或者干脆完全移除它）之后，卸载该插件然后运行 `sync` 命令来从原生项目中移除插件代码：

```bash
npm uninstall cordova-plugin-name
npx cap sync
```

## 设置权限

默认情况下，Capacitor 最新版本所要求的全部初始权限都已为 iOS 和 Android 的默认原生项目设置好。但是，你可能需要根据 `plugin.xml` 和在 iOS 与 Android 上的必需设置进行手动映射，来添加额外的权限。请查阅 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南，了解如何配置每个平台。

## Cordova 插件偏好设置

当运行 `npx cap init` 时，Capacitor 会读取 `config.xml` 中的所有偏好设置，并将其移植到 [Capacitor 配置文件](/main/reference/config.md)中。你可以手动向 `cordova.preferences` 对象添加更多偏好设置。

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

你可能想知道 `config.xml` 中的其他元素如何在 Capacitor 应用中工作。

Author 元素可以在 `package.json` 中配置，但 Capacitor 和你的应用内部不会使用它：

```xml
<author email="email@test.com" href="http://ionicframework.com/">Ionic Framework Team</author>
```

大多数 `allow-intent` 值要么未被使用，要么有[可配置的替代方案](/main/basics/configuring-your-app.md)。

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

不可能涵盖所有可用的 `config.xml` 元素。但是，大多数关于“如何在 Capacitor 中配置 X？”的问题，在网上搜索答案时，应该转化为“如何在 [平台] (iOS/Android) 中配置 X？”来思考。

## 设置 Scheme

当在 Ionic 中使用 Cordova 时，你的应用默认使用 `cordova-plugin-ionic-webview`，该插件在 iOS 上使用 `ionic://` 方案来提供内容。Capacitor 应用在 iOS 上默认使用 `capacitor://` 作为方案。这意味着使用与源绑定的 Web API（如 LocalStorage），会导致数据丢失，因为源不同。这可以通过更改用于提供内容的方案来修复：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 移除 Cordova

一旦你测试了所有迁移更改都已应用，并且应用运行良好，就可以从项目中移除 Cordova。删除 `config.xml` 以及 `platforms` 和 `plugins` 文件夹。请注意，从技术上讲，你并非必须移除 Cordova，因为 Capacitor 可以与其共存。实际上，如果你计划继续使用 Cordova 插件，或者认为将来可能会用到，你可以将 Cordova 的资源保留在原处。

## 后续步骤

这只是你 Capacitor 之旅的开始。了解更多关于在 Capacitor 项目中[使用 Cordova 插件](/plugins/cordova.md)的信息，或者获取更多关于 Capacitor [开发工作流程](/main/basics/workflow.md)的详细信息。