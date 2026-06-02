---
title: App Launcher Capacitor 插件 API
description: AppLauncher API 允许打开其他应用
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/src/definitions.ts
sidebar_label: 应用启动器
translated: true
source_hash: 29276e34
---

# @capacitor/app-launcher

AppLauncher API 允许你的应用检查某个应用能否被打开，并打开该应用。

在 iOS 上，你只能通过已知的 URL scheme 打开应用。

在 Android 上，你可以通过已知的 URL scheme 或使用应用的公开包名来打开应用。

**注意：** 在 [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility) 及更高版本上，你需要在 `AndroidManifest.xml` 的 `queries` 标签中添加要查询的应用包名或 URL scheme。

示例：
```xml
<queries>
  <!-- 按包名查询 -->
  <package android:name="com.twitter.android" />
  <!-- 按 URL scheme 查询 -->
  <intent>
      <action android:name="android.intent.action.VIEW"/>
      <data android:scheme="twitter"/>
  </intent>
</queries>
```

## 安装

```bash
npm install @capacitor/app-launcher
npx cap sync
```

## 示例

```typescript
import { AppLauncher } from '@capacitor/app-launcher';

const checkCanOpenTwitterUrl = async () => {
  const { value } = await AppLauncher.canOpenUrl({ url: 'twitter://timeline' });
  console.log('Can open url: ', value);
};

const openTwitterUrl = async () => {
  const { completed } = await AppLauncher.openUrl({ url: 'twitter://timeline' });
  console.log('openUrl completed: ', completed);
};

// 仅 Android
const checkCanOpenTwitterPackage = async () => {
  const { value } = await AppLauncher.canOpenUrl({ url: 'com.twitter.android' });
  console.log('Can open package: ', value);
};

// 仅 Android
const openTwitterPackage = async () => {
  const { completed } = await AppLauncher.openUrl({ url: 'com.twitter.android' });
  console.log('openUrl package completed: ', completed);
};
```

## API

<docgen-index>

* [`canOpenUrl(...)`](#canopenurl)
* [`openUrl(...)`](#openurl)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### canOpenUrl(...)

```typescript
canOpenUrl(options: CanOpenURLOptions) => Promise<CanOpenURLResult>
```

检查是否可以通过给定的 URL 打开某个应用。

在 iOS 上，你必须通过在你的应用的 `Info.plist` 文件中添加 `LSApplicationQueriesSchemes` 键来声明传入此方法的 URL scheme。
了解更多关于配置 [`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的信息。

对于未声明的 scheme，此方法始终返回 false，无论是否有合适的应用已安装。要了解更多关于此键的信息，请参阅 [LSApplicationQueriesSchemes](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/plist/info/LSApplicationQueriesSchemes)。

在 Android 上，URL 可以是已知的 URLScheme 或应用的包名。

在 [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility) 及更高版本上，你需要在 `AndroidManifest.xml` 的 `queries` 标签中添加要查询的应用包名或 URL scheme。

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#canopenurloptions">CanOpenURLOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#canopenurlresult">CanOpenURLResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### openUrl(...)

```typescript
openUrl(options: OpenURLOptions) => Promise<OpenURLResult>
```

通过给定的 URL 打开一个应用。
在 iOS 上，URL 应为已知的 URLScheme。
在 Android 上，URL 可以是已知的 URLScheme 或应用的包名。

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#openurloptions">OpenURLOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#openurlresult">OpenURLResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### Interfaces


#### CanOpenURLResult

| 属性        | 类型                 |
| ----------- | -------------------- |
| **`value`** | <code>boolean</code> |


#### CanOpenURLOptions

| 属性      | 类型                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


#### OpenURLResult

| 属性            | 类型                 |
| --------------- | -------------------- |
| **`completed`** | <code>boolean</code> |


#### OpenURLOptions

| 属性      | 类型                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |

</docgen-api>
