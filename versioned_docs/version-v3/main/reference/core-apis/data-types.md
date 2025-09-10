---
title: Capacitor 数据类型
description: Capacitor 中的数据格式
slug: /core-apis/data-types
---

# Capacitor 数据类型

Capacitor 中在 Web 运行时和原生环境之间传输的数据需要经过序列化和反序列化处理，以便在各语言原生环境中存储。支持的数据类型包括可用 JSON 表示的数值、字符串、布尔值、数组和对象（或称字典/键值存储）。

## iOS 平台

虽然 Swift 是 iOS 的首选语言，但由于需要与系统框架底层使用的 Objective-C 交互，因此平台需要支持三种语言的交集。大多数数据类型会按预期转换，但有些情况需要特别注意。

---

### 空值处理

Objective-C 不支持在数组、字典或集合等结构中存储空值，而是使用特殊占位对象 [`NSNull`](https://developer.apple.com/documentation/foundation/nsnull?language=objc) 表示空值。而 Swift 则使用[可选类型](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html)来描述可能为空的值。Swift 可以处理 `NSNull` 值，但 Objective-C 无法直接处理可选类型（虽然在某些情况下运行时会自动将可选类型映射为实际值或 `NSNull`）。无论使用哪种语言，都可能遇到 `NSNull` 对象。

例如，考虑以下传递给 Capacitor 插件调用的对象：

```typescript
{ 'foo': null, 'bar': [1, 2, null, 4]}
```

#### 字典处理

`CAPPluginCall` 将这些数据存储在其 `options` 属性中，并提供多种便捷访问方法。这些访问器会将值转换为预期类型，因此 `NSNull` 值会被过滤。

```swift
if let value = call.getString("foo") {
    // 正确：`value` 为 nil，此代码块不会执行
}
```

但直接访问存储属性可能会返回 `NSNull` 对象。

```swift
if call.options["foo"] != nil {
    // 错误：键返回了非空的 `NSNull` 对象，此代码块会执行
}
```

> 不建议依赖键是否存在来传递业务含义。始终对值进行类型检查后再使用。

#### 数组处理

由于访问数组通常需要指定整体类型，因此需考虑数组是单一类型还是混合类型。

```swift
if let values = call.getArray("bar") {
    // 中性：数组包含有效对象会执行此块，但每个值仍需单独类型检查
}
if let values = call.getArray("bar", Int?) {
    // 错误：混合 `Int` 和 `NSNull` 无法转为 `Int?`，此块不会执行
}
```

为此，Capacitor 提供了便捷扩展方法，可将含 `NSNull` 的数组转换为可选值数组。该方法作用于 `JSValue` 协议（表示环境间可桥接的所有有效类型），但可强制转换为特定子类型。

```swift
if let values = call.getArray("bar").capacitor.replacingNullValues() as? [Int?] {
    // 正确：`values` 已转为 `Int?` 数组，索引2处为 `nil`
}
```

---

### 日期处理

多数情况下日期类型会按预期工作。从 JavaScript 发送的 `Date` 对象或插件返回的 `Date`/`NSDate` 对象都会被序列化为 [ISO 8601 字符串](https://www.iso.org/iso-8601-date-and-time-format.html)。

但部分行为可按需调整。Web 运行时到原生 iOS 的数据传输机制与反向传输不同。`WKWebView` 会自动将 JavaScript `Date` 对象转为原生 `Date` 对象。为保持多平台一致性和开发者预期，Capacitor 3.0+ 会在传递给插件前序列化这些对象。如需禁用此行为，可在插件中设置：

```swift
override func load() {
    shouldStringifyDatesInCalls = false
}
```

`CAPPluginCall` 的便捷方法 `getDate` 能处理两种数据类型并返回 `Date` 对象。

从原生代码到 Web 视图的数据会以 JSON 格式序列化。由于 JSON 未正式定义日期类型，3.0 之前插件结果中包含 `Date` 对象会抛出异常。现在 Capacitor 会自动按惯例将 `Date` 对象序列化为字符串。如需特殊处理日期，请先将其转为其他支持的 JSON 类型。