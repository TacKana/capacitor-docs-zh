---
title: Capacitor 数据类型
description: Capacitor 中的数据类型处理
slug: /core-apis/data-types
---

# Capacitor 数据类型

Capacitor 中在 Web 运行时和原生环境之间传输的数据需要进行序列化和反序列化，以便在各语言原生环境中存储。支持的数据类型包括可表示为 JSON 的类型，如数字、字符串、布尔值、数组和对象（或字典/键值存储）。

## iOS 平台

虽然 Swift 是 iOS 的首选语言，但它需要与 Objective-C（系统框架的构建基础）交互，因此平台需要支持三种语言的交集。大多数数据类型会按预期转换，但某些情况需要特别注意。

---

### 空值处理

Objective-C 不支持在数组、字典或集合等容器中存储 null 值，而是使用特殊占位对象 [`NSNull`](https://developer.apple.com/documentation/foundation/nsnull?language=objc) 来表示空值。相比之下，Swift 使用 [可选类型](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html) 描述可能为 null 的值。Swift 可以处理 `NSNull` 值，但 Objective-C 无法处理可选类型（不过在特定上下文中，运行时会自动将可选类型映射为基础值或 `NSNull`）。无论使用哪种语言，都可能遇到 `NSNull` 对象。

例如，考虑以下传递给 Capacitor 插件调用的对象：

```typescript
{ 'foo': null, 'bar': [1, 2, null, 4]}
```

#### 字典处理

`CAPPluginCall` 将该数据存储为 `options` 属性，但提供了多种便捷访问器。这些访问器会将值转换为预期类型，因此 `NSNull` 值会被过滤掉。

```swift
if let value = call.getString("foo") {
    // 正确：`value` 为 nil，此代码块不会执行
}
```

但直接访问存储属性可能会返回 `NSNull` 对象。

```swift
if call.options["foo"] != nil {
    // 错误：该键返回了真值 `NSNull` 对象，此代码块会执行
}
```

> 不建议依赖键是否存在来判断逻辑，始终应对值进行类型检查后再使用。

#### 数组处理

由于访问数组通常需要对整个集合进行类型转换，因此需考虑数组是否包含单一类型或可能是混合类型。

```swift
if let values = call.getArray("bar") {
    // 中性：数组包含有效对象，此代码块会执行，但每个值仍需单独类型转换
}
if let values = call.getArray("bar", Int?) {
    // 错误：数组混合了 `Int` 和 `NSNull`，无法转换为 `Int?`，此代码块不会执行
}
```

为解决此问题，Capacitor 提供了便捷扩展方法，可将包含 `NSNull` 的数组映射为可选类型数组。该方法基于 `JSValue` 协议（表示环境间可桥接的所有有效类型），但可转换为特定子类型。

```swift
if let values = call.getArray("bar").capacitor.replacingNullValues() as? [Int?] {
    // 正确：`values` 现在转换为 `Int?` 类型，索引2处为 `nil`
}
```

---

### 日期处理

大多数情况下日期类型能按预期工作。从 JavaScript 发送的 `Date` 对象或插件返回的 `Date`/`NSDate` 对象都会被序列化为 [ISO 8601 字符串](https://www.iso.org/iso-8601-date-and-time-format.html)。

但此行为可根据需求调整。数据从 Web 运行时到原生 iOS 代码的传输机制与反向传输不同。`WKWebView` 会自动将 JavaScript `Date` 对象转换为原生 `Date` 对象。为保持跨平台一致性并符合开发者预期，Capacitor 3.0 起会在传递给插件前序列化这些对象。如需禁用此行为，可在插件中设置 `shouldStringifyDatesInCalls` 属性。

```swift
override func load() {
    shouldStringifyDatesInCalls = false
}
```

`CAPPluginCall` 的便捷访问器 `getDate` 能处理这两种数据类型并返回 `Date` 对象。

从原生代码传输到 Web 视图的数据会序列化为 JSON。由于 JSON 未正式定义日期类型，3.0 之前插件结果中包含 `Date` 对象会抛出异常。现在 Capacitor 会自动按惯例将 `Date` 对象序列化为字符串。若插件需要特殊处理日期，应先将其序列化为其他支持的 JSON 类型。