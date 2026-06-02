---
title: 无障碍
description: 无障碍 API
pluginapi: AccessibilityPlugin
contributors:
  - mlynch
  - jcesarmobile
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

无障碍 API 使得在用户启用屏幕阅读器时能够轻松获知，并能通过连接的屏幕阅读器以编程方式朗读标签。

- [`isScreenReaderEnabled()`](#isscreenreaderenabled)
- [`speak(...)`](#speak)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#接口)

## 示例

```typescript
import { Plugins } from '@capacitor/core';

const { Accessibility, Modals } = Plugins;

Accessibility.addListener('accessibilityScreenReaderStateChange', (state) => {
  console.log(state.value);
});

async isVoiceOverEnabled() {
  var vo = await Accessibility.isScreenReaderEnabled();
  alert('Voice over 已启用？' + vo.value);
}

async speak() {
  var value = await Modals.prompt({
    title: "要朗读的内容",
    message: "输入要朗读的内容"
  });

  Accessibility.speak({value: value.value});
}
```

## API

### isScreenReaderEnabled()

```typescript
isScreenReaderEnabled() => Promise<ScreenReaderEnabledResult>
```

检查设备上是否启用了屏幕阅读器

**返回：** <code>Promise&lt;<a href="#screenreaderenabledresult">ScreenReaderEnabledResult</a>&gt;</code>

---

### speak(...)

```typescript
speak(options: AccessibilitySpeakOptions) => Promise<void>
```

通过连接的屏幕阅读器朗读一个字符串。

| 参数 | 类型 |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#accessibilityspeakoptions">AccessibilitySpeakOptions</a></code> |

---

### addListener(...)

```typescript
addListener(eventName: 'accessibilityScreenReaderStateChange', listenerFunc: ScreenReaderStateChangeCallback) => PluginListenerHandle
```

监听屏幕阅读器状态变化（开启/关闭）

| 参数 | 类型 |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>"accessibilityScreenReaderStateChange"</code>                                                 |
| **`listenerFunc`** | <code>(state: <a href="#screenreaderenabledresult">ScreenReaderEnabledResult</a>) =&gt; void</code> |

**返回：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除该插件的所有原生监听器

---

### 接口

#### ScreenReaderEnabledResult

| 属性 | 类型 |
| ----------- | -------------------- |
| **`value`** | <code>boolean</code> |

#### AccessibilitySpeakOptions

| 属性 | 类型 | 描述 |
| -------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`value`**    | <code>string</code> | 要朗读的字符串 |
| **`language`** | <code>string</code> | 朗读时使用的语言，使用其 [ISO 639-1 代码](https://www.loc.gov/standards/iso639-2/php/code_list.php)（例如："en"）。目前仅 Android 支持。 |

#### PluginListenerHandle

| 属性 | 类型 |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |
