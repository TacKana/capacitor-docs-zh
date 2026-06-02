---
title: 方法类型
description: Capacitor 插件方法类型
contributors:
  - ikeith
sidebar_label: 方法类型
slug: /plugins/method-types
---

# 方法类型

在开发插件时，可以使用三种不同类型的方法签名。所有方法都是异步且基于 Promise 的。

让我们来看一个包含所有三种类型的插件定义：

```typescript
export type CallbackID = string;

export interface MyData {
  data: string;
}

export type MyPluginCallback = (message: MyData | null, err?: any) => void;

export interface MyPlugin {
  method1(): never;
  method2(): Promise<MyData>;
  method3(callback: MyPluginCallback): Promise<CallbackID>;
}
```

## Void 返回

`method1()` 是最简单的情况，预期不返回任何数据。

对于 Android，你需要这样注解该方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_NONE)
public void method1(PluginCall call) {
}
```

对于 iOS，你需要在插件的 `.swift` 文件中这样声明该方法：

```swift
public let pluginMethods: [CAPPluginMethod] = [
    CAPPluginMethod(name: "method1", returnType: CAPPluginReturnNone)
]
```

或者对于 Objective-C 插件，在 `.m` 文件中：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method1, CAPPluginReturnNone);
)
```

## 值返回

`method2()` 是最常见的情况：一个通常会返回某个值的 Promise。

对于 Android，此方法类型是默认值，指定返回类型是可选的：

```java
@PluginMethod()
public void method2(PluginCall call) {
}
```

对于 iOS，你需要在插件的 `.swift` 文件中这样声明该方法：

```swift
public let pluginMethods: [CAPPluginMethod] = [
    CAPPluginMethod(name: "method2", returnType: CAPPluginReturnPromise)
]
```

或者对于 Objective-C 插件，在 `.m` 文件中：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method2, CAPPluginReturnPromise);
)
```

## 回调

`method3()` 是最复杂的类型，但在实践中也是最不常见的。当插件需要重复返回数据时使用，例如通过地理定位 API 监控设备位置。

对于 Android，你需要这样注解该方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
public void method3(PluginCall call) {
}
```

对于 iOS，你需要在插件的 `.swift` 文件中这样声明该方法：

```swift
public let pluginMethods: [CAPPluginMethod] = [
    CAPPluginMethod(name: "method3", returnType: CAPPluginReturnCallback)
]
```

或者对于 Objective-C 插件，在 `.m` 文件中：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method3, CAPPluginReturnCallback);
)
```

回调方法接受一个将从原生代码中被调用（可能多次）的函数，并返回一个将解析为标识符的 Promise。

在原生端，实现回调意味着你需要保存该调用以便以后调用。关于如何处理的具体细节，[请参见此处讨论。](/main/reference/core-apis/saving-calls.md)
