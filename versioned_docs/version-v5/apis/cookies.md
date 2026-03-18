---
title: Capacitor Cookies 插件 API
description: Capacitor Cookies API 通过修补 `document.cookie` 以使用原生库，提供原生 Cookie 支持。
sidebar_label: Cookies
---

# CapacitorCookies

Capacitor Cookies API 通过修补 `document.cookie` 以使用原生库的方式，提供原生 Cookie 支持。它还提供了在特定 URL 修改 Cookie 的方法。该插件已捆绑在 `@capacitor/core` 中。

## 配置

默认情况下，修补 `document.cookie` 以使用原生库的功能是禁用的。
如果你想启用此功能，请在 `capacitor.config` 文件中修改以下配置。

| 属性          | 类型                 | 描述                                                                 | 默认值            |
| ------------- | -------------------- | -------------------------------------------------------------------- | ------------------ |
| **`enabled`** | <code>boolean</code> | 启用修补 `document.cookie`，使其使用原生库而非默认实现。             | <code>false</code> |

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

## 示例

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

## iOS 上的第三方 Cookie

从 iOS 14 开始，默认情况下无法使用第三方 Cookie。为了在 iOS 上获得更好的 Cookie 支持，请在你的 Info.plist 文件中添加以下行。你最多可以添加 10 个域。

```xml
<key>WKAppBoundDomains</key>
<array>
  <string>www.mydomain.com</string>
  <string>api.mydomain.com</string>
  <string>www.myothercooldomain.com</string>
</array>
```

## API

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

向设备写入一个 Cookie。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#setcookieoptions">SetCookieOptions</a></code> |

---

### deleteCookie(...)

```typescript
deleteCookie(options: DeleteCookieOptions) => Promise<void>
```

从设备删除一个 Cookie。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#deletecookieoptions">DeleteCookieOptions</a></code> |

---

### clearCookies(...)

```typescript
clearCookies(options: ClearCookieOptions) => Promise<void>
```

清除设备上给定 URL 的 Cookie。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#clearcookieoptions">ClearCookieOptions</a></code> |

---

### clearAllCookies()

```typescript
clearAllCookies() => Promise<void>
```

清除设备上的所有 Cookie。

---

### 接口

#### SetCookieOptions

| 属性           | 类型                | 描述                       |
| -------------- | ------------------- | -------------------------- |
| **`url?`**     | <code>string</code> | 要写入 Cookie 的 URL。     |
| **`key`**      | <code>string</code> | 要赋予 Cookie 的键名。     |
| **`value`**    | <code>string</code> | 要赋予 Cookie 的值。       |
| **`path?`**    | <code>string</code> | 要写入 Cookie 的路径。     |
| **`expires?`** | <code>string</code> | Cookie 的过期日期。        |

#### DeleteCookieOptions

| 属性       | 类型                | 描述                       |
| ---------- | ------------------- | -------------------------- |
| **`url?`** | <code>string</code> | 要从中删除 Cookie 的 URL。 |
| **`key`**  | <code>string</code> | 要删除的 Cookie 的键名。   |

#### ClearCookieOptions

| 属性       | 类型                | 描述                   |
| ---------- | ------------------- | ---------------------- |
| **`url?`** | <code>string</code> | 要清除 Cookie 的 URL。 |

</docgen-api>