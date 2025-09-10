---
title: Http Capacitor 插件 API
description: Capacitor Http API 通过为 `fetch` 和 `XMLHttpRequest` 打补丁以使用原生库，提供原生 HTTP 支持。
custom_edit_url: https://github.com/ionic-team/capacitor/blob/main/core/http.md
editApiUrl: https://github.com/ionic-team/capacitor/blob/main/core/src/core-plugins.ts
sidebar_label: Http
---

# CapacitorHttp

Capacitor Http API 通过为 `fetch` 和 `XMLHttpRequest` 打补丁以使用原生库，提供原生 HTTP 支持。它还提供了不使用 `fetch` 和 `XMLHttpRequest` 的原生 HTTP 请求辅助方法。此插件与 `@capacitor/core` 捆绑提供。

## 配置

默认情况下，使用原生库替换 `window.fetch` 和 `XMLHttpRequest` 的功能是禁用的。
如果您希望启用此功能，请在 `capacitor.config` 文件中修改以下配置。

| 属性          | 类型                 | 描述                                                                          | 默认值            |
| ------------- | -------------------- | ------------------------------------------------------------------------------------ | ------------------ |
| **`enabled`** | <code>boolean</code> | 启用使用原生库替换 `fetch` 和 `XMLHttpRequest` 的功能。 | <code>false</code> |

### 配置示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "CapacitorHttp": {
      "enabled": true
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
```

## 示例

```typescript
import { CapacitorHttp } from '@capacitor/core';

// GET 请求示例
const doGet = () => {
  const options = {
    url: 'https://example.com/my/api',
    headers: { 'X-Fake-Header': 'Fake-Value' },
    params: { size: 'XL' },
  };

  const response: HttpResponse = await CapacitorHttp.get(options);

  // 或者...
  // const response = await CapacitorHttp.request({ ...options, method: 'GET' })
};

// POST 请求示例。注意：data
// 可以作为原始 JS 对象传递（必须是可 JSON 序列化的）
const doPost = () => {
  const options = {
    url: 'https://example.com/my/api',
    headers: { 'X-Fake-Header': 'Fake-Value' },
    data: { foo: 'bar' },
  };

  const response: HttpResponse = await CapacitorHttp.post(options);

  // 或者...
  // const response = await CapacitorHttp.request({ ...options, method: 'POST' })
};
```

## 大文件支持

由于桥接的特性，从原生端解析和传输大量数据到网页端可能会导致问题。计划在不久的将来将下载和上传文件到原生设备的功能添加到 `@capacitor/filesystem` 插件中。在此期间，一种可能避免内存不足问题的方法（特别是在 Android 上）是编辑 `AndroidManifest.xml` 并在 `application` 元素中添加 `android:largeHeap="true"`。大多数应用程序不需要这样做，而应专注于减少整体内存使用以提高性能。启用此选项也不能保证可用内存的固定增加，因为某些设备受限于其总可用内存。

## API

<docgen-index>

* [`request(...)`](#request)
* [`get(...)`](#get)
* [`post(...)`](#post)
* [`put(...)`](#put)
* [`patch(...)`](#patch)
* [`delete(...)`](#delete)
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

****** HTTP 插件 *******

### request(...)

```typescript
request(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发出 HTTP 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### get(...)

```typescript
get(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发出 HTTP GET 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### post(...)

```typescript
post(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发出 HTTP POST 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### put(...)

```typescript
put(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发出 HTTP PUT 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### patch(...)

```typescript
patch(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发出 HTTP PATCH 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### delete(...)

```typescript
delete(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发出 HTTP DELETE 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### Interfaces


#### HttpResponse

| 属性          | 类型                                                | 描述                                       |
| ------------- | --------------------------------------------------- | ------------------------------------------------- |
| **`data`**    | <code>any</code>                                    | 随 HTTP 响应接收的附加数据。  |
| **`status`**  | <code>number</code>                                 | 从 HTTP 响应接收的状态码。  |
| **`headers`** | <code><a href="#httpheaders">HttpHeaders</a></code> | 从 HTTP 响应接收的头部信息。      |
| **`url`**     | <code>string</code>                                 | 从 HTTP 响应接收的响应 URL。 |


#### HttpHeaders


#### HttpOptions

| 属性                        | 类型                                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`url`**                   | <code>string</code>                                           | 要发送请求的 URL。                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **`method`**                | <code>string</code>                                           | 要运行的 HTTP 请求方法。（默认为 GET）                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **`params`**                | <code><a href="#httpparams">HttpParams</a></code>             | 要附加到请求的 URL 参数。                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **`data`**                  | <code>any</code>                                              | 注意：在 Android 和 iOS 上，data 只能是字符串或 JSON。FormData、<a href="#blob">Blob</a>、<a href="#arraybuffer">ArrayBuffer</a> 和其他复杂类型仅在 Web 上直接支持，或通过在配置中启用 `CapacitorHttp` 并使用修补后的 `window.fetch` 或 `XMLHttpRequest` 支持。如果需要发送复杂类型，应将数据序列化为 base64，并相应地设置 `headers["Content-Type"]` 和 `dataType` 属性。 |
| **`headers`**               | <code><a href="#httpheaders">HttpHeaders</a></code>           | 要随请求发送的 HTTP 请求头部信息。                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **`readTimeout`**           | <code>number</code>                                           | 等待读取额外数据的毫秒数。每次接收到新数据时重置。                                                                                                                                                                                                                                                                                                                                                                           |
| **`connectTimeout`**        | <code>number</code>                                           | 等待初始连接的毫秒数。                                                                                                                                                                                                                                                                                                                                                                                                               |
| **`disableRedirects`**      | <code>boolean</code>                                          | 设置是否禁用自动 HTTP 重定向                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **`webFetchExtra`**         | <code><a href="#requestinit">RequestInit</a></code>           | 在 Web 上运行时用于 fetch 的额外参数                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **`responseType`**          | <code><a href="#httpresponsetype">HttpResponseType</a></code> | 用于在将响应返回给请求者之前适当解析响应。如果响应内容类型为 "json"，则忽略此值。                                                                                                                                                                                                                                                                                                                                                                                      |
| **`shouldEncodeUrlParams`** | <code>boolean</code>                                          | 如果您需要在某些情况下（已编码、azure/firebase 测试等）保持 URL 未编码，请使用此选项。默认为 _true_。                                                                                                                                                                                                                                                                                                                             |
| **`dataType`**              | <code>'file' \| 'formData'</code>                             | 如果我们必须将数据从需要在本机层特殊处理的 JS 类型转换，则使用此选项                                                                                                                                                                                                                                                                                                                                                               |


#### HttpParams


#### RequestInit

| 属性                 | 类型                                                              | 描述                                                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`body`**           | <code><a href="#bodyinit">BodyInit</a></code>                     | 一个 <a href="#bodyinit">BodyInit</a> 对象或 null 以设置请求的 body。                                                                                                          |
| **`cache`**          | <code><a href="#requestcache">RequestCache</a></code>             | 一个字符串，指示请求如何与浏览器的缓存交互以设置请求的缓存。                                                                                |
| **`credentials`**    | <code><a href="#requestcredentials">RequestCredentials</a></code> | 一个字符串，指示凭据是否始终、从不或仅在发送到同源 URL 时随请求发送。设置请求的凭据。                          |
| **`headers`**        | <code><a href="#headersinit">HeadersInit</a></code>               | 一个 <a href="#headers">Headers</a> 对象、对象字面量或两个项数组的数组以设置请求的头部信息。                                                              |
| **`integrity`**      | <code>string</code>                                               | 要由请求获取的资源的加密哈希。设置请求的完整性。                                                                                          |
| **`keepalive`**      | <code>boolean</code>                                              | 一个布尔值以设置请求的 keepalive。                                                                                                                                             |
| **`method`**         | <code>string</code>                                               | 一个字符串以设置请求的方法。                                                                                                                                                 |
| **`mode`**           | <code><a href="#requestmode">RequestMode</a></code>               | 一个字符串以指示请求是否使用 CORS，或是否限制为同源 URL。设置请求的模式。                                                           |
| **`redirect`**       | <code><a href="#requestredirect">RequestRedirect</a></code>       | 一个字符串指示请求是否遵循重定向、在遇到重定向时出错，或返回重定向（以不透明的方式）。设置请求的重定向。 |
| **`referrer`**       | <code>string</code>                                               | 一个字符串，其值是同源 URL、"about:client" 或空字符串，以设置请求的引用者。                                                                        |
| **`referrerPolicy`** | <code><a href="#referrerpolicy">ReferrerPolicy</a></code>         | 一个引用策略以设置请求的 referrerPolicy。                                                                                                                                |
| **`signal`**         | <code><a href="#abortsignal">AbortSignal</a></code>               | 一个 <a href="#abortsignal">AbortSignal</a> 以设置请求的信号。                                                                                                                |
| **`window`**         | <code>any</code>                                                  | 只能为 null。用于将请求与任何 Window 分离。                                                                                                                   |


#### Blob

一个不可变的原始数据文件类对象。Blob 表示不一定处于 JavaScript 原生格式的数据。<a href="#file">File</a> 接口基于 <a href="#blob">Blob</a>，继承了 blob 功能并扩展以支持用户系统上的文件。
`Blob` 类是 `require('node:buffer').Blob` 的全局引用
https://nodejs.org/api/buffer.html#class-blob

| 属性       | 类型                |
| ---------- | ------------------- |
| **`size`** | <code>number</code> |
| **`type`** | <code>string</code> |

| 方法          | 签名                                                                           |
| --------------- | ----------------------------------------------------------------------------------- |
| **arrayBuffer** | () =&gt; Promise&lt;<a href="#arraybuffer">ArrayBuffer</a>&gt;                      |
| **slice**       | (start?: number, end?: number, contentType?: string) =&gt; <a href="#blob">Blob</a> |
| **stream**      | () =&gt; <a href="#readablestream">ReadableStream</a>                               |
| **text**        | () =&gt; Promise&lt;string&gt;                                                      |


#### ArrayBuffer

表示二进制数据的原始缓冲区，用于存储
不同类型化数组的数据。ArrayBuffer 不能直接读取或写入，
但可以传递给类型化数组或 DataView 对象以根据需要解释原始
缓冲区。

| 属性             | 类型                | 描述                                                                     |
| ---------------- | ------------------- | ------------------------------------------------------------------------------- |
| **`byteLength`** | <code>number</code> | 只读。<a href="#arraybuffer">ArrayBuffer</a> 的长度（字节）。 |

| 方法    | 签名                                                                  | 描述                                                     |
| --------- | -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **slice** | (begin: number, end?: number) =&gt; <a href="#arraybuffer">ArrayBuffer</a> | 返回 <a href="#arraybuffer">ArrayBuffer</a> 的一个部分。 |


#### ReadableStream

此 Streams API 接口表示字节数据的可读流。Fetch API 通过 Response 对象的 body 属性提供 <a href="#readablestream">ReadableStream</a> 的具体实例。

| 属性         | 类型                 |
| ------------ | -------------------- |
| **`locked`** | <code>boolean</code> |

| 方法          | 签名                                                                                                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **cancel**      | (reason?: any) =&gt; Promise&lt;void&gt;                                                                                                                                                                             |
| **getReader**   | () =&gt; <a href="#readablestreamdefaultreader">ReadableStreamDefaultReader</a>&lt;R&gt;                                                                                                                             |
| **pipeThrough** | &lt;T&gt;(transform: <a href="#readablewritablepair">ReadableWritablePair</a>&lt;T, R&gt;, options?: <a href="#streampipeoptions">StreamPipeOptions</a>) =&gt; <a href="#readablestream">ReadableStream</a>&lt;T&gt; |
| **pipeTo**      | (dest: <a href="#writablestream">WritableStream</a>&lt;R&gt;, options?: <a href="#streampipeoptions">StreamPipeOptions</a>) =&gt; Promise&lt;void&gt;                                                                |
| **tee**         | () =&gt; [ReadableStream&lt;R&gt;, <a href="#readablestream">ReadableStream</a>&lt;R&gt;]                                                                                                                            |


#### ReadableStreamDefaultReader

| 方法          | 签名                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| **read**        | () =&gt; Promise&lt;<a href="#readablestreamdefaultreadresult">ReadableStreamDefaultReadResult</a>&lt;R&gt;&gt; |
| **releaseLock** | () =&gt; void                                                                                                   |


#### ReadableStreamDefaultReadValueResult

| 属性        | 类型               |
| ----------- | ------------------ |
| **`done`**  | <code>false</code> |
| **`value`** | <code>T</code>     |


#### ReadableStreamDefaultReadDoneResult

| 属性        | 类型              |
| ----------- | ----------------- |
| **`done`**  | <code>true</code> |
| **`value`** |                   |


#### ReadableWritablePair

| 属性           | 类型                                                               | 描述                                                                                                                                                                                                                                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`readable`** | <code><a href="#readablestream">ReadableStream</a>&lt;R&gt;</code> |                                                                                                                                                                                                                                                                                                                                                                                     |
| **`writable`** | <code><a href="#writablestream">WritableStream</a>&lt;W&gt;</code> | 提供了一种方便、可链式的方式，通过转换流（或任何其他 { writable, readable } 对）将此可读流传输。它简单地将流传输到所提供对的可写端，并返回可读端以供进一步使用。传输流将在传输期间锁定它，防止任何其他消费者获取读取器。 |


#### WritableStream

此 Streams API 接口提供了将流数据写入目标（称为接收器）的标准抽象。此对象内置了背压和队列功能。

| 属性         | 类型                 |
| ------------ | -------------------- |
| **`locked`** | <code>boolean</code> |

| 方法        | 签名                                                                                |
| ------------- | ---------------------------------------------------------------------------------------- |
| **abort**     | (reason?: any) =&gt; Promise&lt;void&gt;                                                 |
| **getWriter** | () =&gt; <a href="#writablestreamdefaultwriter">WritableStreamDefaultWriter</a>&lt;W&gt; |


#### WritableStreamDefaultWriter

此 Streams API 接口是 <a href="#writablestream">WritableStream.getWriter</a>() 返回的对象，一旦创建，就将写入器锁定到 <a href="#writablestream">WritableStream</a>，确保没有其他流可以写入底层接收器。

| 属性              | 类型                                  |
| ----------------- | ------------------------------------- |
| **`closed`**      | <code>Promise&lt;undefined&gt;</code> |
| **`desiredSize`** | <code>number</code>                   |
| **`ready`**       | <code>Promise&lt;undefined&gt;</code> |

| 方法          | 签名                                |
| --------------- | ---------------------------------------- |
| **abort**       | (reason?: any) =&gt; Promise&lt;void&gt; |
| **close**       | () =&gt; Promise&lt;void&gt;             |
| **releaseLock** | () =&gt; void                            |
| **write**       | (chunk: W) =&gt; Promise&lt;void&gt;     |


#### StreamPipeOptions

| 属性                | 类型                                                | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`preventAbort`**  | <code>boolean</code>                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **`preventCancel`** | <code>boolean</code>                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **`preventClose`**  | <code>boolean</code>                                | 将此可读流传送到给定的可写流目标。可以通过传递的选项自定义在各种错误条件下传输过程的行为。它返回一个在传输过程成功完成时履行的 promise，或者在遇到任何错误时拒绝。传输流将在传输期间锁定它，防止任何其他消费者获取读取器。源和目标流的错误和关闭传播如下：此源可读流中的错误将中止目标，除非 preventAbort 为真值。返回的 promise 将被源的错误或中止目标期间发生的任何错误拒绝。目标中的错误将取消此源可读流，除非 preventCancel 为真值。返回的 promise 将被目标的错误或取消源期间发生的任何错误拒绝。当此源可读流关闭时，目标将被关闭，除非 preventClose 为真值。返回的 promise 将在此过程完成时履行，除非在关闭目标时遇到错误，在这种情况下它将因该错误被拒绝。如果目标一开始就关闭或正在关闭，此源可读流将被取消，除非 preventCancel 为 true。返回的 promise 将因指示传输到关闭流失败的错误或取消源期间发生的任何错误被拒绝。signal 选项可以设置为 <a href="#abortsignal">AbortSignal</a> 以允许通过相应的 AbortController 中止正在进行的传输操作。在这种情况下，此源可读流将被取消，目标将被中止，除非各自的选项 preventCancel 或 preventAbort 已设置。 |
| **`signal`**        | <code><a href="#abortsignal">AbortSignal</a></code> |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |


#### AbortSignal

一个信号对象，允许您与 DOM 请求（如 Fetch）通信，并在需要时通过 AbortController 对象中止它。

| 属性          | 类型                                                                                                  | 描述                                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **`aborted`** | <code>boolean</code>                                                                                  | 如果此 <a href="#abortsignal">AbortSignal</a> 的 AbortController 已发出中止信号，则返回 true，否则返回 false。 |
| **`onabort`** | <code>(this: <a href="#abortsignal">AbortSignal</a>, ev: <a href="#event">Event</a>) =&gt; any</code> |                                                                                                                           |

| 方法                  | 签名                                                                                                                                                                                                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **addEventListener**    | &lt;K extends "abort"&gt;(type: K, listener: (this: <a href="#abortsignal">AbortSignal</a>, ev: AbortSignalEventMap[K]) =&gt; any, options?: boolean \| <a href="#addeventlisteneroptions">AddEventListenerOptions</a>) =&gt; void | 为类型属性值为 type 的事件附加事件监听器。回调参数设置事件被调度时将调用的回调。选项参数设置监听器特定选项。为了兼容性，这可以是一个布尔值，在这种情况下，该方法的行为完全如同该值被指定为选项的 capture。当设置为 true 时，选项的 capture 防止回调在事件的事件阶段属性值为 BUBBLING_PHASE 时被调用。当为 false（或不存在）时，回调将不会在事件的事件阶段属性值为 CAPTURING_PHASE 时被调用。无论哪种方式，如果事件的事件阶段属性值为 AT_TARGET，回调将被调用。当设置为 true 时，选项的 passive 指示回调不会通过调用 preventDefault() 取消事件。这用于启用 §2.8 观察事件监听器中描述的性能优化。当设置为 true 时，选项的 once 指示回调只会被调用一次，之后事件监听器将被移除。事件监听器被附加到目标的事件监听器列表中，如果它具有相同的类型、回调和捕获，则不会被附加。 |
| **addEventListener**    | (type: string, listener: <a href="#eventlisteneroreventlistenerobject">EventListenerOrEventListenerObject</a>, options?: boolean \| <a href="#addeventlisteneroptions">AddEventListenerOptions</a>) =&gt; void                     | 为类型属性值为 type 的事件附加事件监听器。回调参数设置事件被调度时将调用的回调。选项参数设置监听器特定选项。为了兼容性，这可以是一个布尔值，在这种情况下，该方法的行为完全如同该值被指定为选项的 capture。当设置为 true 时，选项的 capture 防止回调在事件的事件阶段属性值为 BUBBLING_PHASE 时被调用。当为 false（或不存在）时，回调将不会在事件的事件阶段属性值为 CAPTURING_PHASE 时被调用。无论哪种方式，如果事件的事件阶段属性值为 AT_TARGET，回调将被调用。当设置为 true 时，选项的 passive 指示回调不会通过调用 preventDefault() 取消事件。这用于启用 §2.8 观察事件监听器中描述的性能优化。当设置为 true 时，选项的 once 指示回调只会被调用一次，之后事件监听器将被移除。事件监听器被附加到目标的事件监听器列表中，如果它具有相同的类型、回调和捕获，则不会被附加。 |
| **removeEventListener** | &lt;K extends "abort"&gt;(type: K, listener: (this: <a href="#abortsignal">AbortSignal</a>, ev: AbortSignalEventMap[K]) =&gt; any, options?: boolean \| <a href="#eventlisteneroptions">EventListenerOptions</a>) =&gt; void       | 从目标的事件监听器列表中移除具有相同类型、回调和选项的事件监听器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **removeEventListener** | (type: string, listener: <a href="#eventlisteneroreventlistenerobject">EventListenerOrEventListenerObject</a>, options?: boolean \| <a href="#eventlisteneroptions">EventListenerOptions</a>) =&gt; void                           | 从目标的事件监听器列表中移除具有相同类型、回调和选项的事件监听器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |


#### AbortSignalEventMap

| 属性          | 类型                                    |
| ------------- | --------------------------------------- |
| **`"abort"`** | <code><a href="#event">Event</a></code> |


#### Event

在 DOM 中发生的事件。

| 属性                   | 类型                                                | 描述                                                                                                                                                                                                                                                |
| ---------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`bubbles`**          | <code>boolean</code>                                | 根据事件如何初始化返回 true 或 false。如果事件以反向树顺序通过其目标的祖先，则为 true，否则为 false。                                                                                                |
| **`cancelBubble`**     | <code>boolean</code>                                |                                                                                                                                                                                                                                                            |
| **`cancelable`**       | <code>boolean</code>                                | 根据事件如何初始化返回 true 或 false。其返回值并不总是有意义，但 true 可以指示事件被调度期间的操作部分可以通过调用 preventDefault() 方法取消。 |
| **`composed`**         | <code>boolean</code>                                | 根据事件如何初始化返回 true 或 false。如果事件调用其目标的 ShadowRoot 节点之外的监听器，则为 true，否则为 false。                                                                                  |
| **`currentTarget`**    | <code><a href="#eventtarget">EventTarget</a></code> | 返回当前正在调用其事件监听器回调的对象。                                                                                                                                                                             |
| **`defaultPrevented`** | <code>boolean</code>                                | 如果 preventDefault() 被成功调用以指示取消，则返回 true，否则返回 false。                                                                                                                                                    |
| **`eventPhase`**       | <code>number</code>                                 | 返回事件的阶段，可以是 NONE、CAPTURING_PHASE、AT_TARGET 和 BUBBLING_PHASE 之一。                                                                                                                                                           |
| **`isTrusted`**        | <code>boolean</code>                                | 如果事件由用户代理调度，则返回 true，否则返回 false。                                                                                                                                                                               |
| **`returnValue`**      | <code>boolean</code>                                |                                                                                                                                                                                                                                                            |
| **`srcElement`**       | <code><a href="#eventtarget">EventTarget</a></code> |                                                                                                                                                                                                                                                            |
| **`target`**           | <code><a href="#eventtarget">EventTarget</a></code> | 返回事件被调度到的对象（其目标）。                                                                                                                                                                                              |
| **`timeStamp`**        | <code>number</code>                                 | 返回事件的时间戳，作为相对于时间原点测量的毫秒数。                                                                                                                                                          |
| **`type`**             | <code>string</code>                                 | 返回事件的类型，例如 "click"、"hashchange" 或 "submit"。                                                                                                                                                                                        |
| **`AT_TARGET`**        | <code>number</code>                                 |                                                                                                                                                                                                                                                            |
| **`BUBBLING_PHASE`**   | <code>number</code>                                 |                                                                                                                                                                                                                                                            |
| **`CAPTURING_PHASE`**  | <code>number</code>                                 |                                                                                                                                                                                                                                                            |
| **`NONE`**             | <code>number</code>                                 |                                                                                                                                                                                                                                                            |

| 方法                       | 签名                                                          | 描述                                                                                                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **composedPath**             | () =&gt; EventTarget[]                                             | 返回事件路径的调用目标对象（将在其上调用监听器的对象），除了任何影子树中模式为 "closed" 且无法从事件的 currentTarget 访问的节点。 |
| **initEvent**                | (type: string, bubbles?: boolean, cancelable?: boolean) =&gt; void |                                                                                                                                                                                                                                         |
| **preventDefault**           | () =&gt; void                                                      | 如果在可取消属性值为 true 时调用，并且在执行事件的监听器时 passive 设置为 false，则向导致事件被调度的操作发出信号，表示需要取消。               |
| **stopImmediatePropagation** | () =&gt; void                                                      | 调用此方法防止事件到达当前监听器完成后任何注册的事件监听器，并且在树中调度时，也防止事件到达任何其他对象。                            |
| **stopPropagation**          | () =&gt; void                                                      | 在树中调度时，调用此方法防止事件到达除当前对象之外的任何对象。                                                                                                                 |


#### EventTarget

<a href="#eventtarget">EventTarget</a> 是一个 DOM 接口，由可以接收事件并可能具有监听器的对象实现。
EventTarget 是一个 DOM 接口，由可以
接收事件并可能具有监听器的对象实现。

| 方法                  | 签名                                                                                                                                                                                                              | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **addEventListener**    | (type: string, listener: <a href="#eventlisteneroreventlistenerobject">EventListenerOrEventListenerObject</a> \| null, options?: boolean \| <a href="#addeventlisteneroptions">AddEventListenerOptions</a>) =&gt; void | 为类型属性值为 type 的事件附加事件监听器。回调参数设置事件被调度时将调用的回调。选项参数设置监听器特定选项。为了兼容性，这可以是一个布尔值，在这种情况下，该方法的行为完全如同该值被指定为选项的 capture。当设置为 true 时，选项的 capture 防止回调在事件的事件阶段属性值为 BUBBLING_PHASE 时被调用。当为 false（或不存在）时，回调将不会在事件的事件阶段属性值为 CAPTURING_PHASE 时被调用。无论哪种方式，如果事件的事件阶段属性值为 AT_TARGET，回调将被调用。当设置为 true 时，选项的 passive 指示回调不会通过调用 preventDefault() 取消事件。这用于启用 §2.8 观察事件监听器中描述的性能优化。当设置为 true 时，选项的 once 指示回调只会被调用一次，之后事件监听器将被移除。事件监听器被附加到目标的事件监听器列表中，如果它具有相同的类型、回调和捕获，则不会被附加。 |
| **dispatchEvent**       | (event: <a href="#event">Event</a>) =&gt; boolean                                                                                                                                                                      | 将合成事件 event 调度到目标，并返回 true，如果事件的可取消属性值为 false 或其 preventDefault() 方法未被调用，否则返回 false。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **removeEventListener** | (type: string, callback: <a href="#eventlisteneroreventlistenerobject">EventListenerOrEventListenerObject</a> \| null, options?: <a href="#eventlisteneroptions">EventListenerOptions</a> \| boolean) =&gt; void       | 从目标的事件监听器列表中移除具有相同类型、回调和选项的事件监听器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |


#### EventListener


#### EventListenerObject

| 方法          | 签名                                    |
| --------------- | -------------------------------------------- |
| **handleEvent** | (evt: <a href="#event">Event</a>) =&gt; void |


#### AddEventListenerOptions

| 属性          | 类型                 |
| ------------- | -------------------- |
| **`once`**    | <code>boolean</code> |
| **`passive`** | <code>boolean</code> |


#### EventListenerOptions

| 属性          | 类型                 |
| ------------- | -------------------- |
| **`capture`** | <code>boolean</code> |


#### ArrayBufferView

| 属性             | 类型                                                        | 描述                                                                  |
| ---------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **`buffer`**     | <code><a href="#arraybufferlike">ArrayBufferLike</a></code> | 数组引用的 <a href="#arraybuffer">ArrayBuffer</a> 实例。 |
| **`byteLength`** | <code>number</code>                                         | 数组的字节长度。                                            |
| **`byteOffset`** | <code>number</code>                                         | 数组的字节偏移量。                                            |


#### ArrayBufferTypes

允许的 <a href="#arraybuffer">ArrayBuffer</a> 类型，用于 <a href="#arraybufferview">ArrayBufferView</a> 的缓冲区和相关类型化数组。

| 属性              | 类型                                                |
| ----------------- | --------------------------------------------------- |
| **`ArrayBuffer`** | <code><a href="#arraybuffer">ArrayBuffer</a></code> |


#### FormData

提供了一种简单的方式来构造一组键/值对，表示表单字段及其值，然后可以使用 XMLHttpRequest.send() 方法轻松发送。它使用与表单将编码类型设置为 "multipart/form-data" 时相同的格式。

| 方法      | 签名                                                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **append**  | (name: string, value: string \| <a href="#blob">Blob</a>, fileName?: string) =&gt; void                                                                                 |
| **delete**  | (name: string) =&gt; void                                                                                                                                               |
| **get**     | (name: string) =&gt; <a href="#formdataentryvalue">FormDataEntryValue</a> \| null                                                                                       |
| **getAll**  | (name: string) =&gt; FormDataEntryValue[]                                                                                                                               |
| **has**     | (name: string) =&gt; boolean                                                                                                                                            |
| **set**     | (name: string, value: string \| <a href="#blob">Blob</a>, fileName?: string) =&gt; void                                                                                 |
| **forEach** | (callbackfn: (value: <a href="#formdataentryvalue">FormDataEntryValue</a>, key: string, parent: <a href="#formdata">FormData</a>) =&gt; void, thisArg?: any) =&gt; void |


#### File

提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。

| 属性               | 类型                |
| ------------------ | ------------------- |
| **`lastModified`** | <code>number</code> |
| **`name`**         | <code>string</code> |


#### URLSearchParams

<a href="#urlsearchparams">`URLSearchParams`</a> 类是 `require('url').URLSearchParams` 的全局引用
https://nodejs.org/api/url.html#class-urlsearchparams

| 方法       | 签名                                                                                                                               | 描述                                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **append**   | (name: string, value: string) =&gt; void                                                                                                | 将指定的键/值对附加为新的搜索参数。                                                              |
| **delete**   | (name: string) =&gt; void                                                                                                               | 从所有搜索参数列表中删除给定的搜索参数及其关联值。                      |
| **get**      | (name: string) =&gt; string \| null                                                                                                     | 返回与给定搜索参数关联的第一个值。                                                          |
| **getAll**   | (name: string) =&gt; string[]                                                                                                           | 返回与给定搜索参数关联的所有值。                                                          |
| **has**      | (name: string) =&gt; boolean                                                                                                            | 返回一个布尔值，指示是否存在此类搜索参数。                                                            |
| **set**      | (name: string, value: string) =&gt; void                                                                                                | 将与给定搜索参数关联的值设置为给定值。如果有多个值，则删除其他值。 |
| **sort**     | () =&gt; void                                                                                                                           |                                                                                                                            |
| **toString** | () =&gt; string                                                                                                                         | 返回包含适用于 URL 的查询字符串的字符串。不包括问号。                  |
| **forEach**  | (callbackfn: (value: string, key: string, parent: <a href="#urlsearchparams">URLSearchParams</a>) =&gt; void, thisArg?: any) =&gt; void |                                                                                                                            |


#### Uint8Array

一个 8 位无符号整数值的类型化数组。内容初始化为 0。如果
无法分配请求的字节数，则会引发异常。

| 属性                    | 类型                                                        | 描述                                                                  |
| ----------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **`BYTES_PER_ELEMENT`** | <code>number</code>                                         | 数组中每个元素的大小（字节）。                              |
| **`buffer`**            | <code><a href="#arraybufferlike">ArrayBufferLike</a></code> | 数组引用的 <a href="#arraybuffer">ArrayBuffer</a> 实例。 |
| **`byteLength`**        | <code>number</code>                                         | 数组的字节长度。                                            |
| **`byteOffset`**        | <code>number</code>                                         | 数组的字节偏移量。                                            |
| **`length`**            | <code>number</code>                                         | 数组的长度。                                                     |

| 方法             | 签名                                                                                                                                                                      | 描述                                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **copyWithin**     | (target: number, start: number, end?: number) =&gt; this                                                                                                                       | 在将数组中以 start 和 end 标识的部分复制到从位置 target 开始的同一数组后返回此对象                                                                                                      |
| **every**          | (predicate: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; unknown, thisArg?: any) =&gt; boolean                                            | 确定数组的所有成员是否满足指定测试。                                                                                                                                                                  |
| **fill**           | (value: number, start?: number, end?: number) =&gt; this                                                                                                                       | 在用值填充由 start 和 end 标识的部分后返回此对象                                                                                                                                                    |
| **filter**         | (predicate: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; any, thisArg?: any) =&gt; <a href="#uint8array">Uint8Array</a>                   | 返回数组中满足回调函数中指定条件的元素。                                                                                                                                                  |
| **find**           | (predicate: (value: number, index: number, obj: <a href="#uint8array">Uint8Array</a>) =&gt; boolean, thisArg?: any) =&gt; number \| undefined                                  | 返回数组中谓词为 true 的第一个元素的值，否则返回 undefined。                                                                                                                                       |
| **findIndex**      | (predicate: (value: number, index: number, obj: <a href="#uint8array">Uint8Array</a>) =&gt; boolean, thisArg?: any) =&gt; number                                               | 返回数组中谓词为 true 的第一个元素的索引，否则返回 -1。                                                                                                                                              |
| **forEach**        | (callbackfn: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; void, thisArg?: any) =&gt; void                                                 | 对数组中的每个元素执行指定操作。                                                                                                                                                                                 |
| **indexOf**        | (searchElement: number, fromIndex?: number) =&gt; number                                                                                                                       | 返回数组中值第一次出现的索引。                                                                                                                                                                           |
| **join**           | (separator?: string) =&gt; string                                                                                                                                              | 将数组的所有元素添加由指定分隔符字符串分隔。                                                                                                                                                              |
| **lastIndexOf**    | (searchElement: number, fromIndex?: number) =&gt; number                                                                                                                       | 返回数组中值最后一次出现的索引。                                                                                                                                                                            |
| **map**            | (callbackfn: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number, thisArg?: any) =&gt; <a href="#uint8array">Uint8Array</a>               | 对数组的每个元素调用定义的回调函数，并返回包含结果的数组。                                                                                                                              |
| **reduce**         | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number) =&gt; number                       | 为数组中的所有元素调用指定的回调函数。回调函数的返回值是累积结果，并在下次调用回调函数时作为参数提供。                      |
| **reduce**         | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number, initialValue: number) =&gt; number |                                                                                                                                                                                                                                             |
| **reduce**         | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; U, initialValue: U) =&gt; U            | 为数组中的所有元素调用指定的回调函数。回调函数的返回值是累积结果，并在下次调用回调函数时作为参数提供。                      |
| **reduceRight**    | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number) =&gt; number                       | 以降序为数组中的所有元素调用指定的回调函数。回调函数的返回值是累积结果，并在下次调用回调函数时作为参数提供。 |
| **reduceRight**    | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number, initialValue: number) =&gt; number |                                                                                                                                                                                                                                             |
| **reduceRight**    | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; U, initialValue: U) =&gt; U            | 以降序为数组中的所有元素调用指定的回调函数。回调函数的返回值是累积结果，并在下次调用回调函数时作为参数提供。 |
| **reverse**        | () =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                                                  | 反转数组中的元素。                                                                                                                                                                                                          |
| **set**            | (array: <a href="#arraylike">ArrayLike</a>&lt;number&gt;, offset?: number) =&gt; void                                                                                          | 设置一个值或值数组。                                                                                                                                                                                                         |
| **slice**          | (start?: number, end?: number) =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                      | 返回数组的一部分。                                                                                                                                                                                                              |
| **some**           | (predicate: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; unknown, thisArg?: any) =&gt; boolean                                            | 确定指定回调函数是否对数组的任何元素返回 true。                                                                                                                                                |
| **sort**           | (compareFn?: (a: number, b: number) =&gt; number) =&gt; this                                                                                                                   | 对数组进行排序。                                                                                                                                                                                                                             |
| **subarray**       | (begin?: number, end?: number) =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                      | 获取此数组的 <a href="#arraybuffer">ArrayBuffer</a> 存储的新 <a href="#uint8array">Uint8Array</a> 视图，引用从 begin（包含）到 end（不包含）的元素。                                                |
| **toLocaleString** | () =&gt; string                                                                                                                                                                | 通过使用当前区域设置将数字转换为字符串。                                                                                                                                                                                  |
| **toString**       | () =&gt; string                                                                                                                                                                | 返回数组的字符串表示形式。                                                                                                                                                                                                |
| **valueOf**        | () =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                                                  | 返回指定对象的原始值。                                                                                                                                                                                        |


#### ArrayLike

| 属性         | 类型                |
| ------------ | ------------------- |
| **`length`** | <code>number</code> |


#### Headers

此 Fetch API 接口允许您对 HTTP 请求和响应头部执行各种操作。这些操作包括检索、设置、添加到和移除。一个 <a href="#headers">Headers</a> 对象有一个关联的头部列表，最初为空，由零个或多个名称和值对组成。您可以使用 append() 等方法添加到其中（参见示例。）在此接口的所有方法中，头部名称通过不区分大小写的字节序列匹配。

| 方法      | 签名                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| **append**  | (name: string, value: string) =&gt; void                                                                                |
| **delete**  | (name: string) =&gt; void                                                                                               |
| **get**     | (name: string) =&gt; string \| null                                                                                     |
| **has**     | (name: string) =&gt; boolean                                                                                            |
| **set**     | (name: string, value: string) =&gt; void                                                                                |
| **forEach** | (callbackfn: (value: string, key: string, parent: <a href="#headers">Headers</a>) =&gt; void, thisArg?: any) =&gt; void |


### Type Aliases


#### BodyInit

<code><a href="#blob">Blob</a> | <a href="#buffersource">BufferSource</a> | <a href="#formdata">FormData</a> | <a href="#urlsearchparams">URLSearchParams</a> | <a href="#readablestream">ReadableStream</a>&lt;<a href="#uint8array">Uint8Array</a>&gt; | string</code>


#### ReadableStreamDefaultReadResult

<code><a href="#readablestreamdefaultreadvalueresult">ReadableStreamDefaultReadValueResult</a>&lt;T&gt; | <a href="#readablestreamdefaultreaddoneresult">ReadableStreamDefaultReadDoneResult</a></code>


#### EventListenerOrEventListenerObject

<code><a href="#eventlistener">EventListener</a> | <a href="#eventlistenerobject">EventListenerObject</a></code>


#### BufferSource

<code><a href="#arraybufferview">ArrayBufferView</a> | <a href="#arraybuffer">ArrayBuffer</a></code>


#### ArrayBufferLike

<code>ArrayBufferTypes[keyof ArrayBufferTypes]</code>


#### FormDataEntryValue

<code><a href="#file">File</a> | string</code>


#### RequestCache

<code>"default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload"</code>


#### RequestCredentials

<code>"include" | "omit" | "same-origin"</code>


#### HeadersInit

<code><a href="#headers">Headers</a> | string[][] | <a href="#record">Record</a>&lt;string, string&gt;</code>


#### Record

用一组类型为 T 的属性 K 构造一个类型

<code>{
 [P in K]: T;
 }</code>


#### RequestMode

<code>"cors" | "navigate" | "no-cors" | "same-origin"</code>


#### RequestRedirect

<code>"error" | "follow" | "manual"</code>


#### ReferrerPolicy

<code>"" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"</code>


#### HttpResponseType

如何在将 HTTP 响应返回给客户端之前解析它。

<code>'arraybuffer' | 'blob' | 'json' | 'text' | 'document'</code>

</docgen-api>