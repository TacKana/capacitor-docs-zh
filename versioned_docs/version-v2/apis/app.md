---
title: 应用
description: 应用 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/app
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

App API 处理高级别的应用状态和事件。

例如，此 API 在应用进入和离开前台时发出事件、处理深层链接、打开其他应用以及管理持久化的插件状态。

- [`exitApp()`](#exitapp)
- [`canOpenUrl(...)`](#canopenurl)
- [`openUrl(...)`](#openurl)
- [`getState()`](#getstate)
- [`getLaunchUrl()`](#getlaunchurl)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#接口)

## 关于 `canOpenUrl` 的说明

要使用 `canOpenUrl`，您需要在 `Info.plist` 的 `LSApplicationQueriesSchemes` 中设置应用将要查询的 URL scheme。

了解更多关于 [LSApplicationQueriesSchemes](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW14) 和 [配置 Info.plist](/ios/configuration.md) 的信息。

## 示例

```typescript
import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins;

App.addListener('appStateChange', (state: AppState) => {
  // state.isActive 包含活动状态
  console.log('应用状态已更改。是否活动？', state.isActive);
});

var ret = await App.canOpenUrl({ url: 'com.getcapacitor.myapp' });
console.log('能否打开 URL: ', ret.value);

ret = await App.openUrl({
  url: 'com.getcapacitor.myapp://page?id=ionicframework',
});
console.log('打开 URL 响应: ', ret);

ret = await App.getLaunchUrl();
if (ret && ret.url) {
  console.log('应用通过 URL 打开: ' + ret.url);
}
console.log('启动 URL: ', ret);

App.addListener('appUrlOpen', (data: any) => {
  console.log('应用通过 URL 打开: ' + data.url);
});

App.addListener('appRestoredResult', (data: any) => {
  console.log('恢复的状态:', data);
});
```

## Android：使用 appRestoredResult

在 Android 上，由于低端设备的内存限制，如果您的应用启动了新的 Activity，操作系统可能会终止您的应用以减少内存消耗。

例如，这意味着启动新 Activity 来拍照的 `Camera` API 可能无法将数据返回给您的应用。

为了避免这种情况，Capacitor 在启动时存储了所有恢复的 Activity 结果。您应该为 `appRestoredResult` 添加监听器，以处理在应用未运行时交付的任何插件调用结果。

一旦您获得了该结果（如果有的话），您可以更新 UI 以为用户恢复逻辑体验，例如导航或选择正确的标签页。

我们建议每个使用依赖外部 Activity 的插件（例如 Camera）的 Android 应用都处理此事件和流程。

## API

### exitApp()

```typescript
exitApp() => never
```

强制退出应用。这应仅与 Android 的 `backButton` 处理程序结合使用，以在导航完成时退出应用。

Ionic 自己处理此操作，因此如果您使用 Ionic，则无需调用此方法。

**返回：** <code>never</code>

---

### canOpenUrl(...)

```typescript
canOpenUrl(options: { url: string; }) => Promise<{ value: boolean; }>
```

检查是否可以通过给定的 URL 打开应用

| 参数 | 类型 |
| ------------- | ----------------------------- |
| **`options`** | `{ url: string; }` |

**返回：** `Promise<{ value: boolean; }>`

---

### openUrl(...)

```typescript
openUrl(options: { url: string; }) => Promise<{ completed: boolean; }>
```

通过给定的 URL 打开应用

| 参数 | 类型 |
| ------------- | ----------------------------- |
| **`options`** | `{ url: string; }` |

**返回：** `Promise<{ completed: boolean; }>`

---

### getState()

```typescript
getState() => Promise<AppState>
```

获取当前应用状态

**返回：** <code>Promise&lt;<a href="#appstate">AppState</a>&gt;</code>

---

### getLaunchUrl()

```typescript
getLaunchUrl() => Promise<AppLaunchUrl>
```

获取应用启动时的 URL（如果有的话）

**返回：** <code>Promise&lt;<a href="#applaunchurl">AppLaunchUrl</a>&gt;</code>

---

### addListener(...)

```typescript
addListener(eventName: 'appStateChange', listenerFunc: (state: AppState) => void) => PluginListenerHandle
```

监听应用活动状态的变化（应用是在前台还是后台）

| 参数 | 类型 |
| ------------------ | ----------------------------------------------------------------- |
| **`eventName`**    | <code>"appStateChange"</code>                                     |
| **`listenerFunc`** | <code>(state: <a href="#appstate">AppState</a>) =&gt; void</code> |

**返回：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'appUrlOpen', listenerFunc: (data: AppUrlOpen) => void) => PluginListenerHandle
```

监听应用的 URL 打开事件。这既处理自定义 URL scheme 链接，也处理您的应用处理的 URL（iOS 上的 Universal Links 和 Android 上的 App Links）

| 参数 | 类型 |
| ------------------ | -------------------------------------------------------------------- |
| **`eventName`**    | <code>"appUrlOpen"</code>                                            |
| **`listenerFunc`** | <code>(data: <a href="#appurlopen">AppUrlOpen</a>) =&gt; void</code> |

**返回：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'appRestoredResult', listenerFunc: (data: AppRestoredResult) => void) => PluginListenerHandle
```

如果应用启动时带有先前持久化的插件调用数据，例如在 Android 上当一个 Activity 返回到一个已关闭的应用时，此调用将返回应用启动时携带的任何数据，并转换为插件调用的结果形式。

| 参数 | 类型 |
| ------------------ | ---------------------------------------------------------------------------------- |
| **`eventName`**    | <code>"appRestoredResult"</code>                                                   |
| **`listenerFunc`** | <code>(data: <a href="#apprestoredresult">AppRestoredResult</a>) =&gt; void</code> |

**返回：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'backButton', listenerFunc: (data: AppUrlOpen) => void) => PluginListenerHandle
```

监听硬件返回按钮事件（仅 Android）。监听此事件将禁用默认的返回按钮行为，因此您可能需要手动调用 `window.history.back()`。如果您想关闭应用，请调用 `App.exitApp()`。

| 参数 | 类型 |
| ------------------ | -------------------------------------------------------------------- |
| **`eventName`**    | <code>"backButton"</code>                                            |
| **`listenerFunc`** | <code>(data: <a href="#appurlopen">AppUrlOpen</a>) =&gt; void</code> |

**返回：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除该插件的所有原生监听器

---

### 接口

#### AppState

| 属性 | 类型 |
| -------------- | -------------------- |
| **`isActive`** | <code>boolean</code> |

#### AppLaunchUrl

| 属性 | 类型 |
| --------- | ------------------- |
| **`url`** | <code>string</code> |

#### PluginListenerHandle

| 属性 | 类型 |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |

#### AppUrlOpen

| 属性 | 类型 | 描述 |
| -------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`url`**                  | <code>string</code>  | 应用被打开时使用的 URL |
| **`iosSourceApplication`** | <code>any</code>     | 打开应用的源应用（仅 iOS）https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623128-sourceapplication |
| **`iosOpenInPlace`**       | <code>boolean</code> | 应用是否应就地打开传递的文档，还是必须先拷贝。https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623123-openinplace |

#### AppRestoredResult

| 属性 | 类型 | 描述 |
| ---------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`pluginId`**   | <code>string</code>               | 此结果对应的 pluginId。例如 `Camera`。 |
| **`methodName`** | <code>string</code>               | 此结果对应的 methodName。例如 `getPhoto`。 |
| **`data`**       | <code>any</code>                  | 从插件传递的结果数据。这将是您通常在调用插件方法时期望得到的结果。例如 `CameraPhoto`。 |
| **`success`**    | <code>boolean</code>              | 布尔值，指示插件调用是否成功 |
| **`error`**      | `{ message: string; }` | 如果插件调用未成功，将包含错误消息 |
