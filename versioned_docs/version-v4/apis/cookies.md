---
title: Capacitor Cookies 插件 API
description: Capacitor Cookies API 通过覆写 `document.cookie` 来使用原生库提供本地化 Cookie 支持。
sidebar_label: Cookies
---

# CapacitorCookies

Capacitor Cookies API 通过覆写 `document.cookie` 来使用原生库提供本地化 Cookie 支持。它还提供了在特定 URL 下修改 Cookie 的方法。该插件已捆绑在 `@capacitor/core` 中。

## 配置说明

默认情况下，使用原生库覆写 `document.cookie` 的功能是禁用的。如需启用该功能，请修改 `capacitor.config` 文件中的以下配置。

| 属性          | 类型                 | 描述                                                                 | 默认值            |
| ------------- | -------------------- | ------------------------------------------------------------------- | ----------------- |
| **`enabled`** | <code>boolean</code> | 启用使用原生库替代 `document.cookie` 的功能                         | <code>false</code> |

### 配置示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "CapacitorCookies": {
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
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
```

## 使用示例

```typescript
import { CapacitorCookies } from '@capacitor/core';

const getCookies = () => {
  return document.cookie;
};

const setCookie = () => {
  document.cookie = key + '=' + value;
};

const setCapacitorCookie = async () => {
  await CapacitorCookies.setCookie({
    url: 'http://example.com',
    key: 'language',
    value: 'en',
  });
};

const deleteCookie = async () => {
  await CapacitorCookies.deleteCookie({
    url: 'https://example.com',
    key: 'language',
  });
};

const clearCookiesOnUrl = async () => {
  await CapacitorCookies.clearCookies({
    url: 'https://example.com',
  });
};

const clearAllCookies = async () => {
  await CapacitorCookies.clearAllCookies();
};
```

## iOS 第三方 Cookie 支持

从 iOS 14 开始，默认情况下无法使用第三方 Cookie。如需在 iOS 上获得更好的 Cookie 支持，请将以下内容添加到 Info.plist 文件中。最多可添加 10 个域名。

```xml
<key>WKAppBoundDomains</key>
<array>
  <string>www.mydomain.com</string>
  <string>api.mydomain.com</string>
  <string>www.myothercooldomain.com</string>
</array>
```

## API 文档

<docgen-index>

- [`setCookie(...)`](#setcookie)
- [`deleteCookie(...)`](#deletecookie)
- [`clearCookies(...)`](#clearcookies)
- [`clearAllCookies()`](#clearallcookies)

</docgen-index>

<docgen-api>

### setCookie(...)

```typescript
setCookie(options: SetCookieOptions) => Promise<void>
```

向设备写入 Cookie。

| 参数         | 类型                                                          |
| ------------ | ------------------------------------------------------------- |
| **`options`** | <code><a href="#setcookieoptions">SetCookieOptions</a></code> |

---

### deleteCookie(...)

```typescript
deleteCookie(options: DeleteCookieOptions) => Promise<void>
```

从设备删除 Cookie。

| 参数         | 类型                                                                |
| ------------ | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#deletecookieoptions">DeleteCookieOptions</a></code> |

---

### clearCookies(...)

```typescript
clearCookies(options: ClearCookieOptions) => Promise<void>
```

清除指定 URL 下的所有 Cookie。

| 参数         | 类型                                                              |
| ------------ | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#clearcookieoptions">ClearCookieOptions</a></code> |

---

### clearAllCookies()

```typescript
clearAllCookies() => Promise<void>
```

清除设备上的所有 Cookie。

---

### 接口定义

#### SetCookieOptions

| 属性           | 类型                | 描述                      |
| -------------- | ------------------- | ------------------------ |
| **`url?`**     | <code>string</code> | 写入 Cookie 的 URL       |
| **`key`**      | <code>string</code> | Cookie 键名             |
| **`value`**    | <code>string</code> | Cookie 键值             |
| **`path?`**    | <code>string</code> | Cookie 路径             |
| **`expires?`** | <code>string</code> | Cookie 过期时间         |

#### DeleteCookieOptions

| 属性       | 类型                | 描述                        |
| ---------- | ------------------- | -------------------------- |
| **`url?`** | <code>string</code> | 要删除 Cookie 的 URL       |
| **`key`**  | <code>string</code> | 要删除的 Cookie 键名       |

#### ClearCookieOptions

| 属性       | 类型                | 描述                    |
| ---------- | ------------------- | ---------------------- |
| **`url?`** | <code>string</code> | 要清除 Cookie 的 URL   |

</docgen-api>