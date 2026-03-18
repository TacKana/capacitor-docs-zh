---
title: Screen Orientation
description: 在 Capacitor 应用中管理屏幕方向设置
contributors:
  - mlynch
slug: /guides/screen-orientation
---

## Capacitor 应用中的屏幕方向

许多应用在设备的竖屏和横屏方向下都能良好运行。然而，也有很多应用并非如此，并且有充分的理由要求应用仅在某些模式下运行，或偶尔需要特定的屏幕方向。

## 全局方向设置

要为你的 Capacitor 应用设置全局屏幕方向，需要根据目标平台配置相应的值。

### iOS 配置

iOS 允许为 iPhone 和 iPad 设置不同的屏幕方向支持。要限制 iOS 允许的方向，请打开 Xcode 并打开 `Info.plist` 文件。找到以下键：`Supported interface orientation` 和 `Supported interface orientation (iPad)`。通过这些值，可以分别指定 iPhone 和 iPad 支持的不同方向。

如果直接编辑 `Info.plist` 文件，请查找以下键：`UISupportedInterfaceOrientations` 和 `UISupportedInterfaceOrientations~ipad`。例如，以下设置将限制 iPhone 仅支持正立的 `Portrait`（竖屏）方向，而 iPad 则支持两种 `Landscape`（横屏）方向：

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

在 Android 上，可以通过修改 `AndroidManifest.xml` 文件，在主应用 Activity 的 `<activity>` 条目中设置 `android:screenOrientation` 来配置屏幕方向。有关可能值的详细信息，请参阅 [Android 清单文档](https://developer.android.com/guide/topics/manifest/activity-element#screen) 。

## 动态方向设置

许多应用需要支持多种屏幕方向，并能够根据内容偶尔锁定方向。

Capacitor 通过 `@capacitor/screen-orientation` 插件提供此功能：

```shell
npm install @capacitor/screen-orientation
npx cap sync
```

然后，使用 `lock` 和 `unlock` 方法：

```typescript
import { ScreenOrientation } from '@capacitor/screen-orientation';
...
await ScreenOrientation.lock({ orientation: 'portrait' });
await ScreenOrientation.lock({ orientation: 'landscape' });

// 解锁方向，将恢复为全局设置：
await ScreenOrientation.unlock();
```

有关所有可能的屏幕方向值和配置选项，请参阅 [方向插件文档](https://capacitorjs.com/docs/apis/screen-orientation) 。

### iPad 方向锁定

默认情况下，iPad 支持多任务处理，且无法锁定其屏幕方向。如果需要锁定 iPad 的方向，请将 `Requires Full Screen` 选项设置为 `YES`，即在 `Info.plist` 文件中添加以下内容：

```
	<key>UIRequiresFullScreen</key>
	<true/>
```