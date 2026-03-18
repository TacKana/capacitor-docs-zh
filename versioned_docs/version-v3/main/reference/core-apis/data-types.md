---
title: Capacitor 数据类型
description: Capacitor 中的数据类型
slug: /core-apis/data-types
---

# Capacitor 数据类型

在 Capacitor 中，Web 运行时与原生环境之间传输的数据需要进行序列化和反序列化，以便在各语言中本地存储。支持的数据类型是那些可以用 JSON 表示的类型，例如数字、字符串、布尔值、数组和对象（或字典、键值存储）。

## iOS

虽然 Swift 是 iOS 的首选语言，但它与 Objective-C（系统框架基于此构建）可以互操作，因此该平台支持三种语言的交集。大多数数据类型会按预期转换，但某些情况可能需要特别注意。

---

### 空值

Objective-C 不支持在集合（如数组、字典或集合）中存储空值。它使用一个特殊的占位符对象 [`NSNull`](https://developer.apple.com/documentation/foundation/nsnull?language=objc) 来表示空值。相比之下，Swift 使用 [可选类型](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html) 来描述可能为空的值。Swift 可以操作 `NSNull` 值，但 Objective-C 无法处理可选类型（尽管在某些上下文中，运行时会自动将可选类型映射为底层值或 `NSNull`）。无论你使用哪种语言，这些 `NSNull` 对象都可能出现。

例如，考虑以下传递给 Capacitor 插件调用的对象：

```typescript
{ 'foo': null, 'bar': [1, 2, null, 4]}
```

#### 字典

`CAPPluginCall` 将此数据存储为其 `options` 属性，但提供了多种便捷访问器来操作它。这些访问器会将值转换为期望的类型，因此 `NSNull` 值会被过滤掉。

```swift
if let value = call.getString("foo") {
    // 正确：`value` 为 nil，因此此代码块不会执行
}
```

但是，直接访问存储属性可能会返回一个 `NSNull` 对象。

```swift
if call.options["foo"] != nil {
    // 错误：键返回了为真的 `NSNull` 对象，因此此代码块会执行
}
```

> 不建议依赖键的存在来传递含义。始终对相应值进行类型检查以进行评估。

#### 数组

由于访问数组通常需要对整个集合进行类型转换，因此考虑它是否包含单一类型或可能是异构类型很重要。

```swift
if let values = call.getArray("bar") {
    // 中性：数组包含所有有效对象，因此此代码块会执行，但每个值需要单独进行类型转换
}
if let values = call.getArray("bar", Int?) {
    // 错误：数组混合了 `Int` 和 `NSNull`，无法转换为 `Int?`，因此此代码块不会执行
}
```

为了帮助处理此行为，Capacitor 包含一个便捷扩展，可以将包含 `NSNull` 值的数组映射为可选类型数组。它适用于 `JSValue` 协议，该协议表示可以在环境之间桥接的所有有效类型，但可以转换为特定的子类型。

```swift
if let values = call.getArray("bar").capacitor.replacingNullValues() as? [Int?] {
    // 正确：`values` 现在转换为 `Int?`，索引 2 处为 `nil`
}
```

---

### 日期

在大多数情况下，日期应该能按预期工作。从 JavaScript 发送的任何 `Date` 对象，或从插件返回的任何 `Date` 或 `NSDate` 对象，都将被序列化为 [ISO 8601 字符串](https://www.iso.org/iso-8601-date-and-time-format.html)。

但是，如果需要，可以更改此行为的一部分。从 Web 运行时传输到原生 iOS 代码的数据使用的机制与反向传输不同。`WKWebView` 会自动将 JavaScript `Date` 对象转换为原生 `Date` 对象。为了与其他平台保持一致并满足开发者期望，Capacitor 从 3.0 版本开始，会在将对象传递给插件之前将其序列化。如果你想退出此行为，请在你的插件上设置 `shouldStringifyDatesInCalls` 属性。

```swift
override func load() {
    shouldStringifyDatesInCalls = false
}
```

`CAPPluginCall` 的便捷访问器 `getDate` 会处理这两种数据类型，并返回一个 `Date` 对象。

从原生代码传输到 Web 视图的数据将被序列化为 JSON。由于 JSON 官方未定义日期类型，在 3.0 版本之前，在插件结果中包含 `Date` 对象会抛出异常。但现在 Capacitor 会自动将任何 `Date` 对象按照惯例序列化为字符串。如果你的插件需要以不同方式处理日期，请先将它们序列化为其他支持的 JSON 类型。