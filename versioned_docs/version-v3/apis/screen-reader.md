---
title: Screen Reader Capacitor 插件 API
description: Screen Reader API 提供对 TalkBack/VoiceOver 等的访问，并为视觉无障碍提供简单的文本转语音功能。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/src/definitions.ts
sidebar_label: Screen Reader
translated: true
---

# @capacitor/screen-reader

Screen Reader API 提供对 TalkBack/VoiceOver 等的访问，并为视觉无障碍提供简单的文本转语音功能。

## 安装

```bash
npm install @capacitor/screen-reader
npx cap sync
```

## 示例

```typescript
import { ScreenReader } from '@capacitor/screen-reader';

ScreenReader.addListener('screenReaderStateChange', ({ value }) => {
  console.log(`Screen reader is now ${value ? 'on' : 'off'}`);
});

const checkScreenReaderEnabled = async () => {
  const { value } = await ScreenReader.isEnabled();

  console.log('Voice over enabled? ' + value);
};

const sayHello = async () => {
  await ScreenReader.speak({ value: 'Hello World!' });
};
```

## API

<docgen-index>

* [`isEnabled()`](#isenabled)
* [`speak(...)`](#speak)
* [`addListener('stateChange', ...)`](#addlistenerstatechange-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>


### isEnabled()

```typescript
isEnabled() => Promise<{ value: boolean; }>
```

屏幕阅读器当前是否处于活动状态。

此方法在 Web 上不受支持（无法检测屏幕阅读器）。

**Returns:** `Promise<{ value: boolean; }>`

**Since:** 1.0.0

--------------------


### speak(...)

```typescript
speak(options: SpeakOptions) => Promise<void>
```

文本转语音功能。

此功能仅在屏幕阅读器当前处于活动状态时有效。

在 Web 上，浏览器必须支持 [SpeechSynthesis
API](https://developer.mozilla.org/en-US/docs/v3/Web/API/SpeechSynthesis)，否则此方法将抛出错误。

有关更多文本转语音功能，请参阅 [Capacitor Community
Text-to-Speech
插件](https://github.com/capacitor-community/text-to-speech)。

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#speakoptions">SpeakOptions</a></code> |

**Since:** 1.0.0

--------------------


### addListener('stateChange', ...)

```typescript
addListener(eventName: 'stateChange', listener: StateChangeListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

添加屏幕阅读器打开或关闭时的监听器。

此事件过去名为 `'accessibilityScreenReaderStateChange'`。

此方法在 Web 上不受支持（无法检测屏幕阅读器）。

| Param           | Type                                                                |
| --------------- | ------------------------------------------------------------------- |
| **`eventName`** | <code>'stateChange'</code>                                          |
| **`listener`**  | <code><a href="#statechangelistener">StateChangeListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除附加到此插件的所有监听器。

**Since:** 1.0.0

--------------------


### Interfaces


#### SpeakOptions

| Prop           | Type                | Description                                                                                                                                                               | Since |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`**    | <code>string</code> | 要朗读的文本。                                                                                                                                                        | 1.0.0 |
| **`language`** | <code>string</code> | 朗读文本时使用的语言，使用其 [ISO 639-1 代码](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)（例如："en"）。此选项仅在 Android 上受支持。 | 1.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ScreenReaderState

| Prop        | Type                 | Description                                  | Since |
| ----------- | -------------------- | -------------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 屏幕阅读器当前是否处于活动状态。 | 1.0.0 |


### Type Aliases


#### StateChangeListener

<code>(state: <a href="#screenreaderstate">ScreenReaderState</a>): void</code>

</docgen-api>
