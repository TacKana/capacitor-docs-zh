---
title: 屏幕方向 Capacitor 插件 API
description: 屏幕方向 API 提供锁定和解锁屏幕方向的功能。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/screen-orientation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/screen-orientation/src/definitions.ts
sidebar_label: 屏幕方向
---

# @capacitor/screen-orientation

屏幕方向 API 提供与屏幕方向相关的信息和功能。

## 安装

```bash
npm install @capacitor/screen-orientation@latest-5
npx cap sync
```

## iOS 注意事项

屏幕方向锁定仅对 Capacitor 的视图控制器有效，但对其他呈现的视图控制器（如由浏览器插件呈现的控制器）无效。若要同时锁定呈现的视图控制器，可在应用的 `AppDelegate.swift` 文件中添加以下代码：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

### iPad 方向锁定

默认情况下，iPad 允许多任务处理且其方向无法锁定。如需在 iPad 上锁定方向，请在 `Info.plist` 中添加以下配置，将 `Requires Full Screen` 选项设为 `YES`：

```
  <key>UIRequiresFullScreen</key>
  <true/>
```

## API 接口

<docgen-index>

* [`orientation()`](#orientation)
* [`lock(...)`](#lock)
* [`unlock()`](#unlock)
* [`addListener('screenOrientationChange', ...)`](#addlistenerscreenorientationchange-)
* [`removeAllListeners()`](#removealllisteners)
* [接口定义](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### orientation()

```typescript
orientation() => Promise<ScreenOrientationResult>
```

获取当前屏幕方向。

**返回值:** <code>Promise&lt;<a href="#screenorientationresult">ScreenOrientationResult</a>&gt;</code>

**自版本:** 4.0.0

--------------------


### lock(...)

```typescript
lock(options: OrientationLockOptions) => Promise<void>
```

锁定屏幕方向。

| 参数         | 类型                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#orientationlockoptions">OrientationLockOptions</a></code> |

**自版本:** 4.0.0

--------------------


### unlock()

```typescript
unlock() => Promise<void>
```

解除屏幕方向锁定。

**自版本:** 4.0.0

--------------------


### addListener('screenOrientationChange', ...)

```typescript
addListener(eventName: 'screenOrientationChange', listenerFunc: (orientation: ScreenOrientationResult) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听屏幕方向变化事件。

| 参数              | 类型                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'screenOrientationChange'</code>                                                                |
| **`listenerFunc`** | <code>(orientation: <a href="#screenorientationresult">ScreenOrientationResult</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 4.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除所有事件监听器。

**自版本:** 4.0.0

--------------------


### 接口定义


#### ScreenOrientationResult

| 属性       | 类型                         |
| ---------- | ---------------------------- |
| **`type`** | <code>OrientationType</code> |


#### OrientationLockOptions

| 属性              | 类型                                                                | 说明                                                                                                                           |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`orientation`** | <code><a href="#orientationlocktype">OrientationLockType</a></code> | 注意：TypeScript v5.2+ 用户应从 @capacitor/screen-orientation 导入 <a href="#orientationlocktype">OrientationLockType</a> 类型。 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### 类型别名


#### OrientationLockType

<code>'any' | 'natural' | 'landscape' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary'</code>

</docgen-api>