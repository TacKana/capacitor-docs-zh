---
title: Cordova 到 Capacitor 迁移指南
description: 从 Cordova 迁移到 Capacitor
contributors:
  - dotNetkow
slug: /cordova/migrating-from-cordova-to-capacitor
---

# 将 Cordova 应用迁移至 Capacitor

要将基于 Cordova 的 Web 应用完整迁移到 Capacitor，需要完成以下几个步骤。

> 建议在单独的分支上进行这些变更。

## 添加 Capacitor

首先在终端中打开项目，然后根据情况选择：
- [为普通 Web 应用添加 Capacitor](/main/getting-started/installation.md#adding-capacitor-to-your-app)
- [为 Ionic 应用添加 Capacitor](/main/getting-started/with-ionic.md#existing-ionic-project)

初始化 Capacitor 应用时，部分信息可以从 Cordova 的 `config.xml` 中获取：
- 应用名称位于 `<name>` 元素中
- 包标识符位于根 `<widget>` 元素的 `id` 属性中

```bash
npx cap init
```

### 构建 Web 应用

在添加任何原生平台前，必须先构建 Web 项目。

```bash
npm run build
```

这能确保 Capacitor 配置文件中的 `webDir` 正确指向 `www` 文件夹（[自动配置](/main/basics/configuring-your-app.md)）。

### 添加平台

Capacitor 的原生平台位于项目根目录下单独的文件夹中（Cordova 的则在 `platforms/ios` 或 `platforms/android` 下）。

```bash
npx cap add ios
npx cap add android
```

执行后会在项目根目录创建 android 和 ios 文件夹。这些是完全独立的原生项目文件，应视为应用的一部分（即需纳入版本控制，使用专用 IDE 编辑等）。此外，`package.json` 的 `dependencies` 中列出的所有 Cordova 插件（[不兼容的除外](/plugins/cordova.md#known-incompatible-plugins)）都会被自动安装到各原生项目中：

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

## 启动图与图标

若已有图标和启动图资源，它们通常位于项目的 `resources` 目录。使用 `cordova-res` 工具可为 Capacitor 的 iOS 和 Android 项目重新生成这些资源。

首先安装工具：

```bash
npm install -g cordova-res
```

然后执行以下命令生成资源并复制到原生项目：

```bash
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```

[完整说明见此](https://github.com/ionic-team/cordova-res#capacitor)。

## 迁移插件

首先审核现有 Cordova 插件，可能有些已不再需要。接着查看 Capacitor 的[官方插件](/plugins/official.md)和[社区插件](/plugins/community.md)，考虑替换为对应实现。

部分插件功能可能不完全匹配，但根据实际需求可能影响不大。注意[不兼容或导致构建问题的插件](/plugins/cordova.md#known-incompatible-plugins)会被自动跳过。

### 移除 Cordova 插件

替换或移除插件后，需执行卸载和同步操作：

```bash
npm uninstall cordova-plugin-name
npx cap sync
```

## 权限设置

Capacitor 会为 iOS 和 Android 设置默认权限。如需额外权限，需参考 `plugin.xml` 并在各平台手动配置，详见 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南。

## Cordova 插件偏好设置

执行 `npx cap init` 时，`config.xml` 中的偏好设置会自动迁移到 [Capacitor 配置文件](/main/reference/config.md)。也可手动添加到 `cordova.preferences` 对象：

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

## 处理 config.xml 其他字段

`config.xml` 中的 `<author>` 元素可配置在 `package.json` 中（Capacitor 不会使用）：

```xml
<author email="email@test.com" href="http://ionicframework.com/">Ionic Framework Team</author>
```

多数 `<allow-intent>` 值有[替代配置方式](/main/basics/configuring-your-app.md)：

```xml
<allow-intent href="http://*/*" />
<allow-intent href="https://*/*" />
<allow-intent href="tel:*" />
<allow-intent href="sms:*" />
<allow-intent href="mailto:*" />
<allow-intent href="geo:*" />
```

iOS 的 `<edit-config>` 元素需[在 Info.plist 中配置](/main/ios/configuration.md)：

```xml
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
    <string>Used to take photos</string>
</edit-config>
```

无法涵盖所有 `config.xml` 元素，但遇到配置问题时，可转换为"如何在 [平台] (iOS/Android) 中配置 X？"的思路搜索解决方案。

## 设置 URL Scheme

Ionic 与 Cordova 配合时默认使用 `ionic://` scheme，而 Capacitor 使用 `capacitor://`。这会导致 LocalStorage 等基于源地址的 Web API 数据丢失。可通过以下配置修改：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 移除 Cordova

完成迁移测试后，可删除 Cordova 相关文件（`config.xml`、`platforms` 和 `plugins` 文件夹）。注意这不是必须的，Capacitor 可与 Cordova 共存。若需继续使用某些 Cordova 插件，可保留这些文件。

## 后续步骤

这只是 Capacitor 之旅的开始。了解更多关于：
- [在 Capacitor 中使用 Cordova 插件](/plugins/cordova.md)
- [开发工作流](/main/basics/workflow.md)的详细信息