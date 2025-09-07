---
title: Cordova 到 Capacitor 迁移指南
description: 从 Cordova 迁移至 Capacitor 的完整方案
contributors:
  - dotNetkow
slug: /cordova/migrating-from-cordova-to-capacitor
---

# 将基于 Cordova 的 Web 应用迁移至 Capacitor

要将使用 Cordova 的 Web 应用完全迁移到 Capacitor，需要完成以下几个关键步骤。

> 建议在进行迁移操作时创建一个独立的分支。

## 添加 Capacitor

首先在终端中打开项目，然后根据项目类型选择：
- [为普通 Web 应用添加 Capacitor](/main/getting-started/installation.md#add-capacitor-to-your-web-app)
- [为 Ionic 应用添加 Capacitor](/main/getting-started/with-ionic.md#installing-capacitor-to-an-existing-ionic-project)

初始化 Capacitor 时，部分信息可从 Cordova 的 `config.xml` 中获取：
- 应用名称：`<name>` 标签内容
- 包标识符：根节点 `<widget>` 的 `id` 属性

```bash
npx cap init
```

### 构建 Web 应用

在添加任何原生平台前，必须先构建 Web 项目。

```bash
npm run build
```

这将确保 Capacitor [自动配置](/main/basics/configuring-your-app.md) 使用的 `www` 文件夹能在配置文件中正确设置为 `webDir`。

### 添加平台

Capacitor 的原生平台位于项目根目录下独立的文件夹中（不同于 Cordova 的 `platforms/ios` 或 `platforms/android` 结构）。

```bash
npx cap add ios
npx cap add android
```

执行后会在项目根目录创建 android 和 ios 文件夹。这些是完整的原生项目文件，应当视为应用代码的一部分（需纳入版本控制，使用专用 IDE 编辑等）。同时，`package.json` 的 `dependencies` 中所有 Cordova 插件（除 [已知不兼容的插件](/plugins/cordova.md#known-incompatible-plugins) 外）都会自动安装到各原生项目：

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

## 启动图与应用图标

若已有图标和启动图资源，它们通常存放在项目的 `resources` 目录。使用 `cordova-res` 工具可为 Capacitor 项目生成各平台所需资源：

首先全局安装工具：

```bash
npm install -g cordova-res
```

然后执行生成命令并复制到原生项目：

```bash
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```

[详细操作指南](https://github.com/ionic-team/cordova-res#capacitor)

## 插件迁移方案

### 插件评估流程
1. **审计现有插件**：移除不再需要的 Cordova 插件
2. **探索替代方案**：查阅 Capacitor 的 [官方插件](/plugins/official.md) 和 [社区插件](/plugins/community.md)
3. **功能比对**：部分插件功能可能不完全匹配，根据实际需求评估

注意：所有 [不兼容或会导致构建问题的插件](/plugins/cordova.md#known-incompatible-plugins) 会自动跳过安装。

### 移除 Cordova 插件

当使用 Capacitor 插件替代（或直接移除）某个 Cordova 插件后，需执行：

```bash
npm uninstall cordova-plugin-name
npx cap sync
```

这将从原生项目中清除相关代码。

## 权限配置

Capacitor 已为 iOS 和 Android 平台预设了基础权限集。如需额外权限，需手动配置：
- 参考 [iOS 配置指南](/main/ios/configuration.md)
- 参考 [Android 配置指南](/main/android/configuration.md)

## Cordova 偏好设置迁移

执行 `npx cap init` 时，Capacitor 会自动将 `config.xml` 中的偏好设置迁移到 [Capacitor 配置文件](/main/reference/config.md)。也可手动添加到 `cordova.preferences` 对象：

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

### 作者信息
`package.json` 可配置但不影响应用功能：
```xml
<author email="email@test.com" href="http://ionicframework.com/">Ionic Framework Team</author>
```

### 访问控制
多数 `allow-intent` 配置有 [替代方案](/main/basics/configuring-your-app.md)：
```xml
<allow-intent href="http://*/*" />
<allow-intent href="https://*/*" />
<allow-intent href="tel:*" />
<allow-intent href="sms:*" />
<allow-intent href="mailto:*" />
<allow-intent href="geo:*" />
```

### iOS 配置
需通过 [Info.plist 文件配置](/main/ios/configuration.md)：
```xml
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
    <string>Used to take photos</string>
</edit-config>
```

其他特殊配置项的处理思路：搜索"如何在 [平台名称] (iOS/Android) 中配置 X"。

## 协议方案调整

Ionic 与 Cordova 配合时默认使用 `ionic://` 协议。Capacitor 则使用 `capacitor://`，这会导致 LocalStorage 等基于源地址的 Web API 数据丢失。解决方案：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 移除 Cordova

完成所有迁移测试后，可安全删除：
- `config.xml` 文件
- `platforms` 和 `plugins` 目录

注意：如需继续使用某些 Cordova 插件，可保留这些文件。

## 后续建议

这只是 Capacitor 使用的起点，您还可以：
- 深入了解 [在 Capacitor 中使用 Cordova 插件](/plugins/cordova.md)
- 掌握 Capacitor 的 [开发工作流](/main/basics/workflow.md)