# Android 配置指南

## 配置 `AndroidManifest.xml`

Android 应用通过 `android/app/src/main/AndroidManifest.xml` 文件管理权限、设备功能和其他设置。

> `AndroidManifest.xml` 可能通过 `@style` 和 `@string` 引用 `android/app/src/main/res/values` 目录下的其他文件如 `styles.xml` 和 `strings.xml`。[详细了解 Android 资源系统](https://developer.android.com/guide/topics/resources/available-resources)

本文介绍应用需要进行的基本配置调整。如需全面了解，请阅读 [Android Manifest 官方文档](https://developer.android.com/guide/topics/manifest/manifest-intro.html)。

## 修改应用包名

要更改应用的包名（Android 中称为 **Application ID**），请编辑 `android/app/build.gradle` 文件顶部的 `applicationId`：

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

如果应用只有一个主活动，建议同步修改活动名称：

```xml
<string name="title_activity_main">我的应用</string>
```

## 深度链接（Android 应用链接）

> 深度链接配置指南请[参见此处](/main/guides/deep-links.md)。

要通过 Android 应用链接实现深度链接功能，请遵循官方指南 [添加 Android 应用链接](https://developer.android.com/studio/write/app-link-indexing)。Android Studio 提供了便捷的向导工具来配置应用链接。

配置完成后，[App API 中的 `getLaunchUrl()` 方法](/apis/app.md#getlaunchurl)将返回应用启动时的链接地址，而 [`'appUrlOpen'` 事件](/apis/app.md#addlistenerappurlopen-)会在每次接收到新深度链接时触发。

## 自定义 URL 协议

您的应用可以响应启动时的自定义 URL，实现深度链接和应用交互功能。

要修改 URL 协议，请找到并修改 `strings.xml` 中的以下行（建议设置为包名）：

```xml
<string name="custom_url_scheme">com.capacitorjs.myapp</string>
```

在此示例中，应用将响应 `com.capacitorjs.myapp://` 开头的 URL。

获取应用启动时的自定义 URL，请参考上文深度链接部分。

## 权限设置

在 Android 中，应用所需的权限定义在 `AndroidManifest.xml` 文件的 `<manifest>` 标签内，通常位于文件末尾。

例如，添加网络权限的配置如下：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.getcapacitor.myapp">
    <activity>
      <!-- 其他配置 -->
    </activity>

    <!-- 更多配置 -->

    <!-- 权限声明区域 -->

    <!-- 网络API权限 -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>
```

通常您使用的插件会告知需要添加哪些权限，请在此文件中进行相应配置。