---
title: Browser Capacitor Plugin API
description: Browser API 提供了打开应用内浏览器和订阅浏览器事件的能力。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/browser/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/browser/src/definitions.ts
sidebar_label: Browser
---

# @capacitor/browser

Browser API 提供了打开应用内浏览器和订阅浏览器事件的能力。

在 iOS 上，该 API 使用 `SFSafariViewController`，符合主流 OAuth 服务对应用内浏览器的要求。

## 安装

```bash
npm install @capacitor/browser@latest-5
npx cap sync
```

## Android

### 变量配置

本插件会使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `androidxBrowserVersion`: `androidx.browser:browser` 的版本（默认值：`1.5.0`）

## 示例

```typescript
import { Browser } from '@capacitor/browser';

const openCapacitorSite = async () => {
  await Browser.open({ url: 'http://capacitorjs.com/' });
};
```

## API 文档

<docgen-index>

- [`open(...)`](#open)
- [`close()`](#close)
- [`addListener('browserFinished', ...)`](#addlistenerbrowserfinished-)
- [`addListener('browserPageLoaded', ...)`](#addlistenerbrowserpageloaded-)
- [`removeAllListeners()`](#removealllisteners)
- [接口定义](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### open(...)

```typescript
open(options: OpenOptions) => Promise<void>
```

使用指定选项打开网页。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#openoptions">OpenOptions</a></code> |

**自版本:** 1.0.0

---

### close()

```typescript
close() => Promise<void>
```

仅限 Web 和 iOS：关闭已打开的浏览器窗口。

在其他平台上无操作。

**自版本:** 1.0.0

---

### addListener('browserFinished', ...)

```typescript
addListener(eventName: 'browserFinished', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

仅限 Android 和 iOS：监听浏览器关闭事件。
当用户关闭浏览器时会触发该事件。

| 参数               | 类型                           |
| ------------------ | ------------------------------ |
| **`eventName`**    | <code>'browserFinished'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>     |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

---

### addListener('browserPageLoaded', ...)

```typescript
addListener(eventName: 'browserPageLoaded', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

仅限 Android 和 iOS：监听页面加载完成事件。
只有当传递给 open 方法的 URL 完成加载时才会触发。
后续页面加载不会触发此事件。

| 参数               | Type                             |
| ------------------ | -------------------------------- |
| **`eventName`**    | <code>'browserPageLoaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>       |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除该插件的所有原生监听器。

**自版本:** 1.0.0

---

### Interfaces

#### OpenOptions

表示传递给 `open` 方法的选项。

| 属性                    | 类型                                   | 描述                                                                                                  | 自版本 |
| ----------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------ |
| **`url`**               | <code>string</code>                    | 浏览器打开的 URL 地址                                                                                 | 1.0.0  |
| **`windowName`**        | <code>string</code>                    | 仅限 Web：可选浏览器打开目标。遵循 window.open 的 `target` 属性。默认为 \_blank。其他平台忽略此选项。 | 1.0.0  |
| **`toolbarColor`**      | <code>string</code>                    | 设置工具栏颜色的十六进制值                                                                            | 1.0.0  |
| **`presentationStyle`** | <code>'fullscreen' \| 'popover'</code> | 仅限 iOS：浏览器呈现样式。默认为全屏。其他平台忽略此选项。                                            | 1.0.0  |
| **`width`**             | <code>number</code>                    | 仅限 iOS：在使用 presentationStyle 'popover' 时 iPad 上浏览器的宽度。其他平台忽略此选项。             | 4.0.0  |
| **`height`**            | <code>number</code>                    | 仅限 iOS：在使用 presentationStyle 'popover' 时 iPad 上浏览器的高度。其他平台忽略此选项。             | 4.0.0  |

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>
