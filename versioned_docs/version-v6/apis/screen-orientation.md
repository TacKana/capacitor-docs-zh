---
title: Screen Orientation Capacitor Plugin API
description: 屏幕方向API提供锁定和解锁屏幕方向的功能方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/screen-orientation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/screen-orientation/src/definitions.ts
sidebar_label: Screen Orientation
---

# @capacitor/screen-orientation

屏幕方向API提供与屏幕方向相关的信息和功能。

## 安装

```bash
npm install @capacitor/screen-orientation
npx cap sync
```

## iOS平台说明

屏幕方向锁定功能仅对Capacitor视图控制器有效，不会影响其他模态视图控制器（如浏览器插件打开的视图）。若需同时锁定模态视图的方向，可在应用的`AppDelegate.swift`文件中添加以下代码：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

### iPad方向锁定

默认情况下，iPad支持多任务处理且无法锁定方向。如需在iPad上锁定方向，需将`Info.plist`中的`Requires Full Screen`选项设为`YES`：

```
  <key>UIRequiresFullScreen</key>
  <true/>
```

## API接口

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

| 参数          | 类型                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#orientationlockoptions">OrientationLockOptions</a></code> |

**自版本:** 4.0.0

--------------------


### unlock()

```typescript
unlock() => Promise<void>
```

解除屏幕方向锁定。

**自版本:** 4uallyx0

--------------------


### addListener('screenOrientationChange', ...)

```typescript
addListener(eventName: 'screenOrientationChange', listenerFunc: (orientation: ScreenOrientationResult) => void) => Promise<PluginListenerHandle>
```

监听屏幕方向变化事件。

| 参数               | 类型                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'screenOrientationChange'</code>                                                                |
| **`listenerFunc`** | <code>(orientation: <a href="#screenorientationresult">ScreenOrientationResult</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

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

| 属性               | 类型                                                                | 说明                                                                                                                           |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`orientation`** | <code><a href="#orientationlocktype">OrientationLockType</a></code> | 注意：TypeScript v5.2+用户应从@capacitor/screen-orientation导入<a href="#orientationlocktype">OrientationLockType</a>类型定义。 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### 类型别名


#### OrientationLockType

<code>'any' | 'natural' | 'landscape' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary'</code>

</docgen-api>