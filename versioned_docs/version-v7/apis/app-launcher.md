---
title: App Launcher Capacitor Plugin API
description: AppLauncher API 允许打开其他应用
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/7.x/app-launcher/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/7.x/app-launcher/src/definitions.ts
sidebar_label: App Launcher
---

# @capacitor/app-launcher

AppLauncher API 允许你的应用检查是否能打开另一个应用，并执行打开操作。

在 iOS 上，你只能打开已知 URL Scheme（统一资源定位符方案）的应用。

在 Android 上，你可以通过已知的 URL Scheme 或其公共包名来打开应用。

**注意：** 在 [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility) 及更高版本上，你必须在 `AndroidManifest.xml` 文件内的 `<queries>` 标签中添加你想要查询的应用包名或 URL Scheme。

示例：
```xml
<queries>
  <!-- 通过包名查询 -->
  <package android:name="com.twitter.android" />
  <!-- 通过 URL Scheme 查询 -->
  <intent>
      <action android:name="android.intent.action.VIEW"/>
      <data android:scheme="twitter"/>
  </intent>
</queries>
```

## 安装

```bash
npm install @capacitor/app-launcher@latest-7
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

// 仅限 Android
const checkCanOpenTwitterPackage = async () => {
  const { value } = await AppLauncher.canOpenUrl({ url: 'com.twitter.android' });
  console.log('Can open package: ', value);
};

// 仅限 Android
const openTwitterPackage = async () => {
  const { completed } = await AppLauncher.openUrl({ url: 'com.twitter.android' });
  console.log('openUrl package completed: ', completed);
};
```

## API

<docgen-index>

* [`canOpenUrl(...)`](#canopenurl)
* [`openUrl(...)`](#openurl)
* [接口](#接口)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### canOpenUrl(...)

```typescript
canOpenUrl(options: CanOpenURLOptions) => Promise<CanOpenURLResult>
```

检查是否可以使用给定的 URL 打开一个应用。

在 iOS 上，你必须通过将 `LSApplicationQueriesSchemes` 键添加到应用的 `Info.plist` 文件中，来声明传递给此方法的 URL Scheme。
了解更多关于配置 [`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的信息。

对于未声明的 Scheme，无论是否安装了相应的应用，此方法始终返回 false。要了解更多关于此键的信息，请参阅 [LSApplicationQueriesSchemes](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/plist/info/LSApplicationQueriesSchemes)。

在 Android 上，URL 可以是已知的 URLScheme 或应用包名。

在 [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility) 及更高版本上，你必须在 `AndroidManifest.xml` 文件内的 `<queries>` 标签中添加你想要查询的应用包名或 URL Scheme。

| 参数          | 类型                                                              |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#canopenurloptions">CanOpenURLOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#canopenurlresult">CanOpenURLResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### openUrl(...)

```typescript
openUrl(options: OpenURLOptions) => Promise<OpenURLResult>
```

使用给定的 URL 打开一个应用。
在 iOS 上，URL 应为已知的 URLScheme。
在 Android 上，URL 可以是已知的 URLScheme 或应用包名。

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#openurloptions">OpenURLOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#openurlresult">OpenURLResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### 接口


#### CanOpenURLResult

| 属性          | 类型                 |
| ----------- | -------------------- |
| **`value`** | <code>boolean</code> |


#### CanOpenURLOptions

| 属性        | 类型                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


#### OpenURLResult

| 属性              | 类型                 |
| --------------- | -------------------- |
| **`completed`** | <code>boolean</code> |


#### OpenURLOptions

| 属性        | 类型                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |

</docgen-api>