---
title: Browser
description: 浏览器API
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
- [接口定义](#interfaces)

浏览器API可以轻松地在应用内打开浏览器会话，用于显示外部网页内容、处理认证流程等场景。

在iOS平台上，该API使用`SFSafariViewController`实现，完全符合主流oAuth服务对应用内浏览器的要求。

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

打开指定URL的页面

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#browseropenoptions">BrowserOpenOptions</a></code> |

---

### prefetch(...)

```typescript
prefetch(options: BrowserPrefetchOptions) => Promise<void>
```

预加载指定URL以提升初始加载速度。

仅在Android平台有效，在iOS上无实际效果

| 参数          | 类型                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#browserprefetchoptions">BrowserPrefetchOptions</a></code> |

---

### close()

```typescript
close() => Promise<void>
```

关闭已打开的浏览器窗口。仅在iOS和Web环境生效，其他平台无实际效果

---

### addListener(...)

```typescript
addListener(eventName: 'browserFinished', listenerFunc: (info: any) => void) => PluginListenerHandle
```

| 参数               | 类型                                |
| ------------------ | ----------------------------------- |
| **`eventName`**    | <code>"browserFinished"</code>      |
| **`listenerFunc`** | <code>(info: any) =&gt; void</code> |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'browserPageLoaded', listenerFunc: (info: any) => void) => PluginListenerHandle
```

| 参数               | 类型                                |
| ------------------ | ----------------------------------- |
| **`eventName`**    | <code>"browserPageLoaded"</code>    |
| **`listenerFunc`** | <code>(info: any) =&gt; void</code> |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除该插件的所有原生监听器

---

### Interfaces

#### BrowserOpenOptions

| 属性                    | 类型                                   | 描述                                                                        |
| ----------------------- | -------------------------------------- | --------------------------------------------------------------------------- |
| **`url`**               | <code>string</code>                    | 要打开的浏览器URL地址                                                       |
| **`windowName`**        | <code>string</code>                    | 仅限Web端：可选浏览器打开目标。遵循window.open的`target`属性。默认为\_blank |
| **`toolbarColor`**      | <code>string</code>                    | 设置工具栏颜色的16进制色值                                                  |
| **`presentationStyle`** | <code>"fullscreen" \| "popover"</code> | 仅限iOS端：浏览器展示样式。默认为全屏(fullscreen)                           |

#### BrowserPrefetchOptions

| 属性       | 类型                  |
| ---------- | --------------------- |
| **`urls`** | <code>string[]</code> |

#### PluginListenerHandle

| 属性         | 类型                       |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |
