---  
title: Capacitor iOS 插件开发指南  
description: Capacitor iOS 插件开发指南  
contributors:  
  - mlynch  
  - jcesarmobile  
sidebar_label: iOS 指南  
slug: /plugins/ios  
---  

# Capacitor iOS 插件开发指南  

开发 Capacitor 的 iOS 插件需要使用 Swift（或 Objective-C）与苹果 iOS SDK 进行交互。

## 快速开始  

首先按照插件指南中的[入门章节](/plugins/creating-plugins/overview.md)生成一个插件模板。  

接着在 Xcode 中打开 `Package.swift` 文件，然后定位到你的插件对应的 Swift 文件。  

例如，如果插件类名为 `EchoPlugin`，你应该打开 `ios/Sources/EchoPlugin/EchoPlugin.swift` 和 `ios/Sources/EchoPlugin/Echo.swift`。

## 插件基础  

一个 Capacitor iOS 插件包含两个简单的 Swift 类：  
1. 继承 `NSObject` 的实现类，用于存放插件核心逻辑  
2. 继承 `CAPPlugin` 和 `CAPBridgedPlugin` 的包装类，包含可从 JavaScript 调用的导出方法，并封装实现类的方法。

### 简单示例  

生成的示例中包含一个简单的 echo 插件，其 `echo` 方法会原样返回传入的值。  

这个例子展示了 Capacitor 插件的几个核心概念：从插件调用接收数据，以及将数据返回给调用方：

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

每个插件方法都会收到一个 `CAPPluginCall` 实例，包含客户端调用该方法时的所有信息。  

客户端可以发送任何可 JSON 序列化的数据（如数字、文本、布尔值、对象和数组）。这些数据可通过调用实例的 `options` 字段访问，或使用像 `getString`、`getObject` 这样的便捷方法。传递和访问某些值时需注意一些特殊规则，详情可参考[数据类型文档](/main/reference/core-apis/data-types.md#ios)。  

例如，以下是获取方法参数的方式：

```swift
@objc func storeContact(_ call: CAPPluginCall) {
  let name = call.getString("yourName") ?? "default name"
  let address = call.getObject("address") ?? [:]
  let isAwesome = call.getBool("isAwesome") ?? false

  guard let id = call.options["id"] as? String else {
    call.reject("必须提供id参数")
    return
  }

  // ...

  call.resolve()
}
```

### 返回数据  

插件调用可能成功或失败。调用的命名借鉴了 JavaScript Promise 的惯例：  
- 调用 `resolve()` 表示成功（可选返回数据）  
- 调用 `reject()` 表示失败并附带错误信息  

`CAPPluginCall` 的 `resolve()` 方法接收一个字典，支持 JSON 可序列化的数据类型：

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

调用失败时使用 `reject()`，可传入错误描述、错误码和 `Error` 实例：

```swift
call.reject(error.localizedDescription, nil, error)
```

### 插件加载时执行代码  

有时插件需要在首次加载时运行代码（例如设置通知中心的事件处理器）。可以通过实现 `load()` 方法实现：

```swift
override public func load() {
}
```

### 导出到 Capacitor  

为确保 Capacitor 能识别你的插件，生成器会做两件事：  
1. 通过 `@objc(EchoPlugin)` 将 Swift 类导出到 Objective-C  
2. 在 `pluginMethods` 数组中注册插件方法  

```swift
public let pluginMethods: [CAPPluginMethod] = [
    CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
]
```

这使 `echo` 方法对 Capacitor Web 运行时可用，并告知 Capacitor 该方法返回 Promise。  

要添加更多方法，只需在 Swift 插件类中使用 `@objc` 标记新方法，并在 `pluginMethods` 数组中添加对应的 `CAPPluginMethod`。

## 权限管理  

如果你的插件功能需要用户授权，则需要实现权限模式。  

在继续之前，请确保已设置权限别名和状态接口（参考[Web指南中的权限章节](/plugins/creating-plugins/web-guide.md#permissions)）。

### 实现权限检查  

在你的 Swift 插件类中添加 `checkPermissions()` 和 `requestPermissions()` 方法：

```swift
@objc override public func checkPermissions(_ call: CAPPluginCall) {
    // 实现权限状态检查
}

@objc override public func requestPermissions(_ call: CAPPluginCall) {
    // 实现权限请求
}
```

#### `checkPermissions()`  

该方法应返回插件当前的权限状态字典，结构需符合[权限状态定义](/plugins/creating-plugins/web-guide.md#permission-status-definitions)。  

以下示例将位置服务的授权状态映射为权限状态：

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

**块式API**  
如果框架支持块式权限请求，可以直接在方法内完成操作：

```swift
@objc override func requestPermissions(_ call: CAPPluginCall) {
    AVCaptureDevice.requestAccess(for: .video) { [weak self] _ in
        self?.checkPermissions(call)
    }
}
```

**委托式API**  
对于使用委托回调的框架，需要保存原始调用并在回调时取回：

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
```

**多权限请求**  
当需要请求多个权限时，可使用 `DispatchGroup` 进行同步：

```swift
let store = CNContactStore()

@objc override func requestPermissions(_ call: CAPPluginCall) {
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

大多数情况下插件方法执行后可以立即结束，但有些场景（如持续返回地理位置数据或执行异步任务）需要保持调用可用。详见[保存插件调用指南](/main/reference/core-apis/saving-calls.md)。

## 错误处理  

### 功能不可用  

当功能因需要新版 iOS 而无法使用时，可抛出此错误：

```swift
@objc override func methodThatUsesNewIOSFramework(_ call: CAPPluginCall) {
    if #available(iOS 14, *) {
        // 实现代码
    } else {
        call.unavailable("iOS 13及以下版本不支持此功能")
    }
}
```

> 建议尽可能优雅降级，谨慎使用此方法。

### 未实现功能  

用于标明某功能在 iOS 上不可实现：

```swift
@objc override func methodThatRequiresAndroid(_ call: CAPPluginCall) {
    call.unimplemented("iOS平台未实现此功能")
}
```

## 插件事件  

插件可以触发自定义事件，可通过监听器订阅：

```typescript
MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('收到myPluginEvent事件');
});
```

Swift 端触发事件：

```swift
self.notifyListeners("myPluginEvent", data: [:])
```

移除监听器：

```typescript
const myPluginEventListener = await MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('收到myPluginEvent事件');
  },
);

myPluginEventListener.remove();
```

> 也可以通过 [`triggerJSEvent`](/main/reference/core-apis/ios.md#triggerjsevent) 触发全局事件。

## 展示原生界面  

使用 [Capacitor 的 `UIViewController`](/main/reference/core-apis/ios.md#viewcontroller) 可以在应用上方展示原生界面。

## 导航拦截  

插件可以通过重写 `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` 方法拦截 WebView 导航：  
- 返回 `true` 终止加载  
- 返回 `false` 继续加载  
- 返回 `nil` 使用 Capacitor 默认策略  

## 高级配置  

Capacitor iOS 插件同时支持 CocoaPods 和 Swift Package Manager。要添加依赖或进行高级配置，需要编辑：  
- CocoaPods：修改 `.podspec` 文件  
- SPM：修改 `Package.swift` 文件  

参考 [podspec 文档](https://guides.cocoapods.org/syntax/podspec.html) 和 [Swift Package 描述文档](https://docs.swift.org/package-manager/PackageDescription/PackageDescription.html)。  

示例：添加不低于 11.8.0 但低于 12.0.0 的 FirebaseFirestore 依赖  

`.podspec` 配置：
```
s.dependency 'FirebaseFirestore', '~> 11.8'
```

`Package.swift` 配置：
```swift
dependencies: [
    .package(url: "https://github.com/firebase/firebase-ios-sdk.git", from: "11.8.0")
],
targets: [
    .target(
        name: "FirebaseFirestorePlugin",
        dependencies: [
            .product(name: "FirebaseFirestore", package: "firebase-ios-sdk")
        ]
    )
]
```