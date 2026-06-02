---
title: 屏幕方向 - Capacitor 插件 API
description: 屏幕方向 API 提供锁定和解锁屏幕方向的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/src/definitions.ts
sidebar_label: 屏幕方向
translated: true
---

# @capacitor/screen-orientation

屏幕方向 API 提供与屏幕方向相关的信息和功能。

## 安装

```bash
npm install @capacitor/screen-orientation
npx cap sync
```

## iOS

锁定屏幕方向仅适用于 Capacitor 视图控制器（View Controller），不适用于其他被呈现的视图控制器（例如 Browser 插件呈现的控制器）。
要同时锁定被呈现的视图控制器，可以将此代码添加到应用的 `AppDelegate.swift` 文件中：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

### iPad 方向锁定

默认情况下，iPad 允许多任务处理，其方向无法被锁定。如果您需要在 iPad 上锁定方向，请将 `Requires Full Screen` 选项设置为 `YES`，方法是将以下内容添加到 `Info.plist`：

```
  <key>UIRequiresFullScreen</key>
  <true/>
```

## API

<docgen-index>

* [`orientation()`](#orientation)
* [`lock(...)`](#lock)
* [`unlock()`](#unlock)
* [`addListener('screenOrientationChange', ...)`](#addlistenerscreenorientationchange-)
* [`removeAllListeners()`](#removealllisteners)
* [接口](#interfaces)

</docgen-index>

<docgen-api>


### orientation()

```typescript
orientation() => Promise<ScreenOrientationResult>
```

返回当前屏幕方向。

**返回：** <code>Promise&lt;<a href="#screenorientationresult">ScreenOrientationResult</a>&gt;</code>

**起始版本：** 4.0.0

--------------------


### lock(...)

```typescript
lock(options: OrientationLockOptions) => Promise<void>
```

锁定屏幕方向。

| 参数            | 类型                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#orientationlockoptions">OrientationLockOptions</a></code> |

**起始版本：** 4.0.0

--------------------


### unlock()

```typescript
unlock() => Promise<void>
```

解锁屏幕方向。

**起始版本：** 4.0.0

--------------------


### addListener('screenOrientationChange', ...)

```typescript
addListener(eventName: 'screenOrientationChange', listenerFunc: (orientation: ScreenOrientationResult) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听屏幕方向变化。

| 参数                | 类型                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'screenOrientationChange'</code>                                                                |
| **`listenerFunc`** | <code>(orientation: <a href="#screenorientationresult">ScreenOrientationResult</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**起始版本：** 4.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除所有监听器。

**起始版本：** 4.0.0

--------------------


### 接口


#### ScreenOrientationResult

| 属性         | 类型                         |
| ---------- | ---------------------------- |
| **`type`** | <code>OrientationType</code> |


#### OrientationLockOptions

| 属性                | 类型                             |
| ----------------- | -------------------------------- |
| **`orientation`** | <code>OrientationLockType</code> |


#### PluginListenerHandle

| 属性           | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>
