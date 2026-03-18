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

Android 应用在 `AndroidManifest.xml` 文件中管理权限、设备功能和其他设置，该文件位于 `android/app/src/main/AndroidManifest.xml`。

> `AndroidManifest.xml` 可能会通过 `@style` 和 `@string` 引用 `android/app/src/main/res/values` 目录中的其他文件，例如 `styles.xml` 和 `strings.xml`。[详细了解 Android 资源](https://developer.android.com/guide/topics/resources/available-resources)。

本文涵盖了你需要对应用进行的基本修改。阅读 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/manifest-intro.html) 以了解更多内容。

## 修改包 ID

要更改应用的包 ID（在 Android 上又称 **应用 ID**），请编辑 `android/app/build.gradle` 顶部的 `applicationId`：

```diff
defaultConfig {
-       applicationId "com.capacitorjs.app"
+       applicationId "com.mycompany.myapp"
```

## 修改应用名称

要更改应用的名称，请修改 `strings.xml` 中的 `app_name` 值：

```xml
<string name="app_name">我的应用</string>
```

将活动名称更改为匹配的名称可能是有意义的，特别是当你的应用只有一个活动时：

```xml
<string name="title_activity_main">我的应用</string>
```

## 深度链接（即 Android App Links）

> 有关深度链接的完整指南，[请参阅此处](/main/guides/deep-links.md)。

要启用通过 Android App Links 的深度链接，请遵循官方 Android 指南 [添加 Android App Links](https://developer.android.com/studio/write/app-link-indexing)。Android Studio 提供了一个便捷的向导来配置 App Links。

配置完成后，[App API 中的 `getLaunchUrl()` 方法](/apis/app.md#getlaunchurl) 将提供应用启动时使用的任何 URL，并且每当应用收到新的 App Link 深度链接时，[`'appUrlOpen'` 事件](/apis/app.md#addlistenerappurlopen-) 都会触发。

## URL 方案

你的应用可以响应启动时的自定义 URL，从而能够处理深度链接和应用交互。

要更改 URL，请在 `strings.xml` 中搜索并修改以下行。建议将其设置为包 ID。

```xml
<string name="custom_url_scheme">com.capacitorjs.myapp</string>
```

在此示例中，应用将响应使用 `com.capacitorjs.myapp://` 方案的 URL。

要获取应用启动时可能使用的任何自定义 URL，请参阅上面的深度链接部分。

## 设置权限

在 Android 中，你的应用将需要的权限在 `AndroidManifest.xml` 的 `<manifest>` 标签内定义，通常位于文件底部。

例如，添加网络权限的示例如下：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.getcapacitor.myapp">
    <activity>
      <!-- 其他内容 -->
    </activity>

    <!-- 更多内容 -->

    <!-- 你的权限 -->

    <!-- 网络 API -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>
```

通常，你选择使用的插件会要求你设置权限。请在此文件中添加它。