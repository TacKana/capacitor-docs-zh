---
title: Capacitor Http 插件 API
description: Capacitor Http API 通过重写 `fetch` 和 `XMLHttpRequest` 方法使用原生库提供 HTTP 支持。
sidebar_label: Http
---

# CapacitorHttp

Capacitor Http API 通过重写 `fetch` 和 `XMLHttpRequest` 方法使用原生库提供 HTTP 支持。同时它还提供了无需使用 `fetch` 和 `XMLHttpRequest` 的原生 HTTP 请求辅助方法。该插件已内置在 `@capacitor/core` 中。

## 配置

默认情况下，重写 `window.fetch` 和 `XMLHttpRequest` 使用原生库的功能是关闭的。如需启用此功能，请在 `capacitor.config` 文件中修改以下配置。

| 属性          | 类型                 | 描述                                                        | 默认值             |
| ------------- | -------------------- | ----------------------------------------------------------- | ------------------ |
| **`enabled`** | <code>boolean</code> | 是否启用重写 `fetch` 和 `XMLHttpRequest` 使用原生库的功能。 | <code>false</code> |

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

## 使用示例

```typescript
import { CapacitorHttp } from '@capacitor/core';

// GET 请求示例
const doGet = async () => {
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
const doPost = async () => {
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

由于桥接机制的特性，从原生层解析和传输大量数据到 Web 层可能会导致问题。计划将在不久的将来在 `@capacitor/filesystem` 插件中添加对在原生设备上下载和上传文件的支持。在此期间（特别是在 Android 上），可以尝试编辑 `AndroidManifest.xml` 并在 `application` 元素中添加 `android:largeHeap="true"` 来避免内存不足的问题。大多数应用不需要这样做，而应专注于减少整体内存使用以提高性能。启用此选项也不能保证获得固定的内存增加，因为某些设备受限于其总可用内存。

## API 文档

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

### Interfaces

#### HttpOptions

| 属性                         | 类型                                                          | 描述                                                                          |
| ---------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **`url`**                    | <code>string</code>                                           | 请求的目标 URL。                                                              |
| **`method?`**                | <code>string</code>                                           | HTTP 请求方法。（默认为 `GET`）                                               |
| **`params?`**                | <code><a href="#httpparams">HttpParams</a></code>             | 附加到请求的 URL 参数。                                                       |
| **`data?`**                  | <code>any</code>                                              | 随请求发送的 JSON 数据。                                                      |
| **`headers?`**               | <code><a href="#httpheaders">HttpHeaders</a></code>           | 随请求发送的 HTTP 头信息。                                                    |
| **`readTimeout?`**           | <code>number</code>                                           | 等待读取额外数据的超时时间（毫秒）。每次接收到新数据时重置。                  |
| **`connectTimeout?`**        | <code>number</code>                                           | 初始连接等待超时时间（毫秒）。                                                |
| **`disableRedirects?`**      | <code>boolean</code>                                          | 是否禁用自动 HTTP 重定向。                                                    |
| **`webFetchExtra?`**         | <code>RequestInit</code>                                      | 在 Web 环境下运行 fetch 时的额外参数。                                        |
| **`responseType?`**          | <code><a href="#httpresponsetype">HttpResponseType</a></code> | 在返回给客户端前如何解析响应。如果响应内容类型是 `json`，则忽略此值。         |
| **`shouldEncodeUrlParams?`** | <code>boolean</code>                                          | 必要时是否保持 URL 不编码（已编码、Azure/Firebase 测试等）。（默认为 `true`） |

#### HttpParams

| 类型                                    | 描述                               |
| --------------------------------------- | ---------------------------------- |
| **`[key: string]: string or string[]`** | 要设置的 URL 参数字典（键/值对）。 |

#### HttpHeaders

| 类型                        | 描述                     |
| --------------------------- | ------------------------ |
| **`[key: string]: string`** | HTTP 头信息的键/值字典。 |

#### HttpResponseType

| 类型                                                            | 描述                                 |
| --------------------------------------------------------------- | ------------------------------------ |
| **`'arraybuffer' or 'blob' or 'json' or 'text' or 'document'`** | 在返回给客户端前如何解析 HTTP 响应。 |

#### HttpResponse

| 属性          | 类型                                                | 描述                             |
| ------------- | --------------------------------------------------- | -------------------------------- |
| **`url`**     | <code>string</code>                                 | 从 HTTP 响应中接收到的 URL。     |
| **`status`**  | <code>number</code>                                 | 从 HTTP 响应中接收到的状态码。   |
| **`data`**    | <code>any</code>                                    | 从 HTTP 响应中接收到的附加数据。 |
| **`headers`** | <code><a href="#httpheaders">HttpHeaders</a></code> | 从 HTTP 响应中接收到的头信息。   |

</docgen-api>
