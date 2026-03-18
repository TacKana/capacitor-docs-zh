---
title: Screen Orientation Capacitor 插件 API
description: Screen Orientation API 提供了锁定和解锁屏幕方向的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/README.md
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

锁定屏幕方向仅对 Capacitor 视图控制器（ViewController）有效，对其他展示的视图控制器（例如 Browser 插件展示的视图控制器）无效。若需同时锁定展示的视图控制器，可以将以下代码添加到应用的 `AppDelegate.swift` 文件中：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

### iPad 方向锁定

默认情况下，iPad 允许多任务处理，且其方向无法被锁定。若需要在 iPad 上锁定方向，请将 `Requires Full Screen` 选项设为 `YES`，即在 `Info.plist` 中添加以下内容：

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
* [类型别名](#类型别名)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### orientation()

```typescript
orientation() => Promise<ScreenOrientationResult>
```

返回当前屏幕方向。

**返回值：** <code>Promise&lt;<a href="#screenorientationresult">ScreenOrientationResult</a>&gt;</code>

**自版本：** 4.0.0

--------------------


### lock(...)

```typescript
lock(options: OrientationLockOptions) => Promise<void>
```

锁定屏幕方向。

从 Android targetSdk 36 开始，此方法在 Android 16 及更高版本的大屏幕设备（例如平板电脑）上无效。你可以通过在 `AndroidManifest.xml` 中的 `<application>` 或 `<activity>` 标签内添加 `&lt;property android:name="android.window.PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY" android:value="true" /&gt;` 来选择退出此行为。但请注意，此退出选项是临时的，在 Android 17 上将不再有效。Android 不鼓励为大屏幕设备设置特定的方向。常规的 Android 手机不受此更改影响。更多信息请查看 Android 文档：https://developer.android.com/about/versions/16/behavior-changes-16#adaptive-layouts

| 参数           | 类型                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#orientationlockoptions">OrientationLockOptions</a></code> |

**自版本：** 4.0.0

--------------------


### unlock()

```typescript
unlock() => Promise<void>
```

解锁屏幕方向。

**自版本：** 4.0.0

--------------------


### addListener('screenOrientationChange', ...)

```typescript
addListener(eventName: 'screenOrientationChange', listenerFunc: (orientation: ScreenOrientationResult) => void) => Promise<PluginListenerHandle>
```

监听屏幕方向变化。

| 参数               | 类型                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'screenOrientationChange'</code>                                                                |
| **`listenerFunc`** | <code>(orientation: <a href="#screenorientationresult">ScreenOrientationResult</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 4.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除所有监听器。

**自版本：** 4.0.0

--------------------


### 接口


#### ScreenOrientationResult

| 属性         | 类型                         |
| ------------ | ---------------------------- |
| **`type`**   | <code>OrientationType</code> |


#### OrientationLockOptions

| 属性                  | 类型                                                                | 描述                                                                                                                           |
| --------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`orientation`**     | <code><a href="#orientationlocktype">OrientationLockType</a></code> | 注意：TypeScript v5.2+ 用户应从 @capacitor/screen-orientation 导入 <a href="#orientationlocktype">OrientationLockType</a>。 |


#### PluginListenerHandle

| 属性           | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |


### 类型别名


#### OrientationLockType

<code>'any' | 'natural' | 'landscape' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary'</code>

</docgen-api>