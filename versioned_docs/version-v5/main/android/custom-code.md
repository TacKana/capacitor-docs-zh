---
title: 自定义原生 Android 代码
sidebar_label: 自定义原生代码
description: 自定义原生 Android 代码
contributors:
  - mlynch
  - jcesarmobile
  - RoderickQiu
slug: /android/custom-code
---

# 自定义原生 Android 代码

使用 Capacitor 时，我们鼓励您编写 Java 或 Kotlin 代码来实现应用所需的各种原生功能。

并非所有功能都有现成的 [Capacitor 插件](/plugins.mdx)——不过这没关系！您完全可以在自己的应用中编写 WebView 能够访问的原生代码。

## WebView 可访问的原生代码

在 JavaScript 和原生代码之间进行通信的最简单方法，是在您的应用中构建一个自定义的 Capacitor 插件。

### `EchoPlugin.java`

首先，创建一个 `EchoPlugin.java` 文件。具体步骤是：[打开 Android Studio](/main/android/index.md#opening-the-android-project)，展开 **app** 模块和 **java** 文件夹，右键点击您应用的 Java 包，从上下文菜单中选择 **New** -> **Java Class**，然后创建该文件。

![Android Studio app package](../../../../static/img/v5/docs/android/studio-app-package.png)

将以下 Java 代码复制到 `EchoPlugin.java` 中：

```java
package com.example.myapp;

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

### 注册插件

我们需要在 Android 和 Web 两端都注册自定义插件，这样 Capacitor 才能在 Java 和 JavaScript 之间建立桥接。

#### `MainActivity.java`

在您应用的 `MainActivity.java` 中，使用 `registerPlugin()` 或 `registerPlugins()` 来注册您的自定义插件。

```diff
 public class MainActivity extends BridgeActivity {
     @Override
     public void onCreate(Bundle savedInstanceState) {
+        registerPlugin(EchoPlugin.class);
         super.onCreate(savedInstanceState);
     }
 }
```

#### JavaScript

在 JavaScript 端，我们使用 `@capacitor/core` 中的 `registerPlugin()` 来创建一个与我们的 Java 插件相关联的对象。

```typescript
import { registerPlugin } from '@capacitor/core';

const Echo = registerPlugin('Echo');

export default Echo;
```

> `registerPlugin()` 的第一个参数是插件名称，它必须与 `EchoPlugin.java` 中 `@CapacitorPlugin` 注解的 `name` 属性相匹配。

**TypeScript**

我们可以通过定义一个接口，并在调用 `registerPlugin()` 时使用它，来为关联的对象定义类型。

```diff
 import { registerPlugin } from '@capacitor/core';

+export interface EchoPlugin {
+  echo(options: { value: string }): Promise<{ value: string }>;
+}

-const Echo = registerPlugin('Echo');
+const Echo = registerPlugin<EchoPlugin>('Echo');

 export default Echo;
```

`registerPlugin()` 的泛型参数定义了关联对象的结构。如果需要，您也可以使用 `registerPlugin<any>('Echo')` 来忽略类型。我们不会评判您的选择。❤️

### 使用插件

使用导出的 `Echo` 对象来调用您的插件方法。以下代码片段将在 Android 上调用 Java 代码并打印结果：

```typescript
import Echo from '../path/to/echo-plugin';

const { value } = await Echo.echo({ value: 'Hello World!' });
console.log('Response from native:', value);
```

### 后续步骤

[阅读 Android 插件指南 &#8250;](/plugins/creating-plugins/android-guide.md)