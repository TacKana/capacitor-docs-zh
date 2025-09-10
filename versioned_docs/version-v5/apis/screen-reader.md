---
title: Screen Reader Capacitor 插件 API
description: Screen Reader API 提供了对 TalkBack/VoiceOver 等屏幕朗读功能的访问，并为视觉辅助功能提供简单的文本转语音能力。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/screen-reader/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/screen-reader/src/definitions.ts
sidebar_label: Screen Reader
---

# @capacitor/screen-reader

Screen Reader API 提供了对 TalkBack/VoiceOver 等屏幕朗读功能的访问，并为视觉辅助功能提供简单的文本转语音能力。

## 安装

```bash
npm install @capacitor/screen-reader@latest-5
npx cap sync
```

## 示例

```typescript
import { ScreenReader } from '@capacitor/screen-reader';

ScreenReader.addListener('stateChange', ({ value }) => {
  console.log(`屏幕朗读功能当前${value ? '已开启' : '已关闭'}`);
});

const checkScreenReaderEnabled = async () => {
  const { value } = await ScreenReader.isEnabled();

  console.log('语音朗读已启用？' + value);
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

检查当前是否有屏幕朗读功能处于活动状态。

此方法在 Web 平台上不受支持（无法检测屏幕朗读功能）。

**返回值:** <code>Promise&lt;{ value: boolean; }&gt;</code>

**自版本:** 1.0.0

---

### speak(...)

```typescript
speak(options: SpeakOptions) => Promise<void>
```

文本转语音功能。

此功能仅在屏幕朗读功能处于活动状态时有效。

在 Web 平台上，浏览器必须支持 [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)，否则此方法会抛出错误。

如需更强大的文本转语音功能，请参阅 [Capacitor Community Text-to-Speech 插件](https://github.com/capacitor-community/text-to-speech)。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#speakoptions">SpeakOptions</a></code> |

**自版本:** 1.0.0

---

### addListener('stateChange', ...)

```typescript
addListener(eventName: 'stateChange', listener: StateChangeListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

添加监听器，用于监听屏幕朗读功能的开关状态变化。

此事件曾命名为 `'accessibilityScreenReaderStateChange'`。

此方法在 Web 平台上不受支持（无法检测屏幕朗读功能）。

| 参数            | 类型                                                                |
| --------------- | ------------------------------------------------------------------- |
| **`eventName`** | <code>'stateChange'</code>                                          |
| **`listener`**  | <code><a href="#statechangelistener">StateChangeListener</a></code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除当前插件附加的所有监听器。

**自版本:** 1.0.0

---

### Interfaces

#### SpeakOptions

| 属性           | 类型                | 描述                                                                                                                                            | 版本  |
| -------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`**    | <code>string</code> | 要朗读的文本。                                                                                                                                  | 1.0.0 |
| **`language`** | <code>string</code> | 朗读文本的语言，使用 [ISO 639-1 语言代码](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)（例如："en"）。此选项仅在 Android 平台受支持。 | 1.0.0 |

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

#### ScreenReaderState

| 属性        | 类型                 | 描述                                   | 版本  |
| ----------- | -------------------- | -------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 表示屏幕朗读功能当前是否处于活动状态。 | 1.0.0 |

### Type Aliases

#### StateChangeListener

<code>
  (state: <a href="#screenreaderstate">ScreenReaderState</a>): void
</code>

</docgen-api>
