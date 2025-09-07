---
title: Http Capacitor 插件 API
description: Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 来使用原生库提供 HTTP 支持。
custom_edit_url: https://github.com/ionic-team/capacitor/blob/main/core/http.md
editApiUrl: https://github.com/ionic-team/capacitor/blob/main/core/src/core-plugins.ts
sidebar_label: Http
---

# CapacitorHttp

Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 来使用原生库提供 HTTP 支持。它还提供了不使用 `fetch` 和 `XMLHttpRequest` 的原生 HTTP 请求辅助方法。该插件与 `@capacitor/core` 捆绑发布。

## 配置

默认情况下，修补 `window.fetch` 和 `XMLHttpRequest` 以使用原生库的功能是禁用的。如需启用此功能，请在 `capacitor.config` 文件中修改以下配置。

| 属性          | 类型                 | 描述                                                                          | 默认值            |
| ------------- | -------------------- | ---------------------------------------------------------------------------- | ----------------- |
| **`enabled`** | <code>boolean</code> | 启用修补 `fetch` 和 `XMLHttpRequest` 以使用原生库替代浏览器默认实现。 | <code>false</code> |

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

// POST 请求示例。注意：数据
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

由于桥接机制的特性，解析和传输大量数据从原生层到网页可能会导致问题。计划在不久的将来将文件下载和上传到原生设备的功能添加到 `@capacitor/filesystem` 插件中。目前（特别是在 Android 上）一种潜在的解决方案是编辑 `AndroidManifest.xml` 并在 `application` 元素中添加 `android:largeHeap="true"`。大多数应用不需要此设置，而应专注于减少整体内存使用以提高性能。启用此功能也不能保证可用内存会增加，因为某些设备受其总可用内存的限制。

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

使用原生库向服务器发送 HTTP 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### get(...)

```typescript
get(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发送 HTTP GET 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### post(...)

```typescript
post(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发送 HTTP POST请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### put(...)

```typescript
put(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发送 HTTP PUT 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### patch(...)

```typescript
patch(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发送 HTTP PATCH 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### delete(...)

```typescript
delete(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发送 HTTP DELETE 请求。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

--------------------


### 接口


#### HttpResponse

| 属性          | 类型                                                | 描述                                       |
| ------------- | --------------------------------------------------- | ----------------------------------------- |
| **`data`**    | <code>any</code>                                    | HTTP 响应附带的其他数据。                 |
| **`status`**  | <code>number</code>                                 | 从 HTTP 响应接收到的状态码。              |
| **`headers`** | <code><a href="#httpheaders">HttpHeaders</a></code> | 从 HTTP 响应接收到的头部信息。            |
| **`url`**     | <code>string</code>                                 | 从 HTTP 响应接收到的 URL。                |


#### HttpHeaders


#### HttpOptions

| 属性                        | 类型                                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`url`**                   | <code>string</code>                                           | 请求的目标 URL。                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **`method`**                | <code>string</code>                                           | HTTP 请求方法。（默认为 GET）                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **`params`**                | <code><a href="#httpparams">HttpParams</a></code>             | 附加到请求的 URL 参数。                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **`data`**                  | <code>any</code>                                              | 注意：在 Android 和 iOS 上，数据只能是字符串或 JSON。FormData、<a href="#blob">Blob</a>、<a href="#arraybuffer">ArrayBuffer</a> 和其他复杂类型仅在 Web 上直接支持，或通过启用 `CapacitorHttp` 配置并使用修补后的 `window.fetch` 或 `XMLHttpRequest`。如果需要发送复杂类型，应将数据序列化为 base64 并相应地设置 `headers["Content-Type"]` 和 `dataType` 属性。                                                                                                     |
| **`headers`**               | <code><a href="#httpheaders">HttpHeaders</a></code>           | 随请求发送的 HTTP 请求头部。                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`readTimeout`**           | <code>number</code>                                           | 等待读取额外数据的超时时间（毫秒）。每次接收到新数据时重置。                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`connectTimeout`**        | <code>number</code>                                           | 初始连接的超时时间（毫秒）。                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`disableRedirects`**      | <code>boolean</code>                                          | 设置是否禁用自动 HTTP 重定向                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`webFetchExtra`**         | <code><a href="#requestinit">RequestInit</a></code>           | Web 环境下 fetch 的额外参数                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **`responseType`**          | <code><a href="#httpresponsetype">HttpResponseType</a></code> | 用于在返回给请求者之前适当地解析响应。如果响应内容类型是 "json"，则忽略此值。                                                                                                                                                                                                                                                                                                                                                                                      |
| **`shouldEncodeUrlParams`** | <code>boolean</code>                                          | 如果你需要在某些情况下保持 URL 未编码（已经编码、azure/firebase 测试等），使用此选项。默认为 _true_。                                                                                                                                                                                                                                                                                                                                                              |
| **`dataType`**              | <code>'file' \| 'formData'</code>                             | 如果我们不得不从需要原生层特殊处理的 JS 类型转换数据，则使用此选项                                                                                                                                                                                                                                                                                                                                                                                                |


#### HttpParams


#### RequestInit

| Prop                 | Type                                                              | Description                                                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`body`**           | <code><a href="#bodyinit">BodyInit</a></code>                     | A <a href="#bodyinit">BodyInit</a> object or null to set request's body.                                                                                                          |
| **`cache`**          | <code><a href="#requestcache">RequestCache</a></code>             | A string indicating how the request will interact with the browser's cache to set request's cache.                                                                                |
| **`credentials`**    | <code><a href="#requestcredentials">RequestCredentials</a></code> | A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.                          |
| **`headers`**        | <code><a href="#headersinit">HeadersInit</a></code>               | A <a href="#headers">Headers</a> object, an object literal, or an array of two-item arrays to set request's headers.                                                              |
| **`integrity`**      | <code>string</code>                                               | A cryptographic hash of the resource to be fetched by request. Sets request's integrity.                                                                                          |
| **`keepalive`**      | <code>boolean</code>                                              | A boolean to set request's keepalive.                                                                                                                                             |
| **`method`**         | <code>string</code>                                               | A string to set request's method.                                                                                                                                                 |
| **`mode`**           | <code><a href="#requestmode">RequestMode</a></code>               | A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.                                                           |
| **`redirect`**       | <code><a href="#requestredirect">RequestRedirect</a></code>       | A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. |
| **`referrer`**       | <code>string</code>                                               | A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.                                                                        |
| **`referrerPolicy`** | <code><a href="#referrerpolicy">ReferrerPolicy</a></code>         | A referrer policy to set request's referrerPolicy.                                                                                                                                |
| **`signal`**         | <code><a href="#abortsignal">AbortSignal</a></code>               | An <a href="#abortsignal">AbortSignal</a> to set request's signal.                                                                                                                |
| **`window`**         | <code>any</code>                                                  | Can only be null. Used to disassociate request from any Window.                                                                                                                   |


#### Blob

不可变的原始数据文件类对象。Blob 表示不一定是 JavaScript 原生格式的数据。<a href="#file">File</a> 接口基于 <a href="#blob">Blob</a>，继承了 blob 的功能并扩展以支持用户系统上的文件。
`Blob` 类是 `require('node:buffer').Blob` 的全局引用
https://nodejs.org/api/buffer.html#class-blob

| Prop       | Type                |
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

表示二进制数据的原始缓冲区，用于存储不同类型数组的数据。ArrayBuffers 不能直接读写，但可以传递给类型化数组或 DataView 对象来按需解释原始缓冲区。

| Prop             | Type                | Description                                                                     |
| ---------------- | ------------------- | ------------------------------------------------------------------------------- |
| **`byteLength`** | <code>number</code> | Read-only. The length of the <a href="#arraybuffer">ArrayBuffer</a> (in bytes). |

| Method    | Signature                                                                  | Description                                                     |
| --------- | -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **slice** | (begin: number, end?: number) =&gt; <a href="#arraybuffer">ArrayBuffer</a> | Returns a section of an <a href="#arraybuffer">ArrayBuffer</a>. |


#### ReadableStream

此 Streams API 接口表示字节数据的可读流。Fetch API 通过 Response 对象的 body 属性提供了 <a href="#readablestream">ReadableStream</a> 的具体实例。

| Prop         | Type                 |
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

| Prop        | Type               |
| ----------- | ------------------ |
| **`done`**  | <code>false</code> |
| **`value`** | <code>T</code>     |


#### ReadableStreamDefaultReadDoneResult

| Prop        | Type              |
| ----------- | ----------------- |
| **`done`**  | <code>true</code> |
| **`value`** |                   |


#### ReadableWritablePair

| Prop           | Type                                                               | Description                                                                                                                                                                                                                                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`readable`** | <code><a href="#readablestream">ReadableStream</a>&lt;R&gt;</code> |                                                                                                                                                                                                                                                                                                                                                                                     |
| **`writable`** | <code><a href="#writablestream">WritableStream</a>&lt;W&gt;</code> | Provides a convenient, chainable way of piping this readable stream through a transform stream (or any other { writable, readable } pair). It simply pipes the stream into the writable side of the supplied pair, and returns the readable side for further use. Piping a stream will lock it for the duration of