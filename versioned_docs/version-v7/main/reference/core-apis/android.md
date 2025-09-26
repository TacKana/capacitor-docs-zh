---
title: Capacitor Android API
description: Capacitor 在 Android 平台的核心 API
slug: /core-apis/android
---

# Capacitor Android API

Capacitor Android 是支撑 Capacitor 应用在 Android 平台上运行的本地运行时环境。

## 桥接机制

Android 桥接层是 Capacitor Android 库的核心组件。桥接对象提供了多种方法用于获取信息或改变行为。

当插件在 Capacitor 中注册后，即可访问桥接对象：

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

在 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API EventTarget)（如 `window` 或 `document`）上触发事件。建议优先使用[插件事件](/plugins/creating-plugins/android-guide.md#plugin-events)。

使用示例：

```java
bridge.triggerJSEvent("myCustomEvent", "window");
bridge.triggerJSEvent("myCustomEvent", "document", "{ 'dataKey': 'dataValue' }");
```

注意：`data` 参数必须是序列化的 JSON 字符串值。

---

## 数据传递

关于处理跨环境数据传递的注意事项，请参阅[此文档](/main/reference/core-apis/data-types.md)。

---

## 保存 CAPPluginCall

关于为异步或重复操作持久化插件调用的说明，可查阅[此指南](/main/reference/core-apis/saving-calls.md)。