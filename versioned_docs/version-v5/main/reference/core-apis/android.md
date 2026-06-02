---
title: Capacitor Android API
description: Capacitor 在 Android 上的 API
slug: /core-apis/android
---

# Capacitor Android API

Capacitor Android 是在 Android 上驱动 Capacitor 应用的原生运行时。

## Bridge

Android bridge 是 Capacitor Android 库的核心。bridge 上有几种可用的方法，提供信息或改变行为。

当注册到 Capacitor 时，插件可以访问 bridge：

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

## 传递数据

关于如何在环境之间传递数据的说明[在此处](/main/reference/core-apis/data-types.md)。

---

## 保存 CAPPluginCall

关于为异步或重复操作持久化插件调用的说明[在此处](/main/reference/core-apis/saving-calls.md)。
