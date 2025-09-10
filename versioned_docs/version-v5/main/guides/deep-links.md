---
title: Deep Links
description: 在iOS和Android应用中实现深度链接功能
contributors:
  - dotNetkow
  - jaydrogers
slug: /guides/deep-links
---

# 使用通用链接和应用链接实现深度跳转

**支持平台**：iOS, Android

通用链接（iOS）和应用链接（Android）能够让用户直接跳转到原生应用中的特定内容（通常称为深度链接）。

当用户点击深度链接时，系统会直接将用户引导至您的应用，而无需先经过设备浏览器或网站。如果应用未安装，则用户会被导向网站。若用户直接访问网站，则会保持在网站中。这使得深度链接成为跨平台应用（面向网页、iOS和Android构建）的优秀功能：无缝的移动体验，并能优雅地回退至网站版本。

优势：
- 安全性：使用HTTPS URL链接到您拥有的网站域名，确保其他应用无法使用您的链接
- 无缝体验：同一个URL可同时用于网站和应用，确保用户能成功访问目标内容
- 提升参与度：链接可从电子邮件客户端、搜索引擎结果等场景打开

## 演示视频

以下是一个实际操作示例。本例中用户已安装原生应用，点击邮件中的应用链接后直接跳转至应用内。首先点击根链接(https://beerswift.app)跳转到应用主页，接着点击深度链接(https://beerswift.app/tabs/tab3)进入Tab3页面。

<iframe width="560" height="315" src="https://www.youtube.com/embed/vadlZ-d8wAI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 前提条件

- 已配置好的[Capacitor应用](/main/getting-started/installation.md)
- iOS需要加入Apple开发者计划

本文将以https://beerswift.app作为示例网址。

## 使用Capacitor App API实现深度链接路由

当用户点击深度链接打开原生应用时，移动操作系统不会自动知道如何路由。这需要在应用启动时使用Capacitor的[App API](/apis/app.md)来实现。

如果您的网站和应用路径不一致，则需要实现更高级的URL模式匹配（参考[此指南](https://devdactic.com/universal-links-ionic/)）。如果移动应用和网页应用使用相同代码库则非常简单——只需重定向到相同URL。以下示例基于后者。

### Angular

路由实现应放在`app.component.ts`中。首先导入Angular的`NgZone`和`Router`，以及Capacitor的`App`:

```typescript
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
```

然后在构造函数中添加`Router`和`NgZone`:

```typescript
constructor(private router: Router, private zone: NgZone) {
    this.initializeApp();
}
```

最后监听`appUrlOpen`事件，在检测到深度链接时重定向:

```typescript
initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
            // 示例URL: https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            const slug = event.url.split(".app").pop();
            if (slug) {
                this.router.navigateByUrl(slug);
            }
            // 若无匹配项则不处理，由常规路由逻辑接管
        });
    });
}
```

### React

React有多种实现方式。一种方法是将App API监听功能封装为新组件，然后添加到`App.tsx`中。首先创建`AppUrlListener.tsx`并导入React Router的`useHistory`钩子及Capacitor App API:

```typescript
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { App, URLOpenListenerEvent } from '@capacitor/app';
```

然后定义AppUrlListener组件，监听`appUrlOpen`事件并在找到深度链接时重定向:

```typescript
const AppUrlListener: React.FC<any> = () => {
  let history = useHistory();
  useEffect(() => {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      // 示例URL: https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      const slug = event.url.split('.app').pop();
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

在`App.tsx`中导入该组件:

```typescript
import AppUrlListener from './pages/AppUrlListener';
```

然后将其添加到`IonReactRouter`中（确保History钩子可用）:

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

VueJS提供了原生集成的Vue Router系统。要在Vue Router中设置深度链接，从路由配置文件（通常为`routes.js`）开始。

首先导入Capacitor的`App`以及Vue和VueRouter:

```typescript
import { App, URLOpenListenerEvent } from '@capacitor/app';
import Vue from 'vue';
import VueRouter from 'vue-router';
```

接着使用Vue Router配置路由（详见[Vue Router入门指南](https://router.vuejs.org/guide/#javascript)）:

```typescript
const router = new VueRouter({
  routes: [],
});
```

建议使用`mode: history`以避免处理`#`符号。

让Vue知晓您正在使用Vue Router并注册路由器:

```typescript
const VueApp = new Vue({
  router,
}).$mount('#app');
```

最后注册深度链接监听。添加对Capacitor App的`appUrlOpen`事件监听，由Vue Router导航至请求页面:

```typescript
App.addListener('appUrlOpen', function (event: URLOpenListenerEvent) {
  // 示例URL: https://beerswift.app/tabs/tabs2
  // slug = /tabs/tabs2
  const slug = event.url.split('.app').pop();

  // 仅在有slug时进行路由跳转
  if (slug) {
    router.push({
      path: slug,
    });
  }
});
```

## 创建网站关联文件

为了让Apple和Google允许深度链接打开您的应用，需要在网站创建双向关联文件。每个平台各需一个文件，放置在网站的`.well-known`目录下，如：https://beerswift.app/.well-known/

继续阅读iOS和Android的配置详情。

## iOS配置

iOS配置包括创建网站关联文件和配置原生应用识别应用域名。

> 必须加入Apple开发者计划

### 创建网站关联文件

首先登录[Apple开发者网站](https://developer.apple.com)，进入"证书、标识符和配置文件"部分选择您的应用标识符。记下Team ID和Bundle ID，在Capabilities中启用"Associated Domains"后保存：

![iOS标识符配置](../../../../static/img/v5/docs/guides/deep-links/ios-config.png)

接着创建网站关联文件(`apple-app-site-association`)。

> 注意：虽然是JSON文件但不要加扩展名

示例文件如下，请替换`TEAMID.BUNDLEID`为您的实际ID（如`8L65AZE66A.com.netkosoft.beerswift`）:

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

将文件上传至HTTPS网站，使用Apple的[验证工具](https://search.developer.apple.com/appsearch-validation-tool/)验证配置。URL格式应为：https://beerswift.app/.well-known/apple-app-site-association

### 添加关联域名

最后配置iOS应用识别传入链接。打开Xcode进入Signing & Capabilities，点击"+ Capability"选择Associated Domains。在出现的Domains条目中编辑，格式为`applinks:yourdomain.com`:

![Xcode关联域名](../../../../static/img/v5/docs/guides/deep-links/xcode-associated-domain.png)

## Android配置

Android配置包括创建网站关联文件和配置原生应用使用intent filter识别应用链接。

### 创建网站关联文件

需要Android证书的SHA256指纹。若无证书可创建：

```shell
keytool -genkey -v -keystore KEY-NAME.keystore -alias ALIAS -keyalg RSA -keysize 2048 -validity 10000
```

使用keytool命令列出密钥库详情获取SHA256指纹：

```shell
keytool -list -v -keystore my-release-key.keystore
```

打印输出将包含SHA256指纹：

![密钥库输出](../../../../static/img/v5/docs/guides/deep-links/keystore-sha256.png)

使用Google的[Asset Links工具](https://developers.google.com/digital-asset-links/tools/generator)创建网站关联文件。填写网站域名、应用包名和SHA256指纹后点击"Generate statement":

![Android标识符配置](../../../../static/img/v5/docs/guides/deep-links/android-config.png)

将JSON输出复制到本地新文件`.well-known/assetlinks.json`:

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

部署文件到HTTPS网站后，点击Asset Link工具中的"Test statement"按钮验证。若配置正确会显示成功消息：

> 成功！主机[网站]授予应用[应用包名]深度链接权限

### 添加Intent Filter

最后配置Android应用识别传入链接。在`AndroidManifest.xml`的`<activity>`元素中添加[intent filter](https://developer.android.com/training/app-links/deep-linking#adding-filters):

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="beerswift.app" />
</intent-filter>
```

完整Activity示例如下：

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

网站配置因工具和后台而异，以下提供几种建议方案。

### Angular

将关联文件放在`src/.well-known`下。然后在构建配置中确保这些文件能原样部署。打开`angular.json`在`architect => assets`下添加新条目：

```json
{
  "glob": "**/*",
  "input": "src/.well-known",
  "output": ".well-known/"
}
```

构建后部署网站。

### NuxtJS

将关联文件放在`static/.well-known`下。无需额外步骤，直接构建部署。

### React

将关联文件放在`public/.well-known`下。无需额外步骤，直接构建部署。

### WordPress

参考[此指南](https://devdactic.com/universal-links-ionic/)进行WordPress配置。

## 验证

验证网站和原生应用配置是否正确时，网站需托管关联文件但应用无需上架应用商店。

将设备连接电脑，构建部署原生应用后，通过点击网站链接测试。若原生应用能打开则说明所有步骤已正确实现。

## 参考资源

- Branch.io: [什么是深度链接?](https://branch.io/what-is-deep-linking/)
- Android: [应用链接](https://developer.android.com/training/app-links)
- iOS: [通用链接](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content)
- iOS: [在应用中支持通用链接](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app)