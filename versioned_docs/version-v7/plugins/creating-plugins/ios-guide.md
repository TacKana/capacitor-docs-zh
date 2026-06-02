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

为 iOS 构建 Capacitor 插件涉及编写 Swift（或 Objective-C）代码以与 Apple 的 iOS SDK 交互。

## 开始之前

首先，按照插件指南的[开始之前](/plugins/creating-plugins/overview.md)部分所述生成一个插件。

接下来，在 Xcode 中打开 `Package.swift`。然后导航到你插件的 .swift 文件。

例如，对于插件类名为 `EchoPlugin` 的插件，你应该打开 `ios/Sources/EchoPlugin/EchoPlugin.swift` 和 `ios/Sources/EchoPlugin/Echo.swift`。

## 插件基础

Capacitor iOS 插件有两个简单的 Swift 类，一个是继承自 `NSObject` 的实现类，你应该在其中放置插件逻辑；另一个继承自 `CAPPlugin` 和 `CAPBridgedPlugin`，具有一些将从 JavaScript 调用的导出方法，并封装实现方法。

### 简单示例

在生成的示例中，有一个简单的 echo 插件，其中包含一个 `echo` 函数，该函数简单地返回它接收到的值。

此示例演示了 Capacitor 插件的几个核心组件：从插件调用中接收数据，以及将数据返回给调用者：

`Echo.swift`

```swift
import Foundation

@objc public class Echo: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
```

`EchoPlugin.swift`

```swift
import Foundation
import Capacitor

@objc(EchoPlugin)
public class EchoPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "EchoPlugin"
    public let jsName = "Echo"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = Echo()

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
}
```

### 访问调用数据

每个插件方法都会接收一个 `CAPPluginCall` 实例，其中包含客户端调用插件方法的所有信息。

客户端可以发送任何可以 JSON 序列化的数据，例如数字、文本、布尔值、对象和数组。这些数据可以通过调用实例的 `options` 字段访问，或者使用便捷方法如 `getString` 或 `getObject` 访问。传递和访问这些值中的一些具有需要注意的特殊性，[单独讨论](/main/reference/core-apis/data-types.md#ios)。

例如，以下是如何获取传递给你的方法的数据：

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

注意在 `CAPPluginCall` 实例上访问数据的各种方式，包括如何使用 `guard` 来要求选项。

### 返回数据

插件调用可以成功或失败。插件调用借用了 JavaScript Promise 的方法名称：调用 `resolve()` 表示成功（可选择返回数据），使用 `reject()` 表示失败并附带错误消息。

`CAPPluginCall` 的 `resolve()` 方法接受一个字典并支持 JSON 可序列化的数据类型。以下是向客户端返回数据的示例：

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

要使调用失败或拒绝，调用 `reject()`，传入错误字符串，并可选择传入错误代码和 `Error` 实例：

```swift
call.reject(error.localizedDescription, nil, error)
```

### 在插件加载时运行代码

有时，插件可能需要在首次加载时运行一些代码。例如，这是设置通知中心事件处理程序的好地方。

为此，请提供 `load()` 方法的实现：

```swift
override public func load() {
}
```

### 导出到 Capacitor

为了确保 Capacitor 能够看到你的插件，插件生成器做了两件事：将你的 Swift 类导出到 Objective-C，并注册插件方法。

要将你的 Swift 类导出到 Objective-C，插件生成器在 Swift 类上方添加 `@objc(EchoPlugin)`，并在 `echo` 方法前添加 `@objc`。

要注册插件方法，插件生成器创建一个 `CAPPluginMethod` 的 `pluginMethods` 数组，并注册 `echo` 方法。

```swift
public let pluginMethods: [CAPPluginMethod] = [
    CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
]
```

这使得 `echo` 方法可供 Capacitor Web 运行时使用，向 Capacitor 指示 echo 方法将返回一个 Promise。

要向插件添加更多方法，在 `.swift` 插件类中使用 `@objc` 关键字（放在 `func` 关键字之前）创建它们，并在 `pluginMethods` 数组中添加一个新的 `CAPPluginMethod` 条目。

## 权限

如果你的插件在 iOS 上的功能需要最终用户的权限，那么你需要实现权限模式。

在继续本部分之前，请确保你已经设置了权限别名和状态接口。如果还没有，请参阅[Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

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

此方法应返回插件中权限的当前状态，应是一个与你所定义的[权限状态定义](/plugins/creating-plugins/web-guide.md#permission-status-definitions)结构匹配的字典。通常，这些信息可以直接在你使用的框架中获得。

在下面的示例中，我们将位置服务的当前授权状态映射为权限状态，并将 `location` 别名与该状态关联。

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

如果框架支持基于 block 的 API 来请求权限，则可以在单个方法内完成操作。

在下面的示例中，我们从 `AVCaptureDevice` 请求视频访问权限，然后使用我们自己的 `checkPermissions` 方法检查权限的当前状态，并完成调用。

```swift
@objc override func requestPermissions(_ call: CAPPluginCall) {
    AVCaptureDevice.requestAccess(for: .video) { [weak self] _ in
        self?.checkPermissions(call)
    }
}
```

**基于 Delegate 的 API**

如果框架使用 delegate（或回调）API，完成操作意味着需要保存原始调用，然后在回调被调用时重新获取它。

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
        call.reject("Location services are disabled")
    }
}

public func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
    if let callID = permissionCallID, let call = bridge?.getSavedCall(callID) {
        checkPermissions(call)
        bridge?.releaseCall(call)
    }
}
```

**多个权限**

当需要多种类型的权限时，[DispatchGroup](https://developer.apple.com/documentation/dispatch/dispatchgroup) 是同步多个调用的便捷方式。

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

在大多数情况下，插件方法被调用来执行任务并可以立即完成。但在某些情况下，你需要保持插件调用可用，以便稍后访问。你可能想要这样做以定期返回数据，例如流式传输实时地理定位数据，或执行异步任务。

有关如何持久化插件调用的更多详细信息，请参阅[本指南](/main/reference/core-apis/saving-calls.md)。

## 错误处理

### 不可用

此错误可用于表示当前无法使用该功能，通常是因为它需要更新的 iOS 版本。

```swift
@objc override func methodThatUsesNewIOSFramework(_ call: CAPPluginCall) {
    if #available(iOS 14, *) {
        // TODO 实现
    } else {
        call.unavailable("Not available in iOS 13 or earlier.")
    }
}
```

> 建议尽可能优雅地降级旧 API 的体验。请谨慎使用 `unavailable`。

### 未实现

使用此错误表示某个方法无法在 iOS 上实现。

```swift
@objc override func methodThatRequiresAndroid(_ call: CAPPluginCall) {
    call.unimplemented("Not implemented on iOS.")
}
```

## 插件事件

插件可以触发自己的事件，你可以通过向插件对象添加监听器来监听这些事件：

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent was fired');
});
```

要从 Swift 插件类发出事件：

```swift
self.notifyListeners("myPluginEvent", data: [:])
```

要从插件对象移除监听器：

```typescript
import { MyPlugin } from 'my-plugin';

const myPluginEventListener = await MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent was fired');
  },
);

myPluginEventListener.remove();
```

> 也可以在 `window` 上触发全局事件。请参阅 [`triggerJSEvent`](/main/reference/core-apis/ios.md#triggerjsevent) 的文档。

## 呈现原生界面

你可以通过使用 [Capacitor 的 `UIViewController`](/main/reference/core-apis/ios.md#viewcontroller) 在应用上呈现原生界面。

## 覆盖导航

Capacitor 插件可以覆盖 WebView 的导航。为此，插件可以重写 `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` 方法。
返回 `true` 会导致 WebView 中止加载 URL。
返回 `false` 会导致 WebView 继续加载 URL。
返回 `nil` 将遵循默认的 Capacitor 策略。

## 高级配置

Capacitor iOS 插件同时是 CocoaPods 和 Swift Package Manager 库，因此要添加依赖项、必需的框架或任何其他高级配置，你必须为 CocoaPods 编辑 `.podspec` 文件，为 SPM 编辑 `Package.swift` 文件。这些文件由插件生成器创建。
查看 [podspec 参考文档](https://guides.cocoapods.org/syntax/podspec.html) 了解 CocoaPods 的所有可用选项。
查看 [Package Description](https://docs.swift.org/package-manager/PackageDescription/PackageDescription.html) 了解 SPM 的所有可用选项。

添加 `FirebaseFirestore` 版本 `11.8.0` 或更新（但低于 `12.0.0`）的 `.podspec` 依赖项示例：

```
  s.dependency 'Capacitor'
  s.dependency 'FirebaseFirestore', '~> 11.8'
```

添加 `FirebaseFirestore` 版本 `11.8.0` 或更新（但低于 `12.0.0`）的 `Package.swift` 依赖项示例：

```swift
...
let package = Package(
...
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0"),
        .package(url: "https://github.com/firebase/firebase-ios-sdk.git",  from: "11.8.0")
    ],
    targets: [
        .target(
            name: "FirebaseFirestorePlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "FirebaseCore", package: "firebase-ios-sdk"),
                .product(name: "FirebaseFirestore", package: "firebase-ios-sdk")
            ],
            path: "ios/Plugin")
    ]
...
)
```
