---
title: Capacitor Android 插件开发指南
description: Capacitor Android 插件开发指南
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/plugins/android
---

# Capacitor Android 插件开发指南

为 Android 构建 Capacitor 插件需要编写 Java 或 [Kotlin](https://developer.android.com/kotlin/overview) 代码来与 Android SDK 交互。

## 开始使用

首先按照插件指南中的[入门章节](/plugins.md)生成一个插件。

接着，在 Android Studio 中打开 `your-plugin/android/` 目录。你需要找到插件的 `.java` 文件，其路径取决于创建插件时使用的 Plugin ID 和 Plugin Class Name 参数。

例如，对于 ID 为 `com.domain.myplugin` 且类名为 `MyPlugin` 的插件，`.java` 文件位于 `android/src/main/java/com/domain/myplugin/MyPlugin.java`。

## 使用 Kotlin

Capacitor 默认使用 Java，但也可以选择使用 Kotlin。

生成插件后，在 Android Studio 中右键点击 Java 插件类，选择"Convert Java file to Kotlin file"选项。Android Studio 会引导你配置 Kotlin 支持。完成后再次右键点击 Java 类并选择转换选项将其转为 Kotlin 类。

## 构建插件

Android 平台的 Capacitor 插件是一个继承 `com.getcapacitor.Plugin` 并带有 `@NativePlugin` 注解的简单 Java 类。其中带有 `@PluginMethod()` 注解的方法可以从 JavaScript 调用。

生成插件后，可以通过打开生成器选择的插件类文件开始编辑。

### 简单示例

生成的示例中包含一个简单的 echo 插件，其 `echo` 方法会原样返回传入的值。

这个示例展示了 Capacitor 插件的两个核心功能：从插件调用接收数据，以及向调用者返回数据。

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
        // 当插件在桥接中首次构造时调用
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

> 为了使 Capacitor 识别你的插件，你需要在应用的 `MainActivity` 中[将其导出给 Capacitor](#export-to-capacitor)。

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

> 为了使 Capacitor 识别你的插件，你需要在应用的 `MainActivity` 中[将其导出给 Capacitor](#export-to-capacitor)。

建议将 Kotlin 文件放在 `android/src/main/java/` 目录下，Java 文件也可以放置于此。

### 访问调用数据

每个插件方法都会收到一个 `com.getcapacitor.PluginCall` 实例，包含从客户端调用插件方法的所有信息。

客户端可以发送任何可 JSON 序列化的数据，如数字、文本、布尔值、对象和数组。这些数据可通过 `getData` 字段或便捷方法如 `getString` 或 `getObject` 访问。

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

注意 `PluginCall` 实例上多种访问数据的方式，包括使用 `getData` 的 `has` 方法检查键是否存在。

### 返回数据

插件调用可以成功或失败。对于使用 Promise 的调用（最常见），成功对应调用 Promise 的 `resolve`，失败对应调用 `reject`。对于使用回调的，成功会调用成功回调，失败则调用错误回调。

`PluginCall` 的 `resolve` 方法接受 `JSObject` 并支持 JSON 序列化数据类型。返回数据给客户端的示例：

```java
JSObject ret = new JSObject();
ret.put("added", true);
JSObject info = new JSObject();
info.put("id", "unique-id-1234");
ret.put("info", info);
call.resolve(ret);
```

要失败或拒绝调用，使用 `call.reject`，传入错误字符串和（可选的）`Exception` 实例：

```java
call.reject(exception.getLocalizedMessage(), exception);
```

### 添加初始化逻辑

插件可以重写 `load` 方法来在首次初始化时运行代码：

```java
public class MyPlugin extends Plugin {
    public void load() {
    }
}
```

### 显示原生界面

要在 Capacitor 界面上显示原生界面，我们将使用 [Android 的 Intent](https://developer.android.com/guide/components/intents-filters)。Intent 允许你从你的应用或其他应用启动 Activity。[参见常用 Intent](https://developer.android.com/guide/components/intents-common)

#### 无结果的 Intent

大多数时候你只是想显示原生 Activity，这时可以触发[相关操作](https://developer.android.com/guide/components/intents-common)。

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
getActivity().startActivity(intent);
```

#### 带结果的 Intent

有时启动 Intent 后会期待返回结果。这时需要使用 `startActivityForResult`。

同时确保调用 `saveCall(call);` 因为你稍后处理 Intent 结果时需要它。

你还需要用 `@NativePlugin` 注册 Intent 的[唯一请求](https://developer.android.com/training/basics/intents/result#StartActivity)代码，以便触发 `handleOnActivityResult`。

```java
@NativePlugin(
  requestCodes={MyPlugin.REQUEST_IMAGE_PICK} // 为 Intent 结果注册请求代码
)
class ImagePicker extends Plugin {
  protected static final int REQUEST_IMAGE_PICK = 12345; // 唯一请求代码

  @PluginMethod()
  public void pickImage(PluginCall call) {
    saveCall(call);

    Intent intent = new Intent(Intent.ACTION_PICK);
    intent.setType("image/*");

    startActivityForResult(call, intent, REQUEST_IMAGE_PICK);
  }

  // 要处理 Intent 结果，必须 @Override handleOnActivityResult
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

应用事件是常规的 JavaScript 事件，类似 `window` 或 `document` 事件。

Capacitor 提供以下触发事件的函数：

```java
//如果要指定目标
bridge.triggerJSEvent("myCustomEvent", "window");

bridge.triggerJSEvent("myCustomEvent", "document", "{ 'dataKey': 'dataValue' }");

// 窗口事件
bridge.triggerWindowJSEvent("myCustomEvent");

bridge.triggerWindowJSEvent("myCustomEvent", "{ 'dataKey': 'dataValue' }");

// 文档事件
bridge.triggerDocumentJSEvent("myCustomEvent");

bridge.triggerDocumentJSEvent("myCustomEvent",  "{ 'dataKey': 'dataValue' }");
```

监听事件只需使用常规 JavaScript：

```typescript
window.addEventListener('myCustomEvent', function () {
  console.log('myCustomEvent 已触发');
});
```

注意：`data` 必须是序列化的 JSON 字符串值。

#### 插件事件

插件可以触发自己的事件，可以通过给插件对象附加监听器来监听：

```typescript
Plugins.MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent 已触发');
});
```

要从 Java 插件类触发事件：

```java
JSObject ret = new JSObject();
ret.put("value", "some value");
notifyListeners("myPluginEvent", ret);
```

移除监听器：

```typescript
const myPluginEventListener = Plugins.MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent 已触发');
  },
);

myPluginEventListener.remove();
```

### 权限

某些插件需要请求权限。Capacitor 提供了一些辅助方法。

首先在 `@NativePlugin` 注解中声明插件权限：

```java
@NativePlugin(
  permissions={
    Manifest.permission.ACCESS_NETWORK_STATE
  }
)
```

可以用 `hasRequiredPermissions()` 检查是否已授予所有必需权限。
可以用 `pluginRequestAllPermissions();` 请求所有权限。
可以用 `pluginRequestPermission(Manifest.permission.CAMERA, 12345);` 请求单个权限。
或者请求一组权限：

```java
static final int REQUEST_IMAGE_CAPTURE = 12345;
pluginRequestPermissions(new String[] {
  Manifest.permission.CAMERA,
  Manifest.permission.WRITE_EXTERNAL_STORAGE,
  Manifest.permission.READ_EXTERNAL_STORAGE
}, REQUEST_IMAGE_CAPTURE);
```

要处理权限请求，需要重写 `handleRequestPermissionsResult`：

```java
@Override
protected void handleRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
  super.handleRequestPermissionsResult(requestCode, permissions, grantResults);

  log("处理权限请求结果");
  PluginCall savedCall = getSavedCall();
  if (savedCall == null) {
    log("没有存储的插件调用用于权限请求结果");
    return;
  }

  for(int result : grantResults) {
    if (result == PackageManager.PERMISSION_DENIED) {
      savedCall.error("用户拒绝了权限");
      return;
    }
  }

  if (requestCode == REQUEST_IMAGE_CAPTURE) {
    // 已获得权限
  }
}
```

### 重写导航

Capacitor 插件可以重写 WebView 导航。为此插件可以重写 `public Boolean shouldOverrideLoad(Uri url)` 方法。
返回 `true` 会使 WebView 中止加载 URL。
返回 `false` 会使 WebView 继续加载 URL。
返回 `null` 会采用默认的 Capacitor 策略。

### 导出给 Capacitor

通过在插件中使用 `@NativePlugin` 和 `@PluginMethod()` 注解，你可以让插件对 Capacitor 可用，但仍需在应用中额外步骤让 Capacitor 识别插件。

这在你应用的 `MainActivity` 中完成，例如在 `src/main/java/com/example/myapp/MainActivity.java` 中添加：

```java
// 其他导入...
import com.example.myapp.EchoPlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // 初始化桥接
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // 已安装的其他插件放在这里
      // 例如：add(TotallyAwesomePlugin.class);
      add(EchoPlugin.class);
    }});
  }
}
```