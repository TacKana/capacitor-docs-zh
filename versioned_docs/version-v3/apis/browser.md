---
title: Browser Capacitor Plugin API
description: Browser API 提供了打开应用内浏览器及订阅浏览器事件的能力。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/browser/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/browser/src/definitions.ts
sidebar_label: Browser
---

# @capacitor/browser

Browser API 提供了打开应用内浏览器及订阅浏览器事件的能力。

在 iOS 平台上，该 API 使用 `SFSafariViewController`，并且符合主流 OAuth 服务对应用内浏览器的要求。

## 安装

```bash
npm install @capacitor/browser
npx cap sync
```

## Android 配置

### 变量配置

本插件将使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `$androidxBrowserVersion`: `androidx.browser:browser` 的版本号（默认值：`1.3.0`）

## 示例代码

```typescript
import { Browser } from '@capacitor/browser';

const openCapacitorSite = async () => {
  await Browser.open({ url: 'http://capacitorjs.com/' });
};
```

## API 文档

<docgen-index>

* [`open(...)`](#open)
* [`close()`](#close)
* [`addListener('browserFinished', ...)`](#addlistenerbrowserfinished-)
* [`addListener('browserPageLoaded', ...)`](#addlistenerbrowserpageloaded-)
* [`removeAllListeners()`](#removealllisteners)
* [接口定义](#接口定义)

</docgen-index>

<docgen-api>


### open(...)

```typescript
open(options: OpenOptions) => Promise<void>
```

使用指定参数打开页面。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#openoptions">OpenOptions</a></code> |

**自版本：** 1.0.0

--------------------


### close()

```typescript
close() => Promise<void>
```

仅限 Web & iOS 平台：关闭已打开的浏览器窗口。

在其他平台上调用此方法无效。

**自版本：** 1.0.0

--------------------


### addListener('browserFinished', ...)

```typescript
addListener(eventName: 'browserFinished', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

仅限 Android & iOS 平台：监听浏览器关闭完成事件。
当用户手动关闭浏览器时会触发该事件。

| 参数               | 类型                           |
| ------------------ | ------------------------------ |
| **`eventName`**    | <code>'browserFinished'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>     |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本：** 1.0.0

--------------------


### addListener('browserPageLoaded', ...)

```typescript
addListener(eventName: 'browserPageLoaded', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

仅限 Android & iOS 平台：监听页面加载完成事件。
该事件仅在通过 open 方法传入的 URL 完成加载时触发，
不会在后续页面加载时再次触发。

| 参数               | 类型                             |
| ------------------ | -------------------------------- |
| **`eventName`**    | <code>'browserPageLoaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>       |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除本插件的所有原生事件监听器。

**自版本：** 1.0.0

--------------------


### 接口定义


#### OpenOptions

表示传递给 `open` 方法的配置项。

| 属性                     | 类型                                   | 描述                                                                                                                                | 起始版本 |
| ----------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`url`**               | <code>string</code>                    | 浏览器要打开的 URL 地址                                                                                                    | 1.0.0 |
| **`windowName`**        | <code>string</code>                    | 仅限 Web 平台：浏览器窗口打开方式的可选目标。遵循 window.open 的 `target` 属性规则，默认为 _blank。其他平台忽略此参数。 | 1.0.0 |
| **`toolbarColor`**      | <code>string</code>                    | 设置工具栏颜色的十六进制值                                                                                             | 1.0.0 |
| **`presentationStyle`** | <code>'fullscreen' \| 'popover'</code> | 仅限 iOS 平台：浏览器窗口的展示样式。默认为全屏显示，其他平台忽略此参数。                                       | 1.0.0 |


#### PluginListenerHandle

| 属性          | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>