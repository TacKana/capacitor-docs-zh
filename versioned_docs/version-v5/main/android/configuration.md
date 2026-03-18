---
title: Android 配置
sidebar_label: 配置
description: Android 配置指南
contributors:
  - mlynch
  - jcesarmobile
slug: /android/configuration
---

# Android 配置

## 配置 `AndroidManifest.xml`

Android 应用通过 `AndroidManifest.xml` 文件管理权限、设备功能及其他设置，该文件位于 `android/app/src/main/AndroidManifest.xml`。

> `AndroidManifest.xml` 可能通过 `@style` 和 `@string` 引用 `android/app/src/main/res/values` 目录下的其他文件，如 `styles.xml` 和 `strings.xml`。[详细了解 Android 资源](https://developer.android.com/guide/topics/resources/available-resources)。

本文介绍应用所需的基本配置。如需深入学习，请阅读 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/manifest-intro.html)。

## 修改包 ID

要修改应用的包 ID（在 Android 中称为**应用程序 ID**），请编辑 `android/app/build.gradle` 文件顶部的 `applicationId`：

```diff
defaultConfig {
-       applicationId "com.capacitorjs.app"
+       applicationId "com.mycompany.myapp"
```

## 修改应用名称

要修改应用的名称，请更改 `strings.xml` 中 `app_name` 的值：

```xml
<string name="app_name">我的应用</string>
```

建议同时修改对应的 Activity 名称，特别是当应用只有一个 Activity 时：

```xml
<string name="title_activity_main">我的应用</string>
```

## 深度链接（Android 应用链接）

> 关于深度链接的完整指南，[请参阅此处](/main/guides/deep-links.md)。

要启用 Android 应用链接的深度链接功能，请遵循官方的 [添加 Android 应用链接](https://developer.android.com/studio/write/app-link-indexing) 指南。Android Studio 提供了便捷的向导来配置应用链接。

配置完成后，App API 中的 [`getLaunchUrl()` 方法](/apis/app.md#getlaunchurl) 将提供应用启动时使用的任何 URL，并且每次应用接收到新的应用链接深度链接时，[`'appUrlOpen'` 事件](/apis/app.md#addlistenerpause-) 都会触发。

## URL 方案

您的应用可以响应启动时的自定义 URL，从而实现深度链接与应用交互。

要修改 URL，请在 `strings.xml` 中搜索并修改以下行。建议将其设置为包 ID。

```xml
<string name="custom_url_scheme">com.capacitorjs.myapp</string>
```

在此示例中，应用将响应使用 `com.capacitorjs.myapp://` 方案的 URL。

要获取应用启动时可能使用的任何自定义 URL，请参阅上文的深度链接部分。

## 设置权限

在 Android 中，应用所需的权限在 `AndroidManifest.xml` 文件的 `<manifest>` 标签内定义，通常位于文件底部。

例如，添加网络权限的示例如下：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.getcapacitor.myapp">
    <activity>
      <!-- 其他内容 -->
    </activity>

    <!-- 更多内容 -->

    <!-- 您的权限设置 -->

    <!-- 网络 API 权限 -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>
```

通常，您使用的插件会要求设置相应权限。请在此文件中添加。