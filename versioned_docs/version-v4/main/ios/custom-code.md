---
title: 自定义原生 iOS 代码
description: 自定义原生 iOS 代码实现方案
contributors:
  - dotNetkow
  - mlynch
slug: /ios/custom-code
---

# 自定义原生 iOS 代码

使用 Capacitor 时，我们推荐直接编写 Swift 或 Objective-C 代码来实现应用所需的本机功能。

并非所有功能都能找到现成的 [Capacitor 插件](/plugins.mdx)——这完全正常！您完全可以在应用中直接编写能被 WebView 调用的原生代码。

## WebView 可访问的原生代码

在 JavaScript 和原生代码之间通信最简单的方式是构建一个专属于您应用的 Capacitor 插件。

### 创建 `EchoPlugin.swift`

首先，请按照以下步骤创建 `EchoPlugin.swift` 文件：
1. [在 Xcode 中打开项目](/main/ios/index.md#opening-the-ios-project)
2. 右键点击 **App** 分组（位于 **App** 目标下）
3. 从上下文菜单中选择 **New File...**
4. 在弹出窗口中选择 **Swift File**
5. 创建文件

![在 Xcode 中创建 Swift 文件](../../../../static/img/v4/docs/ios/xcode-new-swift-file.png)

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

> 注意：`@objc` 装饰器是必需的，它能确保 Capacitor 运行时（需要使用 Objective-C 实现动态插件支持）能够识别这个类。

### 注册插件

我们需要在 iOS 和 Web 两端都注册自定义插件，这样 Capacitor 才能在 Swift 和 JavaScript 之间建立桥梁。

#### 创建 `EchoPlugin.m`

使用相同方法在 Xcode 中创建 `EchoPlugin.m` 文件，但在窗口中选择 **Objective-C**，保持 **File Type** 为 **Empty File**。如果 Xcode 提示创建桥接头文件，请点击 **Create Bridging Header**。

> 建议使用 Xcode 创建原生文件，这能确保项目引用被正确添加。
>
> 这些项目文件的变更应该与新文件本身一同提交到您的代码库。

将以下 Objective-C 代码复制到 `EchoPlugin.m` 中：

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
    CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

> 这些 Objective-C 宏会将您的插件注册到 Capacitor 中，使 `EchoPlugin` 及其 `echo` 方法可在 JavaScript 中使用。当您在 `EchoPlugin.swift` 中添加或移除方法时，必须同步更新此文件。

#### JavaScript 实现

在 JavaScript 中，我们使用 `@capacitor/core` 的 `registerPlugin()` 方法来创建一个与 Swift 插件关联的对象。

```typescript
import { registerPlugin } from '@capacitor/core';

const Echo = registerPlugin('Echo');

export default Echo;
```

> `registerPlugin()` 的第一个参数是插件名称，必须与 `EchoPlugin.m` 中 `CAP_PLUGIN` 宏的第二个参数保持一致。

**TypeScript 类型定义**

我们可以通过定义接口来为关联对象添加类型约束：

```diff
 import { registerPlugin } from '@capacitor/core';

+export interface EchoPlugin {
+  echo(options: { value: string }): Promise<{ value: string }>;
+}

-const Echo = registerPlugin('Echo');
+const Echo = registerPlugin<EchoPlugin>('Echo');

 export default Echo;
```

`registerPlugin()` 的泛型参数定义了关联对象的结构。如果需要，您可以使用 `registerPlugin<any>('Echo')` 来忽略类型检查。我们不会因此评判您。❤️

### 使用插件

使用导出的 `Echo` 对象来调用插件方法。以下代码片段将在 iOS 上调用 Swift 代码并打印结果：

```typescript
import Echo from '../path/to/echo-plugin';

const { value } = await Echo.echo({ value: 'Hello World!' });
console.log('来自原生代码的响应:', value);
```

### 后续步骤

[阅读 iOS 插件开发指南 &#8250;](/plugins/creating-plugins/ios-guide.md)