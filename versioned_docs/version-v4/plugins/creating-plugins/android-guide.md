# Capacitor Android 插件开发指南

为 Android 平台开发 Capacitor 插件需要编写 Java 或 [Kotlin](https://developer.android.com/kotlin/overview) 代码来与 Android SDK 进行交互。

## 快速开始

首先按照插件指南中的[快速开始](/plugins.mdx)部分生成一个插件模板。

接着在 Android Studio 中打开 `echo/android/` 目录。然后导航到插件对应的 `.java` 文件，其路径取决于创建插件时使用的 Plugin ID 和 Plugin Class Name。

例如，对于 ID 为 `com.domain.echo` 且类名为 `Echo` 的插件，`.java` 文件路径为 `android/src/main/java/com/domain/echo/EchoPlugin.java`。

## 使用 Kotlin

Capacitor 默认使用 Java，但你也可以选择使用 Kotlin 开发。

生成插件后，在 Android Studio 中右键点击 Java 插件类，选择菜单中的 "Convert Java file to Kotlin file" 选项。Android Studio 会引导你完成 Kotlin 支持的配置。完成后，再次右键点击 Java 类并重新选择转换选项将其转为 Kotlin 类。

## 插件基础

Android 平台的 Capacitor 插件是一个继承 `com.getcapacitor.Plugin` 并带有 `@CapacitorPlugin()` 注解的简单 Java 类。其中带有 `@PluginMethod()` 注解的方法可以从 JavaScript 调用。

生成插件后，你可以通过打开生成器中选择的插件类文件开始编辑。

### 简单示例

生成的示例中包含一个简单的 echo 插件，其中的 `echo` 方法会原样返回接收到的值。

这个示例展示了 Capacitor 插件的两个核心功能：从插件调用接收数据，以及将数据返回给调用者。

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

每个插件方法都会接收到一个 `com.getcapacitor.PluginCall` 实例，包含客户端调用插件方法的所有信息。

客户端可以发送任何可 JSON 序列化的数据，如数字、文本、布尔值、对象和数组。这些数据可以通过 `getData` 字段或 `getString`、`getObject` 等便捷方法访问。

例如，以下是获取传递给方法数据的方式：

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

注意 `PluginCall` 实例上各种访问数据的方式，包括如何使用 `getData` 的 `has` 方法检查键是否存在。

### 返回数据

插件调用可以成功或失败。插件调用借鉴了 JavaScript Promise 的方法命名：调用 `resolve()` 表示成功（可选返回数据），使用 `reject()` 表示失败并附带错误信息。

`PluginCall` 的 `resolve()` 方法接受 `JSObject` 并支持 JSON 可序列化的数据类型。以下是返回数据给客户端的示例：

```java
JSObject ret = new JSObject();
ret.put("added", true);
JSObject info = new JSObject();
info.put("id", "unique-id-1234");
ret.put("info", info);
call.resolve(ret);
```

要表示失败或拒绝调用，使用 `call.reject`，传入错误字符串，可选还可以传入错误代码和 `Exception` 实例

```java
call.reject(exception.getLocalizedMessage(), null, exception);
```

#### 持久化插件调用

多数情况下，插件方法会被调用来执行任务并立即完成。但有些场景下你需要保持插件调用可用以便后续访问。比如需要定期返回数据（如实时地理位置数据流）或执行异步任务时。

详见[保存插件调用指南](/main/reference/core-apis/saving-calls.md)获取更多细节。

### 插件加载时执行代码

有时插件需要在首次加载时运行某些代码。

为此，可以重写 `load()` 方法：

```java
@Override
public void load() {
}
```

## 权限管理

如果你的插件在 Android 上的功能需要终端用户的权限，那么你需要实现权限模式。

在继续本节前，请确保你已经设置了权限别名和状态接口。如果还没有，请参考[Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

### 注解变更

> 还在使用 `@NativePlugin`？参阅[升级指南](/main/updating/plugins/3-0.md#use-the-new-capacitorplugin-annotation)切换到 `@CapacitorPlugin`。

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

在 `@CapacitorPlugin` 注解中添加 `permissions` 属性，它是一个或多个 `@Permission` 注解的数组。每个 `@Permission` 注解包含零个或多个 Android 权限 `strings` 和一个描述用途的短 `alias`。

按插件的不同功能模块将权限字符串分组到各个 `@Permission` 中。如果你的插件在其他平台需要权限但在 Android 上不需要，可以使用相同的别名但为 `strings` 提供空数组。这会导致该权限别名的请求结果自动返回为 'granted'。

```java
@Permission(
    alias = "notifications",
    strings = {}
)
```

### 实现权限请求

通过在 `@CapacitorPlugin` 注解中定义权限，`checkPermissions()` 和 `requestPermissions()` 方法应该能正常工作。应用开发者可以根据需要手动请求权限。然而，最佳实践是同时用自动权限请求封装插件功能。

#### 权限回调

创建一个带有单个 `PluginCall` 参数的 void 方法并用 `@PermissionCallback` 注解它，然后在权限请求调用中将方法名作为字符串传递。回调会在权限请求完成后运行。

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

对于单个别名可以使用 `requestPermissionForAlias`。多个别名可以提供给 `requestPermissionForAliases`。使用 `requestAllPermissions` 来请求插件注解中定义的所有权限。

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

将任何需要的[安装时权限](https://developer.android.com/guide/topics/permissions/overview#install-time)放在插件的 `AndroidManifest.xml` 中。不要添加运行时权限（需要用户确认的权限）。这些应该由应用开发者添加到 Capacitor 应用的清单中。确保你的插件文档中说明了应用中需要添加的任何运行时权限。

```diff
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.mycompany.plugins.network">
+     <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  </manifest>
```

## 错误处理

### 不可用

这个错误可以用来表示功能当前无法使用，通常是因为需要更高版本的 Android API。

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

> 建议尽可能优雅降级对旧 API 的支持。谨慎使用 `unavailable`。

### 未实现

使用这个错误来表示方法无法在 Android 上实现。

```java
@PluginMethod
public void methodThatRequiresIOS(PluginCall call) {
    call.unimplemented("Android 上未实现");
}
```

## 显示原生界面

要在 Capacitor 界面上显示原生界面，我们将使用 [Android 的 Intent](https://developer.android.com/guide/components/intents-filters)。Intent 允许你从你的应用或其他应用启动一个 activity。[参见常见 Intent](https://developer.android.com/guide/components/intents-common)

### 无结果的 Intent

大多数时候你只是想展示原生 Activity，这种情况下你可以直接触发[相关 action](https://developer.android.com/guide/components/intents-common)。

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
getActivity().startActivity(intent);
```

### 有结果的 Intent

有时当你启动一个 Intent 时，期望得到一些结果。这时你需要使用 `startActivityForResult`。

创建一个带有 `PluginCall` 和 `ActivityResult` 参数的回调方法来处理启动 activity 的结果，并用 `@ActivityCallback` 注解它。将此方法名传递给 `startActivityForResult`，它会在启动的 activity 完成时运行。

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

插件可以发出自己的事件，你可以通过向插件对象添加监听器来监听：

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent 被触发');
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
    console.log('myPluginEvent 被触发');
  },
);

myPluginEventListener.remove();
```

> 也可以在 `window` 上触发全局事件。参见 [`triggerJSEvent`](/main/reference/core-apis/android.md#triggerjsevent) 文档。

## 覆盖导航

Capacitor 插件可以覆盖 WebView 导航。为此插件可以重写 `public Boolean shouldOverrideLoad(Uri url)` 方法。
返回 `true` 会导致 WebView 中止加载 URL。
返回 `false` 会导致 WebView 继续加载 URL。
返回 `null` 会使用默认的 Capacitor 策略。