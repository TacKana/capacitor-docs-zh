---
title: Local LLM Capacitor 插件 API
description: 一个用于在设备上运行 LLM 的 Capacitor 插件，支持在 iOS 和 Android 上进行文本生成、图像生成和会话管理。
translated: true
custom_edit_url: https://github.com/ionic-team/capacitor-local-llm/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-local-llm/blob/main/src/definitions.ts
sidebar_label: 本地大模型 🧪
source_hash: 34df14bd
---

# @capacitor/local-llm

> [!WARNING]  
> CapacitorLABS - 此项目为实验性质。不提供支持。如有需要请提交 issue。

使用 Apple Intelligence（Foundation Models）在 iOS 上和 Gemini Nano 在 Android 上完全在设备上运行大型语言模型。无需网络请求，无需 API 密钥，数据不会离开设备。

> **注意：** 设备端 LLM 需要物理硬件。不支持 Android 模拟器。只要主机设备能够运行 Apple Intelligence 并已启用，iOS 模拟器受支持。

## 安装

```bash
npm install @capacitor/local-llm
npx cap sync
```

## 平台要求

| 平台 | 最低 OS | 说明 |
|----------|------------|-------|
| iOS | **15** | 图像生成需要 iOS 18.4+。文本 LLM（Foundation Models / Apple Intelligence）需要 iOS 26+。 |
| Android | **9 (API 28)** | 通过 ML Kit 使用的 Gemini Nano 需要支持设备端 AI 的设备（例如 Pixel 9+）。 |

## iOS 设置

无需额外配置。Foundation Models 和 Image Playground 是已启用 Apple Intelligence 的受支持设备上自动可用的系统框架。

在运行时调用 [`systemAvailability()`](#systemavailability) 检查模型是否已准备好，然后再发送提示。

在 iOS 18 及更低版本上，`systemAvailability()` 对文本 LLM 返回 `'unavailable'`。如果仍然调用 `prompt()` 或 `warmup()`，promise 将因错误被拒绝。通过 `generateImage()` 进行的图像生成在 iOS 18.4+ 上功能完整。

## Android 设置

插件的最低 Android SDK 为 28，高于 Capacitor 当前的最低版本（24）。你需要在应用的 `android/variables.gradle` 文件中进行更改：

```gradle
ext {
    minSdkVersion = 28
}
```

Gemini Nano 通过 Google Play Services 分发，使用前必须下载到设备。模型不随你的应用一起打包。

### 检查可用性并下载

调用 [`systemAvailability()`](#systemavailability) 检查当前状态。如果状态为 `downloadable`，使用 [`download()`](#download) 触发下载，并轮询 `systemAvailability()` 直到状态变为 `available`。

```typescript
import { LocalLLM } from '@capacitor/local-llm';

const { status } = await LocalLLM.systemAvailability();

if (status === 'downloadable') {
  await LocalLLM.download();
  // 轮询 systemAvailability() 直到 status === 'available'
  // 或者使用 addListener('systemAvailabilityChange', {}) 获取状态更新的通知
}
```

## 平台限制

### iOS

- **文本 LLM 需要 iOS 26 和 Apple Intelligence。** 在 iOS 18 及更低版本上，`systemAvailability()` 对文本 LLM 返回 `'unavailable'`，并且 `prompt()` / `warmup()` 将被拒绝。只有部分 iPhone（iPhone 15 Pro 或更高版本）和 iPad 兼容 Apple Intelligence。[更多信息在这里](https://www.apple.com/apple-intelligence/)。
- **iOS 上不支持 `download()`。** 模型由操作系统管理；使用 `systemAvailability()` 检查就绪状态。
- **上下文限制为 4096 个 token。** 这适用于系统指令、对话历史和当前提示的总长度。

### Android

- **`maximumOutputTokens` 被限制在 1-256 之间**，由 ML Kit API 限制。此范围之外的值将被强制调整。
- **多轮会话上下文在内存中管理**，通过手动将对话历史组装到每个提示中。它不是一个原生会话 API，并且在应用重启后不会持久化。
- **Android 上 `warmup()` 忽略 `sessionId` 和 `promptPrefix`** —— 它全局预热模型。
- **并非所有 Android 9+ 设备都支持 Gemini Nano。** 设备必须具有兼容的设备端 AI 芯片（例如 Pixel 9 及更高版本）。[更多信息在这里](https://developers.google.com/ml-kit/genai#device-support)。
- **应用在后台时无法使用设备端模型。** 应用处于后台时发出的推理请求将失败。
- **AICore 对每个应用强制实施推理配额。** 短时间内发出过多请求将导致 `BUSY` 错误响应——重试时考虑使用指数退避。如果应用超过长时间配额（例如每日限制），可能返回 `PER_APP_BATTERY_USE_QUOTA_EXCEEDED` 错误。

## 使用

### 基本提示

```typescript
import { LocalLLM } from '@capacitor/local-llm';

const { text } = await LocalLLM.prompt({
  prompt: '用一段话总结相对论。',
});

console.log(text);
```

### 多轮对话

使用 `sessionId` 在多个提示之间保持上下文。

```typescript
import { LocalLLM } from '@capacitor/local-llm';

const sessionId = 'my-chat-session';

await LocalLLM.prompt({
  sessionId,
  instructions: '你是一个有用的助手。',
  prompt: '法国的首都是什么？',
});

const { text } = await LocalLLM.prompt({
  sessionId,
  prompt: '那个城市的人口是多少？',
});

// 完成后清理
await LocalLLM.endSession({ sessionId });
```

### 通过预热减少首次响应延迟

```typescript
import { LocalLLM } from '@capacitor/local-llm';

// 在用户开始输入之前预初始化模型
await LocalLLM.warmup({
  sessionId: 'my-session',
  promptPrefix: '你是 Acme Corp 的客户支持代理。',
});
```

### 图像生成（仅 iOS）

```typescript
import { LocalLLM } from '@capacitor/local-llm';

const { pngBase64Images } = await LocalLLM.generateImage({
  prompt: '日出时宁静的山间湖泊，照片级真实感',
  count: 2,
});

// 直接在 <img> 标签中使用
const src = `data:image/png;base64,${pngBase64Images[0]}`;
```

## 错误处理

所有插件方法在失败时都会抛出 `LocalLLMException`。它扩展了 `Error` 并添加了一个机器可读的 `code` 属性，类型为 `LocalLLMErrorCode`。

```typescript
import { LocalLLM, LocalLLMException } from '@capacitor/local-llm';

try {
  await LocalLLM.prompt({ prompt: '你好' });
} catch (err) {
  if (err instanceof LocalLLMException) {
    console.log(err.code);    // 例如 'LOCAL_LLM_NOT_ENABLED'
    console.log(err.message); // 人类可读的描述
  }
}
```

### `LocalLLMErrorCode`

| Code | 描述 |
|------|-------------|
| `LOCAL_LLM_UNSUPPORTED_PLATFORM` | 当前操作系统版本或设备硬件不支持设备端 LLM。 |
| `LOCAL_LLM_NOT_ENABLED` | 支持设备端 AI 功能但用户尚未启用（例如 Apple Intelligence）。 |
| `LOCAL_LLM_NOT_READY` | 模型存在于设备上但仍在下载或初始化中。 |
| `LOCAL_LLM_UNAVAILABLE` | 由于未分类的原因，模型不可用。 |
| `LOCAL_LLM_RESPONSE_IN_PROGRESS` | 向正在生成响应的会话发送了提示。 |
| `LOCAL_LLM_NOT_INITIALIZED` | 插件实现未初始化。正常情况下不应发生。 |
| `LOCAL_LLM_MISSING_PARAMETER` | 缺少必需的调用参数（例如 `sessionId`、`prompt`）。 |
| `LOCAL_LLM_WEB_NOT_SUPPORTED` | 在 Web 平台上调用方法，该平台不受支持。 |
| `LOCAL_LLM_IMAGE_GENERATION_FAILED` | 图像生成失败（例如没有可用的生成样式）。 |
| `LOCAL_LLM_UNKNOWN_ERROR` | 底层平台 SDK 抛出了意外错误。查看 `err.message` 获取详情。 |

## API

<docgen-index>

* [`systemAvailability()`](#systemavailability)
* [`download()`](#download)
* [`prompt(...)`](#prompt)
* [`endSession(...)`](#endsession)
* [`generateImage(...)`](#generateimage)
* [`warmup(...)`](#warmup)
* [`addListener('systemAvailabilityChange', ...)`](#addlistenersystemavailabilitychange-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

用于与设备端 LLM 交互的主插件接口。

### systemAvailability()

```typescript
systemAvailability() => Promise<SystemAvailabilityResponse>
```

检查设备端 LLM 的可用性状态。

使用此方法确定 LLM 是否已准备好使用、是否需要下载，
或设备上是否不可用。

**返回：** <code>Promise&lt;<a href="#systemavailabilityresponse">SystemAvailabilityResponse</a>&gt;</code>

**Since:** 1.0.0

--------------------


### download()

```typescript
download() => Promise<void>
```

下载设备端 LLM 模型。

此方法在 LLM 模型尚未存在于设备上时启动下载。仅适用于 Android。

**Since:** 1.0.0

--------------------


### prompt(...)

```typescript
prompt(options: PromptOptions) => Promise<PromptResponse>
```

向设备端 LLM 发送提示并接收响应。

使用此方法与 LLM 交互。你可以选择提供 sessionId
以在多个提示之间保持对话上下文。

| Param         | Type                                                    | Description                                                               |
| ------------- | ------------------------------------------------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#promptoptions">PromptOptions</a></code> | - 提示选项，包括文本提示和可选的配置 |

**返回：** <code>Promise&lt;<a href="#promptresponse">PromptResponse</a>&gt;</code>

**Since:** 1.0.0

--------------------


### endSession(...)

```typescript
endSession(options: EndSessionOptions) => Promise<void>
```

结束活动的 LLM 会话。

使用此方法在完成对话会话后清理资源。
这对管理内存和防止资源泄漏很重要。

| Param         | Type                                                            | Description                                   |
| ------------- | --------------------------------------------------------------- | --------------------------------------------- |
| **`options`** | <code><a href="#endsessionoptions">EndSessionOptions</a></code> | - 包含要结束的 sessionId 的选项 |

**Since:** 1.0.0

--------------------


### generateImage(...)

```typescript
generateImage(options: GenerateImageOptions) => Promise<GenerateImageResponse>
```

使用设备端 LLM 根据文本提示生成图像。

使用此方法根据文本描述创建图像。可选地提供
参考图像以影响生成结果。生成的图像以 base64 编码的 PNG 字符串数组形式返回。

| Param         | Type                                                                  | Description                                                                               |
| ------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#generateimageoptions">GenerateImageOptions</a></code> | - 图像生成选项，包括提示、可选的参考图像和数量 |

**返回：** <code>Promise&lt;<a href="#generateimageresponse">GenerateImageResponse</a>&gt;</code>

**Since:** 1.0.0

--------------------


### warmup(...)

```typescript
warmup(options: WarmupOptions) => Promise<void>
```

预热设备端 LLM 以获得更快的初始响应。

使用此方法使用提示前缀预初始化 LLM，减少
第一个实际提示的延迟。当你提前知道将要发送的
提示类型时，这很有用。

| Param         | Type                                                    | Description                                      |
| ------------- | ------------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#warmupoptions">WarmupOptions</a></code> | - 包含提示前缀的预热选项 |

**Since:** 1.0.0

--------------------


### addListener('systemAvailabilityChange', ...)

```typescript
addListener(eventName: 'systemAvailabilityChange', listenerFunc: SystemAvailabilityChangeListener) => Promise<PluginListenerHandle>
```

注册一个监听器，在设备端 LLM 可用性状态更改时被调用。

每次状态更改时，都会用新的可用性状态调用监听器。轮询
在添加第一个监听器时开始，并在通过 `removeAllListeners()` 移除所有监听器时停止。

| Param              | Type                                                                                          | Description                                                            |
| ------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **`eventName`**    | <code>'systemAvailabilityChange'</code>                                                       | - 要监听的事件名称                                         |
| **`listenerFunc`** | <code><a href="#systemavailabilitychangelistener">SystemAvailabilityChangeListener</a></code> | - 每次状态更改时使用新的可用性状态调用的回调 |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

--------------------


### Interfaces


#### SystemAvailabilityResponse

包含设备端 LLM 系统可用性状态的响应。

| Prop         | Type                                                        | Description                                 | Since |
| ------------ | ----------------------------------------------------------- | ------------------------------------------- | ----- |
| **`status`** | <code><a href="#llmavailability">LLMAvailability</a></code> | LLM 当前的可用性状态。 | 1.0.0 |


#### PromptResponse

LLM 处理提示后的响应。

| Prop       | Type                | Description                             | Since |
| ---------- | ------------------- | --------------------------------------- | ----- |
| **`text`** | <code>string</code> | LLM 生成的文本响应。 | 1.0.0 |


#### PromptOptions

向 LLM 发送提示的选项。

| Prop               | Type                                              | Description                                                                                                                                                                                       | Since |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`sessionId`**    | <code>string</code>                               | 可选的会话标识符，用于保持对话上下文。在多个提示中提供相同的 sessionId 以保持上下文。如果未提供，每个提示被视为独立。 | 1.0.0 |
| **`instructions`** | <code>string</code>                               | 系统级指令，用于引导 LLM 的行为。用于设置 LLM 回复的角色、语气或约束。                                                                    | 1.0.0 |
| **`options`**      | <code><a href="#llmoptions">LLMOptions</a></code> | 用于控制 LLM 推理行为的配置选项。                                                                                                                                     | 1.0.0 |
| **`prompt`**       | <code>string</code>                               | 发送给 LLM 的文本提示。                                                                                                                                                               | 1.0.0 |


#### LLMOptions

LLM 推理行为的配置选项。

| Prop                      | Type                | Description                                                                                                                                                          | Since |
| ------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`temperature`**         | <code>number</code> | 控制模型输出的随机性。较高的值（例如 0.8）使输出更随机，而较低的值（例如 0.2）使其更集中和确定。 | 1.0.0 |
| **`maximumOutputTokens`** | <code>number</code> | 响应中生成的最大 token 数。在 Android 上，必须在 1 到 256 之间。                                                                | 1.0.0 |


#### EndSessionOptions

结束活动 LLM 会话的选项。

| Prop            | Type                | Description                                                                                            | Since |
| --------------- | ------------------- | ------------------------------------------------------------------------------------------------------ | ----- |
| **`sessionId`** | <code>string</code> | 要结束的会话标识符。应与之前 prompt() 调用中使用的 sessionId 匹配。 | 1.0.0 |


#### GenerateImageResponse

包含生成图像数据的响应。

| Prop                  | Type                  | Description                                                                                                                                                                          | Since |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`pngBase64Images`** | <code>string[]</code> | 生成的图像数组，以 base64 编码的 PNG 字符串形式。每个字符串包含原始 base64 数据（不包含 data URI 前缀）。要在 img 标签中使用，请添加 'data:image/png;base64,' 前缀。 | 1.0.0 |


#### GenerateImageOptions

从文本提示生成图像的选项。

| Prop               | Type                  | Description                                                                                                                                                                                                                                                                                              | Default        | Since |
| ------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----- |
| **`prompt`**       | <code>string</code>   | 描述要生成图像的文本提示。                                                                                                                                                                                                                                                        |                | 1.0.0 |
| **`promptImages`** | <code>string[]</code> | 可选的一组参考图像，用于影响生成的输出。提供 base64 编码的图像字符串（带或不带 data URI 前缀），将用作图像生成的视觉上下文或灵感。这允许你结合文本和图像概念以获得更可控的输出。 |                | 1.0.0 |
| **`count`**        | <code>number</code>   | 要生成的图像变体数量。如果未指定，默认为 1。                                                                                                                                                                                                                              | <code>1</code> | 1.0.0 |


#### WarmupOptions

预热设备端 LLM 的选项。

| Prop               | Type                | Description                                                                                                                                                         | Since |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`sessionId`**    | <code>string</code> | 预热的会话标识符。此标识符将与预热的会话关联，允许你在后续提示中使用相同的会话。  | 1.0.0 |
| **`promptPrefix`** | <code>string</code> | 用于预热 LLM 的提示前缀。此文本将用于预初始化模型，减少后续具有相似前缀的提示的延迟。 | 1.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Type Aliases


#### LLMAvailability

设备端 LLM 的可用性状态。

<code>'available' | 'unavailable' | 'notready' | 'downloadable'</code>


#### SystemAvailabilityChangeListener

设备端 LLM 可用性状态变化时调用的回调。

<code>(response: <a href="#systemavailabilityresponse">SystemAvailabilityResponse</a>): void</code>

</docgen-api>
