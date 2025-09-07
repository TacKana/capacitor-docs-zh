---
title: 自定义原生 Android 代码
description: 自定义原生 Android 代码实现
contributors:
  - mlynch
  - jcesarmobile
  - RoderickQiu
canonicalUrl: https://capacitorjs.com/docs/android/custom-code
---

# 自定义原生 Android 代码

许多应用需要添加自定义 Java 或 Kotlin 代码来实现原生功能，但又不想承担构建和发布完整 Capacitor 插件的开销。

根据是否需要从 WebView 访问这些代码，有以下两种实现方式：

## 可供 WebView 访问的原生代码

要实现可被 WebView 访问的自定义原生代码，最简单的方式是构建一个本地 Capacitor 插件。这种情况下，只需创建一个继承自 `com.getcapacitor.Plugin` 的类，并使用 `@NativePlugin()` 和 `@PluginMethod()` 注解即可。

以下是 Java 和 Kotlin 的自定义代码示例：

### Java 实现

在 `android/app/src/main/java` 下创建 `com/example/myapp/CustomNativePlugin.java`：

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
    // 这里添加更多代码...
    call.success();
  }

  @PluginMethod()
  public void customFunction(PluginCall call) {
    // 这里添加更多代码...
    call.resolve();
  }
}
```

### Kotlin 实现

也可以使用 Kotlin 开发自定义代码。在 Android Studio 中添加新 Kotlin 文件时，如果需要会提示配置项目支持 Kotlin。请确保仅配置应用模块，不要影响 Capacitor 或第三方模块。

在 `android/app/src/main/java` 下创建 `com/example/myapp/CustomNativePlugin.kt`：

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
    // 这里添加更多代码...
    call.success()
  }

  @PluginMethod
  fun customFunction(call: PluginCall) {
    // 这里添加更多代码...
    call.resolve()
  }
}
```

### 注册插件代码

最后一步是在 Activity 中注册插件。Kotlin 插件类的注册方式与 Java 类相同：

```java
// 其他导入语句...
import com.example.myapp.CustomNativePlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // 初始化 Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // 已安装的其他插件放在这里
      // 例如：add(TotallyAwesomePlugin.class);
      add(CustomNativePlugin.class);
    }});
  }
}
```

然后就可以在 WebView 代码中使用这些功能：

```typescript
// 其他代码...
import { Plugins } from '@capacitor/core';
const { CustomNativePlugin } = Plugins;
// 其他代码...
CustomNativePlugin.customCall({ message: '自定义消息' });
CustomNativePlugin.customFunction();
// 其他代码...
```

更多插件 API 用法，请参考 [Capacitor Android 插件指南](/plugins/android.md)。

## 私有原生代码实现

如果代码不需要被 WebView 访问，那么直接在任何需要的地方添加代码即可。Capacitor 赋予你对原生项目的完全控制权——可以在 `MainActivity` 中添加新的事件处理程序，或进行任何必要的修改，原生开发将变得非常灵活。