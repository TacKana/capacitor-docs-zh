---
title: Custom Native iOS Code
description: 自定义原生 iOS 代码
contributors:
  - dotNetkow
  - mlynch
slug: /ios/custom-code
---

# 自定义原生 iOS 代码

使用 Capacitor 时，我们鼓励你编写 Swift 或 Objective-C 代码来实现应用所需的本机功能。

可能并非所有功能都有现成的 [Capacitor 插件](/plugins.mdx)——但这没关系！你完全可以在应用中直接编写 WebView 可访问的原生代码。

## WebView 可访问的原生代码

在 JavaScript 和原生代码之间通信的最简单方法，是构建一个仅限本应用使用的自定义 Capacitor 插件。

### `EchoPlugin.swift`

首先，通过[打开 Xcode](/main/ios/index.md#opening-the-ios-project)，在 **App** 组（位于 **App** 目标下）上右键单击，从上下文菜单中选择 **New File...**，在弹出的窗口中选择 **Swift File**，来创建 `EchoPlugin.swift` 文件。

![在 Xcode 中新建 Swift 文件](../../../../static/img/v5/docs/ios/xcode-new-swift-file.png)

将下面的 Swift 代码复制到 `EchoPlugin.swift` 中：

```swift
import Capacitor

@objc(EchoPlugin)
public class EchoPlugin: CAPPlugin {
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve(["value": value])
    }
}
```

> `@objc` 装饰器是必需的，它能确保 Capacitor 运行时（必须使用 Objective-C 来支持动态插件）能够识别这个类。

### 注册插件

我们必须在 iOS 端和 Web 端都注册自定义插件，这样 Capacitor 才能在 Swift 和 JavaScript 之间建立桥接。

#### `EchoPlugin.m`

接下来，用同样的方式在 Xcode 中创建 `EchoPlugin.m` 文件，但在窗口中选择 **Objective-C**。将 **File Type** 保持为 **Empty File**。如果 Xcode 提示创建桥接头文件，请点击 **Create Bridging Header**。

> 建议使用 Xcode 来创建原生文件，因为这能确保项目引用被正确添加。
>
> 对项目文件的这些修改，应该连同新文件本身一起提交到你的项目中。

将下面的 Objective-C 代码复制到 `EchoPlugin.m` 中：

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
    CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

> 这些 Objective-C 宏会将你的插件注册到 Capacitor，使 `EchoPlugin` 及其 `echo` 方法在 JavaScript 中可用。每当你在 `EchoPlugin.swift` 中添加或删除方法时，都必须更新这个文件。

#### JavaScript

在 JS 端，我们使用 `@capacitor/core` 中的 `registerPlugin()` 来创建一个链接到 Swift 插件的对象。

```typescript
import { registerPlugin } from '@capacitor/core';

const Echo = registerPlugin('Echo');

export default Echo;
```

> `registerPlugin()` 的第一个参数是插件名称，它必须与 `EchoPlugin.m` 中 `CAP_PLUGIN` 宏的第二个参数匹配。

**TypeScript**

我们可以通过定义接口并将其用于 `registerPlugin()` 的调用中，来为链接对象定义类型。

```diff
 import { registerPlugin } from '@capacitor/core';

+export interface EchoPlugin {
+  echo(options: { value: string }): Promise<{ value: string }>;
+}

-const Echo = registerPlugin('Echo');
+const Echo = registerPlugin<EchoPlugin>('Echo');

 export default Echo;
```

`registerPlugin()` 的泛型参数定义了链接对象的结构。如果需要，你可以使用 `registerPlugin<any>('Echo')` 来忽略类型。我们对此不做评判。❤️

### 使用插件

使用导出的 `Echo` 对象来调用你的插件方法。以下代码片段将在 iOS 上调用 Swift 代码并打印结果：

```typescript
import Echo from '../path/to/echo-plugin';

const { value } = await Echo.echo({ value: 'Hello World!' });
console.log('Response from native:', value);
```

### 后续步骤

[阅读 iOS 插件指南 &#8250;](/plugins/creating-plugins/ios-guide.md)