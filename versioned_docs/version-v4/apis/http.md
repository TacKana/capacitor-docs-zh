---
title: Capacitor Http 插件 API
description: Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 以使用原生库来提供原生 http 支持。
translated: true
sidebar_label: Http
---

# CapacitorHttp

Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 以使用原生库来提供原生 http 支持。它还提供了无需使用 `fetch` 和 `XMLHttpRequest` 的原生 http 请求辅助方法。此插件随 `@capacitor/core` 一起提供。

## 配置

默认情况下，修补 `window.fetch` 和 `XMLHttpRequest` 以使用原生库的功能是禁用的。
如果您想启用此功能，请在 `capacitor.config` 文件中修改以下配置。

| 属性            | 类型                 | 描述                                                                          | 默认值             |
| --------------- | -------------------- | ----------------------------------------------------------------------------- | ------------------ |
| **`enabled`**   | <code>boolean</code> | 启用修补 `fetch` 和 `XMLHttpRequest` 以使用原生库而不是默认实现。              | <code>false</code> |

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

由于桥接机制的特性，解析和传输大量数据从原生到 Web 可能会导致问题。计划在不久的将来为 `@capacitor/filesystem` 插件添加对下载和上传文件到原生设备的支持。在此期间，一种可能避免内存耗尽问题的方法（特别是在 Android 上）是编辑 `AndroidManifest.xml` 并在 `application` 元素中添加 `android:largeHeap="true"`。大多数应用不需要这样做，而应专注于减少整体内存使用以提高性能。启用此功能也不能保证可用内存的固定增加，因为某些设备受其总可用内存的限制。

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

使用原生库向服务器发送 Http 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### get(...)

```typescript
get(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发送 Http GET 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### post(...)

```typescript
post(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发送 Http POST 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### put(...)

```typescript
put(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发送 Http PUT 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### patch(...)

```typescript
patch(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发送 Http PATCH 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### delete(...)

```typescript
delete(options: HttpOptions) => Promise<HttpResponse>
```

使用原生库向服务器发送 Http DELETE 请求。

| 参数            | 类型                                                |
| --------------- | --------------------------------------------------- |
| **`options`**   | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### 接口

#### HttpOptions

| 属性                           | 类型                                                          | 描述                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **`url`**                      | <code>string</code>                                           | 要发送请求的 URL。                                                                                                           |
| **`method?`**                  | <code>string</code>                                           | 要执行的 Http 请求方法。（默认是 `GET`）                                                                                     |
| **`params?`**                  | <code><a href="#httpparams">HttpParams</a></code>             | 要追加到请求的 URL 参数。                                                                                                    |
| **`data?`**                    | <code>any</code>                                              | 随请求发送的 JSON 数据。                                                                                                     |
| **`headers?`**                 | <code><a href="#httpheaders">HttpHeaders</a></code>           | 随请求发送的 Http 请求头。                                                                                                   |
| **`readTimeout?`**             | <code>number</code>                                           | 等待读取额外数据的时间。每次收到新数据时重置。                                                                                |
| **`connectTimeout?`**          | <code>number</code>                                           | 等待初始连接的时间。                                                                                                         |
| **`disableRedirects?**         | <code>boolean</code>                                          | 设置是否应禁用自动 Http 重定向。                                                                                              |
| **`webFetchExtra?**            | <code>RequestInit</code>                                      | 在 Web 上运行时的 fetch 额外参数。                                                                                           |
| **`responseType?**             | <code><a href="#httpresponsetype">HttpResponseType</a></code> | 在返回给客户端之前适当解析响应。如果响应 content-type 是 `json`，则忽略此值。                                                  |
| **`shouldEncodeUrlParams?**    | <code>boolean</code>                                          | 一个选项，用于在必要时保持 URL 未编码（已编码、azure/firebase 测试等）。（默认值为 `true`）                                   |

#### HttpParams

| 类型                                      | 描述                                      |
| ----------------------------------------- | ----------------------------------------- |
| **`[key: string]: string or string[]`**   | URL 参数的键/值字典。                      |

#### HttpHeaders

| 类型                          | 描述                             |
| ----------------------------- | -------------------------------- |
| **`[key: string]: string`**   | Http 请求头的键/值字典。          |

#### HttpResponseType

| 类型                                                              | 描述                                                       |
| ----------------------------------------------------------------- | ---------------------------------------------------------- |
| **`'arraybuffer' or 'blob' or 'json' or 'text' or 'document'`**   | 在返回给客户端之前如何解析 Http 响应。                      |

#### HttpResponse

| 属性            | 类型                                                | 描述                                       |
| --------------- | --------------------------------------------------- | ------------------------------------------ |
| **`url`**       | <code>string</code>                                 | 从 Http 响应接收到的响应 URL。               |
| **`status`**    | <code>number</code>                                 | 从 Http 响应接收到的状态码。                 |
| **`data`**      | <code>any</code>                                    | 随 Http 响应接收到的额外数据。               |
| **`headers`**   | <code><a href="#httpheaders">HttpHeaders</a></code> | 从 Http 响应接收到的请求头。                 |

</docgen-api>
