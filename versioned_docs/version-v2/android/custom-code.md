---
title: 自定义原生 Android 代码
description: 自定义原生 Android 代码
contributors:
  - mlynch
  - jcesarmobile
  - RoderickQiu
canonicalUrl: https://capacitorjs.com/docs/android/custom-code
---

# 自定义原生 Android 代码

许多应用希望添加自定义 Java 或 Kotlin 代码来实现原生功能，而不需要构建和发布完整的 Capacitor 插件的开销。

根据您是否需要从 WebView 访问这些代码，有两种实现方式：

## WebView 可访问的原生代码

构建需要从 WebView 访问的自定义原生代码最简单的方法是
为其构建一个本地 Capacitor 插件。在这种情况下，构建插件就像构建一个
继承自 `com.getcapacitor.Plugin` 并使用 `@NativePlugin()` 和 `@PluginMethod()` 注解的类一样简单。

以下是 Java 和 Kotlin 自定义代码的示例：

### Java

`com/example/myapp/CustomNativePlugin.java` 位于 `android/app/src/main/java`：

```java
package com.example.myapp;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin()
public class CustomNativePlugin extends Plugin {

  @PluginMethod()
  public void customCall(PluginCall call) {
    String message = call.getString("message");
    // 更多代码在此处...
    call.success();
  }

  @PluginMethod()
  public void customFunction(PluginCall call) {
    // 更多代码在此处...
    call.resolve();
  }
}
```

### Kotlin

也可以使用 Kotlin 开发自定义代码。在 Android Studio 中添加新的 Kotlin 文件时，如果需要，系统会提示您在项目中配置 Kotlin。执行此操作时，请确保仅在您的应用模块中配置 Kotlin，而不要在 Capacitor 或第三方模块中配置。

`com/example/myapp/CustomNativePlugin.kt` 位于 `android/app/src/main/java`：

```kotlin
package com.example.myapp;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin
class CustomNativePlugin : Plugin() {

  @PluginMethod
  fun customCall(call: PluginCall) {
    val message = call.getString("message")
    // 更多代码在此处...
    call.success()
  }

  @PluginMethod
  fun customFunction(call: PluginCall) {
    // 更多代码在此处...
    call.resolve()
  }
}
```

### 注册插件代码

最后一步是在您的 Activity 中注册插件。在 Activity 中注册 Kotlin 插件类与注册 Java 类相同：

```java
// 其他导入...
import com.example.myapp.CustomNativePlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // 初始化 Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // 您已安装的其他插件放在此处
      // 例如：add(TotallyAwesomePlugin.class);
      add(CustomNativePlugin.class);
    }});
  }
}
```

然后您可以在 webView 代码中使用您的函数：

```typescript
// 其他代码...
import { Plugins } from '@capacitor/core';
const { CustomNativePlugin } = Plugins;
// 其他代码...
CustomNativePlugin.customCall({ message: 'CUSTOM MESSAGE' });
CustomNativePlugin.customFunction();
// 其他代码...
```

有关插件 API 的更多用法，请查看 [Capacitor Android 插件指南](/plugins/android.md)。

## 私有原生代码

如果您的代码不需要从 WebView 访问，那么只需将代码添加到任何需要的位置即可。使用 Capacitor，您可以完全
控制您的原生项目。需要在 Activity 中添加新的事件处理程序？只需更新 `MainActivity` 并添加即可。世界尽在您的掌控之中。