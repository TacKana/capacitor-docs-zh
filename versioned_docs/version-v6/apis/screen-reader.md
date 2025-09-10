---
title: Screen Reader Capacitor Plugin API
description: Screen Reader API 提供了对 TalkBack/VoiceOver 等屏幕阅读器的访问能力，并为视觉辅助功能提供简单的文本转语音功能。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/screen-reader/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/screen-reader/src/definitions.ts
sidebar_label: Screen Reader
---

# @capacitor/screen-reader

Screen Reader API 提供了对 TalkBack/VoiceOver 等屏幕阅读器的访问能力，并为视觉辅助功能提供简单的文本转语音功能。

## 安装

```bash
npm install @capacitor/screen-reader
npx cap sync
```

## 使用示例

```typescript
import { ScreenReader } from '@capacitor/screen-reader';

ScreenReader.addListener('stateChange', ({ value }) => {
  console.log(`屏幕阅读器当前状态：${value ? '开启' : '关闭'}`);
});

const checkScreenReaderEnabled = async () => {
  const { value } = await ScreenReader.isEnabled();

  console.log('VoiceOver 是否启用？' + value);
};

const sayHello = async () => {
  await ScreenReader.speak({ value: '你好世界！' });
};
```

## API

<docgen-index>

- [`isEnabled()`](#isenabled)
- [`speak(...)`](#speak)
- [`addListener('stateChange', ...)`](#addlistenerstatechange-)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#interfaces)
- [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### isEnabled()

```typescript
isEnabled() => Promise<{ value: boolean; }>
```

检测当前是否有屏幕阅读器正在运行。

此方法在 Web 端不受支持（无法检测屏幕阅读器状态）。

**返回值:** <code>Promise&lt;{ value: boolean; }&gt;</code>

**自版本:** 1.0.0

---

### speak(...)

```typescript
speak(options: SpeakOptions) => Promise<void>
```

文本转语音功能。

仅当屏幕阅读器处于活动状态时此功能才有效。

在 Web 端，浏览器必须支持 [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)，否则此方法会抛出错误。

如需更强大的文本转语音功能，请参考 [Capacitor Community Text-to-Speech 插件](https://github.com/capacitor-community/text-to-speech)。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#speakoptions">SpeakOptions</a></code> |

**自版本:** 1.0.0

---

### addListener('stateChange', ...)

```typescript
addListener(eventName: 'stateChange', listener: StateChangeListener) => Promise<PluginListenerHandle>
```

添加监听器来监测屏幕阅读器的开启/关闭状态变化。

此事件曾命名为 `'accessibilityScreenReaderStateChange'`。

此方法在 Web 端不受支持（无法检测屏幕阅读器状态）。

| 参数            | 类型                                                                |
| --------------- | ------------------------------------------------------------------- |
| **`eventName`** | <code>'stateChange'</code>                                          |
| **`listener`**  | <code><a href="#statechangelistener">StateChangeListener</a></code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本:** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除所有附加到该插件上的监听器。

**自版本:** 1.0.0

---

### Interfaces

#### SpeakOptions

| 属性           | 类型                | 描述                                                                                                                                           | 版本  |
| -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`**    | <code>string</code> | 要朗读的文本内容                                                                                                                               | 1.0.0 |
| **`language`** | <code>string</code> | 文本朗读的语言代码（使用 [ISO 639-1 标准](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)，例如 "en"）。该选项仅在 Android 平台受支持。 | 1.0.0 |

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

#### ScreenReaderState

| 属性        | 类型                 | 描述                             | 版本  |
| ----------- | -------------------- | -------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 表示当前是否有屏幕阅读器正在运行 | 1.0.0 |

### Type Aliases

#### StateChangeListener

<code>
  (state: <a href="#screenreaderstate">ScreenReaderState</a>): void
</code>

</docgen-api>
