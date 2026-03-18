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

许多应用希望添加自定义的 Java 或 Kotlin 代码来实现原生功能，同时又不想经历构建和发布正式 Capacitor 插件的繁琐过程。

根据你是否需要从 WebView 访问这些代码，有两种实现方式：

## WebView 可访问的原生代码

构建需要在 WebView 中访问的自定义原生代码，最简单的方法是为此构建一个本地 Capacitor 插件。这种情况下，构建插件就像构建一个继承自 `com.getcapacitor.Plugin` 并使用 `@NativePlugin()` 和 `@PluginMethod()` 注解的类一样简单。

以下是使用 Java 和 Kotlin 编写自定义代码的示例：

### Java

在 `android/app/src/main/java` 目录下的 `com/example/myapp/CustomNativePlugin.java` 文件中：

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
    // 此处添加更多代码...
    call.success();
  }

  @PluginMethod()
  public void customFunction(PluginCall call) {
    // 此处添加更多代码...
    call.resolve();
  }
}
```

### Kotlin

你也可以使用 Kotlin 开发自定义代码。在 Android Studio 中添加新的 Kotlin 文件时，如果需要，系统会提示你配置项目中的 Kotlin。进行此操作时，请确保仅在你的应用模块中配置 Kotlin，而不是在 Capacitor 或第三方模块中。

在 `android/app/src/main/java` 目录下的 `com/example/myapp/CustomNativePlugin.kt` 文件中：

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
    // 此处添加更多代码...
    call.success()
  }

  @PluginMethod
  fun customFunction(call: PluginCall) {
    // 此处添加更多代码...
    call.resolve()
  }
}
```

### 注册插件代码

最后一步是在你的 Activity 中注册插件。在 Activity 中注册 Kotlin 插件类与注册 Java 类的方式相同：

```java
// 其他导入...
import com.example.myapp.CustomNativePlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // 初始化 Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // 你已安装的额外插件放在这里
      // 例如：add(TotallyAwesomePlugin.class);
      add(CustomNativePlugin.class);
    }});
  }
}
```

然后你就可以在 WebView 代码中使用你的函数了：

```typescript
// 其他代码...
import { Plugins } from '@capacitor/core';
const { CustomNativePlugin } = Plugins;
// 其他代码...
CustomNativePlugin.customCall({ message: 'CUSTOM MESSAGE' });
CustomNativePlugin.customFunction();
// 其他代码...
```

关于插件 API 的更多用法，请参阅 [Capacitor Android 插件指南](/plugins/android.md)。

## 私有原生代码

如果你的代码不需要从 WebView 访问，那么只需将其添加到任何需要的地方。使用 Capacitor，你可以完全掌控你的原生项目。需要在你的 Activity 中添加一个新的事件处理器？只需更新 `MainActivity` 并添加它。世界尽在你的掌握之中。