---
title: Push Notifications - Firebase
description: 学习如何在 Ionic 应用中实现 iOS 和 Android 的 Firebase 云消息推送功能
contributors:
  - bryplano
  - javebratt
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 推送通知

**Web 框架**: Angular  
**平台支持**: iOS, Android

推送通知是应用开发者最常为用户提供的功能之一。本教程将详细介绍如何在使用 Ionic + Angular 框架的应用中，通过 [Capacitor Push Notification API](https://capacitorjs.com/docs/apis/push-notifications) 实现 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) 在 iOS 和 Android 平台的推送功能。

## 准备工作

### 必备依赖
使用 Capacitor 构建和部署 iOS/Android 应用需要一些基础配置，请先[按照环境搭建指南](/main/getting-started/environment-setup.md)完成必要组件的安装。

测试 iOS 推送通知需要[付费的 Apple 开发者账号](https://developer.apple.com/)。

注意：如果项目中使用了其他依赖 Firebase SDK 的 Cordova 插件，请确保它们都是最新版本。

### 创建 Ionic Capacitor 应用
若已有 Ionic 项目可跳过本节。

安装最新版 Ionic CLI：
```bash
npm install -g @ionic/cli
```

创建基于空白模板的 Angular 项目：
```bash
ionic start capApp blank --type=angular
cd capApp/
```

修改 `capacitor.config.ts` 中的应用标识：
```diff
const config: CapacitorConfig = {
- appId: 'io.ionic.starter',
+ appId: 'com.mydomain.myappnam',
  appName: 'capApp',
  webDir: 'www'
};
```

### 构建应用并添加平台
首次构建生成 Web 资源目录：
```bash
ionic build
```

添加原生平台支持：
```bash
ionic cap add ios
ionic cap add android
```

## 实现推送通知功能

### 安装 Capacitor 插件
```bash
npm install @capacitor/push-notifications
npx cap sync
```

### 配置通知监听
在 `home.page.ts` 中添加推送通知的注册和监听逻辑：

```typescript
import { Component, OnInit } from '@angular/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  ngOnInit() {
    console.log('初始化主页');

    // 请求推送权限
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    // 注册成功回调
    PushNotifications.addListener('registration', (token: Token) => {
      alert('推送注册成功，令牌: ' + token.value);
    });

    // 注册失败处理
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('注册错误: ' + JSON.stringify(error));
    });

    // 收到前台通知
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      alert('收到推送: ' + JSON.stringify(notification));
    });

    // 点击通知处理
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('推送操作触发: ' + JSON.stringify(notification));
    });
  }
}
```

更新项目变更：
```bash
ionic build
npx cap copy
```

## Firebase 项目配置

前往 [Firebase 控制台](https://console.firebase.google.com/)创建新项目，设置项目名称并接受服务条款。

### Android 配置
1. 在项目概览页添加 Android 应用
2. 输入与 `capacitor.config.ts` 中一致的包名（如 `com.mydomain.myappname`）
3. 下载 `google-services.json` 并放置到 `android/app/` 目录

### iOS 配置
#### 前期准备
- 配置 Apple 开发者证书和描述文件
- 创建 APNS 证书或密钥
- 在 Xcode 中启用推送通知能力

#### 集成步骤
1. 在 Firebase 中添加 iOS 应用，包名同样匹配 `appId`
2. 下载 `GoogleService-Info.plist` 并添加到 Xcode 项目
3. 修改 Podfile 添加 Firebase 依赖：
```ruby
target 'App' do
  capacitor_pods
  pod 'FirebaseMessaging'
end
```
4. 更新 iOS 项目：
```bash
npx cap update ios
```
5. 在 `AppDelegate.swift` 中添加 Firebase 初始化代码：
```swift
import FirebaseCore
import FirebaseMessaging

// 在 didFinishLaunchingWithOptions 中添加
FirebaseApp.configure()

// 添加推送注册回调
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  Messaging.messaging().apnsToken = deviceToken
  // ... 令牌处理逻辑
}
```

6. 将 APNS 证书或密钥上传到 Firebase 控制台

## 测试推送通知

### 运行应用
- Android: `npx cap open android`
- iOS: `npx cap open ios`

注意：iOS 需要允许通知权限

### 发送测试消息
1. 进入 Firebase 控制台的 Cloud Messaging 板块
2. 创建新通知，填写：
   - 通知正文
   - 标题（Android 必需）
   - 选择目标设备
3. 点击发布后，设备应收到通知并显示内容弹窗

![Android 测试效果](/img/v6/docs/guides/firebase-push-notifications/push-test-android.png)
![iOS 测试效果](/img/v6/docs/guides/firebase-push-notifications/push-test-ios.png)

## 高级功能：带图片的通知

### Android
直接通过 Firebase 控制台添加「通知图片」即可自动显示

![Android 图片通知示例](/img/v6/docs/guides/firebase-push-notifications/android-push-image.jpeg)

### iOS
需添加通知服务扩展：
1. 在 Xcode 中创建 `Notification Service Extension`
2. 设置部署目标为 iOS 13.0
3. 修改 Podfile 添加扩展目标依赖：
```ruby
target 'pushextension' do
  pod 'FirebaseMessaging'
end
```
4. 更新 `NotificationService.swift` 处理图片逻辑

完成配置后，iOS 通知将显示右侧图片：

![iOS 图片通知示例](/img/v6/docs/guides/firebase-push-notifications/ios-push-image.jpeg)