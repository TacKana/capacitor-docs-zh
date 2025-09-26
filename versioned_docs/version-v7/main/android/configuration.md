---
title: 配置 Android
sidebar_label: 配置
description: 配置 Android
contributors:
  - mlynch
  - jcesarmobile
slug: /android/configuration
---

# 配置 Android

## 配置 `AndroidManifest.xml`

Android 应用通过 `AndroidManifest.xml` 文件管理权限、设备功能及其他设置，该文件位于 `android/app/src/main/AndroidManifest.xml`。

> `AndroidManifest.xml` 可能通过 `@style` 和 `@string` 引用 `android/app/src/main/res/values` 目录下的其他文件，如 `styles.xml` 和 `strings.xml`。[了解更多关于 Android 资源的信息](https://developer.android.com/guide/topics/resources/available-resources)。

本文涵盖了对应用所需的基本修改。如需了解更多，请阅读 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/manifest-intro.html)。

## 更改包标识符

要更改应用的包标识符（即 Android 的**应用 ID**），请编辑 `android/app/build.gradle` 顶部的 `applicationId`：

```diff
defaultConfig {
-       applicationId "com.capacitorjs.app"
+       applicationId "com.mycompany.myapp"
```

## 更改应用名称

要更改应用的名称，请修改 `strings.xml` 中的 `app_name` 值：

```xml
<string name="app_name">我的应用</string>
```

建议同时修改活动名称以保持一致，特别是当应用只有一个活动时：

```xml
<string name="title_activity_main">我的应用</string>
```

## 深度链接（即 Android 应用链接）

> 关于深度链接的指南，[请参见此处](/main/guides/deep-links.md)。

要启用通过 Android 应用链接进行深度链接，请遵循官方 Android 指南中的[添加 Android 应用链接](https://developer.android.com/studio/write/app-link-indexing)。Android Studio 提供了一个便捷的向导来配置应用链接。

配置完成后，[App API 中的 `getLaunchUrl()` 方法](/apis/app.md#getlaunchurl)将提供应用启动时使用的任何 URL，而 [`'appUrlOpen'` 事件](/apis/app.md#addlistenerpause-)将在应用收到新的应用链接深度链接时触发。

## URL 方案

您的应用可以响应启动时的自定义 URL，从而实现深度链接和应用交互的处理。

要更改 URL，请在 `strings.xml` 中搜索并修改以下行。建议将其设置为包标识符。

```xml
<string name="custom_url_scheme">com.capacitorjs.myapp</string>
```

在此示例中，应用将响应带有 `com.capacitorjs.myapp://` 方案的 URL。

要获取应用可能启动时使用的任何自定义 URL，请参阅上面的深度链接部分。

## 设置权限

在 Android 中，应用所需的权限在 `AndroidManifest.xml` 的 `<manifest>` 标签内定义，通常位于文件底部。

例如，添加网络权限的示例如下：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.getcapacitor.myapp">
    <activity>
      <!-- 其他内容 -->
    </activity>

    <!-- 更多内容 -->

    <!-- 您的权限 -->

    <!-- 网络 API -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>
```

通常，您选择的插件会要求您设置权限。请在此文件中添加它们。