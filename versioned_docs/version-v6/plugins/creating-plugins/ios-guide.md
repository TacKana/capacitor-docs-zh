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

为 iOS 构建 Capacitor 插件需要使用 Swift（或 Objective-C）与苹果的 iOS SDK 进行交互。

## 开始之前

首先，请按照插件指南中的[入门章节](/plugins/creating-plugins/overview.md)生成一个插件。

接下来，在 Xcode 中打开 `Package.swift` 文件。然后，你需要导航到插件的 `.swift` 文件。

例如，对于一个插件类名为 `EchoPlugin` 的插件，你应该打开 `ios/Sources/EchoPlugin/EchoPlugin.swift` 和 `ios/Sources/EchoPlugin/Echo.swift`。

## 插件基础

一个 iOS 上的 Capacitor 插件包含两个简单的 Swift 类：一个是实现类，继承自 `NSObject`，你应该在这里放置插件的逻辑；另一个类继承自 `CAPPlugin` 和 `CAPBridgedPlugin`，它包含一些导出方法，这些方法可以从 JavaScript 调用，并封装了实现类的方法。

### 简单示例

在生成的示例中，有一个简单的回声插件，带有一个 `echo` 函数，该函数仅返回其接收到的值。

这个示例展示了 Capacitor 插件的几个核心组件：从插件调用接收数据，并将数据返回给调用者：

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

每个插件方法都会接收到一个 `CAPPluginCall` 实例，其中包含了客户端调用插件方法的所有信息。

客户端可以发送任何可 JSON 序列化的数据，例如数字、文本、布尔值、对象和数组。这些数据可以通过 `call` 实例的 `options` 字段访问，或者使用便捷方法如 `getString` 或 `getObject`。传递和访问这些值有一些需要注意的特殊之处，详见[单独讨论](/main/reference/core-apis/data-types.md#ios)。

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

注意在 `CAPPluginCall` 实例上访问数据的多种方式，包括如何使用 `guard` 来要求某些选项。

### 返回数据

插件调用可以成功或失败。插件调用借鉴了 JavaScript Promise 的方法名：调用 `resolve()` 表示成功（可选择返回数据），使用 `reject()` 表示失败并附带错误消息。

`CAPPluginCall` 的 `resolve()` 方法接受一个字典，并支持 JSON 可序列化的数据类型。以下是将数据返回给客户端的示例：

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

要失败或拒绝调用，请调用 `reject()`，传递一个错误字符串，并可选择性地传递错误代码和 `Error` 实例：

```swift
call.reject(error.localizedDescription, nil, error)
```

### 在插件加载时运行代码

有时，插件可能需要在首次加载时运行一些代码。例如，这是设置任何通知中心事件处理程序的好地方。

为此，请为 `load()` 方法提供实现：

```swift
override public func load() {
}
```

### 导出到 Capacitor {#export-to-capacitor}

为了确保 Capacitor 能够识别你的插件，插件生成器会做两件事：将你的 Swift 类导出到 Objective-C，并注册插件方法。

要将 Swift 类导出到 Objective-C，插件生成器会在你的 Swift 类上方添加 `@objc(EchoPlugin)`，并在 `echo` 方法前添加 `@objc`。

要注册插件方法，插件生成器会创建一个 `CAPPluginMethod` 数组 `pluginMethods`，并注册 `echo` 方法。

```swift
public let pluginMethods: [CAPPluginMethod] = [
    CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
]
```

这使得 `echo` 方法对 Capacitor Web 运行时可用，并向 Capacitor 表明 echo 方法将返回一个 Promise。

要向插件添加更多方法，请在 `.swift` 插件类中创建它们，在 `func` 关键字前添加 `@objc`，并在 `pluginMethods` 数组中添加新的 `CAPPluginMethod` 条目。

## 权限

如果你的插件在 iOS 上有需要最终用户权限的功能，那么你需要实现权限模式。

在遵循本节之前，请确保你已经设置了权限别名和状态接口。如果还没有，请参阅 [Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

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

此方法应返回插件中权限的当前状态，该状态应为一个字典，其结构与你定义的[权限状态定义](/plugins/creating-plugins/web-guide.md#permission-status-definitions)匹配。通常，这些信息可以直接从你使用的框架中获取。

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

如果框架支持基于块的 API 来请求权限，可以在单个方法内完成操作。

在下面的示例中，我们向 `AVCaptureDevice` 请求视频访问权限，然后使用自定义的 `checkPermissions` 方法检查当前权限状态，最终完成调用。

```swift
@objc override func requestPermissions(_ call: CAPPluginCall) {
    AVCaptureDevice.requestAccess(for: .video) { [weak self] _ in
        self?.checkPermissions(call)
    }
}
```

**基于委托的 API**

如果框架使用委托（或回调）API，完成操作意味着需要保存原始调用，并在回调触发时重新获取。

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

**多权限处理**

当需要多种类型的权限时，使用 [DispatchGroup](https://developer.apple.com/documentation/dispatch/dispatchgroup) 可以方便地同步多个调用。

```swift
let store = CNContactStore()

@objc override func requestPermissions(_ call: CAPPluginCall) {
    // 获取待检查的权限类型，默认为全部类型
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

大多数情况下，插件方法被调用后执行任务，可以立即结束。但有些场景需要保持插件调用可用，以便后续访问。例如：定期返回数据（如实时地理位置流数据），或执行异步任务。

关于如何持久化插件调用的更多细节，请参阅[保存插件调用指南](/main/reference/core-apis/saving-calls.md)。

## 错误处理 {#error-handling}

### 不可用

此错误表示当前无法使用该功能，通常是因为需要更高版本的 iOS 系统。

```swift
@objc override func methodThatUsesNewIOSFramework(_ call: CAPPluginCall) {
    if #available(iOS 14, *) {
        // TODO 实现代码
    } else {
        call.unavailable("iOS 13 或更早版本不支持此功能。")
    }
}
```

> 建议尽可能使用旧版 API 实现优雅降级。请谨慎使用 `unavailable` 方法。

### 未实现

使用此错误表示方法在 iOS 上无法实现。

```swift
@objc override func methodThatRequiresAndroid(_ call: CAPPluginCall) {
    call.unimplemented("iOS 平台未实现此功能。")
}
```

## 插件事件 {#plugin-events}

插件可以发出自定义事件，你可以通过向插件对象添加监听器来接收事件：

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent 已触发');
});
```

从 Swift 插件类发出事件：

```swift
self.notifyListeners("myPluginEvent", data: [:])
```

从插件对象移除监听器：

```typescript
import { MyPlugin } from 'my-plugin';

const myPluginEventListener = await MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent 已触发');
  },
);

myPluginEventListener.remove();
```

> 也可以在 `window` 上触发全局事件。请参阅 [`triggerJSEvent`](/main/reference/core-apis/ios.md#triggerjsevent) 文档。

## 呈现原生界面

你可以使用 [Capacitor 的 `UIViewController`](/main/reference/core-apis/ios.md#viewcontroller) 在应用上方呈现原生界面。

## 覆盖导航

Capacitor 插件可以覆盖 WebView 导航。为此，插件可以重写 `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` 方法。
返回 `true` 将导致 WebView 中止加载 URL。
返回 `false` 将导致 WebView 继续加载 URL。
返回 `nil` 将采用默认的 Capacitor 策略。

## 高级配置

Capacitor iOS 插件既是 CocoaPods 库也是 Swift Package Manager 库，因此添加依赖、所需框架或进行其他高级配置时，必须编辑 CocoaPods 的 `.podspec` 文件和 SPM 的 `Package.swift` 文件。这些文件由插件生成器创建。
请查阅 [podspec 参考文档](https://guides.cocoapods.org/syntax/podspec.html) 了解 CocoaPods 的所有可用选项。
请查阅 [Package Description](https://docs.swift.org/package-manager/PackageDescription/PackageDescription.html) 了解 SPM 的所有可用选项。

示例：在 `.podspec` 中添加 `FirebaseFirestore` 依赖，要求版本不低于 `11.8.0` 且低于 `12.0.0`。

```
  s.dependency 'Capacitor'
  s.dependency 'FirebaseFirestore', '~> 11.8'
```

示例：在 `Package.swift` 中添加 `FirebaseFirestore` 依赖，要求版本不低于 `11.8.0` 且低于 `12.0.0`。

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