---
title: 配置 Android
sidebar_label: 配置指南
description: Android 应用配置指南
contributors:
  - mlynch
  - jcesarmobile
slug: /android/configuration
---

# Android 配置指南

## 配置 `AndroidManifest.xml`

Android 应用通过位于 `android/app/src/main/AndroidManifest.xml` 的配置文件来管理权限、设备功能和其他设置。

> `AndroidManifest.xml` 可能通过 `@style` 和 `@string` 引用 `android/app/src/main/res/values` 目录下的额外文件如 `styles.xml` 和 `strings.xml`。[详细了解 Android 资源系统](https://developer.android.com/guide/topics/resources/available-resources)

本文涵盖应用所需的基础配置修改。如需深入了解请阅读 [Android Manifest 官方文档](https://developer.android.com/guide/topics/manifest/manifest-intro.html)

## 修改包标识符

要修改应用的包标识符（Android 中称为 **Application ID**），请编辑 `android/app/build.gradle` 文件顶部的 `applicationId`：

```diff
defaultConfig {
-       applicationId "com.capacitorjs.app"
+       applicationId "com.mycompany.myapp"
```

## 修改应用名称

如需更改应用显示名称，请修改 `strings.xml` 中的 `app_name` 值：

```xml
<string name="app_name">我的应用</string>
```

建议同步修改主活动名称，特别是当应用只有单个活动时：

```xml
<string name="title_activity_main">我的应用</string>
```

## 深度链接（即 Android 应用链接）

> 完整指南请参阅[深度链接文档](/main/guides/deep-links.md)

要启用通过 Android App Links 实现的深度链接功能，请遵循官方指南[添加 Android 应用链接](https://developer.android.com/studio/write/app-link-indexing)。Android Studio 提供了便捷的配置向导。

配置完成后，[App API 中的 `getLaunchUrl()` 方法](/apis/app.md#getlaunchurl)将提供应用启动时的原始 URL，而 [`'appUrlOpen'` 事件](/apis/app.md#addlistenerpause-)会在每次收到新深度链接时触发。

## 自定义 URL 方案

您的应用可以响应启动时的自定义 URL，从而实现深度链接和应用交互功能。

要修改 URL 方案，请找到并修改 `strings.xml` 中的对应配置。建议将其设为包标识符。

```xml
<string name="custom_url_scheme">com.capacitorjs.myapp</string>
```

在此示例中，应用将响应 `com.capacitorjs.myapp://` 开头的 URL 地址。

要获取应用启动时的自定义 URL，请参考上文深度链接章节。

## 设置权限

在 Android 中，应用所需权限定义在 `AndroidManifest.xml` 文件的 `<manifest>` 标签内，通常位于文件底部。

例如，添加网络权限的配置如下：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.getcapacitor.myapp">
    <activity>
      <!-- 其他配置 -->
    </activity>

    <!-- 更多配置 -->

    <!-- 权限声明区域 -->

    <!-- 网络API权限 -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>
```

通常情况下，您使用的插件会指明需要添加的权限。请在此文件中进行相应配置。