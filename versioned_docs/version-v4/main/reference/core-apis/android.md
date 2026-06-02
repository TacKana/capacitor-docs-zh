---
title: Capacitor Android API
description: Capacitor 在 Android 上的 API
slug: /core-apis/android
---

# Capacitor Android API

Capacitor Android 是驱动 Capacitor 应用在 Android 上运行的原生运行时。

## Bridge

Android bridge 是 Capacitor Android 库的核心。bridge 上有多个方法可提供信息或改变行为。

当插件注册到 Capacitor 时，插件可以访问 bridge：

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

在 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（如 `window` 或 `document`）上触发事件。如果可能，建议优先使用[插件事件](/plugins/creating-plugins/android-guide.md#plugin-events)替代。

示例：

```java
bridge.triggerJSEvent("myCustomEvent", "window");
bridge.triggerJSEvent("myCustomEvent", "document", "{ 'dataKey': 'dataValue' }");
```

注意：`data` 必须是序列化的 JSON 字符串值。

---

## 传递数据

关于如何处理在环境之间传递的数据，请参考[这里](/main/reference/core-apis/data-types.md)。

---

## 保存 CAPPluginCall

关于持久化插件调用以进行异步或重复操作的说明，请参考[这里](/main/reference/core-apis/saving-calls.md)。
