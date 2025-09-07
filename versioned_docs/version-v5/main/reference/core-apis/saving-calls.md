---
title: 持久化插件调用
description: 在 Capacitor 中保存插件调用的方法
slug: /core-apis/saving-calls
---

# 保存插件调用

大多数情况下，插件方法被调用执行任务后可以立即完成。但在某些场景中，你需要保持插件调用可用以便后续访问。

## 概述

在插件方法外部需要持久化插件调用（iOS 中的 `CAPPluginCall` 或 Android 中的 `PluginCall`）主要有两个原因：

1. 执行异步操作，例如网络请求
2. 向 JavaScript 环境提供重复更新，例如实时地理位置数据流

这两种情况可能重叠，但存在一个重要区别：即调用是否需要多次返回数据。Capacitor 桥接层会记录每个从 JavaScript 到原生环境的调用，以便插件返回结果时能匹配正确的代码。默认行为是在 `resolve()` 或 `reject()` 被调用一次后清除这些记录。但如果你的方法是需要多次 `resolve()` 的回调，则需要额外处理步骤。[点击此处](/plugins/creating-plugins/method-types.md)了解更多关于声明回调方法的信息。

---

### 保存单次完成的调用

如果需要保存调用以便未来完成一次，你有两个选择：
- 简单地将其保存为实例变量
- 使用桥接层的保存方法集，稍后通过 `callbackId` 检索

调用 `resolve()` 或 `reject()` 后，可以释放调用对象（如果使用了 `saveCall()` 别忘了调用 `releaseCall()`）。

**iOS**

```swift
func saveCall(_ call: CAPPluginCall)
func savedCall(withID: String) -> CAPPluginCall?
func releaseCall(_ call: CAPPluginCall)
func releaseCall(withID: String)
```

**Android**

```java
void saveCall(PluginCall call)
PluginCall getSavedCall(String callbackId)
void releaseCall(PluginCall call)
void releaseCall(String callbackId)
```

---

### 保存多次完成的调用

保存需要多次完成的调用意味着两件事：
- 保存原生调用对象本身（如上所述）
- 告知桥接层保持记录，以便能重复调用 `resolve()` 或 `reject()`

通过设置调用的 `keepAlive` 属性来标记这种方式（3.0 版本前称为 `isSaved`，重命名后更清晰地表达了行为意图）。

**iOS**

```swift
call.keepAlive = true
```

**Android**

```java
call.setKeepAlive(true);
```

当 `keepAlive` 为 true 时，可以多次调用 `resolve()` 并按预期返回结果。设置此标志为 true 也意味着桥接层会在方法返回后自动为你调用 `saveCall()`。