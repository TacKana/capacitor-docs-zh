---
title: Capacitor iOS API
description: iOS 平台上的 Capacitor API
slug: /core-apis/ios
---

# Capacitor iOS API

Capacitor iOS 是为 iOS 上 Capacitor 应用提供支持的本地运行时。

## Bridge

iOS Bridge 是 Capacitor iOS 库的核心。Bridge 上提供了多个属性和方法，用于获取信息或改变行为。

当插件在 Capacitor 中注册后，它们会持有一个对 bridge 的弱引用：

```swift
self.bridge?
```

> 如果你的方法需要使用 bridge，可以使用 guard 语句来解包并提前返回：
>
> ```swift
> guard let bridge = self.bridge else { return }
> ```

---

### viewController

```swift
var viewController: UIViewController? { get }
```

此属性包含 Capacitor 的主视图控制器，可用于在应用上方展示原生视图。

示例：

```swift
DispatchQueue.main.async {
  self.bridge?.viewController.present(ourCustomViewController, animated: true, completion: nil)
}
```

在 iPad 设备上可以呈现弹出窗口：

```swift
self.setCenteredPopover(ourCustomViewController)
self.bridge.viewController.present(ourCustomViewController, animated: true, completion: nil)
```

---

### config

```swift
var config: InstanceConfiguration { get }
```

此属性包含 Capacitor 运行时已知的配置对象。

---

### triggerJSEvent(...)

```swift
func triggerJSEvent(eventName: String, target: String)
func triggerJSEvent(eventName: String, target: String, data: String)
```

在 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（如 `window` 或 `document`）上触发事件。如果可能，建议使用 [插件事件](/plugins/creating-plugins/ios-guide.md#plugin-events) 代替。

示例：

```swift
bridge.triggerJSEvent(eventName: "myCustomEvent", target: "window")
bridge.triggerJSEvent(eventName: "myCustomEvent", target: "document", data: "{ 'dataKey': 'dataValue' }")
```

注意：`data` 必须是序列化的 JSON 字符串值。

---

### localURL(...)

```swift
func localURL(fromWebURL webURL: URL?) -> URL?
```

将来自 Web 视图的 URL 转换为 iOS 原生的文件 URL。

Web 视图可能处理多种不同类型的 URL：

- `res://`（指向 Web 资源的快捷方案）
- `file://`（指向本地设备文件的完整限定 URL）

---

### portablePath(...)

```swift
func portablePath(fromLocalURL localURL: URL?) -> URL?
```

将 iOS 原生的文件 URL 转换为可在 Web 视图中加载的 URL。

---

## 传递数据

关于如何在环境之间处理传递数据的说明可以 [在此处找到](/main/reference/core-apis/data-types.md#ios)。

---

## 保存 CAPPluginCall

关于为异步或重复操作持久化插件调用的说明可以 [在此处找到](/main/reference/core-apis/saving-calls.md)。