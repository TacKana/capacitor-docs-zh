---
title: Capacitor Android 插件指南
description: Capacitor Android 插件指南
contributors:
  - mlynch
  - jcesarmobile
sidebar_label: Android 指南
slug: /plugins/android
---

# Capacitor Android 插件指南

为 Android 构建 Capacitor 插件需要编写 Java 或 [Kotlin](https://developer.android.com/kotlin/overview) 代码来与 Android SDK 进行交互。

## 开始之前

首先，请按照插件指南的[入门部分](/plugins.mdx)生成一个插件。

接下来，在 Android Studio 中打开 `echo/android/` 目录。然后你需要找到插件的 `.java` 文件，具体路径取决于创建插件时使用的插件 ID 和插件类名。

例如，对于 ID 为 `com.domain.echo`、插件类名为 `Echo` 的插件，你可以在 `android/src/main/java/com/domain/echo/EchoPlugin.java` 找到对应的 `.java` 文件。

## 使用 Kotlin

Capacitor 默认使用 Java，但如果你愿意，也可以使用 Kotlin。

生成插件后，在 Android Studio 中右键点击 Java 插件类，从菜单中选择“将 Java 文件转换为 Kotlin 文件”选项。Android Studio 将引导你配置项目以支持 Kotlin。完成后，再次右键点击 Java 类并重新选择转换选项，将其转换为 Kotlin 类。

## 插件基础

Android 上的 Capacitor 插件是一个简单的 Java 类，它继承自 `com.getcapacitor.Plugin` 并带有 `@CapacitorPlugin()` 注解。
它包含一些带有 `@PluginMethod()` 注解的方法，这些方法可以从 JavaScript 调用。

生成插件后，你可以通过打开生成器中设置的插件类名对应的文件来开始编辑。

### 简单示例

在生成的示例中，有一个简单的 echo 插件，其中包含一个 `echo` 函数，它只是返回接收到的值。

这个示例展示了 Capacitor 插件的几个核心组件：从插件调用中接收数据，并将数据返回给调用者。

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

每个插件方法都会接收到一个 `com.getcapacitor.PluginCall` 实例，其中包含了客户端调用插件方法的所有信息。

客户端可以发送任何可以 JSON 序列化的数据，例如数字、文本、布尔值、对象和数组。这些数据可以通过调用实例的 `getData` 字段访问，或使用便捷方法如 `getString` 或 `getObject`。

例如，以下是如何获取传递给方法的数据：

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

注意访问 `PluginCall` 实例数据的各种方式，包括如何使用 `getData` 的 `has` 方法检查键是否存在。

### 返回数据

插件调用可以成功或失败。插件调用借鉴了 JavaScript Promise 的方法命名：调用 `resolve()` 表示成功（可选返回数据），使用 `reject()` 表示失败并附带错误信息。

`PluginCall` 的 `resolve()` 方法接受 `JSObject` 并支持 JSON 可序列化的数据类型。以下是将数据返回给客户端的示例：

```java
JSObject ret = new JSObject();
ret.put("added", true);
JSObject info = new JSObject();
info.put("id", "unique-id-1234");
ret.put("info", info);
call.resolve(ret);
```

要失败或拒绝调用，请使用 `call.reject`，传入错误字符串，可选地还可以包含错误代码和 `Exception` 实例：

```java
call.reject(exception.getLocalizedMessage(), null, exception);
```

#### 持久化插件调用

在大多数情况下，插件方法被调用以执行任务后可以立即完成。但在某些情况下，你需要保持插件调用可用，以便稍后访问。你可能需要这样做来定期返回数据（例如流式传输实时地理位置数据），或执行异步任务。

有关如何持久化插件调用的更多详细信息，请参阅[保存插件调用指南](/main/reference/core-apis/saving-calls.md)。

### 在插件加载时运行代码

有时，插件可能需要在首次加载时运行一些代码。

为此，请为 `load()` 方法提供实现：

```java
@Override
public void load() {
}
```

## 权限

如果你的插件在 Android 上的功能需要最终用户的权限，那么你需要实现权限模式。

在遵循本节之前，请确保你已经设置了权限别名和状态接口。如果还没有，请参阅 Web 指南中的[权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

### 注解变更

> 仍在使用 `@NativePlugin`？请参阅[升级指南](/main/updating/plugins/3-0.md#use-the-new-capacitorplugin-annotation)以切换到 `@CapacitorPlugin`。

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

在 `@CapacitorPlugin` 注解中添加 `permissions` 属性，它是一个包含一个或多个 `@Permission` 注解的数组。每个 `@Permission` 注解包含零个或多个 Android 权限 `strings` 和一个简短的 `alias` 描述用途。

根据插件的不同功能将权限字符串分组到每个 `@Permission` 中。如果你的插件在其他平台上需要权限但在 Android 上不需要，那么使用相同的别名定义权限，但将 `strings` 设置为空数组。这将导致该权限别名的权限请求结果自动返回为'已授予'。

```java
@Permission(
    alias = "notifications",
    strings = {}
)
```

### 实现权限请求

通过在 `@CapacitorPlugin` 注解中定义权限，`checkPermissions()` 和 `requestPermissions()` 方法应该完全功能正常。应用开发者将能够根据需要手动请求权限。然而，最佳实践是将插件功能与自动权限请求一起包装。#### 权限回调

创建一个包含单个 `PluginCall` 参数的 void 方法，并用 `@PermissionCallback` 注解进行标记，然后将该方法名称作为字符串传入权限请求调用中。该回调将在权限请求完成后执行。

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
    call.reject("拍照需要获取相机权限");
  }
}
```

#### 发起权限请求

通过调用请求辅助方法之一来发起权限请求。

对于单个别名可使用 `requestPermissionForAlias` 方法。多个别名可传递给 `requestPermissionForAliases` 方法。使用 `requestAllPermissions` 可请求插件注解中定义的所有权限。

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

将任何必需的[安装时权限](https://developer.android.com/guide/topics/permissions/overview#install-time)添加到插件的 `AndroidManifest.xml` 中。不要添加运行时权限（需要用户确认的权限），这些权限应由应用开发者添加到 Capacitor 应用的清单文件中。请确保您的插件文档中注明需要添加到应用中的任何运行时权限。

```diff
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.mycompany.plugins.network">
+     <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  </manifest>
```

## 错误处理

### 不可用

当功能因需要更高版本的 Android API 而暂时无法使用时，可以抛出此错误。

```java
@PluginMethod
public void methodThatUsesNewAndroidAPI(PluginCall call) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        // TODO 具体实现
    } else {
        call.unavailable("在 Android API 25 或更早版本上不可用。");
    }
}
```

> 建议尽可能在旧版 API 上优雅降级体验，谨慎使用 `unavailable` 方法。

### 未实现

当某个方法无法在 Android 平台实现时，可使用此错误。

```java
@PluginMethod
public void methodThatRequiresIOS(PluginCall call) {
    call.unimplemented("Android 平台未实现此功能。");
}
```

## 呈现原生界面

要在 Capacitor 界面上层展示原生界面，我们将使用 [Android 的 Intent](https://developer.android.com/guide/components/intents-filters)。Intent 允许您从您的应用或其他应用启动 Activity。[查看常用 Intent](https://developer.android.com/guide/components/intents-common)

### 无返回结果的 Intent

大多数情况下您可能只需要启动原生的 Activity，这时可以直接触发[相关操作](https://developer.android.com/guide/components/intents-common)。

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
getActivity().startActivity(intent);
```

### 有返回结果的 Intent

有时启动 Intent 后需要获取返回结果，这时应使用 `startActivityForResult`。

创建一个包含 `PluginCall` 和 `ActivityResult` 参数的回调方法来处理启动 Activity 的返回结果，并用 `@ActivityCallback` 注解进行标记。将该方法名称传递给 `startActivityForResult`，当启动的 Activity 结束时将执行此回调。

```java
@CapacitorPlugin()
class ImagePicker extends Plugin {

  @PluginMethod()
  public void pickImage(PluginCall call) {
    Intent intent = new Intent(Intent.ACTION_PICK);
    intent.setType("image/*");

    // 使用回调方法名称启动带结果的 Activity
    startActivityForResult(call, intent, "pickImageResult");
  }

  @ActivityCallback
  private void pickImageResult(PluginCall call, ActivityResult result) {
    if (call == null) {
      return;
    }

    // 对返回结果数据进行处理
  }
}
```

## 插件事件

插件可以发出自定义事件，您可以通过为插件对象添加监听器来接收这些事件：

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent 事件已触发');
});
```

从 Java 插件类触发事件：

```java
JSObject ret = new JSObject();
ret.put("value", "some value");
notifyListeners("myPluginEvent", ret);
```

从插件对象移除监听器：

```typescript
import { MyPlugin } from 'my-plugin';

const myPluginEventListener = await MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent 事件已触发');
  },
);

myPluginEventListener.remove();
```

> 也可以在 `window` 对象上触发全局事件，请参阅 [`triggerJSEvent`](/main/reference/core-apis/android.md#triggerjsevent) 的文档。

## 重写导航

Capacitor 插件可以重写 WebView 导航行为。为此，插件可以重写 `public Boolean shouldOverrideLoad(Uri url)` 方法：
- 返回 `true` 将导致 WebView 中止加载该 URL
- 返回 `false` 将允许 WebView 继续加载该 URL  
- 返回 `null` 将遵循 Capacitor 的默认策略