---
title: 持久化插件调用
description: 如何在 Capacitor 中保存插件调用
slug: /core-apis/saving-calls
---

# 保存插件调用

在大多数情况下，插件方法被调用执行任务后可以立即完成。但有些情况下，您需要保持插件调用可用，以便稍后访问。

## 概述

您可能需要让插件调用（iOS 上的 `CAPPluginCall` 或 Android 上的 `PluginCall`）在插件方法之外持久存在的两个原因是：

1. 执行异步操作，例如网络请求。
2. 向 JavaScript 环境提供重复更新，例如流式传输实时地理位置数据。

这两个原因可能重叠，但有一个重要区别。具体来说，是调用是否需要多次返回数据。Capacitor 桥接器会记录每个从 JavaScript 到原生的调用，以便在插件返回结果时将其与正确的代码匹配，默认行为是在调用一次 `resolve()` 或 `reject()` 后清除这些记录。但如果您的方是一个会多次调用 `resolve()` 的回调，则需要额外的步骤。关于如何声明回调的更多信息[可以在这里找到](/plugins/creating-plugins/method-types.md)。

---

### 保存单次完成的调用

如果您需要保存一个调用以便在未来完成一次，有两个选择。一个选择是简单地在实例变量中本地保存它。第二个是使用桥接器的一组方法来保存它，然后通过 `callbackId` 稍后检索它。在调用 `resolve()` 或 `reject()` 后，您可以释放调用对象，因为它将不再相关（如果您使用了 `saveCall()`，不要忘记调用 `releaseCall()`）。

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

保存一个调用以便在未来多次完成意味着两件事：保存原生调用对象本身（如上所述）并告诉桥接器保留其记录，以便可以重复调用 `resolve()` 或 `reject()`。

要以这种方式标记调用，请设置其 `keepAlive` 属性（在版本 3 之前这被称为 `isSaved`，但已重命名以使行为更清晰）。

**iOS**

```swift
call.keepAlive = true
```

**Android**

```java
call.setKeepAlive(true);
```

如果 `keepAlive` 为 true，那么可以根据需要多次调用 `resolve()`，结果将按预期返回。将此标志设置为 true 还意味着桥接器将在您的方法返回后自动为您调用 `saveCall()`。