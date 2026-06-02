---
title: Http Capacitor 插件 API
description: Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 以使用原生库来提供原生 http 支持。
translated: true
custom_edit_url: https://github.com/ionic-team/capacitor/blob/main/core/http.md
editApiUrl: https://github.com/ionic-team/capacitor/blob/main/core/src/core-plugins.ts
sidebar_label: HTTP
source_hash: 2009574d
---

# CapacitorHttp

Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 以使用原生库来提供原生 http 支持。它还提供了在不使用 `fetch` 和 `XMLHttpRequest` 的情况下进行原生 http 请求的辅助方法。此插件随 `@capacitor/core` 一起提供。

## 配置

默认情况下，对 `window.fetch` 和 `XMLHttpRequest` 的修补以使用原生库是禁用的。
如果你希望启用此功能，请在 `capacitor.config` 文件中修改以下配置。

| 属性          | 类型                 | 描述                                                                                      | 默认值            |
| ------------- | -------------------- | ------------------------------------------------------------------------------------------------ | ------------------ |
| **`enabled`** | <code>boolean</code> | 启用对 `fetch` 和 `XMLHttpRequest` 的修补以使用原生库。 | <code>false</code> |

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
// 可以作为原始 JS 对象传递（必须是 JSON 可序列化的）
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

由于桥接机制的特性，从原生端解析和传输大量数据到 Web 可能会导致问题。已向 [`@capacitor/file-transfer`](https://capacitorjs.com/docs/apis/file-transfer) 插件添加了文件下载和上传的支持。在许多情况下，你可能还需要 [`@capacitor/filesystem`](https://capacitorjs.com/docs/apis/filesystem) 来生成有效的 [文件 URI](https://capacitorjs.com/docs/apis/filesystem#geturi)。

## API

<docgen-index>

* [`request(...)`](#request)
* [`get(...)`](#get)
* [`post(...)`](#post)
* [`put(...)`](#put)
* [`patch(...)`](#patch)
* [`delete(...)`](#delete)
* [Interfaces](#接口)
* [Type Aliases](#类型别名)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

****** HTTP 插件 *******

### request(...)

```typescript
request(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 Http 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### get(...)

```typescript
get(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 Http GET 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### post(...)

```typescript
post(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 Http POST 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### put(...)

```typescript
put(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 Http PUT 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### patch(...)

```typescript
patch(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 Http PATCH 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### delete(...)

```typescript
delete(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 Http DELETE 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### 接口


#### HttpResponse

| 属性          | 类型                                                | 描述                               |
| ------------- | --------------------------------------------------- | ----------------------------------------- |
| **`data`**    | <code>any</code>                                    | Http 响应接收到的附加数据。  |
| **`status`**  | <code>number</code>                                 | Http 响应接收到的状态码。    |
| **`headers`** | <code><a href="#httpheaders">HttpHeaders</a></code> | Http 响应接收到的请求头。    |
| **`url`**     | <code>string</code>                                 | Http 响应接收到的响应 URL。 |


#### HttpHeaders


#### HttpOptions

| 属性                        | 类型                                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`url`**                   | <code>string</code>                                           | 要发送请求的 URL。                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **`method`**                | <code>string</code>                                           | Http 请求方法。（默认为 GET）                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **`params`**                | <code><a href="#httpparams">HttpParams</a></code>             | 要附加到请求的 URL 参数。                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **`data`**                  | <code>any</code>                                              | 注意：在 Android 和 iOS 上，data 只能是字符串或 JSON。FormData、<a href="#blob">Blob</a>、<a href="#arraybuffer">ArrayBuffer</a> 和其他复杂类型仅在 Web 上或通过启用 `CapacitorHttp` 配置并使用修补后的 `window.fetch` 或 `XMLHttpRequest` 才直接支持。如果你需要发送复杂类型，应将数据序列化为 base64 并相应设置 `headers["Content-Type"]` 和 `dataType` 属性。 |
| **`headers`**               | <code><a href="#httpheaders">HttpHeaders</a></code>           | 随请求发送的 Http 请求头。                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **`readTimeout`**           | <code>number</code>                                           | 等待读取附加数据的时间（毫秒）。每次收到新数据时重置。                                                                                                                                                                                                                                                                                                                                                                           |
| **`connectTimeout`**        | <code>number</code>                                           | 等待初始连接的时间（毫秒）。                                                                                                                                                                                                                                                                                                                                                                                                               |
| **`disableRedirects`**      | <code>boolean</code>                                          | 设置是否禁用自动 HTTP 重定向                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **`webFetchExtra`**         | <code><a href="#requestinit">RequestInit</a></code>           | 在 Web 上运行时，用于 fetch 的额外参数                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **`responseType`**          | <code><a href="#httpresponsetype">HttpResponseType</a></code> | 用于在返回响应之前适当地解析响应。如果响应 content-type 为 "json"，则忽略此值。                                                                                                                                                                                                                                                                                                                      |
| **`shouldEncodeUrlParams`** | <code>boolean</code>                                          | 如果你需要在某些情况下保持 URL 不编码（已编码、azure/firebase 测试等），请使用此选项。默认为 _true_。                                                                                                                                                                                                                                                                                                                             |
| **`dataType`**              | <code>'file' \| 'formData'</code>                             | 当我们需要将从 JS 类型转换的数据在原生层进行特殊处理时使用。                                                                                                                                                                                                                                                                                                                                                               |


#### HttpParams


#### RequestInit

| 属性                 | 类型                                                              | 描述                                                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`body`**           | <code><a href="#bodyinit">BodyInit</a></code>                     | 一个 <a href="#bodyinit">BodyInit</a> 对象或 null，用于设置请求的 body。                                                                                                          |
| **`cache`**          | <code><a href="#requestcache">RequestCache</a></code>             | 一个字符串，指示请求如何与浏览器缓存交互，用于设置请求的 cache。                                                                                |
| **`credentials`**    | <code><a href="#requestcredentials">RequestCredentials</a></code> | 一个字符串，指示是否始终、从不或仅当发送到同源 URL 时随请求发送凭据。设置请求的 credentials。                          |
| **`headers`**        | <code><a href="#headersinit">HeadersInit</a></code>               | 一个 <a href="#headers">Headers</a> 对象、对象字面量或双项数组的数组，用于设置请求的 headers。                                                              |
| **`integrity`**      | <code>string</code>                                               | 要获取的资源的安全散列。设置请求的 integrity。                                                                                          |
| **`keepalive`**      | <code>boolean</code>                                              | 一个布尔值，用于设置请求的 keepalive。                                                                                                                                             |
| **`method`**         | <code>string</code>                                               | 一个字符串，用于设置请求的 method。                                                                                                                                                 |
| **`mode`**           | <code><a href="#requestmode">RequestMode</a></code>               | 一个字符串，指示请求是否使用 CORS，或是否限制为同源 URL。设置请求的 mode。                                                           |
| **`redirect`**       | <code><a href="#requestredirect">RequestRedirect</a></code>       | 一个字符串，指示请求是跟随重定向、遇到重定向时出错，还是返回重定向（以不透明方式）。设置请求的 redirect。 |
| **`referrer`**       | <code>string</code>                                               | 一个字符串，其值为同源 URL、"about:client" 或空字符串，用于设置请求的 referrer。                                                                        |
| **`referrerPolicy`** | <code><a href="#referrerpolicy">ReferrerPolicy</a></code>         | 一个引荐来源策略，用于设置请求的 referrerPolicy。                                                                                                                                |
| **`signal`**         | <code><a href="#abortsignal">AbortSignal</a></code>               | 一个 <a href="#abortsignal">AbortSignal</a>，用于设置请求的 signal。                                                                                                                |
| **`window`**         | <code>any</code>                                                  | 只能为 null。用于将请求与任何 Window 解除关联。                                                                                                                   |


#### Blob

一个类似文件的对象，包含不可变的原始数据。Blob 表示不一定是 JavaScript 原生格式的数据。<a href="#file">File</a> 接口基于 <a href="#blob">Blob</a>，继承 blob 功能并扩展以支持用户系统上的文件。
`Blob` 类是 `require('node:buffer').Blob` 的全局引用。
https://nodejs.org/api/buffer.html#class-blob

| 属性       | 类型                |
| ---------- | ------------------- |
| **`size`** | <code>number</code> |
| **`type`** | <code>string</code> |

| Method          | Signature                                                                           |
| --------------- | ----------------------------------------------------------------------------------- |
| **arrayBuffer** | () =&gt; Promise&lt;<a href="#arraybuffer">ArrayBuffer</a>&gt;                      |
| **slice**       | (start?: number, end?: number, contentType?: string) =&gt; <a href="#blob">Blob</a> |
| **stream**      | () =&gt; <a href="#readablestream">ReadableStream</a>                               |
| **text**        | () =&gt; Promise&lt;string&gt;                                                      |


#### ArrayBuffer

表示二进制数据的原始缓冲区，用于存储不同类型化数组的数据。ArrayBuffer 不能直接读取或写入，
但可以传递给类型化数组或 DataView 对象以按需解释原始缓冲区。

| 属性             | 类型                | 描述                                                                     |
| ---------------- | ------------------- | ------------------------------------------------------------------------------- |
| **`byteLength`** | <code>number</code> | 只读。<a href="#arraybuffer">ArrayBuffer</a> 的长度（以字节为单位）。 |

| Method    | Signature                                                                  | 描述                                                     |
| --------- | -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **slice** | (begin: number, end?: number) =&gt; <a href="#arraybuffer">ArrayBuffer</a> | 返回 <a href="#arraybuffer">ArrayBuffer</a> 的一个部分。 |


#### ReadableStream

此 Streams API 接口表示可读的字节数据流。Fetch API 通过 Response 对象的 body 属性提供了 <a href="#readablestream">ReadableStream</a> 的具体实例。

| 属性         | 类型                 |
| ------------ | -------------------- |
| **`locked`** | <code>boolean</code> |

| Method          | Signature                                                                                                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **cancel**      | (reason?: any) =&gt; Promise&lt;void&gt;                                                                                                                                                                             |
| **getReader**   | () =&gt; <a href="#readablestreamdefaultreader">ReadableStreamDefaultReader</a>&lt;R&gt;                                                                                                                             |
| **pipeThrough** | &lt;T&gt;(transform: <a href="#readablewritablepair">ReadableWritablePair</a>&lt;T, R&gt;, options?: <a href="#streampipeoptions">StreamPipeOptions</a>) =&gt; <a href="#readablestream">ReadableStream</a>&lt;T&gt; |
| **pipeTo**      | (dest: <a href="#writablestream">WritableStream</a>&lt;R&gt;, options?: <a href="#streampipeoptions">StreamPipeOptions</a>) =&gt; Promise&lt;void&gt;                                                                |
| **tee**         | () =&gt; [ReadableStream&lt;R&gt;, <a href="#readablestream">ReadableStream</a>&lt;R&gt;]                                                                                                                            |


#### ReadableStreamDefaultReader

| Method          | Signature                                                                                                       |
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
| **`writable`** | <code><a href="#writablestream">WritableStream</a>&lt;W&gt;</code> | 提供一种方便、可链式调用的方式来将此可读流通过转换流（或任何其他 { writable, readable } 对）进行管道传输。它简单地将流管道传输到提供的对的写入端，并返回可读端以供进一步使用。管道传输流将在此过程中锁定它，防止任何其他消费者获取读取器。 |


#### WritableStream

此 Streams API 接口提供了将流数据写入目标（称为 sink）的标准抽象。此对象具有内置的反压和排队功能。

| 属性         | 类型                 |
| ------------ | -------------------- |
| **`locked`** | <code>boolean</code> |

| Method        | Signature                                                                                |
| ------------- | ---------------------------------------------------------------------------------------- |
| **abort**     | (reason?: any) =&gt; Promise&lt;void&gt;                                                 |
| **getWriter** | () =&gt; <a href="#writablestreamdefaultwriter">WritableStreamDefaultWriter</a>&lt;W&gt; |


#### WritableStreamDefaultWriter

此 Streams API 接口是由 <a href="#writablestream">WritableStream.getWriter</a>() 返回的对象，一旦创建就会将 writer 锁定到 <a href="#writablestream">WritableStream</a>，确保没有其他流可以写入底层 sink。

| 属性              | 类型                                  |
| ----------------- | ------------------------------------- |
| **`closed`**      | <code>Promise&lt;undefined&gt;</code> |
| **`desiredSize`** | <code>number</code>                   |
| **`ready`**       | <code>Promise&lt;undefined&gt;</code> |

| Method          | Signature                                |
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
| **`preventClose`**  | <code>boolean</code>                                | 将此可读流管道传输到给定的可写流目标。管道过程在各种错误条件下的行为可以通过多个传递选项进行定制。它返回一个 promise，在管道过程成功完成时兑现，或在遇到任何错误时拒绝。管道传输流将在此过程中锁定它，防止任何其他消费者获取读取器。源流目标和目标流的错误和关闭按以下方式传播：此源可读流中的错误将中止目标流，除非 preventAbort 为 truthy。返回的 promise 将以源流的错误或在中止目标流时发生的任何错误被拒绝。目标流中的错误将取消此源可读流，除非 preventCancel 为 truthy。返回的 promise 将以目标流的错误或在取消源流时发生的任何错误被拒绝。当此源可读流关闭时，目标流将被关闭，除非 preventClose 为 truthy。返回的 promise 将在此过程完成时被兑现，除非在关闭目标流时遇到错误，在这种情况下，它将以该错误被拒绝。如果目标流开始关闭或正在关闭，此源可读流将被取消，除非 preventCancel 为 true。返回的 promise 将以指示管道传输到已关闭流失败的错误，或在取消源流时发生的任何错误被拒绝。signal 选项可以设置为 <a href="#abortsignal">AbortSignal</a>，以允许通过相应的 AbortController 中止正在进行的管道操作。在这种情况下，此源可读流将被取消，目标流将被中止，除非设置了相应的 preventCancel 或 preventAbort 选项。 |
| **`signal`**        | <code><a href="#abortsignal">AbortSignal</a></code> |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |


#### AbortSignal

一个信号对象，允许你与 DOM 请求（如 Fetch）通信，并在需要时通过 AbortController 对象中止它。

| 属性          | 类型                                                                                                  | 描述                                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **`aborted`** | <code>boolean</code>                                                                                  | 如果此 <a href="#abortsignal">AbortSignal</a> 的 AbortController 已发出中止信号，则返回 true，否则返回 false。 |
| **`onabort`** | <code>(this: <a href="#abortsignal">AbortSignal</a>, ev: <a href="#event">Event</a>) =&gt; any</code> |                                                                                                                           |

| Method                  | Signature                                                                                                                                                                                                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **addEventListener**    | &lt;K extends "abort"&gt;(type: K, listener: (this: <a href="#abortsignal">AbortSignal</a>, ev: AbortSignalEventMap[K]) =&gt; any, options?: boolean \| <a href="#addeventlisteneroptions">AddEventListenerOptions</a>) =&gt; void | 为 type 属性值为 type 的事件追加一个事件监听器。callback 参数设置在事件被派发时将调用的回调。options 参数设置特定于监听器的选项。为兼容性，这可以是一个布尔值，在这种情况下，该方法的行为与将值指定为 options 的 capture 完全相同。当设置为 true 时，options 的 capture 防止在事件的 eventPhase 属性值为 BUBBLING_PHASE 时调用回调。当为 false（或不存在）时，当事件的 eventPhase 属性值为 CAPTURING_PHASE 时不会调用回调。无论哪种方式，如果事件的 eventPhase 属性值为 AT_TARGET，都会调用回调。当设置为 true 时，options 的 passive 表示回调不会通过调用 preventDefault() 来取消事件。这用于启用 § 2.8 Observing event listeners 中描述的性能优化。当设置为 true 时，options 的 once 表示回调只会被调用一次，之后事件监听器将被移除。事件监听器被追加到目标的事件监听器列表中，如果它具有相同的 type、callback 和 capture，则不会追加。 |
| **addEventListener**    | (type: string, listener: <a href="#eventlisteneroreventlistenerobject">EventListenerOrEventListenerObject</a>, options?: boolean \| <a href="#addeventlisteneroptions">AddEventListenerOptions</a>) =&gt; void                     | 为 type 属性值为 type 的事件追加一个事件监听器。callback 参数设置在事件被派发时将调用的回调。options 参数设置特定于监听器的选项。为兼容性，这可以是一个布尔值，在这种情况下，该方法的行为与将值指定为 options 的 capture 完全相同。当设置为 true 时，options 的 capture 防止在事件的 eventPhase 属性值为 BUBBLING_PHASE 时调用回调。当为 false（或不存在）时，当事件的 eventPhase 属性值为 CAPTURING_PHASE 时不会调用回调。无论哪种方式，如果事件的 eventPhase 属性值为 AT_TARGET，都会调用回调。当设置为 true 时，options 的 passive 表示回调不会通过调用 preventDefault() 来取消事件。这用于启用 § 2.8 Observing event listeners 中描述的性能优化。当设置为 true 时，options 的 once 表示回调只会被调用一次，之后事件监听器将被移除。事件监听器被追加到目标的事件监听器列表中，如果它具有相同的 type、callback 和 capture，则不会追加。 |
| **removeEventListener** | &lt;K extends "abort"&gt;(type: K, listener: (this: <a href="#abortsignal">AbortSignal</a>, ev: AbortSignalEventMap[K]) =&gt; any, options?: boolean \| <a href="#eventlisteneroptions">EventListenerOptions</a>) =&gt; void       | 移除目标事件监听器列表中具有相同 type、callback 和 options 的事件监听器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **removeEventListener** | (type: string, listener: <a href="#eventlisteneroreventlistenerobject">EventListenerOrEventListenerObject</a>, options?: boolean \| <a href="#eventlisteneroptions">EventListenerOptions</a>) =&gt; void                           | 移除目标事件监听器列表中具有相同 type、callback 和 options 的事件监听器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |


#### AbortSignalEventMap

| 属性          | 类型                                    |
| ------------- | --------------------------------------- |
| **`"abort"`** | <code><a href="#event">Event</a></code> |


#### Event

在 DOM 中发生的事件。

| 属性                   | 类型                                                | 描述                                                                                                                                                                                                                                                |
| ---------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`bubbles`**          | <code>boolean</code>                                | 根据事件的初始化方式返回 true 或 false。如果事件以反向树顺序经过其目标的祖先，则为 true，否则为 false。                                                                                                |
| **`cancelBubble`**     | <code>boolean</code>                                |                                                                                                                                                                                                                                                            |
| **`cancelable`**       | <code>boolean</code>                                | 根据事件的初始化方式返回 true 或 false。其返回值并不总是有意义，但 true 可以指示可以通过调用 preventDefault() 方法来取消事件派发期间的部分操作。 |
| **`composed`**         | <code>boolean</code>                                | 根据事件的初始化方式返回 true 或 false。如果事件调用经过作为其目标根的 ShadowRoot 节点之外的监听器，则为 true，否则为 false。                                                                                  |
| **`currentTarget`**    | <code><a href="#eventtarget">EventTarget</a></code> | 返回当前正在调用其事件监听器回调的对象。                                                                                                                                                                             |
| **`defaultPrevented`** | <code>boolean</code>                                | 如果成功调用 preventDefault() 以指示取消，则返回 true，否则返回 false。                                                                                                                                                    |
| **`eventPhase`**       | <code>number</code>                                 | 返回事件的阶段，可以是 NONE、CAPTURING_PHASE、AT_TARGET 和 BUBBLING_PHASE 之一。                                                                                                                                                           |
| **`isTrusted`**        | <code>boolean</code>                                | 如果事件由用户代理派发，则返回 true，否则返回 false。                                                                                                                                                                               |
| **`returnValue`**      | <code>boolean</code>                                |                                                                                                                                                                                                                                                            |
| **`srcElement`**       | <code><a href="#eventtarget">EventTarget</a></code> |                                                                                                                                                                                                                                                            |
| **`target`**           | <code><a href="#eventtarget">EventTarget</a></code> | 返回事件被派发到的对象（其目标）。                                                                                                                                                                                              |
| **`timeStamp`**        | <code>number</code>                                 | 返回事件的时间戳，以相对于时间原点测量的毫秒数为单位。                                                                                                                                                          |
| **`type`**             | <code>string</code>                                 | 返回事件的类型，例如 "click"、"hashchange" 或 "submit"。                                                                                                                                                                                        |
| **`AT_TARGET`**        | <code>number</code>                                 |                                                                                                                                                                                                                                                            |
| **`BUBBLING_PHASE`**   | <code>number</code>                                 |                                                                                                                                                                                                                                                            |
| **`CAPTURING_PHASE`**  | <code>number</code>                                 |                                                                                                                                                                                                                                                            |
| **`NONE`**             | <code>number</code>                                 |                                                                                                                                                                                                                                                            |

| Method                       | Signature                                                          | 描述                                                                                                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **composedPath**             | () =&gt; EventTarget[]                                             | 返回事件路径上的调用目标对象（将调用其监听器的对象），但不包括影子根模式为 "closed" 且无法从事件的 currentTarget 到达的影子树中的任何节点。 |
| **initEvent**                | (type: string, bubbles?: boolean, cancelable?: boolean) =&gt; void |                                                                                                                                                                                                                                         |
| **preventDefault**           | () =&gt; void                                                      | 如果在 cancelable 属性值为 true 且为 passive 设置为 false 的事件执行监听器时调用，则向导致事件被派发的操作发出信号，表示需要取消它。               |
| **stopImmediatePropagation** | () =&gt; void                                                      | 调用此方法可防止事件在当前监听器完成运行后到达任何已注册的事件监听器，并且在树中派发时，还可防止事件到达任何其他对象。                            |
| **stopPropagation**          | () =&gt; void                                                      | 在树中派发时，调用此方法可防止事件到达除当前对象之外的任何其他对象。                                                                                                                 |


#### EventTarget

<a href="#eventtarget">EventTarget</a> 是一个 DOM 接口，由可以接收事件并可能有其监听器的对象实现。
EventTarget 是一个 DOM 接口，由可以接收事件并可能有其监听器的对象实现。

| Method                  | Signature                                                                                                                                                                                                              | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **addEventListener**    | (type: string, listener: <a href="#eventlisteneroreventlistenerobject">EventListenerOrEventListenerObject</a> \| null, options?: boolean \| <a href="#addeventlisteneroptions">AddEventListenerOptions</a>) =&gt; void | 为 type 属性值为 type 的事件追加一个事件监听器。callback 参数设置在事件被派发时将调用的回调。options 参数设置特定于监听器的选项。为兼容性，这可以是一个布尔值，在这种情况下，该方法的行为与将值指定为 options 的 capture 完全相同。当设置为 true 时，options 的 capture 防止在事件的 eventPhase 属性值为 BUBBLING_PHASE 时调用回调。当为 false（或不存在）时，当事件的 eventPhase 属性值为 CAPTURING_PHASE 时不会调用回调。无论哪种方式，如果事件的 eventPhase 属性值为 AT_TARGET，都会调用回调。当设置为 true 时，options 的 passive 表示回调不会通过调用 preventDefault() 来取消事件。这用于启用 § 2.8 Observing event listeners 中描述的性能优化。当设置为 true 时，options 的 once 表示回调只会被调用一次，之后事件监听器将被移除。事件监听器被追加到目标的事件监听器列表中，如果它具有相同的 type、callback 和 capture，则不会追加。 |
| **dispatchEvent**       | (event: <a href="#event">Event</a>) =&gt; boolean                                                                                                                                                                      | 向目标派发一个合成事件 event，如果事件的 cancelable 属性值为 false 或未调用其 preventDefault() 方法，则返回 true，否则返回 false。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **removeEventListener** | (type: string, callback: <a href="#eventlisteneroreventlistenerobject">EventListenerOrEventListenerObject</a> \| null, options?: <a href="#eventlisteneroptions">EventListenerOptions</a> \| boolean) =&gt; void       | 移除目标事件监听器列表中具有相同 type、callback 和 options 的事件监听器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |


#### EventListener


#### EventListenerObject

| Method          | Signature                                    |
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
| **`byteLength`** | <code>number</code>                                         | 数组的长度（以字节为单位）。                                            |
| **`byteOffset`** | <code>number</code>                                         | 数组的字节偏移量。                                            |


#### ArrayBufferTypes

<a href="#arraybufferview">ArrayBufferView</a> 和相关类型化数组的缓冲区允许的 <a href="#arraybuffer">ArrayBuffer</a> 类型。

| 属性              | 类型                                                |
| ----------------- | --------------------------------------------------- |
| **`ArrayBuffer`** | <code><a href="#arraybuffer">ArrayBuffer</a></code> |


#### FormData

提供了一种轻松构建表示表单字段及其值的键/值对集合的方法，然后可以使用 XMLHttpRequest.send() 方法轻松发送。它使用与表单在编码类型设置为 "multipart/form-data" 时相同的格式。

| Method      | Signature                                                                                                                                                               |
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

<a href="#urlsearchparams">`URLSearchParams`</a> 类是 `require('url').URLSearchParams` 的全局引用。
https://nodejs.org/api/url.html#class-urlsearchparams

| Method       | Signature                                                                                                                               | 描述                                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **append**   | (name: string, value: string) =&gt; void                                                                                                | 将指定的键/值对作为新的搜索参数追加。                                                              |
| **delete**   | (name: string) =&gt; void                                                                                                               | 从所有搜索参数列表中删除给定的搜索参数及其关联值。                      |
| **get**      | (name: string) =&gt; string \| null                                                                                                     | 返回与给定搜索参数关联的第一个值。                                                          |
| **getAll**   | (name: string) =&gt; string[]                                                                                                           | 返回与给定搜索参数关联的所有值。                                                          |
| **has**      | (name: string) =&gt; boolean                                                                                                            | 返回一个布尔值，指示此类搜索参数是否存在。                                                            |
| **set**      | (name: string, value: string) =&gt; void                                                                                                | 将与给定搜索参数关联的值设置为给定值。如果之前有多个值，则删除其他值。 |
| **sort**     | () =&gt; void                                                                                                                           |                                                                                                                            |
| **toString** | () =&gt; string                                                                                                                         | 返回一个字符串，包含适合在 URL 中使用的查询字符串。不包括问号。                  |
| **forEach**  | (callbackfn: (value: string, key: string, parent: <a href="#urlsearchparams">URLSearchParams</a>) =&gt; void, thisArg?: any) =&gt; void |                                                                                                                            |


#### Uint8Array

8 位无符号整数值的类型化数组。内容被初始化为 0。如果
无法分配请求的字节数，则会引发异常。

| 属性                    | 类型                                                        | 描述                                                                  |
| ----------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **`BYTES_PER_ELEMENT`** | <code>number</code>                                         | 数组中每个元素的大小（以字节为单位）。                              |
| **`buffer`**            | <code><a href="#arraybufferlike">ArrayBufferLike</a></code> | 数组引用的 <a href="#arraybuffer">ArrayBuffer</a> 实例。 |
| **`byteLength`**        | <code>number</code>                                         | 数组的长度（以字节为单位）。                                            |
| **`byteOffset`**        | <code>number</code>                                         | 数组的字节偏移量。                                            |
| **`length`**            | <code>number</code>                                         | 数组的长度。                                                     |

| Method             | Signature                                                                                                                                                                      | 描述                                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **copyWithin**     | (target: number, start: number, end?: number) =&gt; this                                                                                                                       | 将由 start 和 end 标识的数组部分复制到同一数组中从位置 target 开始的位置后返回此对象                                                                                                      |
| **every**          | (predicate: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; unknown, thisArg?: any) =&gt; boolean                                            | 确定数组的所有成员是否满足指定的测试。                                                                                                                                                                  |
| **fill**           | (value: number, start?: number, end?: number) =&gt; this                                                                                                                       | 用 value 填充由 start 和 end 标识的段后返回此对象                                                                                                                                                    |
| **filter**         | (predicate: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; any, thisArg?: any) =&gt; <a href="#uint8array">Uint8Array</a>                   | 返回数组中满足回调函数中指定条件的元素。                                                                                                                                                  |
| **find**           | (predicate: (value: number, index: number, obj: <a href="#uint8array">Uint8Array</a>) =&gt; boolean, thisArg?: any) =&gt; number \| undefined                                  | 返回数组中第一个满足 predicate 条件的元素的值，如果未找到则返回 undefined。                                                                                                                                       |
| **findIndex**      | (predicate: (value: number, index: number, obj: <a href="#uint8array">Uint8Array</a>) =&gt; boolean, thisArg?: any) =&gt; number                                               | 返回数组中第一个满足 predicate 条件的元素的索引，否则返回 -1。                                                                                                                                              |
| **forEach**        | (callbackfn: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; void, thisArg?: any) =&gt; void                                                 | 对数组中的每个元素执行指定的操作。                                                                                                                                                                                 |
| **indexOf**        | (searchElement: number, fromIndex?: number) =&gt; number                                                                                                                       | 返回数组中值的第一个匹配项的索引。                                                                                                                                                                           |
| **join**           | (separator?: string) =&gt; string                                                                                                                                              | 将数组的所有元素用指定的分隔符字符串连接起来。                                                                                                                                                              |
| **lastIndexOf**    | (searchElement: number, fromIndex?: number) =&gt; number                                                                                                                       | 返回数组中值的最后一个匹配项的索引。                                                                                                                                                                            |
| **map**            | (callbackfn: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number, thisArg?: any) =&gt; <a href="#uint8array">Uint8Array</a>               | 对数组中的每个元素调用定义的回调函数，并返回包含结果的新数组。                                                                                                                              |
| **reduce**         | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number) =&gt; number                       | 对数组中的所有元素调用指定的回调函数。回调函数的返回值是累计结果，并在下一次调用回调函数时作为参数提供。                      |
| **reduce**         | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number, initialValue: number) =&gt; number |                                                                                                                                                                                                                                             |
| **reduce**         | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; U, initialValue: U) =&gt; U            | 对数组中的所有元素调用指定的回调函数。回调函数的返回值是累计结果，并在下一次调用回调函数时作为参数提供。                      |
| **reduceRight**    | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number) =&gt; number                       | 以降序对数组中的所有元素调用指定的回调函数。回调函数的返回值是累计结果，并在下一次调用回调函数时作为参数提供。 |
| **reduceRight**    | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number, initialValue: number) =&gt; number |                                                                                                                                                                                                                                             |
| **reduceRight**    | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; U, initialValue: U) =&gt; U            | 以降序对数组中的所有元素调用指定的回调函数。回调函数的返回值是累计结果，并在下一次调用回调函数时作为参数提供。 |
| **reverse**        | () =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                                                  | 反转数组中的元素。                                                                                                                                                                                                          |
| **set**            | (array: <a href="#arraylike">ArrayLike</a>&lt;number&gt;, offset?: number) =&gt; void                                                                                          | 设置值或值数组。                                                                                                                                                                                                         |
| **slice**          | (start?: number, end?: number) =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                      | 返回数组的一个段。                                                                                                                                                                                                              |
| **some**           | (predicate: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; unknown, thisArg?: any) =&gt; boolean                                            | 确定指定的回调函数是否对数组的任何元素返回 true。                                                                                                                                                |
| **sort**           | (compareFn?: (a: number, b: number) =&gt; number) =&gt; this                                                                                                                   | 对数组进行排序。                                                                                                                                                                                                                             |
| **subarray**       | (begin?: number, end?: number) =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                      | 获取此数组的 <a href="#arraybuffer">ArrayBuffer</a> 存储的新 <a href="#uint8array">Uint8Array</a> 视图，引用从 begin（包括）到 end（不包括）的元素。                                                |
| **toLocaleString** | () =&gt; string                                                                                                                                                                | 通过使用当前区域设置将数字转换为字符串。                                                                                                                                                                                  |
| **toString**       | () =&gt; string                                                                                                                                                                | 返回数组的字符串表示形式。                                                                                                                                                                                                |
| **valueOf**        | () =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                                                  | 返回指定对象的原始值。                                                                                                                                                                                        |


#### ArrayLike

| 属性         | 类型                |
| ------------ | ------------------- |
| **`length`** | <code>number</code> |


#### Headers

此 Fetch API 接口允许你对 HTTP 请求和响应头执行各种操作。这些操作包括检索、设置、添加和删除。<a href="#headers">Headers</a> 对象有一个关联的 header 列表，初始为空，并由零个或多个名称和值对组成。你可以使用 append() 等方法添加到此列表（参见示例）。在此接口的所有方法中，header 名称按不区分大小写的字节序列进行匹配。

| Method      | Signature                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| **append**  | (name: string, value: string) =&gt; void                                                                                |
| **delete**  | (name: string) =&gt; void                                                                                               |
| **get**     | (name: string) =&gt; string \| null                                                                                     |
| **has**     | (name: string) =&gt; boolean                                                                                            |
| **set**     | (name: string, value: string) =&gt; void                                                                                |
| **forEach** | (callbackfn: (value: string, key: string, parent: <a href="#headers">Headers</a>) =&gt; void, thisArg?: any) =&gt; void |


### 类型别名


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

构造一个具有类型 T 的一组属性 K 的类型。

<code>{ [P in K]: T; }</code>


#### RequestMode

<code>"cors" | "navigate" | "no-cors" | "same-origin"</code>


#### RequestRedirect

<code>"error" | "follow" | "manual"</code>


#### ReferrerPolicy

<code>"" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"</code>


#### HttpResponseType

在将 Http 响应返回给客户端之前如何解析它。

<code>'arraybuffer' | 'blob' | 'json' | 'text' | 'document'</code>

</docgen-api>
