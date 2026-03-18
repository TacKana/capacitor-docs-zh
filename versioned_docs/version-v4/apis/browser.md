---
title: Browser Capacitor 插件 API
description: Browser API 提供了在应用内打开浏览器并订阅浏览器事件的能力。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/browser/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/browser/src/definitions.ts
sidebar_label: Browser
---

# @capacitor/browser

Browser API 提供了在应用内打开浏览器并订阅浏览器事件的能力。

在 iOS 上，该插件使用 `SFSafariViewController`，并符合主流 OAuth 服务对应用内浏览器的要求。

## 安装

```bash
npm install @capacitor/browser
npx cap sync
```

## Android

### 变量

此插件将使用以下项目变量（定义在你的应用的 `variables.gradle` 文件中）：

- `$androidxBrowserVersion`: `androidx.browser:browser` 的版本 (默认: `1.4.0`)

## 示例

```typescript
import { Browser } from '@capacitor/browser';

const openCapacitorSite = async () => {
  await Browser.open({ url: 'http://capacitorjs.com/' });
};
```

## API

<docgen-index>

* [`open(...)`](#open)
* [`close()`](#close)
* [`addListener('browserFinished', ...)`](#addlistenerbrowserfinished-)
* [`addListener('browserPageLoaded', ...)`](#addlistenerbrowserpageloaded-)
* [`removeAllListeners()`](#removealllisteners)
* [接口](#接口)

</docgen-index>

<docgen-api>


### open(...)

```typescript
open(options: OpenOptions) => Promise<void>
```

使用指定的选项打开一个页面。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#openoptions">OpenOptions</a></code> |

**自:** 1.0.0

--------------------


### close()

```typescript
close() => Promise<void>
```

仅限 Web 和 iOS 平台：关闭一个打开的浏览器窗口。

在其他平台上是空操作（无效果）。

**自:** 1.0.0

--------------------


### addListener('browserFinished', ...)

```typescript
addListener(eventName: 'browserFinished', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

仅限 Android 和 iOS 平台：监听浏览器完成事件。
当用户关闭浏览器时触发。

| 参数               | 类型                           |
| ------------------ | ------------------------------ |
| **`eventName`**    | <code>'browserFinished'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>     |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自:** 1.0.0

--------------------


### addListener('browserPageLoaded', ...)

```typescript
addListener(eventName: 'browserPageLoaded', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

仅限 Android 和 iOS 平台：监听页面加载完成事件。
此事件仅在传递给 open 方法的 URL 完成加载时触发。
对于后续的任何页面加载都不会触发。

| 参数               | Type                             |
| ------------------ | -------------------------------- |
| **`eventName`**    | <code>'browserPageLoaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>       |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**自:** 1.0.0

--------------------


### 接口


#### OpenOptions

表示传递给 `open` 方法的选项。

| 属性                    | 类型                                   | 描述                                                                                                                                | 自 |
| ----------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`url`**               | <code>string</code>                    | 浏览器将打开的 URL。                                                                                                    | 1.0.0 |
| **`windowName`**        | <code>string</code>                    | 仅限 Web 平台：浏览器打开的可选目标。遵循 window.open 的 `target` 属性。默认为 _blank。在其他平台上被忽略。 | 1.0.0 |
| **`toolbarColor`**      | <code>string</code>                    | 一个十六进制颜色值，用于设置工具栏颜色。                                                                                             | 1.0.0 |
| **`presentationStyle`** | <code>'fullscreen' \| 'popover'</code> | 仅限 iOS 平台：浏览器的呈现样式。默认为 fullscreen。在其他平台上被忽略。                                       | 1.0.0 |
| **`width`**             | <code>number</code>                    | 仅限 iOS 平台：当在 iPad 上使用 presentationStyle 'popover' 时，浏览器的宽度。在其他平台上被忽略。                               | 4.0.0 |
| **`height`**            | <code>number</code>                    | 仅限 iOS 平台：当在 iPad 上使用 presentationStyle 'popover' 时，浏览器的高度。在其他平台上被忽略。                              | 4.0.0 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>