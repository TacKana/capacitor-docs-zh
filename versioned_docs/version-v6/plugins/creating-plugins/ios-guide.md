---
title: Capacitor iOS 插件指南
description: Capacitor iOS 插件开发指南
contributors:
  - mlynch
  - jcesarmobile
sidebar_label: iOS 指南
slug: /plugins/ios
---

# Capacitor iOS 插件指南

为 iOS 构建 Capacitor 插件需要使用 Swift（或 Objective-C）与苹果的 iOS SDK 进行交互。

## 开始使用

首先，按照插件指南中的[入门章节](/plugins/creating-plugins/overview.md)生成一个插件。

接下来，在 Xcode 中打开 `Package.swift`，然后导航到插件的 .swift 文件。

例如，对于插件类名为 `EchoPlugin` 的插件，你应该打开 `ios/Sources/EchoPlugin/EchoPlugin.swift` 和 `ios/Sources/EchoPlugin/Echo.swift`。

## 插件基础

一个 Capacitor iOS 插件包含两个简单的 Swift 类：一个是继承自 `NSObject` 的实现类，用于存放插件逻辑；另一个是继承自 `CAPPlugin` 和 `CAPBridgedPlugin` 的类，其中包含可从 JavaScript 调用的导出方法，并封装了实现方法。

### 简单示例

在生成的示例中，有一个简单的 echo 插件，其中包含一个 `echo` 函数，该函数仅返回传入的值。

此示例演示了 Capacitor 插件的几个核心组件：从插件调用接收数据，以及将数据返回给调用方：

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

每个插件方法都会接收一个 `CAPPluginCall` 实例，其中包含来自客户端的插件方法调用的所有信息。

客户端可以发送任何可 JSON 序列化的数据，例如数字、文本、布尔值、对象和数组。这些数据可通过调用实例的 `options` 字段访问，或使用便捷方法如 `getString` 或 `getObject`。传递和访问这些值需要注意一些特殊之处，详见[单独讨论](/main/reference/core-apis/data-types.md#ios)。

例如，以下是如何获取传递给方法的数据：

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

注意在 `CAPPluginCall` 实例上访问数据的各种方式，包括如何使用 `guard` 要求必需选项。

### 返回数据

插件调用可以成功或失败。插件调用借用了 JavaScript Promise 的方法名：调用 `resolve()` 表示成功（可选返回数据），使用 `reject()` 表示失败并附带错误消息。

`CAPPluginCall` 的 `resolve()` 方法接受一个字典，并支持 JSON 可序列化数据类型。以下是将数据返回给客户端的示例：

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

要使调用失败或拒绝，调用 `reject()`，传递错误字符串，并可选择错误代码和 `Error` 实例：

```swift
call.reject(error.localizedDescription, nil, error)
```

### 在插件加载时运行代码

有时，插件可能需要在首次加载时运行一些代码。例如，这是设置任何通知中心事件处理程序的好地方。

为此，请提供 `load()` 方法的实现：

```swift
override public func load() {
}
```

### 导出到 Capacitor

为确保 Capacitor 能看到你的插件，插件生成器会做两件事：将 Swift 类导出到 Objective-C，并注册插件方法。

要将 Swift 类导出到 Objective-C，插件生成器会在 Swift 类上方添加 `@objc(EchoPlugin)`，并在 `echo` 方法前添加 `@objc`。

要注册插件方法，插件生成器会创建一个 `CAPPluginMethod` 数组 `pluginMethods`，并注册 `echo` 方法。

```swift
public let pluginMethods: [CAPPluginMethod] = [
    CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
]
```

这使得 `echo` 方法对 Capacitor Web 运行时可用，并向 Capacitor 表明 echo 方法将返回一个 Promise。

要向插件添加更多方法，请在 `.swift` 插件类中创建它们，在 `func` 关键字前添加 `@objc`，并在 `pluginMethods` 数组中添加新的 `CAPPluginMethod` 条目。

## 权限

如果你的插件在 iOS 上具有需要最终用户权限的功能，则需要实现权限模式。

在遵循本节之前，请确保已设置权限别名和状态接口。如果尚未设置，请参阅 [Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

### 实现权限

将 `checkPermissions()` 和 `requestPermissions()` 方法添加到 Swift 插件类中。

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

此方法应返回插件中权限的当前状态，该状态应是一个字典，与你定义的[权限状态定义](/plugins/creating-plugins/web-guide.md#permission-status-definitions)结构匹配。通常，这些信息可直接从你使用的框架中获取。

在下面的示例中，我们将位置服务的当前授权状态映射到权限状态，并将 `location` 别名与该状态关联。

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

**基于块的 API**

如果框架支持基于块的 API 来请求权限，则可以在单个方法内完成操作。

在下面的示例中，我们向 `AVCaptureDevice` 请求视频访问权限，然后使用自己的 `checkPermissions` 方法检查权限的当前状态并完成调用。

```swift
@objc override func requestPermissions(_ call: CAPPluginCall) {
    AVCaptureDevice.requestAccess(for: .video) { [weak self] _ in
        self?.checkPermissions(call)
    }
}
```

**基于委托的 API**

如果框架使用委托（或回调）API，完成操作意味着需要保存原始调用，并在回调被调用后检索它。

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
        call.reject("位置服务已禁用")
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

当需要多种类型的权限时，[DispatchGroup](https://developer.apple.com/documentation/dispatch/dispatchgroup) 是一种方便的同步多个调用的方式。

```swift
let store = CNContactStore()

@objc override func requestPermissions(_ call: CAPPluginCall) {
    // 获取要检查的权限，或默认全部检查
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

在大多数情况下，插件方法会被调用来执行任务并可以立即完成。但在某些情况下，你需要保持插件调用可用，以便以后访问。你可能希望定期返回数据，例如流式传输实时地理位置数据，或执行异步任务。

有关如何持久化插件调用的更多详细信息，请参阅[关于保存插件调用的指南](/main/reference/core-apis/saving-calls.md)。

## 错误处理

### 不可用

可以抛出此错误来指示该功能目前无法使用，通常是因为需要更新的 iOS 版本。

```swift
@objc override func methodThatUsesNewIOSFramework(_ call: CAPPluginCall) {
    if #available(iOS 14, *) {
        // 待实现
    } else {
        call.unavailable("在 iOS 13 或更早版本中不可用。")
    }
}
```

> 建议尽可能使用旧版 API 优雅降级体验。请谨慎使用 `unavailable`。

### 未实现

使用此错误来指示某个方法无法在 iOS 上实现。

```swift
@objc override func methodThatRequiresAndroid(_ call: CAPPluginCall) {
    call.unimplemented("在 iOS 上未实现。")
}
```

## 插件事件

插件可以发出自己的事件，你可以通过向插件对象附加监听器来监听这些事件，如下所示：

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent 被触发');
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
    console.log('myPluginEvent 被触发');
  },
);

myPluginEventListener.remove();
```

> 也可以在 `window` 上触发全局事件。请参阅 [`triggerJSEvent`](/main/reference/core-apis/ios.md#triggerjsevent) 的文档。

## 呈现原生屏幕

你可以使用 [Capacitor 的 `UIViewController`](/main/reference/core-apis/ios.md#viewcontroller) 在应用上方呈现原生屏幕。

## 覆盖导航

Capacitor 插件可以覆盖 WebView 导航。为此，插件可以覆盖 `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` 方法。
返回 `true` 会导致 WebView 中止加载 URL。
返回 `false` 会导致 WebView 继续加载 URL。
返回 `nil` 将遵循默认的 Capacitor 策略。

## 高级配置

Capacitor iOS 插件既是 CocoaPods 也是 Swift Package Manager 库，因此要添加依赖项、必需的框架或任何其他高级配置，你必须编辑 CocoaPods 的 `.podspec` 和 SPM 的 `Package.swift`。这些文件是由插件生成器创建的。
查看 [podspec 参考](https://guides.cocoapods.org/syntax/podspec.html)以了解 CocoaPods 的所有可能选项。
查看 [Package Description](https://docs.swift.org/package-manager/PackageDescription/PackageDescription.html) 以了解 SPM 的所有可能选项。

示例 `.podspec` 依赖项，添加 `FirebaseFirestore` 版本 `11.8.0` 或更高版本，但低于 `12.0.0`。

```
  s.dependency 'Capacitor'
  s.dependency 'FirebaseFirestore', '~> 11.8'
```

示例 `Package.swift` 依赖项，添加 `FirebaseFirestore` 版本 `11.8.0` 或更高版本，但低于 `12.0.0`。

```swift
...
let package = Package(
...
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "6.0.0"),
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