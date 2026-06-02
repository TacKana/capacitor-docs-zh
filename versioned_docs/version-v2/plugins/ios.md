---
title: Capacitor iOS 插件指南
description: Capacitor iOS 插件指南
translated: true
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/plugins/ios
---

# Capacitor iOS 插件指南

构建适用于 iOS 的 Capacitor 插件需要编写 Swift（或 Objective-C）代码来与 Apple 的 iOS SDK 进行交互。

Capacitor 采用标准的 iOS 开发工具来构建 iOS 插件。我们相信直接使用 Swift（或 Objective-C）可以更轻松地利用 Stack Overflow 上的现有解决方案、与现有的原生开发者共享成果，并能在平台功能发布后立即使用。

## 入门

首先，按照插件指南的[入门](/plugins.md)部分所述生成一个插件。

然后，在 Xcode 中打开 `your-plugin/ios/Plugin.xcworkspace`。

## 使用 Swift 构建插件

一个适用于 iOS 的 Capacitor 插件是一个简单的 Swift 类，它继承自 `CAPPlugin`，并包含一些可以从 JavaScript 调用的导出方法。

插件生成后，你可以通过打开 `Plugin.swift` 开始编辑。

### 简单示例

在生成的示例中，有一个简单的 echo 插件，其中包含一个 `echo` 函数，该函数简单地返回传递给它的值。

这个示例展示了 Capacitor 插件的几个核心组件：从 Plugin Call 接收数据，以及将数据返回给调用者。

`Plugin.swift`

```swift
import Capacitor

@objc(MyPlugin)
public class MyPlugin: CAPPlugin {
  @objc override public func load() {
    // Called when the plugin is first constructed in the bridge
  }

  @objc func echo(_ call: CAPPluginCall) {
    let value = call.getString("value") ?? ""
    call.resolve([
        "value": value
    ])
  }
}
```

### 访问调用数据

每个插件方法都会收到一个 `CAPPluginCall` 实例，其中包含客户端调用插件方法的所有信息。

客户端可以发送任何可 JSON 序列化的数据，例如数字、文本、布尔值、对象和数组。这些数据可以通过调用实例的 `options` 字段访问，或使用 `getString`、`getObject` 等便捷方法访问。

例如，以下是如何获取传递给方法的数据：

```swift
@objc func storeContact(_ call: CAPPluginCall) {
  let name = call.getString("yourName") ?? "default name"
  let address = call.getObject("address") ?? [:]
  let isAwesome = call.getBool("isAwesome") ?? false

  guard let id = call.options["id"] as? String else {
    call.reject("Must provide an id")
    return
  }

  // ...

  call.resolve()
}
```

注意 `CAPPluginCall` 实例上各种数据访问方式，包括如何使用 `guard` 来要求某些选项必须存在。

### 返回数据

插件调用可以成功或失败。对于使用 Promise（最常见）的调用，成功对应调用 Promise 的 `resolve`，失败对应调用 `reject`。对于使用回调的调用，成功会调用成功回调，失败则调用错误回调。

`CAPPluginCall` 的 `resolve` 方法接受一个字典，支持 JSON 可序列化的数据类型。以下是将数据返回给客户端的示例：

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

要使调用失败或拒绝，调用 `call.reject`，传入错误字符串和（可选的）`Error` 实例及额外数据：

```swift
call.reject(error.localizedDescription, error, [
  "item1": true
])
```

### 添加初始化逻辑

插件可以重写 `load` 方法，在插件首次初始化时运行一些代码：

```java
@objc(MyPlugin)
public class MyPlugin: CAPPlugin {
  @objc override public func load() {
    // Called when the plugin is first constructed in the bridge
  }
}
```

### 呈现原生界面

要在 Capacitor 界面上呈现原生界面，我们需要访问 Capacitor 的 View Controller。要访问 Capacitor 的 View Controller，我们需要使用 `CAPPlugin` 类上可用的 `CAPBridge` 对象。

我们可以使用 `UIViewController` 在其上呈现原生 View Controller，如下所示：

```swift
DispatchQueue.main.async {
  self.bridge.viewController.present(ourCustomViewController, animated: true, completion: nil)
}
```

使用 `DispatchQueue.main.async` 可以使你的视图在主线程而非后台线程渲染。省略此调用可能导致意外结果。

在 iPad 设备上，你还可以呈现 `UIPopovers`。为此，我们提供了一个辅助函数来居中显示它。

```swift
self.setCenteredPopover(ourCustomViewController)
self.bridge.viewController.present(ourCustomViewController, animated: true, completion: nil)
```

### 事件

Capacitor 插件可以触发应用事件和插件事件。

#### 应用事件

应用事件是常规的 JavaScript 事件，如 `window` 或 `document` 事件。

Capacitor 提供了以下所有函数来触发事件：

```swift

// 如果你想指定目标
self.bridge.triggerJSEvent(eventName: "myCustomEvent", target: "window")

self.bridge.triggerJSEvent(eventName: "myCustomEvent", target: "document", data: "{ 'dataKey': 'dataValue' }")

// Window 事件
self.bridge.triggerWindowJSEvent(eventName: "myCustomEvent")

self.bridge.triggerWindowJSEvent(eventName: "myCustomEvent", data: "{ 'dataKey': 'dataValue' }")

// Document 事件
self.bridge.triggerDocumentJSEvent(eventName: "myCustomEvent")

self.bridge.triggerDocumentJSEvent(eventName: "myCustomEvent", data: "{ 'dataKey': 'dataValue' }")
```

然后使用常规 JavaScript 来监听：

```typescript
window.addEventListener('myCustomEvent', function () {
  console.log('myCustomEvent was fired');
});
```

注意：`data` 必须是序列化的 JSON 字符串值。

#### 插件事件

插件可以触发自己的事件，你可以通过为插件对象附加监听器来监听这些事件，如下所示：

```typescript
Plugins.MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent was fired');
});
```

从 Swift 插件类触发事件的方式如下：

`self.notifyListeners("myPluginEvent", data: [:])`

从插件对象移除监听器：

```typescript
const myPluginEventListener = Plugins.MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent was fired');
  },
);

myPluginEventListener.remove();
```

### 重写导航

Capacitor 插件可以重写 WebView 导航。为此，插件可以重写 `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` 方法。返回 `true` 会使 WebView 中止加载 URL。返回 `false` 会使 WebView 继续加载 URL。返回 `nil` 将遵循 Capacitor 的默认策略。

### 导出到 Capacitor

为了确保 Capacitor 能够识别你的插件，你必须做两件事：将你的 Swift 类导出到 Objective-C，并使用提供的 Capacitor Objective-C 宏进行注册。

要将 Swift 类导出到 Objective-C，请确保在你的 Swift 类上方添加 `@objc(MyPlugin)`，并在任何插件方法前添加 `@objc`，如上所示。

要使用 Capacitor 注册你的插件，你需要创建一个新的 Objective-C 文件（扩展名为 `.m`，而不是 `.h`！）对应你的插件（例如 `MyPlugin.m`），并使用 Capacitor 宏注册插件及其每个方法。重要提示：你必须使用 Xcode 中的 New File 对话框来完成此操作。然后 Xcode 会提示你创建 Bridging Header，这是必须做的。

最后，通过将所需的 Capacitor 插件宏添加到新的 `.m` 文件中来注册插件：

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(MyPlugin, "MyPlugin",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

这将使 `MyPlugin` 和 `echo` 方法对 Capacitor Web 运行时可用，并告知 Capacitor 该 echo 方法将返回一个 Promise。
