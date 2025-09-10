---
title: Capacitor iOS API
description: Capacitor 在 iOS 平台上的 API 文档
slug: /core-apis/ios
---

# Capacitor iOS API

Capacitor iOS 是为 Capacitor 应用提供 iOS 原生运行能力的核心组件。

## Bridge 桥接机制

iOS Bridge 是 Capacitor iOS 库的核心枢纽，提供了多个属性和方法来获取信息或改变运行行为。

当插件在 Capacitor 中注册后，会持有一个对 bridge 的弱引用：

```swift
self.bridge?
```

> 如果方法需要使用 bridge，可以通过 guard 语句安全解包并提前返回：
>
> ```swift
> guard let bridge = self.bridge else { return }
> ```

---

### viewController 视图控制器

```swift
var viewController: UIViewController? { get }
```

该属性持有 Capacitor 的主视图控制器，可用于在应用顶层展示原生视图。

使用示例：

```swift
DispatchQueue.main.async {
  self.bridge?.viewController.present(ourCustomViewController, animated: true, completion: nil)
}
```

在 iPad 设备上支持弹出式视图：

```swift
self.setCenteredPopover(ourCustomViewController)
self.bridge.viewController.present(ourCustomViewController, animated: true, completion: nil)
```

---

### config 配置对象

```swift
var config: InstanceConfiguration { get }
```

此属性包含 Capacitor 运行时已知的配置对象。

---

### triggerJSEvent(...) 触发JS事件

```swift
func triggerJSEvent(eventName: String, target: String)
func triggerJSEvent(eventName: String, target: String, data: String)
```

在 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（如 `window` 或 `document`）上触发事件。建议优先使用 [插件事件](/plugins/creating-plugins/ios-guide.md#plugin-events)。

示例：

```swift
bridge.triggerJSEvent(eventName: "myCustomEvent", target: "window")
bridge.triggerJSEvent(eventName: "myCustomEvent", target: "document", data: "{ 'dataKey': 'dataValue' }")
```

注意：`data` 参数必须是序列化的 JSON 字符串。

---

### localURL(...) 本地URL转换

```swift
func localURL(fromWebURL webURL: URL?) -> URL?
```

将来自 Web 视图的 URL 转换为 iOS 原生可用的文件 URL。

Web 视图可能处理多种 URL 类型：
- `res://`（Web 资源的快捷方案）
- `file://`（设备本地文件的完整路径）

---

### portablePath(...) 便携路径转换

```swift
func portablePath(fromLocalURL localURL: URL?) -> URL?
```

将 iOS 原生文件 URL 转换为可在 Web 视图中加载的 URL。

---

## 数据传递规范

关于跨环境数据传递的注意事项可[查阅此处](/main/reference/core-apis/data-types.md#ios)。

---

## 保存 CAPPluginCall

关于异步或重复操作中持久化插件调用的说明可[参见此处](/main/reference/core-apis/saving-calls.md)。