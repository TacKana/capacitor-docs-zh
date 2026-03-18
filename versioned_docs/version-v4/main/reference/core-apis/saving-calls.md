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

这两个原因可能重叠，但存在重要区别。具体来说，是否需要一个调用多次返回数据。Capacitor 桥接器会记录从 JavaScript 到原生环境的每个调用，以便插件返回结果时能够将结果匹配到正确的代码，默认行为是在 `resolve()` 或 `reject()` 被调用一次后清除这些记录。但如果您的方法是需要多次 `resolve()` 的回调函数，则需要额外的步骤。更多关于如何声明回调函数的信息[可在此处找到](/plugins/creating-plugins/method-types.md)。

---

### 保存单次完成的调用

如果您需要保存一个调用以便将来完成一次，您有两个选择。一个选择是简单地将它保存在实例变量中。第二个是使用桥接器的方法集保存它，然后稍后通过 `callbackId` 检索它。调用 `resolve()` 或 `reject()` 后，您可以释放调用对象，因为它将不再相关（如果使用了 `saveCall()`，别忘了调用 `releaseCall()`）。

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

保存一个调用以便将来多次完成意味着两件事：保存原生调用对象本身（如上所述）并告诉桥接器保留其记录，以便可以重复调用 `resolve()` 或 `reject()`。

要这样标记调用，请设置其 `keepAlive` 属性（在版本 3 之前这被称为 `isSaved`，但已重命名以使行为更清晰）。

**iOS**

```swift
call.keepAlive = true
```

**Android**

```java
call.setKeepAlive(true);
```

如果 `keepAlive` 为 true，那么 `resolve()` 可以根据需要调用多次，结果将按预期返回。将此标志设置为 true 也意味着桥接器会在您的方法返回后自动为您调用 `saveCall()`。