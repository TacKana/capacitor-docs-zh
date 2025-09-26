---
title: 持久化插件调用
description: 在 Capacitor 中保存插件调用的方法
slug: /core-apis/saving-calls
---

# 保存插件调用

通常情况下，插件方法被调用执行任务后可以立即完成。但在某些场景下，您可能需要保持插件调用可用以便后续访问。

## 概览

在插件方法外部需要持久化插件调用（iOS 中的 `CAPPluginCall` 或 Android 中的 `PluginCall`）的两种主要情况：

1. 执行异步操作（如网络请求）
2. 向 JavaScript 环境持续返回更新（如实时地理位置数据流）

这两种情况可能重叠，但存在重要区别——关键在于调用是否需要多次返回数据。Capacitor 桥接层会记录每个从 JavaScript 到原生环境的调用，以便在插件返回结果时正确匹配代码。默认情况下，在首次调用 `resolve()` 或 `reject()` 后会清除这些记录。但如果您的方法是需要多次 `resolve()` 的回调，则需要额外处理。[点击这里](/plugins/creating-plugins/method-types.md)了解更多关于声明回调方法的信息。

---

### 保存单次完成的调用

如果需要保存调用以供未来单次完成，您有两种选择：
1. 直接将其保存为实例变量
2. 使用桥接层的方法保存并通过 `callbackId` 后续检索

调用 `resolve()` 或 `reject()` 后，该调用对象将不再相关（注意：如果使用 `saveCall()` 请务必调用 `releaseCall()`）。

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

保存用于多次完成的调用需要同时做两件事：
1. 保存原生调用对象（同上）
2. 通知桥接层保持记录，以便重复调用 `resolve()` 或 `reject()`

通过设置调用的 `keepAlive` 属性来启用此模式（3.0 版本前称为 `isSaved`，重命名后更清晰地表达了行为意图）。

**iOS**

```swift
call.keepAlive = true
```

**Android**

```java
call.setKeepAlive(true);
```

当 `keepAlive` 为 true 时，可以多次调用 `resolve()` 并按预期返回结果。设置此标志为 true 也意味着桥接层会在方法返回后自动为您调用 `saveCall()`。