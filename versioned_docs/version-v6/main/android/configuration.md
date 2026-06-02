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

本文涵盖了您需要对应用进行的基本修改。请阅读 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/manifest-intro.html) 以了解更多内容。

## 更改 Package ID

要更改应用的 Package ID（在 Android 中也称为 **Application ID**），请编辑 `android/app/build.gradle` 顶部的 `applicationId`：

```diff
defaultConfig {
-       applicationId "com.capacitorjs.app"
+       applicationId "com.mycompany.myapp"
```

## 更改应用名称

要更改应用的名称，请在 `strings.xml` 中修改 `app_name` 的值：

```xml
<string name="app_name">MyApp</string>
```

如果您的应用只有一个 Activity，可能还需要相应地更改 Activity 名称：

```xml
<string name="title_activity_main">MyApp</string>
```

## Deep Links（即 Android App Links）

> 关于 Deep Links 的指南，[请参阅此处](/main/guides/deep-links.md)。

要启用 Android App Links 的深度链接功能，请遵循官方的 [Android App Links 添加指南](https://developer.android.com/studio/write/app-link-indexing)。Android Studio 提供了一个方便的配置 App Links 的向导。

配置完成后，[App API 中的 `getLaunchUrl()` 方法](/apis/app.md#getlaunchurl) 将提供应用启动时使用的任何 URL，并且当应用收到新的 App Link 深度链接时，[`'appUrlOpen'` 事件](/apis/app.md#addlistenerpause-) 将被触发。

## URL Scheme

您的应用可以在启动时响应自定义 URL，从而处理深度链接和应用交互。

要更改 URL，请在 `strings.xml` 中搜索并修改以下行。建议将其设置为 Package ID。

```xml
<string name="custom_url_scheme">com.capacitorjs.myapp</string>
```

在此示例中，应用将响应 `com.capacitorjs.myapp://` 协议的 URL。

要获取应用可能启动时使用的任何自定义 URL，请参见上面的 Deep Links 部分。

## 设置权限

在 Android 中，应用所需的权限在 `AndroidManifest.xml` 的 `<manifest>` 标签内定义，通常位于文件底部。

例如，以下是添加网络权限的方式：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.getcapacitor.myapp">
    <activity>
      <!-- 其他内容 -->
    </activity>

    <!-- 更多内容 -->

    <!-- 您的权限 -->

    <!-- Network API -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>
```

通常，您选择的插件会要求您设置权限。请在此文件中添加相应权限。
