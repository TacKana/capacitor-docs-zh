---
title: Screen Orientation
description: 在您的 Capacitor 应用中管理屏幕方向设置
contributors:
  - mlynch
slug: /guides/screen-orientation
---

## 在您的 Capacitor 应用中管理屏幕方向

许多应用在设备的纵向和横向方向上都能良好运行。然而，也有很多应用并非如此，有充分的理由要求应用仅在某些情况下或完全在一种模式下运行。

## 全局方向设置

要为您的 Capacitor 应用设置全局方向配置，您需要针对目标平台设置必要的配置值。

### iOS 配置

iOS 允许在 iPhone 和 iPad 上支持不同的屏幕方向。要限制 iOS 允许的方向，请打开 Xcode 并编辑 `Info.plist` 文件。找到以下键：`Supported interface orientation` 和 `Supported interface orientation (iPad)`。通过这些值，您可以指定 iPhone 和 iPad 支持的不同方向。

如果直接编辑 `Info.plist` 文件，请查找以下键：`UISupportedInterfaceOrientations` 和 `UISupportedInterfaceOrientations~ipad`。例如，以下设置将 iPhone 的方向限制为右侧向上的 `Portrait` 模式，而 iPad 则支持任意 `Landscape` 方向：

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

在 Android 上，可以通过修改 `AndroidManifest.xml` 并在主应用活动的 `<activity>` 条目中设置 `android:screenOrientation` 来配置方向。有关可能的值，请参阅 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/activity-element#screen)。

## 动态方向设置

许多应用需要支持多种方向，同时能够根据内容偶尔锁定方向。

Capacitor 通过 `@capacitor/screen-orientation` 插件提供此功能：

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

有关所有可能的方向值和配置选项，请参阅 [方向插件文档](https://capacitorjs.com/docs/apis/screen-orientation)。

### iPad 方向锁定

默认情况下，iPad 允许多任务处理，其方向无法被锁定。如果您需要在 iPad 上锁定方向，请将 `Requires Full Screen` 选项设置为 `YES`，方法是在 `Info.plist` 中添加以下内容：

```
	<key>UIRequiresFullScreen</key>
	<true/>
```