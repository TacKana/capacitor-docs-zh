---
title: App Launcher Capacitor 插件 API
description: AppLauncher API 允许打开其他应用
translated: true
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/app-launcher/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/app-launcher/src/definitions.ts
sidebar_label: App Launcher
---

# @capacitor/app-launcher

AppLauncher API 允许您的应用检查某个应用是否可以打开并打开它。

在 iOS 上，您只能打开已知 URL scheme 的应用。

在 Android 上，您可以打开已知 URL scheme 的应用，或者使用其公开的包名。

**注意：** 在 [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility) 及更新版本上，您必须在 `AndroidManifest.xml` 的 `queries` 标签内添加要查询的应用包名。

示例：
```xml
<queries>
  <package android:name="com.getcapacitor.myapp" />
</queries>
```

## 安装

```bash
npm install @capacitor/app-launcher@latest-5
npx cap sync
```

## 示例

```typescript
import { AppLauncher } from '@capacitor/app-launcher';

const checkCanOpenUrl = async () => {
  const { value } = await AppLauncher.canOpenUrl({ url: 'com.getcapacitor.myapp' });

  console.log('是否可以打开 URL：', value);
};

const openPortfolioPage = async () => {
  await AppLauncher.openUrl({ url: 'com.getcapacitor.myapp://page?id=portfolio' });
};
```

## API

<docgen-index>

* [`canOpenUrl(...)`](#canopenurl)
* [`openUrl(...)`](#openurl)
* [Interfaces](#接口)

</docgen-index>

<docgen-api>
<!--更新源文件的 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### canOpenUrl(...)

```typescript
canOpenUrl(options: CanOpenURLOptions) => Promise<CanOpenURLResult>
```

检查一个应用是否可以通过给定的 URL 打开。

在 iOS 上，您必须通过向应用的 `Info.plist` 文件中添加
`LSApplicationQueriesSchemes` 键来声明您传递给此方法的 URL scheme。
了解更多关于配置
[`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的信息。

对于未声明的 scheme，无论是否安装了相应的应用，此方法始终返回 false。
要了解更多关于此键的信息，请参见
[LSApplicationQueriesSchemes](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/plist/info/LSApplicationQueriesSchemes)。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#canopenurloptions">CanOpenURLOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#canopenurlresult">CanOpenURLResult</a>&gt;</code>

**自从：** 1.0.0

--------------------


### openUrl(...)

```typescript
openUrl(options: OpenURLOptions) => Promise<OpenURLResult>
```

通过给定的 URL 打开一个应用。
在 iOS 上，URL 应该是一个已知的 URLScheme。
在 Android 上，URL 可以是已知的 URLScheme 或应用包名。

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#openurloptions">OpenURLOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#openurlresult">OpenURLResult</a>&gt;</code>

**自从：** 1.0.0

--------------------


### 接口


#### CanOpenURLResult

| 属性        | 类型               |
| ----------- | ------------------ |
| **`value`** | <code>boolean</code> |


#### CanOpenURLOptions

| 属性      | 类型              |
| --------- | ----------------- |
| **`url`** | <code>string</code> |


#### OpenURLResult

| 属性            | 类型               |
| --------------- | ------------------ |
| **`completed`** | <code>boolean</code> |


#### OpenURLOptions

| 属性      | 类型              |
| --------- | ----------------- |
| **`url`** | <code>string</code> |

</docgen-api>
