---
title: Capacitor iOS 插件指南
description: Capacitor iOS 插件指南
contributors:
  - mlynch
  - jcesarmobile
sidebar_label: iOS 指南
slug: /plugins/ios
---

# Capacitor iOS 插件指南

为 iOS 构建 Capacitor 插件需要使用 Swift（或 Objective-C）来与苹果的 iOS SDK 进行交互。

## 开始之前

首先，请按照插件指南的[开始使用](/plugins/creating-plugins/overview.md)部分生成一个插件。

接下来，在 Xcode 中打开 `echo/ios/Plugin.xcworkspace`。然后，你需要导航到插件的 .swift 文件。

例如，如果插件的类名是 `Echo`，你应该打开 `EchoPlugin.swift`。

## 插件基础

一个用于 iOS 的 Capacitor 插件是一个简单的 Swift 类，它继承自 `CAPPlugin`，并导出了某些方法，这些方法可以从 JavaScript 中调用。

### 简单示例

在生成的示例中，有一个简单的 echo 插件，其中包含一个 `echo` 函数，它只是返回传入的值。

这个示例展示了 Capacitor 插件的几个核心组成部分：从插件调用（Plugin Call）接收数据，以及将数据返回给调用方：

`EchoPlugin.swift`

```swift
import Capacitor

@objc(EchoPlugin)
public class EchoPlugin: CAPPlugin {
  @objc func echo(_ call: CAPPluginCall) {
    let value = call.getString("value") ?? ""
    call.resolve([
        "value": value
    ])
  }
}
```

### 访问调用数据

每个插件方法都会接收一个 `CAPPluginCall` 实例，其中包含了客户端调用插件方法的所有信息。

客户端可以发送任何能够进行 JSON 序列化的数据，例如数字、文本、布尔值、对象和数组。这些数据可以通过调用实例的 `options` 字段访问，或者使用便捷方法如 `getString` 或 `getObject`。传递和访问其中某些值时需要注意一些特殊事项，具体请参见[单独讨论](/main/reference/core-apis/data-types.md#ios)。

例如，以下是如何获取传递给方法的数据：

```swift
@objc func storeContact(_ call: CAPPluginCall) {
  let name = call.getString("yourName") ?? "default name"
  let address = call.getObject("address") ?? [:]
  let isAwesome = call.getBool("isAwesome") ?? false

  guard let id = call.options["id"] as? String else {
    call.reject("必须提供一个 id")
    return
  }

  // ...

  call.resolve()
}
```

请注意在 `CAPPluginCall` 实例上访问数据的各种方式，包括如何使用 `guard` 来要求必须提供某些选项。

### 返回数据给调用方

一个插件调用可能成功也可能失败。插件调用借鉴了 JavaScript Promise 的方法名：调用 `resolve()` 表示成功（可选择返回数据），使用 `reject()` 表示失败并附带错误信息。

`CAPPluginCall` 的 `resolve()` 方法接受一个字典，并支持 JSON 可序列化的数据类型。以下是将数据返回给客户端的示例：

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

要表示失败或拒绝调用，请调用 `reject()`，并传入一个错误字符串，以及可选的错误代码和 `Error` 实例：

```swift
call.reject(error.localizedDescription, nil, error)
```

### 在插件加载时运行代码

有时，插件可能需要在首次加载时运行一些代码。例如，这是设置任何通知中心事件处理程序的好地方。

为此，请为 `load()` 方法提供一个实现：

```swift
override public func load() {
}
```

### 导出到 Capacitor

为确保 Capacitor 能够识别你的插件，插件生成器会做两件事：将你的 Swift 类导出到 Objective-C，并使用提供的 Capacitor Objective-C 宏进行注册。

要将你的 Swift 类导出到 Objective-C，插件生成器会在你的 Swift 类上方添加 `@objc(EchoPlugin)`，并在 `echo` 方法前添加 `@objc`。

要注册插件，插件生成器会创建一个与你的插件对应的 `.m` 扩展名文件（例如 `EchoPlugin.m`），并使用 `CAP_PLUGIN` 宏注册插件，使用 `CAP_PLUGIN_METHOD` 宏注册 `echo` 方法。

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

这使得 `Echo` 插件及其 `echo` 方法对 Capacitor Web 运行时可用，并向 Capacitor 表明 `echo` 方法将返回一个 Promise。

要向插件添加更多方法，请在 `.swift` 插件类中创建它们，并在 `func` 关键字前加上 `@objc`，然后在 `.m` 文件中添加一个新的 `CAP_PLUGIN_METHOD` 条目。

## 权限

如果你的插件在 iOS 上具有需要最终用户授权的功能，那么你需要实现权限模式。

在遵循本节内容之前，请确保你已经设置了权限别名和状态接口。如果还没有，请参阅 [Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

### 实现权限

将 `checkPermissions()` 和 `requestPermissions()` 方法添加到你的 Swift 插件类中。

```diff
 import Capacitor

 @objc(EchoPlugin)
 public class EchoPlugin: CAPPlugin {
     ...

+    @objc override public func checkPermissions(_ call: CAPPluginCall) {
+        // TODO
+    }

+    @objc override public func requestPermissions(_ call: CAPPluginCall) {
+        // TODO
+    }
 }
```

#### `checkPermissions()`

此方法应返回插件中权限的当前状态，该状态应为一个字典，其结构与你定义的[权限状态定义](/plugins/creating-plugins/web-guide.md#permission-status-definitions)相匹配。通常，这些信息可以直接从你使用的框架中获取。

在下面的示例中，我们将位置服务当前的授权状态映射到一个权限状态，并将 `location` 别名与该状态关联起来。

```swift
@objc override func checkPermissions(_ call: CAPPluginCall) {
    let locationState: String

    switch CLLocationManager.authorizationStatus() {
    case .notDetermined:
        locationState = "prompt"
    case .restricted, .denied:
        locationState = "denied"
    case .authorizedAlways, .authorizedWhenInUse:
        locationState = "granted"
    @unknown default:
        locationState = "prompt"
    }

    call.resolve(["location": locationState])
}
```#### `requestPermissions()`

**基于块的 API**

如果框架支持基于块的权限请求 API，可以在单个方法内完成操作。

在下面的示例中，我们向 `AVCaptureDevice` 请求视频访问权限，然后使用自定义的 `checkPermissions` 方法检查当前权限状态并完成调用。

```swift
@objc override func requestPermissions(_ call: CAPPluginCall) {
    AVCaptureDevice.requestAccess(for: .video) { [weak self] _ in
        self?.checkPermissions(call)
    }
}
```

**基于代理的 API**

如果框架使用代理（或回调）API，完成操作意味着需要保存原始调用，并在回调触发时重新获取。

```swift
var permissionCallID: String?
var locationManager: CLLocationManager?

@objc override func requestPermissions(_ call: CAPPluginCall) {
    if let manager = locationManager, CLLocationManager.locationServicesEnabled() {
        if CLLocationManager.authorizationStatus() == .notDetermined {
            bridge?.saveCall(call)
            permissionCallID = call.callbackId
            manager.requestWhenInUseAuthorization()
        } else {
            checkPermissions(call)
        }
    } else {
        call.reject("定位服务已禁用")
    }
}

public func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
    if let callID = permissionCallID, let call = bridge?.getSavedCall(callID) {
        checkPermissions(call)
        bridge?.releaseCall(call)
    }
}
```

**多重权限请求**

当需要多种权限时，使用 [DispatchGroup](https://developer.apple.com/documentation/dispatch/dispatchgroup) 可以方便地同步多个调用。

```swift
let store = CNContactStore()

@objc override func requestPermissions(_ call: CAPPluginCall) {
    // 获取需要检查的权限类型，默认为全部类型
    var permissions = call.getArray("types", String.self) ?? []
    if permissions.isEmpty {
        permissions = ["contacts", "camera"]
    }

    let group = DispatchGroup()
    if permissions.contains("contacts") {
        group.enter()
        store.requestAccess(for: .contacts) { (_, _) in
            group.leave()
        }
    }
    if permissions.contains("camera") {
        group.enter()
        AVCaptureDevice.requestAccess(for: .video) { _ in
            group.leave()
        }
    }
    group.notify(queue: DispatchQueue.main) {
        self.checkPermissions(call)
    }
}
```

### 持久化插件调用

大多数情况下，插件方法被调用执行任务后可以立即结束。但在某些场景中，需要保持插件调用可用以便后续访问。例如周期性返回数据（如实时地理位置流）或执行异步任务时。

关于如何持久化插件调用的详细信息，请参阅[保存插件调用指南](/main/reference/core-apis/saving-calls.md)。

## 错误处理

### 功能不可用

当功能当前无法使用时（通常是因为需要更高版本的 iOS），可以抛出此错误。

```swift
@objc override func methodThatUsesNewIOSFramework(_ call: CAPPluginCall) {
    if #available(iOS 14, *) {
        // TODO 具体实现
    } else {
        call.unavailable("iOS 13 及更早版本不支持此功能。")
    }
}
```

> 建议尽可能通过旧版 API 实现优雅降级。谨慎使用 `unavailable` 方法。

### 未实现功能

当某个方法无法在 iOS 平台上实现时，使用此错误。

```swift
@objc override func methodThatRequiresAndroid(_ call: CAPPluginCall) {
    call.unimplemented("iOS 平台未实现此功能。")
}
```

## 插件事件

插件可以触发自定义事件，你可以通过为插件对象添加监听器来接收这些事件：

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent 事件已触发');
});
```

在 Swift 插件类中触发事件：

```swift
self.notifyListeners("myPluginEvent", data: [:])
```

移除插件对象的监听器：

```typescript
import { MyPlugin } from 'my-plugin';

const myPluginEventListener = await MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent 事件已触发');
  },
);

myPluginEventListener.remove();
```

> 也可以在 `window` 对象上触发全局事件。详见 [`triggerJSEvent`](/main/reference/core-apis/ios.md#triggerjsevent) 文档。

## 显示原生页面

可以使用 [Capacitor 的 `UIViewController`](/main/reference/core-apis/ios.md#viewcontroller) 在应用上方显示原生页面。

## 重写导航

Capacitor 插件可以重写 WebView 导航行为。插件可以重写 `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` 方法：
- 返回 `true` 将中止 WebView 加载 URL
- 返回 `false` 将继续加载 URL
- 返回 `nil` 将使用默认的 Capacitor 策略

## 高级配置

Capacitor iOS 插件本质上是 CocoaPods 库，因此添加依赖、所需框架或其他高级配置时，需要编辑插件生成器创建的 `.podspec` 文件。查看 [podspec 参考文档](https://guides.cocoapods.org/syntax/podspec.html) 了解所有可用选项。