---
title: Screen Orientation
description: 在 Capacitor 应用中管理屏幕方向设置
contributors:
  - mlynch
slug: /guides/screen-orientation
---

## Capacitor 应用中的屏幕方向控制

大多数应用都能良好适配设备的竖屏和横屏模式。但有些应用由于特殊需求，可能需要固定或偶尔切换至特定方向运行。

## 全局方向设置

要为 Capacitor 应用设置全局屏幕方向，需要针对目标平台进行配置。

### iOS 配置

iOS 允许为 iPhone 和 iPad 分别设置支持的屏幕方向。打开 Xcode 并编辑 `Info.plist` 文件，找到 `Supported interface orientation` 和 `Supported interface orientation (iPad)` 键值。通过这些设置可指定不同设备支持的方向。

若直接编辑 `Info.plist` 文件，需查找以下键名：`UISupportedInterfaceOrientations` 和 `UISupportedInterfaceOrientations~ipad`。例如下方配置将限制 iPhone 仅支持竖屏，iPad 支持左右横屏：

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

Android 平台可通过修改 `AndroidManifest.xml` 文件，在主 Activity 的 `<activity>` 标签中设置 `android:screenOrientation` 属性。具体可选值请参阅 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/activity-element#screen)。

## 动态方向控制

许多应用需要支持多方向显示，同时能根据内容需求临时锁定方向。

Capacitor 通过 `@capacitor/screen-orientation` 插件提供此功能：

```shell
npm install @capacitor/screen-orientation
npx cap sync
```

使用 `lock` 和 `unlock` 方法实现动态控制：

```typescript
import { ScreenOrientation } from '@capacitor/screen-orientation';
...
await ScreenOrientation.lock({ orientation: 'portrait' });
await ScreenOrientation.lock({ orientation: 'landscape' });

// 解除锁定后将恢复全局设置：
await ScreenOrientation.unlock();
```

完整的方向参数和配置选项请参考 [屏幕方向插件文档](https://capacitorjs.com/docs/apis/screen-orientation)。

### iPad 方向锁定说明

iPad 默认支持多任务分屏，其方向无法直接锁定。如需强制锁定方向，需在 `Info.plist` 中添加以下配置启用全屏模式：

```
	<key>UIRequiresFullScreen</key>
	<true/>
```