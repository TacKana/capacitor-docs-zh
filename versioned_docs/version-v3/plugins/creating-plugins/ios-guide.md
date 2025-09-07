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

开发 Capacitor 的 iOS 插件需要使用 Swift（或 Objective-C）与苹果的 iOS SDK 进行交互。

## 快速开始

首先按照插件指南中的[入门章节](/plugins/creating-plugins/overview.md)生成一个插件模板。

接着在 Xcode 中打开 `echo/ios/Plugin.xcworkspace`，然后导航到插件的 .swift 文件。

例如，如果插件的类名是 `Echo`，你应该打开 `EchoPlugin.swift`。

## 插件基础

Capacitor 的 iOS 插件是一个继承自 `CAPPlugin` 的 Swift 类，其中的导出方法可以从 JavaScript 调用。

### 简单示例

生成的示例中包含一个简单的回声插件，其中的 `echo` 方法会原样返回传入的值：

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

每个插件方法都会收到一个 `CAPPluginCall` 实例，包含客户端调用该方法时的所有信息。

客户端可以发送任何可 JSON 序列化的数据，如数字、文本、布尔值、对象和数组。这些数据可通过 `options` 字段或便捷方法如 `getString`、`getObject` 访问。

例如获取方法参数：

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

### 返回数据

插件调用可以成功或失败。使用 `resolve()` 返回成功（可选携带数据），`reject()` 返回失败并附带错误信息。

返回数据的示例：

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

调用失败的示例：

```swift
call.reject(error.localizedDescription, nil, error)
```

### 插件加载时执行代码

在插件首次加载时运行代码（如设置通知中心处理器），可覆写 `load()` 方法：

```swift
override public func load() {
}
```

### 导出到 Capacitor

确保 Capacitor 能识别你的插件：
1. 使用 `@objc(EchoPlugin)` 导出 Swift 类
2. 使用 Capacitor 宏注册插件

插件注册文件示例 `EchoPlugin.m`：

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

添加新方法时，在 Swift 类中添加 `@objc` 前缀方法，并在 `.m` 文件中添加对应的 `CAP_PLUGIN_METHOD`。

## 权限管理

如果插件需要用户授权，需实现权限检查模式。

### 实现权限检查

添加 `checkPermissions()` 和 `requestPermissions()` 方法：

```swift
@objc override public func checkPermissions(_ call: CAPPluginCall) {
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

### 请求权限

**基于块的API**

```swift
@objc override func requestPermissions(_ call: CAPPluginCall) {
    AVCaptureDevice.requestAccess(for: .video) { [weak self] _ in
        self?.checkPermissions(call)
    }
}
```

**多权限请求**

使用 DispatchGroup 同步多个权限请求：

```swift
let store = CNContactStore()

@objc override func requestPermissions(_ call: CAPPluginCall) {
    var permissions = call.getArray("types", String.self) ?? []
    if permissions.isEmpty {
        permissions = ["contacts", "camera"]
    }

    let group = DispatchGroup()
    // 处理每个权限请求
    group.notify(queue: DispatchQueue.main) {
        self.checkPermissions(call)
    }
}
```

## 错误处理

### 功能不可用

```swift
@objc override func methodThatUsesNewIOSFramework(_ call: CAPPluginCall) {
    if #available(iOS 14, *) {
        // 实现代码
    } else {
        call.unavailable("iOS 13 及更早版本不支持此功能")
    }
}
```

### 未实现功能

```swift
@objc override func methodThatRequiresAndroid(_ call: CAPPluginCall) {
    call.unimplemented("iOS 平台未实现此功能")
}
```

## 插件事件

插件可以触发自定义事件：

```swift
self.notifyListeners("myPluginEvent", data: [:])
```

JavaScript 端监听：

```typescript
MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('收到插件事件');
});
```

## 高级功能

- 使用 [`UIViewController`](/main/reference/core-apis/ios.md#viewcontroller) 展示原生界面
- 通过覆写 `shouldOverrideLoad` 方法控制网页导航
- 通过编辑 `.podspec` 文件添加依赖和高级配置

更多参考 [podspec 文档](https://guides.cocoapods.org/syntax/podspec.html)。