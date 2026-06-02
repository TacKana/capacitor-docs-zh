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

本文涵盖了您需要对应用进行的基本修改。阅读 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/manifest-intro.html) 以了解更多内容。

## 更改 Package ID

要更改应用的 Package ID（在 Android 中也称为 **Application ID**），请编辑 `android/app/build.gradle` 顶部的 `applicationId`：

```diff
defaultConfig {
-       applicationId "com.capacitorjs.app"
+       applicationId "com.mycompany.myapp"
```

## 更改应用名称

要更改应用的名称，请修改 `strings.xml` 中 `app_name` 的值：

```xml
<string name="app_name">MyApp</string>
```

将 activity 名称同步修改可能也是合理的，特别是当您的应用只有一个 activity 时：

```xml
<string name="title_activity_main">MyApp</string>
```

## Deep Links（即 Android App Links）

> 有关 Deep Links 的指南，[请参见此处](/main/guides/deep-links.md)。

要通过 Android App Links 启用深度链接，请遵循官方的 Android 指南[添加 Android App Links](https://developer.android.com/studio/write/app-link-indexing)。Android Studio 提供了一个方便的向导来配置 App Links。

配置完成后，[App API 中的 `getLaunchUrl()` 方法](/apis/app.md#getlaunchurl) 将提供应用启动时使用的任何 URL，并且当应用收到新的 App Link 深度链接时，[`'appUrlOpen'` 事件](/apis/app.md#addlistenerpause-) 将被触发。

## URL Schemes

您的应用可以在启动时响应自定义 URL，从而可以处理深度链接和应用交互。

要更改 URL，请在 `strings.xml` 中搜索并修改此行。建议将其设置为 Package ID。

```xml
<string name="custom_url_scheme">com.capacitorjs.myapp</string>
```

在此示例中，应用将响应以 `com.capacitorjs.myapp://` 为 scheme 的 URL。

要获取应用可能启动时的任何自定义 URL，请参阅上面的 Deep Links 部分。

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

    <!-- Network API -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>
```

通常，您选择的插件会要求您设置权限。请在此文件中添加。
