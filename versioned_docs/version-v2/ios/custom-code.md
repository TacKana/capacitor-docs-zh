---
title: 自定义原生 iOS 代码
description: 自定义原生 iOS 代码
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios/custom-code
---

# 自定义原生 iOS 代码

许多应用希望添加自定义 Swift（或 Objective-C）代码来实现原生功能，而不需要构建和发布完整的 Capacitor 插件的开销。

我们强烈建议使用 Swift 构建插件，因为 iOS 生态系统已经广泛采用 Swift，您将更容易找到帮助和开发者，但 Objective-C 也同样适用。

根据您是否需要从 WebView 访问这些代码，有两种添加自定义代码的方式：

## WebView 可访问的原生代码

构建需要从 WebView 访问的自定义原生代码最简单的方法是
为其构建一个本地 Capacitor 插件。在这种情况下，构建插件就像构建一个新类
并将其注册到 Capacitor 一样简单。

`MyPlugin.swift`

```swift
import Capacitor

@objc(MyPlugin)
public class MyPlugin: CAPPlugin {
  @objc func echo(_ call: CAPPluginCall) {
    let value = call.getString("value") ?? ""
    call.success([
        "value": value
    ])
  }
}
```

`@objc` 装饰器是必需的，以确保 Capacitor 的运行时（必须使用 Obj-C 以获得动态插件支持）能够看到它。

接下来，您需要创建一个与您的插件对应的新 Objective-C 文件（使用 `.m` 扩展名，_不是_ `.h`！）（例如 `MyPlugin.m`）。重要提示：您 _必须_ 使用 Xcode 中的 New File 对话框来完成此操作。然后，Xcode 会提示您创建一个 Bridging Header，您应该同意创建。

最后，通过将所需的 Capacitor 插件宏添加到您的新 `.m` 文件中来注册插件：

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(MyPlugin, "MyPlugin",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

这使得 `MyPlugin` 及其 `echo` 方法对 Capacitor Web 运行时可用，如下所示：

```typescript
import { Plugins } from '@capacitor/core';
const { MyPlugin } = Plugins;

const result = await MyPlugin.echo({ value: 'Hello World!' });
console.log(result.value);
```

## 私有原生代码

如果您的代码不需要从 WebView 访问，那么只需将代码添加到任何需要的位置即可。使用 Capacitor，您可以完全
控制您的原生项目。

需要在 `AppDelegate` 中添加新的事件处理程序？直接添加即可！Capacitor 不会触碰您的代码。