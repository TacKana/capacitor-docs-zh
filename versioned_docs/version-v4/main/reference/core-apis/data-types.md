---
title: Capacitor 数据类型
description: Capacitor 中的数据格式
slug: /core-apis/data-types
---

# Capacitor 数据类型

Capacitor 中在 Web 运行时和原生环境之间传输的数据需要经过序列化和反序列化，以便能以各语言原生方式存储。支持的数据类型包括可表示为 JSON 的数值、字符串、布尔值、数组和对象（或称字典/键值对）。

## iOS 平台

虽然 Swift 是 iOS 首选语言，但它需要与 Objective-C（系统框架基于此构建）互操作，因此平台需要兼顾三种语言的数据类型兼容。大多数数据类型都能按预期转换，但有些情况需要特别注意。

---

### 空值处理

Objective-C 不支持在数组、字典或集合等容器中直接存储空值，而是使用特殊占位对象 [`NSNull`](https://developer.apple.com/documentation/foundation/nsnull?language=objc) 来表示空值。相比之下，Swift 使用[可选类型](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html)表示可能为空的值。Swift 可以处理 `NSNull` 值，但 Objective-C 无法直接操作可选类型（不过在特定上下文中，运行时会自动将可选类型映射为实际值或 `NSNull`）。无论使用哪种语言开发，都可能遇到这些 `NSNull` 对象。

例如，以下对象传递给 Capacitor 插件调用时：
```typescript
{ 'foo': null, 'bar': [1, 2, null, 4]}
```

#### 字典处理

`CAPPluginCall` 将该数据存储为 `options` 属性，并提供多种便捷访问方法。这些方法会将值转换为预期类型，因此会过滤掉 `NSNull` 值。

```swift
if let value = call.getString("foo") {
    // 正确做法：`value` 为 nil，此代码块不会执行
}
```

但直接访问存储属性可能返回 `NSNull` 对象。

```swift
if call.options["foo"] != nil {
    // 错误做法：键会返回非空的 `NSNull` 对象，此代码块会执行
}
```

> 不建议依赖键的存在与否来判断逻辑，始终应对值进行类型检查后再使用。

#### 数组处理

由于数组访问通常需要整体类型转换，因此需要考虑数组是单一类型还是混合类型。

```swift
if let values = call.getArray("bar") {
    // 中性做法：数组元素都是有效对象，代码块会执行，但每个值需单独类型转换
}
if let values = call.getArray("bar", Int?) {
    // 错误做法：数组混合了 `Int` 和 `NSNull`，无法转换为 `Int?`，代码块不会执行
}
```

为解决此问题，Capacitor 提供了便捷扩展方法，可将包含 `NSNull` 的数组转换为可选值数组。该方法作用于符合 `JSValue` 协议的所有可桥接类型，并可进一步转换为特定子类型。

```swift
if let values = call.getArray("bar").capacitor.replacingNullValues() as? [Int?] {
    // 最佳实践：`values` 已转换为 `Int?` 数组，索引 2 处为 `nil`
}
```

---

### 日期处理

大多数情况下日期类型能按预期工作。从 JavaScript 发送的 `Date` 对象或插件返回的 `Date`/`NSDate` 对象都会被序列化为 [ISO 8601 格式字符串](https://www.iso.org/iso-8601-date-and-time-format.html)。

如需调整此行为需注意：从 Web 运行时到原生 iOS 的数据传输机制与反向传输不同。`WKWebView` 会自动将 JavaScript `Date` 对象转换为原生 `Date` 对象。为保证跨平台一致性并符合开发者预期，Capacitor 3.0 起会在传递给插件前序列化这些对象。若要禁用此行为，可在插件中设置 `shouldStringifyDatesInCalls` 属性。

```swift
override func load() {
    shouldStringifyDatesInCalls = false
}
```

`CAPPluginCall` 的便捷方法 `getDate` 可处理两种数据类型并返回 `Date` 对象。

从原生代码传到 Web 视图的数据会序列化为 JSON。由于 JSON 未正式定义日期格式，3.0 之前插件结果中包含 `Date` 对象会抛出异常。现在 Capacitor 会自动按惯例将 `Date` 对象序列化为字符串。若需特殊处理日期，请先将其转换为其他支持的 JSON 类型。