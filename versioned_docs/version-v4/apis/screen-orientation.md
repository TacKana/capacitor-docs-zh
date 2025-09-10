---
title: 屏幕方向 Capacitor 插件 API
description: 屏幕方向 API 提供了锁定和解锁屏幕方向的功能方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/src/definitions.ts
sidebar_label: 屏幕方向
---

# @capacitor/screen-orientation

屏幕方向 API 提供与屏幕方向相关的信息和功能。

## 安装

```bash
npm install @capacitor/screen-orientation
npx cap sync
```

## iOS 注意事项

屏幕方向锁定仅对 Capacitor 视图控制器有效，不会影响其他已展示的视图控制器（例如由浏览器插件展示的视图）。如需同时锁定已展示的视图控制器，可在应用的 `AppDelegate.swift` 文件中添加以下代码：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

### iPad 方向锁定

默认情况下，iPad 允许多任务处理且其方向无法锁定。若需在 iPad 上锁定方向，请将 `Requires Full Screen` 选项设为 `YES`，在 `Info.plist` 中添加：

```
  <key>UIRequiresFullScreen</key>
  <true/>
```

## API 文档

<docgen-index>

- [`orientation()`](#orientation)
- [`lock(...)`](#lock)
- [`unlock()`](#unlock)
- [`addListener('screenOrientationChange', ...)`](#addlistenerscreenorientationchange-)
- [`removeAllListeners()`](#removealllisteners)
- [接口定义](#interfaces)

</docgen-index>

<docgen-api>

### orientation()

```typescript
orientation() => Promise<ScreenOrientationResult>
```

获取当前屏幕方向。

**返回值:** <code>Promise&lt;<a href="#screenorientationresult">ScreenOrientationResult</a>&gt;</code>

**自版本:** 4.0.0

---

### lock(...)

```typescript
lock(options: OrientationLockOptions) => Promise<void>
```

锁定屏幕方向。

| 参数          | 类型                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#orientationlockoptions">OrientationLockOptions</a></code> |

**自版本:** 4.0.0

---

### unlock()

```typescript
unlock() => Promise<void>
```

解除屏幕方向锁定。

**自版本:** 4.0.0

---

### addListener('screenOrientationChange', ...)

```typescript
addListener(eventName: 'screenOrientationChange', listenerFunc: (orientation: ScreenOrientationResult) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听屏幕方向变化事件。

| 参数               | 类型                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'screenOrientationChange'</code>                                                                |
| **`listenerFunc`** | <code>(orientation: <a href="#screenorientationresult">ScreenOrientationResult</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 4.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除所有事件监听器。

**自版本:** 4.0.0

---

### Interfaces

#### ScreenOrientationResult

| 属性       | 类型                         |
| ---------- | ---------------------------- |
| **`type`** | <code>OrientationType</code> |

#### OrientationLockOptions

| 属性              | 类型                             |
| ----------------- | -------------------------------- |
| **`orientation`** | <code>OrientationLockType</code> |

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>
