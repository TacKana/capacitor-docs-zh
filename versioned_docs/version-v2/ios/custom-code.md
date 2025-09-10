---
title: 自定义原生 iOS 代码
description: 自定义原生 iOS 代码
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios/custom-code
---

# 自定义原生 iOS 代码

许多应用需要添加自定义 Swift（或 Objective-C）代码来实现原生功能，但又不想承担构建和发布完整 Capacitor 插件的开销。

我们强烈推荐使用 Swift 构建插件，因为 iOS 生态已全面拥抱 Swift，更容易找到帮助和开发者，当然 Objective-C 也同样适用。

根据是否需要从 WebView 访问代码，有两种添加自定义代码的方式：

## WebView 可访问的原生代码

要为 WebView 构建可访问的自定义原生代码，最简单的方式是创建本地 Capacitor 插件。这种情况下，只需新建一个类并在 Capacitor 中注册即可。

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

`@objc` 装饰器确保 Capacitor 运行时（需要使用 Obj-C 实现动态插件支持）能够识别它。

接下来需要创建对应的 Objective-C 文件（扩展名为 `.m`，而不是 `.h`！例如 `MyPlugin.m`）。重要提示：必须使用 Xcode 的新建文件对话框操作，Xcode 会提示创建桥接头文件，请选择创建。

最后通过在新建的 `.m` 文件中添加必要的 Capacitor 插件宏来注册插件：

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(MyPlugin, "MyPlugin",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

这样 `MyPlugin` 和 `echo` 方法就可以在 Capacitor Web 运行时中这样调用：

```typescript
import { Plugins } from '@capacitor/core';
const { MyPlugin } = Plugins;

const result = await MyPlugin.echo({ value: 'Hello World!' });
console.log(result.value);
```

## 私有原生代码

如果代码不需要从 WebView 访问，那么直接在任何需要的地方添加即可。使用 Capacitor 时，您可以完全掌控原生项目。

需要在 `AppDelegate` 中添加新的事件处理程序？直接添加！Capacitor 不会干涉您的代码。