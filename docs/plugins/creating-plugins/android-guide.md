---
title: Capacitor Android 插件开发指南
description: Capacitor Android 插件开发指南
contributors:
  - mlynch
  - jcesarmobile
sidebar_label: Android 开发指南
slug: /plugins/android
---

# Capacitor Android 插件开发指南

开发 Capacitor Android 插件需要使用 Java 或 [Kotlin](https://developer.android.com/kotlin/overview) 与 Android SDK 进行交互。

## 快速开始

首先按照插件指南中的[快速开始](/plugins/tutorial/getting-started.md)部分生成一个插件模板。

接着在 Android Studio 中打开 `echo/android/` 目录，导航到插件的 `.java` 文件，具体路径取决于创建插件时设置的 Plugin ID 和 Plugin Class Name。

例如，对于 ID 为 `com.domain.echo`、类名为 `Echo` 的插件，`.java` 文件位于 `android/src/main/java/com/domain/echo/EchoPlugin.java`。

## 使用 Kotlin

Capacitor 默认使用 Java，但也可以选择使用 Kotlin。

生成插件后，在 Android Studio 中右键点击 Java 插件类，选择"Convert Java file to Kotlin file"选项。Android Studio 会引导你配置项目以支持 Kotlin。完成后，再次右键点击 Java 类并选择转换选项将其转为 Kotlin 类。

## 插件基础

Capacitor 的 Android 插件是一个继承 `com.getcapacitor.Plugin` 的简单 Java 类，并使用 `@CapacitorPlugin()` 注解标注。其中带有 `@PluginMethod()` 注解的方法可以从 JavaScript 调用。

生成插件后，你可以通过打开生成器中选择的插件类文件开始编辑。

### 简单示例

生成的示例中包含一个简单的 echo 插件，其中的 `echo` 方法会原样返回接收到的值。

这个示例演示了 Capacitor 插件的两个核心组件：从插件调用接收数据，以及将数据返回给调用者。

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

### 访问调用数据

每个插件方法接收一个 `com.getcapacitor.PluginCall` 实例，包含客户端调用插件方法的所有信息。

客户端可以发送任何可 JSON 序列化的数据，如数字、文本、布尔值、对象和数组。这些数据可以通过 `getData` 字段或便捷方法如 `getString` 或 `getObject` 访问。

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

注意 `PluginCall` 实例上访问数据的各种方式，包括如何使用 `getData` 的 `has` 方法检查键是否存在。

### 返回数据

插件调用可以成功或失败。插件调用借鉴了 JavaScript Promise 的方法名：调用 `resolve()` 表示成功（可选返回数据），使用 `reject()` 表示失败并附带错误信息。

`PluginCall` 的 `resolve()` 方法接受 `JSObject`，支持 JSON 可序列化数据类型。以下是返回数据给客户端的示例：

```java
JSObject ret = new JSObject();
ret.put("added", true);
JSObject info = new JSObject();
info.put("id", "unique-id-1234");
ret.put("info", info);
call.resolve(ret);
```

要使调用失败或拒绝，使用 `call.reject`，传递错误字符串，可选加上错误码和 `Exception` 实例：

```java
call.reject(exception.getLocalizedMessage(), null, exception);
```

#### 持久化插件调用

大多数情况下，插件方法被调用来执行任务并能立即完成。但有些情况下需要保持插件调用可用以便后续访问，比如定期返回实时地理位置数据或执行异步任务。

详见[保存插件调用指南](/main/reference/core-apis/saving-calls.md)了解更多信息。

### 插件加载时运行代码

有时插件需要在首次加载时运行一些代码。

为此，可以实现 `load()` 方法：

```java
@Override
public void load() {
}
```

## 权限管理

如果插件的 Android 功能需要用户授予权限，则需要实现权限模式。

在继续之前，请确保已设置权限别名和状态接口。如果未设置，请参阅[Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

### 注解变更

> 仍在使用 `@NativePlugin`？参见[升级指南](/main/updating/plugins/3-0.md#use-the-new-capacitorplugin-annotation)切换至 `@CapacitorPlugin`。

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

在 `@CapacitorPlugin` 注解中添加 `permissions` 属性，它是一个或多个 `@Permission` 注解的数组。每个 `@Permission` 注解包含零个或多个 Android 权限 `strings` 和一个简短的 `alias` 描述用途。

按插件的不同功能分组权限字符串。如果插件在其他平台需要权限但在 Android 上不需要，则定义相同别名但 `strings` 为空数组的权限。这将使该权限别名的请求结果自动返回为'granted'。

```java
@Permission(
    alias = "notifications",
    strings = {}
)
```

### 实现权限请求

通过在 `@CapacitorPlugin` 注解中定义权限，`checkPermissions()` 和 `requestPermissions()` 方法应该能完全正常工作。应用开发者可以根据需要手动请求权限。但最佳实践是用自动权限请求封装插件功能。

#### 权限回调

创建一个带有单个 `PluginCall` 参数的 void 方法并用 `@PermissionCallback` 注解，然后将方法名作为字符串传递给权限请求调用。回调将在权限请求完成后运行。

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

对于单个别名可以使用 `requestPermissionForAlias`。多个别名可以提供给 `requestPermissionForAliases`。使用 `requestAllPermissions` 请求插件注解中定义的所有权限。

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

### 清单文件

将任何需要的[安装时权限](https://developer.android.com/guide/topics/permissions/overview#install-time)放入插件的 `AndroidManifest.xml` 中。不要添加运行时权限（需要用户提示接受的权限），这些应由应用开发者添加到 Capacitor 应用的清单中。确保插件文档中注明需要添加到应用中的任何运行时权限。

```diff
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.mycompany.plugins.network">
+     <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  </manifest>
```

## 错误处理

### 不可用

可以抛出此错误表示功能当前无法使用，通常是因为需要更新的 Android API 版本。

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

> 建议尽可能优雅地降级旧 API 的使用体验。谨慎使用 `unavailable`。

### 未实现

使用此错误表示方法无法在 Android 上实现。

```java
@PluginMethod
public void methodThatRequiresIOS(PluginCall call) {
    call.unimplemented("Android 上未实现");
}
```

## 呈现原生界面

要在 Capacitor 界面上呈现原生界面，我们将使用 [Android 的 Intents](https://developer.android.com/guide/components/intents-filters)。Intent 允许你从应用或其他应用启动 Activity。[参见常用 Intent](https://developer.android.com/guide/components/intents-common)

### 无结果的 Intent

大多数情况下你只是想呈现原生 Activity，此时可以触发[相关操作](https://developer.android.com/guide/components/intents-common)。

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
getActivity().startActivity(intent);
```

### 带结果的 Intent

有时启动 Intent 后期望返回一些结果。这时需要使用 `startActivityForResult`。

创建一个带有 `PluginCall` 和 `ActivityResult` 参数的回调方法来处理启动 Activity 的结果，并用 `@ActivityCallback` 注解。将此方法名传递给 `startActivityForResult`，它将在启动的 Activity 完成时运行。

```java
@CapacitorPlugin()
class ImagePicker extends Plugin {

  @PluginMethod()
  public void pickImage(PluginCall call) {
    Intent intent = new Intent(Intent.ACTION_PICK);
    intent.setType("image/*");

    // 使用回调方法名启动 Activity 以获取结果
    startActivityForResult(call, intent, "pickImageResult");
  }

  @ActivityCallback
  private void pickImageResult(PluginCall call, ActivityResult result) {
    if (call == null) {
      return;
    }

    // 处理结果数据
  }
}
```

## 插件事件

插件可以发射自己的事件，你可以通过向插件对象附加监听器来监听：

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent 已触发');
});
```

要从 Java 插件类发射事件：

```java
JSObject ret = new JSObject();
ret.put("value", "某个值");
notifyListeners("myPluginEvent", ret);
```

要从插件对象移除监听器：

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

> 也可以在 `window` 上触发全局事件。参见 [`triggerJSEvent`](/main/reference/core-apis/android.md#triggerjsevent) 文档。

## 重写导航

Capacitor 插件可以重写 WebView 导航。为此插件可以重写 `public Boolean shouldOverrideLoad(Uri url)` 方法。
返回 `true` 会导致 WebView 中止加载 URL。
返回 `false` 会导致 WebView 继续加载 URL。
返回 `null` 将遵循默认的 Capacitor 策略。