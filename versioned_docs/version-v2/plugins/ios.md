---
title: Capacitor iOS 插件开发指南
description: Capacitor iOS 插件开发指南
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/plugins/ios
---

# Capacitor iOS 插件开发指南

开发 Capacitor iOS 插件需要使用 Swift（或 Objective-C）与苹果 iOS SDK 进行交互。

Capacitor 采用标准 iOS 开发工具来构建插件。我们相信直接使用 Swift（或 Objective-C）能带来以下优势：更方便地使用 Stack Overflow 上的现有解决方案，与原生开发者顺畅协作，以及第一时间使用平台新特性。

## 准备工作

首先按照插件指南中的[入门章节](/plugins.md)生成一个插件。

接着用 Xcode 打开 `your-plugin/ios/Plugin.xcworkspace` 文件。

## 使用 Swift 构建插件

Capacitor iOS 插件是一个继承自 `CAPPlugin` 的 Swift 类，通过导出方法使得 JavaScript 可以调用它们。

生成插件后，你可以通过编辑 `Plugin.swift` 开始开发工作。

### 基础示例

生成的示例中包含一个简单的回声插件，其中的 `echo` 方法会原样返回传入的参数。

这个例子展示了 Capacitor 插件的几个核心概念：从插件调用接收数据，以及向调用方返回数据：

`Plugin.swift`

```swift
import Capacitor

@objc(MyPlugin)
public class MyPlugin: CAPPlugin {
  @objc override public func load() {
    // 插件在桥接层首次构建时调用
  }

  @objc func echo(_ call: CAPPluginCall) {
    let value = call.getString("value") ?? ""
    call.resolve([
        "value": value
    ])
  }
}
```

### 获取调用数据

每个插件方法都会收到一个 `CAPPluginCall` 实例，包含客户端调用该方法时的所有信息。

客户端可以发送任何可 JSON 序列化的数据，如数字、文本、布尔值、对象和数组。这些数据可以通过 call 实例的 `options` 字段获取，或使用便捷方法如 `getString` 或 `getObject`。

例如，获取方法参数的方式如下：

```swift
@objc func storeContact(_ call: CAPPluginCall) {
  let name = call.getString("yourName") ?? "默认名称"
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

注意 `CAPPluginCall` 实例提供了多种数据访问方式，包括使用 `guard` 来校验必填参数。

### 返回数据

插件调用可以成功或失败。使用 Promise 的调用（最常见情况）成功时对应 Promise 的 `resolve`，失败时对应 `reject`。使用回调的调用则会分别触发成功或错误回调。

`CAPPluginCall` 的 `resolve` 方法接收字典参数，支持 JSON 可序列化数据类型。返回数据给客户端的示例如下：

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

要使调用失败或拒绝，调用 `call.reject`，传入错误描述、（可选）Error 实例和额外数据：

```swift
call.reject(error.localizedDescription, error, [
  "item1": true
])
```

### 添加初始化逻辑

插件可以重写 `load` 方法来执行初始化代码：

```java
@objc(MyPlugin)
public class MyPlugin: CAPPlugin {
  @objc override public func load() {
    // 插件在桥接层首次构建时调用
  }
}
```

### 显示原生界面

要在 Capacitor 界面上显示原生界面，我们需要访问 Capacitor 的视图控制器。可以通过 `CAPPlugin` 类中的 `CAPBridge` 对象来获取。

使用 `UIViewController` 展示原生视图控制器的示例如下：

```swift
DispatchQueue.main.async {
  self.bridge.viewController.present(ourCustomViewController, animated: true, completion: nil)
}
```

使用 `DispatchQueue.main.async` 确保视图在主线程而非后台线程渲染，避免意外结果。

在 iPad 设备上还可以展示 `UIPopovers`，我们提供了辅助函数使其居中显示：

```swift
self.setCenteredPopover(ourCustomViewController)
self.bridge.viewController.present(ourCustomViewController, animated: true, completion: nil)
```

### 事件机制

Capacitor 插件可以触发应用事件和插件事件。

#### 应用事件

应用事件是常规的 JavaScript 事件，类似于 `window` 或 `document` 事件。

Capacitor 提供以下触发事件的函数：

```swift
// 如需指定目标
self.bridge.triggerJSEvent(eventName: "myCustomEvent", target: "window")

self.bridge.triggerJSEvent(eventName: "myCustomEvent", target: "document", data: "{ 'dataKey': 'dataValue' }")

// 窗口事件
self.bridge.triggerWindowJSEvent(eventName: "myCustomEvent")

self.bridge.triggerWindowJSEvent(eventName: "myCustomEvent", data: "{ 'dataKey': 'dataValue' }")

// 文档事件
self.bridge.triggerDocumentJSEvent(eventName: "myCustomEvent")

self.bridge.triggerDocumentJSEvent(eventName: "myCustomEvent", data: "{ 'dataKey': 'dataValue' }")
```

监听事件只需使用常规 JavaScript 代码：

```typescript
window.addEventListener('myCustomEvent', function () {
  console.log('myCustomEvent was fired');
});
```

注意：`data` 必须是序列化的 JSON 字符串值。

#### 插件事件

插件可以触发专属事件，通过监听插件对象来接收：

```typescript
Plugins.MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent was fired');
});
```

在 Swift 插件类中触发事件的方式：

`self.notifyListeners("myPluginEvent", data: [:])`

移除监听器：

```typescript
const myPluginEventListener = Plugins.MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent was fired');
  },
);

myPluginEventListener.remove();
```

### 重定向导航

Capacitor 插件可以重写 webview 导航行为。插件需要重写 `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` 方法：
- 返回 `true` 中止加载 URL
- 返回 `false` 继续加载 URL
- 返回 `nil` 采用默认 Capacitor 策略

### 导出到 Capacitor

为确保 Capacitor 能识别你的插件，需要完成两个步骤：将 Swift 类导出到 Objective-C，并使用提供的宏进行注册。

导出 Swift 类需要在类定义前添加 `@objc(MyPlugin)`，并在每个插件方法前添加 `@objc` 注解。

注册插件需要新建 Objective-C 文件（扩展名为 `.m` 而非 `.h`），如 `MyPlugin.m`，并使用 Capacitor 宏进行注册。重要提示：必须使用 Xcode 的 New File 对话框创建此文件，并按提示创建 Bridging Header。

最后在新建的 `.m` 文件中添加注册代码：

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(MyPlugin, "MyPlugin",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

这将使 `MyPlugin` 和 `echo` 方法在 Capacitor web 运行时中可用，并声明 echo 方法返回 Promise。