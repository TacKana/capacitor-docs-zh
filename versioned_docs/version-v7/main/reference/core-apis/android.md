---
title: Capacitor Android API
description: Capacitor 在 Android 平台上的 API
slug: /core-apis/android
---

# Capacitor Android API

Capacitor Android 是驱动 Capacitor 应用在 Android 上运行的原生运行时环境。

## Bridge

Android Bridge 是 Capacitor Android 库的核心。Bridge 上提供了多个方法，用于获取信息或改变行为。

当插件在 Capacitor 中注册后，即可访问 Bridge：

```java
this.bridge
```

---

### getConfig()

```java
public CapConfig getConfig()
```

此属性包含 Capacitor 运行时已知的配置对象。

---

### triggerJSEvent(...)

```java
public void triggerJSEvent(final String eventName, final String target)
public void triggerJSEvent(final String eventName, final String target, final String data)
```

在 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（例如 `window` 或 `document`）上触发一个事件。如果可能，建议优先使用[插件事件](/plugins/creating-plugins/android-guide.md#plugin-events)。

示例：

```java
bridge.triggerJSEvent("myCustomEvent", "window");
bridge.triggerJSEvent("myCustomEvent", "document", "{ 'dataKey': 'dataValue' }");
```

注意：`data` 必须是一个序列化的 JSON 字符串值。

---

## 数据传递

关于如何处理在不同环境之间传递的数据，相关说明可以[在此处找到](/main/reference/core-apis/data-types.md)。

---

## 保存 CAPPluginCall

关于如何持久化插件调用以用于异步或重复操作，相关说明可以[在此处找到](/main/reference/core-apis/saving-calls.md)。