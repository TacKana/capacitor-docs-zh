---
title: Capacitor Android 插件指南
description: Capacitor Android 插件指南
translated: true
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/plugins/android
---

# Capacitor Android 插件指南

构建适用于 Android 的 Capacitor 插件需要编写 Java 或 [Kotlin](https://developer.android.com/kotlin/overview) 代码来与 Android SDK 进行交互。

## 入门

首先，按照插件指南的[入门](/plugins.md)部分所述生成一个插件。

然后，在 Android Studio 中打开 `your-plugin/android/` 目录。接下来，导航到插件的 `.java` 文件，该文件的位置根据创建插件时使用的 Plugin ID 和 Plugin Class Name 而不同。

例如，对于 ID 为 `com.domain.myplugin`、Plugin Class Name 为 `MyPlugin` 的插件，你可以在 `android/src/main/java/com/domain/myplugin/MyPlugin.java` 找到 `.java` 文件。

## 使用 Kotlin

Capacitor 默认使用 Java，但你也可以选择使用 Kotlin。

生成插件后，在 Android Studio 中右键点击 Java 插件类，从菜单中选择"Convert Java file to Kotlin file"选项。Android Studio 会引导你完成项目对 Kotlin 支持的配置。完成后，再次右键点击 Java 类并重新选择转换选项，将其转换为 Kotlin 类。

## 构建你的插件

一个适用于 Android 的 Capacitor 插件是一个简单的 Java 类，它继承自 `com.getcapacitor.Plugin` 并带有 `@NativePlugin` 注解。它包含一些带有 `@PluginMethod()` 注解的方法，这些方法可以从 JavaScript 调用。

插件生成后，你可以通过打开生成器中选择的 Plugin Class Name 对应的文件来开始编辑。

### 简单示例

在生成的示例中，有一个简单的 echo 插件，其中包含一个 `echo` 函数，该函数简单地返回传递给它的值。

这个示例展示了 Capacitor 插件的几个核心组件：从 Plugin Call 接收数据，以及将数据返回给调用者。

`EchoPlugin.java`

```java
package android.plugin.test;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin()
public class EchoPlugin extends Plugin {
    public void load() {
        // 当插件首次在 bridge 中构建时调用
    }

    @PluginMethod()
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.success(ret);
    }
}
```

> 为了让 Capacitor 识别你的插件，你需要在应用的 `MainActivity` 中[将其导出到 Capacitor](#导出到-capacitor)。

### Kotlin 示例

如果选择使用 Kotlin 而不是 Java，Echo 插件示例如下：

`EchoPlugin.kt`

```kotlin
package android.plugin.test;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin()
class EchoPlugin : Plugin() {

  @PluginMethod
  fun echo(call: PluginCall) {
    val value = call.getString("value")
    val ret = JSObject()
    ret.put("value", value)
    call.success(ret)
  }
}
```

> 为了让 Capacitor 识别你的插件，你需要在应用的 `MainActivity` 中[将其导出到 Capacitor](#导出到-capacitor)。

建议将 Kotlin 文件放在 `android/src/main/java/` 目录下，Java 文件也可以放在同一目录中。

### 访问调用数据

每个插件方法都会收到一个 `com.getcapacitor.PluginCall` 实例，其中包含客户端调用插件方法的所有信息。

客户端可以发送任何可 JSON 序列化的数据，例如数字、文本、布尔值、对象和数组。这些数据可以通过调用实例的 `getData` 字段访问，或使用 `getString`、`getObject` 等便捷方法访问。

例如，以下是如何获取传递给方法的数据：

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

注意 `PluginCall` 实例上各种数据访问方式，包括如何使用 `getData` 的 `has` 方法检查某个键是否存在。

### 返回数据

插件调用可以成功或失败。对于使用 Promise（最常见）的调用，成功对应调用 Promise 的 `resolve`，失败对应调用 `reject`。对于使用回调的调用，成功会调用成功回调，失败则调用错误回调。

`PluginCall` 的 `resolve` 方法接受一个 `JSObject`，支持 JSON 可序列化的数据类型。以下是将数据返回给客户端的示例：

```java
JSObject ret = new JSObject();
ret.put("added", true);
JSObject info = new JSObject();
info.put("id", "unique-id-1234");
ret.put("info", info);
call.resolve(ret);
```

要使调用失败或拒绝，使用 `call.reject`，传入错误字符串和（可选的）`Exception` 实例：

```java
call.reject(exception.getLocalizedMessage(), exception);
```

### 添加初始化逻辑

插件可以重写 `load` 方法，在插件首次初始化时运行一些代码：

```java
public class MyPlugin extends Plugin {
    public void load() {
    }
}
```

### 呈现原生界面

要在 Capacitor 界面上呈现原生界面，我们需要使用 [Android 的 Intent](https://developer.android.com/guide/components/intents-filters)。Intent 允许你在你的应用或其他应用中启动 Activity。参见[常用 Intent](https://developer.android.com/guide/components/intents-common)

#### 不需要返回结果的 Intent

大多数情况下，你只需要呈现原生 Activity，这时你可以直接触发[相关操作](https://developer.android.com/guide/components/intents-common)。

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
getActivity().startActivity(intent);
```

#### 需要返回结果的 Intent

有时当你启动 Intent 时，期望得到一些返回结果。这时你需要使用 `startActivityForResult`。

同时确保调用 `saveCall(call);`，因为在处理 Intent 结果时会用到它。

你还需要在 `@NativePlugin` 中注册 Intent 的[唯一请求码](https://developer.android.com/training/basics/intents/result#StartActivity)，以便触发 `handleOnActivityResult`。

```java
@NativePlugin(
  requestCodes={MyPlugin.REQUEST_IMAGE_PICK} // 注册用于 Intent 结果的请求码
)
class ImagePicker extends Plugin {
  protected static final int REQUEST_IMAGE_PICK = 12345; // 唯一请求码

  @PluginMethod()
  public void pickImage(PluginCall call) {
    saveCall(call);

    Intent intent = new Intent(Intent.ACTION_PICK);
    intent.setType("image/*");

    startActivityForResult(call, intent, REQUEST_IMAGE_PICK);
  }

  // 为了处理 Intent 结果，你需要 @Override handleOnActivityResult
  @Override
  protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
    super.handleOnActivityResult(requestCode, resultCode, data);

    // 获取之前保存的调用
    PluginCall savedCall = getSavedCall();

    if (savedCall == null) {
      return;
    }
    if (requestCode == REQUEST_IMAGE_PICK) {
      // 对数据进行处理
    }
  }
}
```

### 事件

Capacitor 插件可以触发应用事件和插件事件。

#### 应用事件

应用事件是常规的 JavaScript 事件，如 `window` 或 `document` 事件。

Capacitor 提供了以下所有函数来触发事件：

```java
// 如果你想指定目标
bridge.triggerJSEvent("myCustomEvent", "window");

bridge.triggerJSEvent("myCustomEvent", "document", "{ 'dataKey': 'dataValue' }");

// Window 事件
bridge.triggerWindowJSEvent("myCustomEvent");

bridge.triggerWindowJSEvent("myCustomEvent", "{ 'dataKey': 'dataValue' }");

// Document 事件
bridge.triggerDocumentJSEvent("myCustomEvent");

bridge.triggerDocumentJSEvent("myCustomEvent",  "{ 'dataKey': 'dataValue' }");
```

然后使用常规 JavaScript 来监听：

```typescript
window.addEventListener('myCustomEvent', function () {
  console.log('myCustomEvent was fired');
});
```

注意：`data` 必须是序列化的 JSON 字符串值。

#### 插件事件

插件可以触发自己的事件，你可以通过为插件对象附加监听器来监听这些事件，如下所示：

```typescript
Plugins.MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent was fired');
});
```

从 Java 插件类触发事件的方式如下：

```java
JSObject ret = new JSObject();
ret.put("value", "some value");
notifyListeners("myPluginEvent", ret);
```

从插件对象移除监听器：

```typescript
const myPluginEventListener = Plugins.MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent was fired');
  },
);

myPluginEventListener.remove();
```

### 权限

某些插件需要请求权限。Capacitor 提供了一些辅助方法来实现这一点。

首先在 `@NativePlugin` 注解中声明插件权限：

```java
@NativePlugin(
  permissions={
    Manifest.permission.ACCESS_NETWORK_STATE
  }
)
```

你可以使用 `hasRequiredPermissions()` 检查所有必需权限是否已授予。使用 `pluginRequestAllPermissions();` 请求所有权限。使用 `pluginRequestPermission(Manifest.permission.CAMERA, 12345);` 请求单个权限。或者使用以下方式请求一组权限：

```java
static final int REQUEST_IMAGE_CAPTURE = 12345;
pluginRequestPermissions(new String[] {
  Manifest.permission.CAMERA,
  Manifest.permission.WRITE_EXTERNAL_STORAGE,
  Manifest.permission.READ_EXTERNAL_STORAGE
}, REQUEST_IMAGE_CAPTURE);
```

要处理权限请求，你需要重写 `handleRequestPermissionsResult`：

```java
@Override
protected void handleRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
  super.handleRequestPermissionsResult(requestCode, permissions, grantResults);

  log("handling request perms result");
  PluginCall savedCall = getSavedCall();
  if (savedCall == null) {
    log("No stored plugin call for permissions request result");
    return;
  }

  for(int result : grantResults) {
    if (result == PackageManager.PERMISSION_DENIED) {
      savedCall.error("User denied permission");
      return;
    }
  }

  if (requestCode == REQUEST_IMAGE_CAPTURE) {
    // 我们已获得权限
  }
}
```

### 重写导航

Capacitor 插件可以重写 WebView 导航。为此，插件可以重写 `public Boolean shouldOverrideLoad(Uri url)` 方法。返回 `true` 会使 WebView 中止加载 URL。返回 `false` 会使 WebView 继续加载 URL。返回 `null` 将遵循 Capacitor 的默认策略。

### 导出到 Capacitor

通过在插件中使用 `@NativePlugin` 和 `@PluginMethod()` 注解，你可以使它们对 Capacitor 可用，但还需要在应用程序中额外一步操作来让 Capacitor 识别这些插件。

这一步在应用的 `MainActivity` 中完成，例如在 `src/main/java/com/example/myapp/MainActivity.java` 中通过 `add` 方法添加：

```java
// 其他导入...
import com.example.myapp.EchoPlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // 初始化 Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // 你安装的其他插件放在这里
      // 例如：add(TotallyAwesomePlugin.class);
      add(EchoPlugin.class);
    }});
  }
}
```
