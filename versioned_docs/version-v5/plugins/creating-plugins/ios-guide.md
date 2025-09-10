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

开发 Capacitor iOS 插件需要使用 Swift（或 Objective-C）与苹果 iOS SDK 进行交互。  

## 快速开始  

首先按照插件指南中的[起步章节](/plugins/creating-plugins/overview.md)生成插件模板。  

接着在 Xcode 中打开 `echo/ios/Plugin.xcworkspace`，导航到插件的 .swift 文件。  

例如，若插件类名为 `Echo`，则应打开 `EchoPlugin.swift`。  

## 插件基础  

Capacitor iOS 插件是一个继承自 `CAPPlugin` 的 Swift 类，其中包含可供 JavaScript 调用的导出方法。  

### 简单示例  

生成的示例中包含一个简单的回声插件，其 `echo` 方法会直接返回接收到的参数：  

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

每个插件方法都会接收一个 `CAPPluginCall` 实例，包含来自客户端的调用信息。  

客户端可以发送任何可 JSON 序列化的数据（数字、文本、布尔值、对象和数组），这些数据可通过 `options` 字段或便捷方法如 `getString`、`getObject` 获取。关于数据传递的特殊注意事项请参阅[数据类型指南](/main/reference/core-apis/data-types.md#ios)。  

示例：  

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

插件调用可通过 `resolve()` 返回成功结果（可选数据），或通过 `reject()` 返回错误信息：  

```swift  
call.resolve([  
  "added": true,  
  "info": [  
    "id": id  
  ]  
])  

call.reject(error.localizedDescription, nil, error)  
```  

### 插件加载时执行代码  

重写 `load()` 方法可在插件加载时运行代码（如设置通知中心处理器）：  

```swift  
override public func load() {  
}  
```  

### 导出到 Capacitor  

插件生成器会通过以下步骤实现插件导出：  
1. 使用 `@objc(EchoPlugin)` 导出 Swift 类  
2. 在 `.m` 文件中用宏注册插件和方法  

`EchoPlugin.m` 示例：  

```objectivec  
#import <Capacitor/Capacitor.h>  

CAP_PLUGIN(EchoPlugin, "Echo",  
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);  
)  
```  

## 权限系统  

若插件涉及 iOS 权限申请，需实现权限检查模式。  

### 实现权限方法  

在插件类中添加权限检查与申请方法：  

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

@objc override func requestPermissions(_ call: CAPPluginCall) {  
    AVCaptureDevice.requestAccess(for: .video) { [weak self] _ in  
        self?.checkPermissions(call)  
    }  
}  
```  

### 多权限处理  

使用 `DispatchGroup` 同步多个权限请求：  

```swift  
let group = DispatchGroup()  
permissions.forEach { perm in  
    group.enter()  
    // 请求各个权限  
    group.leave()  
}  
group.notify(queue: .main) {  
    self.checkPermissions(call)  
}  
```  

## 高级功能  

### 持久化插件调用  

对于持续返回数据（如实时定位）的场景，需要保存调用实例。详见[保存调用指南](/main/reference/core-apis/saving-calls.md)。  

### 错误处理  

```swift  
// 功能不可用  
call.unavailable("iOS 13 及更低版本不支持")  

// 平台未实现  
call.unimplemented("iOS 端未实现此功能")  
```  

### 插件事件  

触发事件：  

```swift  
self.notifyListeners("myPluginEvent", data: [:])  
```  

### 原生界面展示  

使用 [`UIViewController` 接口](/main/reference/core-apis/ios.md#viewcontroller)展示原生界面。  

### 导航控制  

重写以下方法可拦截 WebView 导航：  

```objectivec  
- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction {  
    return @YES; // 取消加载  
}  
```  

## 高级配置  

通过编辑插件的 `.podspec` 文件可添加依赖或框架，详见 [podspec 参考文档](https://guides.cocoapods.org/syntax/podspec.html)。