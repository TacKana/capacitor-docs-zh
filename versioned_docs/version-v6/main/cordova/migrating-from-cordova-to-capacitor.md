---
title: Cordova到Capacitor的迁移
description: 从Cordova迁移至Capacitor
contributors:
  - dotNetkow
slug: /cordova/migrating-from-cordova-to-capacitor
---

# 将基于Cordova的Web应用迁移至Capacitor

完整迁移一个使用Cordova的Web应用到Capacitor需要以下几个步骤。

> 建议在进行这些变更时使用单独的分支进行开发。

## 添加Capacitor

首先在终端中打开您的项目，然后根据项目类型选择对应的指南：
- [为Web应用添加Capacitor](/main/getting-started/installation.md#add-capacitor-to-your-web-app)
- [为Ionic应用添加Capacitor](/main/getting-started/with-ionic.md#installing-capacitor-to-an-existing-ionic-project)

使用Capacitor初始化您的应用。部分初始化所需信息可以从Cordova的`config.xml`文件中获取：
- 应用名称：`<name>`元素中的内容
- 包标识符(Bundle ID)：根元素`<widget>`的`id`属性值

```bash
npx cap init
```

### 构建Web应用

在添加任何原生平台前，您必须先构建Web项目。

```bash
npm run build
```

这将确保Capacitor配置文件中的`webDir`指向正确的`www`目录（Capacitor已[自动配置](/main/basics/configuring-your-app.md)此目录）。

### 添加平台

Capacitor的原生平台位于项目根目录下的独立文件夹中，而Cordova的原生平台则位于`platforms/ios`或`platforms/android`目录下。

```bash
npx cap add ios
npx cap add android
```

执行后将分别在项目根目录创建android和ios文件夹。这些是完全独立的原生项目产物，应视为应用代码的一部分（即需要纳入版本控制，在各自IDE中编辑等）。此外，Capacitor会自动将`package.json`中`dependencies`下的所有Cordova插件（[不兼容的插件](/plugins/cordova.md#known-incompatible-plugins)除外）安装到每个新创建的原生项目中：

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

如果您之前创建过应用图标和启动画面资源，它们通常位于项目的`resources`目录中。使用这些资源文件，可以通过`@capacitor/assets`工具为基于Capacitor的iOS和Android项目重新生成相应资源。

运行以下命令重新生成资源并复制到原生项目：

```bash
npx @capacitor/assets generate --ios
npx @capacitor/assets generate --android
```

[完整说明请参见此处](https://github.com/ionic-team/capacitor-assets)。

## 迁移插件

首先审核现有的Cordova插件——有些可能已经不再需要。

然后查阅Capacitor的[官方插件](/plugins/official.md)和[社区插件](/plugins/community.md)列表，您可能会找到对应的Capacitor等效插件。

部分插件可能在功能上不完全匹配，但根据您的实际需求可能影响不大。

注意：[不兼容或会导致构建问题的插件](/plugins/cordova.md#known-incompatible-plugins)会自动被跳过。

### 移除Cordova插件

当用Capacitor插件替换某个Cordova插件（或直接移除）后，卸载该插件并运行`sync`命令从原生项目中移除相关代码：

```bash
npm uninstall cordova-plugin-name
npx cap sync
```

## 设置权限

Capacitor的最新版本已为iOS和Android的原生项目默认配置了初始权限集合。但您可能需要根据`plugin.xml`中的声明手动添加额外权限，具体配置方法请参考[iOS](/main/ios/configuration.md)和[Android](/main/android/configuration.md)配置指南。

## Cordova插件偏好设置

执行`npx cap init`时，Capacitor会读取`config.xml`中的所有偏好设置并迁移到[Capacitor配置文件](/main/reference/config.md)中。您也可以手动在`cordova.preferences`对象中添加更多设置。

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

## 处理config.xml中的其他字段

您可能想知道`config.xml`中的其他元素在Capacitor应用中如何对应。

Author元素可以在`package.json`中配置，但Capacitor和应用本身不会使用该信息：

```xml
<author email="email@test.com" href="http://ionicframework.com/">Ionic Framework Team</author>
```

大多数`allow-intent`值要么不被使用，要么存在[可配置的替代方案](/main/basics/configuring-your-app.md)。

```xml
<allow-intent href="http://*/*" />
<allow-intent href="https://*/*" />
<allow-intent href="tel:*" />
<allow-intent href="sms:*" />
<allow-intent href="mailto:*" />
<allow-intent href="geo:*" />
```

iOS的`edit-config`元素需要在[Info.plist中配置](/main/ios/configuration.md)。

```xml
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
    <string>Used to take photos</string>
</edit-config>
```

我们无法涵盖所有可能的`config.xml`元素。但大多数"如何在Capacitor中配置X？"的问题应该理解为"如何在[iOS/Android]平台中配置X？"，这样能更有效地找到答案。

## 设置URL方案

在Ionic+Cordova项目中，默认使用`cordova-plugin-ionic-webview`插件，该插件在iOS上使用`ionic://`方案加载内容。而Capacitor应用默认使用`capacitor://`方案。这会导致使用origin绑定的Web API（如LocalStorage）时数据丢失，因为origin发生了变化。可以通过修改内容加载方案来解决：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 移除Cordova

当您确认所有迁移变更都已正确应用且应用运行良好后，可以从项目中移除Cordova。删除`config.xml`文件以及`platforms`和`plugins`文件夹。请注意，技术上您不必移除Cordova，因为Capacitor可以与其共存。如果您计划继续使用某些Cordova插件或未来可能需要使用，可以保留这些Cordova资源。

## 后续步骤

这仅是您Capacitor之旅的开始。了解更多关于：
- [在Capacitor项目中使用Cordova插件](/plugins/cordova.md)
- Capacitor的[开发工作流程详解](/main/basics/workflow.md)