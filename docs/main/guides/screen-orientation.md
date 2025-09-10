---
title: 屏幕方向
description: 管理 Capacitor 应用中的屏幕方向设置
contributors:
  - mlynch
slug: /guides/screen-orientation
---

## Capacitor 应用中的屏幕方向控制

许多应用在设备的竖屏（Portrait）和横屏（Landscape）模式下都能良好运行。但也有不少应用需要限定或偶尔锁定某种屏幕方向，这通常有充分的理由。

## 全局方向设置

要为 Capacitor 应用设置全局屏幕方向，需要根据目标平台进行相应配置。

### iOS 配置

iOS 支持为 iPhone 和 iPad 分别设置不同的屏幕方向。要限制 iOS 设备支持的方向，请打开 Xcode 并编辑 `Info.plist` 文件。找到以下键值：`Supported interface orientation` 和 `Supported interface orientation (iPad)`，通过这些设置可以分别指定 iPhone 和 iPad 支持的方向。

如果直接编辑 `Info.plist` 文件，请查找以下键：`UISupportedInterfaceOrientations` 和 `UISupportedInterfaceOrientations~ipad`。例如，以下配置将使 iPhone 仅支持竖向（Portrait）方向，而 iPad 支持左右横向（Landscape）方向：

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

在 Android 平台，可以通过修改 `AndroidManifest.xml` 文件，在主 Activity 的 `<activity>` 标签中设置 `android:screenOrientation` 属性。具体可选值请参考 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/activity-element#screen) 。

## 动态方向控制

许多应用需要支持多种方向，同时根据内容需要临时锁定方向。Capacitor 通过 `@capacitor/screen-orientation` 插件提供此功能：

```shell
npm install @capacitor/screen-orientation
npx cap sync
```

然后使用 `lock` 和 `unlock` 方法：

```typescript
import { ScreenOrientation } from '@capacitor/screen-orientation';
...
await ScreenOrientation.lock({ orientation: 'portrait' });
await ScreenOrientation.lock({ orientation: 'landscape' });

// 解除锁定，将恢复全局设置：
await ScreenOrientation.unlock();
```

完整的可选方向值和配置选项请参阅 [方向插件文档](https://capacitorjs.com/docs/apis/screen-orientation) 。

### iPad 方向锁定

默认情况下，iPad 支持多任务处理且方向无法锁定。如需在 iPad 上锁定方向，需将 `Info.plist` 中的 `Requires Full Screen` 选项设为 `YES`：

```
	<key>UIRequiresFullScreen</key>
	<true/>
```