---
title: Browser
description: 浏览器 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/browser
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

- [`open(...)`](#open)
- [`prefetch(...)`](#prefetch)
- [`close()`](#close)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#接口)

浏览器 API 可以轻松地在应用内打开浏览器会话，用于显示外部网页内容、处理身份验证流程等。

在 iOS 上，此 API 使用 `SFSafariViewController`，并符合主流 OAuth 服务的应用内浏览器要求。

```typescript
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

await Browser.open({ url: 'http://capacitorjs.com/' });
```

## API

### open(...)

```typescript
open(options: BrowserOpenOptions) => Promise<void>
```

使用指定 URL 打开页面

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browseropenoptions">BrowserOpenOptions</a></code> |

---

### prefetch(...)

```typescript
prefetch(options: BrowserPrefetchOptions) => Promise<void>
```

向浏览器提示将访问指定 URL，以改善初始加载时间。

仅在 Android 上有效，在 iOS 上无操作

| 参数          | 类型                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#browserprefetchoptions">BrowserPrefetchOptions</a></code> |

---

### close()

```typescript
close() => Promise<void>
```

关闭已打开的浏览器。仅在 iOS 和 Web 环境下有效，其他平台无操作

---

### addListener(...)

```typescript
addListener(eventName: 'browserFinished', listenerFunc: (info: any) => void) => PluginListenerHandle
```

| 参数               | 类型                                |
| ------------------ | ----------------------------------- |
| **`eventName`**    | <code>"browserFinished"</code>      |
| **`listenerFunc`** | <code>(info: any) =&gt; void</code> |

**返回值：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'browserPageLoaded', listenerFunc: (info: any) => void) => PluginListenerHandle
```

| 参数               | 类型                                |
| ------------------ | ----------------------------------- |
| **`eventName`**    | <code>"browserPageLoaded"</code>    |
| **`listenerFunc`** | <code>(info: any) =&gt; void</code> |

**返回值：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除此插件的所有原生监听器

---

### 接口

#### BrowserOpenOptions

| 属性                     | 类型                                   | 描述                                                                                                     |
| ------------------------ | -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **`url`**                | <code>string</code>                    | 浏览器要打开的 URL                                                                                       |
| **`windowName`**         | <code>string</code>                    | 仅限 Web：浏览器打开的可选目标。遵循 window.open 的 `target` 属性。默认为 \_blank                        |
| **`toolbarColor`**       | <code>string</code>                    | 设置工具栏颜色的十六进制颜色值                                                                           |
| **`presentationStyle`**  | <code>"fullscreen" \| "popover"</code> | 仅限 iOS：浏览器的呈现样式。默认为全屏显示                                                               |

#### BrowserPrefetchOptions

| 属性         | 类型                  |
| ------------ | --------------------- |
| **`urls`**   | <code>string[]</code> |

#### PluginListenerHandle

| 属性           | 类型                       |
| -------------- | -------------------------- |
| **`remove`**   | <code>() =&gt; void</code> |
