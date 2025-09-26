---
title: Method Types
description: Capacitor 插件方法类型
contributors:
  - ikeith
sidebar_label: 方法类型
slug: /plugins/method-types
---

# 方法类型

开发插件时，可以使用三种不同的方法签名类型。所有方法都是基于 Promise 的异步操作。

以下是一个包含所有三种方法类型的插件定义示例：

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

`method1()` 是最简单的情况，不需要返回任何数据。你可以检查 Promise 是否报错，但当它解析时结果会被忽略。

在 Android 平台，你需要这样注解方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_NONE)
public void method1(PluginCall call) {
}
```

在 iOS 平台，你需要在插件的 `.m` 文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method1, CAPPluginReturnNone);
)
```

## 有返回值方法

`method2()` 是最常见的情况：一个会返回某些数据的 Promise。

在 Android 平台，这是默认的方法类型，指定返回类型是可选的：

```java
@PluginMethod()
public void method2(PluginCall call) {
}
```

在 iOS 平台，你需要在插件的 `.m` 文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method2, CAPPluginReturnPromise);
)
```

## 回调方法

`method3()` 是最复杂的类型，但在实际开发中较少使用。当你的插件需要多次返回数据时（例如通过地理定位 API 监控设备位置），就会用到这种类型。

在 Android 平台，你需要这样注解方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
public void method3(PluginCall call) {
}
```

在 iOS 平台，你需要在插件的 `.m` 文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method3, CAPPluginReturnCallback);
)
```

回调方法接收一个函数作为参数（可能会被原生代码多次调用），并返回一个带有标识符的 Promise。

在原生代码端，实现回调意味着你需要保存调用以便后续使用。具体的处理方式[详见此处](/main/reference/core-apis/saving-calls.md)。