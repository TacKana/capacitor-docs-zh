---
title: Screen Orientation Configuration
description: 管理 Capacitor 应用中的屏幕方向设置
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/screen-orientation
---

## Capacitor 应用中的屏幕方向控制

许多应用能够很好地适配设备的竖屏（Portrait）和横屏（Landscape）方向。但有些应用不需要支持所有方向，有时出于特定需求，我们可能需要让应用仅支持单一方向或根据场景切换方向。

## 全局方向设置

要为 Capacitor 应用配置全局屏幕方向，您需要针对目标平台进行相应设置。

### iOS 配置

iOS 允许为 iPhone 和 iPad 设置不同的支持方向。要限制 iOS 设备允许的方向，请打开 Xcode 并编辑 `Info.plist` 文件。找到以下键值：`Supported interface orientation` 和 `Supported interface orientation (iPad)`。通过这些设置，您可以分别为 iPhone 和 iPad 指定支持的方向。

如果直接编辑 `Info.plist` 文件，请查找以下键：`UISupportedInterfaceOrientations` 和 `UISupportedInterfaceOrientations~ipad`。例如，以下配置将限制 iPhone 仅支持竖屏（Portrait），而 iPad 支持左右两种横屏（Landscape）方向：

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

在 Android 平台上，可以通过修改 `AndroidManifest.xml` 文件，在主 Activity 的 `<activity>` 标签中设置 `android:screenOrientation` 属性来控制方向。具体可用值请参考 [Android 清单文档](https://developer.android.com/guide/topics/manifest/activity-element#screen)。

## 动态方向控制

许多应用需要支持多种方向，同时具备根据内容临时锁定方向的能力。

Capacitor 通过 `cordova-plugin-screen-orientation` 插件提供这一功能：

```shell
npm install cordova-plugin-screen-orientation
npx cap update
```

安装后，您可以使用 `window.screen.orientation` 上的 `lock` 和 `unlock` 方法：

```typescript
window.screen.orientation.lock('portrait'); // 锁定为竖屏
window.screen.orientation.lock('landscape'); // 锁定为横屏

// 解除方向锁定，恢复为全局设置
window.screen.orientation.unlock();
```

完整的方向锁定选项和配置方法，请参阅 [方向插件文档](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-screen-orientation/)。