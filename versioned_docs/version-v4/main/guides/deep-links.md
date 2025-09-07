---
title: Deep Links
description: 在iOS和Android应用中实现深度链接功能
contributors:
  - dotNetkow
  - jaydrogers
slug: /guides/deep-links
---

# 使用通用链接和应用链接实现深度跳转

**支持平台**：iOS、Android

通用链接（iOS）和应用链接（Android）能够直接将用户引导至原生应用内的特定内容（俗称深度链接）。

当用户点击深度链接时，会直接跳转至您的应用，无需先经过设备浏览器或网站中转。如果应用未安装，则会跳转至网站。这种机制使得深度链接成为跨平台应用（网页/iOS/Android）的理想特性：提供无缝移动体验，同时优雅回退到网页版本。

优势：
- 安全性：使用您拥有域名的HTTPS链接，防止其他应用冒用
- 无缝体验：同一链接同时适用于网站和应用
- 提升参与度：可从邮件客户端、搜索引擎结果等场景直接打开

## 演示视频

以下实际案例展示了用户已安装原生应用的情况。点击邮件中的链接后，直接进入应用内部：首先是根链接(https://beerswift.app)跳转至应用主页，然后是深度链接(https://beerswift.app/tabs/tab3)跳转至Tab3页面。

<iframe width="560" height="315" src="https://www.youtube.com/embed/vadlZ-d8wAI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 前提准备

- 已配置好的[Capacitor应用](/main/getting-started/installation.md)
- iOS需加入Apple开发者计划

示例将使用https://beerswift.app作为网页应用链接。

## 使用Capacitor App API实现深度链接路由

当通过深度链接打开应用时，移动操作系统不会自动处理路由跳转。您需要使用Capacitor的[App API](/apis/app.md)在应用启动时自行实现。

### Angular方案

在`app.component.ts`中实现路由逻辑：

```typescript
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
```

```typescript
constructor(private router: Router, private zone: NgZone) {
    this.initializeApp();
}
```

```typescript
initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
            const slug = event.url.split(".app").pop();
            if (slug) {
                this.router.navigateByUrl(slug);
            }
        });
    });
}
```

### React方案

创建`AppUrlListener.tsx`组件：

```typescript
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { App, URLOpenListenerEvent } from '@capacitor/app';
```

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
```

在`App.tsx`中引入组件：

```typescript
import AppUrlListener from './pages/AppUrlListener';
```

```tsx
<IonReactRouter>
    <AppUrlListener></AppUrlListener>
    {/* 其他路由配置 */}
</IonReactRouter>
```

### Vue方案

在路由配置文件（如`routes.js`）中实现：

```typescript
import { App, URLOpenListenerEvent } from '@capacitor/app';
import Vue from 'vue';
import VueRouter from 'vue-router';
```

```typescript
const router = new VueRouter({
  routes: [],
  mode: 'history'
});
```

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

需要在网站`.well-known`目录下放置验证文件，例如：https://beerswift.app/.well-known/

## iOS配置

### 创建关联文件

1. 登录[Apple开发者网站](https://developer.apple.com)
2. 在应用标识符中启用"Associated Domains"
3. 创建无扩展名的`apple-app-site-association`文件：

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

4. 使用[验证工具](https://search.developer.apple.com/appsearch-validation-tool/)检查配置

### 添加关联域名

在Xcode的Signing & Capabilities中添加`applinks:yourdomain.com`格式的域名。

## Android配置

### 创建关联文件

1. 生成或获取Keystore证书
2. 通过命令获取SHA256指纹：
```shell
keytool -list -v -keystore my-release-key.keystore
```

3. 使用Google的[Asset Links工具](https://developers.google.com/digital-asset-links/tools/generator)生成`assetlinks.json`：

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

### 添加Intent Filter

在`AndroidManifest.xml`的Activity中添加：

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="beerswift.app" />
</intent-filter>
```

## 网站部署

### 各框架配置建议

- **Angular**：将文件放入`src/.well-known`，在`angular.json`中添加资源配置
- **NuxtJS/React**：直接将文件放入`static/.well-known`或`public/.well-known`
- **WordPress**：参考专用配置指南

## 验证测试

直接在已安装应用的设备上点击网站链接测试即可，无需发布到应用商店。

## 扩展阅读

- Branch.io：[深度链接详解](https://branch.io/what-is-deep-linking/)
- Android官方：[应用链接](https://developer.android.com/training/app-links)
- iOS官方：[通用链接文档](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content)