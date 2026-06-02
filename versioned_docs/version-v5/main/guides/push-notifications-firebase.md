---
title: 推送通知 - Firebase
description: 了解如何在 Ionic 应用中让 Firebase Cloud Messaging 在 iOS 和 Android 上工作
contributors:
  - bryplano
  - javebratt
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 的推送通知

**Web 框架**: Angular
**平台**: iOS, Android

应用开发者向其用户提供的最常见功能之一是推送通知。在本教程中，我们将逐步介绍让 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) 在 iOS 和 Android 上运行所需的所有步骤。

为了从 Firebase 注册和监控推送通知，我们将在 Ionic + Angular 应用中使用 [Capacitor 的推送通知 API](https://capacitorjs.com/docs/apis/push-notifications)。

## 所需依赖项

使用 Capacitor 构建和部署 iOS 和 Android 应用需要一些设置。在继续之前，请[按照说明安装必要的 Capacitor 依赖项](/main/getting-started/environment-setup.md)。

要在 iOS 上测试推送通知，Apple 要求您拥有[付费的 Apple Developer 帐户](https://developer.apple.com/)和一个_物理_ iOS 设备。

如果您遇到问题或控制台抛出有关过期或弃用包的警告，请确保您使用的是 Node、Android Studio 和 Xcode 的最新稳定版本。

另外，我们使用 Firebase 进行推送通知，因此如果您使用其他使用 Firebase SDK 的 Cordova 插件，请确保它们使用的是最新版本。

## 准备 Ionic Capacitor 应用

如果您有现有的 Ionic 应用，请跳过本节。如果没有，让我们先创建一个 Ionic 应用。

在您喜欢的终端中，安装最新版本的 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接下来，让我们使用 CLI 基于 **blank** 启动项目创建一个新的 Ionic Angular 应用，并将其命名为 **capApp**：

```bash
ionic start capApp blank --type=angular
```

在提示将您的新应用与 Capacitor 集成时，输入 `y` 并按回车。这将把 Capacitor 和 Capacitor CLI 添加到我们的新应用中。

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

## 构建应用并添加平台

在向此项目添加任何原生平台之前，必须至少构建一次应用。Web 构建会创建 Capacitor 所需的 Web 资产目录（Ionic Angular 项目中的 `www` 文件夹）。

```bash
ionic build
```

接下来，让我们为应用添加 iOS 和 Android 平台。

```bash
npx cap add ios
npx cap add android
```

运行这些命令后，在项目根目录会创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目产物，应被视为您的 Ionic 应用的一部分（即，将它们纳入版本控制）。

## 使用 Capacitor 推送通知 API

首先，我们需要安装 Capacitor 推送通知插件：

```bash
npm install @capacitor/push-notifications
npx cap sync
```

然后，在我们进入 Firebase 之前，我们需要确保我们的应用可以通过使用 Capacitor 推送通知 API 来注册推送通知。我们还将添加一个 `alert`（您也可以使用 `console.log` 语句代替）来在通知到达且应用在设备上打开时显示通知的负载。

在您的应用中，前往 `home.page.ts` 文件，添加 `import` 语句和 `const` 以使用 Capacitor Push API：

```typescript
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
```

然后，添加带有一些 API 方法的 `ngOnInit()` 方法来注册和监控推送通知。我们还将为一些事件添加 `alert()` 来监控正在发生的事情：

```typescript
export class HomePage implements OnInit {

ngOnInit() {
    console.log('正在初始化 HomePage');

    // 请求使用推送通知的权限
    // iOS 将提示用户并返回是否授予权限
    // Android 将直接授予而不提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple/Google 注册以通过 APNS/FCM 接收推送
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

    // 设置存在问题，推送将无法工作
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('注册错误: ' + JSON.stringify(error));
      }
    );

    // 如果应用在设备上打开，向我们显示通知负载
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
    console.log('正在初始化 HomePage');

    // 请求使用推送通知的权限
    // iOS 将提示用户并返回是否授予权限
    // Android 将直接授予而不提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple/Google 注册以通过 APNS/FCM 接收推送
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

之后，您需要生成一个新的构建并让 Capacitor 知道这些更改。您可以通过以下方式完成：

```bash
ionic build
npx cap copy
```

## 在 Firebase 上为您的应用创建项目

在我们可以将 Firebase Cloud Messaging 连接到您的应用并发送推送通知之前，您需要在 Firebase 中启动一个项目。

前往 [Firebase 控制台](https://console.firebase.google.com/)，点击 **Add project** 按钮。

为项目命名，接受 Firebase 服务条款，然后点击 **Create project** 继续。将自动为您生成一个 Project ID。

## Android

### 将 Firebase 与 Android 应用集成

本节或多或少与[使用 Firebase 控制台文档设置 Firebase](https://firebase.google.com/docs/android/setup?authuser=0) 相似。请参阅以下 Capacitor 相关的具体说明。

前往 Firebase 项目的项目概览页面，在顶部点击 **Android** 图标以添加新的 Android 应用。

![在 Firebase 控制台中添加新的 Android 应用](../../../../static/img/v5/docs/guides/firebase-push-notifications/add-android-app.png)

下一个屏幕将要求您提供一些关于应用的信息。

- 您的 **Android 包名** 应与 `capacitor.config.json` 文件中的 **appId** 匹配
- 我们为此 Capacitor 应用 ID 使用了 `com.mydomain.myappname`，因此我们将使用它作为此条目。
- 昵称和调试签名证书是可选的

然后点击 **Register app** 按钮。

### 下载并使用 `google-services.json` 文件

下一个提示将要求您下载 `google-services.json` 文件。此文件包含您的 Capacitor 应用从 Android 连接到 Firebase 所需的信息。

将 `google-services.json` 文件下载到您的本地计算机。然后将文件移动到您的 Capacitor Android 项目目录中，具体在 `android/app/` 下。

![Android 的 Google Services JSON 位置](../../../../static/img/v5/docs/guides/firebase-push-notifications/google-services-location-android.png)

我们不需要向项目_添加_任何依赖项，因为 Capacitor 项目会自动在其 `build.gradle` 文件中包含一个版本的 `firebase-messaging`。

## iOS

### 先决条件

iOS 推送通知的设置比 Android 复杂得多。您必须拥有[付费的 Apple Developer 帐户](https://developer.apple.com/)_并且_在能够使用 iOS 应用测试推送通知之前处理以下事项：

1. 在 Apple Developer Portal 中为您的 iOS 应用[设置适当的开发或生产证书及配置文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)
2. 在 Apple Developer Portal 中[创建 APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)用于开发或生产
3. 在 Xcode 中[确保已启用推送通知能力](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)
4. 根据[环境设置](/main/getting-started/environment-setup.md)文档的指南，拥有一个物理 iOS 设备

### 将 Firebase 与原生 iOS 应用集成

这部分与上面的 Android 部分非常相似，但有一些关键区别。

首先，前往 Firebase 项目的**项目概览**页面。如果您一直按照本指南操作，您应该已经在页面顶部列出了 Android 应用。

要将 iOS 添加到 Firebase 项目，请点击 **Add App** 按钮并选择 **iOS** 平台。

下一个屏幕将要求您提供一些关于应用的信息。

- 您的 **iOS bundle ID** 应与 `capacitor.config.json` 文件中的 **appId** 匹配
- 我们为此 Capacitor 应用 ID 使用了 `com.mydomain.myappname`，因此我们将使用它作为此条目。
- 应用昵称和 App Store ID 是可选的

然后点击 **Register app** 按钮。

### 将 `GoogleService-Info.plist` 文件添加到 iOS 应用

_注意：这与用于 Android 应用的文件**不是同一个**。_

将提供的 `GoogleService-Info.plist` 下载到您的本地计算机。

然后您**必须**打开 Xcode...

```bash
npx cap open ios
```

...并按照 Firebase 的指示将 `.plist` 文件移动到您的 Xcode 项目中，确保将其添加到所有 targets。

![iOS 的 Google Service Info Plist 位置](../../../../static/img/v5/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 通过 CocoaPods 添加 Firebase SDK

iOS 上的推送通知 API 使用 CocoaPods——一个 iOS 依赖管理系统——我们需要告诉 CocoaPods 使用 Firebase。

为此，我们需要修改 `Podfile`，可以在 Xcode 的 `Pods` 下找到：

![iOS Podfile 位置](../../../../static/img/v5/docs/guides/firebase-push-notifications/podfile-location-ios.png)

我们需要将 Firebase 添加到为我们的 App target 提供的 CocoaPods 中。为此，将 `pod Firebase/Messaging` 添加到您的 `target 'App'` 部分，如下所示：

```ruby
target 'App' do
  capacitor_pods
  # 在此处添加您的 Pods
  pod 'Firebase/Messaging' # 添加此行
end
```

您的 `Podfile` 应该如下所示：

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '13.0'
use_frameworks!

# 避免 Xcode 缓存 Pods 的变通方法
# 安装新的 Cordova 插件后需要 Product -> Clean Build Folder
# 需要 CocoaPods 1.6 或更新版本
install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
end

target 'App' do
  capacitor_pods
  # 在此处添加您的 Pods
  pod 'Firebase/Messaging'
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

### 更新项目

现在我们需要确保我们的 iOS 项目已更新并安装了正确的 Firebase CocoaPod。

_注意：这部分可能需要一些时间，因为 CocoaPods 需要下载所有适当的文件/依赖项。_

```bash
npx cap update ios
```

### 添加初始化代码

为了在 iOS 应用启动时连接到 Firebase，您需要将以下内容添加到 `AppDelegate.swift` 文件中。

首先，在文件顶部添加 `import`：

```swift
import Firebase
```

...然后，将 Firebase 的配置方法添加到 `AppDelegate.swift` 文件的 `application(didFinishLaunchingWithOptions)` 方法中的初始化代码中。

```swift
FirebaseApp.configure()
```

然后您需要添加以下两个方法来正确处理推送注册事件：

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

您完成的 `AppDelegate.swift` 文件应该如下所示：

```swift
import UIKit
import Capacitor
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?


  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // 应用启动后自定义的覆盖点
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

如果您从一开始就按照说明操作，您应该在 Apple Developer 门户中创建了 Apple APNS 证书或 APNS 授权密钥。您需要将其中之一上传到 Firebase，然后 Firebase 才能与 APNS 通信并向您的应用发送推送通知。

要上传您的证书或授权密钥，请从**项目概览**页面：

1. 点击您的 iOS 应用，然后点击**设置**齿轮图标。
2. 在设置页面上，点击 **Cloud Messaging** 标签。
3. 在 **iOS app configuration** 标题下，使用提供的 **Upload** 按钮上传您的授权密钥或证书。

## 发送测试通知

现在是有趣的部分——让我们验证来自 Firebase 的推送通知在 Android 和 iOS 上是否正常工作！

我们需要在 Android 或 iOS 上启动我们的应用，以便我们的 `home.page.ts` 页面可以注册和接收通知。

要在 Android Studio 中打开您的 Android 项目：

```bash
npx cap open android
```

要在 Xcode 中打开您的 iOS 项目：

```bash
npx cap open ios
```

项目打开后，使用 Android Studio 或 Xcode 的运行功能将应用旁加载到您的设备上。应用应在主页上启动。

_注意：在 iOS 上，您会看到一个弹出窗口，要求您允许应用的通知——请确保选择 **允许通知**！_

如果您的应用成功注册并且您遵循了上述代码，您应该会看到带有成功消息的提示！

现在我们将测试设备是否收到通知。要发送通知，在 Firebase 中，前往项目窗格中 Grow 标题下的 **Cloud Messaging** 部分。

接下来，选择 **New Notification** 按钮。

创建通知时，您只需要指定以下信息：

1. 通知的文本
2. 标题（仅 Android，iOS 可选）
3. 目标（用户段或主题；我建议只针对 iOS 或 Android 应用本身，见下文）

![更改 Firebase 推送目标](../../../../static/img/v5/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4. 调度（保留为"Now"）

此时，您可以**审查**您组合好的通知，并选择 **Publish** 发送通知。

如果您正确设置了应用，您会在主屏幕上看到一个弹出提示，显示您在 Firebase 中编写的推送通知。然后您可以点击通知，根据我们上面的代码，您应该会收到 `pushActionPerformed` 事件的 `alert`。

![Android 推送测试](../../../../static/img/v5/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS 推送测试](../../../../static/img/v5/docs/guides/firebase-push-notifications/push-test-ios.png)

## 推送通知中的图片

您可以选择按照下面的指南将图片作为推送通知的一部分包含在内。

:::tip
Firebase Messaging SDK 可以在其负载中包含 `ImageUrl` 属性并显示它。URL 必须是 `https://` 并且大小在 300KB 以下。
:::

### Android 上的图片

Android 在使用 `@capacitor/push-notifications` 时会自动显示图片。如果您在 [Firebase 控制台](https://console.firebase.google.com/) 中通过设置 `Notification image` 进行测试，推送通知将出现在 Android 设备上，类似于下面的截图：

![Android 带图片的推送通知](../../../../static/img/v5/docs/guides/firebase-push-notifications/android-push-image.jpeg)

### iOS 上的图片

iOS 需要在您的项目中添加[通知服务扩展](https://developer.apple.com/documentation/usernotifications/unnotificationserviceextension)才能在推送通知中显示图片。

在 XCode 中：
- 点击 `File` > `New` > `Target`
- 选择 `Notification Service Extension` 并点击 `Next`
- 输入一个 `Product Name`（例如 `pushextension`）
- 选择您的 Team
- 点击 `Finish`
- 在询问时点击 `Activate`

从目标列表中选择 `pushextension`，然后：
- 点击 `Signing & Capabilities`
- 点击 `+ Capability`
- 选择 `Push Notifications`
- 将 Deployment target 从 `iOS 16.4`（或 Xcode 选择的任何版本）更改为 `iOS 13.0`

:::note
 如果您没有更改扩展的部署目标，那么图片将不会出现在旧版 iOS 版本的设备上。
:::

要将 Firebase Messaging 添加到扩展中，打开您的 `Podfile` 并添加：
```ruby
target 'pushextension' do
  pod 'Firebase/Messaging'
end
```

然后通过运行更新 CocoaPods：
```bash
npx cap update ios
```

现在打开 `NotificationService.swift`（它将在名为 `pushextension` 的文件夹中），并将内容替换为以下内容：

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

您现在应该从 [Firebase 控制台](https://console.firebase.google.com/) 测试推送通知，记得设置 `Notification image` 并选择您的 iOS 应用。当它到达 iOS 设备时，它将显示在右侧，如下所示：

![iOS 带图片的推送通知](../../../../static/img/v5/docs/guides/firebase-push-notifications/ios-push-image.jpeg)
