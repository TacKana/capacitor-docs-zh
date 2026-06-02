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

> `AndroidManifest.xml` 可能通过 `@style` 和 `@string` 引用 `android/app/src/main/res/values` 目录中的其他文件，如 `styles.xml` 和 `strings.xml`。[了解更多关于 Android 资源的信息](https://developer.android.com/guide/topics/resources/available-resources)。

本文介绍了你需要对应用进行的基本修改。请阅读 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/manifest-intro.html) 以了解更多内容。

## 修改包 ID

要修改应用的包 ID（即 Android 上的 **Application ID**），请编辑 `android/app/build.gradle` 顶部的 `applicationId`：

```diff
defaultConfig {
-       applicationId "com.capacitorjs.app"
+       applicationId "com.mycompany.myapp"
```

## 修改应用名称

要修改应用的名称，请更改 `strings.xml` 中 `app_name` 的值：

```xml
<string name="app_name">MyApp</string>
```

如果应用只有一个 Activity，建议同时修改 Activity 名称以保持一致：

```xml
<string name="title_activity_main">MyApp</string>
```

## 深度链接（即 Android App Links）

> 深度链接指南，[请参见此处](/main/guides/deep-links.md)。

要启用通过 Android App Links 的深度链接功能，请遵循官方 Android 指南 [添加 Android App Links](https://developer.android.com/studio/write/app-link-indexing)。Android Studio 提供了一个方便的向导用于配置 App Links。

配置完成后，App API 中的 [`getLaunchUrl()` 方法](/apis/app.md#getlaunchurl) 将提供应用启动时携带的任何 URL，而 [`'appUrlOpen'` 事件](/apis/app.md#addlistenerpause-) 将在应用收到新的 App Link 深度链接时触发。

## URL Scheme

你的应用可以在启动时响应自定义 URL，从而实现深度链接和应用交互。

要修改 URL，请在 `strings.xml` 中查找并修改以下行。建议将其设置为包 ID。

```xml
<string name="custom_url_scheme">com.capacitorjs.myapp</string>
```

在此示例中，应用将响应以 `com.capacitorjs.myapp://` 为 scheme 的 URL。

要获取应用可能启动时携带的任何自定义 URL，请参见上面的深度链接部分。

## 设置权限

在 Android 中，应用需要的权限在 `AndroidManifest.xml` 的 `<manifest>` 标签内定义，通常位于文件底部。

例如，以下是添加网络权限的方式：

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

通常，你选择使用的插件会要求你设置某项权限。请将其添加到此文件中。
