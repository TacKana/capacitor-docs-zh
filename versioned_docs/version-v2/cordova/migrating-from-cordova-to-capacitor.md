---
title: 从 Cordova 迁移到 Capacitor
description: 从 Cordova 迁移至 Capacitor 指南
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor
---

# 将基于 Cordova 的 Web 应用迁移至 Capacitor

完整迁移一个使用 Cordova 的 Web 应用至 Capacitor 需要以下几个步骤。

> 注意：建议在独立代码分支中实施这些变更。

## 添加 Capacitor

首先在终端中打开项目，然后根据项目类型添加 Capacitor：
- [普通 Web 应用](/getting-started/index.md)
- [Ionic 应用](/getting-started/with-ionic.md)

接着打开 `config.xml`，找到 widget 元素中的 `id` 字段。本例中为 `io.ionic.myapp`。

```xml
<widget id="io.ionic.myapp" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
```

同时记录应用名称：

```xml
<name>MyApp</name>
```

使用这些信息初始化 Capacitor：

```bash
npx cap init [应用名称] [应用ID]
```

在本例中应执行 `npx cap init MyApp io.ionic.myapp`。这些值会保存在新创建的 `capacitor.config.json` 文件中。

### 构建 Web 应用

在添加任何原生平台前，必须至少构建一次 Web 项目。

这确保了 Capacitor [自动配置](/basics/configuring-your-app.md) 的 `webDir`（在 `capacitor.config.json` 中指定为 `www` 目录）真实存在。

### 添加平台

Capacitor 的原生平台存在于项目根目录的独立文件夹中，而 Cordova 的平台代码位于 `platforms/ios` 或 `platforms/android`。

```bash
npx cap add ios
npx cap add android
```

执行后会在项目根目录创建 android 和 ios 文件夹。这些是完整的原生项目工件，应当视为应用的一部分（即需要纳入版本控制，使用专用 IDE 编辑等）。此外，之前通过 `npm install` 添加的所有 Cordova 插件（列于 `package.json` 的 `dependencies` 中），除 [不兼容插件](/cordova/known-incompatible-plugins.md) 外，都会被自动安装到各个新原生项目中：

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

如果已有图标和启动图资源，它们通常位于项目的 `resources` 目录。使用 `cordova-res` 工具可以为 Capacitor 的 iOS 和 Android 项目生成这些资源。

首先安装工具：

```bash
$ npm install -g cordova-res
```

运行以下命令重新生成资源并复制到原生项目：

```bash
$ cordova-res ios --skip-config --copy
$ cordova-res android --skip-config --copy
```

[完整文档参见此处](https://github.com/ionic-team/cordova-res#capacitor)

## 迁移插件

首先审核现有 Cordova 插件——可能有些已不再需要。

接着查看 Capacitor 的 [核心插件](/apis/index.md) 和 [社区插件](/plugins/community.md)，可考虑替换为等效的 Capacitor 插件。

某些插件功能可能不完全匹配，但根据实际需求可能不影响使用。

注意所有 [不兼容或导致构建问题的插件](/cordova/known-incompatible-plugins.md) 都会被自动跳过。

### 移除 Cordova 插件

当用 Capacitor 插件替换 Cordova 插件（或直接移除）后，卸载插件并执行 `sync` 命令从原生项目中移除代码：

```bash
npm uninstall cordova-plugin-name
npx cap sync [android | ios]
```

## 设置权限

如果插件在 `plugin.xml` 中声明了权限或使用说明，Capacitor 会自动将它们添加到 `AndroidManifest.xml` 和 `Info.plist`。但可能需要手动添加额外权限，具体方法请参考 [iOS](/ios/configuration.md) 和 [Android](/android/configuration.md) 配置指南。

## Cordova 插件参数配置

运行 `npx cap init` 时，Capacitor 会读取 `config.xml` 中所有参数并移植到 `capacitor.config.json` 或 `capacitor.config.ts` 文件。也可以手动添加更多参数到 `cordova.preferences` 对象：

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

## 其他 Config.xml 配置项

以下是 `config.xml` 中其他元素的处理方式：

作者信息可配置在 `package.json` 中，但 Capacitor 和应用本身不会使用：

```xml
<author email="email@test.com" href="https://ionicframework.com/">Ionic Framework Team</author>
```

大多数 `allow-intent` 值要么不使用，要么在 `capacitor.config.json` 中有 [对应配置项](/basics/configuring-your-app.md)：

```xml
<allow-intent href="http://*/*" />
<allow-intent href="https://*/*" />
<allow-intent href="tel:*" />
<allow-intent href="sms:*" />
<allow-intent href="mailto:*" />
<allow-intent href="geo:*" />
```

iOS 的 `edit-config` 元素需要 [在 Info.plist 中配置](/ios/configuration.md)：

```xml
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
    <string>Used to take photos</string>
</edit-config>
```

无法涵盖所有 `config.xml` 元素。但遇到"如何在 Capacitor 中配置 X？"的问题时，应当转换为"如何在 [平台] (iOS/Android) 中配置 X？"进行搜索。

## 设置 URL Scheme

Ionic 与 Cordova 配合使用时，默认通过 `cordova-plugin-ionic-webview` 使用 `ionic://` scheme 加载内容。Capacitor 应用在 iOS 上默认使用 `capacitor://` scheme。这会导致依赖域名的 Web API（如 LocalStorage）数据丢失，因为域名发生了变化。可通过以下配置修改 scheme：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 移除 Cordova

当确认所有迁移变更已应用且应用运行正常后，可以从项目中移除 Cordova。删除 `config.xml` 以及 `platforms` 和 `plugins` 目录。注意技术上不必强制移除 Cordova，因为 Capacitor 可以与其共存。如果计划继续使用或未来可能使用 Cordova 插件，可以保留这些文件。

## 后续步骤

这仅是 Capacitor 旅程的开始。了解更多关于 [在 Capacitor 项目中使用 Cordova 插件](/cordova/using-cordova-plugins.md) 或 Capacitor [开发工作流](/basics/workflow.md) 的详细信息。