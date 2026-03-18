---
title: 持久化插件调用
description: 如何在 Capacitor 中保存插件调用
slug: /core-apis/saving-calls
---

# 保存插件调用

在大多数情况下，插件方法被调用以执行任务，并能立即完成。但是，在某些情况下，您需要保持插件调用可用，以便稍后可以访问。

## 概述

您可能需要将插件调用（在 iOS 上为 `CAPPluginCall`，在 Android 上为 `PluginCall`）持久化保存在插件方法之外的两个原因是：

1. 执行异步操作，例如网络请求。
2. 向 JavaScript 环境提供重复更新，例如流式传输实时地理位置数据。

这两个原因可能重叠，但有一个重要的区别。具体来说，是调用是否需要返回数据多次。Capacitor 桥接器会记录从 JavaScript 到原生环境的每次调用，以便在插件返回结果时能够将其与正确的代码匹配。默认行为是在调用 `resolve()` 或 `reject()` 一次后清除此记录。但是，如果您的方法是一个会多次调用 `resolve()` 的回调，则需要额外的步骤。关于如何声明回调的更多信息[可在此处找到](/plugins/creating-plugins/method-types.md)。

---

### 保存调用以完成单次操作

如果您需要保存一个调用以便在未来完成一次操作，您有两个选择。一种选择是简单地在实例变量中本地保存它。第二种是使用桥接器的一组方法来保存它，然后稍后通过 `callbackId` 检索它。调用 `resolve()` 或 `reject()` 后，您可以释放调用对象，因为它将不再相关（如果使用了 `saveCall()`，别忘了调用 `releaseCall()`）。

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

### 保存调用以完成多次操作

保存一个调用以便在未来完成多次操作意味着两件事：保存原生调用对象本身（如上所述），并告诉桥接器保留其记录，以便可以重复调用 `resolve()` 或 `reject()`。

要以这种方式标记调用，请设置其 `keepAlive` 属性（在版本 3 之前这被称为 `isSaved`，但已重命名以使行为更清晰）。

**iOS**

```swift
call.keepAlive = true
```

**Android**

```java
call.setKeepAlive(true);
```

如果 `keepAlive` 为 true，则可以按需多次调用 `resolve()`，结果将按预期返回。将此标志设置为 true 还意味着桥接器将在您的方法返回后自动为您调用 `saveCall()`。