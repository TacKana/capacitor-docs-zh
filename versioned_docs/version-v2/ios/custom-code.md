---
title: Custom Native iOS Code
description: 自定义原生 iOS 代码
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios/custom-code
---

# 自定义原生 iOS 代码

许多应用希望添加自定义的 Swift（或 Objective-C）代码来实现原生功能，但又不想承担构建和发布正式 Capacitor 插件的额外开销。

我们强烈推荐使用 Swift 来构建插件，因为 iOS 生态已经拥抱了 Swift，你能更容易地找到帮助和开发者，但 Objective-C 也同样适用。

根据你的代码是否需要从 WebView 访问，有两种添加自定义代码的方式：

## WebView 可访问的原生代码

构建需要在 WebView 中访问的自定义原生代码最简单的方法，就是为其构建一个本地的 Capacitor 插件。这种情况下，构建插件就像创建一个新类并在 Capacitor 中注册它一样简单。

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

`@objc` 装饰器是必需的，以确保 Capacitor 运行时（必须使用 Obj-C 来支持动态插件）能够看到它。

接下来，你需要创建一个与你的插件对应的新 Objective-C 文件（扩展名为 `.m`，_不是_ `.h`！），例如 `MyPlugin.m`。重要提示：你_必须_使用 Xcode 中的 "New File" 对话框来完成此操作。然后 Xcode 会提示你创建桥接头文件（Bridging Header），你应该选择创建。

最后，通过将所需的 Capacitor 插件宏添加到新的 `.m` 文件中来注册插件：

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(MyPlugin, "MyPlugin",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

这使得 `MyPlugin` 及其 `echo` 方法对 Capacitor Web 运行时可用，可以像这样使用：

```typescript
import { Plugins } from '@capacitor/core';
const { MyPlugin } = Plugins;

const result = await MyPlugin.echo({ value: 'Hello World!' });
console.log(result.value);
```

## 私有原生代码

如果你的代码不需要从 WebView 访问，那么只需将代码添加到任何需要的地方。使用 Capacitor，你可以完全控制你的原生项目。

需要在 `AppDelegate` 中添加新的事件处理程序？直接添加即可！Capacitor 不会干扰你的代码。

<span id="register-the-plugin"></span>

<span id="register-the-plugin"></span>

<span id="register-the-plugin"></span>

<span id="register-the-plugin"></span>

<span id="register-the-plugin"></span>
