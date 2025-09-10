---
title: Method Types
description: Capacitor 插件方法类型
contributors:
  - ikeith
sidebar_label: 方法类型
slug: /plugins/method-types
---

# 方法类型

开发插件时，可以使用三种不同的方法签名类型，它们都是基于Promise的异步方法。

以下是一个包含全部三种类型的插件定义示例：

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

`method1()` 是最简单的情况，不返回任何数据。可以通过Promise检查错误，但结果解析时会被忽略。

在Android平台，需要使用如下注解标记方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_NONE)
public void method1(PluginCall call) {
}
```

在iOS平台，需要在插件的`.m`文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method1, CAPPluginReturnNone);
)
```

## 值返回方法

`method2()` 是最常见的情况：一个会返回某些值的Promise。

在Android平台，这是默认方法类型，指定返回类型是可选的：

```java
@PluginMethod()
public void method2(PluginCall call) {
}
```

在iOS平台，需要在插件的`.m`文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method2, CAPPluginReturnPromise);
)
```

## 回调方法

`method3()` 是最复杂但实际使用最少的一种类型。当插件需要多次返回数据时使用，例如通过地理定位API监控设备位置时。

在Android平台，需要使用如下注解标记方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
public void method3(PluginCall call) {
}
```

在iOS平台，需要在插件的`.m`文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method3, CAPPluginReturnCallback);
)
```

回调方法接收一个函数，该函数可能会被原生代码多次调用，并返回一个带有标识符的Promise。

在原生端实现回调时，需要保存调用以便后续使用。具体处理方法[请参考这里](/main/reference/core-apis/saving-calls.md)。