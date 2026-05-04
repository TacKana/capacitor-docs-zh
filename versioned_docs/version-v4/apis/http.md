---
title: Capacitor Http Plugin API
description: Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 来使用原生库，提供原生的 HTTP 支持。
sidebar_label: Http
---

# CapacitorHttp

Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 来使用原生库，提供原生的 HTTP 支持。它还提供了无需使用 `fetch` 和 `XMLHttpRequest` 的原生 HTTP 请求辅助方法。该插件已捆绑在 `@capacitor/core` 中。

## 配置

默认情况下，修补 `window.fetch` 和 `XMLHttpRequest` 以使用原生库的功能是禁用的。如果您想启用此功能，请在 `capacitor.config` 文件中修改以下配置。

| 属性           | 类型                  | 描述                                                                 | 默认值               |
| -------------- | --------------------- | -------------------------------------------------------------------- | -------------------- |
| **`enabled`**  | <code>boolean</code>  | 启用对 `fetch` 和 `XMLHttpRequest` 的修补，以使用原生库代替。        | <code>false</code>   |

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

// POST 请求示例。注意：数据可以作为原始 JS 对象传递（必须是可 JSON 序列化的）
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

由于桥接的本质，解析和传输大量数据从原生端到 Web 端可能会导致问题。计划在不久的将来将下载和上传文件到原生设备的功能添加到 `@capacitor/filesystem` 插件中。在此期间，一种可能避免内存耗尽问题（特别是在 Android 上）的方法是编辑 `AndroidManifest.xml` 并在 `application` 元素中添加 `android:largeHeap="true"`。大多数应用程序不需要这样做，而应该专注于减少整体内存使用以提高性能。启用此功能也不能保证可用内存的固定增加，因为某些设备受限于其总可用内存。

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

使用原生库向服务器发出 HTTP 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### get(...)

```typescript
get(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发出 HTTP GET 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### post(...)

```typescript
post(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发出 HTTP POST 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### put(...)

```typescript
put(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发出 HTTP PUT 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### patch(...)

```typescript
patch(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发出 HTTP PATCH 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### delete(...)

```typescript
delete(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发出 HTTP DELETE 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### 接口

#### HttpOptions

| 属性                          | 类型                                                          | 描述                                                                                                                     |
| ---------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`url`**                    | <code>string</code>                                           | 要发送请求的 URL。                                                                                                        |
| **`method?`**                | <code>string</code>                                           | 要执行的 HTTP 请求方法。（默认是 `GET`）                                                                                 |
| **`params?`**                | <code><a href="#httpparams">HttpParams</a></code>             | 要附加到请求中的 URL 参数。                                                                                               |
| **`data?`**                  | <code>any</code>                                              | 随请求发送的 JSON 数据。                                                                                                 |
| **`headers?`**               | <code><a href="#httpheaders">HttpHeaders</a></code>           | 随请求发送的 HTTP 请求头。                                                                                                |
| **`readTimeout?`**           | <code>number</code>                                           | 等待读取额外数据的时间。每次接收到新数据时重置。                                                                         |
| **`connectTimeout?`**        | <code>number</code>                                           | 等待初始连接建立的时间。                                                                                                 |
| **`disableRedirects?`**      | <code>boolean</code>                                          | 设置是否应禁用自动 HTTP 重定向。                                                                                         |
| **`webFetchExtra?`**         | <code>RequestInit</code>                                      | 在 Web 端运行时，为 fetch 提供的额外参数。                                                                               |
| **`responseType?`**          | <code><a href="#httpresponsetype">HttpResponseType</a></code> | 在将响应返回给客户端之前，如何正确解析响应。如果响应内容类型是 `json`，则忽略此值。                                      |
| **`shouldEncodeUrlParams?`** | <code>boolean</code>                                          | 一个选项，用于在必要时保持 URL 不编码（例如已编码、Azure/Firebase 测试等）。(默认是 `true`)                              |

#### HttpParams

| 类型                                    | 描述                                     |
| --------------------------------------- | ---------------------------------------- |
| **`[key: string]: string or string[]`** | 要设置的 URL 参数的键/值字典。           |

#### HttpHeaders

| 类型                        | 描述                             |
| --------------------------- | -------------------------------- |
| **`[key: string]: string`** | HTTP 请求头的键/值字典。         |

#### HttpResponseType

| 类型                                                            | 描述                                                 |
| --------------------------------------------------------------- | ---------------------------------------------------- |
| **`'arraybuffer' or 'blob' or 'json' or 'text' or 'document'`** | 在将 HTTP 响应返回给客户端之前，如何解析该响应。     |

#### HttpResponse

| 属性          | 类型                                                | 描述                                       |
| ------------- | --------------------------------------------------- | ------------------------------------------ |
| **`url`**     | <code>string</code>                                 | 从 HTTP 响应中接收到的响应 URL。           |
| **`status`**  | <code>number</code>                                 | 从 HTTP 响应中接收到的状态码。             |
| **`data`**    | <code>any</code>                                    | 随 HTTP 响应接收到的额外数据。             |
| **`headers`** | <code><a href="#httpheaders">HttpHeaders</a></code> | 从 HTTP 响应中接收到的请求头。             |

</docgen-api>