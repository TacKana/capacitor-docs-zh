---
title: Capacitor 数据类型
description: Capacitor 中的数据类型
slug: /core-apis/data-types
---

# Capacitor 数据类型

Capacitor 中在 Web 运行时与原生环境之间传输的数据必须进行序列化和反序列化，以便它们能以原生方式存储在各种语言中。支持的数据类型是那些可以用 JSON 表示的类型，例如数字、字符串、布尔值、数组和对象（或字典或键值存储）。

## iOS

虽然 Swift 是 iOS 上的首选语言，但它与 Objective-C（系统框架基于此构建）可以互操作，因此该平台支持三种语言的交集。大多数数据类型都会按预期转换，但有些情况可能需要特别注意。

---

### 空值

Objective-C 不支持在数组、字典或集合等集合中存储空值。相反，它使用一个特殊的占位符对象 [`NSNull`](https://developer.apple.com/documentation/foundation/nsnull?language=objc) 来表示空值。相比之下，Swift 使用 [可选类型](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html) 来描述可能为空的值。Swift 可以处理 `NSNull` 值，但 Objective-C 无法处理可选类型（尽管在某些上下文中，运行时会自动将可选类型映射到底层值或 `NSNull`）。无论您使用哪种语言，这些 `NSNull` 对象都可能会出现。

例如，考虑以下对象传递到 Capacitor 插件调用中：

```typescript
{ 'foo': null, 'bar': [1, 2, null, 4]}
```

#### 字典

`CAPPluginCall` 将此数据存储为其 `options` 属性，但提供了多种便捷访问器来操作它。这些访问器会将值转换到预期类型，因此 `NSNull` 值会被过滤掉。

```swift
if let value = call.getString("foo") {
    // 正确：`value` 为 nil，因此此代码块不会运行
}
```

但是，直接访问存储属性可能会返回一个 `NSNull` 对象。

```swift
if call.options["foo"] != nil {
    // 错误：键返回了一个为真的 `NSNull` 对象，因此此代码块会运行
}
```

> 不建议依赖键的存在来传达含义。始终对相应的值进行类型检查以评估它。

#### 数组

由于访问数组通常需要为整个集合指定类型，因此考虑它是否包含单一类型或可能是异构类型很重要。

```swift
if let values = call.getArray("bar") {
    // 中性：数组全部是有效对象，因此此代码块会运行，但每个值都需要单独指定类型
}
if let values = call.getArray("bar", Int?) {
    // 错误：数组是 `Int` 和 `NSNull` 的混合，无法转换为 `Int?`，因此此代码块不会运行
}
```

为了帮助处理这种行为，Capacitor 包含了一个便捷的扩展，可以将包含 `NSNull` 值的数组映射为可选类型的数组。它适用于 `JSValue` 协议，该协议表示可以在环境之间桥接的所有有效类型，但可以转换为特定的子类型。

```swift
if let values = call.getArray("bar").capacitor.replacingNullValues() as? [Int?] {
    // 正确：`values` 现在已转换为 `Int?`，索引 2 处为 `nil`
}
```

---

### 日期

在大多数情况下，日期应该能按预期工作。从 JavaScript 发送的任何 `Date` 对象，或从插件返回的 `Date` 或 `NSDate` 对象，都将被序列化为 [ISO 8601 字符串](https://www.iso.org/iso-8601-date-and-time-format.html)。

但是，如果需要，可以更改此行为的一部分。从 Web 运行时传输到原生 iOS 代码的数据使用的机制与反向传输不同。`WKWebView` 会自动将 JavaScript `Date` 对象转换为原生 `Date` 对象。为了与其他平台保持一致并符合开发者的期望，从 3.0 开始，Capacitor 会在将这些对象传递给插件之前对其进行序列化。如果您想选择退出此行为，请在插件上设置 `shouldStringifyDatesInCalls` 属性。

```swift
override func load() {
    shouldStringifyDatesInCalls = false
}
```

`CAPPluginCall` 的便捷访问器 `getDate` 将处理这两种数据类型并返回 `Date` 对象。

从原生代码传输到 Web 视图的数据将作为 JSON 序列化。由于 JSON 没有正式定义日期，在 3.0 之前，在插件结果中包含 `Date` 对象会引发异常。但现在 Capacitor 会自动将任何 `Date` 对象序列化为字符串，这是惯例做法。如果您的插件需要以不同方式处理日期，请先将它们序列化为其他受支持的 JSON 类型。