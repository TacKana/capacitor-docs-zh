---
title: 自定义原生 iOS 代码
description: 自定义原生 iOS 代码
contributors:
  - dotNetkow
  - mlynch
slug: /ios/custom-code
---

# 自定义原生 iOS 代码

使用 Capacitor，我们鼓励您编写 Swift 或 Objective-C 代码来实现应用所需的原生功能。

可能并不是所有功能都有[对应的 Capacitor 插件](/plugins.mdx)——这没关系！您完全可以在应用中编写 WebView 可访问的原生代码。

## WebView 可访问的原生代码

在 JavaScript 和原生代码之间进行通信的最简单方法是构建一个应用本地的自定义 Capacitor 插件。

### `EchoPlugin.swift`

首先，通过[打开 Xcode](/main/ios/index.md#打开-ios-项目)，右键点击 **App** 组（在 **App** target 下），从上下文菜单中选择 **New File...**，在窗口中选择 **Swift File**，创建 `EchoPlugin.swift` 文件。

![在 Xcode 中新建 Swift 文件](../../../../static/img/v5/docs/ios/xcode-new-swift-file.png)

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

> `@objc` 装饰器是必需的，以确保 Capactor 的运行时（必须使用 Objective-C 以实现动态插件支持）能够看到它。

### 注册插件

我们必须在 iOS 和 Web 两端都注册自定义插件，以便 Capacitor 能够在 Swift 和 JavaScript 之间建立桥接。

#### `EchoPlugin.m`

接下来，用同样的方式在 Xcode 中创建一个 `EchoPlugin.m` 文件，但在窗口中选择 **Objective-C**。将**文件类型**保留为**空文件**。如果 Xcode 提示创建 Bridging Header，请点击 **Create Bridging Header**。

> 建议使用 Xcode 创建原生文件，因为它能确保引用被正确添加到项目中。
>
> 这些对项目文件的更改应连同新文件本身一起提交到您的项目中。

将以下 Objective-C 代码复制到 `EchoPlugin.m` 中：

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
    CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

> 这些 Objective-C 宏向 Capacitor 注册您的插件，使 `EchoPlugin` 及其 `echo` 方法对 JavaScript 可用。每当您在 `EchoPlugin.swift` 中添加或移除方法时，都必须更新此文件。

#### JavaScript

在 JS 中，我们使用 `@capacitor/core` 中的 `registerPlugin()` 来创建一个与我们的 Swift 插件相关联的对象。

```typescript
import { registerPlugin } from '@capacitor/core';

const Echo = registerPlugin('Echo');

export default Echo;
```

> `registerPlugin()` 的第一个参数是插件名称，必须与 `EchoPlugin.m` 中 `CAP_PLUGIN` 宏的第二个参数一致。

**TypeScript**

我们可以通过定义接口并在调用 `registerPlugin()` 时使用它，来为关联的对象定义类型。

```diff
 import { registerPlugin } from '@capacitor/core';

+export interface EchoPlugin {
+  echo(options: { value: string }): Promise<{ value: string }>;
+}

-const Echo = registerPlugin('Echo');
+const Echo = registerPlugin<EchoPlugin>('Echo');

 export default Echo;
```

`registerPlugin()` 的泛型参数定义了关联对象的结构。如果需要，您也可以使用 `registerPlugin<any>('Echo')` 来忽略类型。这完全可以理解。❤️

### 使用插件

使用导出的 `Echo` 对象来调用插件方法。以下代码片段将调用 iOS 上的 Swift 代码并打印结果：

```typescript
import Echo from '../path/to/echo-plugin';

const { value } = await Echo.echo({ value: 'Hello World!' });
console.log('来自原端的响应：', value);
```

### 下一步

[阅读 iOS 插件指南 &#8250;](/plugins/creating-plugins/ios-guide.md)
