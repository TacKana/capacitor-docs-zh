---
title: 自定义原生 iOS 代码
description: 自定义原生 iOS 代码
contributors:
  - dotNetkow
  - mlynch
slug: /ios/custom-code
---

# 自定义原生 iOS 代码

使用 Capacitor，我们鼓励你编写 Swift 或 Objective-C 代码来实现应用所需的原生功能。

可能并非所有功能都有[对应的 Capacitor 插件](/plugins.mdx)——但这没关系！你可以在应用中直接编写 WebView 可访问的原生代码。

## WebView 可访问的原生代码

在 JavaScript 和原生代码之间进行通信的最简单方法是构建一个属于你应用的自定义 Capacitor 插件。

### `EchoPlugin.swift`

首先，通过[打开 Xcode](/main/ios/index.md#opening-the-ios-project)，右键单击 **App** 组（在 **App** target 下），从上下文菜单中选择 **New File...**，在窗口中选择 **Swift File**，然后创建文件来创建 `EchoPlugin.swift` 文件。

![在 Xcode 中新建 Swift 文件](/img/v6/docs/ios/xcode-new-swift-file.png)

将以下 Swift 代码复制到 `EchoPlugin.swift` 中：

```swift
import Capacitor

@objc(EchoPlugin)
public class EchoPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "EchoPlugin"
    public let jsName = "Echo"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
    ]

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve(["value": value])
    }
}
```

> `@objc` 装饰器是必需的，以确保 Capacitor 运行时（必须使用 Objective-C 以支持动态插件）能够看到它。

### 注册插件

我们必须在 iOS 和 Web 两端都注册自定义插件，以便 Capacitor 能够在 Swift 和 JavaScript 之间建立桥接。

#### `MyViewController.swift`

[创建一个自定义的 `MyViewController.swift`](../ios/viewcontroller.md)。

然后添加一个 `capacitorDidLoad()` 方法覆盖并注册插件：

```swift
override open func capacitorDidLoad() {
    bridge?.registerPluginInstance(EchoPlugin())
}
```

#### JavaScript

在 JS 中，我们使用 `@capacitor/core` 中的 `registerPlugin()` 来创建一个与我们的 Swift 插件相关联的对象。

```typescript
import { registerPlugin } from '@capacitor/core';

const Echo = registerPlugin('Echo');

export default Echo;
```

> `registerPlugin()` 的第一个参数是插件名称，必须与 `EchoPlugin.swift` 中的 `jsName` 相匹配。

**TypeScript**

我们可以通过定义一个接口并在 `registerPlugin()` 调用中使用它，来为关联对象定义类型。

```diff
 import { registerPlugin } from '@capacitor/core';

+export interface EchoPlugin {
+  echo(options: { value: string }): Promise<{ value: string }>;
+}

-const Echo = registerPlugin('Echo');
+const Echo = registerPlugin<EchoPlugin>('Echo');

 export default Echo;
```

`registerPlugin()` 的泛型参数定义了关联对象的结构。如果需要，你可以使用 `registerPlugin<any>('Echo')` 来忽略类型。这完全没问题。❤️

### 使用插件

使用导出的 `Echo` 对象来调用插件方法。以下代码段将调用 iOS 上的 Swift 代码并打印结果：

```typescript
import Echo from '../path/to/echo-plugin';

const { value } = await Echo.echo({ value: 'Hello World!' });
console.log('来自原生的响应：', value);
```

### 下一步

[阅读 iOS 插件指南 &#8250;](/plugins/creating-plugins/ios-guide.md)
