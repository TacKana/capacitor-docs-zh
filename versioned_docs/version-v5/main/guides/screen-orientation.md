---
title: Screen Orientation
description: 在Capacitor应用中管理屏幕方向设置
contributors:
  - mlynch
slug: /guides/screen-orientation
---

## Capacitor应用中的屏幕方向控制

大多数应用在竖屏和横屏模式下都能良好运行，但某些情况下需要限制应用只能在特定方向使用，或者根据内容动态调整方向。

## 全局方向设置

要为Capacitor应用设置全局屏幕方向，需要根据目标平台进行相应配置。

### iOS配置

iOS允许为iPhone和iPad分别设置不同的支持方向。要限制iOS设备的方向，请通过Xcode打开`Info.plist`文件，找到`Supported interface orientation`和`Supported interface orientation (iPad)`键值，分别设置iPhone和iPad支持的方向。

如果直接编辑`Info.plist`文件，需要查找以下键名：`UISupportedInterfaceOrientations`和`UISupportedInterfaceOrientations~ipad`。例如，以下配置将限制iPhone仅支持竖屏，而iPad支持两种横屏模式：

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

### Android配置

在Android平台上，可以通过修改`AndroidManifest.xml`文件，在主Activity的`<activity>`标签中设置`android:screenOrientation`属性。具体可选值请参考 [Android Manifest文档](https://developer.android.com/guide/topics/manifest/activity-element#screen) 。

## 动态方向控制

许多应用需要支持多种方向，同时能够根据内容临时锁定特定方向。

Capacitor通过`@capacitor/screen-orientation`插件实现这一功能：

```shell
npm install @capacitor/screen-orientation
npx cap sync
```

然后可以使用`lock`和`unlock`方法：

```typescript
import { ScreenOrientation } from '@capacitor/screen-orientation';
...
await ScreenOrientation.lock({ orientation: 'portrait' });
await ScreenOrientation.lock({ orientation: 'landscape' });

// 解除方向锁定，将恢复为全局设置：
await ScreenOrientation.unlock();
```

完整的方向控制选项和配置方法请参阅 [方向插件文档](https://capacitorjs.com/docs/apis/screen-orientation) 。

### iPad方向锁定

默认情况下，iPad支持多任务处理且无法锁定方向。如需锁定iPad方向，需要在`Info.plist`中添加以下配置，将`Requires Full Screen`设为`YES`：

```
	<key>UIRequiresFullScreen</key>
	<true/>
```