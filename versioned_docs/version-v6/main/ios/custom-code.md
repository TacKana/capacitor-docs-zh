---
title: 自定义原生 iOS 代码
description: 自定义原生 iOS 代码
contributors:
  - dotNetkow
  - mlynch
slug: /ios/custom-code
---

# 自定义原生 iOS 代码

使用 Capacitor 时，我们推荐使用 Swift 或 Objective-C 来实现应用所需的原生功能。

并非所有功能都有[现成的 Capacitor 插件](/plugins.mdx)——这完全没问题！您可以直接在应用中编写可供 WebView 访问的原生代码。

## 可供 WebView 访问的原生代码

在 JavaScript 与原生代码之间通信最简单的方式，是构建一个专属于您应用的 Capacitor 插件。

### `EchoPlugin.swift`

首先创建 `EchoPlugin.swift` 文件：[打开 Xcode](/main/ios/index.md#opening-the-ios-project)，右键点击 **App** 分组（位于 **App** target 下），从上下文菜单中选择 **New File...**，在窗口中选择 **Swift File** 并创建文件。

![在 Xcode 中新建 Swift 文件](/img/v6/docs/ios/xcode-new-swift-file.png)

将以下 Swift 代码复制到 `EchoPlugin.swift`：

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

> `@objc` 装饰器是必需的，它能确保 Capacitor 运行时（需要使用 Objective-C 实现动态插件支持）能够识别这个类。

### 注册插件

我们需要同时在 iOS 和 Web 端注册自定义插件，这样 Capacitor 才能在 Swift 和 JavaScript 之间建立桥梁。

#### `MyViewController.swift`

[创建自定义的 `MyViewController.swift`](../ios/viewcontroller.md)。

然后添加 `capacitorDidLoad()` 方法重写并注册插件：

```swift
override open func capacitorDidLoad() {
    bridge?.registerPluginInstance(EchoPlugin())
}
```

#### JavaScript

在 JS 中，我们使用 `@capacitor/core` 的 `registerPlugin()` 来创建一个与 Swift 插件关联的对象。

```typescript
import { registerPlugin } from '@capacitor/core';

const Echo = registerPlugin('Echo');

export default Echo;
```

> `registerPlugin()` 的第一个参数是插件名称，必须与 `EchoPlugin.swift` 中的 `jsName` 保持一致。

**TypeScript**

我们可以通过定义接口并在调用 `registerPlugin()` 时使用它，来为关联对象添加类型定义。

```diff
 import { registerPlugin } from '@capacitor/core';

+export interface EchoPlugin {
+  echo(options: { value: string }): Promise<{ value: string }>;
+}

-const Echo = registerPlugin('Echo');
+const Echo = registerPlugin<EchoPlugin>('Echo');

 export default Echo;
```

`registerPlugin()` 的泛型参数定义了关联对象的结构。如果需要，您可以使用 `registerPlugin<any>('Echo')` 来忽略类型检查。我们不做评判。❤️

### 使用插件

使用导出的 `Echo` 对象来调用插件方法。以下代码片段将在 iOS 上调用 Swift 方法并打印结果：

```typescript
import Echo from '../path/to/echo-plugin';

const { value } = await Echo.echo({ value: 'Hello World!' });
console.log('Response from native:', value);
```

### 下一步

[阅读 iOS 插件指南 &#8250;](/plugins/creating-plugins/ios-guide.md)