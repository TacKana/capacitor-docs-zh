---
title: 推送通知 - Firebase
description: 了解如何在 Ionic 应用中让 Firebase Cloud Messaging 在 iOS 和 Android 上正常工作
contributors:
  - bryplano
  - javebratt
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 推送通知

**Web 框架**：Angular
**平台**：iOS、Android

应用程序开发者向其用户提供的最常见功能之一就是推送通知。在本教程中，我们将逐步介绍让 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) 在 iOS 和 Android 上工作所需的所有步骤。

为了注册和监控来自 Firebase 的推送通知，我们将在 Ionic + Angular 应用中使用 [Capacitor 的推送通知 API](https://capacitorjs.com/docs/apis/push-notifications)。

## 所需依赖

使用 Capacitor 构建和部署 iOS 和 Android 应用需要进行一些设置。请先[按照说明安装必要的 Capacitor 依赖](/main/getting-started/environment-setup.md)再继续。

要在 iOS 上测试推送通知，Apple 要求你拥有[付费的 Apple Developer 账户](https://developer.apple.com/)和一个_物理_ iOS 设备。

如果你遇到问题，或者控制台抛出关于过时或弃用包的警告，请确保你使用的是 Node、Android Studio 和 Xcode 的最新稳定版本。

此外，我们使用 Firebase 进行推送通知，因此如果你使用其他使用 Firebase SDK 的 Cordova 插件，请确保它们是最新版本。

## 准备 Ionic Capacitor 应用

如果你已有现有的 Ionic 应用，请跳过此部分。如果没有，让我们先创建一个 Ionic 应用。

在你偏好的终端中，安装最新版本的 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接下来，让我们使用 CLI 基于 **blank** 启动项目创建一个新的 Ionic Angular 应用，并将其命名为 **capApp**：

```bash
ionic start capApp blank --type=angular
```

在提示将你的新应用与 Capacitor 集成时，输入 `y` 并按回车。这将把 Capacitor 和 Capacitor CLI 添加到我们的新应用中。

应用成功创建后，切换到新创建的项目目录：

```bash
cd capApp/
```

最后运行 `npx cap init`，这将允许我们填写应用信息。

```bash
npx cap init
? App name: CapApp
? App Package ID: com.mydomain.myappname
```

## 构建应用和添加平台

在向此项目添加任何原生平台之前，应用必须至少构建一次。Web 构建会创建 Capacitor 所需的 Web 资源目录（在 Ionic Angular 项目中是 `www` 文件夹）。

```bash
ionic build
```

接下来，让我们为应用添加 iOS 和 Android 平台。

```bash
npx cap add ios
npx cap add android
```

运行这些命令后，会在项目根目录下创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目产物，应被视为你的 Ionic 应用的一部分（即检入源代码管理）。

## 使用 Capacitor 推送通知 API

首先，我们需要安装 Capacitor 推送通知插件。

```bash
npm install @capacitor/push-notifications
npx cap sync
```

然后，在接触到 Firebase 之前，我们需要确保我们的应用可以使用 Capacitor 推送通知 API 注册推送通知。我们还将添加一个 `alert`（你也可以使用 `console.log` 语句代替）来在通知到达且应用在设备上打开时显示通知的负载。

在你的应用中，进入 `home.page.ts` 文件，添加 `import` 语句和一个 `const` 以使用 Capacitor 推送 API：

```typescript
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
```

然后，添加 `ngOnInit()` 方法，其中包含一些用于注册和监控推送通知的 API 方法。我们还将为其中一些事件添加 `alert()` 来监控正在发生的情况：

```typescript
export class HomePage implements OnInit {

ngOnInit() {
    console.log('Initializing HomePage');

    // 请求使用推送通知的权限
    // iOS 将提示用户并返回是否授予权限
    // Android 将直接授予而不提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 通过 APNS/FCM 向 Apple/Google 注册以接收推送
        PushNotifications.register();
      } else {
        // 显示一些错误
      }
    });

    // 成功后，我们应该能够接收通知
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('推送注册成功，token: ' + token.value);
      }
    );

    // 设置存在一些问题，推送将无法工作
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('注册错误: ' + JSON.stringify(error));
      }
    );

    // 如果应用在设备上打开，显示通知负载
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('收到推送: ' + JSON.stringify(notification));
      }
    );

    // 点击通知时调用的方法
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('推送操作已执行: ' + JSON.stringify(notification));
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
    console.log('Initializing HomePage');

    // 请求使用推送通知的权限
    // iOS 将提示用户并返回是否授予权限
    // Android 将直接授予而不提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 通过 APNS/FCM 向 Apple/Google 注册以接收推送
        PushNotifications.register();
      } else {
        // 显示一些错误
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
        alert('推送操作已执行: ' + JSON.stringify(notification));
      },
    );
  }
}
```

之后，你需要生成一个新的构建并让 Capacitor 知道这些更改。你可以这样做：

```bash
ionic build
npx cap copy
```

## 在 Firebase 中为你的应用创建项目

在我们可以将 Firebase Cloud Messaging 连接到你的应用并发送推送通知之前，你需要在 Firebase 中启动一个项目。

转到 [Firebase 控制台](https://console.firebase.google.com/)并点击 **Add project** 按钮。

为项目命名，接受 Firebase 服务条款并点击 **Create project** 继续。项目 ID 会自动为你生成。

## Android

### 将 Firebase 与 Android 应用集成

本部分或多或少与[使用 Firebase 控制台设置 Firebase 文档](https://firebase.google.com/docs/android/setup?authuser=0)相呼应。有关 Capacitor 相关的说明，请参见下文。

转到 Firebase 项目的项目概览页面，在顶部点击 **Android** 图标以添加新的 Android 应用。

![在 Firebase 控制台中添加新的 Android 应用](../../../../static/img/v4/docs/guides/firebase-push-notifications/add-android-app.png)

下一个屏幕将要求你提供有关应用的一些信息。

- 你的 **Android package name** 应与 `capacitor.config.json` 中的 **appId** 匹配
- 我们在此 Capacitor 应用 ID 中使用了 `com.mydomain.myappname`，因此我们将在此条目中使用它。
- 昵称和调试签名证书是可选的

然后点击 **Register app** 按钮。

### 下载并使用 `google-services.json` 文件

下一个提示将要求你下载 `google-services.json` 文件。此文件包含你的 Capacitor 应用从 Android 连接到 Firebase 所需的信息。

将 `google-services.json` 文件下载到你的本地机器。然后将该文件移动到你的 Capacitor Android 项目目录中，特别是在 `android/app/` 下。

![Android 的 Google Services JSON 位置](../../../../static/img/v4/docs/guides/firebase-push-notifications/google-services-location-android.png)

我们不需要向项目_添加_任何依赖，因为 Capacitor 项目在其 `build.gradle` 文件中自动包含了 `firebase-messaging` 的版本。

## iOS

### 前提条件

iOS 推送通知的设置比 Android 复杂得多。你必须有[付费的 Apple Developer 账户](https://developer.apple.com/)_并且_在能够使用 iOS 应用测试推送通知之前处理好以下事项：

1. 在 Apple Developer Portal 中为你的 iOS 应用[设置适当的开发或生产证书和配置文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)
2. 在 Apple Developer Portal 中[创建 APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)用于开发或生产
3. 确保在 Xcode 中已为你的应用[启用推送通知功能](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)
4. 根据[环境设置](/main/getting-started/environment-setup.md)文档中的指南，拥有一个物理 iOS 设备

### 将 Firebase 与我们的原生 iOS 应用集成

这部分与上面的 Android 部分非常相似，但有一些关键的区别。

首先，转到 Firebase 项目的 **Project Overview** 页面。如果你一直在遵循本指南，页面顶部已经列出了一个 Android 应用。

要向你的 Firebase 项目添加 iOS，请点击 **Add App** 按钮并选择 **iOS** 平台。

下一个屏幕将要求你提供有关应用的一些信息。

- 你的 **iOS bundle ID** 应与 `capacitor.config.json` 中的 **appId** 匹配
- 我们在此 Capacitor 应用 ID 中使用了 `com.mydomain.myappname`，因此我们将在此条目中使用它。
- 应用昵称和 App Store ID 是可选的

然后点击 **Register app** 按钮。

### 将 `GoogleService-Info.plist` 文件添加到你的 iOS 应用

_注意：这与用于 Android 应用的文件**不同**。_

将提供的 `GoogleService-Info.plist` 下载到你的本地机器。

然后你**必须**打开 Xcode...

```bash
npx cap open ios
```

...并按照 Firebase 的指示将 `.plist` 文件移动到你的 Xcode 项目中，确保将其添加到所有 target 中。

![iOS 的 Google Service Info Plist 位置](../../../../static/img/v4/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 通过 CocoaPods 添加 Firebase SDK

iOS 上的推送通知 API 使用 CocoaPods——一个 iOS 依赖管理系统——我们需要告诉 CocoaPods 使用 Firebase。

为此，我们需要修改 `Podfile`，可以在 Xcode 的 `Pods` 下找到：

![iOS 的 Podfile 位置](../../../../static/img/v4/docs/guides/firebase-push-notifications/podfile-location-ios.png)

我们需要将 Firebase 添加到为我们的 App target 提供的 CocoaPods 中。为此，将 `pod Firebase/Messaging` 添加到你的 `target 'App'` 部分，如下所示：

```ruby
target 'App' do
  capacitor_pods
  # 在此处添加你的 Pods
  pod 'Firebase/Messaging' # 添加这一行
end
```

你的 `Podfile` 应如下所示：

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '13.0'
use_frameworks!

# 解决安装新 Cordova 插件后需要
# Product -> Clean Build Folder 以避免 Xcode 缓存 Pods 的问题
# 需要 CocoaPods 1.6 或更新版本
install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
end

target 'App' do
  capacitor_pods
  # 在此处添加你的 Pods
  pod 'Firebase/Messaging'
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

### 更新项目

现在我们需要确保我们的 iOS 项目已更新，并安装了正确的 Firebase CocoaPod。

_注意：这部分可能需要一段时间，因为 CocoaPods 需要下载所有适当的文件/依赖。_

```bash
npx cap update ios
```

### 添加初始化代码

为了在 iOS 应用启动时连接到 Firebase，你需要将以下内容添加到你的 `AppDelegate.swift` 文件中。

首先，在文件顶部添加 `import`：

```swift
import Firebase
```

...然后在你的 `AppDelegate.swift` 文件的 `application(didFinishLaunchingWithOptions)` 方法中添加 Firebase 的配置方法。

```swift
FirebaseApp.configure()
```

然后你需要添加以下两个方法来正确处理推送注册事件：

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

你完成的 `AppDelegate.swift` 文件应如下所示：

```swift
import UIKit
import Capacitor
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?


  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // 应用启动后的自定义覆盖点。
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

### 将 APNS 证书或密钥上传到 Firebase

如果你从一开始就按照说明操作，你已经在 Apple Developer Portal 中创建了 Apple APNS 证书或 APNS Auth Key。你需要将其中一种上传到 Firebase，然后 Firebase 才能与 APNS 通信并向你的应用发送推送通知。

要上传你的证书或认证密钥，请从 **Project Overview** 页面：

1. 点击你的 iOS 应用，然后点击 **Settings** 齿轮图标。
2. 在设置页面上，点击 **Cloud Messaging** 选项卡。
3. 在 **iOS app configuration** 标题下，使用提供的 **Upload** 按钮上传你的 Auth Key 或证书。

## 发送测试通知

现在是令人兴奋的部分——让我们验证来自 Firebase 的推送通知在 Android 和 iOS 上是否正常工作！

我们需要在 Android 或 iOS 上启动我们的应用，以便 `home.page.ts` 页面可以注册并接收通知。

要在 Android Studio 中打开你的 Android 项目：

```bash
npx cap open android
```

要在 Xcode 中打开你的 iOS 项目：

```bash
npx cap open ios
```

项目打开后，使用 Android Studio 或 Xcode 的 Run 功能将应用侧载到你的设备上。应用应在主页上启动。

_注意：在 iOS 上，你会看到一个弹出窗口询问是否允许应用的通知——确保你选择 **Allow notifications**！_

如果你的应用成功注册并且你遵循了上述代码，你应该会看到带有成功消息的 alert！

现在我们将测试设备是否收到通知。要发送通知，在 Firebase 中，转到项目窗格中 Grow 标题下的 **Cloud Messaging** 部分。

接下来，选择 **New Notification** 按钮。

创建通知时，你只需指定以下信息：

1. 通知的文本
2. 标题（仅 Android，iOS 可选）
3. 目标（用户细分或主题；我建议直接定位 iOS 或 Android 应用本身，见下文）

![更改 Firebase 推送目标](../../../../static/img/v4/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4. 调度（保持为"Now"）

此时，你可以 **Review** 你组���完成的通知，然后选择 **Publish** 发送通知。

如果你的应用设置正确，你将在主屏幕上看到弹出 alert，显示你在 Firebase 中编写的推送通知。然后你可以点击通知，根据我们的上述代码，你应该会收到 `pushActionPerformed` 事件的 `alert`。

![推送测试 Android](../../../../static/img/v4/docs/guides/firebase-push-notifications/push-test-android.png)

![推送测试 iOS](../../../../static/img/v4/docs/guides/firebase-push-notifications/push-test-ios.png)
