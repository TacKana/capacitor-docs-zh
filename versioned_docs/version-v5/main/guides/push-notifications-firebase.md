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

推送通知是应用开发者最常为用户提供的功能之一。本教程将完整演示如何通过 [Firebase 云消息服务](https://firebase.google.com/docs/cloud-messaging) 在 iOS 和 Android 设备上实现推送功能。

我们将使用 [Capacitor 推送通知 API](https://capacitorjs.com/docs/apis/push-notifications) 在 Ionic + Angular 应用中完成 Firebase 推送的注册和监控流程。

## 环境准备

使用 Capacitor 构建和部署 iOS/Android 应用需要一些基础配置。请先 [按照环境设置指南安装必要的依赖](/main/getting-started/environment-setup.md) 再继续后续步骤。

要在 iOS 上测试推送通知，你需要 [付费的苹果开发者账号](https://developer.apple.com/) 和一台实体 iOS 设备。

如果遇到问题或控制台提示某些包版本过时，请确保你使用的是最新稳定版的 Node、Android Studio 和 Xcode。

注意：由于我们使用 Firebase 实现推送，如果项目中其他 Cordova 插件也使用了 Firebase SDK，请确保这些插件都已更新到最新版本。

## 创建 Ionic Capacitor 应用

已有 Ionic 项目的开发者可跳过本节。让我们先使用终端安装最新版 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接着用 CLI 基于 **空白模板** 创建一个名为 **capApp** 的 Ionic Angular 项目：

```bash
ionic start capApp blank --type=angular
```

当提示是否集成 Capacitor 时，输入 `y` 并回车。这会将 Capacitor 及其 CLI 添加到新项目中。

项目创建完成后，进入项目目录：

```bash
cd capApp/
```

最后执行初始化命令设置应用信息：

```bash
npx cap init
? App name: CapApp
? App Package ID: com.mydomain.myappname
```

## 构建应用与添加平台

在添加原生平台前，必须先构建应用生成 Web 资源目录（Ionic Angular 项目中的 `www` 文件夹）。

```bash
ionic build
```

接着添加 iOS 和 Android 平台支持：

```bash
npx cap add ios
npx cap add android
```

这些命令会在项目根目录创建 `android` 和 `ios` 文件夹，它们是完整的原生项目，应当纳入版本控制。

## 使用 Capacitor 推送通知 API

首先安装推送通知插件：

```bash
npm install @capacitor/push-notifications
npx cap sync
```

在对接 Firebase 前，我们需要确保应用能通过 Capacitor API 注册推送通知。我们在 `home.page.ts` 中添加导入：

```typescript
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
```

然后在 `ngOnInit()` 中添加注册和监控逻辑，并用 `alert()` 展示通知到达时的负载：

```typescript
export class HomePage implements OnInit {

ngOnInit() {
    console.log('初始化首页');

    // 请求推送通知权限
    // iOS 会弹出提示，Android 会直接授予
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple/Google 注册推送服务
        PushNotifications.register();
      } else {
        // 处理错误
      }
    });

    // 注册成功回调
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('推送注册成功，令牌: ' + token.value);
      }
    );

    // 注册失败回调
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('注册错误: ' + JSON.stringify(error));
      }
    );

    // 应用在前台时显示通知内容
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('收到推送: ' + JSON.stringify(notification));
      }
    );

    // 点击通知回调
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('推送操作触发: ' + JSON.stringify(notification));
      }
    );
}
```

完整代码如下：

```typescript
import { Component, OnInit } from '@angular/core';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  ngOnInit() {
    console.log('初始化首页');

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        // 处理错误
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('推送注册成功，令牌: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('注册错误: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('收到推送: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('推送操作触发: ' + JSON.stringify(notification));
      },
    );
  }
}
```

更新完成后构建并同步变更：

```bash
ionic build
npx cap copy
```

## 在 Firebase 控制台创建项目

前往 [Firebase 控制台](https://console.firebase.google.com/) 点击 **添加项目**，填写项目名称并同意服务条款后创建项目，系统会自动生成项目 ID。

## Android 配置

### 集成 Firebase 服务

进入项目概览页，点击顶部的 **Android 图标** 添加应用：

![添加 Android 应用](../../../../static/img/v5/docs/guides/firebase-push-notifications/add-android-app.png)

填写应用信息：
- **Android 包名** 需与 `capacitor.config.json` 中的 **appId** 一致
- 我们使用之前设置的 `com.mydomain.myappname`
- 昵称和调试签名证书可选

点击 **注册应用** 后下载 `google-services.json` 文件，将其放入 Android 项目的 `android/app/` 目录：

![Android 配置文件位置](../../../../static/img/v5/docs/guides/firebase-push-notifications/google-services-location-android.png)

Capacitor 已自动包含 Firebase 依赖，无需额外配置。

## iOS 配置

### 前提条件

iOS 推送配置比 Android 复杂，需要：
1. 在苹果开发者门户配置 [开发/生产证书和描述文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)
2. 创建 [APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
3. 在 Xcode 中 [启用推送通知能力](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)
4. 准备实体 iOS 设备（参考 [环境配置指南](/main/getting-started/environment-setup.md)）

### 集成 Firebase

在 Firebase 项目概览页点击 **添加应用** 选择 iOS 平台：

填写应用信息：
- **iOS 包 ID** 需与 `capacitor.config.json` 中的 **appId** 一致
- 同样使用 `com.mydomain.myappname`
- 应用昵称和应用商店 ID 可选

下载 `GoogleService-Info.plist` 文件后，通过以下命令打开 Xcode：

```bash
npx cap open ios
```

将 `.plist` 文件拖入 Xcode 项目并确保勾选所有目标：

![iOS 配置文件位置](../../../../static/img/v5/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 通过 CocoaPods 添加 Firebase SDK

在 Xcode 的 `Pods` 目录下找到 `Podfile`，在 App target 部分添加：

```ruby
target 'App' do
  capacitor_pods
  pod 'Firebase/Messaging' # 添加此行
end
```

完整 `Podfile` 示例：

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '13.0'
use_frameworks!

install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
end

target 'App' do
  capacitor_pods
  pod 'Firebase/Messaging'
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

更新 iOS 项目（此过程可能耗时）：

```bash
npx cap update ios
```

### 添加初始化代码

在 `AppDelegate.swift` 顶部添加导入：

```swift
import Firebase
```

在 `application(didFinishLaunchingWithOptions)` 方法中添加配置：

```swift
FirebaseApp.configure()
```

并添加推送注册处理方法：

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  Messaging.messaging().apnsToken = deviceToken
  Messaging.messaging().token(completion: { (token, error) in
    if let error = error {
        NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
    } else if let token = token {
        NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: token)
    }
  })
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

### 上传 APNS 证书到 Firebase

在 Firebase 控制台的项目概览页：
1. 点击 iOS 应用后选择设置图标
2. 进入 **Cloud Messaging** 标签页
3. 在 iOS 配置部分上传之前创建的 APNS 证书或密钥

## 发送测试通知

通过以下命令打开对应 IDE：

```bash
npx cap open android  # 或 ios
```

将应用安装到设备后，注意 iOS 设备上要 **允许通知**，注册成功会显示提醒弹窗。

在 Firebase 控制台的 **Cloud Messaging** 部分创建新通知：
1. 填写通知正文
2. 设置标题（Android 必需，iOS 可选）
3. 选择目标（建议直接选对应平台应用）
4. 发送时间选 "立即"

点击 **发布** 后，设备将收到通知并显示内容弹窗：

![Android 测试推送](../../../../static/img/v5/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS 测试推送](../../../../static/img/v5/docs/guides/firebase-push-notifications/push-test-ios.png)

## 带图片的推送通知

### Android 图片推送
Android 会自动显示图片推送。在 [Firebase 控制台](https://console.firebase.google.com/) 测试时设置 `通知图片` 即可：

![Android 图片推送](../../../../static/img/v5/docs/guides/firebase-push-notifications/android-push-image.jpeg)

### iOS 图片推送
iOS 需要添加 [通知服务扩展](https://developer.apple.com/documentation/usernotifications/unnotificationserviceextension)：

在 Xcode 中：
1. 选择 `File` > `New` > `Target`
2. 创建 `Notification Service Extension`（如命名为 `pushextension`）
3. 激活后选择该 Target
4. 添加 `Push Notifications` 能力
5. 将部署目标改为 `iOS 13.0`

在 `Podfile` 中添加：

```ruby
target 'pushextension' do
  pod 'Firebase/Messaging'
end
```

更新依赖：

```bash
npx cap update ios
```

替换 `NotificationService.swift` 内容为：

```swift
import UserNotifications
import FirebaseMessaging

class NotificationService: UNNotificationServiceExtension {
    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        guard let content = request.content.mutableCopy() as? UNMutableNotificationContent else { return }
        self.contentHandler = contentHandler
        self.bestAttemptContent = content
        
        FIRMessagingExtensionHelper().populateNotificationContent(content, withContentHandler: contentHandler)
    }
    
    override func serviceExtensionTimeWillExpire() {
        guard let contentHandler = contentHandler,
              let bestAttemptContent =  bestAttemptContent else { return }
        
        contentHandler(bestAttemptContent)
    }
}
```

测试时推送将显示右侧图片：

![iOS 图片推送](../../../../static/img/v5/docs/guides/firebase-push-notifications/ios-push-image.jpeg)