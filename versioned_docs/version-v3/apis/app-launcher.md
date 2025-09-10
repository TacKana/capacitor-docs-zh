---
title: App Launcher Capacitor 插件 API
description: AppLauncher API 允许应用打开其他应用程序
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/src/definitions.ts
sidebar_label: App Launcher
---

# @capacitor/app-launcher

AppLauncher API 使您的应用能够检查并打开其他应用程序。

在 iOS 平台，您只能通过已知的 URL Scheme 来打开应用。

在 Android 平台，您既可以通过 URL Scheme，也可以使用应用的公开包名来打开应用。

**注意：** 在 [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility) 及更高版本中，您需要将要查询的应用包名添加到 `AndroidManifest.xml` 文件的 `queries` 标签中。

示例：

```xml
<queries>
  <package android:name="com.getcapacitor.myapp" />
</queries>
```

## 安装

```bash
npm install @capacitor/app-launcher
npx cap sync
```

## 使用示例

```typescript
import { AppLauncher } from '@capacitor/app-launcher';

const checkCanOpenUrl = async () => {
  const { value } = await AppLauncher.canOpenUrl({ url: 'com.getcapacitor.myapp' });

  console.log('能否打开该URL: ', value);
};

const openPortfolioPage = async () => {
  await AppLauncher.openUrl({ url: 'com.getcapacitor.myapp://page?id=portfolio' });
};
```

## API 文档

<docgen-index>

- [`canOpenUrl(...)`](#canopenurl)
- [`openUrl(...)`](#openurl)
- [接口定义](#interfaces)

</docgen-index>

<docgen-api>

### canOpenUrl(...)

```typescript
canOpenUrl(options: CanOpenURLOptions) => Promise<CanOpenURLResult>
```

检查给定 URL 是否能打开对应的应用。

在 iOS 平台上，您必须先在应用的 `Info.plist` 文件中通过添加 `LSApplicationQueriesSchemes` 键来声明要检查的 URL Scheme。
详细了解如何配置 [`Info.plist`](https://capacitorjs.com/docs/v3/ios/configuration#configuring-infoplist)。

对于未声明的 Scheme，无论是否安装了对应应用，此方法都会返回 false。更多关于此键的信息，请参阅 [LSApplicationQueriesSchemes](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/plist/info/LSApplicationQueriesSchemes)。

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#canopenurloptions">CanOpenURLOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#canopenurlresult">CanOpenURLResult</a>&gt;</code>

**起始版本：** 1.0.0

---

### openUrl(...)

```typescript
openUrl(options: OpenURLOptions) => Promise<OpenURLResult>
```

通过给定 URL 打开对应应用。
在 iOS 平台上，URL 应为已知的 URL Scheme。
在 Android 平台上，URL 可以是已知的 URL Scheme 或应用包名。

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#openurloptions">OpenURLOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#openurlresult">OpenURLResult</a>&gt;</code>

**起始版本：** 1.0.0

---

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
