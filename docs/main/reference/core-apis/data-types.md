---
title: Capacitor 数据类型
description: Capacitor 中的数据类型
slug: /core-apis/data-types
---

# Capacitor 数据类型

在 Capacitor 中，在 Web 运行时和原生环境之间移动的数据必须经过序列化和反序列化，以便能够以每种语言的原生方式进行存储。支持的数据类型是那些可以用 JSON 表示的类型，例如数字、字符串、布尔值、数组和对象（或字典、键值存储）。

## iOS

虽然 Swift 是 iOS 上的首选语言，但它需要与 Objective-C（系统框架构建于其上）进行互操作，因此该平台支持三种语言的交集。大多数数据类型会按预期转换，但某些情况可能需要特别注意。

---

### 空值（Null Values）

Objective-C 不支持在集合（如数组、字典或集合）中存储空值。相反，它使用一个特殊的占位符对象 [`NSNull`](https://developer.apple.com/documentation/foundation/nsnull?language=objc) 来表示空值。相比之下，Swift 使用[可选值（Optionals）](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html)来描述可能为空的数值。Swift 可以操作 `NSNull` 值，但 Objective-C 无法处理可选值（不过，在某些上下文中，运行时会自动将可选值映射为底层值或 `NSNull`）。无论你使用哪种语言，都可能出现这些 `NSNull` 对象。

例如，考虑以下传递给 Capacitor 插件调用的对象：

```typescript
{ 'foo': null, 'bar': [1, 2, null, 4]}
```

#### 字典（Dictionaries）

`CAPPluginCall` 将这些数据存储在其 `options` 属性中，但提供了多种便捷访问器来操作它。访问器会将值转换为预期的类型，因此 `NSNull` 值会被过滤掉。

```swift
if let value = call.getString("foo") {
    // 正确：`value` 为 nil，因此此代码块不会执行
}
```

然而，直接访问存储属性可能会返回 `NSNull` 对象。

```swift
if call.options["foo"] != nil {
    // 错误：该键返回了一个为真的 `NSNull` 对象，因此此代码块会执行
}
```

> 不建议依赖键的存在来传达含义。始终对相应的值进行类型检查以进行评估。

#### 数组（Arrays）

由于访问数组通常需要对整个集合进行类型指定，因此考虑数组是包含单一类型还是可能包含异构类型非常重要。

```swift
if let values = call.getArray("bar") {
    // 中性：数组中的所有对象都是有效的，因此此代码块会执行，但每个值需要单独进行类型指定
}
if let values = call.getArray("bar", Int?) {
    // 错误：数组是 `Int` 和 `NSNull` 的混合体，无法转换为 `Int?`，因此此代码块不会执行
}
```

为了帮助处理这种情况，Capacitor 包含一个便捷扩展，可以将包含 `NSNull` 值的数组映射为可选值数组。它适用于 `JSValue` 协议，该协议表示所有可以在环境之间桥接的有效类型，但可以被转换为特定的子类型。

```swift
if let values = call.getArray("bar").capacitor.replacingNullValues() as? [Int?] {
    // 正确：`values` 现在被转换为 `Int?`，索引 2 处为 `nil`
}
```

---

### 日期（Dates）

在大多数情况下，日期应该按预期工作。从 JavaScript 发送的任何 `Date` 对象，或从插件返回的 `Date` 或 `NSDate` 对象，都将被序列化为 [ISO 8601 字符串](https://www.iso.org/iso-8601-date-and-time-format.html)。

然而，如果需要，可以更改此行为的部分内容。从 Web 运行时传递到原生 iOS 代码的数据与反向传递的数据使用不同的机制。`WKWebView` 会自动将 JavaScript 的 `Date` 对象转换为原生的 `Date` 对象。为了与其他平台保持一致并满足开发者的预期，Capacitor 从 3.0 开始会在将这些对象传递给插件之前对其进行序列化。如果你希望选择退出此行为，可以在插件上设置 `shouldStringifyDatesInCalls` 属性。

```swift
override func load() {
    shouldStringifyDatesInCalls = false
}
```

`CAPPluginCall` 的便捷访问器 `getDate` 可以处理这两种数据类型并返回一个 `Date` 对象。

从原生代码传递到 Web 视图的数据将被序列化为 JSON。由于 JSON 没有官方定义日期，因此在 3.0 之前，在插件的结果中包含 `Date` 对象会抛出异常。但 Capacitor 现在会根据约定自动将任何 `Date` 对象序列化为字符串。如果你的插件需要以不同方式处理日期，请先将它们序列化为其他受支持的 JSON 类型。
