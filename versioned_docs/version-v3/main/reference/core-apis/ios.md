---
title: Capacitor iOS API
description: Capacitor 在 iOS 平台上的 API 接口
slug: /core-apis/ios
---

# Capacitor iOS API

Capacitor iOS 是为 Capacitor 应用在 iOS 上提供支持的原生运行时环境。

## Bridge（桥接层）

iOS bridge 是 Capacitor iOS 库的核心。桥接对象提供了多个属性和方法，用于获取信息或改变行为。

当插件在 Capacitor 中注册后，会持有一个指向 bridge 的弱引用：

```swift
self.bridge?
```

> 如果你的方法需要使用 bridge，可以使用 guard 语句来解包并在失败时提前退出：
>
> ```swift
> guard let bridge = self.bridge else { return }
> ```

---

### viewController

```swift
var viewController: UIViewController? { get }
```

此属性包含 Capacitor 的主视图控制器，可用于在应用上层展示原生视图。

示例：

```swift
DispatchQueue.main.async {
  self.bridge?.viewController.present(ourCustomViewController, animated: true, completion: nil)
}
```

在 iPad 设备上，可以展示弹出式视图：

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

在 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/v3/Web/API/EventTarget)（例如 `window` 或 `document`）上触发一个事件。如果可能，建议优先使用[插件事件](/plugins/creating-plugins/ios-guide.md#plugin-events)。

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

将来自 Web 视图的 URL 转换为适用于原生 iOS 的文件 URL。

Web 视图可能处理多种不同类型的 URL：

- `res://`（指向 Web 资源的快捷方案）
- `file://`（指向本地设备上文件的完整限定 URL）

---

### portablePath(...)

```swift
func portablePath(fromLocalURL localURL: URL?) -> URL?
```

将原生 iOS 的文件 URL 转换为可在 Web 视图中加载的 URL。

---

## 传递数据

关于如何在环境之间处理传递数据的说明，请[参阅此处](/main/reference/core-apis/data-types.md#ios)。

---

## 保存 CAPPluginCall

关于为异步或重复操作持久化插件调用的说明，请[参阅此处](/main/reference/core-apis/saving-calls.md)。