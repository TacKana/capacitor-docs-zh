---
title: Capacitor Android API
description: Capacitor 在 Android 平台上的 API
slug: /core-apis/android
---

# Capacitor Android API

Capacitor Android 是为 Capacitor 应用在 Android 平台上提供支持的本地运行时环境。

## Bridge（桥接）

Android bridge 是 Capacitor Android 库的核心。bridge 提供了多个方法用于获取信息或改变行为。

当插件在 Capacitor 中注册后，即可访问 bridge：

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

在 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（如 `window` 或 `document`）上触发事件。如果可能，建议优先使用[插件事件](/plugins/creating-plugins/android-guide.md#plugin-events)。

示例：

```java
bridge.triggerJSEvent("myCustomEvent", "window");
bridge.triggerJSEvent("myCustomEvent", "document", "{ 'dataKey': 'dataValue' }");
```

注意：`data` 必须是序列化的 JSON 字符串值。

---

## 数据传递

关于如何处理在不同环境间传递数据的注意事项，可[在此查看](/main/reference/core-apis/data-types.md)。

---

## 保存 CAPPluginCall

关于为异步或重复操作持久化插件调用的注意事项，可[在此查看](/main/reference/core-apis/saving-calls.md)。