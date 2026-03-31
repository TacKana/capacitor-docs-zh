---
title: Method Types
description: Capacitor 插件方法类型
contributors:
  - ikeith
sidebar_label: Method Types
slug: /plugins/method-types
---

# 方法类型

开发插件时，可以使用三种不同类型的方法签名。所有方法都是异步的且基于 Promise。

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

## 无返回值

`method1()` 是最简单的情况，预期不返回任何数据。

对于 Android，你需要像这样注解方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_NONE)
public void method1(PluginCall call) {
}
```

对于 iOS，你需要在插件的 `.swift` 文件中这样声明方法：

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

## 返回值

`method2()` 是最常见的情况：一个通常会返回某些值的 Promise。

对于 Android，这种方法是默认类型，指定返回类型是可选的：

```java
@PluginMethod()
public void method2(PluginCall call) {
}
```

对于 iOS，你需要在插件的 `.swift` 文件中这样声明方法：

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

## 回调函数

`method3()` 是最复杂的类型，但在实际使用中也最不常见。当你的插件需要重复返回数据时使用，比如通过地理位置 API 监控设备位置。

对于 Android，你需要像这样注解方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
public void method3(PluginCall call) {
}
```

对于 iOS，你需要在插件的 `.swift` 文件中这样声明方法：

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

回调方法接收一个函数，该函数将从原生代码中调用（可能多次），并返回一个包含标识符的 Promise。

在原生端，实现回调意味着你需要保存调用，以便在稍后时间调用。具体如何处理 [在此处讨论](/main/reference/core-apis/saving-calls.md)。