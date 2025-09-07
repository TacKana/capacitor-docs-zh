---
title: Push Notifications - Firebase
description: 学习如何在 Ionic 应用中实现 iOS 和 Android 的 Firebase 云消息推送功能
contributors:
  - bryplano
  - javebratt
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 推送通知

**Web框架**: Angular  
**平台支持**: iOS, Android  

推送通知是应用开发者最常为用户提供的功能之一。本教程将详细介绍如何使 [Firebase 云消息服务](https://firebase.google.com/docs/cloud-messaging) 在 iOS 和 Android 设备上正常工作。

我们将利用 [Capacitor 推送通知 API](https://capacitorjs.com/docs/v3/apis/push-notifications) 在 Ionic + Angular 应用中实现 Firebase 推送通知的注册和监听功能。

## 必要依赖

使用 Capacitor 构建和部署 iOS 和 Android 应用需要一些准备工作。请先 [按照环境配置指南安装必要的 Capacitor 依赖](/main/getting-started/environment-setup.md)，然后再继续后续步骤。

要在 iOS 上测试推送通知，你需要拥有 [付费的 Apple 开发者账号](https://developer.apple.com/) 和一台实体 iOS 设备。

如果遇到问题或控制台显示关于过时/废弃包的警告，请确保你使用的是 Node、Android Studio 和 Xcode 的最新稳定版本。

另外，由于我们使用 Firebase 实现推送通知，如果你使用了其他依赖 Firebase SDK 的 Cordova 插件，请确保它们也是最新版本。

## 准备 Ionic Capacitor 应用

如果你已有 Ionic 应用，可跳过本节。否则，让我们先创建一个 Ionic 应用。

在终端中安装最新版 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接着使用 CLI 基于 **空白模板** 创建一个新的 Ionic Angular 应用，命名为 **capApp**：

```bash
ionic start capApp blank --type=angular
```

当提示是否要将新应用与 Capacitor 集成时，输入 `y` 并回车。这会将 Capacitor 及其 CLI 添加到我们的新应用中。

应用创建成功后，切换到项目目录：

```bash
cd capApp/
```

最后运行 `npx cap init` 来填写应用信息：

```bash
npx cap init
? App名称: CapApp
? 应用包ID: com.mydomain.myappname
```

## 构建应用并添加平台

在添加任何原生平台前，项目至少需要构建一次。构建会生成 Capacitor 所需的 Web 资源目录（Ionic Angular 项目中的 `www` 文件夹）。

```bash
ionic build
```

接着添加 iOS 和 Android 平台：

```bash
npx cap add ios
npx cap add android
```

运行这些命令后，会在项目根目录创建 `android` 和 `ios` 文件夹。这些是完整的原生项目文件，应视为 Ionic 应用的组成部分（建议提交到版本控制）。

## 使用 Capacitor 推送通知 API

首先安装 Capacitor 推送通知插件：

```bash
npm install @capacitor/push-notifications
npx cap sync
```

在接入 Firebase 前，我们需要确保应用能够使用 Capacitor Push Notification API 注册推送通知。我们还会添加 `alert`（也可以用 `console.log`）来展示设备上应用打开时收到的通知内容。

在应用的 `home.page.ts` 文件中添加导入和常量声明：

```typescript
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
```

然后添加 `ngOnInit()` 方法和一些 API 方法来注册和监听推送通知。我们还会在一些事件中添加 `alert()` 来监控流程：

```typescript
export class HomePage implements OnInit {

ngOnInit() {
    console.log('正在初始化首页');

    // 请求推送通知权限
    // iOS 会弹出提示并返回用户选择结果
    // Android 会直接授予权限
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple/Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示错误
      }
    });

    // 注册成功后可以接收通知
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('推送注册成功，token: ' + token.value);
      }
    );

    // 配置有问题导致推送不可用
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('注册错误: ' + JSON.stringify(error));
      }
    );

    // 应用在设备上打开时显示通知内容
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('收到推送: ' + JSON.stringify(notification));
      }
    );

    // 点击通知时触发的方法
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('推送操作执行: ' + JSON.stringify(notification));
      }
    );
}
```

以下是 `home.page.ts` 的完整实现：

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
    console.log('正在初始化首页');

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        // 显示错误
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('推送注册成功，token: ' + token.value);
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
        alert('推送操作执行: ' + JSON.stringify(notification));
      },
    );
  }
}
```

之后需要构建项目并让 Capacitor 同步变更：

```bash
ionic build
npx cap copy
```

## 在 Firebase 中创建应用项目

在将 Firebase 云消息服务连接到应用并发送推送通知前，你需要在 Firebase 中创建一个项目。

访问 [Firebase 控制台](https://console.firebase.google.com/) 并点击 **添加项目** 按钮。

输入项目名称，接受 Firebase 服务条款，点击 **创建项目** 继续。系统会自动为你生成项目 ID。

## Android

### 将 Firebase 集成到 Android 应用

本节内容基本遵循 [使用 Firebase 控制台设置 Firebase 的文档](https://firebase.google.com/docs/android/setup?authuser=0)。以下是针对 Capacitor 的特殊说明。

进入 Firebase 项目的概览页面，点击顶部的 **Android** 图标添加新的 Android 应用。

![在 Firebase 控制台添加 Android 应用](../../../../static/img/v3/docs/guides/firebase-push-notifications/add-android-app.png)

接下来会要求填写应用信息：

- **Android 包名** 应与 `capacitor.config.json` 文件中的 **appId** 一致
- 我们在 Capacitor 应用中使用的是 `com.mydomain.myappname`
- 昵称和调试签名证书是可选项

然后点击 **注册应用** 按钮。

### 下载并使用 `google-services.json` 文件

接下来会提示下载 `google-services.json` 文件。这个文件包含 Capacitor 应用从 Android 端连接 Firebase 所需的信息。

将文件下载到本地后，移动到 Capacitor Android 项目目录下的 `android/app/` 中。

![Android 的 Google Services JSON 位置](../../../../static/img/v3/docs/guides/firebase-push-notifications/google-services-location-android.png)

我们不需要手动添加依赖，因为 Capacitor 项目已自动在 `build.gradle` 文件中包含了 `firebase-messaging`。

## iOS

### 前提条件

iOS 推送通知的设置比 Android 复杂得多。你必须拥有 [付费的 Apple 开发者账号](https://developer.apple.com/) 并在测试推送通知前完成以下准备工作：

1. 在 Apple 开发者门户中为应用 [设置正确的开发或生产证书及配置文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)
2. 在 Apple 开发者门户中 [创建 APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
3. 在 Xcode 中 [确保已启用推送通知能力](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)
4. 根据 [环境设置](/main/getting-started/environment-setup.md) 文档要求使用实体 iOS 设备

### 将 Firebase 集成到原生 iOS 应用

这部分与 Android 部分类似，但有几点关键区别。

首先进入 Firebase 项目的 **概览** 页面。如果按照本指南操作，页面顶部应该已经列出了 Android 应用。

要添加 iOS 支持，点击 **添加应用** 按钮选择 **iOS** 平台。

接下来填写应用信息：

- **iOS 包 ID** 应与 `capacitor.config.json` 文件中的 **appId** 一致
- 我们在 Capacitor 应用中使用的是 `com.mydomain.myappname`
- 应用昵称和 App Store ID 是可选项

然后点击 **注册应用** 按钮。

### 添加 `GoogleService-Info.plist` 文件到 iOS 应用

_注意：这与 Android 使用的文件不同。_

下载提供的 `GoogleService-Info.plist` 文件到本地。

然后打开 Xcode...

```bash
npx cap open ios
```

... 按照 Firebase 说明将 `.plist` 文件添加到 Xcode 项目中，确保包含所有目标。

![iOS 的 Google Service Info Plist 位置](../../../../static/img/v3/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 通过 CocoaPods 添加 Firebase SDK

iOS 上的推送通知 API 使用 CocoaPods（iOS 依赖管理系统），我们需要配置 CocoaPods 使用 Firebase。

为此，需要修改 `Podfile`，该文件可在 Xcode 的 `Pods` 下找到：

![iOS 的 Podfile 位置](../../../../static/img/v3/docs/guides/firebase-push-notifications/podfile-location-ios.png)

我们需要将 Firebase 添加到 App 目标的 CocoaPods 中。在 `target 'App'` 部分添加 `pod 'Firebase/Messaging'`：

```ruby
target 'App' do
capacitor_pods
# 在此添加你的 Pods
pod 'Firebase/Messaging' # 添加此行
end
```

完整的 `Podfile` 应类似如下：

```ruby
platform :ios, '12.0'
use_frameworks!

# 避免 Xcode 缓存 Pods 的解决方案
# 安装新 Cordova 插件后需要 Product -> Clean Build Folder
# 需要 CocoaPods 1.6 或更新版本
install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
end

target 'App' do
  capacitor_pods
  # 在此添加你的 Pods
  pod 'Firebase/Messaging'
end
```

### 更新项目

现在需要确保 iOS 项目更新并安装了正确的 Firebase CocoaPod。

_注意：这部分可能需要较长时间，因为 CocoaPods 需要下载所有相关文件/依赖。_

```bash
npx cap update ios
```

### 添加初始化代码

要在 iOS 应用启动时连接 Firebase，需要在 `AppDelegate.swift` 文件中添加以下内容。

首先在文件顶部添加导入：

```swift
import Firebase
```

然后将 Firebase 配置方法添加到 `AppDelegate.swift` 文件的 `application(didFinishLaunchingWithOptions)` 方法中：

```swift
FirebaseApp.configure()
```

接着添加以下两个方法来正确处理推送注册事件：

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

完整的 `AppDelegate.swift` 文件应类似如下：

```swift
import UIKit
import Capacitor
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?


  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // 应用启动后的自定义点
    FirebaseApp.configure()
    return true
  }

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

### 上传 APNS 证书或密钥到 Firebase

如果你按照初始步骤操作，应该已在 Apple 开发者门户创建了 APNS 证书或 APNS 认证密钥。需要将这些上传到 Firebase，Firebase 才能与 APNS 通信并向你的应用发送推送通知。

要从 **概览** 页面上传证书或密钥：

1. 点击你的 iOS 应用，然后点击 **设置** 齿轮图标
2. 在设置页面，点击 **云消息** 标签页
3. 在 **iOS 应用配置** 标题下，使用提供的 **上传** 按钮上传你的认证密钥或证书

## 发送测试通知

现在到了有趣的部分——验证 Firebase 推送通知在 Android 和 iOS 上是否正常工作！

我们需要在 Android 或 iOS 设备上启动应用，使 `home.page.ts` 页面能够注册并接收通知。

在 Android Studio 中打开 Android 项目：

```bash
npx cap open android
```

在 Xcode 中打开 iOS 项目：

```bash
npx cap open ios
```

项目打开后，使用 Android Studio 或 Xcode 的运行功能将应用侧载到设备上。应用应该会在首页启动。

_注意：在 iOS 上，你会看到允许应用通知的弹窗——请务必选择 **允许通知**！_

如果应用注册成功且你按照上述代码操作，应该会看到注册成功的提示弹窗！

现在我们来测试设备是否能收到通知。要在 Firebase 中发送通知，进入项目面板中 Grow 标题下的 **云消息** 部分。

然后选择 **新通知** 按钮。

创建通知时只需指定以下信息：

1. 通知文本内容
2. 标题（仅 Android 必填，iOS 可选）
3. 目标（可以是用户分群或主题；建议直接选择 iOS 或 Android 应用本身，如下图）

![更改 Firebase 推送目标](../../../../static/img/v3/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4. 调度时间（保留"立即"即可）

此时你可以 **预览** 编辑好的通知，然后点击 **发布** 发送通知。

如果一切配置正确，你会在设备主屏幕上看到包含 Firebase 中编辑内容的通知弹窗。点击通知后，根据我们的代码，应该会触发 `pushActionPerformed` 事件的 `alert`。

![Android 推送测试](../../../../static/img/v3/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS 推送测试](../../../../static/img/v3/docs/guides/firebase-push-notifications/push-test-ios.png)