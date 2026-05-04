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

为 iOS 构建 Capacitor 插件需要使用 Swift（或 Objective-C）来与苹果的 iOS SDK 进行交互。

## 开始之前

首先，请按照插件指南的 [开始使用](/plugins/creating-plugins/overview.md) 部分生成一个插件。

接下来，在 Xcode 中打开 `echo/ios/Plugin.xcworkspace`。然后，你需要导航到插件的 `.swift` 文件。

例如，对于插件类名为 `Echo` 的插件，你应该打开 `EchoPlugin.swift`。

## 插件基础

iOS 上的 Capacitor 插件是一个简单的 Swift 类，它继承自 `CAPPlugin`，并包含一些可从 JavaScript 调用的导出方法。

### 简单示例

在生成的示例中，有一个简单的 echo 插件，它包含一个 `echo` 函数，该函数仅返回它接收到的值。

这个示例展示了 Capacitor 插件的几个核心组成部分：从插件调用中接收数据，以及将数据返回给调用者：

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

每个插件方法都会接收到一个 `CAPPluginCall` 实例，其中包含了客户端调用该插件方法的所有信息。

客户端可以发送任何可 JSON 序列化的数据，例如数字、文本、布尔值、对象和数组。这些数据可以通过调用实例的 `options` 字段访问，或者使用便捷方法如 `getString` 或 `getObject`。传递和访问这些值中的某些内容时需要注意一些细节，具体讨论请参见 [单独章节](/main/reference/core-apis/data-types.md#ios)。

例如，以下是如何获取传递给你方法的数据：

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

请注意在 `CAPPluginCall` 实例上访问数据的各种方式，包括如何使用 `guard` 来要求必需参数。

### 返回数据

一个插件调用可以成功或失败。插件调用借鉴了 JavaScript Promise 的方法命名：调用 `resolve()` 表示成功（可选择返回数据），使用 `reject()` 表示失败并附带错误信息。

`CAPPluginCall` 的 `resolve()` 方法接收一个字典，并支持 JSON 可序列化的数据类型。以下是将数据返回给客户端的示例：

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

要表示失败或拒绝调用，请调用 `reject()`，传入一个错误字符串，并可选择性地传入错误代码和 `Error` 实例：

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

### 导出到 Capacitor {#export-to-capacitor}

为确保 Capacitor 能够识别你的插件，插件生成器会做两件事：将你的 Swift 类导出到 Objective-C，并使用提供的 Capacitor Objective-C 宏进行注册。

要将你的 Swift 类导出到 Objective-C，插件生成器会在你的 Swift 类上方添加 `@objc(EchoPlugin)`，并在 `echo` 方法前添加 `@objc`。

要注册插件，插件生成器会创建一个与你的插件对应的 `.m` 扩展名文件（例如 `EchoPlugin.m`），并使用 `CAP_PLUGIN` 宏注册插件，使用 `CAP_PLUGIN_METHOD` 宏注册 `echo` 方法。

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

这使得 `Echo` 插件和 `echo` 方法对 Capacitor Web 运行时可用，并向 Capacitor 表明 `echo` 方法将返回一个 Promise。

要向插件添加更多方法，请在 `.swift` 插件类中创建它们，并在 `func` 关键字前添加 `@objc`，然后在 `.m` 文件中添加新的 `CAP_PLUGIN_METHOD` 条目。

## 权限管理

如果你的插件在 iOS 上具有需要最终用户授权的功能，那么你需要实现权限管理机制。

在继续本节之前，请确保你已经设置了权限别名和状态接口。如果还没有，请参阅 [Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

### 实现权限管理

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

此方法应返回插件中权限的当前状态，该状态应为一个字典，其结构与你定义的 [权限状态定义](/plugins/creating-plugins/web-guide.md#permission-status-definitions) 相匹配。通常，这些信息可以直接从你使用的框架中获取。

在下面的示例中，我们将位置服务当前的授权状态映射为权限状态，并将 `location` 别名与该状态关联。

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

在下面的示例中，我们向 `AVCaptureDevice` 请求视频访问权限，然后使用自己的 `checkPermissions` 方法检查权限当前状态并完成调用。

```swift
@objc override func requestPermissions(_ call: CAPPluginCall) {
    AVCaptureDevice.requestAccess(for: .video) { [weak self] _ in
        self?.checkPermissions(call)
    }
}
```

**基于委托的 API**

如果框架使用委托（或回调）API，完成操作意味着需要保存原始调用，并在回调触发后检索它。

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

**多重权限**

当需要多种类型的权限时，使用 [DispatchGroup](https://developer.apple.com/documentation/dispatch/dispatchgroup) 是同步多个调用的便捷方式。

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

在大多数情况下，插件方法被调用执行任务后可以立即完成。但在某些情况下，您需要保持插件调用可用，以便稍后访问。您可能希望这样做来定期返回数据（例如流式传输实时地理位置数据），或执行异步任务。

有关如何持久化插件调用的详细信息，请参阅[保存插件调用指南](/main/reference/core-apis/saving-calls.md)。

## 错误处理 {#error-handling}

### 不可用

此错误表示功能当前无法使用，通常是因为需要更新的 iOS 版本。

```swift
@objc override func methodThatUsesNewIOSFramework(_ call: CAPPluginCall) {
    if #available(iOS 14, *) {
        // TODO 实现
    } else {
        call.unavailable("iOS 13 或更早版本不可用。")
    }
}
```

> 建议尽可能使用旧版 API 优雅降级体验。谨慎使用 `unavailable`。

### 未实现

使用此错误表示方法无法在 iOS 上实现。

```swift
@objc override func methodThatRequiresAndroid(_ call: CAPPluginCall) {
    call.unimplemented("iOS 上未实现。")
}
```

## 插件事件 {#plugin-events}

插件可以发出自己的事件，您可以通过向插件对象附加监听器来监听这些事件：

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent 已触发');
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
    console.log('myPluginEvent 已触发');
  },
);

myPluginEventListener.remove();
```

> 也可以在 `window` 上触发全局事件。请参阅 [`triggerJSEvent`](/main/reference/core-apis/ios.md#triggerjsevent) 的文档。

## 呈现原生屏幕

您可以使用 [Capacitor 的 `UIViewController`](/main/reference/core-apis/ios.md#viewcontroller) 在应用上方呈现原生屏幕。

## 覆盖导航

Capacitor 插件可以覆盖 WebView 导航。为此，插件可以覆盖 `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` 方法。
返回 `true` 会导致 WebView 中止加载 URL。
返回 `false` 会导致 WebView 继续加载 URL。
返回 `nil` 将遵循默认的 Capacitor 策略。

## 高级配置

Capacitor iOS 插件是 CocoaPods 库，因此要添加依赖项、所需框架或任何其他高级配置，您必须编辑插件生成器创建的 `.podspec` 文件。请查看 [podspec 参考文档](https://guides.cocoapods.org/syntax/podspec.html) 以查看所有可能的选项。