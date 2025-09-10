---
title: Screen Orientation
description: 管理 Capacitor 应用中的屏幕方向设置
contributors:
  - mlynch
slug: /guides/screen-orientation
---

## Capacitor 应用中的屏幕方向控制

许多应用都能很好地适配设备的竖屏（Portrait）和横屏（Landscape）方向。但部分应用需要限制屏幕方向，有充分的理由要求应用仅支持或偶尔需要特定的显示模式。

## 全局方向设置

要为 Capacitor 应用设置全局屏幕方向，需要根据目标平台进行相应配置。

### iOS 配置

iOS 允许为 iPhone 和 iPad 分别设置不同的屏幕方向支持。要限制 iOS 设备支持的方向，请打开 Xcode 并编辑 `Info.plist` 文件。找到以下键值：`Supported interface orientation` 和 `Supported interface orientation (iPad)`，通过这些值可以分别指定 iPhone 和 iPad 支持的方向。

如果直接编辑 `Info.plist` 文件，请查找以下键：`UISupportedInterfaceOrientations` 和 `UISupportedInterfaceOrientations~ipad`。例如，以下配置将限制 iPhone 仅支持竖屏（Portrait），而 iPad 支持两种横屏（Landscape）方向：

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

许多应用需要支持多种方向，同时能根据内容需求临时锁定特定方向。

Capacitor 通过 `cordova-plugin-screen-orientation` 插件实现这一功能：

```shell
npm install cordova-plugin-screen-orientation
npx cap update
```

然后使用 `window.screen.orientation` 提供的 `lock` 和 `unlock` 方法：

```typescript
window.screen.orientation.lock('portrait');
window.screen.orientation.lock('landscape');

// 解锁方向，将恢复为全局设置：
window.screen.orientation.unlock();
```

完整的方向值选项和配置方法请参阅 [方向插件文档](https://cordova.apache.org/docs/v3/en/latest/reference/cordova-plugin-screen-orientation/) 。

### iPad 方向锁定

默认情况下，iPad 支持多任务处理且无法锁定方向。如需锁定 iPad 方向，请在 `Info.plist` 中添加以下配置，将 `Requires Full Screen` 选项设为 `YES`：

```
	<key>UIRequiresFullScreen</key>
	<true/>
```