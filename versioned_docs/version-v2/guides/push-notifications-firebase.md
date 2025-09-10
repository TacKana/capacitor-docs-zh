---
title: 在 Ionic/Angular 应用中使用 Firebase 实现推送通知
description: 学习如何在 Ionic 应用中为 iOS 和 Android 配置 Firebase 云消息推送
contributors:
  - bryplano
  - javebratt
canonicalUrl: https://capacitorjs.com/docs/guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 推送通知

**Web 框架**: Angular  
**平台支持**: iOS, Android

推送通知是应用开发者最常为用户提供的功能之一。本教程将详细介绍如何在 iOS 和 Android 设备上实现 [Firebase 云消息推送](https://firebase.google.com/docs/cloud-messaging)。

为了实现 Firebase 推送通知的注册和监听功能，我们将在 Ionic + Angular 应用中使用 [Capacitor 的推送通知 API](https://capacitorjs.com/docs/apis/push-notifications)。

## 必要依赖

使用 Capacitor 构建和部署 iOS 和 Android 应用需要进行一些基础配置。请先 [按照这里的说明安装必要的 Capacitor 依赖](/getting-started/dependencies.md) 再继续。

要在 iOS 上测试推送通知，您需要拥有 [付费的 Apple 开发者账号](https://developer.apple.com/) 和一台真实的 iOS 设备。

如果遇到问题或控制台显示关于过时/废弃包的警告，请确保您使用的是最新稳定版本的 Node、Android Studio 和 Xcode。

另外，由于我们使用 Firebase 实现推送通知，如果项目中还使用了其他依赖 Firebase SDK 的 Cordova 插件，请确保它们都是最新版本。

## 准备 Ionic Capacitor 应用

如果您已有现成的 Ionic 应用，可跳过本节。否则，让我们先创建一个 Ionic 应用。

在终端中安装最新版 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接着使用 CLI 基于 **空白模板** 创建一个名为 **capApp** 的新 Ionic Angular 项目：

```bash
ionic start capApp blank --type=angular
```

当提示是否将新应用与 Capacitor 集成时，输入 `y` 并按回车。这会将 Capacitor 及其 CLI 添加到我们的项目中。

项目创建完成后，切换到项目目录：

```bash
cd capApp/
```

最后运行 `npx cap init` 来填写应用信息：

```bash
npx cap init
? App name: CapApp
? App Package ID: com.mydomain.myappname
```

## 构建应用并添加平台

在添加任何原生平台前，必须先至少构建一次应用。构建会生成 Capacitor 所需的 web 资源目录（Ionic Angular 项目中的 `www` 文件夹）。

```bash
ionic build
```

接着添加 iOS 和 Android 平台：

```bash
npx cap add ios
npx cap add android
```

运行这些命令后，项目根目录会生成 `android` 和 `ios` 文件夹。这些都是完整的原生项目文件，应该被视为 Ionic 应用的一部分（建议提交到版本控制）。

## 使用 Capacitor 推送通知 API

在配置 Firebase 之前，我们需要确保应用能通过 Capacitor 推送通知 API 注册推送功能。我们还将添加 `alert`（也可以用 `console.log` 替代）来显示设备上接收到的通知内容。

在应用的 `home.page.ts` 文件中添加以下导入和常量：

```typescript
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const { PushNotifications } = Plugins;
```

然后添加 `ngOnInit()` 方法及一些 API 方法来注册和监听推送通知。我们还会在一些事件中添加 `alert()` 来监控过程：

```typescript
export class HomePage implements OnInit {

ngOnInit() {
    console.log('初始化主页');

    // 请求推送通知权限
    // iOS 会提示用户并返回是否授予权限
    // Android 会直接授予权限
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // 向 Apple/Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示错误
      }
    });

    // 注册成功后可接收通知
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        alert('推送注册成功，令牌: ' + token.value);
      }
    );

    // 配置问题导致推送无法工作
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('注册错误: ' + JSON.stringify(error));
      }
    );

    // 当应用在前台时显示通知内容
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('收到推送: ' + JSON.stringify(notification));
      }
    );

    // 点击通知时触发
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('推送操作执行: ' + JSON.stringify(notification));
      }
    );
}
```

完整实现如下：

```typescript
import { Component, OnInit } from '@angular/core';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  ngOnInit() {
    console.log('初始化主页');

    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        PushNotifications.register();
      } else {
        // 显示错误
      }
    });

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        alert('推送注册成功，令牌: ' + token.value);
      },
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('注册错误: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotification) => {
        alert('收到推送: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('推送操作执行: ' + JSON.stringify(notification));
      },
    );
  }
}
```

修改后需要重新构建并同步变更：

```bash
ionic build
npx cap copy
```

## 在 Firebase 中创建应用项目

在将 Firebase 云消息推送连接到应用前，需要先在 Firebase 中创建项目。

访问 [Firebase 控制台](https://console.firebase.google.com/) 并点击 **添加项目** 按钮。

输入项目名称，接受 Firebase 服务条款，点击 **创建项目** 继续。系统会自动生成一个项目 ID。

## Android 配置

### 将 Firebase 集成到 Android 应用

本节内容与 [使用 Firebase 控制台设置 Firebase 的文档](https://firebase.google.com/docs/android/setup?authuser=0) 基本一致。以下是与 Capacitor 相关的特殊说明。

进入 Firebase 项目的概览页面，点击顶部的 **Android** 图标添加新的 Android 应用。

![在 Firebase 控制台添加 Android 应用](../../../static/img/v3/docs/guides/firebase-push-notifications/add-android-app.png)

下一步需要填写应用信息：

- **Android 包名** 应与 `capacitor.config.json` 文件中的 **appId** 一致
- 我们使用的是 `com.mydomain.myappname` 作为 Capacitor 应用 ID
- 昵称和调试签名证书可选

然后点击 **注册应用** 按钮。

### 下载并使用 `google-services.json` 文件

下一步会提示下载 `google-services.json` 文件。该文件包含 Android 应用连接 Firebase 所需的信息。

将文件下载到本地后，放入 Capacitor Android 项目目录下的 `android/app/` 中。

![Android 的 Google Services JSON 位置](../../../static/img/v3/docs/guides/firebase-push-notifications/google-services-location-android.png)

不需要手动添加依赖，因为 Capacitor 项目已自动在 `build.gradle` 文件中包含了 `firebase-messaging`。

## iOS 配置

### 前提条件

iOS 推送通知的设置比 Android 复杂得多。您必须拥有 [付费的 Apple 开发者账号](https://developer.apple.com/) 并完成以下准备工作：

1. 在 Apple 开发者门户中 [设置正确的开发或生产证书及配置文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)
2. 在 Apple 开发者门户中 [创建 APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
3. 在 Xcode 中 [确保已启用推送通知功能](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)
4. 按照 [依赖项](/getting-started/dependencies.md) 文档的要求准备真实 iOS 设备

### 将 Firebase 集成到 iOS 应用

这部分与 Android 配置类似，但有几点关键差异。

首先进入 Firebase 项目的 **概览** 页面。如果按照本指南操作，页面顶部应该已列出 Android 应用。

要添加 iOS 平台，点击 **添加应用** 按钮并选择 **iOS** 平台。

填写应用信息：

- **iOS 包 ID** 应与 `capacitor.config.json` 文件中的 **appId** 一致
- 我们使用的是 `com.mydomain.myappname` 作为 Capacitor 应用 ID
- 应用昵称和 App Store ID 可选

然后点击 **注册应用** 按钮。

### 添加 `GoogleService-Info.plist` 文件到 iOS 应用

*注意：这与 Android 使用的文件不同。*

下载提供的 `GoogleService-Info.plist` 文件到本地。

接着打开 Xcode：

```bash
npx cap open ios
```

按照 Firebase 的说明将 `.plist` 文件添加到 Xcode 项目中，确保包含所有目标。

![iOS 的 Google Service Info Plist 位置](../../../static/img/v3/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 通过 CocoaPods 添加 Firebase SDK

iOS 的推送通知 API 使用 CocoaPods（iOS 依赖管理系统），我们需要配置 CocoaPods 使用 Firebase。

修改 Xcode 中 `Pods` 下的 `Podfile`：

![iOS 的 Podfile 位置](../../../static/img/v3/docs/guides/firebase-push-notifications/podfile-location-ios.png)

在 App 目标的配置中添加 Firebase。在 `target 'App'` 部分添加 `pod 'FirebaseCore'` 和 `pod 'Firebase/Messaging'`：

```ruby
target 'App' do
capacitor_pods
# 在此添加您的 Pods
pod 'FirebaseCore', '7.11.0' # 添加此行
pod 'Firebase/Messaging', '7.11.0' # 添加此行
end
```

完整的 `Podfile` 应类似这样：

```ruby
platform :ios, '11.0'
use_frameworks!

# 避免 Xcode 缓存 Pods 的解决方案
# 安装新 Cordova 插件后需要执行 Product -> Clean Build Folder
# 需要 CocoaPods 1.6 或更新版本
install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  # 自动添加 Capacitor Pod 依赖，请勿删除
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'

  # 请勿删除
end

target 'App' do
  capacitor_pods
  # 在此添加您的 Pods
  pod 'FirebaseCore', '7.11.0'
  pod 'Firebase/Messaging', '7.11.0'
end
```

### 更新项目

现在需要确保 iOS 项目更新并安装了正确的 Firebase CocoaPod。

*注意：此过程可能耗时较长，因为 CocoaPods 需要下载所有相关文件/依赖项。*

```bash
npx cap update ios
```

### 添加初始化代码

要在 iOS 应用启动时连接 Firebase，需要在 `AppDelegate.swift` 文件中添加以下内容。

首先在文件顶部添加导入：

```swift
import FirebaseCore
```

然后在 `application(_ application: UIApplication, didFinishLaunchingWithOptions)` 方法中添加 Firebase 配置代码：

```swift
FirebaseApp.configure()
```

完整的 `AppDelegate.swift` 文件如下：

```swift
import UIKit
import Capacitor
import FirebaseCore

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?


  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // 应用启动后的自定义点
    FirebaseApp.configure()
    return true
  }
```

如果想从 iOS 获取 Firebase FCM 令牌而非原始 APNS 令牌，还需要在文件顶部添加两个新导入：

```swift
import FirebaseInstanceID // 在 import FirebaseCore 后添加此行
import FirebaseMessaging
```

并将 `AppDelegate.didRegisterForRemoteNotificationsWithDeviceToken` 代码修改为：

```swift
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        Messaging.messaging().apnsToken = deviceToken
        InstanceID.instanceID().instanceID { (result, error) in
            if let error = error {
                NotificationCenter.default.post(name: Notification.Name(CAPNotifications.DidFailToRegisterForRemoteNotificationsWithError.name()), object: error)
            } else if let result = result {
                NotificationCenter.default.post(name: Notification.Name(CAPNotifications.DidRegisterForRemoteNotificationsWithDeviceToken.name()), object: result.token)
            }
        }
    }
```

### 将 APNS 证书或密钥上传至 Firebase

如果按照指南操作，您已在 Apple 开发者门户创建了 APNS 证书或 APNS 认证密钥。需要将其上传至 Firebase，Firebase 才能与 APNS 通信并向您的应用发送推送通知。

从 **项目概览** 页面上传：

1. 点击您的 iOS 应用，然后点击 **设置** 齿轮图标
2. 在设置页面，点击 **云消息** 标签
3. 在 **iOS 应用配置** 标题下，使用提供的 **上传** 按钮上传您的认证密钥或证书

## 发送测试通知

现在到了验证环节 - 让我们确认 Firebase 推送通知在 Android 和 iOS 上都能正常工作！

需要先在 Android 或 iOS 上启动应用，使 `home.page.ts` 能够注册并接收通知。

打开 Android 项目：

```bash
npx cap open android
```

打开 iOS 项目：

```bash
npx cap open ios
```

项目打开后，使用 Android Studio 或 Xcode 的运行功能将应用加载到设备上。应用会启动并显示主页。

*注意：在 iOS 上，您会看到允许应用发送通知的弹窗 - 请务必选择 **允许通知**！*

如果应用注册成功且您按照上述代码操作，应该会看到注册成功的提示！

现在测试设备是否能接收到通知。要发送通知，在 Firebase 中进入项目面板 Grow 标题下的 **云消息** 部分。

点击 **新通知** 按钮。

创建通知时只需指定以下信息：

1. 通知文本内容
2. 标题（仅 Android 必需，iOS 可选）
3. 目标（用户群组或主题；建议直接选择 iOS 或 Android 应用本身，见下图）

![更改 Firebase 推送目标](../../../static/img/v3/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4. 调度（保持 "立即"）

完成后可以 **预览** 通知内容，点击 **发布** 发送通知。

如果配置正确，您将在设备主屏幕上看到包含 Firebase 通知内容的弹窗。点击通知后还会触发 `pushActionPerformed` 事件的 `alert`，如我们之前的代码所示。

![Android 推送测试](../../../static/img/v3/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS 推送测试](../../../static/img/v3/docs/guides/firebase-push-notifications/push-test-ios.png)