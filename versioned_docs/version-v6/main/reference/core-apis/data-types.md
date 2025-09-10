---
title: Capacitor 数据类型
description: Capacitor 中的数据格式
slug: /core-apis/data-types
---

# Capacitor 数据类型

在 Capacitor 中，Web 运行时与原生环境之间传递的数据需要经过序列化和反序列化处理，以便能以各语言原生方式存储。支持的数据类型包括所有可用 JSON 表示的类型，如数字、字符串、布尔值、数组和对象（或字典、键值存储）。

## iOS 平台

虽然 Swift 是 iOS 的首选语言，但它需要与 Objective-C（系统框架的构建基础）互操作，因此平台需要支持三种语言的交集。大多数数据类型会按预期转换，但某些情况需要特别注意。

---

### 空值处理

Objective-C 不支持在数组、字典或集合等容器中直接存储空值，而是使用特殊占位对象 [`NSNull`](https://developer.apple.com/documentation/foundation/nsnull?language=objc) 来表示空值。相比之下，Swift 使用 [可选类型](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html) 描述可能为空的值。Swift 可以处理 `NSNull`，但 Objective-C 无法直接处理可选类型（尽管在某些上下文中，运行时会自动将可选类型映射为实际值或 `NSNull`）。无论使用哪种语言，都可能遇到 `NSNull` 对象。

例如，假设以下对象被传入 Capacitor 插件调用：

```typescript
{ 'foo': null, 'bar': [1, 2, null, 4]}
```

#### 字典处理

`CAPPluginCall` 将这些数据存储为 `options` 属性，并提供多种便捷访问方法。这些方法会将值转换为预期类型，因此 `NSNull` 值会被过滤。

```swift
if let value = call.getString("foo") {
    // 正确：`value` 为 nil，此代码块不会执行
}
```

但直接访问存储属性可能会返回 `NSNull` 对象。

```swift
if call.options["foo"] != nil {
    // 问题：键返回了非空的 `NSNull` 对象，此代码块会执行
}
```

> 不建议依赖键的存在与否来传递含义，始终应通过类型检查来评估对应值。

#### 数组处理

由于访问数组通常需要对整个集合进行类型转换，必须考虑它是单一类型还是可能包含混合类型。

```swift
if let values = call.getArray("bar") {
    // 中性：数组包含所有有效对象，代码块会执行，但每个值需要单独类型转换
}
if let values = call.getArray("bar", Int?) {
    // 问题：数组混合了 `Int` 和 `NSNull`，无法转换为 `Int?`，代码块不会执行
}
```

为解决此问题，Capacitor 提供了便捷扩展方法，可将包含 `NSNull` 的数组映射为可选值数组。该方法基于 `JSValue` 协议（表示所有可跨环境桥接的有效类型），并可转换为特定子类型。

```swift
if let values = call.getArray("bar").capacitor.replacingNullValues() as? [Int?] {
    // 正确：`values` 已转换为 `Int?` 数组，索引 2 处为 `nil`
}
```

---

### 日期处理

在大多数情况下，日期类型会按预期工作。从 JavaScript 发送的 `Date` 对象或插件返回的 `Date`/`NSDate` 对象都会被序列化为 [ISO 8601 字符串](https://www.iso.org/iso-8601-date-and-time-format.html)。

但该行为可以按需调整。数据从 Web 运行时到原生 iOS 的传输机制与反向传输不同。`WKWebView` 会自动将 JavaScript `Date` 对象转换为原生 `Date` 对象。为保持多平台一致性并符合开发者预期，从 3.0 版本开始，Capacitor 会在将对象传递给插件前进行序列化。如需禁用此行为，可在插件中设置 `shouldStringifyDatesInCalls` 属性。

```swift
override func load() {
    shouldStringifyDatesInCalls = false
}
```

`CAPPluginCall` 的便捷方法 `getDate` 能处理两种数据类型并返回 `Date` 对象。

从原生代码传输到 Web 视图的数据会以 JSON 格式序列化。由于 JSON 未正式定义日期类型，在 3.0 之前，插件结果中包含 `Date` 对象会引发异常。现在 Capacitor 会自动按惯例将 `Date` 序列化为字符串。若插件需要特殊处理日期，应先将其转换为其他支持的 JSON 类型。