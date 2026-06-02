---
title: Capacitor iOS API
description: Capacitor 在 iOS 上的 API
slug: /core-apis/ios
---

# Capacitor iOS API

Capacitor iOS 是在 iOS 上驱动 Capacitor 应用的原生运行时。

## Bridge

iOS bridge 是 Capacitor iOS 库的核心。bridge 上有多个属性和方法，用于提供信息或改变行为。

当插件注册到 Capacitor 时，插件持有 bridge 的弱引用：

```swift
self.bridge?
```

> 如果你的方法需要 bridge，你可以使用 guard 来解包并提前退出：
>
> ```swift
> guard let bridge = self.bridge else { return }
> ```

---

### viewController

```swift
var viewController: UIViewController? { get }
```

该属性包含 Capacitor 的主视图控制器，可用于在应用之上呈现原生视图。

示例：

```swift
DispatchQueue.main.async {
  self.bridge?.viewController.present(ourCustomViewController, animated: true, completion: nil)
}
```

在 iPad 设备上可以呈现弹出视图：

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

在 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（例如 `window` 或 `document`）上触发事件。如果可能，建议优先使用[插件事件](/plugins/creating-plugins/ios-guide.md#plugin-events)。

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

将 Web 视图中的 URL 转换为原生 iOS 的文件 URL。

Web 视图可能处理几种不同类型的 URL：

- `res://`（Web 资源的快捷方案）
- `file://`（本地设备上文件的完整 URL）

---

### portablePath(...)

```swift
func portablePath(fromLocalURL localURL: URL?) -> URL?
```

将原生 iOS 的文件 URL 转换为可在 Web 视图中加载的 URL。

---

## 传递数据

关于如何在环境之间传递数据的说明可以[在此处找到](/main/reference/core-apis/data-types.md#ios)。

---

## 保存 CAPPluginCall

关于持久化插件调用以用于异步或重复操作的说明可以[在此处找到](/main/reference/core-apis/saving-calls.md)。
