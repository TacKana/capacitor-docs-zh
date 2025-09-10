---
title: App Capacitor Plugin API
description: App API 用于处理应用的高级状态和事件。例如，当应用进入或离开前台时触发事件，处理深度链接，打开其他应用以及管理持久化的插件状态。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/app/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/app/src/definitions.ts
sidebar_label: App
---

# @capacitor/app

App API 用于处理应用的高级状态和事件。例如，当应用进入或离开前台时触发事件，处理深度链接，打开其他应用以及管理持久化的插件状态。

## 安装

```bash
npm install @capacitor/app
npx cap sync
```

## iOS 配置

如需通过自定义 URL Scheme 打开应用，需先注册该 Scheme。可通过编辑 [`Info.plist`](https://capacitorjs.com/docs/v3/ios/configuration#configuring-infoplist) 文件并添加以下内容实现。

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>com.getcapacitor.capacitor</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>mycustomscheme</string>
    </array>
  </dict>
</array>
```

## Android 配置

如需通过自定义 URL Scheme 打开应用，需先注册该 Scheme。可在 `AndroidManifest.xml` 文件的 `activity` 部分添加以下配置实现。

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="@string/custom_url_scheme" />
</intent-filter>
```

`custom_url_scheme` 的值存储在 `strings.xml` 中。当添加 Android 平台时，`@capacitor/cli` 会自动将应用包名设为默认值，也可通过编辑 `strings.xml` 文件进行修改。

## 使用示例

```typescript
import { App } from '@capacitor/app';

App.addListener('appStateChange', ({ isActive }) => {
  console.log('应用状态变化。是否活跃？', isActive);
});

App.addListener('appUrlOpen', (data) => {
  console.log('应用通过以下 URL 打开:', data);
});

App.addListener('appRestoredResult', (data) => {
  console.log('恢复的状态:', data);
});

const checkAppLaunchUrl = async () => {
  const { url } = await App.getLaunchUrl();

  console.log('应用通过以下 URL 启动: ' + url);
};
```

## API 文档

<docgen-index>

- [`exitApp()`](#exitapp)
- [`getInfo()`](#getinfo)
- [`getState()`](#getstate)
- [`getLaunchUrl()`](#getlaunchurl)
- [`minimizeApp()`](#minimizeapp)
- [`addListener('appStateChange', ...)`](#addlistenerappstatechange-)
- [`addListener('appUrlOpen', ...)`](#addlistenerappurlopen-)
- [`addListener('appRestoredResult', ...)`](#addlistenerapprestoredresult-)
- [`addListener('backButton', ...)`](#addlistenerbackbutton-)
- [`removeAllListeners()`](#removealllisteners)
- [接口定义](#interfaces)
- [类型别名](#type-aliases)

</docgen-index>

<docgen-api>

### exitApp()

```typescript
exitApp() => never
```

强制退出应用。此方法通常与 Android 的 `backButton` 事件处理器配合使用，在导航完成后退出应用。

如果使用 Ionic 框架，Ionic 已自行处理此逻辑，通常无需调用此方法。

**返回:** <code>never</code>

**版本:** 1.0.0

---

### getInfo()

```typescript
getInfo() => Promise<AppInfo>
```

获取应用基础信息。

**返回:** <code>Promise&lt;<a href="#appinfo">AppInfo</a>&gt;</code>

**版本:** 1.0.0

---

### getState()

```typescript
getState() => Promise<AppState>
```

获取当前应用状态。

**返回:** <code>Promise&lt;<a href="#appstate">AppState</a>&gt;</code>

**版本:** 1.0.0

---

### getLaunchUrl()

```typescript
getLaunchUrl() => Promise<AppLaunchUrl | undefined>
```

获取启动应用的 URL（如果有）。

**返回:** <code>Promise&lt;<a href="#applaunchurl">AppLaunchUrl</a>&gt;</code>

**版本:** 1.0.0

---

### minimizeApp()

```typescript
minimizeApp() => Promise<void>
```

最小化应用。

仅 Android 平台可用。

**版本:** 1.1.0

---

### addListener('appStateChange', ...)

```typescript
addListener(eventName: 'appStateChange', listenerFunc: StateChangeListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用活跃状态变化（应用是否在前台运行）

| 参数               | 类型                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'appStateChange'</code>                                       |
| **`listenerFunc`** | <code><a href="#statechangelistener">StateChangeListener</a></code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本:** 1.0.0

---

### addListener('appUrlOpen', ...)

```typescript
addListener(eventName: 'appUrlOpen', listenerFunc: URLOpenListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用 URL 打开事件。同时处理自定义 URL Scheme 和通用链接（iOS 的 Universal Links 和 Android 的 App Links）

| 参数               | 类型                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'appUrlOpen'</code>                                   |
| **`listenerFunc`** | <code><a href="#urlopenlistener">URLOpenListener</a></code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本:** 1.0.0

---

### addListener('appRestoredResult', ...)

```typescript
addListener(eventName: 'appRestoredResult', listenerFunc: RestoredListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当应用被关闭后通过持久化的插件调用数据重新启动时（如 Android 上 activity 返回到已关闭的应用），此方法会返回应用启动时携带的所有数据，并转换为插件调用的结果格式。

在 Android 低端设备上，由于内存限制，当应用启动新 activity 时，操作系统可能为减少内存消耗而终止应用进程。

例如，Camera API 会启动新 activity 拍摄照片，可能无法将数据返回给应用。

为避免此问题，Capacitor 会在启动时存储所有恢复的 activity 结果。建议添加 `appRestoredResult` 监听器来处理应用未运行时传递的插件调用结果。

获取结果后（如有），可更新 UI 以恢复用户的逻辑体验，如导航或选择正确的标签页。

建议所有依赖外部 Activity 的 Android 应用（例如使用 Camera）都配置此事件处理。

| 参数               | 类型                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`eventName`**    | <code>'appRestoredResult'</code>                              |
| **`listenerFunc`** | <code><a href="#restoredlistener">RestoredListener</a></code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本:** 1.0.0

---

### addListener('backButton', ...)

```typescript
addListener(eventName: 'backButton', listenerFunc: BackButtonListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听硬件返回按钮事件（仅 Android）。监听此事件会禁用默认返回行为，可能需要手动调用 `window.history.back()`。如需关闭应用，请调用 `App.exitApp()`。

| 参数               | 类型                                                              |
| ------------------ | ----------------------------------------------------------------- |
| **`eventName`**    | <code>'backButton'</code>                                         |
| **`listenerFunc`** | <code><a href="#backbuttonlistener">BackButtonListener</a></code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本:** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件所有的原生监听器

**版本:** 1.0.0

---

### Interfaces

#### AppInfo

| 属性          | 类型                | 描述                                                                    | 版本  |
| ------------- | ------------------- | ----------------------------------------------------------------------- | ----- |
| **`name`**    | <code>string</code> | 应用名称                                                                | 1.0.0 |
| **`id`**      | <code>string</code> | 应用标识符。iOS 上是 Bundle Identifier，Android 上是 Application ID     | 1.0.0 |
| **`build`**   | <code>string</code> | 构建版本号。iOS 上是 CFBundleVersion，Android 上是 versionCode          | 1.0.0 |
| **`version`** | <code>string</code> | 应用版本。iOS 上是 CFBundleShortVersionString，Android 上是 versionName | 1.0.0 |

#### AppState

| 属性           | 类型                 | 描述                     | 版本  |
| -------------- | -------------------- | ------------------------ | ----- |
| **`isActive`** | <code>boolean</code> | 表示应用是否处于活跃状态 | 1.0.0 |

#### AppLaunchUrl

| 属性      | 类型                | 描述               | 版本  |
| --------- | ------------------- | ------------------ | ----- |
| **`url`** | <code>string</code> | 用于打开应用的 URL | 1.0.0 |

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

#### URLOpenListenerEvent

| 属性                       | 类型                 | 描述                                                                                                                                  | 版本  |
| -------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`url`**                  | <code>string</code>  | 打开应用的 URL                                                                                                                        | 1.0.0 |
| **`iosSourceApplication`** | <code>any</code>     | 打开应用的源应用（仅 iOS） https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623128-sourceapplication   | 1.0.0 |
| **`iosOpenInPlace`**       | <code>boolean</code> | 指示应用应直接打开文档还是需先复制 https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623123-openinplace | 1.0.0 |

#### RestoredListenerEvent

| 属性             | 类型                   | 描述                                                           | 版本  |
| ---------------- | ---------------------- | -------------------------------------------------------------- | ----- |
| **`pluginId`**   | <code>string</code>    | 对应的插件 ID，如 `Camera`                                     | 1.0.0 |
| **`methodName`** | <code>string</code>    | 对应的方法名，如 `getPhoto`                                    | 1.0.0 |
| **`data`**       | <code>any</code>       | 插件返回的数据，与正常调用插件方法的结果一致，如 `CameraPhoto` | 1.0.0 |
| **`success`**    | <code>boolean</code>   | 表示插件调用是否成功                                           | 1.0.0 |
| **`error`**      | `{ message: string; }` | 调用失败时的错误信息                                           | 1.0.0 |

#### BackButtonListenerEvent

| 属性            | 类型                 | 描述                                                       | 版本  |
| --------------- | -------------------- | ---------------------------------------------------------- | ----- |
| **`canGoBack`** | <code>boolean</code> | 指示浏览器是否可以后退。当历史堆栈位于第一条记录时为 false | 1.0.0 |

### Type Aliases

#### StateChangeListener

<code>
  (state: <a href="#appstate">AppState</a>): void
</code>

#### URLOpenListener

<code>
  (event: <a href="#urlopenlistenerevent">URLOpenListenerEvent</a>): void
</code>

#### RestoredListener

<code>
  (event: <a href="#restoredlistenerevent">RestoredListenerEvent</a>): void
</code>

#### BackButtonListener

<code>
  (event: <a href="#backbuttonlistenerevent">BackButtonListenerEvent</a>): void
</code>

</docgen-api>
