---
title: Capacitor Android 插件开发指南  
description: Capacitor Android 插件开发指南  
contributors:
  - mlynch
  - jcesarmobile  
sidebar_label: Android 指南  
slug: /plugins/android  
---

# Capacitor Android 插件开发指南

开发 Capacitor Android 插件需要使用 Java 或 [Kotlin](https://developer.android.com/kotlin/overview) 来与 Android SDK 进行交互。

## 快速入门

首先，按照插件指南中的[快速入门](/plugins.mdx)部分生成一个插件项目。

接着，在 Android Studio 中打开 `echo/android/` 目录。然后找到插件对应的 `.java` 文件，文件路径取决于创建插件时填写的 Plugin ID 和 Plugin Class Name。

例如，如果插件 ID 是 `com.domain.echo`，类名是 `Echo`，那么对应的文件路径为 `android/src/main/java/com/domain/echo/EchoPlugin.java`。

## 使用 Kotlin

Capacitor 默认使用 Java，但你也可以选择使用 Kotlin。

生成插件后，在 Android Studio 中右键点击 Java 插件类，选择菜单中的"Convert Java file to Kotlin file"选项。Android Studio 会引导你配置项目的 Kotlin 支持。完成后，再次右键点击 Java 类并选择转换选项将其转为 Kotlin 类。

## 插件基础

一个 Capacitor Android 插件是一个继承 `com.getcapacitor.Plugin` 的简单 Java 类，并带有 `@CapacitorPlugin()` 注解。其中使用 `@PluginMethod()` 注解的方法可以从 JavaScript 调用。

生成插件后，你可以通过打开生成器中指定的插件类文件开始编辑。

### 简单示例

生成的示例中包含一个简单的 echo 插件，其中的 `echo` 方法会原样返回接收到的值。

这个示例展示了 Capacitor 插件的两个核心功能：从插件调用接收数据，以及将数据返回给调用方。

`EchoPlugin.java`

```java
package android.plugin.test;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Echo")
public class EchoPlugin extends Plugin {

    @PluginMethod()
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.resolve(ret);
    }
}
```

### 获取调用数据

每个插件方法都会收到一个 `com.getcapacitor.PluginCall` 实例，包含客户端调用插件方法的所有信息。

客户端可以发送任何可 JSON 序列化的数据，如数字、文本、布尔值、对象和数组。这些数据可通过 `getData` 字段或便捷方法如 `getString` 或 `getObject` 获取。

例如，获取传递给方法的数据：

```java
@PluginMethod()
public void storeContact(PluginCall call) {
  String name = call.getString("yourName", "default name");
  JSObject address = call.getObject("address", new JSObject());
  boolean isAwesome = call.getBoolean("isAwesome", false);

  if (!call.getData().has("id")) {
    call.reject("必须提供 id");
    return;
  }
  // ...

  call.resolve();
}
```

注意 `PluginCall` 实例上多种获取数据的方式，包括使用 `getData` 的 `has` 方法检查键是否存在。

### 返回数据

插件调用可以成功或失败。`resolve()` 表示成功（可选返回数据），`reject()` 表示失败并返回错误信息。

`resolve()` 方法接收 `JSObject`，支持 JSON 可序列化数据类型。以下是返回数据的示例：

```java
JSObject ret = new JSObject();
ret.put("added", true);
JSObject info = new JSObject();
info.put("id", "unique-id-1234");
ret.put("info", info);
call.resolve(ret);
```

调用失败时使用 `call.reject`，传入错误信息，可选包含错误代码和 `Exception` 实例：

```java
call.reject(exception.getLocalizedMessage(), null, exception);
```

#### 持久化插件调用

大多数情况下，插件方法执行完任务即可立即结束。但有时需要保持插件调用以便后续访问，例如定期返回数据（如实时地理位置）或执行异步任务。

详见[保存插件调用指南](/main/reference/core-apis/saving-calls.md)获取更多细节。

### 插件加载时运行代码

有时插件需要在首次加载时运行一些代码。

可以通过实现 `load()` 方法实现：

```java
@Override
public void load() {
}
```

## 权限管理

如果插件功能需要终端用户的权限，则需要实现权限模式。

在继续之前，请确保已设置权限别名和状态接口。若未设置，请参阅[Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

### 注解变更

> 仍在使用 `@NativePlugin`？请参阅[升级指南](/main/updating/plugins/3-0.md#use-the-new-capacitorplugin-annotation)切换至 `@CapacitorPlugin`。

```diff
 @CapacitorPlugin(
     name = "FooBar",
+    permissions = {
+        @Permission(
+            alias = "camera",
+            strings = { Manifest.permission.CAMERA }
+        ),
+        @Permission(
+            alias = "storage",
+            strings = {
+                Manifest.permission.READ_EXTERNAL_STORAGE,
+                Manifest.permission.WRITE_EXTERNAL_STORAGE
+            }
+        )
+    }
 )
 public class FooBarPlugin extends Plugin {
     ...
```

在 `@CapacitorPlugin` 注解中添加 `permissions` 属性，它是一个或多个 `@Permission` 注解的数组。每个 `@Permission` 注解包含零个或多个 Android 权限 `strings` 和一个简短的用途描述 `alias`。

按插件的不同功能将权限字符串分组到各个 `@Permission` 中。如果插件在其他平台需要权限但在 Android 上不需要，则定义相同的别名但 `strings` 为空数组，这将使该别名权限自动返回"已授予"状态。

```java
@Permission(
    alias = "notifications",
    strings = {}
)
```

### 实现权限请求

通过在 `@CapacitorPlugin` 注解中定义权限，`checkPermissions()` 和 `requestPermissions()` 方法应能正常工作。应用开发者可以根据需要手动请求权限。但最佳实践是在插件功能中封装自动权限请求。

#### 权限回调

创建一个带有单个 `PluginCall` 参数的 void 方法，并用 `@PermissionCallback` 注解，然后在权限请求调用中将方法名作为字符串传入。回调将在权限请求完成后执行。

```java
@PluginMethod()
public void takePhoto(PluginCall call) {
  if (getPermissionState("camera") != PermissionState.GRANTED) {
    requestPermissionForAlias("camera", call, "cameraPermsCallback");
  } else {
    loadCamera(call);
  }
}

@PermissionCallback
private void cameraPermsCallback(PluginCall call) {
  if (getPermissionState("camera") == PermissionState.GRANTED) {
    loadCamera(call);
  } else {
    call.reject("需要权限才能拍照");
  }
}
```

#### 发起权限请求

通过调用请求辅助方法之一来发起权限请求。

对于单个别名可使用 `requestPermissionForAlias`。多个别名可提供给 `requestPermissionForAliases`。使用 `requestAllPermissions` 请求插件注解中定义的所有权限。

```diff
 @PluginMethod()
 public void takePhoto(PluginCall call) {
   if (!hasRequiredPermissions()) {
+    requestAllPermissions(call, "cameraPermsCallback");
   } else {
     loadCamera(call);
   }
 }

 @PermissionCallback
 private void cameraPermsCallback(PluginCall call) {
   ...
 }
```

### Manifest 配置

将任何需要的[安装时权限](https://developer.android.com/guide/topics/permissions/overview#install-time)添加到插件的 `AndroidManifest.xml` 中。不要添加运行时权限（需要用户提示的权限），这些应由应用开发者添加到 Capacitor 应用的 manifest 中。确保你的插件文档中注明需要添加的任何运行时权限。

```diff
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.mycompany.plugins.network">
+     <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  </manifest>
```

## 错误处理

### 不可用状态

此错误表示功能当前无法使用，通常是因为需要较新的 Android API 版本。

```java
@PluginMethod
public void methodThatUsesNewAndroidAPI(PluginCall call) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        // TODO 实现
    } else {
        call.unavailable("Android API 25 或更早版本不可用");
    }
}
```

> 建议尽可能在旧版 API 上优雅降级体验，谨慎使用 `unavailable`。

### 未实现状态

此错误表示方法无法在 Android 上实现。

```java
@PluginMethod
public void methodThatRequiresIOS(PluginCall call) {
    call.unimplemented("Android 上未实现");
}
```

## 展示原生界面

要在 Capacitor 界面上展示原生界面，我们将使用 [Android 的 Intents](https://developer.android.com/guide/components/intents-filters)。Intents 允许你从自己的应用或其他应用启动 Activity。[参见常用 Intents](https://developer.android.com/guide/components/intents-common)

### 无结果的 Intent

大多数情况下你只是想展示原生 Activity，这时可以简单地触发[相关操作](https://developer.android.com/guide/components/intents-common)。

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
getActivity().startActivity(intent);
```

### 有结果的 Intent

有时启动 Intent 后需要获取结果，这时应使用 `startActivityForResult`。

创建一个处理 Activity 结果的回调方法，带有 `PluginCall` 和 `ActivityResult` 参数，并用 `@ActivityCallback` 注解。将此方法名传给 `startActivityForResult`，它会在启动的 Activity 结束时执行。

```java
@CapacitorPlugin()
class ImagePicker extends Plugin {

  @PluginMethod()
  public void pickImage(PluginCall call) {
    Intent intent = new Intent(Intent.ACTION_PICK);
    intent.setType("image/*");

    // 使用回调方法名启动 Activity 获取结果
    startActivityForResult(call, intent, "pickImageResult");
  }

  @ActivityCallback
  private void pickImageResult(PluginCall call, ActivityResult result) {
    if (call == null) {
      return;
    }

    // 处理返回数据
  }
}
```

## 插件事件

插件可以触发自己的事件，你可以通过监听插件对象来接收：

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent 已触发');
});
```

从 Java 插件类触发事件：

```java
JSObject ret = new JSObject();
ret.put("value", "某个值");
notifyListeners("myPluginEvent", ret);
```

移除监听器：

```typescript
import { MyPlugin } from 'my-plugin';

const myPluginEventListener = await MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent 已触发');
  },
);

myPluginEventListener.remove();
```

> 也可以触发 `window` 上的全局事件。查看 [`triggerJSEvent`](/main/reference/core-apis/android.md#triggerjsevent) 文档。

## 覆盖导航

Capacitor 插件可以覆盖 WebView 导航。为此插件可以重写 `public Boolean shouldOverrideLoad(Uri url)` 方法。
返回 `true` 会使 WebView 中止加载 URL。
返回 `false` 会使 WebView 继续加载 URL。
返回 `null` 将采用默认的 Capacitor 策略。