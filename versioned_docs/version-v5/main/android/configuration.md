---
title: 配置 Android 应用
sidebar_label: 配置指南
description: Android 应用配置指南
contributors:
  - mlynch
  - jcesarmobile
slug: /android/configuration
---

# 配置 Android 应用

## 配置 `AndroidManifest.xml`

Android 应用通过 `AndroidManifest.xml` 文件管理权限、设备功能和其他设置，该文件位于 `android/app/src/main/AndroidManifest.xml`。

> `AndroidManifest.xml` 可能通过 `@style` 和 `@string` 引用 `android/app/src/main/res/values` 目录下的其他文件如 `styles.xml` 和 `strings.xml`。[详细了解 Android 资源系统](https://developer.android.com/guide/topics/resources/available-resources)。

本文介绍应用需要的基本配置修改。阅读 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/manifest-intro.html)可获取更全面的信息。

## 修改应用包名

要修改应用的包名（Android 中称为 **Application ID**），编辑 `android/app/build.gradle` 顶部的 `applicationId`：

```diff
defaultConfig {
-       applicationId "com.capacitorjs.app"
+       applicationId "com.mycompany.myapp"
```

## 修改应用名称

修改 `strings.xml` 中的 `app_name` 值来更改应用显示名称：

```xml
<string name="app_name">我的应用</string>
```

如果应用只有一个主界面，建议同步修改对应的活动名称：

```xml
<string name="title_activity_main">我的应用</string>
```

## 深度链接（Android 应用链接）

> 深度链接完整指南请[参见此处](/main/guides/deep-links.md)。

要启用 Android 应用链接形式的深度链接，请遵循官方指南[添加 Android 应用链接](https://developer.android.com/studio/write/app-link-indexing)。Android Studio 提供了便捷的配置向导。

配置完成后，[应用 API 中的 `getLaunchUrl()` 方法](/apis/app.md#getlaunchurl)将提供应用启动时的 URL，而 [`'appUrlOpen'` 事件](/apis/app.md#addlistenerpause-)会在每次收到新应用链接时触发。

## 自定义 URL 方案

应用可以响应启动时的自定义 URL，用于处理深度链接和应用交互。

修改 `strings.xml` 中的以下行来更改 URL 方案（建议设置为包名）：

```xml
<string name="custom_url_scheme">com.capacitorjs.myapp</string>
```

此例中，应用将响应 `com.capacitorjs.myapp://` 开头的 URL。

要获取应用启动时的自定义 URL，请参考上文深度链接部分。

## 设置权限

在 Android 中，所需权限定义在 `<manifest>` 标签内的 `AndroidManifest.xml` 中，通常位于文件底部。

例如，添加网络权限的示例如下：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.getcapacitor.myapp">
    <activity>
      <!-- 其他配置 -->
    </activity>

    <!-- 更多配置 -->

    <!-- 权限声明区域 -->

    <!-- 网络 API 权限 -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>
```

通常您使用的插件会要求设置特定权限，将其添加到此文件中即可。