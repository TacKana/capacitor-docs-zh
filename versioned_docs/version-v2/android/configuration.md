---
title: 配置 Android
description: 配置 Android
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/android/configuration
---

# 配置 Android

Android 应用通过修改 `AndroidManifest.xml` 来管理权限、设备功能和其他设置。

该文件引用了 `res/values/` 目录下其他文件中的值，以便于分别更新它们，包括 `styles.xml` 和 `strings.xml`。

本文涵盖了您需要对应用进行的基本修改。如需了解更多信息，请阅读 [Android 清单](https://developer.android.com/guide/topics/manifest/manifest-intro.html) 文档。

## 更改应用 ID

要修改应用的包名/应用 ID，请编辑 `android/app/build.gradle` 中的 `applicationId` 行：

```groovy
applicationId "com.getcapacitor.myapp"
```

## 更改应用名称

要更改应用的名称，请修改 `strings.xml` 中 `app_name` 的值：

```xml
<string name="app_name">MyApp</string>
```

对于计划只包含一个 Activity（运行应用的主 Web Activity）的应用，您可能还希望将 Activity 名称设置为与应用名称匹配：

```xml
<string name="title_activity_main">MyApp</string>
```

## 深度链接（即 Android 应用链接）

> 完整的深度链接指南，请 [参见这里](/guides/deep-links.md)。

要启用 Android 应用链接的深度链接功能，请遵循 Android 官方指南 [添加 Android 应用链接](https://developer.android.com/studio/write/app-link-indexing)。Android Studio 提供了一个便捷的向导来配置应用链接。

配置完成后，[App API 中的 getLaunchUrl](/apis/app.md#getlaunchurl) 将提供应用启动时使用的任何 URL，并且每当应用接收到新的应用链接深度链接时，[appUrlOpen 事件](/apis/app.md#addlistener-1) 都会触发。

## 更改自定义 URL

您的应用可以响应启动时的自定义 URL，从而实现深度链接和应用交互的处理。

要更改 URL，请在 `strings.xml` 中搜索并修改以下行。建议将其设置为包名/应用 ID。

```xml
<string name="custom_url_scheme">com.getcapacitor.myapp</string>
```

在此示例中，应用将响应使用 `com.getcapacitor.myapp://` 方案的 URL。

要获取应用可能启动时使用的任何自定义 URL，请参阅上文的深度链接部分。

## 设置权限

在 Android 中，应用所需的权限在 `<manifest>` 标签内的 `AndroidManifest.xml` 中定义，通常位于文件底部。

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

通常，您选择使用的插件会要求您设置权限。请在此文件中添加相应权限。

## 默认权限

默认情况下，包含标准插件的最新版本 Capacitor 所请求的初始完整权限可以在 android-template 的 [AndroidManifest.xml](https://github.com/ionic-team/capacitor/blob/2.x/android-template/app/src/main/AndroidManifest.xml) 中找到。