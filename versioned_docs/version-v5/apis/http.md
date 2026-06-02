---
title: Capacitor Http 插件 API
description: Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 以使用原生库的方式提供原生 HTTP 支持。
sidebar_label: Http
translated: true
---

# CapacitorHttp

Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 以使用原生库的方式提供原生 HTTP 支持。它还提供了在不使用 `fetch` 和 `XMLHttpRequest` 的情况下进行原生 HTTP 请求的辅助方法。此插件随 `@capacitor/core` 一起提供。

## 配置

默认情况下，修补 `window.fetch` 和 `XMLHttpRequest` 以使用原生库的功能是禁用的。
如果你想启用此功能，请在 `capacitor.config` 文件中修改以下配置。

| 属性          | 类型                 | 描述                                                                          | 默认值            |
| ------------- | -------------------- | ----------------------------------------------------------------------------- | ------------------ |
| **`enabled`** | <code>boolean</code> | 启用修补 `fetch` 和 `XMLHttpRequest` 以使用原生库的功能。 | <code>false</code> |

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

由于桥接机制的特性，解析和传输大量数据从原生端到 Web 端可能会导致问题。计划在不久的将来为 `@capacitor/filesystem` 插件添加对下载和上传文件到原生设备的支持。在此期间，一种可能避免内存不足问题的方法（特别是在 Android 上）是编辑 `AndroidManifest.xml` 并在 `application` 元素中添加 `android:largeHeap="true"`。大多数应用不需要这样做，而应该专注于减少总体内存使用以提高性能。启用此功能也不保证可用内存的固定增加，因为某些设备受其总可用内存的限制。

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

使用原生库向服务器发起 HTTP 请求。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### get(...)

```typescript
get(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 HTTP GET 请求。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### post(...)

```typescript
post(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 HTTP POST 请求。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### put(...)

```typescript
put(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 HTTP PUT 请求。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### patch(...)

```typescript
patch(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 HTTP PATCH 请求。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### delete(...)

```typescript
delete(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发起 HTTP DELETE 请求。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### 接口

#### HttpOptions

| 属性                         | 类型                                                          | 描述                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **`url`**                    | <code>string</code>                                           | 请求发送到的 URL。                                                                                                          |
| **`method?`**                | <code>string</code>                                           | 要执行的 HTTP 请求方法。（默认为 `GET`）                                                                                      |
| **`params?`**                | <code><a href="#httpparams">HttpParams</a></code>             | 要附加到请求的 URL 参数。                                                                                                   |
| **`data?`**                  | <code>any</code>                                              | 随请求发送的 JSON 数据。                                                                                                    |
| **`headers?`**               | <code><a href="#httpheaders">HttpHeaders</a></code>           | 随请求发送的 HTTP 请求头。                                                                                                  |
| **`readTimeout?`**           | <code>number</code>                                           | 读取额外数据的等待时间。每次收到新数据时重置。                                                                              |
| **`connectTimeout?`**        | <code>number</code>                                           | 初始连接的超时等待时间。                                                                                                    |
| **`disableRedirects?`**      | <code>boolean</code>                                          | 设置是否禁用自动 HTTP 重定向。                                                                                              |
| **`webFetchExtra?`**         | <code>RequestInit</code>                                      | 在 Web 上运行时，fetch 的额外参数。                                                                                         |
| **`responseType?`**          | <code><a href="#httpresponsetype">HttpResponseType</a></code> | 在返回给客户端之前适当地解析响应。如果响应 content-type 是 `json`，则忽略此值。                                              |
| **`shouldEncodeUrlParams?`** | <code>boolean</code>                                          | 一个选项，用于在必要时保持 URL 不编码（已编码、azure/firebase 测试等）。（默认为 `true`）                                    |

#### HttpParams

| 类型                                    | 描述                                      |
| --------------------------------------- | ----------------------------------------- |
| **`[key: string]: string or string[]`** | 要设置的 URL 参数的键/值字典。            |

#### HttpHeaders

| 类型                        | 描述                             |
| --------------------------- | -------------------------------- |
| **`[key: string]: string`** | HTTP 请求头的键/值字典。         |

#### HttpResponseType

| 类型                                                            | 描述                                                       |
| --------------------------------------------------------------- | ---------------------------------------------------------- |
| **`'arraybuffer' or 'blob' or 'json' or 'text' or 'document'`** | 在返回给客户端之前如何解析 HTTP 响应。                     |

#### HttpResponse

| 属性          | 类型                                                | 描述                                       |
| ------------- | --------------------------------------------------- | ------------------------------------------ |
| **`url`**     | <code>string</code>                                 | 从 HTTP 响应中收到的响应 URL。             |
| **`status`**  | <code>number</code>                                 | 从 HTTP 响应中收到的状态码。               |
| **`data`**    | <code>any</code>                                    | 随 HTTP 响应收到的附加数据。               |
| **`headers`** | <code><a href="#httpheaders">HttpHeaders</a></code> | 从 HTTP 响应中收到的请求头。               |

</docgen-api>
