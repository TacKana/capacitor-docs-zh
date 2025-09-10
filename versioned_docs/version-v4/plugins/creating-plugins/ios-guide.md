# Capacitor iOS 插件开发指南

为 iOS 构建 Capacitor 插件需要编写 Swift（或 Objective-C）代码来与苹果的 iOS SDK 进行交互。

## 快速开始

首先按照插件指南中的[入门章节](/plugins/creating-plugins/overview.md)生成一个插件。

接着，在 Xcode 中打开 `echo/ios/Plugin.xcworkspace`。然后导航到插件的 .swift 文件。

例如，对于插件类名为 `Echo` 的插件，你应该打开 `EchoPlugin.swift`。

## 插件基础

iOS 上的 Capacitor 插件是一个继承自 `CAPPlugin` 的简单 Swift 类，包含一些可被 JavaScript 调用的导出方法。

### 简单示例

在生成的示例中，有一个简单的回声插件，其 `echo` 函数仅返回接收到的值。

这个示例展示了 Capacitor 插件的几个核心组件：从插件调用接收数据，并将数据返回给调用者：

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

每个插件方法都会接收一个 `CAPPluginCall` 实例，其中包含客户端调用插件方法的所有信息。

客户端可以发送任何可 JSON 序列化的数据，如数字、文本、布尔值、对象和数组。这些数据可以通过 `options` 字段访问，或使用便捷方法如 `getString` 或 `getObject`。传递和访问这些值时需要注意一些特殊之处，详情可参考[单独说明](/main/reference/core-apis/data-types.md#ios)。

例如，以下是获取传递给方法的数据的方式：

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

注意 `CAPPluginCall` 实例上访问数据的各种方式，包括如何使用 `guard` 要求选项。

### 返回数据

插件调用可以成功或失败。插件调用借鉴了 JavaScript Promise 的方法名：调用 `resolve()` 表示成功（可选择返回数据），使用 `reject()` 表示失败并附带错误信息。

`CAPPluginCall` 的 `resolve()` 方法接受一个字典并支持 JSON 可序列化的数据类型。以下是返回数据给客户端的示例：

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

要表示失败或拒绝调用，调用 `reject()`，传递错误字符串，可选择性地包含错误代码和 `Error` 实例：

```swift
call.reject(error.localizedDescription, nil, error)
```

### 插件加载时运行代码

有时，插件需要在首次加载时运行一些代码。例如，这是设置任何通知中心事件处理程序的好地方。

为此，提供 `load()` 方法的实现：

```swift
override public func load() {
}
```

### 导出到 Capacitor

为确保 Capacitor 能看到你的插件，插件生成器会做两件事：将你的 Swift 类导出到 Objective-C，并使用提供的 Capacitor Objective-C 宏进行注册。

要将 Swift 类导出到 Objective-C，插件生成器会在 Swift 类上方添加 `@objc(EchoPlugin)`，并在 `echo` 方法前添加 `@objc`。

要注册插件，插件生成器会创建一个与你的插件对应的 `.m` 扩展文件（如 `EchoPlugin.m`），并使用 `CAP_PLUGIN` 注册插件，使用 `CAP_PLUGIN_METHOD` 宏注册 `echo` 方法。

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

这使得 `Echo` 插件及其 `echo` 方法对 Capacitor Web 运行时可用，向 Capacitor 表明 `echo` 方法将返回一个 Promise。

要向插件添加更多方法，在 `.swift` 插件类中创建它们，在 `func` 关键字前添加 `@objc`，并在 `.m` 文件中添加新的 `CAP_PLUGIN_METHOD` 条目。

## 权限

如果你的插件在 iOS 上有需要终端用户权限的功能，则需要实现权限模式。

在继续本节之前，请确保已设置权限别名和状态接口。如果还没有，请参阅 [Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

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

此方法应返回插件中权限的当前状态，应该是一个与[权限状态定义](/plugins/creating-plugins/web-guide.md#permission-status-definitions)匹配的字典。通常，这些信息可以直接从你使用的框架中获取。

在下面的示例中，我们将定位服务的当前授权状态映射到权限状态，并将 `location` 别名与该状态关联。

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

在下面的示例中，我们向 `AVCaptureDevice` 请求视频访问，然后使用自己的 `checkPermissions` 方法检查权限的当前状态并完成调用。

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

**多个权限**

当需要多种类型的权限时，[DispatchGroup](https://developer.apple.com/documentation/dispatch/dispatchgroup) 是同步多个调用的便捷方式。

```swift
let store = CNContactStore()

@objc override func requestPermissions(_ call: CAPPluginCall) {
    // 获取要检查的权限或默认为所有权限
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

大多数情况下，插件方法会被调用来执行任务，并能立即完成。但有些情况下，你需要保持插件调用可用，以便稍后访问。你可能希望这样做以定期返回数据（如流式传输实时地理位置数据），或执行异步任务。

有关如何持久化插件调用的更多详细信息，请参阅[保存插件调用指南](/main/reference/core-apis/saving-calls.md)。

## 错误处理

### 不可用

可以抛出此错误以表示功能当前无法使用，通常是因为需要更新的 iOS 版本。

```swift
@objc override func methodThatUsesNewIOSFramework(_ call: CAPPluginCall) {
    if #available(iOS 14, *) {
        // TODO 实现
    } else {
        call.unavailable("在 iOS 13 或更早版本中不可用。")
    }
}
```

> 建议尽可能使用较旧的 API 优雅降级体验。谨慎使用 `unavailable`。

### 未实现

使用此错误表示方法无法在 iOS 上实现。

```swift
@objc override func methodThatRequiresAndroid(_ call: CAPPluginCall) {
    call.unimplemented("在 iOS 上未实现。")
}
```

## 插件事件

插件可以发出自己的事件，你可以通过向插件对象附加监听器来监听：

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

> 也可以在 `window` 上触发全局事件。参见 [`triggerJSEvent`](/main/reference/core-apis/ios.md#triggerjsevent) 的文档。

## 呈现原生屏幕

你可以使用 [Capacitor 的 `UIViewController`](/main/reference/core-apis/ios.md#viewcontroller) 在应用上方呈现原生屏幕。

## 覆盖导航

Capacitor 插件可以覆盖 WebView 导航。为此，插件可以覆盖 `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` 方法。
返回 `true` 会导致 WebView 中止加载 URL。
返回 `false` 会导致 WebView 继续加载 URL。
返回 `nil` 将遵循默认的 Capacitor 策略。

## 高级配置

Capacitor iOS 插件是 CocoaPods 库，因此要添加依赖项、所需的框架或任何其他高级配置，你必须编辑插件生成器创建的 `.podspec` 文件，查看 [podspec 参考](https://guides.cocoapods.org/syntax/podspec.html) 了解所有可能的选项。