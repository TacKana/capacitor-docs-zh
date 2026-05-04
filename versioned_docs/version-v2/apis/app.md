---
title: App
description: App API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/app
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

App API 用于管理应用程序的高层状态和事件。

例如，该 API 会在应用进入或离开前台时触发事件，处理深度链接（deeplink）、打开其他应用，以及管理持久化的插件状态。

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
- [接口说明](#接口)

## 关于 `canOpenUrl` 的注意事项

要使用 `canOpenUrl`，你需要在 `Info.plist` 文件的 `LSApplicationQueriesSchemes` 中设置你的应用将要查询的 URL 方案（scheme）。

详细了解 [LSApplicationQueriesSchemes](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW14) 和 [配置 Info.plist](/ios/configuration.md)。

## 示例

```typescript
import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins;

App.addListener('appStateChange', (state: AppState) => {
  // state.isActive 包含当前活跃状态
  console.log('应用状态已变更。是否处于活跃状态？', state.isActive);
});

var ret = await App.canOpenUrl({ url: 'com.getcapacitor.myapp' });
console.log('能否打开此 URL：', ret.value);

ret = await App.openUrl({
  url: 'com.getcapacitor.myapp://page?id=ionicframework',
});
console.log('打开 URL 的响应：', ret);

ret = await App.getLaunchUrl();
if (ret && ret.url) {
  console.log('应用通过此 URL 打开：' + ret.url);
}
console.log('启动 URL：', ret);

App.addListener('appUrlOpen', (data: any) => {
  console.log('应用通过此 URL 打开：' + data.url);
});

App.addListener('appRestoredResult', (data: any) => {
  console.log('恢复的状态：', data);
});
```

## Android：使用 appRestoredResult

在 Android 上，由于低端设备的内存限制，如果你的应用启动了一个新的活动（Activity），操作系统可能会为了减少内存消耗而终止你的应用。

例如，这意味着 `Camera` API（它会启动一个新的 Activity 来拍摄照片）可能无法将数据返回给你的应用。

为避免这种情况，Capacitor 会在应用启动时存储所有恢复的活动结果。你应该为 `appRestoredResult` 添加监听器，以便处理在应用未运行时传递的任何插件调用结果。

一旦你获得了这个结果（如果有的话），就可以更新用户界面以恢复用户的逻辑体验，例如导航或选择正确的标签页。

我们建议每个使用依赖外部 Activity（例如 Camera）的插件的 Android 应用都处理此事件和流程。

## API

### exitApp()

```typescript
exitApp() => never
```

强制退出应用。此方法应仅与 Android 的 `backButton` 处理程序结合使用，以便在导航完成时退出应用。

Ionic 自身会处理此逻辑，因此如果你使用 Ionic，通常不需要调用此方法。

**返回值：** <code>never</code>

---

### canOpenUrl(...)

```typescript
canOpenUrl(options: { url: string; }) => Promise<{ value: boolean; }>
```

检查是否可以通过给定的 URL 打开应用

| 参数            | 类型                          |
| --------------- | ----------------------------- |
| **`options`**   | `{ url: string; }`            |

**返回值：** `Promise<{ value: boolean; }>`

---

### openUrl(...)

```typescript
openUrl(options: { url: string; }) => Promise<{ completed: boolean; }>
```

通过给定的 URL 打开应用

| 参数            | 类型                          |
| --------------- | ----------------------------- |
| **`options`**   | `{ url: string; }`            |

**返回值：** `Promise<{ completed: boolean; }>`

---

### getState()

```typescript
getState() => Promise<AppState>
```

获取当前应用状态

**返回值：** <code>Promise&lt;<a href="#appstate">AppState</a>&gt;</code>

---

### getLaunchUrl()

```typescript
getLaunchUrl() => Promise<AppLaunchUrl>
```

获取应用启动时使用的 URL（如果有的话）

**返回值：** <code>Promise&lt;<a href="#applaunchurl">AppLaunchUrl</a>&gt;</code>

---

### addListener(...)

```typescript
addListener(eventName: 'appStateChange', listenerFunc: (state: AppState) => void) => PluginListenerHandle
```

监听应用活跃状态的变化（无论应用处于前台还是后台）

| 参数                 | 类型                                                              |
| -------------------- | ----------------------------------------------------------------- |
| **`eventName`**      | <code>"appStateChange"</code>                                     |
| **`listenerFunc`**   | <code>(state: <a href="#appstate">AppState</a>) =&gt; void</code> |

**返回值：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'appUrlOpen', listenerFunc: (data: AppUrlOpen) => void) => PluginListenerHandle
```

监听应用的 URL 打开事件。这既包括自定义 URL 方案链接，也包括你的应用处理的 URL（iOS 上的 Universal Links 和 Android 上的 App Links）

| 参数                 | 类型                                                                 |
| -------------------- | -------------------------------------------------------------------- |
| **`eventName`**      | <code>"appUrlOpen"</code>                                            |
| **`listenerFunc`**   | <code>(data: <a href="#appurlopen">AppUrlOpen</a>) =&gt; void</code> |

**返回值：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'appRestoredResult', listenerFunc: (data: AppRestoredResult) => void) => PluginListenerHandle
```

如果应用启动时带有先前持久化的插件调用数据（例如在 Android 上，当一个 Activity 返回到已被关闭的应用时），此调用将返回应用启动时携带的任何数据，这些数据会被转换为插件调用的结果形式。

| 参数                 | 类型                                                                               |
| -------------------- | ---------------------------------------------------------------------------------- |
| **`eventName`**      | <code>"appRestoredResult"</code>                                                   |
| **`listenerFunc`**   | <code>(data: <a href="#apprestoredresult">AppRestoredResult</a>) =&gt; void</code> |

**返回值：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'backButton', listenerFunc: (data: AppUrlOpen) => void) => PluginListenerHandle
```

监听硬件返回按钮事件（仅限 Android 设备）。监听此事件会禁用默认的返回按钮行为，因此您可能需要手动调用 `window.history.back()`。
如果您想关闭应用，请调用 `App.exitApp()`。

| 参数                  | 类型                                                                 |
| --------------------- | -------------------------------------------------------------------- |
| **`eventName`**       | <code>"backButton"</code>                                            |
| **`listenerFunc`**    | <code>(data: <a href="#appurlopen">AppUrlOpen</a>) =&gt; void</code> |

**返回值：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除此插件的所有原生监听器

---

### 接口

#### AppState

| 属性              | 类型                 |
| ----------------- | -------------------- |
| **`isActive`**    | <code>boolean</code> |

#### AppLaunchUrl

| 属性          | 类型                |
| ------------- | ------------------- |
| **`url`**     | <code>string</code> |

#### PluginListenerHandle

| 属性            | 类型                       |
| --------------- | -------------------------- |
| **`remove`**    | <code>() =&gt; void</code> |

#### AppUrlOpen

| 属性                              | 类型                 | 描述                                                                                                                                                                      |
| --------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`url`**                         | <code>string</code>  | 应用被打开时所使用的 URL                                                                                                                                                  |
| **`iosSourceApplication`**        | <code>any</code>     | 打开应用的源应用程序（仅限 iOS） https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623128-sourceapplication                         |
| **`iosOpenInPlace`**              | <code>boolean</code> | 指示应用是应在原处打开传递的文档还是必须先复制它。 https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623123-openinplace |

#### AppRestoredResult

| 属性                | 类型                              | 描述                                                                                                                                       |
| ------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **`pluginId`**      | <code>string</code>               | 此结果对应的插件 ID。例如 `Camera`。                                                                                                       |
| **`methodName`**    | <code>string</code>               | 此结果对应的方法名。例如 `getPhoto`。                                                                                                      |
| **`data`**          | <code>any</code>                  | 从插件传递过来的结果数据。这通常是您正常调用插件方法时所期望的结果。例如 `CameraPhoto`。                                                  |
| **`success`**       | <code>boolean</code>              | 布尔值，指示插件调用是否成功                                                                                                               |
| **`error`**         | `{ message: string; }` | 如果插件调用未成功，将包含错误消息                                                                                                         |