---
title: 推送通知 - Firebase
description: 了解如何在 Ionic 应用中为 iOS 和 Android 配置 Firebase Cloud Messaging
contributors:
  - bryplano
  - javebratt
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 推送通知

**Web 框架**: Angular
**平台**: iOS, Android

应用开发者为用户提供的最常见功能之一就是推送通知。本教程将详细介绍如何在 iOS 和 Android 上配置 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)。

为了实现 Firebase 推送通知的注册和监听，我们将在 Ionic + Angular 应用中使用 [Capacitor 推送通知 API](https://capacitorjs.com/docs/apis/push-notifications)。

## 所需依赖

使用 Capacitor 构建和部署 iOS 及 Android 应用需要进行一些基础设置。请先[按照此处说明安装必要的 Capacitor 依赖](/main/getting-started/environment-setup.md)，然后再继续。

要在 iOS 上测试推送通知，Apple 要求您拥有[付费的 Apple 开发者账号](https://developer.apple.com/)和_实体_ iOS 设备。

如果遇到问题或控制台显示有关过时或弃用包的警告，请确保您使用的是最新稳定版本的 Node、Android Studio 和 Xcode。

此外，由于我们使用 Firebase 进行推送通知，如果您正在使用其他依赖 Firebase SDK 的 Cordova 插件，请确保它们是最新版本。

## 准备 Ionic Capacitor 应用

如果您已有 Ionic 应用，请跳过此部分。如果没有，让我们先创建一个 Ionic 应用。

在您喜欢的终端中，安装最新版本的 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接下来，使用 CLI 基于**空白**模板创建一个新的 Ionic Angular 应用，并将其命名为 **capApp**：

```bash
ionic start capApp blank --type=angular
```

在询问是否要将新应用与 Capacitor 集成的提示中，输入 `y` 并按回车。这会将 Capacitor 和 Capacitor CLI 添加到我们的新应用中。

应用成功创建后，切换到新创建的项目目录：

```bash
cd capApp/
```

最后运行 `npx cap init`，这会让我们填写应用信息。

```bash
npx cap init
? App name: CapApp
? App Package ID: com.mydomain.myappname
```

## 构建应用并添加平台

在向此项目添加任何原生平台之前，必须至少构建一次应用。Web 构建会创建 Capacitor 所需的 Web 资源目录（Ionic Angular 项目中的 `www` 文件夹）。

```bash
ionic build
```

接下来，将 iOS 和 Android 平台添加到我们的应用中。

```bash
npx cap add ios
npx cap add android
```

运行这些命令后，会在项目根目录创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目产物，应被视为 Ionic 应用的一部分（例如，将其纳入版本控制）。

## 使用 Capacitor 推送通知 API

首先，我们需要安装 Capacitor 推送通知插件

```bash
npm install @capacitor/push-notifications
npx cap sync
```

然后，在使用 Firebase 之前，我们需要确保应用程序能够通过使用 Capacitor 推送通知 API 来注册推送通知。我们还将添加一个 `alert`（您也可以使用 `console.log` 语句）来显示当通知到达且应用在设备上打开时的通知负载。

在您的应用中，转到 `home.page.ts` 文件，添加 `import` 语句和一个 `const` 以使用 Capacitor Push API：

```typescript
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
```

然后，添加 `ngOnInit()` 方法以及一些用于注册和监听推送通知的 API 方法。我们还会在几个事件中添加 `alert()` 来监控发生了什么：

```typescript
export class HomePage implements OnInit {

ngOnInit() {
    console.log('Initializing HomePage');

    // 请求使用推送通知的权限
    // iOS 会提示用户并返回他们是否授予权限
    // Android 会直接授予而不提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple / Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示一些错误
      }
    });

    // 成功时，我们应该能够接收通知
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('推送注册成功，令牌：' + token.value);
      }
    );

    // 我们的设置存在一些问题，推送将无法工作
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('注册错误：' + JSON.stringify(error));
      }
    );

    // 如果应用在我们的设备上打开，则显示通知负载
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('收到推送：' + JSON.stringify(notification));
      }
    );

    // 点击通知时调用的方法
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('推送操作执行：' + JSON.stringify(notification));
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

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }
}
```

完成此操作后，您需要生成新的构建并让 Capacitor 知晓更改。您可以通过以下方式完成：

```bash
ionic build
npx cap copy
```## 在 Firebase 中为你的应用创建项目

在将 Firebase Cloud Messaging 连接到你的应用并发送推送通知之前，你需要在 Firebase 中创建一个项目。

前往 [Firebase 控制台](https://console.firebase.google.com/)，点击 **添加项目** 按钮。

为项目命名，接受 Firebase 服务条款，然后点击 **创建项目** 继续。系统会自动为你生成一个项目 ID。

## Android

### 将 Firebase 集成到 Android 应用

本节内容大致遵循 [使用 Firebase 控制台设置 Firebase 的文档](https://firebase.google.com/docs/android/setup?authuser=0)。关于 Capacitor 相关的特别说明，请见下文。

进入你的 Firebase 项目的项目概览页面，在顶部点击 **Android** 图标以添加一个新的 Android 应用。

![在 Firebase 控制台添加新的 Android 应用](../../../../static/img/v5/docs/guides/firebase-push-notifications/add-android-app.png)

接下来的屏幕会要求你提供一些关于应用的信息。

- 你的 **Android 包名** 应与 `capacitor.config.json` 文件中的 **appId** 相匹配
- 我们在这个 Capacitor 应用 ID 中使用了 `com.mydomain.myappname`，所以在此处我们也使用这个值。
- 昵称和调试签名证书是可选的

然后点击 **注册应用** 按钮。

### 下载并使用 `google-services.json` 文件

接下来的提示会要求你下载一个 `google-services.json` 文件。该文件包含了你的 Capacitor 应用在 Android 上连接 Firebase 所需的信息。

将 `google-services.json` 文件下载到本地计算机。然后将文件移动到你的 Capacitor Android 项目目录中，具体位置在 `android/app/` 下。

![Android 的 Google Services JSON 文件位置](../../../../static/img/v5/docs/guides/firebase-push-notifications/google-services-location-android.png)

我们不需要向项目中 _添加_ 任何依赖，因为 Capacitor 项目在其 `build.gradle` 文件中已自动包含了 `firebase-messaging` 的版本。

## iOS

### 前提条件

iOS 推送通知的设置比 Android 要复杂得多。你必须拥有一个 [付费的 Apple 开发者账户](https://developer.apple.com/)，_并且_ 在进行 iOS 应用的推送通知测试之前，必须先完成以下事项：

1. 在 Apple 开发者门户中为你的 iOS 应用 [设置正确的开发或生产证书及配置文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)
2. 在 Apple 开发者门户中为开发或生产环境 [创建一个 APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
3. 在 Xcode 中确保你的应用 [已启用推送通知功能](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)
4. 根据 [环境设置](/main/getting-started/environment-setup.md) 文档中的指南，拥有一台物理 iOS 设备

### 将 Firebase 集成到我们的原生 iOS 应用

这部分与上面的 Android 部分非常相似，但有一些关键区别。

首先，进入 Firebase 项目的 **项目概览** 页面。如果你一直遵循本指南，你会在页面顶部看到一个已列出的 Android 应用。

要为你的 Firebase 项目添加 iOS 应用，点击 **添加应用** 按钮并选择 **iOS** 平台。

接下来的屏幕会要求你提供一些关于应用的信息。

- 你的 **iOS 包标识符** 应与 `capacitor.config.json` 文件中的 **appId** 相匹配
- 我们在这个 Capacitor 应用 ID 中使用了 `com.mydomain.myappname`，所以在此处我们也使用这个值。
- 应用昵称和应用商店 ID 是可选的

然后点击 **注册应用** 按钮。

### 将 `GoogleService-Info.plist` 文件添加到你的 iOS 应用

_注意：这与用于 Android 应用的文件 **不同**。_

将提供的 `GoogleService-Info.plist` 文件下载到本地计算机。

然后你 **必须** 打开 Xcode...

```bash
npx cap open ios
```

... 并按照 Firebase 的说明将 `.plist` 文件移动到你的 Xcode 项目中，确保将其添加到所有目标。

![iOS 的 Google Service Info Plist 文件位置](../../../../static/img/v5/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 通过 CocoaPods 添加 Firebase SDK

iOS 上的推送通知 API 需要使用 CocoaPods（一个 iOS 依赖管理系统），我们需要告诉 CocoaPods 使用 Firebase。

为此，我们需要修改 `Podfile`，该文件可以在 Xcode 中的 `Pods` 目录下找到：

![iOS 的 Podfile 位置](../../../../static/img/v5/docs/guides/firebase-push-notifications/podfile-location-ios.png)

我们需要将 Firebase 添加到为我们的应用目标提供的 CocoaPods 中。为此，在你的 `target 'App'` 部分添加 `pod Firebase/Messaging`，如下所示：

```ruby
target 'App' do
  capacitor_pods
  # 在此处添加你的 Pods
  pod 'Firebase/Messaging' # 添加这一行
end
```

你的 `Podfile` 应该看起来像这样：

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '13.0'
use_frameworks!

# 避免 Xcode 缓存 Pods 的变通方案，需要在安装新的 Cordova 插件后执行
# 产品 -> 清理构建文件夹
# 需要 CocoaPods 1.6 或更高版本
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

_注意：这部分可能需要一些时间，因为 CocoaPods 需要下载所有相关的文件/依赖。_

```bash
npx cap update ios
```### 添加初始化代码

要在 iOS 应用启动时连接 Firebase，你需要在 `AppDelegate.swift` 文件中添加以下内容。

首先，在文件顶部添加导入语句：

```swift
import Firebase
```

... 然后将 Firebase 的配置方法添加到 `AppDelegate.swift` 文件的 `application(didFinishLaunchingWithOptions)` 方法中，作为初始化代码的一部分。

```swift
FirebaseApp.configure()
```

接着，你需要添加以下两个方法来正确处理推送注册事件：

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

完整的 `AppDelegate.swift` 文件应该类似这样：

```swift
import UIKit
import Capacitor
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?


  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // 应用启动后的自定义覆盖点
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

### 将 APNS 证书或密钥上传至 Firebase

如果你从一开始就按照指示操作，那么你应该已经在 Apple 开发者门户创建了一个 Apple APNS 证书或 APNS 认证密钥。在 Firebase 能与 APNS 通信并向你的应用发送推送通知之前，你需要将其中一项上传到 Firebase。

要上传你的证书或认证密钥，请从 **项目概览** 页面：

1.  点击你的 iOS 应用，然后点击 **设置** 齿轮图标。
2.  在设置页面上，点击 **云消息传递** 标签页。
3.  在 **iOS 应用配置** 标题下，使用提供的 **上传** 按钮上传你的认证密钥或证书。

## 发送测试通知

现在是最有趣的部分——让我们验证一下 Firebase 的推送通知在 Android 和 iOS 上是否工作正常！

我们需要在 Android 或 iOS 上启动我们的应用，以便 `home.page.ts` 页面能够注册并接收通知。

要在 Android Studio 中打开你的 Android 项目：

```bash
npx cap open android
```

要在 Xcode 中打开你的 iOS 项目：

```bash
npx cap open ios
```

项目打开后，使用 Android Studio 或 Xcode 的 Run 功能将应用侧载到你的设备上。应用应该在主页启动。

*注意：在 iOS 上，你会看到一个弹窗，询问你是否允许应用发送通知——请确保选择 **允许通知**！*

如果你的应用成功注册，并且你按照上面的代码操作，你应该会看到一个带有成功消息的弹窗！

现在我们来测试设备是否能收到通知。要发送通知，请在 Firebase 中，进入项目窗格中 Grow 标题下的 **云消息传递** 部分。

接下来，选择 **新建通知** 按钮。

创建通知时，你只需要指定以下信息：

1.  通知的文本
2.  标题（仅限 Android，iOS 可选）
3.  目标（可以是用户细分或主题；我建议直接定位 iOS 或 Android 应用本身，见下图）

![在 Firebase 中更改推送目标](../../../../static/img/v5/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4.  排程（将其保持为“立即”）

此时，你可以 **查看** 你组合好的通知，并选择 **发布** 来发送通知。

如果你正确设置了你的应用，你会在主屏幕上看到一个弹窗，显示你在 Firebase 中编写的推送通知。然后你可以点击通知，根据我们上面的代码，你应该会收到 `pushActionPerformed` 事件的 `alert`。

![Android 推送测试](../../../../static/img/v5/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS 推送测试](../../../../static/img/v5/docs/guides/firebase-push-notifications/push-test-ios.png)

## 推送通知中的图片

你可以选择性地在推送通知中包含图片，具体操作请遵循以下指南。

:::tip
Firebase 消息传递 SDK 可以在其有效载荷中包含 `ImageUrl` 属性并显示它。URL 必须是 `https://` 开头且大小不超过 300kb。
:::

### Android 中的图片

Android 在使用 `@capacitor/push-notifications` 时会自动显示图片。如果你在 [Firebase 控制台](https://console.firebase.google.com) 中通过设置 `通知图片` 来测试，推送通知将出现在 Android 设备上，类似下面的截图：

![Android 带图片的推送通知](../../../../static/img/v5/docs/guides/firebase-push-notifications/android-push-image.jpeg)### iOS 平台上的图片推送
iOS 需要在项目中添加 [通知服务扩展](https://developer.apple.com/documentation/usernotifications/unnotificationserviceextension) 才能在推送通知中显示图片。

在 Xcode 中操作如下：
- 点击 `File` > `New` > `Target`
- 选择 `Notification Service Extension` 并点击 `Next`
- 输入 `Product Name`（例如 `pushextension`）
- 选择你的团队
- 点击 `Finish`
- 弹出询问时点击 `Activate`

从目标列表中选择 `pushextension` 然后：
- 点击 `Signing & Capabilities`
- 点击 `+ Capability`
- 选择 `Push Notifications`
- 将部署目标从 `iOS 16.4`（或 Xcode 选择的版本）改为 `iOS 13.0`

:::note
 如果不修改扩展的部署目标，旧版本 iOS 设备上将无法显示图片。
:::

要为扩展添加 Firebase 消息功能，请打开 `Podfile` 并添加：
```ruby
target 'pushextension' do
  pod 'Firebase/Messaging'
end
```

然后运行以下命令更新 Cocoapods：
```bash
npx cap update ios
```

现在打开 `NotificationService.swift`（该文件位于名为 `pushextension` 的文件夹中）并将内容替换为以下代码：

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

现在你可以从 [Firebase 控制台](https://console.firebase.google.com/) 测试推送通知了，记得设置 `Notification image` 并选择你的 iOS 应用。当通知到达 iOS 设备时，图片会显示在右侧，如下图所示：

![iOS 推送通知图片示例](../../../../static/img/v5/docs/guides/firebase-push-notifications/ios-push-image.jpeg)