---
title: Http Capacitor Plugin API
description: Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 以使用原生库，提供原生 HTTP 支持。
custom_edit_url: https://github.com/ionic-team/capacitor/blob/7.x/core/http.md
editApiUrl: https://github.com/ionic-team/capacitor/blob/7.x/core/src/core-plugins.ts
sidebar_label: Http
---

# CapacitorHttp

Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 以使用原生库，提供原生 HTTP 支持。它还提供了在不使用 `fetch` 和 `XMLHttpRequest` 的情况下进行原生 HTTP 请求的辅助方法。该插件已捆绑在 `@capacitor/core` 中。

## 配置

默认情况下，修补 `window.fetch` 和 `XMLHttpRequest` 以使用原生库的功能是禁用的。
如果你想启用此功能，请在 `capacitor.config` 文件中修改以下配置。

| 属性            | 类型                    | 描述                                                                          | 默认值               |
| --------------- | ----------------------- | ----------------------------------------------------------------------------- | -------------------- |
| **`enabled`**   | <code>boolean</code>    | 启用修补 `fetch` 和 `XMLHttpRequest` 以使用原生库。                           | <code>false</code>   |

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

// POST 请求示例。注意：数据可以作为原始的 JS 对象传递（必须是可 JSON 序列化的）
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

由于桥接的本质，从原生层解析和传输大量数据到 Web 层可能会导致问题。计划在不久的将来将下载和上传文件到原生设备的功能添加到 `@capacitor/filesystem` 插件中。在此期间，一种可能规避内存耗尽问题（特别是在 Android 上）的方法是编辑 `AndroidManifest.xml` 并在 `application` 元素中添加 `android:largeHeap="true"`。大多数应用不需要这样做，而应专注于减少整体内存使用以提高性能。启用此功能也不能保证可用内存有固定的增加，因为某些设备受其总可用内存的限制。

## API

<docgen-index>

* [`request(...)`](#request)
* [`get(...)`](#get)
* [`post(...)`](#post)
* [`put(...)`](#put)
* [`patch(...)`](#patch)
* [`delete(...)`](#delete)
* [接口](#接口)
* [类型别名](#类型别名)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

****** HTTP 插件 *******

### request(...)

```typescript
request(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 HTTP 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### get(...)

```typescript
get(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 HTTP GET 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### post(...)

```typescript
post(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 HTTP POST 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### put(...)

```typescript
put(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 HTTP PUT 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### patch(...)

```typescript
patch(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 HTTP PATCH 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### delete(...)

```typescript
delete(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 HTTP DELETE 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### 接口


#### HttpResponse

| 属性            | 类型                                                | 描述                                       |
| --------------- | --------------------------------------------------- | ----------------------------------------- |
| **`data`**      | <code>any</code>                                    | 随 HTTP 响应接收到的额外数据。             |
| **`status`**    | <code>number</code>                                 | 从 HTTP 响应接收到的状态码。               |
| **`headers`**   | <code><a href="#httpheaders">HttpHeaders</a></code> | 从 HTTP 响应接收到的头部信息。             |
| **`url`**       | <code>string</code>                                 | 从 HTTP 响应接收到的响应 URL。             |


#### HttpHeaders

#### HttpOptions

| 属性                      | 类型                                                          | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`url`**                 | <code>string</code>                                           | 要发送请求的 URL。                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`method`**              | <code>string</code>                                           | 要使用的 HTTP 请求方法。（默认为 GET）                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **`params`**              | <code><a href="#httpparams">HttpParams</a></code>             | 要附加到请求的 URL 参数。                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **`data`**                | <code>any</code>                                              | 注意：在 Android 和 iOS 上，`data` 只能是字符串或 JSON。`FormData`、<a href="#blob">Blob</a>、<a href="#arraybuffer">ArrayBuffer</a> 以及其他复杂类型仅在 Web 端直接支持，或者通过配置启用 `CapacitorHttp` 并使用修补后的 `window.fetch` 或 `XMLHttpRequest` 支持。如果需要发送复杂类型，应将数据序列化为 base64，并相应设置 `headers["Content-Type"]` 和 `dataType` 属性。                                                                                                |
| **`headers`**             | <code><a href="#httpheaders">HttpHeaders</a></code>           | 随请求发送的 HTTP 请求头。                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **`readTimeout`**         | <code>number</code>                                           | 等待读取额外数据的时长（以毫秒计）。每次接收到新数据时重置。                                                                                                                                                                                                                                                                                                                                                                                                               |
| **`connectTimeout`**      | <code>number</code>                                           | 等待初始连接的时长（以毫秒计）。                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **`disableRedirects`**    | <code>boolean</code>                                          | 设置是否应禁用自动 HTTP 重定向。                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **`webFetchExtra`**       | <code><a href="#requestinit">RequestInit</a></code>           | 在 Web 端运行时为 `fetch` 提供的额外参数。                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **`responseType`**        | <code><a href="#httpresponsetype">HttpResponseType</a></code> | 用于在将响应返回给请求者之前对其进行适当解析。如果响应内容类型是 "json"，则忽略此值。                                                                                                                                                                                                                                                                                                                                                                                       |
| **`shouldEncodeUrlParams`** | <code>boolean</code>                                          | 如果需要在某些情况下（例如 URL 已编码、Azure/Firebase 测试等）保持 URL 不编码，请使用此选项。默认值为 _true_。                                                                                                                                                                                                                                                                                                                                                               || **`dataType`**              | <code>'file' \| 'formData'</code>                             | 当我们需要将数据从JS类型转换为原生层需要特殊处理的类型时，会使用此参数                                                                                                                                                                                                                                                                                                                                                                                               |

#### HttpParams


#### RequestInit

| 属性                 | 类型                                                              | 描述                                                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`body`**           | <code><a href="#bodyinit">BodyInit</a></code>                     | 一个 <a href="#bodyinit">BodyInit</a> 对象或 null，用于设置请求体。                                                                                                          |
| **`cache`**          | <code><a href="#requestcache">RequestCache</a></code>             | 一个字符串，指示请求将如何与浏览器缓存交互，用于设置请求的缓存模式。                                                                                |
| **`credentials`**    | <code><a href="#requestcredentials">RequestCredentials</a></code> | 一个字符串，指示是否以及何时发送凭据（始终发送、从不发送，或仅在同源 URL 时发送）。设置请求的凭据模式。                          |
| **`headers`**        | <code><a href="#headersinit">HeadersInit</a></code>               | 一个 <a href="#headers">Headers</a> 对象、对象字面量或由二元数组组成的数组，用于设置请求头。                                                              |
| **`integrity`**      | <code>string</code>                                               | 要请求资源的加密哈希值，用于设置请求的完整性属性。                                                                                          |
| **`keepalive`**      | <code>boolean</code>                                              | 一个布尔值，设置请求的 keepalive 属性。                                                                                                                                             |
| **`method`**         | <code>string</code>                                               | 一个字符串，设置请求的方法。                                                                                                                                                 |
| **`mode`**           | <code><a href="#requestmode">RequestMode</a></code>               | 一个字符串，指示请求是否使用 CORS，或是否仅限于同源 URL。设置请求的模式。                                                           |
| **`redirect`**       | <code><a href="#requestredirect">RequestRedirect</a></code>       | 一个字符串，指示请求如何处理重定向（跟随重定向、在遇到重定向时报错，或以不透明方式返回重定向）。设置请求的重定向模式。 |
| **`referrer`**       | <code>string</code>                                               | 一个字符串，其值为同源 URL、"about:client" 或空字符串，用于设置请求的引用来源。                                                                        |
| **`referrerPolicy`** | <code><a href="#referrerpolicy">ReferrerPolicy</a></code>         | 一个引用来源策略，用于设置请求的 referrerPolicy。                                                                                                                                |
| **`signal`**         | <code><a href="#abortsignal">AbortSignal</a></code>               | 一个 <a href="#abortsignal">AbortSignal</a> 对象，用于设置请求的信号。                                                                                                                |
| **`window`**         | <code>any</code>                                                  | 只能为 null。用于将请求与任何 Window 对象解除关联。                                                                                                                   |


#### Blob

一个表示不可变原始数据的类文件对象。Blob 表示的数据不一定是 JavaScript 原生格式。<a href="#file">File</a> 接口基于 <a href="#blob">Blob</a>，继承了 Blob 的功能并扩展以支持用户系统上的文件。
`Blob` 类是 `require('node:buffer').Blob` 的全局引用
https://nodejs.org/api/buffer.html#class-blob

| 属性       | 类型                |
| ---------- | ------------------- |
| **`size`** | <code>number</code> |
| **`type`** | <code>string</code> |

| 方法          | 签名                                                                           |
| --------------- | ----------------------------------------------------------------------------------- |
| **arrayBuffer** | () => Promise&lt;<a href="#arraybuffer">ArrayBuffer</a>&gt;                      |
| **slice**       | (start?: number, end?: number, contentType?: string) => <a href="#blob">Blob</a> |
| **stream**      | () => <a href="#readablestream">ReadableStream</a>                               |
| **text**        | () => Promise&lt;string&gt;                                                      |


#### ArrayBuffer

表示一个原始的二进制数据缓冲区，用于存储不同类型化数组的数据。ArrayBuffer 不能直接读写，但可以传递给类型化数组或 DataView 对象，以便按需解释原始缓冲区。

| 属性             | 类型                | 描述                                                                     |
| ---------------- | ------------------- | ------------------------------------------------------------------------------- |
| **`byteLength`** | <code>number</code> | 只读属性。<a href="#arraybuffer">ArrayBuffer</a> 的长度（以字节为单位）。 |

| 方法    | 签名                                                                  | 描述                                                     |
| --------- | -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **slice** | (begin: number, end?: number) => <a href="#arraybuffer">ArrayBuffer</a> | 返回 <a href="#arraybuffer">ArrayBuffer</a> 的一个切片。 |

#### ReadableStream（可读流） {#readablestream}

此 Streams API 接口表示一个字节数据的可读流。Fetch API 通过 Response 对象的 body 属性提供了 <a href="#readablestream">ReadableStream</a> 的具体实例。

| 属性            | 类型                     |
| --------------- | ------------------------ |
| **`locked`**    | <code>boolean</code>     |

| 方法              | 签名                                                                                                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **cancel**        | (reason?: any) =&gt; Promise&lt;void&gt;                                                                                                                                                                             |
| **getReader**     | () =&gt; <a href="#readablestreamdefaultreader">ReadableStreamDefaultReader</a>&lt;R&gt;                                                                                                                             |
| **pipeThrough**   | &lt;T&gt;(transform: <a href="#readablewritablepair">ReadableWritablePair</a>&lt;T, R&gt;, options?: <a href="#streampipeoptions">StreamPipeOptions</a>) =&gt; <a href="#readablestream">ReadableStream</a>&lt;T&gt; |
| **pipeTo**        | (dest: <a href="#writablestream">WritableStream</a>&lt;R&gt;, options?: <a href="#streampipeoptions">StreamPipeOptions</a>) =&gt; Promise&lt;void&gt;                                                                |
| **tee**           | () =&gt; [ReadableStream&lt;R&gt;, <a href="#readablestream">ReadableStream</a>&lt;R&gt;]                                                                                                                            |


#### ReadableStreamDefaultReader（可读流默认读取器） {#readablestreamdefaultreader}

| 方法              | 签名                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| **read**          | () =&gt; Promise&lt;<a href="#readablestreamdefaultreadresult">ReadableStreamDefaultReadResult</a>&lt;R&gt;&gt; |
| **releaseLock**   | () =&gt; void                                                                                                   |


#### ReadableStreamDefaultReadValueResult（可读流默认读取值结果） {#readablestreamdefaultreadvalueresult}

| 属性            | 类型                     |
| --------------- | ------------------------ |
| **`done`**      | <code>false</code>       |
| **`value`**     | <code>T</code>           |


#### ReadableStreamDefaultReadDoneResult（可读流默认读取完成结果） {#readablestreamdefaultreaddoneresult}

| 属性            | 类型                     |
| --------------- | ------------------------ |
| **`done`**      | <code>true</code>        |
| **`value`**     |                          |


#### ReadableWritablePair（可读可写对） {#readablewritablepair}

| 属性              | 类型                                                               | 描述                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`readable`**    | <code><a href="#readablestream">ReadableStream</a>&lt;R&gt;</code> |                                                                                                                                                                                                                                                                                                                                                                                     |
| **`writable`**    | <code><a href="#writablestream">WritableStream</a>&lt;W&gt;</code> | 提供了一种便捷、可链式调用的方式，将此可读流通过转换流（或任何其他 { 可写, 可读 } 对）进行管道传输。它简单地将流管道传输到所提供对的可写端，并返回可读端以供进一步使用。管道传输流将在传输期间锁定该流，防止任何其他消费者获取读取器。 |


#### WritableStream（可写流） {#writablestream}

此 Streams API 接口为将流数据写入目标（称为接收器）提供了一个标准抽象。该对象内置了背压和队列机制。

| 属性            | 类型                     |
| --------------- | ------------------------ |
| **`locked`**    | <code>boolean</code>     |

| 方法            | 签名                                                                                |
| --------------- | ---------------------------------------------------------------------------------------- |
| **abort**       | (reason?: any) =&gt; Promise&lt;void&gt;                                                 |
| **getWriter**   | () =&gt; <a href="#writablestreamdefaultwriter">WritableStreamDefaultWriter</a>&lt;W&gt; |


#### WritableStreamDefaultWriter（可写流默认写入器） {#writablestreamdefaultwriter}

此 Streams API 接口是由 <a href="#writablestream">WritableStream.getWriter</a>() 返回的对象，一旦创建，它会将写入器锁定到 <a href="#writablestream">WritableStream</a>，确保没有其他流可以写入底层接收器。

| 属性                | 类型                                  |
| ------------------- | ------------------------------------- |
| **`closed`**        | <code>Promise&lt;undefined&gt;</code> |
| **`desiredSize`**   | <code>number</code>                   |
| **`ready`**         | <code>Promise&lt;undefined&gt;</code> |

| 方法              | 签名                                |
| ----------------- | ---------------------------------------- |
| **abort**         | (reason?: any) =&gt; Promise&lt;void&gt; |
| **close**         | () =&gt; Promise&lt;void&gt;             |
| **releaseLock**   | () =&gt; void                            |
| **write**         | (chunk: W) =&gt; Promise&lt;void&gt;     |

#### StreamPipeOptions

| 属性                | 类型                                                | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`preventAbort`**  | <code>boolean</code>                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    || **`preventCancel`** | <code>boolean</code>                                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **`preventClose`**  | <code>boolean</code>                                | 将此可读流通过管道传输到指定的可写流目标。管道传输过程在各种错误情况下的行为，可以通过传入的多个选项进行自定义。该方法返回一个 Promise，当管道传输成功完成时兑现，如果遇到任何错误则拒绝。流在管道传输期间会被锁定，阻止其他消费者获取读取器。源流和目标流的错误及关闭情况传播规则如下：此源可读流中的错误会中断目标流，除非 preventAbort 为真值。返回的 Promise 将因源错误或中断目标流过程中发生的任何错误而被拒绝。目标流中的错误会取消此源可读流，除非 preventCancel 为真值。返回的 Promise 将因目标错误或取消源流过程中发生的任何错误而被拒绝。当此源可读流关闭时，目标流也会被关闭，除非 preventClose 为真值。返回的 Promise 将在此过程完成后兑现，除非在关闭目标流时遇到错误，此时将因该错误而被拒绝。如果目标流初始时就处于关闭或正在关闭状态，此源可读流将被取消，除非 preventCancel 为 true。返回的 Promise 将因"管道传输到已关闭流失败"的错误或取消源流过程中发生的任何错误而被拒绝。signal 选项可设置为 <a href="#abortsignal">AbortSignal</a>，以允许通过相应的 AbortController 中止正在进行的管道操作。在这种情况下，此源可读流将被取消，目标流将被中断，除非设置了相应的 preventCancel 或 preventAbort 选项。 |
| **`signal`**        | <code><a href="#abortsignal">AbortSignal</a></code> |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

#### AbortSignal

一个信号对象，允许你与 DOM 请求（例如 Fetch）进行通信，并在需要时通过 AbortController 对象中止该请求。

| 属性          | 类型                                                                                                  | 描述                                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **`aborted`** | <code>boolean</code>                                                                                  | 如果此 <a href="#abortsignal">AbortSignal</a> 的 AbortController 已发出中止信号，则返回 true，否则返回 false。 |
| **`onabort`** | <code>(this: <a href="#abortsignal">AbortSignal</a>, ev: <a href="#event">Event</a>) =&gt; any</code> |                                                                                                                           || 方法                  | 签名                                                                                                                                                                                                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **addEventListener**    | &lt;K extends "abort"&gt;(type: K, listener: (this: <a href="#abortsignal">AbortSignal</a>, ev: AbortSignalEventMap[K]) =&gt; any, options?: boolean \| <a href="#addeventlisteneroptions">AddEventListenerOptions</a>) =&gt; void | 为事件类型属性值为 `type` 的事件添加一个事件监听器。`callback` 参数设置当事件被派发时将被调用的回调函数。`options` 参数设置监听器特定的选项。为了兼容性，此参数可以是一个布尔值，此时该方法的行为完全等同于将值指定为 `options` 的 `capture` 属性。当设置为 `true` 时，`options` 的 `capture` 属性会阻止 `callback` 在事件的 `eventPhase` 属性值为 `BUBBLING_PHASE` 时被调用。当为 `false`（或未提供）时，`callback` 在事件的 `eventPhase` 属性值为 `CAPTURING_PHASE` 时不会被调用。无论哪种情况，如果事件的 `eventPhase` 属性值为 `AT_TARGET`，`callback` 都将被调用。当设置为 `true` 时，`options` 的 `passive` 属性表示回调函数不会通过调用 `preventDefault()` 来取消事件。这用于启用 § 2.8 观察事件监听器中描述的性能优化。当设置为 `true` 时，`options` 的 `once` 属性表示回调函数只会被调用一次，之后事件监听器将被移除。该事件监听器会被添加到目标的监听器列表中，但如果已存在具有相同 `type`、`callback` 和 `capture` 的监听器，则不会重复添加。 |
| **addEventListener**    | (type: string, listener: <a href="#eventlisteneroreventlistenerobject">EventListenerOrEventListenerObject</a>, options?: boolean \| <a href="#addeventlisteneroptions">AddEventListenerOptions</a>) =&gt; void                     | 为事件类型属性值为 `type` 的事件添加一个事件监听器。`callback` 参数设置当事件被派发时将被调用的回调函数。`options` 参数设置监听器特定的选项。为了兼容性，此参数可以是一个布尔值，此时该方法的行为完全等同于将值指定为 `options` 的 `capture` 属性。当设置为 `true` 时，`options` 的 `capture` 属性会阻止 `callback` 在事件的 `eventPhase` 属性值为 `BUBBLING_PHASE` 时被调用。当为 `false`（或未提供）时，`callback` 在事件的 `eventPhase` 属性值为 `CAPTURING_PHASE` 时不会被调用。无论哪种情况，如果事件的 `eventPhase` 属性值为 `AT_TARGET`，`callback` 都将被调用。当设置为 `true` 时，`options` 的 `passive` 属性表示回调函数不会通过调用 `preventDefault()` 来取消事件。这用于启用 § 2.8 观察事件监听器中描述的性能优化。当设置为 `true` 时，`options` 的 `once` 属性表示回调函数只会被调用一次，之后事件监听器将被移除。该事件监听器会被添加到目标的监听器列表中，但如果已存在具有相同 `type`、`callback` 和 `capture` 的监听器，则不会重复添加。 |
| **removeEventListener** | &lt;K extends "abort"&gt;(type: K, listener: (this: <a href="#abortsignal">AbortSignal</a>, ev: AbortSignalEventMap[K]) =&gt; any, options?: boolean \| <a href="#eventlisteneroptions">EventListenerOptions</a>) =&gt; void       | 从目标的事件监听器列表中移除具有相同 `type`、`callback` 和 `options` 的事件监听器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  || **removeEventListener** | (type: string, listener: <a href="#eventlisteneroreventlistenerobject">EventListenerOrEventListenerObject</a>, options?: boolean \| <a href="#eventlisteneroptions">EventListenerOptions</a>) => void                           | 从目标对象的事件监听器列表中移除具有相同类型、回调函数和选项的事件监听器。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

#### AbortSignalEventMap {#event}

| 属性          | 类型                                    |
| ------------- | --------------------------------------- |
| **`"abort"`** | <code><a href="#event">Event</a></code> |

#### 事件

发生在 DOM 中的事件。

| 属性                   | 类型                                                   | 描述                                                                                                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`bubbles`**          | <code>boolean</code>                                   | 根据事件的初始化方式返回 true 或 false。如果事件会沿着其目标的祖先节点进行反向树序传播则为 true，否则为 false。                                                                                                                                           |
| **`cancelBubble`**     | <code>boolean</code>                                   |                                                                                                                                                                                                                                                            |
| **`cancelable`**       | <code>boolean</code>                                   | 根据事件的初始化方式返回 true 或 false。其返回值并不总是具有实际意义，但 true 可以表示在事件派发过程中，可以通过调用 preventDefault() 方法来取消部分操作。                                                                                                 |
| **`composed`**         | <code>boolean</code>                                   | 根据事件的初始化方式返回 true 或 false。如果事件会触发其目标所在 ShadowRoot 节点之外的监听器则为 true，否则为 false。                                                                                                                                      |
| **`currentTarget`**    | <code><a href="#eventtarget">EventTarget</a></code>    | 返回当前正在调用其事件监听器回调的对象。                                                                                                                                                                                                                   |
| **`defaultPrevented`** | <code>boolean</code>                                   | 如果 preventDefault() 方法已成功调用以表示取消操作，则返回 true，否则返回 false。                                                                                                                                                                          |
| **`eventPhase`**       | <code>number</code>                                    | 返回事件当前所处的阶段，取值为 NONE、CAPTURING_PHASE、AT_TARGET 和 BUBBLING_PHASE 之一。                                                                                                                                                                   |
| **`isTrusted`**        | <code>boolean</code>                                   | 如果事件是由用户代理（浏览器）派发的，则返回 true，否则返回 false。                                                                                                                                                                                        |
| **`returnValue`**      | <code>boolean</code>                                   |                                                                                                                                                                                                                                                            |
| **`srcElement`**       | <code><a href="#eventtarget">EventTarget</a></code>    |                                                                                                                                                                                                                                                            |
| **`target`**           | <code><a href="#eventtarget">EventTarget</a></code>    | 返回事件被派发到的对象（即其目标）。                                                                                                                                                                                                                       |
| **`timeStamp`**        | <code>number</code>                                    | 返回事件的时间戳，以相对于时间原点的毫秒数表示。                                                                                                                                                                                                           |
| **`type`**             | <code>string</code>                                    | 返回事件的类型，例如 "click"、"hashchange" 或 "submit"。                                                                                                                                                                                                   |
| **`AT_TARGET`**        | <code>number</code>                                    |                                                                                                                                                                                                                                                            |
| **`BUBBLING_PHASE`**   | <code>number</code>                                    |                                                                                                                                                                                                                                                            |
| **`CAPTURING_PHASE`**  | <code>number</code>                                    |                                                                                                                                                                                                                                                            |
| **`NONE`**             | <code>number</code>                                    |                                                                                                                                                                                                                                                            || 方法                       | 签名                                                              | 描述                                                                                                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **composedPath**             | () =&gt; EventTarget[]                                             | 返回事件路径上的调用目标对象（监听器将被调用的对象），不包括影子树中模式为"closed"且无法从事件当前目标访问的任何节点。 |
| **initEvent**                | (type: string, bubbles?: boolean, cancelable?: boolean) =&gt; void |                                                                                                                                                                                                                                         |
| **preventDefault**           | () =&gt; void                                                      | 当 cancelable 属性值为 true 且在事件监听器执行期间（passive 设置为 false 时）调用，会向触发事件的操作发出需要取消的信号。               |
| **stopImmediatePropagation** | () =&gt; void                                                      | 调用此方法可阻止事件在当前监听器运行完成后到达任何已注册的事件监听器，并且在树状结构中分发时，还能阻止事件到达任何其他对象。                            |
| **stopPropagation**          | () =&gt; void                                                      | 在树状结构中分发时，调用此方法可阻止事件到达除当前对象之外的任何其他对象。                                                                                                                 |

#### EventTarget

<a href="#eventtarget">EventTarget</a> 是一个 DOM 接口，由能够接收事件并可能拥有事件监听器的对象实现。

| 方法 | 签名 | 描述 |
|------|------|------|
| **addEventListener** | (type: string, listener: <a href="#eventlisteneroreventlistenerobject">EventListenerOrEventListenerObject</a> \| null, options?: boolean \| <a href="#addeventlisteneroptions">AddEventListenerOptions</a>) =&gt; void | 为事件类型属性值为 `type` 的事件追加一个事件监听器。`callback` 参数设置当事件被派发时将调用的回调函数。`options` 参数设置监听器特定的选项。为了兼容性，该参数也可以是一个布尔值，此时方法的行为与将值指定为 `options` 的 `capture` 属性完全相同。当设置为 `true` 时，`options` 的 `capture` 属性会阻止回调函数在事件的 `eventPhase` 属性值为 `BUBBLING_PHASE` 时被调用。当为 `false` (或不提供) 时，回调函数不会在事件的 `eventPhase` 属性值为 `CAPTURING_PHASE` 时被调用。无论哪种情况，如果事件的 `eventPhase` 属性值是 `AT_TARGET`，回调函数都会被调用。当设置为 `true` 时，`options` 的 `passive` 属性表示回调函数不会通过调用 `preventDefault()` 来取消事件。这用于启用 §2.8 观察事件监听器中描述的性能优化。当设置为 `true` 时，`options` 的 `once` 属性表示回调函数只会被调用一次，之后事件监听器将被移除。该事件监听器会被追加到目标的监听器列表中；如果存在类型、回调和捕获选项都相同的监听器，则不会被重复追加。 |
| **dispatchEvent** | (event: <a href="#event">Event</a>) =&gt; boolean | 将一个人工合成的事件 `event` 派发到目标，并返回一个布尔值。如果事件的 `cancelable` 属性值为 `false` 或其 `preventDefault()` 方法未被调用，则返回 `true`，否则返回 `false`。 |
| **removeEventListener** | (type: string, callback: <a href="#eventlisteneroreventlistenerobject">EventListenerOrEventListenerObject</a> \| null, options?: <a href="#eventlisteneroptions">EventListenerOptions</a> \| boolean) =&gt; void | 从目标的事件监听器列表中移除具有相同类型、回调和选项的事件监听器。 |


#### EventListener

#### EventListenerObject

| 方法            | 签名                                                              |
| --------------- | ----------------------------------------------------------------- |
| **handleEvent** | (evt: <a href="#event">Event</a>) => void                         |


#### AddEventListenerOptions

| 属性            | 类型                      |
| --------------- | ------------------------- |
| **`once`**      | <code>boolean</code>      |
| **`passive`**   | <code>boolean</code>      |


#### EventListenerOptions

| 属性            | 类型                      |
| --------------- | ------------------------- |
| **`capture`**   | <code>boolean</code>      |


#### ArrayBufferView

| 属性              | 类型                                                        | 描述                                                   |
| ----------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| **`buffer`**      | <code><a href="#arraybufferlike">ArrayBufferLike</a></code> | 数组引用的 <a href="#arraybuffer">ArrayBuffer</a> 实例。 |
| **`byteLength`**  | <code>number</code>                                         | 数组的字节长度。                                       |
| **`byteOffset`**  | <code>number</code>                                         | 数组的字节偏移量。                                     |


#### ArrayBufferTypes

用于 <a href="#arraybufferview">ArrayBufferView</a> 及相关类型数组缓存的允许的 <a href="#arraybuffer">ArrayBuffer</a> 类型。

| 属性                | 类型                                                |
| ------------------- | --------------------------------------------------- |
| **`ArrayBuffer`**   | <code><a href="#arraybuffer">ArrayBuffer</a></code> |


#### FormData

提供了一种简便的方式来构造一组表示表单字段及其值的键/值对，然后可以使用 XMLHttpRequest.send() 方法轻松发送。它使用的格式与将编码类型设置为 "multipart/form-data" 时表单所使用的格式相同。

| 方法        | 签名                                                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **append**  | (name: string, value: string \| <a href="#blob">Blob</a>, fileName?: string) => void                                                                                 |
| **delete**  | (name: string) => void                                                                                                                                               |
| **get**     | (name: string) => <a href="#formdataentryvalue">FormDataEntryValue</a> \| null                                                                                       |
| **getAll**  | (name: string) => FormDataEntryValue[]                                                                                                                               |
| **has**     | (name: string) => boolean                                                                                                                                            |
| **set**     | (name: string, value: string \| <a href="#blob">Blob</a>, fileName?: string) => void                                                                                 |
| **forEach** | (callbackfn: (value: <a href="#formdataentryvalue">FormDataEntryValue</a>, key: string, parent: <a href="#formdata">FormData</a>) => void, thisArg?: any) => void |


#### File

提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。

| 属性                 | 类型                      |
| -------------------- | ------------------------- |
| **`lastModified`**   | <code>number</code>       |
| **`name`**           | <code>string</code>       |


#### URLSearchParams

<a href="#urlsearchparams">`URLSearchParams`</a> 类是 `require('url').URLSearchParams` 的全局引用。
https://nodejs.org/api/url.html#class-urlsearchparams

| 方法          | 签名                                                                                                                               | 描述                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **append**   | (name: string, value: string) => void                                                                                                | 将指定的键/值对作为新的查询参数追加。                                                              |
| **delete**   | (name: string) => void                                                                                                               | 从所有查询参数列表中删除给定的查询参数及其关联的值。                      |
| **get**      | (name: string) => string \| null                                                                                                     | 返回与给定查询参数关联的第一个值。                                                          |
| **getAll**   | (name: string) => string[]                                                                                                           | 返回与给定查询参数关联的所有值。                                                          |
| **has**      | (name: string) => boolean                                                                                                            | 返回一个布尔值，指示是否存在该查询参数。                                                            |
| **set**      | (name: string, value: string) => void                                                                                                | 将给定查询参数关联的值设置为给定值。如果存在多个值，则删除其他值。 |
| **sort**     | () => void                                                                                                                           | 对查询参数进行排序。                                                                       |
| **toString** | () => string                                                                                                                         | 返回一个包含适合在 URL 中使用的查询字符串。不包含问号。                  |
| **forEach**  | (callbackfn: (value: string, key: string, parent: <a href="#urlsearchparams">URLSearchParams</a>) => void, thisArg?: any) => void | 对每个查询参数执行指定回调。                                                              |

#### Uint8Array

一种 8 位无符号整数值的类型化数组。数组内容初始化为 0。如果无法分配请求的字节数，则会抛出异常。

| 属性                    | 类型                                                        | 说明                                                                 |
| ----------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------- |
| **`BYTES_PER_ELEMENT`** | <code>number</code>                                         | 数组中每个元素的大小（以字节为单位）。                               |
| **`buffer`**            | <code><a href="#arraybufferlike">ArrayBufferLike</a></code> | 数组引用的 <a href="#arraybuffer">ArrayBuffer</a> 实例。             |
| **`byteLength`**        | <code>number</code>                                         | 数组的长度（以字节为单位）。                                         |
| **`byteOffset`**        | <code>number</code>                                         | 数组的偏移量（以字节为单位）。                                       |
| **`length`**            | <code>number</code>                                         | 数组的长度。                                                         || 方法             | 签名                                                                                                                                                                      | 描述                                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **copyWithin**     | (target: number, start: number, end?: number) =&gt; this                                                                                                                       | 拷贝数组中由 start 和 end 标识的区域到同一数组的 target 位置，并返回 this 对象。                                                                                                                                                                  |
| **every**          | (predicate: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; unknown, thisArg?: any) =&gt; boolean                                            | 检测数组中的所有元素是否都满足指定测试条件。                                                                                                                                                                  |
| **fill**           | (value: number, start?: number, end?: number) =&gt; this                                                                                                                       | 使用 value 值填充数组中由 start 和 end 标识的区域，并返回 this 对象。                                                                                                                                                    |
| **filter**         | (predicate: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; any, thisArg?: any) =&gt; <a href="#uint8array">Uint8Array</a>                   | 返回数组中满足回调函数中指定条件的元素。                                                                                                                                                  |
| **find**           | (predicate: (value: number, index: number, obj: <a href="#uint8array">Uint8Array</a>) =&gt; boolean, thisArg?: any) =&gt; number \| undefined                                  | 返回数组中第一个使谓词函数返回 true 的元素值，如果没有则返回 undefined。                                                                                                                                       |
| **findIndex**      | (predicate: (value: number, index: number, obj: <a href="#uint8array">Uint8Array</a>) =&gt; boolean, thisArg?: any) =&gt; number                                               | 返回数组中第一个使谓词函数返回 true 的元素的索引，如果没有则返回 -1。                                                                                                                                              |
| **forEach**        | (callbackfn: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; void, thisArg?: any) =&gt; void                                                 | 对数组中的每个元素执行指定的操作。                                                                                                                                                                                 |
| **indexOf**        | (searchElement: number, fromIndex?: number) =&gt; number                                                                                                                       | 返回数组中第一次出现指定值的索引。                                                                                                                                                                           |
| **join**           | (separator?: string) =&gt; string                                                                                                                                              | 将数组中的所有元素用指定的分隔符字符串连接起来。                                                                                                                                                              |
| **lastIndexOf**    | (searchElement: number, fromIndex?: number) =&gt; number                                                                                                                       | 返回数组中最后一次出现指定值的索引。                                                                                                                                                                            |
| **map**            | (callbackfn: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number, thisArg?: any) =&gt; <a href="#uint8array">Uint8Array</a>               | 对数组中的每个元素调用定义的回调函数，并返回包含结果的数组。                                                                                                                              |
| **reduce**         | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number) =&gt; number                       | 为数组中的所有元素调用指定的回调函数。回调函数的返回值是累积结果，并作为参数提供给下一次回调函数调用。                      |
| **reduce**         | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number, initialValue: number) =&gt; number |                                                                                                                                                                                                                                             |
| **reduce**         | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; U, initialValue: U) =&gt; U            | 为数组中的所有元素调用指定的回调函数。回调函数的返回值是累积结果，并作为参数提供给下一次回调函数调用。                      |
| **reduceRight**    | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number) =&gt; number                       | 为数组中的所有元素按降序调用指定的回调函数。回调函数的返回值是累积结果，并作为参数提供给下一次回调函数调用。 || **reduceRight**    | (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; number, initialValue: number) =&gt; number |                                                                                                                                                                                                                                             |
| **reduceRight**    | &lt;U&gt;(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; U, initialValue: U) =&gt; U            | 对数组中的所有元素按降序调用指定的回调函数。回调函数的返回值是累积结果，并作为下一次调用回调函数时的参数提供。 |
| **reverse**        | () =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                                                  | 反转数组中的元素顺序。                                                                                                                                                                                                          |
| **set**            | (array: <a href="#arraylike">ArrayLike</a>&lt;number&gt;, offset?: number) =&gt; void                                                                                          | 设置一个值或一个值数组。                                                                                                                                                                                                         |
| **slice**          | (start?: number, end?: number) =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                      | 返回数组的一部分。                                                                                                                                                                                                              |
| **some**           | (predicate: (value: number, index: number, array: <a href="#uint8array">Uint8Array</a>) =&gt; unknown, thisArg?: any) =&gt; boolean                                            | 判断指定的回调函数是否对数组中的任意元素返回 true。                                                                                                                                                |
| **sort**           | (compareFn?: (a: number, b: number) =&gt; number) =&gt; this                                                                                                                   | 对数组进行排序。                                                                                                                                                                                                                             |
| **subarray**       | (begin?: number, end?: number) =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                      | 获取此数组底层 <a href="#arraybuffer">ArrayBuffer</a> 存储的一个新的 <a href="#uint8array">Uint8Array</a> 视图，引用从 begin（包含）到 end（不包含）的元素。                                                |
| **toLocaleString** | () =&gt; string                                                                                                                                                                | 使用当前区域设置将数字转换为字符串。                                                                                                                                                                                  |
| **toString**       | () =&gt; string                                                                                                                                                                | 返回数组的字符串表示形式。                                                                                                                                                                                                |
| **valueOf**        | () =&gt; <a href="#uint8array">Uint8Array</a>                                                                                                                                  | 返回指定对象的原始值。                                                                                                                                                                                        |

#### ArrayLike

| 属性           | 类型                  |
| -------------- | --------------------- |
| **`length`**   | <code>number</code>   |


#### Headers

该 Fetch API 接口允许你对 HTTP 请求和响应的头部执行各种操作，包括检索、设置、添加和删除。<a href="#headers">Headers</a> 对象具有一个关联的头部列表，该列表初始为空，包含零个或多个名称和值对。你可以使用 append() 等方法添加到此列表（参见示例）。在此接口的所有方法中，头部名称的匹配不区分大小写。

| 方法         | 签名                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| **append**   | (name: string, value: string) =&gt; void                                                                           |
| **delete**   | (name: string) =&gt; void                                                                                          |
| **get**      | (name: string) =&gt; string \| null                                                                                |
| **has**      | (name: string) =&gt; boolean                                                                                       |
| **set**      | (name: string, value: string) =&gt; void                                                                           |
| **forEach**  | (callbackfn: (value: string, key: string, parent: <a href="#headers">Headers</a>) =&gt; void, thisArg?: any) =&gt; void |


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

构造一个包含类型为 T 的属性集合 K 的类型

<code>{ [P in K]: T; }</code>


#### RequestMode

<code>"cors" | "navigate" | "no-cors" | "same-origin"</code>


#### RequestRedirect

<code>"error" | "follow" | "manual"</code>


#### ReferrerPolicy

<code>"" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"</code>


#### HttpResponseType

在将 HTTP 响应返回给客户端之前应如何解析它。

<code>'arraybuffer' | 'blob' | 'json' | 'text' | 'document'</code>

</docgen-api>
