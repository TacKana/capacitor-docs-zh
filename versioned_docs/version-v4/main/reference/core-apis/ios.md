---
title: Capacitor iOS API
description: Capacitor 在 iOS 平台的原生 API
slug: /core-apis/ios
---

# Capacitor iOS API

Capacitor iOS 是支撑 Capacitor 应用在 iOS 平台运行的原生运行时环境。

## 桥接机制

iOS 桥接器是 Capacitor iOS 库的核心组件。桥接器提供了多个属性和方法用于获取信息或改变行为。

当插件注册到 Capacitor 后，会持有桥接器的弱引用：

```swift
self.bridge?
```

> 如果方法需要使用桥接器，可以通过 guard 语句解包并提前返回：
>
> ```swift
> guard let bridge = self.bridge else { return }
> ```

---

### viewController

```swift
var viewController: UIViewController? { get }
```

该属性包含 Capacitor 的主视图控制器，可用于在应用上方展示原生视图。

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

在 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（如 `window` 或 `document`）上触发事件。推荐优先使用[插件事件](/plugins/creating-plugins/ios-guide.md#plugin-events)。

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

Web 视图可能处理多种 URL 类型：
- `res://`（访问 web 资源的快捷方案）
- `file://`（指向本地设备的完整文件路径）

---

### portablePath(...)

```swift
func portablePath(fromLocalURL localURL: URL?) -> URL?
```

将 iOS 原生的文件 URL 转换为可在 Web 视图中加载的 URL。

---

## 数据传递

关于跨环境数据传递的注意事项可[参考此处](/main/reference/core-apis/data-types.md#ios)。

---

## 保存 CAPPluginCall

关于异步或重复操作中持久化插件调用的说明可[查看此文档](/main/reference/core-apis/saving-calls.md)。