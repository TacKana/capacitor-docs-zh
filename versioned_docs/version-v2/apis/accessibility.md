---
title: Accessibility
description: 无障碍功能 API
pluginapi: AccessibilityPlugin
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

无障碍功能 API 可以轻松检测用户是否启用了屏幕阅读器，同时支持通过已连接的屏幕阅读器以编程方式朗读文本标签。

- [`isScreenReaderEnabled()`](#isscreenreaderenabled)
- [`speak(...)`](#speak)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [接口定义](#interfaces)

## 示例

```typescript
import { Plugins } from '@capacitor/core';

const { Accessibility, Modals } = Plugins;

Accessibility.addListener('accessibilityScreenReaderStateChange', (state) => {
  console.log(state.value);
});

async isVoiceOverEnabled() {
  var vo = await Accessibility.isScreenReaderEnabled();
  alert('Voice over enabled? ' + vo.value);
}

async speak() {
  var value = await Modals.prompt({
    title: "待朗读内容",
    message: "请输入要朗读的文本"
  });

  Accessibility.speak({value: value.value});
}
```

## API

### isScreenReaderEnabled()

```typescript
isScreenReaderEnabled() => Promise<ScreenReaderEnabledResult>
```

检测设备是否启用了屏幕阅读器

**返回值:** <code>Promise&lt;<a href="#screenreaderenabledresult">ScreenReaderEnabledResult</a>&gt;</code>

---

### speak(...)

```typescript
speak(options: AccessibilitySpeakOptions) => Promise<void>
```

通过连接的屏幕阅读器朗读指定字符串。

| 参数          | 类型                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#accessibilityspeakoptions">AccessibilitySpeakOptions</a></code> |

---

### addListener(...)

```typescript
addListener(eventName: 'accessibilityScreenReaderStateChange', listenerFunc: ScreenReaderStateChangeCallback) => PluginListenerHandle
```

监听屏幕阅读器状态变化（开启/关闭）

| 参数               | 类型                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>"accessibilityScreenReaderStateChange"</code>                                                 |
| **`listenerFunc`** | <code>(state: <a href="#screenreaderenabledresult">ScreenReaderEnabledResult</a>) =&gt; void</code> |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除该插件所有原生监听器

---

### Interfaces

#### ScreenReaderEnabledResult

| 属性        | 类型                 |
| ----------- | -------------------- |
| **`value`** | <code>boolean</code> |

#### AccessibilitySpeakOptions

| 属性           | 类型                | 描述                                                                            |
| -------------- | ------------------- | ------------------------------------------------------------------------------- |
| **`value`**    | <code>string</code> | 待朗读的字符串                                                                  |
| **`language`** | <code>string</code> | 朗读使用的语言代码（ISO 639-1 标准），例如"en"。目前仅 Android 平台支持此参数。 |

#### PluginListenerHandle

| 属性         | 类型                       |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |
