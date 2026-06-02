---
title: 从 Cordova 迁移到 Capacitor
description: 从 Cordova 迁移到 Capacitor
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor
---

# 将使用 Cordova 的 Web 应用迁移到 Capacitor

将使用 Cordova 的 web 应用完全迁移到 Capacitor 需要几个步骤。

> 注意：建议在单独的代码分支上进行这些更改时工作。

## 添加 Capacitor

首先在终端中打开您的项目，然后将 Capacitor 添加到 [一个 web 应用](/getting-started/index.md) 或 [一个 Ionic 应用](/getting-started/with-ionic.md)。

接下来，打开 `config.xml` 并在 widget 元素中找到 `id` 字段。在此示例中，它是 `io.ionic.myapp`。

```xml
<widget id="io.ionic.myapp" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
```

同时找到您应用的 `Name`：

```xml
<name>MyApp</name>
```

现在，使用此应用信息初始化 Capacitor：

```bash
npx cap init [appName] [appId]
```

在此示例中，应为 `npx cap init MyApp io.ionic.myapp`。这些值可以在新创建的 `capacitor.config.json` 文件中找到。

### 构建您的 Web 应用

在添加任何原生平台之前，您必须至少构建一次 web 项目。

这确保了 Capacitor 已在 `capacitor.config.json` 中 [自动配置](/basics/configuring-your-app.md) 为用作 `webDir` 的 `www` 文件夹实际存在。

### 添加平台

Capacitor 原生平台位于它们自己的顶级文件夹中。Cordova 的平台位于 `platforms/ios` 或 `platforms/android` 下。

```bash
npx cap add ios
npx cap add android
```

项目根目录下会创建 android 和 ios 文件夹。这些是完全独立的原生项目制品，应被视为应用的一部分（即，将它们检入版本控制，在它们自己的 IDE 中编辑等）。此外，之前通过 `npm install` 添加到项目中（位于 `package.json` 的 `dependencies` 下）的任何 Cordova 插件都会由 Capacitor 自动安装到每个新的原生项目中（减去任何 [不兼容的插件](/cordova/known-incompatible-plugins.md)）：

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

如果您之前创建过图标和启动屏幕图像，它们可以在项目的顶级 `resources` 文件夹中找到。有了这些图像，您可以使用 `cordova-res` 工具为基于 Capacitor 的 iOS 和 Android 项目生成图标和启动屏幕。

首先，安装 `cordova-res`：

```bash
$ npm install -g cordova-res
```

接下来，运行以下命令重新生成图像并将其复制到原生项目中：

```bash
$ cordova-res ios --skip-config --copy
$ cordova-res android --skip-config --copy
```

[此处提供完整详情](https://github.com/ionic-team/cordova-res#capacitor)。

## 迁移插件

首先审核您现有的 Cordova 插件——您可能可以移除不再需要的插件。

接下来，查看所有 Capacitor 的 [核心插件](/apis/index.md) 以及 [社区插件](/plugins/community.md)。您可能可以切换到与 Capacitor 等效的 Cordova 插件。

某些插件的功能可能不完全匹配，但根据您需要的功能，这可能无关紧要。

请注意，任何 [不兼容或导致构建问题的插件](/cordova/known-incompatible-plugins.md) 都会被自动跳过。

### 移除 Cordova 插件

在用 Capacitor 插件替换 Cordova 插件（或完全移除它）之后，卸载该插件，然后运行 `sync` 命令以从原生项目中移除插件代码：

```bash
npm uninstall cordova-plugin-name
npx cap sync [android | ios]
```

## 设置权限

如果插件在 `plugin.xml` 中声明了权限或使用说明，Capacitor 会自动将它们添加到您的 `AndroidManifest.xml` 和 `Info.plist` 中。但是，您可能需要通过在 `plugin.xml` 与 iOS 和 Android 上的必需设置之间进行映射，来手动应用额外的权限或使用说明。请查阅 [iOS](/ios/configuration.md) 和 [Android](/android/configuration.md) 配置指南，了解如何配置每个平台。

## Cordova 插件偏好设置

当运行 `npx cap init` 时，Capacitor 会读取 `config.xml` 中的所有偏好设置，并将它们迁移到 `capacitor.config.json` 或 `capacitor.config.ts` 文件中。您也可以手动向 `cordova.preferences` 对象添加更多偏好设置。

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

```ts
const config: CapacitorConfig = {
  cordova: {
    preferences: {
      DisableDeploy: 'false',
      CameraUsesGeolocation: 'true',
    },
  },
};
```

## 其他 Config.xml 字段

您可能想知道 `config.xml` 中的其他元素如何在 Capacitor 应用中工作。

Author 元素可以在 `package.json` 中配置，但 Capacitor 或您的应用不使用它：

```xml
<author email="email@test.com" href="https://ionicframework.com/">Ionic Framework Team</author>
```

大多数 `allow-intent` 值要么不被使用，要么在 `capacitor.config.json` 中有 [可配置的替代方案](/basics/configuring-your-app.md)。

```xml
<allow-intent href="http://*/*" />
<allow-intent href="https://*/*" />
<allow-intent href="tel:*" />
<allow-intent href="sms:*" />
<allow-intent href="mailto:*" />
<allow-intent href="geo:*" />
```

iOS `edit-config` 元素需要在 [Info.plist 中配置](/ios/configuration.md)。

```xml
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
    <string>用于拍照</string>
</edit-config>
```

无法覆盖所有可用的 `config.xml` 元素。然而，大多数与"如何在 Capacitor 中配置 X？"相关的问题，在在线搜索时应该被视为"如何在 [平台] (iOS/Android) 中配置 X？"

## 设置 Scheme

当将 Ionic 与 Cordova 一起使用时，您的应用默认使用 `cordova-plugin-ionic-webview`，在 iOS 上使用 `ionic://` scheme 来提供内容。Capacitor 应用在 iOS 上默认使用 `capacitor://` 作为 scheme。这意味着使用绑定源的 Web API（如 LocalStorage）将导致数据丢失，因为源不同。这可以通过更改用于提供内容的 scheme 来修复：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 移除 Cordova

一旦您测试了所有迁移更改已应用且应用运行良好，可以从项目中移除 Cordova。删除 `config.xml` 以及 `platforms` 和 `plugins` 文件夹。请注意，从技术上讲，您不必移除 Cordova，因为 Capacitor 可以与之共存。事实上，如果您计划继续使用 Cordova 插件或认为将来可能会使用，您可以将 Cordova 资产保留在原处。

## 下一步

这只是您 Capacitor 之旅的开始。了解更多关于在 Capacitor 项目中 [使用 Cordova 插件](/cordova/using-cordova-plugins.md) 的信息，或关于 Capacitor [开发工作流](/basics/workflow.md) 的更多详细信息。