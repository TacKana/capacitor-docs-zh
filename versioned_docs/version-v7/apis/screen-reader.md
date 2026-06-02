---
title: Screen Reader - Capacitor 插件 API
description: Screen Reader API 提供了对 TalkBack/VoiceOver 等的访问，并为视觉无障碍提供简单的文本转语音功能。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/7.x/screen-reader/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/7.x/screen-reader/src/definitions.ts
sidebar_label: Screen Reader
translated: true
---

# @capacitor/screen-reader

Screen Reader API 提供了对 TalkBack/VoiceOver 等的访问，并为视觉无障碍提供简单的文本转语音功能。

## 安装

```bash
npm install @capacitor/screen-reader@latest-7
npx cap sync
```

## 示例

```typescript
import { ScreenReader } from '@capacitor/screen-reader';

ScreenReader.addListener('stateChange', ({ value }) => {
  console.log(`屏幕朗读器现在${value ? '开启' : '关闭'}`);
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

* [`isEnabled()`](#isenabled)
* [`speak(...)`](#speak)
* [`addListener('stateChange', ...)`](#addlistenerstatechange-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#接口)
* [Type Aliases](#类型别名)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### isEnabled()

```typescript
isEnabled() => Promise<{ value: boolean; }>
```

屏幕朗读器当前是否处于活动状态。

此方法在 Web 上不受支持（无法检测屏幕朗读器）。

**返回:** <code>Promise&lt;{ value: boolean; }&gt;</code>

**自从:** 1.0.0

--------------------


### speak(...)

```typescript
speak(options: SpeakOptions) => Promise<void>
```

文本转语音功能。

此功能仅在屏幕朗读器当前处于活动状态时有效。

在 Web 上，浏览器必须支持 [SpeechSynthesis
API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)，
否则此方法将抛出错误。

有关更多文本转语音功能，请参阅 [Capacitor Community
Text-to-Speech
插件](https://github.com/capacitor-community/text-to-speech)。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#speakoptions">SpeakOptions</a></code> |

**自从:** 1.0.0

--------------------


### addListener('stateChange', ...)

```typescript
addListener(eventName: 'stateChange', listener: StateChangeListener) => Promise<PluginListenerHandle>
```

添加一个监听器，用于监听屏幕朗读器开启或关闭的事件。

此事件以前命名为 `'accessibilityScreenReaderStateChange'`。

此方法在 Web 上不受支持（无法检测屏幕朗读器）。

| 参数            | 类型                                                                |
| --------------- | ------------------------------------------------------------------- |
| **`eventName`** | <code>'stateChange'</code>                                          |
| **`listener`**  | <code><a href="#statechangelistener">StateChangeListener</a></code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自从:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除所有附加到此插件的监听器。

**自从:** 1.0.0

--------------------


### 接口


#### SpeakOptions

| 属性            | 类型                | 描述                                                                                                                                                               | 自从 |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`**    | <code>string</code> | 要朗读的文本。                                                                                                                                                        | 1.0.0 |
| **`language`** | <code>string</code> | 朗读文本所使用的语言，以其 [ISO 639-1 代码](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 表示（例如："en"）。此选项仅在 Android 上受支持。 | 1.0.0 |


#### PluginListenerHandle

| 属性          | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ScreenReaderState

| 属性         | 类型                 | 描述                                  | 自从 |
| ----------- | -------------------- | -------------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 屏幕朗读器当前是否处于活动状态。 | 1.0.0 |


### 类型别名


#### StateChangeListener

<code>(state: <a href="#screenreaderstate">ScreenReaderState</a>): void</code>

</docgen-api>
