---
title: 深层链接
description: 在 iOS 和 Android 应用中实现深层链接功能
contributors:
  - dotNetkow
  - jaydrogers
slug: /guides/deep-links
---

# 使用 Universal Links 和 App Links 进行深层链接

**平台**: iOS, Android

Universal links（iOS）和 App Links（Android）提供了将用户直接带到原生应用内特定内容的能力（通常称为深层链接）。

当用户点击深层链接时，用户会直接进入您的应用，而无需先经过设备的 Web 浏览器或网站。如果应用未安装，则用户会被引导到网站。如果用户直接导航到网站，他们会留在网站上。这使得深层链接成为为 Web、iOS 和 Android 构建的跨平台应用的绝佳功能：无缝的移动体验，并优雅地回退到网站。

好处：

- 安全：Universal/App Links 使用指向您拥有的网站域名的 HTTPS URL，确保没有其他应用可以使用您的链接。
- 无缝体验：一个 URL 同时适用于您的网站和应用，确保用户能够成功访问他们正在寻找的内容而不会出错。
- 增加参与度：链接可以从电子邮件客户端、搜索引擎结果等位置打开。

## 演示视频

以下是实际效果。在此示例中，用户已安装原生应用。他们点击电子邮件中的应用链接，直接进入应用本身。首先，点击根链接（https://beerswift.app），将用户引导到主应用页面。接下来，点击深层链接（https://beerswift.app/tabs/tab3），将用户带到 Tab3 页面。

<iframe width="560" height="315" src="https://www.youtube.com/embed/vadlZ-d8wAI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 先决条件

- 预先配置好的 [Capacitor 应用](/main/getting-started/installation.md)。
- 对于 iOS，需要注册 Apple Developer Program。

为便于说明，将使用 https://beerswift.app 作为 Web 应用链接。

## 使用 Capacitor App API 进行深层链接路由

当深层链接被点击后原生应用打开时，移动操作系统不会自动知道将用户路由到哪里。这必须在应用启动时使用 Capacitor [App API](/apis/app.md) 在应用内部实现。

如果您的网站和应用路径不匹配，您将需要实现更高级的 URL 模式匹配（参见[本指南](https://devdactic.com/universal-links-ionic/)的示例）。但如果您的移动应用和 Web 应用使用相同的代码库，这非常简单——只需重定向到相同的 URL。以下示例假设了这一点。

### Angular

路由应该在 `app.component.ts` 中实现。首先从 Angular 导入 `NgZone` 和 `Router`，然后从 Capacitor 导入 `App`：

```typescript
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
```

接下来，将 `Router` 和 `NgZone` 添加到构造函数中：

```typescript
constructor(private router: Router, private zone: NgZone) {
    this.initializeApp();
}
```

最后，监听 `appUrlOpen` 事件，并在找到深层链接时重定向：

```typescript
initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
            // 示例 url: https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            const slug = event.url.split(".app").pop();
            if (slug) {
                this.router.navigateByUrl(slug);
            }
            // 如果没有匹配，不做任何操作 - 让常规路由逻辑处理
        });
    });
}
```

### React

React 有多种选择。一种方法是将 App API 监听器功能包装在一个新组件中，然后将其添加到 `App.tsx` 中。首先创建 `AppUrlListener.tsx`，然后导入 React Router 的 `useHistory` hook 以及 Capacitor App API：

```typescript
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { App, URLOpenListenerEvent } from '@capacitor/app';
```

接下来，定义 AppUrlListener 组件，监听 `appUrlOpen` 事件，并在找到深层链接时重定向：

```typescript
const AppUrlListener: React.FC<any> = () => {
  let history = useHistory();
  useEffect(() => {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      // 示例 url: https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      const slug = event.url.split('.app').pop();
      if (slug) {
        history.push(slug);
      }
      // 如果没有匹配，不做任何操作 - 让常规路由逻辑处理
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

然后将其添加到 `IonReactRouter` 内部（或应用引导的任何位置，只需确保 History hook 可用）：

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

### Vue

VueJS 提供了一个名为 Vue Router 的一流路由系统，它与 Vue 原生集成。要使用 Vue Router 设置深层链接，请从用于配置所有路由的文件开始（通常是 `routes.js` 或类似文件）。

首先，我们从插件中导入 capacitor `App`，以及 `Vue` 和 `VueRouter`。

```typescript
import { App, URLOpenListenerEvent } from '@capacitor/app';
import Vue from 'vue';
import VueRouter from 'vue-router';
```

接下来，使用 Vue Router 配置您的路由（更多信息请参见 [Vue Router 入门](https://router.vuejs.org/guide/#javascript)）。

```typescript
const router = new VueRouter({
  routes: [],
});
```

建议使用 `mode: history`，这样您就不必处理 `#` 了。

让 Vue 知道您正在使用 Vue Router，并在 Vue 中注册路由器：

```typescript
const VueApp = new Vue({
  router,
}).$mount('#app');
```

最后，我们需要注册我们的应用以进行深层链接。为此，我们在 Capacitor App 上添加一个 `appUrlOpen` 事件的事件监听器。Capacitor 将捕获它，然后我们将其交给 Vue Router 以导航到请求的页面。

```typescript
App.addListener('appUrlOpen', function (event: URLOpenListenerEvent) {
  // 示例 url: https://beerswift.app/tabs/tabs2
  // slug = /tabs/tabs2
  const slug = event.url.split('.app').pop();

  // 只有在存在 slug 时才推送到路由
  if (slug) {
    router.push({
      path: slug,
    });
  }
});
```

## 创建站点关联文件

为了让 Apple 和 Google 允许深层链接打开您的应用，必须在您的网站和应用之间创建双向关联。必须为每个平台创建一个文件，并将其放置在您网站的 `.well-known` 文件夹中，如下所示：https://beerswift.app/.well-known/。

继续查看 iOS 和 Android 配置详情。

## iOS 配置

iOS 配置涉及创建站点关联文件并配置原生应用以识别应用域名。

> 您必须注册 Apple Developer Program。

### 创建站点关联文件

首先，登录 [Apple Developer 网站](https://developer.apple.com)。导航到"Certificates, Identifiers, & Profiles"部分，选择您的应用标识符。记下 Team ID 和 Bundle ID，在 Capabilities 下，切换"Associated Domains"然后保存：

![iOS 标识符配置](../../../../static/img/v5/docs/guides/deep-links/ios-config.png)

接下来，创建站点关联文件（`apple-app-site-association`）。

> 注意：尽管是 JSON 文件，但保存时不要带文件扩展名。

以下是 `apple-app-site-association` 文件的示例。请务必将 `TEAMID.BUNDLEID` 替换为您自己的 ID（例如：`8L65AZE66A.com.netkosoft.beerswift`）。

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

接下来，将文件上传到您的网站（通过 HTTPS 托管），然后使用 Apple 的工具[在此处](https://search.developer.apple.com/appsearch-validation-tool/)验证其配置是否正确。URL 应遵循以下格式：https://beerswift.app/.well-known/apple-app-site-association

### 添加关联域名

最后一步是配置 iOS 应用以识别传入的链接。打开 Xcode，导航到 Signing & Capabilities。点击"+ Capability"，然后选择 Associated Domains。在出现的 Domains 条目中，使用 `applinks:yourdomain.com` 格式进行编辑：

![Xcode 关联域名](../../../../static/img/v5/docs/guides/deep-links/xcode-associated-domain.png)

## Android 配置

Android 配置涉及创建站点关联文件并使用 intent 过滤器配置原生应用以识别应用链接。

### 创建站点关联文件

站点关联文件需要您的 Android 证书的 SHA256 指纹。

如果您没有证书，请创建一个：

```shell
keytool -genkey -v -keystore KEY-NAME.keystore -alias ALIAS -keyalg RSA -keysize 2048 -validity 10000
```

使用您现有的（或新创建的）Keystore 证书，使用 keytool 命令列出 keystore 的详细信息：

```shell
keytool -list -v -keystore my-release-key.keystore
```

打印输出将包含 SHA256 指纹：

![Keytool 输出](../../../../static/img/v5/docs/guides/deep-links/keystore-sha256.png)

接下来，使用 Google 的 [Asset Links 工具](https://developers.google.com/digital-asset-links/tools/generator)创建站点关联文件。填写网站域名、应用包名和 SHA256 指纹，然后点击"Generate statement"：

![Android 标识符配置](../../../../static/img/v5/docs/guides/deep-links/android-config.png)

将 JSON 输出复制到 `.well-known/assetlinks.json` 下的新本地文件中。

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

将文件部署到您的网站（通过 HTTPS 托管），然后点击 Asset Link 工具中的"Test statement"按钮进行验证。如果配置正确，将显示成功消息：

> 成功！主机 [website] 授予应用深层链接到 [app package]。

### 添加 Intent Filter

最后一步是配置 Android 应用以识别传入的链接。为此，在 `AndroidManifest.xml` 的 `<activity>` 元素中[添加新的 Intent Filter](https://developer.android.com/training/app-links/deep-linking#adding-filters)：

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="beerswift.app" />
</intent-filter>
```

完整的 Activity 应该类似于这样：

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

## 网站配置

网站配置将根据使用的工具和后端而有所不同。以下是一些建议。

### Angular

将关联文件放在 `src/.well-known` 下。接下来，配置构建过程以按原样部署这些文件（确保 Apple/Google 可以正确读取它们）。打开 `angular.json`，在 `architect => assets` 下，向数组添加新条目：

```json
{
  "glob": "**/*",
  "input": "src/.well-known",
  "output": ".well-known/"
}
```

构建然后部署网站。

### NuxtJS

将关联文件放在 `static/.well-known` 下。无需额外步骤；只需构建然后部署网站。

### React

将关联文件放在 `public/.well-known` 下。无需额外步骤；只需构建然后部署网站。

### WordPress

WordPress 说明请参见[此处](https://devdactic.com/universal-links-ionic/)。

## 验证

要验证网站和原生应用是否配置正确，网站需要托管站点关联文件，但应用不需要在应用商店中。

将设备连接到您的计算机，构建并部署原生应用，然后通过点击网站链接进行测试。如果原生应用打开，则所有步骤都已正确实现。

## 资源

- Branch.io: [什么是深层链接？](https://branch.io/what-is-deep-linking/)
- Android: [App Links](https://developer.android.com/training/app-links)
- iOS: [Universal Links](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content)
- iOS: [在您的应用中支持 Universal Links](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app)
