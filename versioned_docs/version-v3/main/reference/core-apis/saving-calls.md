---
title: 持久化插件调用
description: 如何在 Capacitor 中保存插件调用
slug: /core-apis/saving-calls
---

# 持久化插件调用

大多数情况下，插件方法被调用执行任务后可以立即完成。但有些场景下，您需要保持插件调用处于可用状态以便后续访问。

## 概述

需要让插件调用（iOS 中的 `CAPPluginCall` 或 Android 中的 `PluginCall`）在插件方法之外持久化的两种典型情况：

1. 执行异步操作（如网络请求）
2. 需要向 JavaScript 环境重复推送更新（如实时地理位置数据流）

这两种情况可能有交集，但存在一个重要区别——核心在于该调用是否需要多次返回数据。Capacitor 桥接层会记录每个从 JavaScript 发起的原生调用，以便在插件返回结果时能正确匹配代码，默认行为是在首次调用 `resolve()` 或 `reject()` 后清除相关记录。但如果您的插件方法需要多次调用 `resolve()`，则需要额外处理。[更多关于声明回调方法的信息](/plugins/creating-plugins/method-types.md)

---

### 单次完成的调用保存

如需保存调用以便未来单次完成，您有两个选择：
1. 直接保存在实例变量中
2. 使用桥接层提供的方法保存，后续通过 `callbackId` 检索
完成 `resolve()` 或 `reject()` 后即可释放调用对象（若使用 `saveCall()` 请记得调用 `releaseCall()`）

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

### 多次完成的调用保存

保存调用用于多次完成意味着：
1. 保存原生调用对象（同上）
2. 告知桥接层保留记录以便重复调用 `resolve()` 或 `reject()`

通过设置 `keepAlive` 属性来标记这类调用（3.0 版本前称为 `isSaved`，重命名后更清晰）

**iOS**

```swift
call.keepAlive = true
```

**Android**

```java
call.setKeepAlive(true);
```

当 `keepAlive` 为 true 时，可多次调用 `resolve()` 且结果会正常返回。设置此标志后，桥接层会在方法返回时自动执行 `saveCall()`。