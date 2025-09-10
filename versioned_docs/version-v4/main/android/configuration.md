---
title: 配置 Android
sidebar_label: 配置指南
description: Android 应用配置说明
contributors:
  - mlynch
  - jcesarmobile
slug: /android/configuration
---

# Android 配置指南

## 配置 `AndroidManifest.xml`

Android 应用通过 `android/app/src/main/AndroidManifest.xml` 文件管理权限、设备功能和其他设置。

> `AndroidManifest.xml` 可能通过 `@style` 和 `@string` 引用 `android/app/src/main/res/values` 目录下的其他文件（如 `styles.xml` 和 `strings.xml`）。[了解更多关于 Android 资源的信息](https://developer.android.com/guide/topics/resources/available-resources)

本文涵盖应用所需的基本修改。如需深入了解，请阅读 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/manifest-intro.html)

## 修改包标识符

要更改应用的包标识符（Android 中称为 **Application ID**），请修改 `android/app/build.gradle` 顶部的 `applicationId`：

```diff
defaultConfig {
-       applicationId "com.capacitorjs.app"
+       applicationId "com.mycompany.myapp"
```

## 修改应用名称

修改 `strings.xml` 中的 `app_name` 值来更改应用名称：

```xml
<string name="app_name">我的应用</string>
```

建议同时修改活动名称以保持一致性，特别是当应用只有一个活动时：

```xml
<string name="title_activity_main">我的应用</string>
```

## 深度链接（即 Android 应用链接）

> 完整指南请参阅[深度链接文档](/main/guides/deep-links.md)

要启用 Android 应用链接功能，请遵循官方 [添加 Android 应用链接](https://developer.android.com/studio/write/app-link-indexing) 指南。Android Studio 提供了便捷的配置向导。

配置完成后，[App API 中的 `getLaunchUrl()` 方法](/apis/app.md#getlaunchurl) 将提供应用启动时的任何 URL，而 [`'appUrlOpen'` 事件](/apis/app.md#addlistenerpause-) 会在应用接收到新的应用链接时触发。

## URL 方案配置

您的应用可以响应启动时的自定义 URL，实现深度链接和应用交互功能。

修改 `strings.xml` 中的以下值（建议设置为包标识符）来更改 URL 方案：

```xml
<string name="custom_url_scheme">com.capacitorjs.myapp</string>
```

在此示例中，应用将响应 `com.capacitorjs.myapp://` 格式的 URL。

要获取应用启动时的自定义 URL，请参考上文深度链接部分。

## 设置权限

Android 应用的所需权限定义在 `AndroidManifest.xml` 的 `<manifest>` 标签内，通常位于文件底部。

例如，添加网络权限的配置如下：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.getcapacitor.myapp">
    <activity>
      <!-- 其他配置 -->
    </activity>

    <!-- 更多配置 -->

    <!-- 权限配置 -->

    <!-- 网络 API 权限 -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>
```

通常情况下，您使用的插件会要求设置相应权限，只需在此文件中添加即可。