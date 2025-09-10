---
title: Method Types
description: Capacitor插件方法类型
contributors:
  - ikeith
sidebar_label: 方法类型
slug: /plugins/method-types
---

# 方法类型

开发插件时，可以使用三种不同的方法签名类型。所有方法都是异步且基于Promise的。

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

`method1()`是最简单的情况，预期不返回任何数据。你可以检查Promise是否有错误，但当它解析时结果会被忽略。

在Android中，你需要这样注解方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_NONE)
public void method1(PluginCall call) {
}
```

在iOS中，你需要在插件的`.m`文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method1, CAPPluginReturnNone);
)
```

## 带返回值方法

`method2()`是最常见的情况：一个会解析为某个值的Promise。

在Android中，这是默认的方法类型，指定返回类型是可选的：

```java
@PluginMethod()
public void method2(PluginCall call) {
}
```

在iOS中，你需要在插件的`.m`文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method2, CAPPluginReturnPromise);
)
```

## 回调方法

`method3()`是最复杂的类型，但在实践中也是最不常见的。当你的插件需要多次返回数据时使用，例如通过地理位置API监控设备位置时。

在Android中，你需要这样注解方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
public void method3(PluginCall call) {
}
```

在iOS中，你需要在插件的`.m`文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method3, CAPPluginReturnCallback);
)
```

回调方法接受一个函数，该函数将从原生代码中调用（可能多次），并返回一个解析为标识符的Promise。

在原生端，实现回调意味着需要保存调用以便稍后调用。具体如何处理[在这里讨论](/main/reference/core-apis/saving-calls.md)