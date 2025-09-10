---
title: Capacitor Android API
description: Capacitor 在 Android 平台的原生 API
slug: /core-apis/android
---

# Capacitor Android API

Capacitor Android 是为 Android 平台上的 Capacitor 应用提供支持的本地运行时环境。

## Bridge（桥接）

Android 桥接是 Capacitor Android 库的核心组件。桥接对象提供了多个方法来获取信息或改变行为。

插件在 Capacitor 中注册后，即可访问桥接对象：

```java
this.bridge
```

---

### getConfig()

```java
public CapConfig getConfig()
```

该属性包含 Capacitor 运行时已知的配置对象。

---

### triggerJSEvent(...)

```java
public void triggerJSEvent(final String eventName, final String target)
public void triggerJSEvent(final String eventName, final String target, final String data)
```

在 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（如 `window` 或 `document`）上触发事件。如有可能，建议优先使用[插件事件](/plugins/creating-plugins/android-guide.md#plugin-events)。

示例：

```java
bridge.triggerJSEvent("myCustomEvent", "window");
bridge.triggerJSEvent("myCustomEvent", "document", "{ 'dataKey': 'dataValue' }");
```

注意：`data` 必须是序列化的 JSON 字符串值。

---

## 数据传递

关于如何在不同环境间处理传递数据的注意事项，请[参阅此处](/main/reference/core-apis/data-types.md)。

---

## 保存 CAPPluginCall

关于如何持久化插件调用以实现异步或重复操作的注意事项，请[参阅此处](/main/reference/core-apis/saving-calls.md)。