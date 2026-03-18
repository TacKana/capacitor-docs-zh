---
title: Capacitor Http Plugin API
description: Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 来使用原生网络库，提供原生 HTTP 支持。
sidebar_label: Http
---

# CapacitorHttp

Capacitor Http API 通过修补 `window.fetch` 和 `XMLHttpRequest` 来使用原生网络库，从而提供原生 HTTP 支持。它还提供了一系列辅助方法，让你无需依赖 `fetch` 和 `XMLHttpRequest` 即可发起原生 HTTP 请求。此插件已捆绑在 `@capacitor/core` 中。

## 配置

默认情况下，对 `window.fetch` 和 `XMLHttpRequest` 的修补功能是禁用的。如果你想启用此功能，请在 `capacitor.config` 文件中修改以下配置。

| 属性           | 类型                  | 描述                                                                 | 默认值               |
| -------------- | --------------------- | -------------------------------------------------------------------- | -------------------- |
| **`enabled`**  | <code>boolean</code>  | 启用对 `fetch` 和 `XMLHttpRequest` 的修补，使其使用原生网络库。      | <code>false</code>   |

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

// POST 请求示例。注意：数据可以作为原始的 JS 对象传递（必须是可 JSON 序列化的）。
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

由于桥接机制的特性，从原生端解析和传输大量数据到 Web 端可能会导致问题。计划在不久的将来将下载和上传文件到原生设备的功能添加到 `@capacitor/filesystem` 插件中。在此之前，一种可能规避内存耗尽问题（特别是在 Android 上）的方法是编辑 `AndroidManifest.xml`，在 `application` 元素中添加 `android:largeHeap="true"`。大多数应用不需要这样做，而应专注于减少总体内存使用以提高性能。启用此选项也不能保证可用内存一定增加，因为某些设备受其总可用内存的限制。

## API

<docgen-index>

- [`request(...)`](#request)
- [`get(...)`](#get)
- [`post(...)`](#post)
- [`put(...)`](#put)
- [`patch(...)`](#patch)
- [`delete(...)`](#delete)

</docgen-index>

<docgen-api>

### request(...)

```typescript
request(options: HttpOptions) => Promise<HttpResponse>
```

使用原生网络库向服务器发起 HTTP 请求。

| 参数           | 类型                                                |
| -------------- | --------------------------------------------------- |
| **`options`**  | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### get(...)

```typescript
get(options: HttpOptions) => Promise<HttpResponse>
```

使用原生网络库向服务器发起 HTTP GET 请求。

| 参数           | 类型                                                |
| -------------- | --------------------------------------------------- |
| **`options`**  | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### post(...)

```typescript
post(options: HttpOptions) => Promise<HttpResponse>
```

使用原生网络库向服务器发起 HTTP POST 请求。

| 参数           | 类型                                                |
| -------------- | --------------------------------------------------- |
| **`options`**  | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### put(...)

```typescript
put(options: HttpOptions) => Promise<HttpResponse>
```

使用原生网络库向服务器发起 HTTP PUT 请求。

| 参数           | 类型                                                |
| -------------- | --------------------------------------------------- |
| **`options`**  | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### patch(...)

```typescript
patch(options: HttpOptions) => Promise<HttpResponse>
```

使用原生网络库向服务器发起 HTTP PATCH 请求。

| 参数           | 类型                                                |
| -------------- | --------------------------------------------------- |
| **`options`**  | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### delete(...)

```typescript
delete(options: HttpOptions) => Promise<HttpResponse>
```

使用原生网络库向服务器发起 HTTP DELETE 请求。

| 参数           | 类型                                                |
| -------------- | --------------------------------------------------- |
| **`options`**  | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### 接口
#### HttpOptions

| 属性                         | 类型                                                          | 说明                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **`url`**                    | <code>string</code>                                           | 要发送请求的目标 URL。                                                                                                           |
| **`method?`**                | <code>string</code>                                           | 要执行的 HTTP 请求方法。（默认为 `GET`）                                                                                         |
| **`params?`**                | <code><a href="#httpparams">HttpParams</a></code>             | 要附加到请求的 URL 参数。                                                                                                        |
| **`data?`**                  | <code>any</code>                                              | 随请求发送的 JSON 数据。                                                                                                         |
| **`headers?`**               | <code><a href="#httpheaders">HttpHeaders</a></code>           | 随请求发送的 HTTP 请求头。                                                                                                       |
| **`readTimeout?`**           | <code>number</code>                                           | 等待读取额外数据的超时时间（毫秒）。每次接收到新数据时重置。                                                                     |
| **`connectTimeout?`**        | <code>number</code>                                           | 等待初始连接建立的超时时间（毫秒）。                                                                                             |
| **`disableRedirects?`**      | <code>boolean</code>                                          | 设置是否禁用自动 HTTP 重定向。                                                                                                   |
| **`webFetchExtra?`**         | <code>RequestInit</code>                                      | 在 Web 环境下运行时，为 `fetch` 提供的额外参数。                                                                                 |
| **`responseType?`**          | <code><a href="#httpresponsetype">HttpResponseType</a></code> | 在将响应返回给客户端之前，如何正确解析响应。如果响应的 `content-type` 是 `json`，则忽略此值。                                    |
| **`shouldEncodeUrlParams?`** | <code>boolean</code>                                          | 一个选项，用于在必要时保持 URL 不编码（例如 URL 已编码、Azure/Firebase 测试等场景）。（默认为 `true`）                          |

#### HttpParams

| 类型                                    | 说明                               |
| --------------------------------------- | ---------------------------------- |
| **`[key: string]: string or string[]`** | 一个需要设置的 URL 参数的键/值字典。 |

#### HttpHeaders

| 类型                        | 说明                     |
| --------------------------- | ------------------------ |
| **`[key: string]: string`** | 一个 HTTP 请求头的键/值字典。 |

#### HttpResponseType

| 类型                                                            | 说明                                         |
| --------------------------------------------------------------- | -------------------------------------------- |
| **`'arraybuffer' or 'blob' or 'json' or 'text' or 'document'`** | 在将 HTTP 响应返回给客户端之前，如何解析它。 |

#### HttpResponse

| 属性          | 类型                                                | 说明                                     |
| ------------- | --------------------------------------------------- | ---------------------------------------- |
| **`url`**     | <code>string</code>                                 | 从 HTTP 响应中接收到的响应 URL。         |
| **`status`**  | <code>number</code>                                 | 从 HTTP 响应中接收到的状态码。           |
| **`data`**    | <code>any</code>                                    | 随 HTTP 响应接收到的额外数据。           |
| **`headers`** | <code><a href="#httpheaders">HttpHeaders</a></code> | 从 HTTP 响应中接收到的请求头。           |

</docgen-api>