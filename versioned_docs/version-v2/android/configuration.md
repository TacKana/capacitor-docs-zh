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

该文件引用了 `res/values/` 中其他文件的值，以便于单独更新，包括 `styles.xml` 和 `strings.xml`。

本文涵盖了您需要对应用进行的基本修改。阅读 [Android Manifest](https://developer.android.com/guide/topics/manifest/manifest-intro.html) 文档以了解更多内容。

## 修改 App ID

要修改应用的 bundle/app id，请编辑 `android/app/build.gradle` 中的 `applicationId` 行：

```groovy
applicationId "com.getcapacitor.myapp"
```

## 修改 App 名称

要更改应用的名称，请修改 `strings.xml` 中的 `app_name` 值：

```xml
<string name="app_name">MyApp</string>
```

对于只有一个 Activity（运行应用的主 Web Activity）的应用，您可能还希望将 Activity 名称设置为与应用名称一致：

```xml
<string name="title_activity_main">MyApp</string>
```

## 深度链接（即 Android App Links）

> 完整的深度链接指南，[请参见此处](/guides/deep-links.md)。

要通过 Android App Links 启用深度链接，请按照官方 Android 指南 [添加 Android App Links](https://developer.android.com/studio/write/app-link-indexing) 操作。Android Studio 提供了一个方便的向导来配置 App Links。

配置完成后，[App API 中的 getLaunchUrl](/apis/app.md#getlaunchurl) 将提供应用启动时携带的任何 URL，并且每当应用收到新的 App Link 深度链接时，[appUrlOpen 事件](/apis/app.md#addlistener-1) 将被触发。

## 修改自定义 URL

您的应用可以在启动时响应自定义 URL，从而处理深度链接和应用交互。

要修改 URL，请在 `strings.xml` 中搜索并修改此行。建议将其设置为 bundle/app id。

```xml
<string name="custom_url_scheme">com.getcapacitor.myapp</string>
```

在此示例中，应用将响应 `com.getcapacitor.myapp://` 方案的 URL。

要获取应用可能启动时携带的任何自定义 URL，请参见上面的深度链接部分。

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

通常，您选择的插件会要求您设置权限。请在此文件中添加相应权限。

## 默认权限

默认情况下，最新版本的 Capacitor 及其标准插件所需的全部初始权限可以在 android-template 的 [AndroidManifest.xml](https://github.com/ionic-team/capacitor/blob/2.x/android-template/app/src/main/AndroidManifest.xml) 中找到。