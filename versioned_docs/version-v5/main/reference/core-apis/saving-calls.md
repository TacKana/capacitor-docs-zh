---
title: 持久化插件调用
description: 如何在 Capacitor 中保存插件调用
slug: /core-apis/saving-calls
---

# 保存插件调用

在大多数情况下，插件方法被调用执行任务后可以立即完成。但在某些场景中，您需要保持插件调用可用，以便后续访问。

## 概述

您可能需要让插件调用（在 iOS 上是 `CAPPluginCall`，在 Android 上是 `PluginCall`）在插件方法之外持久存在的两个原因：

1. 执行异步操作，例如网络请求。
2. 向 JavaScript 环境提供重复更新，例如实时地理位置数据流。

这两个原因可能重叠，但有一个重要区别：即调用是否需要多次返回数据。Capacitor 桥接器会记录从 JavaScript 到原生的每次调用，以便插件返回结果时能将其匹配到正确的代码。默认行为是在调用一次 `resolve()` 或 `reject()` 后清除这些记录。但如果您的插件方法是需要多次 `resolve()` 的回调函数，则需要额外的处理步骤。更多关于如何声明回调函数的信息，[请参阅此处](/plugins/creating-plugins/method-types.md)。

---

### 保存用于单次完成的调用

如果您需要保存一个调用以便未来完成一次，您有两个选择。一种选择是简单地将其保存在实例变量中。第二种是使用桥接器提供的方法集来保存它，然后通过 `callbackId` 在稍后检索它。在调用 `resolve()` 或 `reject()` 之后，您可以处理掉调用对象，因为它不再相关（如果您使用了 `saveCall()`，别忘了调用 `releaseCall()`）。

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

### 保存用于多次完成的调用

保存一个调用以便未来多次完成意味着两件事：保存原生调用对象本身（如上所述）并告诉桥接器保留其记录，以便可以重复调用 `resolve()` 或 `reject()`。

要将调用标记为这种方式，请设置其 `keepAlive` 属性（在版本 3 之前这被称为 `isSaved`，但已重命名为 `keepAlive` 以使行为更清晰）。

**iOS**

```swift
call.keepAlive = true
```

**Android**

```java
call.setKeepAlive(true);
```

如果 `keepAlive` 为 true，那么 `resolve()` 可以根据需要调用多次，结果将按预期返回。将此标志设置为 true 还意味着在您的方法返回后，桥接器会自动为您调用 `saveCall()`。