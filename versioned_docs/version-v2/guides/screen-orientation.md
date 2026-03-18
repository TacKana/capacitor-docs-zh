---
title: Screen Orientation Configuration
description: 在 Capacitor 应用中管理屏幕方向设置
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/screen-orientation
---

## Capacitor 应用中的屏幕方向

许多应用在设备的纵向和横向方向上都表现良好。然而，也有许多应用并非如此，有充分的理由要求应用仅在某些情况下或以某种模式运行。

## 全局方向设置

要为你的 Capacitor 应用设置全局方向配置，你需要为目标平台设置相应的配置值。

### iOS 配置

iOS 允许为 iPhone 和 iPad 设置不同的屏幕方向支持。要限制 iOS 的允许方向，请打开 Xcode 并编辑 `Info.plist` 文件。找到以下键：`Supported interface orientation` 和 `Supported interface orientation (iPad)`。使用这些值，指定你希望 iPhone 和 iPad 支持的不同方向。

如果直接编辑 `Info.plist` 文件，请查找以下键：`UISupportedInterfaceOrientations` 和 `UISupportedInterfaceOrientations~ipad`。例如，以下设置将限制 iPhone 只能以正面朝上的 `Portrait`（纵向）方向显示，而 iPad 则允许两种 `Landscape`（横向）方向：

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

在 Android 上，可以通过修改 `AndroidManifest.xml` 文件，并在主应用活动的 `<activity>` 条目中设置 `android:screenOrientation` 来配置方向。有关可能的条目详情，请参阅 [Android Manifest 文档](https://developer.android.com/guide/topics/manifest/activity-element#screen)。

## 动态方向设置

许多应用需要支持多种方向，同时能够根据内容偶尔锁定方向。

Capacitor 通过 `cordova-plugin-screen-orientation` 插件支持此功能：

```shell
npm install cordova-plugin-screen-orientation
npx cap update
```

然后，可以使用 `window.screen.orientation` 上的 `lock` 和 `unlock` 方法：

```typescript
window.screen.orientation.lock('portrait');
window.screen.orientation.lock('landscape');

// 解锁方向，将恢复为全局设置：
window.screen.orientation.unlock();
```

有关所有可能的方向值和配置选项，请参阅 [Orientation 插件文档](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-screen-orientation/)。