---
title: App Launcher Capacitor 插件 API
description: AppLauncher API 允许打开其他应用程序
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/app-launcher/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/app-launcher/src/definitions.ts
sidebar_label: App Launcher
---

# @capacitor/app-launcher

AppLauncher API 允许你的应用程序检查是否可以打开另一个应用程序并执行打开操作。

在 iOS 上，你只能通过已知的 URL 方案（URL scheme）来打开应用程序。

在 Android 上，你可以通过已知的 URL 方案或使用应用程序的公共包名来打开应用程序。

**注意：** 在 [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility) 及更高版本中，你需要在 `AndroidManifest.xml` 文件的 `queries` 标签内添加你想查询的应用程序包名。

示例：
```xml
<queries>
  <package android:name="com.getcapacitor.myapp" />
</queries>
```

## 安装

```bash
npm install @capacitor/app-launcher@latest-6
npx cap sync
```

## 示例

```typescript
import { AppLauncher } from '@capacitor/app-launcher';

const checkCanOpenUrl = async () => {
  const { value } = await AppLauncher.canOpenUrl({ url: 'com.getcapacitor.myapp' });

  console.log('可以打开 URL: ', value);
};

const openPortfolioPage = async () => {
  await AppLauncher.openUrl({ url: 'com.getcapacitor.myapp://page?id=portfolio' });
};
```

## API

<docgen-index>

* [`canOpenUrl(...)`](#canopenurl)
* [`openUrl(...)`](#openurl)
* [接口](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### canOpenUrl(...)

```typescript
canOpenUrl(options: CanOpenURLOptions) => Promise<CanOpenURLResult>
```

检查给定的 URL 是否可以打开一个应用程序。

在 iOS 上，你必须在你应用程序的 `Info.plist` 文件中添加 `LSApplicationQueriesSchemes` 键来声明传递给此方法的 URL 方案。
了解更多关于配置 [`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的信息。

对于未声明的方案，无论是否安装了相应的应用程序，此方法始终返回 false。要了解更多关于此键的信息，请参阅 [LSApplicationQueriesSchemes](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/plist/info/LSApplicationQueriesSchemes)。

| 参数            | 类型                                                                        |
| --------------- | --------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#canopenurloptions">CanOpenURLOptions</a></code>             |

**返回值：** <code>Promise&lt;<a href="#canopenurlresult">CanOpenURLResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### openUrl(...)

```typescript
openUrl(options: OpenURLOptions) => Promise<OpenURLResult>
```

使用给定的 URL 打开一个应用程序。
在 iOS 上，URL 应为一个已知的 URL 方案。
在 Android 上，URL 可以是一个已知的 URL 方案或一个应用程序包名。

| 参数            | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#openurloptions">OpenURLOptions</a></code>                 |

**返回值：** <code>Promise&lt;<a href="#openurlresult">OpenURLResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### 接口


#### CanOpenURLResult

| 属性          | 类型                  |
| ------------- | --------------------- |
| **`value`**   | <code>boolean</code>  |


#### CanOpenURLOptions

| 属性        | 类型                  |
| ----------- | --------------------- |
| **`url`**   | <code>string</code>   |


#### OpenURLResult

| 属性              | 类型                  |
| ----------------- | --------------------- |
| **`completed`**   | <code>boolean</code>  |


#### OpenURLOptions

| 属性        | 类型                  |
| ----------- | --------------------- |
| **`url`**   | <code>string</code>   |

</docgen-api>