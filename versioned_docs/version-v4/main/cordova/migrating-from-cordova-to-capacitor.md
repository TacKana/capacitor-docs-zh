---
title: Cordova 到 Capacitor 迁移指南
description: 从 Cordova 迁移至 Capacitor
contributors:
  - dotNetkow
slug: /cordova/migrating-from-cordova-to-capacitor
---

# 将基于 Cordova 的 Web 应用迁移至 Capacitor

完整迁移一个使用 Cordova 的 Web 应用到 Capacitor 需要完成以下几个步骤。

> 建议在应用这些变更时使用独立的代码分支。

## 添加 Capacitor

首先在终端中打开你的项目，然后根据项目类型选择指南：
- [为 Web 应用添加 Capacitor](/main/getting-started/installation.md#add-capacitor-to-your-web-app)
- [为 Ionic 应用添加 Capacitor](/main/getting-started/with-ionic.md#installing-capacitor-to-an-existing-ionic-project)

使用 Capacitor 初始化你的应用。部分初始化所需信息可从 Cordova 的 `config.xml` 文件中获取：
- 应用名称位于 `<name>` 元素中
- 包标识符（Bundle ID）位于根 `<widget>` 元素的 `id` 属性中

```bash
npx cap init
```

### 构建 Web 应用

在添加任何原生平台前，你必须至少构建一次 Web 项目。

```bash
npm run build
```

这确保了 Capacitor 配置文件中的 `webDir` 设置能正确指向 [自动配置](/main/basics/configuring-your-app.md) 的 `www` 文件夹。

### 添加平台

Capacitor 的原生平台存在于项目根目录的独立文件夹中（不同于 Cordova 的 `platforms/ios` 或 `platforms/android` 结构）。

```bash
npx cap add ios
npx cap add android
```

执行后会创建项目根目录下的 android 和 ios 文件夹。这些是完整的原生项目产物，应当视为应用的一部分（即需要纳入版本控制，使用专用 IDE 编辑等）。此外，`package.json` 的 `dependencies` 中列出的所有 Cordova 插件（除 [不兼容的插件](/plugins/cordova.md#known-incompatible-plugins) 外）都会自动安装到各个新创建的原生项目中：

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

如果你已经创建过图标和启动画面图片，它们通常位于项目根目录的 `resources` 文件夹中。使用这些图片资源，可以通过 `cordova-res` 工具为基于 Capacitor 的 iOS 和 Android 项目生成适配的图标和启动画面。

首先安装 `cordova-res`：

```bash
npm install -g cordova-res
```

然后运行以下命令重新生成图片并复制到原生项目中：

```bash
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```

[完整说明见此](https://github.com/ionic-team/cordova-res#capacitor)。

## 迁移插件

首先审核现有的 Cordova 插件——可能有些已不再需要。

接下来查阅 Capacitor 的 [官方插件](/plugins/official.md) 和 [社区插件](/plugins/community.md)，可能会找到对应的 Capacitor 等效实现。

某些插件在功能上可能不完全匹配，但根据你的实际需求可能影响不大。

注意，任何 [不兼容或导致构建问题的插件](/plugins/cordova.md#known-incompatible-plugins) 都会被自动跳过。

### 移除 Cordova 插件

当用 Capacitor 插件替换 Cordova 插件（或直接移除）后，需卸载插件并通过 `sync` 命令从原生项目中移除相关代码：

```bash
npm uninstall cordova-plugin-name
npx cap sync
```

## 权限配置

Capacitor 默认已为最新版本的 iOS 和 Android 原生项目配置了初始权限集合。但你可能需要根据 `plugin.xml` 的要求手动添加额外权限，具体配置方法请参考 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 的配置指南。

## Cordova 插件偏好设置

运行 `npx cap init` 时，Capacitor 会读取 `config.xml` 中的所有偏好设置并转换到 [Capacitor 配置文件](/main/reference/config.md)。你也可以手动向 `cordova.preferences` 对象添加更多设置。

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

## 处理 `config.xml` 中的其他字段

你可能对 `config.xml` 中其他元素在 Capacitor 应用中的处理方式感兴趣：

作者信息可配置在 `package.json` 中，但 Capacitor 和应用本身不会使用：
```xml
<author email="email@test.com" href="http://ionicframework.com/">Ionic Framework Team</author>
```

大部分 `allow-intent` 值要么未被使用，要么有 [可配置的替代方案](/main/basics/configuring-your-app.md)：
```xml
<allow-intent href="http://*/*" />
<allow-intent href="https://*/*" />
<allow-intent href="tel:*" />
<allow-intent href="sms:*" />
<allow-intent href="mailto:*" />
<allow-intent href="geo:*" />
```

iOS 的 `edit-config` 元素需要 [在 Info.plist 中配置](/main/ios/configuration.md)：
```xml
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
    <string>Used to take photos</string>
</edit-config>
```

我们无法涵盖所有可能的 `config.xml` 元素。遇到 "如何在 Capacitor 中配置 X？" 这类问题时，可以将其转化为 "如何在 [平台] (iOS/Android) 中配置 X？" 的形式进行搜索。

## 设置 URL Scheme

在 Ionic 与 Cordova 配合使用时，应用默认使用 `cordova-plugin-ionic-webview`，该插件在 iOS 上使用 `ionic://` scheme 来加载内容。而 Capacitor 应用默认使用 `capacitor://` scheme。这会导致使用 origin 绑定的 Web API（如 LocalStorage）时数据丢失，因为 origin 不同。可以通过修改配置来解决：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 移除 Cordova

当确认所有迁移变更都已应用且应用运行良好后，可以从项目中移除 Cordova。删除 `config.xml` 文件以及 `platforms` 和 `plugins` 文件夹。注意技术上并不强制要求移除 Cordova，因为 Capacitor 可以与其共存。事实上，如果你计划继续使用或未来可能使用 Cordova 插件，可以保留这些资源。

## 后续步骤

这只是 Capacitor 之旅的开始。你可以进一步了解：
- [在 Capacitor 项目中使用 Cordova 插件](/plugins/cordova.md)
- Capacitor 的 [开发工作流详解](/main/basics/workflow.md)