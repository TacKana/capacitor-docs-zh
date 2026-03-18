---
title: Screen Orientation
description: 管理 Capacitor 应用中的屏幕方向设置
contributors:
  - mlynch
slug: /guides/screen-orientation
---

## 在 Capacitor 应用中管理屏幕方向

许多应用在设备的竖屏（portrait）和横屏（landscape）方向下都能良好运行。然而，也有很多应用并非如此，而且有充分的理由要求应用仅在某一种模式下运行，或偶尔切换到特定模式。

## 全局方向设置

要为你的 Capacitor 应用设置全局方向配置，你需要根据目标平台设置相应的配置值。

### iOS 配置

iOS 允许为 iPhone 和 iPad 支持不同的屏幕方向。若要限制 iOS 允许的方向，请打开 Xcode 并打开 `Info.plist` 文件。找到以下键：`Supported interface orientation` 和 `Supported interface orientation (iPad)`。使用这些值，可以为 iPhone 和 iPad 分别指定你希望支持的不同方向。

如果直接编辑 `Info.plist` 文件，请查找以下键：`UISupportedInterfaceOrientations` 和 `UISupportedInterfaceOrientations~ipad`。例如，以下设置将 iPhone 的方向限制为正向竖屏（Portrait），而 iPad 则允许两种横屏（Landscape）方向：

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

在 Android 上，可以通过修改 `AndroidManifest.xml` 并为应用主活动（main activity）的 `<activity>` 条目设置 `android:screenOrientation` 来配置方向。有关可能取值的详细信息，请参阅 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/activity-element#screen)。

## 动态方向设置

许多应用需要支持多种方向，同时能够根据内容偶尔锁定方向。

Capacitor 通过 `@capacitor/screen-orientation` 插件支持此功能：

```shell
npm install @capacitor/screen-orientation@latest-4
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

有关所有可能的方向值和配置选项，请参阅 [Orientation 插件文档](https://capacitorjs.com/docs/apis/screen-orientation)。

### iPad 方向锁定

默认情况下，iPad 允许多任务处理，并且其方向无法锁定。如果你需要在 iPad 上锁定方向，请将 `Requires Full Screen` 选项设置为 `YES`，方法是在 `Info.plist` 中添加以下内容：

```
	<key>UIRequiresFullScreen</key>
	<true/>
```