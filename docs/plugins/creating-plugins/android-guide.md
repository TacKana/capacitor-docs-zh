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

为 Android 构建 Capacitor 插件涉及编写 Java 或 [Kotlin](https://developer.android.com/kotlin/overview) 来与 Android SDK 进行交互。

## 快速开始

首先，请按照插件指南中的[快速开始](/plugins/tutorial/getting-started.md)部分生成一个插件。

接下来，在 Android Studio 中打开 `echo/android/` 目录。然后找到插件的 `.java` 文件，该文件的位置取决于创建插件时使用的插件 ID 和插件类名。

例如，对于 ID 为 `com.domain.echo` 且插件类名为 `Echo` 的插件，你可以在 `android/src/main/java/com/domain/echo/EchoPlugin.java` 找到对应的 `.java` 文件。

## 使用 Kotlin

Capacitor 默认使用 Java，但如果你更偏好 Kotlin，也可以使用它。

生成插件后，在 Android Studio 中右键单击 Java 插件类，从菜单中选择“Convert Java file to Kotlin file”选项。Android Studio 将引导你配置项目以支持 Kotlin。完成后，再次右键单击 Java 类并重新选择转换选项，将其转换为 Kotlin 类。

## 插件基础

一个 Android 上的 Capacitor 插件是一个简单的 Java 类，它继承自 `com.getcapacitor.Plugin` 并带有 `@CapacitorPlugin()` 注解。
它包含一些带有 `@PluginMethod()` 注解的方法，这些方法可以从 JavaScript 调用。

生成插件后，你可以通过打开生成器中你选择的插件类名对应的文件开始编辑它。

### 简单示例

在生成的示例中，有一个简单的 echo 插件，其 `echo` 函数仅返回接收到的值。

这个示例演示了 Capacitor 插件的几个核心组件：从插件调用接收数据，以及将数据返回给调用者。

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

客户端可以发送任何可以 JSON 序列化的数据，例如数字、文本、布尔值、对象和数组。这些数据可以通过调用实例的 `getData` 字段访问，或者使用便捷方法如 `getString` 或 `getObject`。

例如，以下是如何获取传递给方法的数据：

```java
@PluginMethod()
public void storeContact(PluginCall call) {
  String name = call.getString("yourName", "默认名称");
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

插件调用可以成功或失败。插件调用借用了 JavaScript Promise 的方法名：调用 `resolve()` 表示成功（可选返回数据），使用 `reject()` 表示失败并附带错误信息。

`PluginCall` 的 `resolve()` 方法接收一个 `JSObject`，支持 JSON 可序列化的数据类型。以下是将数据返回给客户端的示例：

```java
JSObject ret = new JSObject();
ret.put("added", true);
JSObject info = new JSObject();
info.put("id", "unique-id-1234");
ret.put("info", info);
call.resolve(ret);
```

要使调用失败或拒绝，使用 `call.reject`，传入错误字符串，可选地包含错误代码和 `Exception` 实例。

```java
call.reject(exception.getLocalizedMessage(), null, exception);
```

#### 持久化插件调用

在大多数情况下，插件方法被调用以执行任务，并且可以立即完成。但有些情况下，你需要保持插件调用可用，以便稍后访问。你可能希望这样做是为了定期返回数据，例如流式传输实时地理位置数据，或执行异步任务。

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

> 仍在用 `@NativePlugin`？请参阅[升级指南](/main/updating/plugins/3-0.md#use-the-new-capacitorplugin-annotation)切换到 `@CapacitorPlugin`。

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

在 `@CapacitorPlugin` 注解中添加 `permissions` 属性，这是一个包含一个或多个 `@Permission` 注解的数组。每个 `@Permission` 注解包含零个或多个 Android 权限 `strings` 和一个简短的 `alias` 描述其用途。

根据插件功能的不同部分，将权限字符串分组到每个 `@Permission` 中。如果你的插件在其他平台需要权限但在 Android 上不需要，那么用相同的别名定义权限，但 `strings` 为空数组。这将导致该权限别名的权限请求结果自动返回为“已授予”。

```java
@Permission(
    alias = "notifications",
    strings = {}
)
```

### 实现权限请求

通过在 `@CapacitorPlugin` 注解中定义权限，`checkPermissions()` 和 `requestPermissions()` 方法应该完全可用。应用开发者将能够根据需要手动请求权限。然而，最佳实践是在插件功能中同时包含自动权限请求。#### 权限回调

创建一个带有单个 `PluginCall` 参数的 void 方法，并用 `@PermissionCallback` 进行注解，然后在权限请求调用中将方法名称作为字符串传入。该回调将在权限请求完成后执行。

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
    call.reject("拍照需要权限");
  }
}
```

#### 发起权限请求

通过调用权限请求辅助方法之一来发起权限请求。

对于单个别名，可以使用 `requestPermissionForAlias` 方法。多个别名可以提供给 `requestPermissionForAliases` 方法。使用 `requestAllPermissions` 请求插件注解中定义的所有权限。

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

将任何必需的[安装时权限](https://developer.android.com/guide/topics/permissions/overview#install-time)放入插件的 `AndroidManifest.xml` 中。不要添加运行时权限（需要用户确认的权限）。这些权限应由应用程序开发人员添加到 Capacitor 应用程序的清单中。请确保你的插件文档中说明了应用程序需要添加的任何运行时权限。

```diff
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.mycompany.plugins.network">
+     <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  </manifest>
```

## 错误处理

### 不可用

可以抛出此错误来指示当前无法使用该功能，通常是因为需要更新的 Android API 版本。

```java
@PluginMethod
public void methodThatUsesNewAndroidAPI(PluginCall call) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        // TODO 实现
    } else {
        call.unavailable("Android API 25 或更早版本不可用。");
    }
}
```

> 建议尽可能在旧 API 上优雅降级体验。请谨慎使用 `unavailable`。

### 未实现

使用此错误来指示某个方法无法在 Android 上实现。

```java
@PluginMethod
public void methodThatRequiresIOS(PluginCall call) {
    call.unimplemented("Android 上未实现。");
}
```

## 展示原生屏幕

要在 Capacitor 屏幕上方展示原生屏幕，我们将使用 [Android 的 Intent](https://developer.android.com/guide/components/intents-filters)。Intent 允许你从你的应用程序或另一个应用程序启动一个活动。[参见常见 Intent](https://developer.android.com/guide/components/intents-common)

### 无返回结果的 Intent

大多数情况下，你只是想展示原生活动，
这时你可以直接触发[相关操作](https://developer.android.com/guide/components/intents-common)。

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
getActivity().startActivity(intent);
```

### 有返回结果的 Intent

有时，当你启动一个 Intent 时，你期望得到一些结果。在这种情况下，你需要使用 `startActivityForResult`。

创建一个回调方法来处理已启动活动的结果，该方法带有 `PluginCall` 和 `ActivityResult` 参数，并用 `@ActivityCallback` 进行注解。将此方法的名称传递给 `startActivityForResult`，它将在启动的活动完成时执行。

```java
@CapacitorPlugin()
class ImagePicker extends Plugin {

  @PluginMethod()
  public void pickImage(PluginCall call) {
    Intent intent = new Intent(Intent.ACTION_PICK);
    intent.setType("image/*");

    // 使用回调方法的名称启动活动以获取结果
    startActivityForResult(call, intent, "pickImageResult");
  }

  @ActivityCallback
  private void pickImageResult(PluginCall call, ActivityResult result) {
    if (call == null) {
      return;
    }

    // 对结果数据进行处理
  }
}
```

## 插件事件

插件可以发出自己的事件，你可以通过向插件对象附加监听器来监听这些事件，如下所示：

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent 被触发');
});
```

要从 Java 插件类发出事件：

```java
JSObject ret = new JSObject();
ret.put("value", "某个值");
notifyListeners("myPluginEvent", ret);
```

要从插件对象中移除监听器：

```typescript
import { MyPlugin } from 'my-plugin';

const myPluginEventListener = await MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent 被触发');
  },
);

myPluginEventListener.remove();
```

> 也可以在 `window` 上触发全局事件。请参阅 [`triggerJSEvent`](/main/reference/core-apis/android.md#triggerjsevent) 的文档。

## 覆盖导航

Capacitor 插件可以覆盖 WebView 导航。为此，插件可以重写 `public Boolean shouldOverrideLoad(Uri url)` 方法。
返回 `true` 会导致 WebView 中止加载 URL。
返回 `false` 会导致 WebView 继续加载 URL。
返回 `null` 将遵循默认的 Capacitor 策略。