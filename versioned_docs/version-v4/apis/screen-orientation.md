---
title: Screen Orientation Capacitor Plugin API
description: Screen Orientation API 提供锁定和解锁屏幕方向的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/src/definitions.ts
sidebar_label: Screen Orientation
---

# @capacitor/screen-orientation

Screen Orientation API 提供与屏幕方向相关的信息和功能。

## 安装

```bash
npm install @capacitor/screen-orientation
npx cap sync
```

## iOS

锁定屏幕方向功能仅适用于 Capacitor 的 View Controller，而不适用于其他正在呈现的 View Controller（例如由 Browser 插件呈现的控制器）。
若也要锁定这些呈现的 View Controller，可以将以下代码添加到应用的 `AppDelegate.swift` 文件中：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

### iPad 方向锁定

默认情况下，iPad 允许多任务处理且其方向无法锁定。如果你需要在 iPad 上锁定方向，请将 `Requires Full Screen` 选项设置为 `YES`，方法是在 `Info.plist` 中添加以下内容：

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
* [接口](#接口)

</docgen-index>

<docgen-api>


### orientation()

```typescript
orientation() => Promise<ScreenOrientationResult>
```

获取当前屏幕方向。

**返回值：** <code>Promise&lt;<a href="#screenorientationresult">ScreenOrientationResult</a>&gt;</code>

**自：** 4.0.0

--------------------


### lock(...)

```typescript
lock(options: OrientationLockOptions) => Promise<void>
```

锁定屏幕方向。

| 参数           | 类型                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#orientationlockoptions">OrientationLockOptions</a></code> |

**自：** 4.0.0

--------------------


### unlock()

```typescript
unlock() => Promise<void>
```

解锁屏幕方向。

**自：** 4.0.0

--------------------


### addListener('screenOrientationChange', ...)

```typescript
addListener(eventName: 'screenOrientationChange', listenerFunc: (orientation: ScreenOrientationResult) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听屏幕方向变化。

| 参数                | 类型                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| **`eventName`**     | <code>'screenOrientationChange'</code>                                                                |
| **`listenerFunc`**  | <code>(orientation: <a href="#screenorientationresult">ScreenOrientationResult</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自：** 4.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除所有监听器。

**自：** 4.0.0

--------------------


### 接口


#### ScreenOrientationResult

| 属性         | 类型                         |
| ------------ | ---------------------------- |
| **`type`**   | <code>OrientationType</code> |


#### OrientationLockOptions

| 属性                 | 类型                             |
| -------------------- | -------------------------------- |
| **`orientation`**    | <code>OrientationLockType</code> |


#### PluginListenerHandle

| 属性           | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>