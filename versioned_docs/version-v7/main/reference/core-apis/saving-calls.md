---
title: 持久化插件调用
description: 如何在 Capacitor 中保存插件调用
slug: /core-apis/saving-calls
---

# 保存插件调用

在大多数情况下，插件方法被调用执行任务后可以立即完成。但在某些情况下，你需要保持插件调用可用，以便稍后访问。

## 概述

你可能需要让插件调用（iOS 上的 `CAPPluginCall` 或 Android 上的 `PluginCall`）在你的插件方法之外持久存在，主要有两个原因：

1. 执行异步操作，例如网络请求。
2. 向 JavaScript 环境提供重复更新，例如流式传输实时地理位置数据。

这两个原因可能重叠，但存在重要区别。具体来说，是调用是否需要多次返回数据。Capacitor 桥接层会记录从 JavaScript 到原生代码的每次调用，以便插件返回结果时能够匹配正确的代码，默认行为是在 `resolve()` 或 `reject()` 被调用一次后清除这些记录。但如果你的方法是一个会多次调用 `resolve()` 的回调函数，则需要额外的步骤。更多关于如何声明回调函数的信息[可以在这里找到](/plugins/creating-plugins/method-types.md)。

---

### 保存单次完成的调用

如果你需要保存一个调用以便将来完成一次，你有两个选择。一种选择是简单地将它保存在实例变量中。第二种是使用桥接层的方法集来保存它，然后稍后通过 `callbackId` 检索它。在调用 `resolve()` 或 `reject()` 之后，你可以丢弃这个调用对象，因为它将不再相关（如果你使用了 `saveCall()`，别忘了调用 `releaseCall()`）。

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

保存一个调用以便将来多次完成意味着两件事：保存原生调用对象本身（如上所述），并告诉桥接层保留其记录，以便可以重复调用 `resolve()` 或 `reject()`。

要这样标记一个调用，请设置其 `keepAlive` 属性（在版本 3 之前这被称为 `isSaved`，但已重命名以使行为更清晰）。

**iOS**

```swift
call.keepAlive = true
```

**Android**

```java
call.setKeepAlive(true);
```

如果 `keepAlive` 为 true，那么 `resolve()` 可以根据需要调用多次，结果将按预期返回。将此标志设置为 true 也意味着桥接层会在你的方法返回后自动为你调用 `saveCall()`。