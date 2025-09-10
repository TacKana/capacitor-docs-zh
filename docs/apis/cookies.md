---
title: Capacitor Cookies 插件 API
description: Capacitor Cookies API 通过修补 `document.cookie` 以使用原生库，提供原生 Cookie 支持。
custom_edit_url: https://github.com/ionic-team/capacitor/blob/main/core/cookies.md
editApiUrl: https://github.com/ionic-team/capacitor/blob/main/core/src/core-plugins.ts
sidebar_label: Cookies
---

# CapacitorCookies

Capacitor Cookies API 通过修补 `document.cookie` 以使用原生库，提供原生 Cookie 支持。它还提供了在特定 URL 下修改 Cookie 的方法。此插件已捆绑在 `@capacitor/core` 中。

## 配置

默认情况下，修补 `document.cookie` 以使用原生库的功能是禁用的。
如果您希望启用此功能，请在 `capacitor.config` 文件中修改以下配置。

| 属性          | 类型                 | 描述                                                                 | 默认值            |
| ------------- | -------------------- | ------------------------------------------------------------------------- | ------------------ |
| **`enabled`** | <code>boolean</code> | 启用修补 `document.cookie` 以使用原生库。 | <code>false</code> |

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

从 iOS 14 开始，默认情况下无法使用第三方 Cookie。请将以下行添加到您的 Info.plist 文件中，以获得更好的 iOS Cookie 支持。最多可以添加 10 个域名。

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

* [`getCookies(...)`](#getcookies)
* [`setCookie(...)`](#setcookie)
* [`deleteCookie(...)`](#deletecookie)
* [`clearCookies(...)`](#clearcookies)
* [`clearAllCookies()`](#clearallcookies)
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getCookies(...)

```typescript
getCookies(options?: GetCookieOptions) => Promise<HttpCookieMap>
```

| 参数         | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getcookieoptions">GetCookieOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#httpcookiemap">HttpCookieMap</a>&gt;</code>

--------------------


### setCookie(...)

```typescript
setCookie(options: SetCookieOptions) => Promise<void>
```

将 Cookie 写入设备。

| 参数         | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#setcookieoptions">SetCookieOptions</a></code> |

--------------------


### deleteCookie(...)

```typescript
deleteCookie(options: DeleteCookieOptions) => Promise<void>
```

从设备中删除 Cookie。

| 参数         | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#deletecookieoptions">DeleteCookieOptions</a></code> |

--------------------


### clearCookies(...)

```typescript
clearCookies(options: ClearCookieOptions) => Promise<void>
```

清除设备上指定 URL 的 Cookie。

| 参数         | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#clearcookieoptions">ClearCookieOptions</a></code> |

--------------------


### clearAllCookies()

```typescript
clearAllCookies() => Promise<void>
```

清除设备上的所有 Cookie。

--------------------


### 接口


#### HttpCookieMap


#### HttpCookie

| 属性        | 类型                | 描述              |
| ----------- | ------------------- | ------------------------ |
| **`url`**   | <code>string</code> | Cookie 的 URL。   |
| **`key`**   | <code>string</code> | Cookie 的键。   |
| **`value`** | <code>string</code> | Cookie 的值。 |


#### HttpCookieExtras

| 属性          | 类型                | 描述                      |
| ------------- | ------------------- | -------------------------------- |
| **`path`**    | <code>string</code> | 写入 Cookie 的路径。 |
| **`expires`** | <code>string</code> | Cookie 的过期日期。   |


### 类型别名


#### GetCookieOptions

<code><a href="#omit">Omit</a>&lt;<a href="#httpcookie">HttpCookie</a>, 'key' | 'value'&gt;</code>


#### Omit

构造一个类型，该类型具有 T 的属性，但不包括类型 K 中的属性。

<code><a href="#pick">Pick</a>&lt;T, <a href="#exclude">Exclude</a>&lt;keyof T, K&gt;&gt;</code>


#### Pick

从 T 中选取一组键在联合类型 K 中的属性

<code>{ [P in K]: T[P]; }</code>


#### Exclude

从 T 中排除那些可分配给 U 的类型

<code>T extends U ? never : T</code>


#### SetCookieOptions

<code><a href="#httpcookie">HttpCookie</a> & <a href="#httpcookieextras">HttpCookieExtras</a></code>


#### DeleteCookieOptions

<code><a href="#omit">Omit</a>&lt;<a href="#httpcookie">HttpCookie</a>, 'value'&gt;</code>


#### ClearCookieOptions

<code><a href="#omit">Omit</a>&lt;<a href="#httpcookie">HttpCookie</a>, 'key' | 'value'&gt;</code>

</docgen-api>