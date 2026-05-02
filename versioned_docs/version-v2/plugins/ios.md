---
title: Capacitor iOS 插件指南
description: Capacitor iOS 插件指南
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/plugins/ios
---

# Capacitor iOS 插件指南

为 iOS 构建 Capacitor 插件需要使用 Swift（或 Objective-C）与苹果的 iOS SDK 进行交互。

Capacitor 采用标准的 iOS 开发工具来构建 iOS 插件。我们相信直接使用 Swift（或 Objective-C）将更容易利用 Stack Overflow 上的现有解决方案，与现有原生开发者共享工作，并在平台功能发布时尽快使用它们。

## 入门指南

首先，按照插件指南中的[入门指南](/plugins.md)部分生成一个插件。

接下来，在 Xcode 中打开 `your-plugin/ios/Plugin.xcworkspace`。

## 使用 Swift 构建插件

iOS 的 Capacitor 插件是一个简单的 Swift 类，它继承 `CAPPlugin` 并包含一些可从 JavaScript 调用的导出方法。

生成插件后，您可以通过打开 `Plugin.swift` 开始编辑它。

### 简单示例

在生成的示例中，有一个简单的 echo 插件，其中包含一个 `echo` 函数，它只是返回接收到的值。

此示例展示了 Capacitor 插件的几个核心组件：从插件调用接收数据，并将数据返回给调用者：

`Plugin.swift`

```swift
import Capacitor

@objc(MyPlugin)
public class MyPlugin: CAPPlugin {
  @objc override public func load() {
    // 当插件在桥接器中首次构造时调用
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

每个插件方法都会接收一个 `CAPPluginCall` 实例，其中包含从客户端调用插件方法的所有信息。

客户端可以发送任何可以 JSON 序列化的数据，例如数字、文本、布尔值、对象和数组。这些数据可以通过调用实例的 `options` 字段访问，或者使用 `getString` 或 `getObject` 等便捷方法。

例如，以下是如何获取传递给方法的数据：

```swift
@objc func storeContact(_ call: CAPPluginCall) {
  let name = call.getString("yourName") ?? "default name"
  let address = call.getObject("address") ?? [:]
  let isAwesome = call.getBool("isAwesome") ?? false

  guard let id = call.options["id"] as? String else {
    call.reject("必须提供 id")
    return
  }

  // ...

  call.resolve()
}
```

请注意在 `CAPPluginCall` 实例上访问数据的各种方式，包括如何使用 `guard` 要求必需选项。

### 返回数据

插件调用可以成功或失败。对于使用 Promise 的调用（最常见），成功对应于调用 Promise 的 `resolve`，失败则调用 `reject`。对于使用回调的调用，成功将调用成功回调，失败则调用错误回调。

`CAPPluginCall` 的 `resolve` 方法接受一个字典并支持 JSON 可序列化的数据类型。以下是将数据返回给客户端的示例：

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

要使调用失败或拒绝，请调用 `call.reject`，传入错误字符串，（可选）`Error` 实例以及额外数据：

```swift
call.reject(error.localizedDescription, error, [
  "item1": true
])
```

### 添加初始化逻辑

插件可以重写 `load` 方法，以便在插件首次初始化时运行一些代码：

```java
@objc(MyPlugin)
public class MyPlugin: CAPPlugin {
  @objc override public func load() {
    // 当插件在桥接器中首次构造时调用
  }
}
```

### 呈现原生界面

要在 Capacitor 界面上呈现原生界面，我们需要访问 Capacitor 的视图控制器。要访问 Capacitor 的视图控制器，我们可以使用 `CAPPlugin` 类中可用的 `CAPBridge` 对象。

我们可以使用 `UIViewController` 像这样在其上呈现原生视图控制器：

```swift
DispatchQueue.main.async {
  self.bridge.viewController.present(ourCustomViewController, animated: true, completion: nil)
}
```

使用 `DispatchQueue.main.async` 确保您的视图在主线程而不是后台线程中渲染。移除这行代码可能导致意外结果。

在 iPad 设备上，您还可以呈现 `UIPopovers`。为此，我们提供了一个辅助函数来将其居中显示：

```swift
self.setCenteredPopover(ourCustomViewController)
self.bridge.viewController.present(ourCustomViewController, animated: true, completion: nil)
```

### 事件

Capacitor 插件可以触发应用事件和插件事件。

#### 应用事件

应用事件是常规的 JavaScript 事件，类似于 `window` 或 `document` 事件。

Capacitor 提供了以下所有函数来触发事件：

```swift

// 如果您想指定目标
self.bridge.triggerJSEvent(eventName: "myCustomEvent", target: "window")

self.bridge.triggerJSEvent(eventName: "myCustomEvent", target: "document", data: "{ 'dataKey': 'dataValue' }")

// 窗口事件
self.bridge.triggerWindowJSEvent(eventName: "myCustomEvent")

self.bridge.triggerWindowJSEvent(eventName: "myCustomEvent", data: "{ 'dataKey': 'dataValue' }")

// 文档事件
self.bridge.triggerDocumentJSEvent(eventName: "myCustomEvent")

self.bridge.triggerDocumentJSEvent(eventName: "myCustomEvent", data: "{ 'dataKey': 'dataValue' }")
```

要监听这些事件，只需使用常规的 JavaScript：

```typescript
window.addEventListener('myCustomEvent', function () {
  console.log('myCustomEvent was fired');
});
```

注意：`data` 必须是序列化的 JSON 字符串值。

#### 插件事件

插件可以触发自己的事件，您可以通过向插件对象附加监听器来监听，如下所示：

```typescript
Plugins.MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent was fired');
});
```

要从 Swift 插件类触发事件，可以这样做：

`self.notifyListeners("myPluginEvent", data: [:])`

要从插件对象移除监听器：

```typescript
const myPluginEventListener = Plugins.MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent was fired');
  },
);

myPluginEventListener.remove();
```

### 覆盖导航

Capacitor 插件可以覆盖 WebView 导航。为此，插件可以重写 `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` 方法。
返回 `true` 会导致 WebView 中止加载 URL。
返回 `false` 会导致 WebView 继续加载 URL。
返回 `nil` 将遵循 Capacitor 的默认策略。### 导出到 Capacitor

为确保 Capacitor 能够识别您的插件，您需要完成两项操作：将 Swift 类导出到 Objective-C，并使用 Capacitor 提供的 Objective-C 宏进行注册。

要将 Swift 类导出到 Objective-C，请确保在您的 Swift 类上方添加 `@objc(MyPlugin)` 注解，并在所有插件方法前添加 `@objc` 标记，如上文所示。

要在 Capacitor 中注册您的插件，您需要创建一个与插件对应的新 Objective-C 文件（使用 `.m` 扩展名，而非 `.h`！），例如 `MyPlugin.m`，并使用 Capacitor 宏来注册插件及其每个方法。重要提示：您必须通过 Xcode 的 "New File" 对话框来完成此操作。随后 Xcode 会提示您创建桥接头文件，这一步必须执行。

最后，将所需的 Capacitor 插件宏添加到新的 `.m` 文件中以完成插件注册：

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(MyPlugin, "MyPlugin",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

这将使 `MyPlugin` 和 `echo` 方法在 Capacitor Web 运行时中可用，并向 Capacitor 表明 `echo` 方法将返回一个 Promise。

<span id="error-handling"></span>
<span id="export-to-capacitor"></span>
<span id="plugin-events"></span>

<span id="error-handling"></span>
<span id="export-to-capacitor"></span>
<span id="plugin-events"></span>

<span id="error-handling"></span>
<span id="export-to-capacitor"></span>
<span id="plugin-events"></span>

<span id="error-handling"></span>
<span id="export-to-capacitor"></span>
<span id="plugin-events"></span>

<span id="error-handling"></span>
<span id="export-to-capacitor"></span>
<span id="plugin-events"></span>
