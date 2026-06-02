---
title: 持久化插件调用
description: 如何在 Capacitor 中保存插件调用
slug: /core-apis/saving-calls
---

# 保存插件调用

在大多数情况下，插件方法被调用来执行任务并可以立即完成。但有些情况下，您需要保持插件调用可用，以便以后可以访问它。

## 概述

您可能需要插件调用（iOS 上的 `CAPPluginCall` 或 Android 上的 `PluginCall`）在插件方法之外持久化的两个原因是：

1. 执行异步操作，例如网络请求。
2. 向 JavaScript 环境提供重复的更新，例如流式传输实时地理定位数据。

这两个原因可能重叠，但有一个重要的区别。具体来说，调用是否需要多次返回数据。Capacitor bridge 记录从 JavaScript 到原生发出的每个调用，以便在插件返回结果时将其与正确的代码匹配，默认行为是在 `resolve()` 或 `reject()` 被调用一次后擦除此记账信息。但如果您的函数是一个将多次 `resolve()` 的回调，则涉及额外步骤。更多关于如何声明回调的信息[可以在此处找到。](/plugins/creating-plugins/method-types.md)

---

### 保存调用以单次完成

如果您需要保存一个调用以便将来完成一次，您有两个选项。一个选项是简单地将其本地保存在实例变量中。第二个是使用 bridge 的方法集来保存它，然后通过 `callbackId` 稍后检索它。在调用 `resolve()` 或 `reject()` 后，您可以丢弃调用对象，因为它将不再相关（如果使用了 `saveCall()`，不要忘记调用 `releaseCall()`）。

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

### 保存调用以多次完成

保存一个调用以便将来多次完成意味着两件事：保存原生调用对象本身（如上所述）并告诉 bridge 保留其记账信息，以便 `resolve()` 或 `reject()` 可以重复调用。

要标记这样的调用，请设置其 `keepAlive` 属性（在版本 3 之前称为 `isSaved`，但已重命名以使行为更清晰）。

**iOS**

```swift
call.keepAlive = true
```

**Android**

```java
call.setKeepAlive(true);
```

如果 `keepAlive` 为 true，则可以按需多次调用 `resolve()`，并且结果将按预期返回。将此标志设置为 true 也意味着 bridge 将在您的函数返回后自动为您调用 `saveCall()`。
