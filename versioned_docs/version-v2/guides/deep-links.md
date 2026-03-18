---
title: 深度链接
description: 在 iOS 和 Android 应用中实现深度链接功能
contributors:
  - dotNetkow
  - jaydrogers
canonicalUrl: https://capacitorjs.com/docs/guides/deep-links
---

# 通用链接与应用链接深度配置

**支持平台**：iOS、Android

通用链接（iOS）和应用链接（Android）能够将用户直接引导至原生应用内的特定内容（通常称为深度链接）。

当用户点击深度链接时，系统会直接将用户发送到您的应用程序，而无需先经过设备的网页浏览器或网站。如果应用未安装，则用户会被引导至网站。如果用户直接导航到网站，他们将保持在网站上。这使得深度链接成为为 Web、iOS 和 Android 构建的跨平台应用程序的绝佳功能：提供无缝的移动体验，并优雅地回退到网站。

优势：

- 安全性高：通用/应用链接使用链接到您所拥有的网站域的 HTTPS URL，确保其他应用无法使用您的链接。
- 体验流畅：同一 URL 同时适用于您的网站和应用，确保用户能够成功访问他们寻找的内容而不出错。
- 提升用户参与度：链接可以从电子邮件客户端、搜索引擎结果等位置打开。

## 演示视频

以下是实际效果的演示。在这个例子中，用户已安装了原生应用。他们点击了电子邮件中的应用链接，然后被直接带到应用内部。首先，点击根链接（https://beerswift.app），将用户引导到应用主页面。接着，点击深度链接（https://beerswift.app/tabs/tab3），将用户带到 Tab3 页面。

<iframe width="560" height="315" src="https://www.youtube.com/embed/vadlZ-d8wAI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 先决条件

- 预先配置好的 [Capacitor 应用](/getting-started/index.md)。
- 对于 iOS，需要注册 Apple 开发者计划。

出于说明目的，我们将使用 https://beerswift.app 作为 Web 应用链接。

## 使用 Capacitor 应用 API 进行深度链接路由

当点击深度链接后打开原生应用时，移动操作系统不会自动知道将用户路由到哪里。这必须在应用启动时使用 Capacitor [应用 API](/apis/app.md) 在应用内部实现。

如果您的网站和应用路径不匹配，您需要实现更高级的 URL 模式匹配（示例可参考[此指南](https://devdactic.com/universal-links-ionic/)）。但如果您的移动应用和 Web 应用使用相同的代码库，这将非常简单——只需重定向到相同的 URL。以下示例基于此假设。

### Angular 框架

路由实现应在 `app.component.ts` 中完成。首先从 Angular 导入 `NgZone` 和 `Router`，然后从 Capacitor 导入 `App`：

```typescript
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;
```

接下来，将 `Router` 和 `NgZone` 添加到构造函数中：

```typescript
constructor(private router: Router, private zone: NgZone) {
    this.initializeApp();
}
```

最后，监听 `appUrlOpen` 事件，并在找到深度链接时重定向：

```typescript
initializeApp() {
    App.addListener('appUrlOpen', (data: any) => {
        this.zone.run(() => {
            // 示例 URL：https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            const slug = data.url.split(".app").pop();
            if (slug) {
                this.router.navigateByUrl(slug);
            }
            // 如果没有匹配项，则不执行任何操作 - 让常规路由
            // 逻辑接管
        });
    });
}
```

### React 框架

React 有多种实现方式。一种方法是将 App API 监听器功能包装在一个新组件中，然后将其添加到 `App.tsx` 中。首先创建 `AppUrlListener.tsx`，然后导入 React Router 的 `useHistory` 钩子和 Capacitor 的 App API：

```typescript
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Plugins } from '@capacitor/core';
const { App: CapApp } = Plugins;
```

接下来，定义 AppUrlListener 组件，监听 `appUrlOpen` 事件，并在找到深度链接时重定向：

```typescript
const AppUrlListener: React.FC<any> = () => {
  let history = useHistory();
  useEffect(() => {
    CapApp.addListener('appUrlOpen', (data: any) => {
      // 示例 URL：https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      const slug = data.url.split('.app').pop();
      if (slug) {
        history.push(slug);
      }
      // 如果没有匹配项，则不执行任何操作 - 让常规路由
      // 逻辑接管
    });
  }, []);

  return null;
};

export default AppUrlListener;
```

在 `App.tsx` 中，导入新组件：

```typescript
import AppUrlListener from './pages/AppUrlListener';
```

然后将其添加到 `IonReactRouter` 内部（或无论您的应用在哪里引导，只需确保 History 钩子可用）：

```tsx
const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AppUrlListener></AppUrlListener>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
```

### Vue 框架

VueJS 提供了一个与 Vue 原生集成的官方路由系统，称为 Vue Router。要设置 Vue Router 的深度链接，请从配置所有路由的文件开始（通常是 `routes.js` 或类似文件）。

首先，我们从插件中导入 capacitor 的 `App`，以及 `Vue` 和 `VueRouter`。

```typescript
import { Plugins } from '@capacitor/core';
const { App } = Plugins;
import Vue from 'vue';
import VueRouter from 'vue-router';
```

接下来，使用 Vue Router 配置您的路由（更多信息请参阅 [Vue Router 入门指南](https://router.vuejs.org/guide/#javascript)）。

```typescript
const router = new VueRouter({
  routes: [],
});
```

建议使用 `mode: history`，这样您就不需要处理 `#`。

让 Vue 知道您正在使用 Vue Router，并在 Vue 中注册路由器：

```typescript
const VueApp = new Vue({
  router,
}).$mount('#app');
```

最后，我们需要为深度链接注册我们的应用。为此，我们在 Capacitor App 的 `appUrlOpen` 事件上添加一个事件监听器。Capacitor 将捕获此事件，然后我们将其交给 Vue Router 以导航到请求的页面。

```typescript
App.addListener('appUrlOpen', function (data) {
  // 示例 URL：https://beerswift.app/tabs/tabs2
  // slug = /tabs/tabs2
  const slug = data.url.split('.app').pop();

  // 只有在存在 slug 时才推送到路由
  if (slug) {
    router.push({
      path: slug,
    });
  }
});
```

## 创建网站关联文件

为了让 Apple 和 Google 允许深度链接打开您的应用，必须在您的网站和应用之间创建双向关联。必须为每个平台创建一个文件，并将其放置在您网站的 `.well-known` 文件夹中，例如：https://beerswift.app/.well-known/。

请继续阅读 iOS 和 Android 的配置详细信息。

## iOS 配置

iOS 配置涉及创建网站关联文件，并配置原生应用以识别应用域。

> 您必须注册 Apple 开发者计划。### 创建网站关联文件

首先，登录 [Apple 开发者网站](https://developer.apple.com)。导航至“证书、标识符和配置文件”部分，选择你的应用标识符。记下团队 ID 和 Bundle ID，然后在“功能”下启用“关联域名”并保存：

![iOS 标识符配置](../../../static/img/v3/docs/guides/deep-links/ios-config.png)

接下来，创建网站关联文件 (`apple-app-site-association`)。

> 注意：尽管这是一个 JSON 文件，但保存时不要添加文件扩展名。

下面是 `apple-app-site-association` 文件的一个示例。请务必将 `TEAMID.BUNDLEID` 替换为你自己的 ID（例如：`8L65AZE66A.com.netkosoft.beerswift`）。

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.BUNDLEID",
        "paths": ["*"]
      }
    ]
  }
}
```

然后，将此文件上传到你的网站（需托管在 HTTPS 上），接着使用苹果的 [此工具](https://search.developer.apple.com/appsearch-validation-tool/) 验证配置是否正确。URL 应遵循此格式：https://beerswift.app/.well-known/apple-app-site-association

### 添加关联域名

最后一步是配置 iOS 应用以识别传入链接。打开 Xcode，导航至“签名与功能”。点击“+ 功能”，然后选择“关联域名”。在出现的“域名”条目中，使用 `applinks:yourdomain.com` 格式进行编辑：

![Xcode 关联域名](../../../static/img/v3/docs/guides/deep-links/xcode-associated-domain.png)

## Android 配置

Android 配置涉及创建一个网站关联文件，并通过 intent filter 配置原生应用以识别应用链接。

### 创建网站关联文件

创建 Site Association 文件需要你的 Android 证书的 SHA256 指纹。

如果你已在 Google Play 商店启用了自动签名，可以通过访问 https://play.google.com/console，选择你的应用，进入“设置”>“应用签名”，然后复制 SHA256 应用签名证书指纹来获取你的 SHA256 证书。

如果你尚未签名应用或未启用自动签名，并且还没有证书，可以创建一个新证书：

```shell
keytool -genkey -v -keystore KEY-NAME.keystore -alias ALIAS -keyalg RSA -keysize 2048 -validity 10000
```

使用你现有的（或新创建的）Keystore 证书，通过 keytool 命令列出 keystore 的详细信息：

```shell
keytool -list -v -keystore my-release-key.keystore
```

打印的输出将包含 SHA256 指纹：

![Keytool 输出](../../../static/img/v3/docs/guides/deep-links/keystore-sha256.png)

接下来，使用 Google 的 [Asset Links 工具](https://developers.google.com/digital-asset-links/tools/generator) 创建 Site Association 文件。填写网站域名、应用包名和 SHA256 指纹，然后点击“生成声明”：

![Android 标识符配置](../../../static/img/v3/docs/guides/deep-links/android-config.png)

将 JSON 输出复制到一个新的本地文件 `.well-known/assetlinks.json` 中。

```json
// assetlinks.json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.netkosoft.beerswift",
      "sha256_cert_fingerprints": ["43:12:D4:27:D7:C4:14..."]
    }
  }
]
```

将此文件部署到你的网站（需托管在 HTTPS 上），然后通过点击 Asset Link 工具中的“测试声明”按钮进行验证。如果配置正确，会出现成功消息：

> 成功！主机 [网站] 授予了应用 [应用包名] 深度链接权限。

### 添加 Intent Filter

最后一步是配置 Android 应用以识别传入链接。为此，在 `AndroidManifest.xml` 文件的 `<activity>` 元素内 [添加一个新的 Intent Filter](https://developer.android.com/training/app-links/deep-linking#adding-filters)：

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="beerswift.app" />
</intent-filter>
```

完整的 Activity 应类似于这样：

```xml
<activity
    android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale"
    android:name="com.netkosoft.beerswift.MainActivity"
    android:label="@string/title_activity_main"
    android:theme="@style/AppTheme.NoActionBarLaunch"
    android:launchMode="singleTask">

    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>

    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https" android:host="beerswift.app" />
    </intent-filter>
</activity>
```

## 详情：网站配置

网站配置将根据所使用的工具和后端而有所不同。以下是一些建议。

### Angular

将关联文件放置在 `src/.well-known` 目录下。接下来，配置构建过程，以便原样部署这些文件（确保苹果/谷歌可以正确读取它们）。打开 `angular.json` 文件，在 `architect => assets` 下的数组中添加一个新条目：

```json
{
  "glob": "**/*",
  "input": "src/.well-known",
  "output": ".well-known/"
}
```

然后构建并部署网站。

### NuxtJS

将关联文件放置在 `static/.well-known` 目录下。无需额外步骤；只需构建并部署网站即可。

### React

将关联文件放置在 `public/.well-known` 目录下。无需额外步骤；只需构建并部署网站即可。

### WordPress

关于 WordPress 的说明，请参考 [此处](https://devdactic.com/universal-links-ionic/)。

## 验证

要验证网站和原生应用配置是否正确，网站需要托管 Site Association 文件，但应用无需在应用商店中上架。

将设备连接到计算机，构建并部署原生应用，然后通过点击网站链接进行测试。如果原生应用打开，则说明所有步骤都已正确实施。

## 资源

- Branch.io: [什么是深度链接？](https://branch.io/what-is-deep-linking/)
- Android: [应用链接](https://developer.android.com/training/app-links)
- iOS: [通用链接](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content)
- iOS: [启用通用链接](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/enabling_universal_links)