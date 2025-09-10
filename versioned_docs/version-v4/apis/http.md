---
title: Capacitor Http 插件 API
description: Capacitor Http API 通过重写 `fetch` 和 `XMLHttpRequest` 以使用原生库的方式提供原生 HTTP 支持。
sidebar_label: Http
---

# CapacitorHttp

Capacitor Http API 通过重写 `fetch` 和 `XMLHttpRequest` 以使用原生库的方式提供原生 HTTP 支持。该插件还提供了无需使用 `fetch` 和 `XMLHttpRequest` 的原生 HTTP 请求辅助方法。本插件已内置于 `@capacitor/core` 中。

## 配置说明

默认情况下，重写 `window.fetch` 和 `XMLHttpRequest` 以使用原生库的功能处于禁用状态。如需启用此功能，请在 `capacitor.config` 文件中修改以下配置：

| 属性          | 类型                 | 描述                                                        | 默认值             |
| ------------- | -------------------- | ----------------------------------------------------------- | ------------------ |
| **`enabled`** | <code>boolean</code> | 是否启用重写 `fetch` 和 `XMLHttpRequest` 以使用原生库的功能 | <code>false</code> |

### 配置示例

在 `capacitor.config.json` 中:

```json
{
  "plugins": {
    "CapacitorHttp": {
      "enabled": true
    }
  }
}
```

在 `capacitor.config.ts` 中:

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
const doGet = () => {
  const options = {
    url: 'https://example.com/my/api',
    headers: { 'X-Fake-Header': 'Fake-Value' },
    params: { size: 'XL' },
  };

  const response: HttpResponse = await CapacitorHttp.get(options);

  // 或者使用通用请求方式...
  // const response = await CapacitorHttp.request({ ...options, method: 'GET' })
};

// POST 请求示例。注意：data 参数可以传递原始 JS 对象（必须可 JSON 序列化）
const doPost = () => {
  const options = {
    url: 'https://example.com/my/api',
    headers: { 'X-Fake-Header': 'Fake-Value' },
    data: { foo: 'bar' },
  };

  const response: HttpResponse = await CapacitorHttp.post(options);

  // 或者使用通用请求方式...
  // const response = await CapacitorHttp.request({ ...options, method: 'POST' })
};
```

## 大文件支持说明

由于桥接机制的特性，在原生代码和 Web 之间解析和传输大量数据可能会导致问题。计划在不久的将来将文件下载和上传到本地设备的功能添加到 `@capacitor/filesystem` 插件中。目前（特别是 Android 平台）一种可能的临时解决方案是编辑 `AndroidManifest.xml` 文件，在 `application` 元素中添加 `android:largeHeap="true"`。大多数应用并不需要这样做，应该专注于减少整体内存使用以提高性能。启用此选项也不能保证固定增加可用内存，因为某些设备会受到总可用内存的限制。

## API 参考

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

| 属性                         | 类型                                                          | 描述                                                                                  |
| ---------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **`url`**                    | <code>string</code>                                           | 请求的目标 URL                                                                        |
| **`method?`**                | <code>string</code>                                           | HTTP 请求方法（默认为 `GET`）                                                         |
| **`params?`**                | <code><a href="#httpparams">HttpParams</a></code>             | 附加到请求的 URL 参数                                                                 |
| **`data?`**                  | <code>any</code>                                              | 随请求发送的 JSON 数据                                                                |
| **`headers?`**               | <code><a href="#httpheaders">HttpHeaders</a></code>           | 随请求发送的 HTTP 头信息                                                              |
| **`readTimeout?`**           | <code>number</code>                                           | 等待读取额外数据的超时时间（每次接收到新数据时重置）                                  |
| **`connectTimeout?`**        | <code>number</code>                                           | 初始连接等待超时时间                                                                  |
| **`disableRedirects?`**      | <code>boolean</code>                                          | 是否禁用自动 HTTP 重定向                                                              |
| **`webFetchExtra?`**         | <code>RequestInit</code>                                      | 在 Web 环境下运行 fetch 时的额外参数                                                  |
| **`responseType?`**          | <code><a href="#httpresponsetype">HttpResponseType</a></code> | 在返回给客户端前如何解析响应。如果响应 content-type 是 `json`，此值将被忽略           |
| **`shouldEncodeUrlParams?`** | <code>boolean</code>                                          | 是否保持 URL 参数不编码（适用于已编码参数、Azure/Firebase 测试等场景。默认为 `true`） |

#### HttpParams

| 类型                                    | 描述                      |
| --------------------------------------- | ------------------------- |
| **`[key: string]: string or string[]`** | 键值对形式的 URL 参数字典 |

#### HttpHeaders

| 类型                        | 描述                         |
| --------------------------- | ---------------------------- |
| **`[key: string]: string`** | 键值对形式的 HTTP 头信息字典 |

#### HttpResponseType

| 类型                                                            | 描述                             |
| --------------------------------------------------------------- | -------------------------------- |
| **`'arraybuffer' or 'blob' or 'json' or 'text' or 'document'`** | 返回给客户端前如何解析 HTTP 响应 |

#### HttpResponse

| 属性          | 类型                                                | 描述                         |
| ------------- | --------------------------------------------------- | ---------------------------- |
| **`url`**     | <code>string</code>                                 | 从 HTTP 响应中接收的 URL     |
| **`status`**  | <code>number</code>                                 | 从 HTTP 响应中接收的状态码   |
| **`data`**    | <code>any</code>                                    | 从 HTTP 响应中接收的附加数据 |
| **`headers`** | <code><a href="#httpheaders">HttpHeaders</a></code> | 从 HTTP 响应中接收的头信息   |

</docgen-api>
