---
title: 自定义 iOS 原生代码
description: 自定义 iOS 原生代码
contributors:
  - dotNetkow
  - mlynch
slug: /ios/custom-code
---

# 自定义 iOS 原生代码

使用 Capacitor 时，我们鼓励开发者使用 Swift 或 Objective-C 来实现应用所需的原生功能。

并不是所有功能都有 [现成的 Capacitor 插件](/plugins.mdx)——这完全没关系！你可以直接在应用中编写 WebView 可访问的原生代码。

## WebView 可访问的原生代码

在 JavaScript 和原生代码之间通信最简单的方式，是构建一个专属于你应用的本地 Capacitor 插件。

### 创建 `EchoPlugin.swift` 文件

首先按照以下步骤创建 `EchoPlugin.swift` 文件：[在 Xcode 中打开项目](/main/ios/index.md#opening-the-ios-project)，右键点击 **App** 分组（位于 **App** 目标下），从上下文菜单中选择 **New File...**，在弹出窗口中选择 **Swift File** 并创建文件。

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

> 必须使用 `@objc` 修饰符来确保 Capacitor 运行时（需要通过 Objective-C 实现动态插件支持）能够识别这些类和方法。

### 注册插件

我们需要同时在 iOS 和 Web 端注册自定义插件，这样 Capacitor 才能在 Swift 和 JavaScript 之间建立桥梁。

#### 创建 `EchoPlugin.m` 文件

同样使用 Xcode 创建 `EchoPlugin.m` 文件，但在窗口中选择 **Objective-C**，保持 **File Type** 为 **Empty File**。如果 Xcode 提示创建桥接头文件，请点击 **Create Bridging Header**。

> 建议使用 Xcode 创建原生文件，这能确保文件引用被正确添加到项目中。
>
> 这些项目文件的变更应当与新文件本身一起提交到代码仓库。

将以下 Objective-C 代码复制到 `EchoPlugin.m` 中：

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
    CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

> 这些 Objective-C 宏会将你的插件注册到 Capacitor 中，使 JavaScript 能够访问 `EchoPlugin` 及其 `echo` 方法。当你增减 `EchoPlugin.swift` 中的方法时，必须同步更新此文件。

#### JavaScript 部分

在 JavaScript 中，我们使用 `@capacitor/core` 的 `registerPlugin()` 方法来创建一个与 Swift 插件关联的对象。

```typescript
import { registerPlugin } from '@capacitor/core';

const Echo = registerPlugin('Echo');

export default Echo;
```

> `registerPlugin()` 的第一个参数是插件名称，必须与 `EchoPlugin.m` 中 `CAP_PLUGIN` 宏的第二个参数保持一致。

**TypeScript 类型支持**

我们可以通过定义接口来为关联对象添加类型支持：

```diff
 import { registerPlugin } from '@capacitor/core';

+export interface EchoPlugin {
+  echo(options: { value: string }): Promise<{ value: string }>;
+}

-const Echo = registerPlugin('Echo');
+const Echo = registerPlugin<EchoPlugin>('Echo');

 export default Echo;
```

`registerPlugin()` 的泛型参数定义了关联对象的结构。如果你需要，也可以使用 `registerPlugin<any>('Echo')` 来忽略类型检查。放心，没人会因此责怪你。❤️

### 使用插件

使用导出的 `Echo` 对象来调用插件方法。以下代码片段会在 iOS 上调用 Swift 代码并打印结果：

```typescript
import Echo from '../path/to/echo-plugin';

const { value } = await Echo.echo({ value: 'Hello World!' });
console.log('来自原生的响应:', value);
```

### 后续步骤

[阅读 iOS 插件开发指南 &#8250;](/plugins/creating-plugins/ios-guide.md)