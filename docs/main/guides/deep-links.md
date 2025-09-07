---
title: 深度链接
description: 在 iOS 和 Android 应用中实现深度链接功能
contributors:
  - dotNetkow
  - jaydrogers
slug: /guides/deep-links
---

# 使用通用链接和应用链接实现深度跳转

**支持平台**: iOS, Android

通用链接（iOS）和应用链接（Android）能够直接将用户引导至原生应用中的特定内容（通常称为深度链接）。

当用户点击深度链接时，将直接跳转至您的应用，无需先经过设备浏览器或网站。如果应用未安装，则转至网站。若用户直接访问网站，则保持在网站中。这使得深度链接成为跨平台应用（网页/iOS/Android）的理想功能：提供无缝移动体验，同时优雅回退至网站。

优势：

- 安全性：使用HTTPS链接至您拥有的域名，确保其他应用无法冒用
- 无缝体验：统一网址同时支持网站和应用，保证用户准确获取内容
- 提升互动：可从邮件客户端、搜索引擎结果等场景直接打开

## 演示视频

实际效果展示（用户已安装原生应用）：从邮件点击应用链接直接跳转至应用内部。首先点击根链接（https://beerswift.app）进入应用主页，再点击深度链接（https://beerswift.app/tabs/tab3）跳转至Tab3页面。

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/vadlZ-d8wAI"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

## 准备工作

- 已配置的[Capacitor应用](/main/getting-started/installation.md)
- iOS需加入Apple开发者计划

示例将使用https://beerswift.app作为网页应用链接。

## 使用Capacitor App API实现深度链接路由

点击深度链接打开原生应用后，移动操作系统不会自动路由。需要在应用启动时使用Capacitor的[App API](/apis/app.md)实现路由逻辑。

如果网站与应用路径不一致，需实现更复杂的URL模式匹配（参考[此指南](https://devdactic.com/universal-links-ionic/)）。若代码库相同则非常简单——直接重定向至相同URL。以下示例基于此假设。

### Angular

在`app.component.ts`中实现路由。首先导入Angular的`NgZone`和`Router`，以及Capacitor的`App`：

```typescript
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
```

在构造函数中添加`Router`和`NgZone`：

```typescript
constructor(private router: Router, private zone: NgZone) {
    this.initializeApp();
}
```

监听`appUrlOpen`事件并重定向：

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
            // 无匹配则不操作，交由常规路由处理
        });
    });
}
```

### React

创建新组件`AppUrlListener.tsx`，导入React Router的`useHistory`和Capacitor App API：

```typescript
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { App, URLOpenListenerEvent } from '@capacitor/app';
```

定义组件监听`appUrlOpen`事件：

```typescript
const AppUrlListener: React.FC<any> = () => {
  let history = useHistory();
  useEffect(() => {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      const slug = event.url.split('.app').pop();
      if (slug) {
        history.push(slug);
      }
    });
  }, []);

  return null;
};

export default AppUrlListener;
```

在`App.tsx`中引入并使用：

```typescript
import AppUrlListener from './pages/AppUrlListener';
```

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

在路由配置文件（如`routes.js`）中导入相关模块：

```typescript
import { App, URLOpenListenerEvent } from '@capacitor/app';
import Vue from 'vue';
import VueRouter from 'vue-router';
```

配置Vue路由（建议使用`history`模式）：

```typescript
const router = new VueRouter({
  routes: [],
});
```

注册路由并添加监听：

```typescript
App.addListener('appUrlOpen', function (event: URLOpenListenerEvent) {
  const slug = event.url.split('.app').pop();
  if (slug) {
    router.push({
      path: slug,
    });
  }
});
```

## 创建网站关联文件

需在网站`.well-known`目录下放置关联文件（如https://beerswift.app/.well-known/）。继续阅读iOS和Android配置详情。

## iOS配置

### 创建关联文件

登录[Apple开发者网站](https://developer.apple.com)，在"Certificates, Identifiers, & Profiles"中启用应用的"Associated Domains"功能：

![iOS标识符配置](../../../static/img/v6/docs/guides/deep-links/ios-config.png)

创建无扩展名的`apple-app-site-association`文件（替换TEAMID.BUNDLEID）：

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

上传至网站后，使用[验证工具](https://search.developer.apple.com/appsearch-validation-tool/)确认配置。

### 添加关联域名

在Xcode的Signing & Capabilities中添加`applinks:yourdomain.com`格式的关联域名：

![Xcode关联域名](../../../static/img/v6/docs/guides/deep-links/xcode-associated-domain.png)

## Android配置

### 创建关联文件

获取密钥库SHA256指纹：

```shell
keytool -list -v -keystore my-release-key.keystore
```

使用Google的[Asset Links工具](https://developers.google.com/digital-asset-links/tools/generator)生成`assetlinks.json`：

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "package_name": "com.netkosoft.beerswift",
      "sha256_cert_fingerprints": ["43:12:D4:27:D7:C4:14..."]
    }
  }
]
```

上传至网站后验证。

### 添加Intent Filter

在`AndroidManifest.xml`的Activity中添加：

```xml
<intent-filter android:autoVerify="true">
    <data android:scheme="https" android:host="beerswift.app" />
</intent-filter>
```

## 网站配置

### Angular

将文件置于`src/.well-known`，在`angular.json`中添加：

```json
{
  "glob": "**/*",
  "input": "src/.well-known",
  "output": ".well-known/"
}
```

### NuxtJS/React

分别存放至`static/.well-known`或`public/.well-known`

### WordPress

参考[此指南](https://devdactic.com/universal-links-ionic/)

## 验证

连接设备部署应用后，直接点击网站链接测试跳转功能。

## 参考资源

- Branch.io: [深度链接解析](https://branch.io/what-is-deep-linking/)
- Android: [应用链接文档](https://developer.android.com/training/app-links)
- iOS: [通用链接文档](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content)
