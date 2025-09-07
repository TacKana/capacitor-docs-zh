---
title: 方法类型
description: Capacitor 插件方法类型
contributors:
  - ikeith
sidebar_label: 方法类型
slug: /plugins/method-types
---

# 方法类型

开发插件时，可以使用三种不同的方法签名类型。所有方法都是异步且基于 Promise 的。

我们来看一个包含所有三种类型的插件定义示例：

```typescript
export type CallbackID = string;

export interface MyData {
  data: string;
}

export type MyPluginCallback = (message: MyData | null, err?: any) => void;

export interface MyPlugin {
  method1(): Promise<void>;
  method2(): Promise<MyData>;
  method3(callback: MyPluginCallback): Promise<CallbackID>;
}
```

## 无返回值方法

`method1()` 是最简单的情况，该方法不返回任何数据。您可以检查 Promise 是否出错，但当它解决时结果会被忽略。

在 Android 中，您需要这样注解方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_NONE)
public void method1(PluginCall call) {
}
```

在 iOS 中，您需要在插件的 `.m` 文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method1, CAPPluginReturnNone);
)
```

## 值返回方法

`method2()` 是最常见的情况：一个会返回某个值的 Promise。

在 Android 中，这种方法是默认类型，指定返回类型是可选的：

```java
@PluginMethod()
public void method2(PluginCall call) {
}
```

在 iOS 中，您需要在插件的 `.m` 文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method2, CAPPluginReturnPromise);
)
```

## 回调方法

`method3()` 是最复杂的类型，但在实际使用中也是最不常见的。当您的插件需要重复返回数据时（例如通过地理位置 API 监控设备位置），会使用这种方法。

在 Android 中，您需要这样注解方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
public void method3(PluginCall call) {
}
```

在 iOS 中，您需要在插件的 `.m` 文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method3, CAPPluginReturnCallback);
)
```

回调方法接收一个函数，这个函数将从原生代码中被调用（可能多次），并返回一个带有标识符的 Promise。

在原生端实现回调意味着您需要保存调用以便后续使用。具体的处理方法[在此处讨论](/main/reference/core-apis/saving-calls.md)