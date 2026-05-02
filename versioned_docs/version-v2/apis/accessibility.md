---
title: Accessibility
description: Accessibility API
pluginapi: AccessibilityPlugin
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

无障碍（Accessibility）API 可以方便地检测用户是否启用了屏幕阅读器，并能够通过已连接的屏幕阅读器以编程方式朗读标签文本。

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
  alert('Voice over enabled? ' + vo.value);
}

async speak() {
  var value = await Modals.prompt({
    title: "Value to speak",
    message: "Enter the value to speak"
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

**返回值：** <code>Promise&lt;<a href="#screenreaderenabledresult">ScreenReaderEnabledResult</a>&gt;</code>

---

### speak(...)

```typescript
speak(options: AccessibilitySpeakOptions) => Promise<void>
```

通过已连接的屏幕阅读器朗读字符串。

| 参数            | 类型                                                                                |
| --------------- | ----------------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#accessibilityspeakoptions">AccessibilitySpeakOptions</a></code>     |

---

### addListener(...)

```typescript
addListener(eventName: 'accessibilityScreenReaderStateChange', listenerFunc: ScreenReaderStateChangeCallback) => PluginListenerHandle
```

监听屏幕阅读器状态变化（开启/关闭）

| 参数                 | 类型                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| **`eventName`**      | <code>"accessibilityScreenReaderStateChange"</code>                                                     |
| **`listenerFunc`**   | <code>(state: <a href="#screenreaderenabledresult">ScreenReaderEnabledResult</a>) =&gt; void</code>     |

**返回值：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除此插件的所有原生监听器

---

### 接口

#### ScreenReaderEnabledResult

| 属性          | 类型                   |
| ------------- | ---------------------- |
| **`value`**   | <code>boolean</code>   |

#### AccessibilitySpeakOptions

| 属性             | 类型                  | 描述                                                                                                                                                              |
| ---------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`value`**      | <code>string</code>   | 要朗读的字符串                                                                                                                                                    |
| **`language`**   | <code>string</code>   | 朗读字符串时使用的语言，使用其 [ISO 639-1 代码](https://www.loc.gov/standards/iso639-2/php/code_list.php)（例如："en"）。目前仅在 Android 平台上支持此功能。      |

#### PluginListenerHandle

| 属性           | 类型                         |
| -------------- | ---------------------------- |
| **`remove`**   | <code>() =&gt; void</code>   |