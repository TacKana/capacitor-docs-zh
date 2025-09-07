---
title: Capacitor iOS API
description: Capacitor iOS平台API文档
slug: /core-apis/ios
---

# Capacitor iOS API

Capacitor iOS 是为 iOS 平台提供原生运行能力的核心组件。

## Bridge（桥接层）

iOS 桥接层是 Capacitor iOS 库的核心枢纽。桥接对象提供了多个属性和方法，用于获取信息或调整运行时行为。

插件在注册到 Capacitor 时，会持有桥接对象的弱引用：

```swift
self.bridge?
```

> 若方法中需要使用桥接对象，可通过 guard 语句安全解包并提前返回：
>
> ```swift
> guard let bridge = self.bridge else { return }
> ```

---

### viewController（视图控制器）

```swift
var viewController: UIViewController? { get }
```

该属性持有 Capacitor 的主视图控制器，可用于在应用顶部展示原生视图。

使用示例：

```swift
DispatchQueue.main.async {
  self.bridge?.viewController.present(ourCustomViewController, animated: true, completion: nil)
}
```

在 iPad 设备上支持弹窗展示：

```swift
self.setCenteredPopover(ourCustomViewController)
self.bridge.viewController.present(ourCustomViewController, animated: true, completion: nil)
```

---

### config（配置对象）

```swift
var config: InstanceConfiguration { get }
```

该属性包含 Capacitor 运行时已知的配置对象。

---

### triggerJSEvent(...)（触发JS事件）

```swift
func triggerJSEvent(eventName: String, target: String)
func triggerJSEvent(eventName: String, target: String, data: String)
```

向 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（如 `window` 或 `document`）触发事件。若适用场景允许，建议优先使用[插件事件机制](/plugins/creating-plugins/ios-guide.md#plugin-events)。

调用示例：

```swift
bridge.triggerJSEvent(eventName: "myCustomEvent", target: "window")
bridge.triggerJSEvent(eventName: "myCustomEvent", target: "document", data: "{ 'dataKey': 'dataValue' }")
```

注意事项：`data` 参数必须是序列化的 JSON 字符串。

---

### localURL(...)（本地URL转换）

```swift
func localURL(fromWebURL webURL: URL?) -> URL?
```

将来自 WebView 的 URL 转换为 iOS 原生可用的文件 URL。

WebView 可能处理多种 URL 类型：
- `res://`（指向 web 资源的快捷协议）
- `file://`（指向本地设备的完整文件路径）

---

### portablePath(...)（可移植路径转换）

```swift
func portablePath(fromLocalURL localURL: URL?) -> URL?
```

将 iOS 原生文件 URL 转换为可在 WebView 中加载的 URL。

---

## 数据传递规范

关于跨环境数据处理的详细说明，请参阅[数据类型指南](/main/reference/core-apis/data-types.md#ios)。

---

## 持久化CAPPluginCall

异步操作或重复调用场景下保存插件调用的注意事项，请参阅[调用保存规范](/main/reference/core-apis/saving-calls.md)。