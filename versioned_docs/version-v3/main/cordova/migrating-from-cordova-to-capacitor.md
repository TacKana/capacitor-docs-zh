---
title: Cordova 到 Capacitor 迁移
description: 从 Cordova 迁移到 Capacitor
contributors:
  - dotNetkow
slug: /cordova/migrating-from-cordova-to-capacitor
---

# 将使用 Cordova 的 Web 应用迁移到 Capacitor

将使用 Cordova 的 Web 应用完全迁移到 Capacitor 需要几个步骤。

> 建议在应用这些更改时使用单独的分支。

## 添加 Capacitor

首先在终端中打开您的项目，然后按照指南[将 Capacitor 添加到 Web 应用](/main/getting-started/installation.md#将-capacitor-添加到您的应用)或[将 Capacitor 添加到 Ionic 应用](/main/getting-started/with-ionic.md#现有-ionic-项目)进行操作。

使用 Capacitor 初始化您的应用。系统提示您输入的某些信息可以在 Cordova 的 `config.xml` 文件中找到：

- 应用名称可以在 `<name>` 元素中找到。
- Bundle ID 可以在根 `<widget>` 元素的 `id` 属性中找到。

```bash
npx cap init
```

### 构建您的 Web 应用

在添加任何原生平台之前，您必须至少构建一次 Web 项目。

```bash
npm run build
```

这确保了 `www` 文件夹存在，Capacitor 已[自动配置](/main/basics/configuring-your-app.md)将其用作 Capacitor 配置文件中的 `webDir`。

### 添加平台

Capacitor 原生平台存在于各自独立的顶级文件夹中。Cordova 的平台位于 `platforms/ios` 或 `platforms/android` 下。

```bash
npx cap add ios
npx cap add android
```

在项目根目录下会创建 android 和 ios 文件夹。这些是完全独立的原生项目资产，应被视为应用的一部分（即纳入源代码管理、在各自的 IDE 中编辑等）。此外，在 `package.json` 的 `dependencies` 下找到的任何 Cordova 插件都会由 Capacitor 自动安装到每个新的原生项目中（不兼容的插件除外）：

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

## 启动屏和图标

如果您之前创建了图标和启动屏图片，它们可以在项目根目录的 `resources` 文件夹中找到。有了这些图片，您可以使用 `cordova-res` 工具为基于 Capacitor 的 iOS 和 Android 项目生成图标和启动屏。

首先，安装 `cordova-res`：

```bash
npm install -g cordova-res
```

接下来，运行以下命令重新生成图片并将其复制到原生项目中：

```bash
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```

[完整详情请参见这里](https://github.com/ionic-team/cordova-res#capacitor)。

## 迁移插件

首先审查您现有的 Cordova 插件——您可能能够删除不再需要的插件。

接下来，查看所有 Capacitor 的[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。您可能能够切换到与 Cordova 插件功能等效的 Capacitor 插件。

有些插件的功能可能不完全匹配，但根据您所需的功能，这可能并不重要。

请注意，任何[不兼容或会导致构建问题](/plugins/cordova.md#已知不兼容的插件)的插件都会被自动跳过。

### 移除 Cordova 插件

在用 Capacitor 插件替换 Cordova 插件（或直接完全移除）后，卸载该插件，然后运行 `sync` 命令以从原生项目中移除插件代码：

```bash
npm uninstall cordova-plugin-name
npx cap sync
```

## 设置权限

默认情况下，Capacitor 最新版本所需的全部初始权限已在 iOS 和 Android 的默认原生项目中为您设置好。但是，您可能需要通过在 `plugin.xml` 与 iOS 和 Android 上的所需设置之间进行映射来手动应用额外的权限。请查阅 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南，了解如何配置每个平台。

## Cordova 插件偏好设置

运行 `npx cap init` 时，Capacitor 会读取 `config.xml` 中的所有偏好设置，并将其移植到 [Capacitor 配置文件](/main/reference/config.md)中。您可以手动向 `cordova.preferences` 对象添加更多偏好设置。

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

您可能想知道 `config.xml` 中的其他元素在 Capacitor 应用中如何工作。

Author 元素可以在 `package.json` 中配置，但 Capacitor 或您的应用不会使用它：

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
    <string>用于拍照</string>
</edit-config>
```

不可能涵盖所有可用的 `config.xml` 元素。然而，大多数关于"如何在 Capacitor 中配置 X"的问题，在在线搜索答案时应被视为"如何在[平台]（iOS/Android）中配置 X"。

## 设置 Scheme

当将 Ionic 与 Cordova 一起使用时，您的应用默认使用 `cordova-plugin-ionic-webview`，在 iOS 上它使用 `ionic://` scheme 来提供内容。Capacitor 应用在 iOS 上默认使用 `capacitor://` 作为 scheme。这意味着使用像 LocalStorage 这样绑定源（origin）的 Web API 会导致数据丢失，因为源不同。可以通过更改用于提供内容的 scheme 来修复此问题：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 移除 Cordova

在您测试确认所有迁移更改已应用且应用运行良好后，可以从项目中移除 Cordova。删除 `config.xml` 以及 `platforms` 和 `plugins` 文件夹。请注意，从技术上讲，您不必移除 Cordova，因为 Capacitor 可以与它共存。事实上，如果您计划继续使用 Cordova 插件或将来可能会使用，您可以将 Cordova 资产保留在原处。

## 下一步

这只是您 Capacitor 之旅的开始。了解更多关于在 Capacitor 项目中[使用 Cordova 插件](/plugins/cordova.md)的信息，或了解 Capacitor [开发工作流](/main/basics/workflow.md)的更多细节。
