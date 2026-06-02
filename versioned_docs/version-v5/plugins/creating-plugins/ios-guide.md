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

为 iOS 构建 Capacitor 插件需要编写 Swift（或 Objective-C）来与 Apple 的 iOS SDK 交互。

## 开始入门

首先，按照插件指南的[入门](/plugins/creating-plugins/overview.md)部分中所示生成一个插件。

接下来，在 Xcode 中打开 `echo/ios/Plugin.xcworkspace`。然后导航到您插件的 .swift 文件。

例如，对于插件类名为 `Echo` 的插件，您应该打开 `EchoPlugin.swift`。

## 插件基础

一个用于 iOS 的 Capacitor 插件是一个简单的 Swift 类，它继承 `CAPPlugin` 并
有一些可以从 JavaScript 调用的导出方法。

### 简单示例

在生成的示例中，有一个简单的 echo 插件，其中包含一个 `echo` 函数，它只是返回给它的值。

这个示例展示了 Capacitor 插件的几个核心组件：从插件调用中接收数据，
以及将数据返回给调用者：

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

每个插件方法都会收到一个 `CAPPluginCall` 实例，其中包含来自客户端的插件方法调用的所有信息。

客户端可以发送任何可 JSON 序列化的数据，例如数字、文本、布尔值、对象和数组。这些数据
可以通过调用实例的 `options` 字段访问，或者使用便捷方法如 `getString` 或 `getObject` 访问。传递和访问其中一些值有一些需要注意的特殊性，[单独讨论](/main/reference/core-apis/data-types.md#ios)。

例如，以下是获取传递给方法的数据的方式：

```swift
@objc func storeContact(_ call: CAPPluginCall) {
  let name = call.getString("yourName") ?? "默认名称"
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

注意在 `CAPPluginCall` 实例上访问数据的各种方式，包括如何使用 `guard` 来要求选项。

### 返回数据

一个插件调用可以成功或失败。插件调用借用了 JavaScript Promise 的方法名称：调用 `resolve()` 表示成功（可选地返回数据），使用 `reject()` 表示失败并附带错误消息。

`CAPPluginCall` 的 `resolve()` 方法接受一个字典，并支持 JSON 可序列化的数据类型。以下是一个将数据返回给客户端的示例：

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

要使调用失败或拒绝，调用 `reject()`，传入错误字符串，并可选择传入错误码和 `Error` 实例：

```swift
call.reject(error.localizedDescription, nil, error)
```

### 在插件加载时运行代码

有时，插件可能需要在首次加载时运行一些代码。例如，这是设置任何 Notification Center 事件处理程序的好地方。

为此，请提供 `load()` 方法的实现：

```swift
override public func load() {
}
```

### 导出到 Capacitor

为了确保 Capacitor 能够看到您的插件，插件生成器做两件事：将您的 Swift 类导出到 Objective-C，并使用提供的 Capacitor Objective-C 宏注册它。

要将您的 Swift 类导出到 Objective-C，插件生成器在您的 Swift 类上方添加 `@objc(EchoPlugin)`，并在 `echo` 方法前添加 `@objc`。

要注册插件，插件生成器创建一个与您的插件对应的 `.m` 扩展名的文件（例如 `EchoPlugin.m`），并使用 `CAP_PLUGIN` 注册插件，使用 `CAP_PLUGIN_METHOD` 宏注册 `echo` 方法。

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

这使得 `Echo` 插件和 `echo` 方法对 Capacitor Web 运行时可用，并向 Capacitor 指示 echo 方法将返回一个 Promise。

要向插件添加更多方法，在 `.swift` 插件类中使用 `@objc` 关键字创建它们，并在 `.m` 文件中添加一个新的 `CAP_PLUGIN_METHOD` 条目。

## 权限

如果您的插件在 iOS 上的功能需要最终用户的权限，那么您需要实现权限模式。

在遵循此部分之前，请确保您已设置好权限别名和状态接口。如果尚未设置，请参阅 [Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

### 实现权限

将 `checkPermissions()` 和 `requestPermissions()` 方法添加到您的 Swift 插件类中。

```diff
 import Capacitor

 @objc(EchoPlugin)
 public class EchoPlugin: CAPPlugin {
     ...

+    @objc override public func checkPermissions(_ call: CAPPluginCall) {
+        // 待实现
+    }

+    @objc override public func requestPermissions(_ call: CAPPluginCall) {
+        // 待实现
+    }
 }
```

#### `checkPermissions()`

此方法应返回插件中权限的当前状态，这应该是一个匹配您定义的[权限状态定义](/plugins/creating-plugins/web-guide.md#permission-status-definitions)结构的字典。通常，这些信息可以直接从您使用的框架中获得。

在下面的示例中，我们将定位服务的当前授权状态映射为权限状态，并将 `location` 别名与该状态关联。

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
```

#### `requestPermissions()`

**基于 Block 的 API**

如果框架支持基于 block 的 API 来请求权限，可以在单个方法内完成操作。

在下面的示例中，我们从 `AVCaptureDevice` 请求视频访问权限，然后使用我们自己的 `checkPermissions` 方法检查权限的当前状态，然后完成调用。

```swift
@objc override func requestPermissions(_ call: CAPPluginCall) {
    AVCaptureDevice.requestAccess(for: .video) { [weak self] _ in
        self?.checkPermissions(call)
    }
}
```

**基于 Delegate 的 API**

如果框架使用 delegate（或回调）API，完成操作意味着需要先保存原始调用，然后在回调被调用时再检索它。

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

**多种权限**

当需要多种类型的权限时，[DispatchGroup](https://developer.apple.com/documentation/dispatch/dispatchgroup) 是一种便捷的方式来同步多个调用。

```swift
let store = CNContactStore()

@objc override func requestPermissions(_ call: CAPPluginCall) {
    // 获取要检查的权限，默认为全部
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

在大多数情况下，插件方法被调用来执行任务并可以立即完成。但有些情况下，您需要保持插件调用可用以便稍后访问。您可能希望这样做来定期返回数据，例如流式传输实时地理位置数据，或执行异步任务。

有关如何持久化插件调用的更多详细信息，请参阅[此保存插件调用指南](/main/reference/core-apis/saving-calls.md)。

## 错误处理

### 不可用

此错误可以抛出以指示该功能目前无法使用，通常是因为它需要更新的 iOS 版本。

```swift
@objc override func methodThatUsesNewIOSFramework(_ call: CAPPluginCall) {
    if #available(iOS 14, *) {
        // 待实现
    } else {
        call.unavailable("在 iOS 13 或更早版本上不可用。")
    }
}
```

> 建议尽可能优雅地降级旧版 API 的体验。谨慎使用 `unavailable`。

### 未实现

使用此错误来表示某个方法无法在 iOS 上实现。

```swift
@objc override func methodThatRequiresAndroid(_ call: CAPPluginCall) {
    call.unimplemented("未在 iOS 上实现。")
}
```

## 插件事件

插件可以触发自己的事件，您可以通过向插件对象添加监听器来监听这些事件，如下所示：

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent 被触发了');
});
```

要从 Swift 插件类触发事件：

```swift
self.notifyListeners("myPluginEvent", data: [:])
```

要从插件对象移除监听器：

```typescript
import { MyPlugin } from 'my-plugin';

const myPluginEventListener = await MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent 被触发了');
  },
);

myPluginEventListener.remove();
```

> 也可以在 `window` 上触发全局事件。请参阅 [`triggerJSEvent`](/main/reference/core-apis/ios.md#triggerjsevent) 的文档。

## 呈现原生界面

您可以通过使用 [Capacitor 的 `UIViewController`](/main/reference/core-apis/ios.md#viewcontroller) 在应用上呈现原生界面。

## 覆盖导航

Capacitor 插件可以覆盖 WebView 的导航。为此，插件可以重写 `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` 方法。
返回 `true` 会使 WebView 中止加载 URL。
返回 `false` 会使 WebView 继续加载 URL。
返回 `nil` 将遵循 Capacitor 的默认策略。

## 高级配置

Capacitor iOS 插件是 CocoaPods 库，因此要添加依赖项、必需的框架或任何其他高级配置，您必须编辑插件生成器创建的 `.podspec` 文件，请查阅 [podspec 参考](https://guides.cocoapods.org/syntax/podspec.html) 查看所有可能的选项。
