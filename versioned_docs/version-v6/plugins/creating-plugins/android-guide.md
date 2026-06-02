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

为 Android 构建 Capacitor 插件需要编写 Java 或 [Kotlin](https://developer.android.com/kotlin/overview) 来与 Android SDK 交互。

## 入门指南

首先，按照插件指南的[入门](/plugins/tutorial/getting-started.md)部分所述生成一个插件。

接下来，在 Android Studio 中打开 `echo/android/`。然后导航到插件的 `.java` 文件，该文件的位置取决于您在创建插件时使用的插件 ID 和插件类名。

例如，对于 ID 为 `com.domain.echo`、插件类名为 `Echo` 的插件，您可以在 `android/src/main/java/com/domain/echo/EchoPlugin.java` 找到 `.java` 文件。

## 使用 Kotlin

Capacitor 默认使用 Java，但如果您愿意，也可以使用 Kotlin。

生成插件后，在 Android Studio 中右键单击 Java 插件类，然后从菜单中选择"将 Java 文件转换为 Kotlin 文件"选项。Android Studio 将引导您完成项目配置以支持 Kotlin。完成后，再次右键单击 Java 类，重新选择转换选项以将其转换为 Kotlin 类。

## 插件基础

Capacitor 的 Android 插件是一个简单的 Java 类，它继承 `com.getcapacitor.Plugin` 并带有 `@CapacitorPlugin()` 注解。它包含一些带有 `@PluginMethod()` 注解的方法，这些方法可以从 JavaScript 调用。

生成插件后，您可以通过打开使用生成器时选择的插件类名对应的文件来开始编辑。

### 简单示例

在生成的示例中，有一个简单的 echo 插件，它包含一个 `echo` 函数，该函数简单地返回接收到的值。

这个示例展示了 Capacitor 插件的几个核心组件：从插件调用中接收数据，以及将数据返回给调用者。

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

每个插件方法都会收到一个 `com.getcapacitor.PluginCall` 实例，其中包含来自客户端的所有插件方法调用信息。

客户端可以发送任何可以 JSON 序列化的数据，例如数字、文本、布尔值、对象和数组。这些数据可以通过调用实例的 `getData` 字段访问，或者使用便利方法如 `getString` 或 `getObject` 访问。

例如，以下是获取传递给方法的数据的方式：

```java
@PluginMethod()
public void storeContact(PluginCall call) {
  String name = call.getString("yourName", "default name");
  JSObject address = call.getObject("address", new JSObject());
  boolean isAwesome = call.getBoolean("isAwesome", false);

  if (!call.getData().has("id")) {
    call.reject("Must provide an id");
    return;
  }
  // ...

  call.resolve();
}
```

注意在 `PluginCall` 实例上访问数据的各种方式，包括如何使用 `getData` 的 `has` 方法检查某个键是否存在。

### 返回数据

插件调用可以成功或失败。插件调用借用了 JavaScript Promise 的方法名：调用 `resolve()` 表示成功（可选地返回数据），使用 `reject()` 表示失败并附带错误消息。

`PluginCall` 的 `resolve()` 方法接受一个 `JSObject`，并支持 JSON 可序列化的数据类型。以下是将数据返回给客户端的示例：

```java
JSObject ret = new JSObject();
ret.put("added", true);
JSObject info = new JSObject();
info.put("id", "unique-id-1234");
ret.put("info", info);
call.resolve(ret);
```

要使调用失败或拒绝调用，请使用 `call.reject`，传入一个错误字符串，并可选地传入错误代码和 `Exception` 实例：

```java
call.reject(exception.getLocalizedMessage(), null, exception);
```

#### 持久化插件调用

大多数情况下，插件方法被调用来执行任务，可以立即完成。但有些情况下，您需要保留插件调用以便稍后访问。您可能希望这样做以定期返回数据（如流式传输实时地理定位数据），或执行异步任务。

有关如何持久化插件调用的更多详细信息，请参阅[此保存插件调用的指南](/main/reference/core-apis/saving-calls.md)。

### 在插件加载时运行代码

有时，插件可能需要在首次加载时运行一些代码。

为此，请提供 `load()` 方法的实现：

```java
@Override
public void load() {
}
```

## 权限

如果您的插件在 Android 上需要最终用户的权限，那么您需要实现权限模式。

在遵循本节之前，请确保您已设置了权限别名和状态接口。如果尚未设置，请参阅 [Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#权限)。

### 注解更改

> 仍在使用 `@NativePlugin`？请参阅[升级指南](/main/updating/plugins/3-0.md#使用新的-capacitorplugin-注解)切换到 `@CapacitorPlugin`。

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

在 `@CapacitorPlugin` 注解中添加 `permissions` 属性，它是一个包含一个或多个 `@Permission` 注解的数组。每个 `@Permission` 注解包含零个或多个 Android 权限 `strings` 和一个描述用途的简短 `alias`。

根据插件不同的功能模块，将权限字符串分组到每个 `@Permission` 中。如果您的插件在其他平台需要权限但在 Android 上不需要，那么请使用相同的别名定义一个权限，但将 `strings` 设置为空数组。这将导致该权限别名的权限请求结果自动返回"已授权"。

```java
@Permission(
    alias = "notifications",
    strings = {}
)
```

### 实现权限请求

通过在 `@CapacitorPlugin` 注解中定义权限，`checkPermissions()` 和 `requestPermissions()` 方法应该可以完全正常工作。应用开发者可以根据需要手动请求权限。但是，最佳实践是在插件功能中自动包装权限请求。

#### 权限回调

创建一个带有一个 `PluginCall` 参数的 void 方法，并使用 `@PermissionCallback` 进行注解，然后在权限请求调用中将该方法名称作为字符串传递。回调将在权限请求完成后运行。

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
    call.reject("Permission is required to take a picture");
  }
}
```

#### 发起权限请求

通过调用其中一个请求辅助方法来发起权限请求。

单个别名可以使用 `requestPermissionForAlias`。多个别名可以提供给 `requestPermissionForAliases`。使用 `requestAllPermissions` 请求插件注解中定义的所有权限。

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

### Manifest 清单

将任何必需的[安装时](https://developer.android.com/guide/topics/permissions/overview#install-time)权限放在插件的 `AndroidManifest.xml` 中。不要添加运行时权限（提示用户接受的权限）。这些应由应用开发者添加到 Capacitor 应用的 manifest 中。请确保您的插件记录了应添加到应用中的任何必需运行时权限。

```diff
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.mycompany.plugins.network">
+     <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  </manifest>
```

## 错误处理

### 不可用

此错误可被抛出以指示该功能当前无法使用，通常是因为它需要更新的 Android API 版本。

```java
@PluginMethod
public void methodThatUsesNewAndroidAPI(PluginCall call) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        // TODO 实现
    } else {
        call.unavailable("Not available on Android API 25 or earlier.");
    }
}
```

> 建议尽可能优雅地降级旧 API 的体验。请谨慎使用 `unavailable`。

### 未实现

使用此错误指示某个方法无法在 Android 上实现。

```java
@PluginMethod
public void methodThatRequiresIOS(PluginCall call) {
    call.unimplemented("Not implemented on Android.");
}
```

## 呈现原生界面

要显示覆盖在 Capacitor 界面之上的原生界面，我们将使用 [Android 的 Intent](https://developer.android.com/guide/components/intents-filters)。Intent 允许您从您的应用或其他应用启动 Activity。请参阅[常见 Intent](https://developer.android.com/guide/components/intents-common)。

### 无需返回结果的 Intent

大多数情况下，您只需呈现原生 Activity，此时您可以直接触发[相关操作](https://developer.android.com/guide/components/intents-common)。

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
getActivity().startActivity(intent);
```

### 需要返回结果的 Intent

有时当您启动一个 Intent 时，您希望获得一些结果返回。在这种情况下，您需要使用 `startActivityForResult`。

创建一个回调方法来处理启动 Activity 的结果，该方法带有 `PluginCall` 和 `ActivityResult` 参数，并使用 `@ActivityCallback` 进行注解。将此方法的名称传递给 `startActivityForResult`，它将在启动的 Activity 完成时运行。

```java
@CapacitorPlugin()
class ImagePicker extends Plugin {

  @PluginMethod()
  public void pickImage(PluginCall call) {
    Intent intent = new Intent(Intent.ACTION_PICK);
    intent.setType("image/*");

    // 使用回调方法的名称启动 Activity 以获取结果
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

插件可以发出自己的事件，您可以通过向插件对象添加监听器来监听，如下所示：

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent was fired');
});
```

要从 Java 插件类发出事件：

```java
JSObject ret = new JSObject();
ret.put("value", "some value");
notifyListeners("myPluginEvent", ret);
```

要从插件对象移除监听器：

```typescript
import { MyPlugin } from 'my-plugin';

const myPluginEventListener = await MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent was fired');
  },
);

myPluginEventListener.remove();
```

> 也可以在 `window` 上触发全局事件。请参阅 [`triggerJSEvent`](/main/reference/core-apis/android.md#triggerjsevent) 的文档。

## 覆盖导航

Capacitor 插件可以覆盖 WebView 导航。为此，插件可以重写 `public Boolean shouldOverrideLoad(Uri url)` 方法。
返回 `true` 会使 WebView 中止加载 URL。
返回 `false` 会使 WebView 继续加载 URL。
返回 `null` 将遵循默认的 Capacitor 策略。
