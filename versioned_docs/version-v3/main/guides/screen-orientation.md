---
title: 屏幕方向
description: 在您的 Capacitor 应用中管理屏幕方向设置
contributors:
  - mlynch
slug: /guides/screen-orientation
---

## Capacitor 应用中的屏幕方向

许多应用在竖屏和横屏设备方向下都能正常工作。然而，也有很多应用并非如此，而且有充分的理由要求应用仅或偶尔在一种模式下运行。

## 全局方向设置

要在 Capacitor 应用中设置全局方向，您需要为您的目标平台设置必要的配置值。

### iOS 配置

iOS 允许在 iPhone 和 iPad 上支持不同的屏幕方向。要限制 iOS 的允许方向，请打开 Xcode 并打开 `Info.plist` 文件。找到以下键：`Supported interface orientation` 和 `Supported interface orientation (iPad)`。使用这些值，指定您希望为 iPhone 和 iPad 支持的不同方向。

如果直接编辑 `Info.plist` 文件，请查找以下键：`UISupportedInterfaceOrientations` 和 `UISupportedInterfaceOrientations~ipad`。例如，以下设置将 iPhone 限制为正向竖屏方向，iPad 限制为任一横屏方向：

```
  <key>UISupportedInterfaceOrientations</key>
  <array>
    <string>UIInterfaceOrientationPortrait</string>
  </array>
  <key>UISupportedInterfaceOrientations~ipad</key>
  <array>
    <string>UIInterfaceOrientationLandscapeRight</string>
    <string>UIInterfaceOrientationLandscapeLeft</string>
  </array>
```

### Android 配置

在 Android 上，可以通过修改 `AndroidManifest.xml` 并在主应用 Activity 的 `<activity>` 条目上设置 `android:screenOrientation` 来设置方向。有关可能条目的详细信息，请参阅 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/activity-element#screen)。

## 动态方向设置

许多应用需要支持多种方向，并能够根据内容偶尔锁定方向。

Capacitor 通过 `cordova-plugin-screen-orientation` 插件支持此功能：

```shell
npm install cordova-plugin-screen-orientation
npx cap update
```

然后，使用 `window.screen.orientation` 上可用的 `lock` 和 `unlock` 方法：

```typescript
window.screen.orientation.lock('portrait');
window.screen.orientation.lock('landscape');

// 要解锁方向，将恢复为全局设置：
window.screen.orientation.unlock();
```

有关可能的方向值和配置选项的完整范围，请参阅 [Orientation Plugin 文档](https://cordova.apache.org/docs/v3/en/latest/reference/cordova-plugin-screen-orientation/)。

### iPad 方向锁定

默认情况下，iPad 允许多任务处理，其方向无法锁定。如果您需要在 iPad 上锁定方向，请将选项 `Requires Full Screen` 设置为 `YES`，方法是在 `Info.plist` 中添加以下内容：

```
    <key>UIRequiresFullScreen</key>
    <true/>
```
