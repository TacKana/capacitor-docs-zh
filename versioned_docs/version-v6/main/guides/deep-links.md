---
title: Deep Links
description: 在iOS和Android应用中实现深度链接功能
contributors:
  - dotNetkow
  - jaydrogers
slug: /guides/deep-links
---

# 使用Universal Links和App Links实现深度链接

**支持平台**：iOS、Android

通用链接（Universal Links，iOS）和应用链接（App Links，Android）能够让用户直接跳转到原生应用内的特定内容（通常称为深度链接）。

当用户点击深度链接时，系统会直接将用户带到您的应用中，无需先通过设备浏览器或网站进行路由。如果应用未安装，则会引导用户访问网站。这种机制使得深度链接成为跨平台应用（同时构建网页版、iOS和Android版）的理想功能：既提供无缝的移动体验，又能优雅地回退到网页版。

优势：
- 安全性：使用您拥有域名的HTTPS链接，确保其他应用无法冒用您的链接
- 无缝体验：单一URL同时适配网站和应用，确保用户能准确访问目标内容
- 提升参与度：支持从邮件客户端、搜索引擎结果等多种场景打开链接

## 演示视频

以下是实际效果演示。示例中用户已安装原生应用，通过点击邮件中的链接直接进入应用。首先是根链接（https://beerswift.app）跳转到应用主页，接着深度链接（https://beerswift.app/tabs/tab3）跳转到Tab3页面。

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/vadlZ-d8wAI"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

## 准备工作

- 已完成配置的[Capacitor应用](/main/getting-started/installation.md)
- iOS需加入Apple开发者计划

本文将以https://beerswift.app作为示例网址。

## 使用Capacitor App API实现深度链接路由

当用户点击深度链接打开应用时，移动操作系统不会自动知道如何路由。需要在应用启动时使用Capacitor的[App API](/apis/app.md)来实现路由逻辑。

如果您的网站和应用路径不一致，需要实现更复杂的URL模式匹配（可参考[本指南](https://devdactic.com/universal-links-ionic/)）。如果移动应用和网页应用使用相同代码库，实现则非常简单——只需重定向到相同URL。以下示例基于后者。

### Angular实现

路由逻辑应放在`app.component.ts`中。首先导入Angular的`NgZone`和`Router`，以及Capacitor的`App`：

```typescript
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
```

然后在构造函数中注入`Router`和`NgZone`：

```typescript
constructor(private router: Router, private zone: NgZone) {
    this.initializeApp();
}
```

最后监听`appUrlOpen`事件，发现深度链接时进行重定向：

```typescript
initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
            // 示例URL：https://beerswift.app/tabs/tab2
            // slug = /tabs/tab2
            const slug = event.url.split(".app").pop();
            if (slug) {
                this.router.navigateByUrl(slug);
            }
            // 若无匹配项则不处理，交由常规路由逻辑
        });
    });
}
```

### React实现

React有多种实现方式。一种方法是将App API监听功能封装为新组件，然后添加到`App.tsx`中。首先创建`AppUrlListener.tsx`并导入React Router的`useHistory`钩子和Capacitor App API：

```typescript
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { App, URLOpenListenerEvent } from '@capacitor/app';
```

定义AppUrlListener组件，监听`appUrlOpen`事件并处理重定向：

```typescript
const AppUrlListener: React.FC<any> = () => {
  let history = useHistory();
  useEffect(() => {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      // 示例URL：https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      const slug = event.url.split('.app').pop();
      if (slug) {
        history.push(slug);
      }
      // 若无匹配项则不处理
    });
  }, []);

  return null;
};

export default AppUrlListener;
```

在`App.tsx`中导入该组件：

```typescript
import AppUrlListener from './pages/AppUrlListener';
```

将其添加到`IonReactRouter`内（确保History钩子可用）：

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

### Vue实现

Vue使用原生集成的Vue Router实现路由。在路由配置文件（通常为`routes.js`）中：

首先导入Capacitor的`App`以及Vue和VueRouter：

```typescript
import { App, URLOpenListenerEvent } from '@capacitor/app';
import Vue from 'vue';
import VueRouter from 'vue-router';
```

配置Vue Router路由（详见[Vue Router入门指南](https://router.vuejs.org/guide/#javascript)）：

```typescript
const router = new VueRouter({
  routes: [],
});
```

建议使用`mode: history`以避免处理`#`符号。

注册Vue Router：

```typescript
const VueApp = new Vue({
  router,
}).$mount('#app');
```

最后添加深度链接监听：

```typescript
App.addListener('appUrlOpen', function (event: URLOpenListenerEvent) {
  // 示例URL：https://beerswift.app/tabs/tabs2
  // slug = /tabs/tabs2
  const slug = event.url.split('.app').pop();

  if (slug) {
    router.push({
      path: slug,
    });
  }
});
```

## 创建网站关联文件

为了让Apple和Google允许深度链接打开应用，需要在网站`.well-known`目录下创建关联文件（如https://beerswift.app/.well-known/）。

继续阅读iOS和Android的具体配置说明。

## iOS配置

iOS配置包括创建网站关联文件和在原生应用中注册域名。

> 必须加入Apple开发者计划。

### 创建网站关联文件

登录[Apple开发者网站](https://developer.apple.com)，进入"Certificates, Identifiers, & Profiles"部分，选择应用标识符。记下Team ID和Bundle ID，在Capabilities中启用"Associated Domains"：

![iOS标识符配置](/img/v6/docs/guides/deep-links/ios-config.png)

创建`apple-app-site-association`文件（注意：虽然是JSON文件，但不要加扩展名）。

示例内容（替换`TEAMID.BUNDLEID`为您自己的ID）：

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

将文件上传到HTTPS网站，使用Apple的[验证工具](https://search.developer.apple.com/appsearch-validation-tool/)检查配置。URL格式应为：https://beerswift.app/.well-known/apple-app-site-association

### 添加关联域

在Xcode中打开项目，进入Signing & Capabilities，点击"+ Capability"添加Associated Domains。按格式`applinks:yourdomain.com`添加域名：

![Xcode关联域配置](/img/v6/docs/guides/deep-links/xcode-associated-domain.png)

## Android配置

Android配置包括创建网站关联文件和配置应用链接的intent过滤器。

### 创建网站关联文件

需要提供Android证书的SHA256指纹。若无证书，先创建：

```shell
keytool -genkey -v -keystore KEY-NAME.keystore -alias ALIAS -keyalg RSA -keysize 2048 -validity 10000
```

使用keytool查看证书指纹：

```shell
keytool -list -v -keystore my-release-key.keystore
```

在输出中查找SHA256指纹：

![Keytool输出](/img/v6/docs/guides/deep-links/keystore-sha256.png)

使用Google的[Asset Links工具](https://developers.google.com/digital-asset-links/tools/generator)生成网站关联文件，填写网站域名、应用包名和SHA256指纹：

![Android配置](/img/v6/docs/guides/deep-links/android-config.png)

生成的JSON保存为`.well-known/assetlinks.json`：

```json
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

上传文件后点击"Test statement"验证配置。

### 添加Intent过滤器

在`AndroidManifest.xml`的`<activity>`元素内添加intent过滤器：

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="beerswift.app" />
</intent-filter>
```

完整Activity配置示例：

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

不同技术栈的网站配置方式不同，以下是常见方案：

### Angular

将关联文件放在`src/.well-known`目录，在`angular.json`的assets配置中添加：

```json
{
  "glob": "**/*",
  "input": "src/.well-known",
  "output": ".well-known/"
}
```

构建后部署。

### NuxtJS

将文件放在`static/.well-known`目录，直接构建部署即可。

### React

将文件放在`public/.well-known`目录，无需额外配置。

### WordPress

参考[此指南](https://devdactic.com/universal-links-ionic/)。

## 验证

网站托管关联文件后即可验证（无需发布应用到商店）。连接设备部署测试版应用，点击网站链接测试是否能正确跳转。

## 资源推荐

- Branch.io：[深度链接详解](https://branch.io/what-is-deep-linking/)
- Android官方：[应用链接](https://developer.android.com/training/app-links)
- Apple官方：[通用链接](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content)
- Xcode指南：[支持通用链接](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app)