---
title: Screen Reader Capacitor Plugin API
description: Screen Reader API 提供了对 TalkBack/VoiceOver 等屏幕阅读器的访问，并为视觉辅助功能提供简单的文本转语音功能。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/src/definitions.ts
sidebar_label: Screen Reader
---

# @capacitor/screen-reader

Screen Reader API 提供了对 TalkBack/VoiceOver 等屏幕阅读器的访问，并为视觉辅助功能提供简单的文本转语音功能。

## 安装

```bash
npm install @capacitor/screen-reader
npx cap sync
```

## 示例

```typescript
import { ScreenReader } from '@capacitor/screen-reader';

ScreenReader.addListener('screenReaderStateChange', ({ value }) => {
  console.log(`屏幕阅读器现在已 ${value ? '开启' : '关闭'}`);
});

const checkScreenReaderEnabled = async () => {
  const { value } = await ScreenReader.isEnabled();

  console.log('VoiceOver 已启用？' + value);
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
* [接口](#接口)
* [类型别名](#类型别名)

</docgen-index>

<docgen-api>


### isEnabled()

```typescript
isEnabled() => Promise<{ value: boolean; }>
```

检查屏幕阅读器当前是否处于活动状态。

此方法在 Web 平台上不受支持（无法检测屏幕阅读器）。

**返回值：** `Promise<{ value: boolean; }>`

**自版本：** 1.0.0

--------------------


### speak(...)

```typescript
speak(options: SpeakOptions) => Promise<void>
```

文本转语音功能。

此功能仅在屏幕阅读器当前处于活动状态时有效。

在 Web 平台上，浏览器必须支持 [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/v3/Web/API/SpeechSynthesis)，否则此方法将抛出错误。

如需更多文本转语音功能，请参阅 [Capacitor Community Text-to-Speech 插件](https://github.com/capacitor-community/text-to-speech)。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#speakoptions">SpeakOptions</a></code> |

**自版本：** 1.0.0

--------------------


### addListener('stateChange', ...)

```typescript
addListener(eventName: 'stateChange', listener: StateChangeListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

添加监听器，用于监听屏幕阅读器的开启或关闭事件。

此事件曾经命名为 `'accessibilityScreenReaderStateChange'`。

此方法在 Web 平台上不受支持（无法检测屏幕阅读器）。

| 参数            | 类型                                                                |
| --------------- | ------------------------------------------------------------------- |
| **`eventName`** | <code>'stateChange'</code>                                          |
| **`listener`**  | <code><a href="#statechangelistener">StateChangeListener</a></code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除附加到此插件的所有监听器。

**自版本：** 1.0.0

--------------------


### 接口


#### SpeakOptions

| 属性            | 类型                | 描述                                                                                                                                                               | 自版本 |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`**    | <code>string</code> | 要朗读的文本。                                                                                                                                                        | 1.0.0 |
| **`language`** | <code>string</code> | 朗读文本所使用的语言，使用其 [ISO 639-1 代码](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)（例如："en"）。此选项仅在 Android 上受支持。 | 1.0.0 |


#### PluginListenerHandle

| 属性          | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ScreenReaderState

| 属性         | 类型                 | 描述                                  | 自版本 |
| ----------- | -------------------- | -------------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 屏幕阅读器当前是否处于活动状态。 | 1.0.0 |


### 类型别名


#### StateChangeListener

<code>(state: <a href="#screenreaderstate">ScreenReaderState</a>): void</code>

</docgen-api>