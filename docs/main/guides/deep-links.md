---
title: Deep Links
description: 在 iOS 和 Android 应用中实现深度链接功能
contributors:
  - dotNetkow
  - jaydroggers
slug: /guides/deep-links
---

# 使用 Universal Links 和 App Links 实现深度链接

**平台**: iOS, Android

Universal Links（iOS）和 App Links（Android）能够将用户直接引导到原生应用中的特定内容（通常称为深度链接）。

当用户点击深度链接时，系统会直接将用户发送到您的应用中，而无需先经过设备的网络浏览器或网站。如果应用未安装，用户将被引导至网站。如果用户直接导航到网站，他们将停留在网站上。这使得深度链接成为为 Web、iOS 和 Android 构建的跨平台应用的绝佳功能：提供无缝的移动体验，并优雅地回退到网站。

优势：
- 安全性：Universal/App Links 使用链接到您拥有的网站域的 HTTPS URL，确保其他应用无法使用您的链接。
- 无缝体验：一个 URL 同时适用于您的网站和应用，确保用户能够成功访问他们寻找的内容而不会出错。
- 提高参与度：链接可以从电子邮件客户端、搜索引擎结果等中打开。

## 演示视频

这是实际使用中的效果。在此示例中，用户已安装原生应用。他们点击电子邮件中的应用链接，直接被带入应用内部。首先，点击根链接（https://beerswift.app），将用户引导至应用主页。接着，点击一个深度链接（https://beerswift.app/tabs/tab3）将用户带到 Tab3 页面。

<iframe width="560" height="315" src="https://www.youtube.com/embed/vadlZ-d8wAI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 先决条件

- 预先配置好的 [Capacitor 应用](/main/getting-started/installation.md)。
- 对于 iOS，需要加入 Apple 开发者计划。

为说明起见，将使用 https://beerswift.app 作为 Web 应用链接。

## 使用 Capacitor App API 进行深度链接路由

点击深度链接后打开原生应用时，移动操作系统不会自动知道将用户路由到哪里。这必须在应用启动时使用 Capacitor [App API](/apis/app.md) 在应用内部实现。

如果您的网站和应用路径不匹配，您将需要实现更高级的 URL 模式匹配（请参阅[此指南](https://devdactic.com/universal-links-ionic/)获取示例）。但如果您的移动应用和 Web 应用使用相同的代码库，这非常简单——只需重定向到相同的 URL。以下示例假设情况如此。

### Angular

路由应在 `app.component.ts` 中实现。首先从 Angular 导入 `NgZone` 和 `Router`，然后从 Capacitor 导入 `App`：

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

最后，监听 `appUrlOpen` 事件，并在找到深度链接时重定向：

```typescript
initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
            // 示例 URL：https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            const slug = event.url.split(".app").pop();
            if (slug) {
                this.router.navigateByUrl(slug);
            }
            // 如果没有匹配项，则不执行任何操作——让常规路由逻辑接管
        });
    });
}
```

### React

React 有多种选择。一种方法是将 App API 监听器功能包装在一个新组件中，然后将其添加到 `App.tsx` 中。首先创建 `AppUrlListener.tsx`，然后导入 React Router 的 `useHistory` 钩子以及 Capacitor App API：

```typescript
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { App, URLOpenListenerEvent } from '@capacitor/app';
```

接下来，定义 AppUrlListener 组件，监听 `appUrlOpen` 事件，并在找到深度链接时重定向：

```typescript
const AppUrlListener: React.FC<any> = () => {
  let history = useHistory();
  useEffect(() => {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      // 示例 URL：https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      const slug = event.url.split('.app').pop();
      if (slug) {
        history.push(slug);
      }
      // 如果没有匹配项，则不执行任何操作——让常规路由逻辑接管
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

然后将其添加到 `IonReactRouter` 内部（或您的应用引导的任何地方，只需确保 History 钩子可用）：

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

VueJS 提供了一个与 Vue 原生集成的第一方路由系统，称为 Vue Router。要使用 Vue Router 设置深度链接，请从您用于配置所有路由的文件（通常是 `routes.js` 或类似文件）开始。

首先我们从插件中导入 capacitor 的 `App`，以及 `Vue` 和 `VueRouter`。

```typescript
import { App, URLOpenListenerEvent } from '@capacitor/app';
import Vue from 'vue';
import VueRouter from 'vue-router';
```

接下来，使用 Vue Router 配置您的路由（有关更多信息，请参阅 [Vue Router 入门指南](https://router.vuejs.org/guide/#javascript)）。

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

最后，我们需要为深度链接注册我们的应用。为此，我们在 Capacitor App 的 `appUrlOpen` 事件上添加一个事件监听器。Capacitor 会捕获此事件，然后我们将其交给 Vue Router 以导航到请求的页面。

```typescript
App.addListener('appUrlOpen', function (event: URLOpenListenerEvent) {
  // 示例 URL：https://beerswift.app/tabs/tabs2
  // slug = /tabs/tabs2
  const slug = event.url.split('.app').pop();

  // 仅当存在 slug 时才推送路由
  if (slug) {
    router.push({
      path: slug,
    });
  }
});
```

## 创建网站关联文件

为了让 Apple 和 Google 允许深度链接打开您的应用，必须在您的网站和应用之间建立双向关联。必须为每个平台创建一个文件，并将其放置在网站上的 `.well-known` 文件夹中，例如：https://beerswift.app/.well-known/。

请继续阅读 iOS 和 Android 配置详情。

## iOS 配置

iOS 配置涉及创建一个网站关联文件，并配置原生应用以识别应用域。

> 您必须加入 Apple 开发者计划。### 创建站点关联文件

首先，登录 [Apple Developer 网站](https://developer.apple.com)。导航到“Certificates, Identifiers, & Profiles”部分，选择你的应用标识符。记下 Team ID 和 Bundle ID，然后在 Capabilities 下开启“Associated Domains”并保存：

![iOS 标识符配置](../../../static/img/v6/docs/guides/deep-links/ios-config.png)

接下来，创建站点关联文件 (`apple-app-site-association`)。

> 注意：虽然这是一个 JSON 文件，但不要保存文件扩展名。

下面是一个 `apple-app-site-association` 文件的示例。请确保将 `TEAMID.BUNDLEID` 替换为你自己的 ID（例如：`8L65AZE66A.com.netkosoft.beerswift`）。

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

接下来，将该文件上传到你的网站（需托管在 HTTPS 上），然后使用 Apple 的工具 [此处](https://search.developer.apple.com/appsearch-validation-tool/) 验证配置是否正确。URL 应遵循以下格式：https://beerswift.app/.well-known/apple-app-site-association

### 添加关联域名

最后一步是配置 iOS 应用以识别传入的链接。打开 Xcode，然后导航到 Signing & Capabilities。点击“+ Capability”，然后选择 Associated Domains。在出现的 Domains 条目中，使用格式 `applinks:yourdomain.com` 进行编辑：

![Xcode 关联域名](../../../static/img/v6/docs/guides/deep-links/xcode-associated-domain.png)

## Android 配置

Android 配置涉及创建站点关联文件，并配置原生应用使用 Intent Filter 来识别应用链接。

### 创建站点关联文件

站点关联文件需要你的 Android 证书的 SHA256 指纹。

如果你还没有证书，请创建一个：

```shell
keytool -genkey -v -keystore KEY-NAME.keystore -alias ALIAS -keyalg RSA -keysize 2048 -validity 10000
```

使用你现有的（或新创建的）Keystore 证书，使用 keytool 命令列出 keystore 的详细信息：

```shell
keytool -list -v -keystore my-release-key.keystore
```

打印的输出将包含 SHA256 指纹：

![Keytool 输出](../../../static/img/v6/docs/guides/deep-links/keystore-sha256.png)

接下来，使用 Google 的 [Asset Links 工具](https://developers.google.com/digital-asset-links/tools/generator) 创建站点关联文件。填写网站域名、应用包名和 SHA256 指纹，然后点击“Generate statement”：

![Android 标识符配置](../../../static/img/v6/docs/guides/deep-links/android-config.png)

将 JSON 输出复制到一个新的本地文件中，放在 `.well-known/assetlinks.json` 路径下。

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

将文件部署到你的网站（需托管在 HTTPS 上），然后通过点击 Asset Link 工具中的“Test statement”按钮进行验证。如果配置正确，将出现成功消息：

> 成功！主机 [website] 授予应用 [app package] 深度链接权限。

### 添加 Intent Filter

最后一步是配置 Android 应用以识别传入的链接。为此，在 `AndroidManifest.xml` 的 `<activity>` 元素内 [添加一个新的 Intent Filter](https://developer.android.com/training/app-links/deep-linking#adding-filters)：

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="beerswift.app" />
</intent-filter>
```

完整的 Activity 应类似如下：

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

将关联文件放在 `src/.well-known` 下。接下来，配置构建过程以原样部署这些文件（确保 Apple/Google 能够正确读取它们）。打开 `angular.json`，在 `architect => assets` 下，向数组中添加一个新条目：

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

WordPress 的配置说明请参见 [此处](https://devdactic.com/universal-links-ionic/)。

## 验证

要验证网站和原生应用是否配置正确，网站需要托管站点关联文件，但应用无需上架应用商店。

将设备连接到计算机，构建并部署原生应用，然后通过点击网站链接进行测试。如果原生应用打开，则所有步骤都已正确实施。

## 参考资料

- Branch.io：[什么是深度链接？](https://branch.io/what-is-deep-linking/)
- Android：[应用链接](https://developer.android.com/training/app-links)
- iOS：[通用链接](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content)
- iOS：[在你的应用中支持通用链接](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app)