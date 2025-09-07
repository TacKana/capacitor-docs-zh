---
title: Configuring Android
description: Android 配置指南
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/android/configuration
---

# Android 应用配置

Android 应用通过修改 `AndroidManifest.xml` 文件来管理权限、设备功能和其他设置。

该文件会引用 `res/values/` 目录下其他文件中的值，方便单独更新，包括 `styles.xml` 和 `strings.xml`。

本文介绍应用需要的基础配置修改。如需了解更多，请阅读 [Android 清单文件](https://developer.android.com/guide/topics/manifest/manifest-intro.html) 官方文档。

## 修改应用 ID

要更改应用的包名/应用 ID，请编辑 `android/app/build.gradle` 中的 `applicationId` 行：

```groovy
applicationId "com.getcapacitor.myapp"
```

## 修改应用名称

要修改应用显示名称，请更改 `strings.xml` 中的 `app_name` 值：

```xml
<string name="app_name">我的应用</string>
```

如果应用计划只保留一个主活动（运行应用的 WebView 活动），建议将活动名称与应用名称保持一致：

```xml
<string name="title_activity_main">我的应用</string>
```

## 深度链接（即 Android 应用链接）

> 完整深度链接指南请[参阅此处](/guides/deep-links.md)。

要启用 Android 应用链接的深度链接功能，请按照官方指南操作[添加 Android 应用链接](https://developer.android.com/studio/write/app-link-indexing)。Android Studio 提供了便捷的配置向导。

配置完成后，[App API 中的 getLaunchUrl 方法](/apis/app.md#getlaunchurl) 将提供应用启动时使用的任何 URL，而 [appUrlOpen 事件](/apis/app.md#addlistener-1) 会在应用收到新的应用链接时触发。

## 修改自定义 URL 方案

您的应用可以响应启动时的自定义 URL，从而实现深度链接和应用交互功能。

要修改 URL 方案，请在 `strings.xml` 中查找并修改以下行。建议将其设置为应用的包名/ID。

```xml
<string name="custom_url_scheme">com.getcapacitor.myapp</string>
```

在此示例中，应用将响应以 `com.getcapacitor.myapp://` 开头的 URL 方案。

要获取应用启动时可能使用的自定义 URL，请参阅上文深度链接部分。

## 设置权限

在 Android 中，应用需要的权限定义在 `<manifest>` 标签内的 `AndroidManifest.xml` 中，通常位于文件底部。

例如，添加网络权限的配置如下：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.getcapacitor.myapp">
    <activity>
      <!-- 其他配置 -->
    </activity>

    <!-- 更多配置 -->

    <!-- 权限声明 -->

    <!-- 网络API权限 -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>
```

通常您使用的插件会要求设置特定权限，只需在此文件中添加即可。

## 默认权限配置

Capacitor 最新版本与标准插件组合时请求的初始完整权限集，可在 android-template 项目的 [AndroidManifest.xml](https://github.com/ionic-team/capacitor/blob/2.x/android-template/app/src/main/AndroidManifest.xml) 中查看。