---
title: Capacitor iOS API
description: Capacitor iOS API 文档
slug: /core-apis/ios
---

# Capacitor iOS API

Capacitor iOS 是驱动 Capacitor 应用在 iOS 平台运行的原生运行时环境。

## Bridge

iOS bridge 是 Capacitor iOS 库的核心。bridge 提供了多个属性和方法，用于获取信息或改变行为。

插件在注册到 Capacitor 后，会持有一个对 bridge 的弱引用：

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

该属性包含 Capacitor 的主视图控制器，可用于在应用上层展示原生视图。

示例：

```swift
DispatchQueue.main.async {
  self.bridge?.viewController.present(ourCustomViewController, animated: true, completion: nil)
}
```

在 iPad 设备上可以展示弹出窗口：

```swift
self.setCenteredPopover(ourCustomViewController)
self.bridge.viewController.present(ourCustomViewController, animated: true, completion: nil)
```

---

### config

```swift
var config: InstanceConfiguration { get }
```

该属性包含 Capacitor 运行时已知的配置对象。

---

### triggerJSEvent(...)

```swift
func triggerJSEvent(eventName: String, target: String)
func triggerJSEvent(eventName: String, target: String, data: String)
```

在 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（如 `window` 或 `document`）上触发事件。如果可能，建议优先使用[插件事件](/plugins/creating-plugins/ios-guide.md#plugin-events)。

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

将 web 视图中的 URL 转换为 iOS 原生可用的文件 URL。

web 视图可能处理多种不同类型的 URL：

- `res://`（指向 web 资源的快捷方案）
- `file://`（指向本地设备文件的完全限定 URL）

---

### portablePath(...)

```swift
func portablePath(fromLocalURL localURL: URL?) -> URL?
```

将 iOS 原生文件 URL 转换为可在 web 视图中加载的 URL。

---

## 数据传递

关于在不同环境间传递数据的注意事项可[在此查看](/main/reference/core-apis/data-types.md#ios)。

---

## 保存 CAPPluginCall

关于为异步或重复操作持久化插件调用的注意事项可[在此查看](/main/reference/core-apis/saving-calls.md)。