---
title: Browser Capacitor 插件 API
description: Browser API 提供打开应用内浏览器和订阅浏览器事件的能力。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/browser/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/browser/src/definitions.ts
sidebar_label: Browser
translated: true
---

# @capacitor/browser

Browser API 提供打开应用内浏览器和订阅浏览器事件的能力。

在 iOS 上，它使用 `SFSafariViewController`，并符合领先的 OAuth 服务应用内浏览器的要求。

## 安装

```bash
npm install @capacitor/browser@latest-6
npx cap sync
```

## Android

### 变量

此插件将使用以下项目变量（在应用的 `variables.gradle` 文件中定义）：

- `androidxBrowserVersion`：`androidx.browser:browser` 的版本（默认值：`1.7.0`）

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
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### open(...)

```typescript
open(options: OpenOptions) => Promise<void>
```

使用指定选项打开一个页面。

| 参数              | 类型                                                |
| ----------------- | --------------------------------------------------- |
| **`options`**     | <code><a href="#openoptions">OpenOptions</a></code> |

**始于：** 1.0.0

--------------------


### close()

```typescript
close() => Promise<void>
```

Web 和 iOS 仅：关闭已打开的浏览器窗口。

在其他平台上无操作。

**始于：** 1.0.0

--------------------


### addListener('browserFinished', ...)

```typescript
addListener(eventName: 'browserFinished', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Android 和 iOS 仅：监听浏览器完成事件。
当用户关闭浏览器时触发。

| 参数                | 类型                           |
| ------------------- | ------------------------------ |
| **`eventName`**     | <code>'browserFinished'</code> |
| **`listenerFunc`**  | <code>() =&gt; void</code>     |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**始于：** 1.0.0

--------------------


### addListener('browserPageLoaded', ...)

```typescript
addListener(eventName: 'browserPageLoaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Android 和 iOS 仅：监听页面加载完成事件。
仅在传递给 open 方法的 URL 完成加载时触发。
后续页面加载不会触发此事件。

| 参数                | 类型                             |
| ------------------- | -------------------------------- |
| **`eventName`**     | <code>'browserPageLoaded'</code> |
| **`listenerFunc`**  | <code>() =&gt; void</code>       |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**始于：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**始于：** 1.0.0

--------------------


### Interfaces


#### OpenOptions

表示传递给 `open` 的选项。

| 属性                      | 类型                                   | 描述                                                                                                                                              | 始于   |
| ------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`url`**                 | <code>string</code>                    | 浏览器打开的 URL。                                                                                                                                | 1.0.0 |
| **`windowName`**          | <code>string</code>                    | 仅 Web：浏览器打开的可选目标。遵循 window.open 的 target 属性。默认为 _blank。在其他平台上被忽略。                                                | 1.0.0 |
| **`toolbarColor`**        | <code>string</code>                    | 工具栏颜色的十六进制颜色值。                                                                                                                       | 1.0.0 |
| **`presentationStyle`**   | <code>'fullscreen' \| 'popover'</code> | 仅 iOS：浏览器的呈现样式。默认为 fullscreen。在其他平台上被忽略。                                                                                 | 1.0.0 |
| **`width`**               | <code>number</code>                    | 仅 iOS：在 iPad 上使用 'popover' presentationStyle 时浏览器的宽度。在其他平台上被忽略。                                                           | 4.0.0 |
| **`height`**              | <code>number</code>                    | 仅 iOS：在 iPad 上使用 'popover' presentationStyle 时浏览器的高度。在其他平台上被忽略。                                                           | 4.0.0 |


#### PluginListenerHandle

| 属性           | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>
