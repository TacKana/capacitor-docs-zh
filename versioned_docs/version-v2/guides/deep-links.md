---
title: Deep Links
description: 在iOS和Android应用中实现深度链接功能
contributors:
  - dotNetkow
  - jaydrogers
canonicalUrl: https://capacitorjs.com/docs/guides/deep-links
---

# 使用通用链接和应用链接实现深度跳转

**支持平台**：iOS、Android

通用链接（iOS）和应用链接（Android）允许用户直接从外部跳转到原生应用内的特定内容（通常称为深度链接）。

当用户点击深度链接时，会直接进入您的应用，无需先经过设备浏览器或网站。如果应用未安装，则会跳转到网站。这种机制为跨平台应用（同时支持网页、iOS和Android）提供了完美的解决方案：无缝的移动体验，并优雅地回退到网页版本。

优势：
- 安全性：通用/应用链接使用您拥有的HTTPS域名，确保其他应用无法冒用您的链接
- 无缝体验：同一个URL同时适用于网站和应用，确保用户总能成功访问目标内容
- 提升互动：链接可通过电子邮件客户端、搜索引擎结果等多种渠道打开

## 演示视频

这是实际效果示例。用户已安装原生应用，通过点击邮件中的应用链接直接进入应用。首先点击根链接(https://beerswift.app)跳转到应用主页，然后点击深度链接(https://beerswift.app/tabs/tab3)进入Tab3页面。

<iframe width="560" height="315" src="https://www.youtube.com/embed/vadlZ-d8wAI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 准备工作

- 已配置好的[Capacitor应用](/getting-started/index.md)
- iOS需加入Apple开发者计划

本文以https://beerswift.app作为示例网站链接。

## 使用Capacitor App API实现深度链接路由

当用户点击深度链接打开原生应用时，移动操作系统不会自动知道如何路由。需要在应用启动时使用Capacitor的[App API](/apis/app.md)实现此功能。

如果网站和应用路径不一致，需要实现更复杂的URL模式匹配（参考[本指南](https://devdactic.com/universal-links-ionic/)）。如果移动应用和网页应用使用相同代码库，则实现非常简单——只需重定向到相同URL。以下示例基于此假设。

### Angular

路由实现应放在`app.component.ts`中。首先从Angular导入`NgZone`和`Router`，以及Capacitor的`App`：

```typescript
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;
```

然后将`Router`和`NgZone`注入构造函数：

```typescript
constructor(private router: Router, private zone: NgZone) {
    this.initializeApp();
}
```

最后监听`appUrlOpen`事件，找到深度链接时进行重定向：

```typescript
initializeApp() {
    App.addListener('appUrlOpen', (data: any) => {
        this.zone.run(() => {
            // 示例URL：https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            const slug = data.url.split(".app").pop();
            if (slug) {
                this.router.navigateByUrl(slug);
            }
            // 若无匹配项则不处理，由常规路由逻辑接管
        });
    });
}
```

### React

React有多种实现方式。一种方法是将App API监听功能封装为新组件，然后添加到`App.tsx`中。首先创建`AppUrlListener.tsx`，导入React Router的`useHistory`钩子和Capacitor App API：

```typescript
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Plugins } from '@capacitor/core';
const { App: CapApp } = Plugins;
```

然后定义AppUrlListener组件，监听`appUrlOpen`事件并在找到深度链接时重定向：

```typescript
const AppUrlListener: React.FC<any> = () => {
  let history = useHistory();
  useEffect(() => {
    CapApp.addListener('appUrlOpen', (data: any) => {
      // 示例URL：https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      const slug = data.url.split('.app').pop();
      if (slug) {
        history.push(slug);
      }
      // 若无匹配项则不处理，由常规路由逻辑接管
    });
  }, []);

  return null;
};

export default AppUrlListener;
```

在`App.tsx`中导入新组件：

```typescript
import AppUrlListener from './pages/AppUrlListener';
```

然后将其添加到`IonReactRouter`内部（或应用启动的任何位置，确保History钩子可用）：

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

VueJS提供了原生集成的Vue Router路由系统。要实现深度链接，首先在路由配置文件（通常是`routes.js`）中操作。

首先从插件导入Capacitor的`App`以及Vue和VueRouter：

```typescript
import { Plugins } from '@capacitor/core';
const { App } = Plugins;
import Vue from 'vue';
import VueRouter from 'vue-router';
```

然后使用Vue Router配置路由（更多信息参考[Vue Router入门指南](https://router.vuejs.org/guide/#javascript)）：

```typescript
const router = new VueRouter({
  routes: [],
});
```

建议使用`mode: history`以避免处理`#`符号。

让Vue知晓您正在使用Vue Router并在Vue中注册路由：

```typescript
const VueApp = new Vue({
  router,
}).$mount('#app');
```

最后注册深度链接监听器。我们为Capacitor App的`appUrlOpen`事件添加监听器，然后交由Vue Router导航到请求的页面：

```typescript
App.addListener('appUrlOpen', function (data) {
  // 示例URL：https://beerswift.app/tabs/tabs2
  // slug = /tabs/tabs2
  const slug = data.url.split('.app').pop();

  // 仅当存在slug时才进行路由跳转
  if (slug) {
    router.push({
      path: slug,
    });
  }
});
```

## 创建网站关联文件

为了让Apple和Google允许深度链接打开您的应用，需要在网站根目录下的`.well-known`文件夹中创建两个关联文件，例如：https://beerswift.app/.well-known/

继续阅读iOS和Android的具体配置说明。

## iOS配置

iOS配置需要创建网站关联文件并配置原生应用识别应用域名。

> 注意：必须加入Apple开发者计划。

### 创建网站关联文件

首先登录[Apple开发者网站](https://developer.apple.com)。进入"Certificates, Identifiers, & Profiles"部分，选择应用标识符。记录Team ID和Bundle ID，在Capabilities下启用"Associated Domains"并保存：

![iOS标识符配置](../../../static/img/v3/docs/guides/deep-links/ios-config.png)

然后创建网站关联文件(`apple-app-site-association`)。

> 注意：虽然是JSON文件，但不要添加文件扩展名。

以下是`apple-app-site-association`文件示例。请将`TEAMID.BUNDLEID`替换为您自己的ID（例如：`8L65AZE66A.com.netkosoft.beerswift`）。

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

将文件上传到HTTPS网站，然后使用Apple的[验证工具](https://search.developer.apple.com/appsearch-validation-tool/)确认配置正确。URL格式应为：https://beerswift.app/.well-known/apple-app-site-association

### 添加关联域名

最后一步是配置iOS应用识别传入链接。打开Xcode，进入Signing & Capabilities。点击"+ Capability"，选择Associated Domains。在出现的Domains条目中，按格式`applinks:yourdomain.com`编辑：

![Xcode关联域名配置](../../../static/img/v3/docs/guides/deep-links/xcode-associated-domain.png)

## Android配置

Android配置需要创建网站关联文件并配置原生应用通过intent过滤器识别应用链接。

### 创建网站关联文件

网站关联文件需要Android证书的SHA256指纹。

如果已在Google Play商店启用自动签名，可访问https://play.google.com/console，选择您的应用，进入Setup > App Signing，复制SHA256应用签名证书指纹。

如果尚未签名或启用自动签名，可创建新证书：

```shell
keytool -genkey -v -keystore KEY-NAME.keystore -alias ALIAS -keyalg RSA -keysize 2048 -validity 10000
```

使用现有（或新建的）Keystore证书，通过keytool命令列出详细信息：

```shell
keytool -list -v -keystore my-release-key.keystore
```

输出将包含SHA256指纹：

![Keytool输出](../../../static/img/v3/docs/guides/deep-links/keystore-sha256.png)

然后使用Google的[Asset Links工具](https://developers.google.com/digital-asset-links/tools/generator)创建网站关联文件。填写网站域名、应用包名和SHA256指纹，点击"Generate statement"：

![Android标识符配置](../../../static/img/v3/docs/guides/deep-links/android-config.png)

将JSON输出复制到本地`.well-known/assetlinks.json`文件：

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

将文件部署到HTTPS网站，然后点击Asset Link工具中的"Test statement"按钮验证。如果配置正确，将显示成功消息：

> 成功！主机[网站]授予[应用包名]深度链接权限。

### 添加Intent过滤器

最后一步是配置Android应用识别传入链接。在`AndroidManifest.xml`的`<activity>`元素内[添加新的Intent过滤器](https://developer.android.com/training/app-links/deep-linking#adding-filters)：

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="beerswift.app" />
</intent-filter>
```

完整的Activity应类似如下：

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

## 网站配置详情

网站配置因工具和后端而异。以下是几个建议：

### Angular

将关联文件放在`src/.well-known`下。然后配置构建过程原样部署这些文件（确保Apple/Google能正确读取）。打开`angular.json`，在`architect => assets`下的数组添加新条目：

```json
{
  "glob": "**/*",
  "input": "src/.well-known",
  "output": ".well-known/"
}
```

构建并部署网站。

### NuxtJS

将关联文件放在`static/.well-known`下。无需额外步骤，直接构建部署即可。

### React

将关联文件放在`public/.well-known`下。无需额外步骤，直接构建部署即可。

### WordPress

WordPress配置参考[此指南](https://devdactic.com/universal-links-ionic/)。

## 验证

验证网站和原生应用是否正确配置时，网站需要托管关联文件，但应用无需上架应用商店。

连接设备到电脑，构建并部署原生应用，然后通过点击网站链接测试。如果原生应用打开，则所有步骤均已正确实现。

## 参考资料

- Branch.io: [什么是深度链接？](https://branch.io/what-is-deep-linking/)
- Android: [应用链接](https://developer.android.com/training/app-links)
- iOS: [通用链接](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content)
- iOS: [启用通用链接](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/enabling_universal_links)