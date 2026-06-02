---
title: Screen Reader - Capacitor 屏幕阅读器插件 API
description: 屏幕阅读器 API 提供对 TalkBack/VoiceOver 等的访问，并为视觉无障碍提供简单的文本转语音功能。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/screen-reader/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/screen-reader/src/definitions.ts
sidebar_label: Screen Reader 屏幕阅读器
translated: true
---

# @capacitor/screen-reader

屏幕阅读器 API 提供对 TalkBack/VoiceOver 等的访问，并为视觉无障碍提供简单的文本转语音功能。

## 安装

```bash
npm install @capacitor/screen-reader@latest-5
npx cap sync
```

## 示例

```typescript
import { ScreenReader } from '@capacitor/screen-reader';

ScreenReader.addListener('stateChange', ({ value }) => {
  console.log(`屏幕阅读器现已${value ? '开启' : '关闭'}`);
});

const checkScreenReaderEnabled = async () => {
  const { value } = await ScreenReader.isEnabled();

  console.log('语音辅助已启用？' + value);
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
* [Interfaces](#接口)
* [Type Aliases](#类型别名)

</docgen-index>

<docgen-api>
<!--更新源文件的 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### isEnabled()

```typescript
isEnabled() => Promise<{ value: boolean; }>
```

屏幕阅读器当前是否处于活动状态。

此方法在 Web 上不受支持（无法检测屏幕
阅读器）。

**返回:** <code>Promise&lt;{ value: boolean; }&gt;</code>

**自从:** 1.0.0

--------------------


### speak(...)

```typescript
speak(options: SpeakOptions) => Promise<void>
```

文本转语音功能。

此功能仅在屏幕阅读器当前处于活动状态时有效。

在 Web 上，浏览器必须支持 [SpeechSynthesis
API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)，否则
此方法将抛出错误。

如需更多文本转语音功能，请参阅 [Capacitor Community
文本转语音
插件](https://github.com/capacitor-community/text-to-speech)。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#speakoptions">SpeakOptions</a></code> |

**自从:** 1.0.0

--------------------


### addListener('stateChange', ...)

```typescript
addListener(eventName: 'stateChange', listener: StateChangeListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

添加屏幕阅读器打开或关闭时的监听器。

此事件以前命名为 `'accessibilityScreenReaderStateChange'`。

此方法在 Web 上不受支持（无法检测屏幕
阅读器）。

| 参数           | 类型                                                                |
| --------------- | ------------------------------------------------------------------- |
| **`eventName`** | <code>'stateChange'</code>                                          |
| **`listener`**  | <code><a href="#statechangelistener">StateChangeListener</a></code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自从:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除附加到此插件的所有监听器。

**自从:** 1.0.0

--------------------


### 接口


#### SpeakOptions

| 属性           | 类型                | 描述                                                                                                                                                               | 自从 |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`value`**    | <code>string</code> | 要朗读的文本。                                                                                                                                                        | 1.0.0 |
| **`language`** | <code>string</code> | 朗读文本时使用的语言，以其 [ISO 639-1 代码](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 指定（例如："en"）。此选项仅在 Android 上受支持。 | 1.0.0 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ScreenReaderState

| 属性        | 类型                 | 描述                                  | 自从 |
| ----------- | -------------------- | ------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 屏幕阅读器当前是否处于活动状态。 | 1.0.0 |


### 类型别名


#### StateChangeListener

<code>(state: <a href="#screenreaderstate">ScreenReaderState</a>): void</code>

</docgen-api>
