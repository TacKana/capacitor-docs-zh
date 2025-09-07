---
title: Cordova 到 Capacitor 迁移指南
description: 从 Cordova 迁移至 Capacitor 的完整流程
contributors:
  - dotNetkow
slug: /cordova/migrating-from-cordova-to-capacitor
---

# 将 Cordova 应用迁移至 Capacitor

将基于 Cordova 的 Web 应用完整迁移到 Capacitor 需要执行以下几个关键步骤。

> 建议在单独代码分支中实施这些变更。

## 添加 Capacitor

首先在终端中打开项目，然后根据项目类型选择：
- [为 Web 应用添加 Capacitor](/main/getting-started/installation.md#add-capacitor-to-your-web-app) 
- [为 Ionic 应用添加 Capacitor](/main/getting-started/with-ionic.md#installing-capacitor-to-an-existing-ionic-project)

初始化 Capacitor 应用时，部分信息可从 Cordova 的 `config.xml` 中获取：
- 应用名称对应 `<name>` 元素
- 包标识符对应根 `<widget>` 元素的 `id` 属性

```bash
npx cap init
```

### 构建 Web 应用

在添加任何原生平台前，必须先构建 Web 项目。

```bash
npm run build
```

这会确保自动配置的 `www` 文件夹作为 Capacitor 配置文件中的 `webDir` 目录。

### 添加平台

Capacitor 的原生平台存在于项目根目录下独立的文件夹中（不同于 Cordova 的 `platforms/ios` 或 `platforms/android` 结构）。

```bash
npx cap add ios
npx cap add android
```

项目根目录会生成独立的 android 和 ios 文件夹，这些是完整的原生项目文件（建议纳入版本控制，并使用对应 IDE 编辑）。此外，`package.json` 依赖项中的所有 Cordova 插件（除[不兼容插件](/plugins/cordova.md#known-incompatible-plugins)外）都会自动安装到各原生项目中：

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

已有图标和启动图资源通常存放在项目根目录的 `resources` 文件夹中。使用 `@capacitor/assets` 工具可为 Capacitor 项目生成各平台所需的资源：

```bash
npx @capacitor/assets generate --ios
npx @capacitor/assets generate --android
```

[完整文档参考此处](https://github.com/ionic-team/capacitor-assets)

## 插件迁移

首先梳理现有 Cordova 插件，可能部分插件已不再需要。

然后查阅 Capacitor 的[官方插件](/plugins/official.md)和[社区插件](/plugins/community.md)，寻找对应的替代方案。某些插件功能可能不完全匹配，但根据实际需求可能已足够使用。

注意：[不兼容的插件](/plugins/cordova.md#known-incompatible-plugins)会被自动跳过安装。

### 移除 Cordova 插件

当用 Capacitor 插件替换或移除 Cordova 插件后，执行同步操作：

```bash
npm uninstall cordova-plugin-name
npx cap sync
```

## 权限配置

Capacitor 默认已为 iOS 和 Android 配置了基础权限集。如需额外权限，需参考各平台的配置指南：
- [iOS 配置](/main/ios/configuration.md)
- [Android 配置](/main/android/configuration.md)

## Cordova 偏好设置

执行 `npx cap init` 时，Capacitor 会读取 `config.xml` 中的偏好设置并转换到[配置文件](/main/reference/config.md)中。也可手动添加到 `cordova.preferences` 对象：

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

## 处理 config.xml 其他元素

`config.xml` 中的其他元素处理方式如下：

作者信息可配置在 `package.json` 中（Capacitor 不会使用）：
```xml
<author email="email@test.com" href="http://ionicframework.com/">Ionic Framework Team</author>
```

`allow-intent` 多数都有[替代配置方案](/main/basics/configuring-your-app.md)：
```xml
<allow-intent href="http://*/*" />
<allow-intent href="https://*/*" />
```

iOS 配置需通过 [Info.plist 文件处理](/main/ios/configuration.md)：
```xml
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
    <string>Used to take photos</string>
</edit-config>
```

遇到具体配置问题时，应以"如何在 [平台] 中配置 X"为思路进行搜索。

## 修改 URL Scheme

Ionic 与 Cordova 配合时默认使用 `ionic://` 协议，而 Capacitor 使用 `capacitor://`。这会导致 LocalStorage 等基于源地址的 API 数据丢失。解决方案：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 移除 Cordova

完成所有测试验证后，可删除 Cordova 相关文件（`config.xml`、`platforms` 和 `plugins` 目录）。注意：若仍需使用 Cordova 插件，可保留这些文件，Capacitor 可与其共存。

## 后续步骤

这只是 Capacitor 旅程的开始：
- 深入了解[使用 Cordova 插件](/plugins/cordova.md)
- 掌握 Capacitor [开发工作流](/main/basics/workflow.md)