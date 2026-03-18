---
title: Custom Native iOS Code
description: 自定义原生 iOS 代码
contributors:
  - dotNetkow
  - mlynch
slug: /ios/custom-code
---

# 自定义原生 iOS 代码

使用 Capacitor，我们鼓励您编写 Swift 或 Objective-C 代码来实现应用所需的本机功能。

可能并非所有功能都有 [现成的 Capacitor 插件](/plugins.mdx)——这完全没问题！您可以直接在应用中编写可供 WebView 访问的原生代码。

## 可供 WebView 访问的原生代码

在 JavaScript 和原生代码之间进行通信的最简单方法，是在您的应用中构建一个自定义的 Capacitor 插件。

### `EchoPlugin.swift`

首先，通过 [在 Xcode 中打开项目](/main/ios/index.md#opening-the-ios-project)，在 **App** 分组上（位于 **App** 目标下）右键点击，从上下文菜单中选择 **New File...**，在窗口中选择 **Swift File**，来创建 `EchoPlugin.swift` 文件。

![在 Xcode 中创建新的 Swift 文件](../../../../static/img/v4/docs/ios/xcode-new-swift-file.png)

将以下 Swift 代码复制到 `EchoPlugin.swift` 中：

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

> `@objc` 装饰器是必需的，以确保 Capacitor 运行时（必须使用 Objective-C 来支持动态插件）能够识别它。

### 注册插件

我们必须在 iOS 端和 Web 端都注册自定义插件，以便 Capacitor 能够在 Swift 和 JavaScript 之间建立桥梁。

#### `EchoPlugin.m`

接下来，以同样的方式在 Xcode 中创建 `EchoPlugin.m` 文件，但在窗口中选择 **Objective-C**。将 **File Type** 保留为 **Empty File**。如果 Xcode 提示创建桥接头文件，请点击 **Create Bridging Header**。

> 建议使用 Xcode 创建原生文件，因为这样可以确保引用被正确添加到项目中。
>
> 这些对项目文件的更改，应与新增的文件本身一同提交到您的项目中。

将以下 Objective-C 代码复制到 `EchoPlugin.m` 中：

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
    CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

> 这些 Objective-C 宏将您的插件注册到 Capacitor，使 `EchoPlugin` 及其 `echo` 方法可供 JavaScript 调用。每当您在 `EchoPlugin.swift` 中添加或删除方法时，都必须更新此文件。

#### JavaScript

在 JavaScript 端，我们使用 `@capacitor/core` 中的 `registerPlugin()` 来创建一个链接到我们 Swift 插件的对象。

```typescript
import { registerPlugin } from '@capacitor/core';

const Echo = registerPlugin('Echo');

export default Echo;
```

> `registerPlugin()` 的第一个参数是插件名称，它必须与 `EchoPlugin.m` 中 `CAP_PLUGIN` 宏的第二个参数匹配。

**TypeScript**

我们可以通过定义一个接口并在调用 `registerPlugin()` 时使用它，来为我们的链接对象定义类型。

```diff
 import { registerPlugin } from '@capacitor/core';

+export interface EchoPlugin {
+  echo(options: { value: string }): Promise<{ value: string }>;
+}

-const Echo = registerPlugin('Echo');
+const Echo = registerPlugin<EchoPlugin>('Echo');

 export default Echo;
```

`registerPlugin()` 的泛型参数定义了链接对象的结构。如果需要，您可以使用 `registerPlugin<any>('Echo')` 来忽略类型。我们不做评判。❤️

### 使用插件

使用导出的 `Echo` 对象来调用您的插件方法。以下代码片段将在 iOS 上调用 Swift 代码并打印结果：

```typescript
import Echo from '../path/to/echo-plugin';

const { value } = await Echo.echo({ value: 'Hello World!' });
console.log('Response from native:', value);
```

### 后续步骤

[阅读 iOS 插件指南 &#8250;](/plugins/creating-plugins/ios-guide.md)