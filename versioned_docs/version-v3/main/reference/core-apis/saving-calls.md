---
title: 持久化插件调用
description: 如何在 Capacitor 中保存插件调用
slug: /core-apis/saving-calls
---

# 保存插件调用

在大多数情况下，插件方法被调用来执行一个任务后可以立即完成。但有些情况下，你需要保持插件调用可用，以便稍后访问。

## 概述

你可能需要让插件调用（iOS 上的 `CAPPluginCall` 或 Android 上的 `PluginCall`）在插件方法之外持久化的原因有两个：

1. 执行异步操作，例如网络请求。
2. 向 JavaScript 环境提供重复更新，例如流式传输实时地理定位数据。

这两个原因可能有重叠，但有一个重要的区别。具体来说，就是调用是否需要多次返回数据。Capacitor bridge 记录从 JavaScript 到原生端的每个调用，以便在插件返回结果时将结果匹配到正确的代码，默认行为是在 `resolve()` 或 `reject()` 被调用一次后擦除这个记账信息。但如果你的方法是一个会多次调用 `resolve()` 的回调函数，那么就需要额外的步骤。关于如何声明回调的更多信息可以[在这里找到](/plugins/creating-plugins/method-types.md)。

---

### 为单次完成保存调用

如果你需要保存一个调用以便将来完成一次，你有两个选择。一种选择是简单地在实例变量中本地保存它。第二种是使用 bridge 的方法集来保存它，然后通过 `callbackId` 稍后检索它。在调用 `resolve()` 或 `reject()` 之后，你可以处理掉调用对象，因为它将不再相关（如果你使用了 `saveCall()`，不要忘记调用 `releaseCall()`）。

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

### 为多次完成保存调用

保存一个调用以便将来多次完成意味着两件事：保存原生调用对象本身（如上所述）并告诉 bridge 保留其记账信息，以便可以重复调用 `resolve()` 或 `reject()`。

要将调用标记为此方式，请设置其 `keepAlive` 属性（在 3.0 之前这被称为 `isSaved`，但已重命名以使其行为更清晰）。

**iOS**

```swift
call.keepAlive = true
```

**Android**

```java
call.setKeepAlive(true);
```

如果 `keepAlive` 为 true，则可以根据需要多次调用 `resolve()`，并且结果将按预期返回。将此标志设置为 true 也意味着 bridge 会在你的方法返回后自动为你调用 `saveCall()`。
