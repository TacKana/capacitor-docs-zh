---
title: 使用 Firebase 实现推送通知
description: 学习如何在 Ionic 应用中为 iOS 和 Android 配置 Firebase 云消息推送
contributors:
  - bryplano
  - javebratt
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 推送通知

**Web框架**: Angular  
**平台支持**: iOS, Android

推送通知是应用开发者最常为用户提供的功能之一。本教程将详细介绍如何在 iOS 和 Android 上配置 [Firebase 云消息推送](https://firebase.google.com/docs/cloud-messaging)。

我们将使用 [Capacitor 的推送通知 API](https://capacitorjs.com/docs/apis/push-notifications) 在 Ionic + Angular 应用中实现 Firebase 推送通知的注册和监听功能。

## 所需依赖

使用 Capacitor 构建和部署 iOS/Android 应用需要一些准备工作。请先[按照环境设置指南安装必要的 Capacitor 依赖](/main/getting-started/environment-setup.md)。

注意事项：
- 测试 iOS 推送通知需要[付费的 Apple 开发者账号](https://developer.apple.com/)和物理 iOS 设备
- 确保使用最新稳定版的 Node、Android Studio 和 Xcode
- 如果使用其他 Cordova 插件，请确保它们使用最新版 Firebase SDK

## 创建 Ionic Capacitor 应用

已有 Ionic 应用的开发者可跳过此部分。新建应用的步骤如下：

1. 安装最新版 Ionic CLI：
```bash
npm install -g @ionic/cli
```

2. 创建名为 **capApp** 的空白模板项目：
```bash
ionic start capApp blank --type=angular
```
提示是否集成 Capacitor 时输入 `y`

3. 进入项目目录并初始化：
```bash
cd capApp/
npx cap init
? App名称: CapApp
? 应用包ID: com.mydomain.myappname
```

## 构建应用与添加平台

在添加原生平台前，必须先构建应用生成 web 资源：
```bash
ionic build
```

添加 iOS 和 Android 平台：
```bash
npx cap add ios
npx cap add android
```
这将在项目根目录创建 `android` 和 `ios` 文件夹，这些是独立的本机项目文件。

## 使用 Capacitor 推送通知 API

1. 安装插件：
```bash
npm install @capacitor/push-notifications
npx cap sync
```

2. 在 `home.page.ts` 中添加推送通知逻辑：
```typescript
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

export class HomePage implements OnInit {
  ngOnInit() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    // 各事件监听器
    PushNotifications.addListener('registration', (token: Token) => {
      alert('推送注册成功，令牌: ' + token.value);
    });
    
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('注册错误: ' + JSON.stringify(error));
    });

    // 其他监听器...
  }
}
```

3. 更新构建：
```bash
ionic build
npx cap copy
```

## 创建 Firebase 项目

1. 访问 [Firebase 控制台](https://console.firebase.google.com/) 创建新项目
2. 输入项目名称，接受条款后点击创建

## Android 配置

### 集成 Firebase
1. 在项目概览页点击 Android 图标
2. 填写包名（与 `capacitor.config.json` 中的 appId 一致）
3. 下载 `google-services.json` 并放置到 `android/app/` 目录

## iOS 配置

### 前提条件
- 付费 Apple 开发者账号
- 配置好开发/生产证书和配置文件
- 创建 APNS 证书或密钥
- 在 Xcode 中启用推送通知能力
- 准备物理 iOS 设备

### 集成步骤
1. 在 Firebase 中添加 iOS 应用，填写相同的包名
2. 下载 `GoogleService-Info.plist` 并添加到 Xcode 项目中
3. 在 Podfile 中添加 Firebase 依赖：
```ruby
target 'App' do
  pod 'Firebase/Messaging'
end
```
4. 更新 iOS 项目：
```bash
npx cap update ios
```
5. 在 `AppDelegate.swift` 中添加初始化代码：
```swift
import Firebase

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    FirebaseApp.configure()
    return true
}
```
6. 将 APNS 证书或密钥上传到 Firebase

## 测试推送通知

1. 在设备上运行应用：
```bash
npx cap open android  # 或 ios
```
(iOS 需允许通知权限)

2. 在 Firebase 控制台的 Cloud Messaging 部分创建新通知：
   - 填写通知内容和标题
   - 选择目标设备
   - 立即发送

成功配置后，设备将收到通知并显示对应提示。

![Android测试推送](../../../../static/img/v4/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS测试推送](../../../../static/img/v4/docs/guides/firebase-push-notifications/push-test-ios.png)