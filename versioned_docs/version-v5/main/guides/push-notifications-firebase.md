---
title: Push Notifications - Firebase
description: 了解如何在 Ionic 应用的 iOS 和 Android 平台上实现 Firebase Cloud Messaging 推送通知功能
contributors:
  - bryplano
  - javebratt
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 推送通知

**Web 框架**: Angular
**平台**: iOS, Android

应用开发者为用户提供的最常见功能之一就是推送通知。本教程将详细介绍如何在 iOS 和 Android 上实现 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) 功能。

为了实现 Firebase 推送的注册和监控，我们将在 Ionic + Angular 应用中使用 [Capacitor 的推送通知 API](https://capacitorjs.com/docs/apis/push-notifications)。

## 所需依赖

使用 Capacitor 构建和部署 iOS 与 Android 应用需要进行一些环境配置。请先[按照此处的说明安装必要的 Capacitor 依赖](/main/getting-started/environment-setup.md)，然后再继续。

要在 iOS 上测试推送通知，苹果公司要求您拥有[付费的 Apple 开发者账户](https://developer.apple.com/)和一台实体 iOS 设备。

如果您遇到问题或控制台显示有关过时或弃用包的警告，请确保您使用的是最新稳定版本的 Node、Android Studio 和 Xcode。

此外，我们使用 Firebase 处理推送通知，因此如果您使用其他依赖 Firebase SDK 的 Cordova 插件，请确保它们使用的是最新版本。

## 准备 Ionic Capacitor 应用

如果您已有 Ionic 应用，请跳过此部分。如果还没有，让我们先创建一个 Ionic 应用。

在您常用的终端中，安装最新版本的 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接下来，使用 CLI 基于**空白**初始项目创建一个新的 Ionic Angular 应用，并将其命名为 **capApp**：

```bash
ionic start capApp blank --type=angular
```

在询问是否将新应用与 Capacitor 集成的提示中，输入 `y` 并按回车。这将把 Capacitor 和 Capacitor CLI 添加到我们的新应用中。

应用成功创建后，切换到新创建的项目目录：

```bash
cd capApp/
```

最后运行 `npx cap init` 来填写我们的应用信息。

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

运行这些命令后，项目根目录会创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目产物，应被视为 Ionic 应用的一部分（例如，将它们纳入版本控制）。

## 使用 Capacitor 推送通知 API

首先，我们需要安装 Capacitor 推送通知插件

```bash
npm install @capacitor/push-notifications
npx cap sync
```

然后，在开始使用 Firebase 之前，我们需要确保应用能够通过 Capacitor 推送通知 API 注册推送通知。我们还将添加一个 `alert`（也可以使用 `console.log` 语句）来在设备上显示应用打开时接收到的通知负载。

在您的应用中，转到 `home.page.ts` 文件，添加 `import` 语句和 `const` 以使用 Capacitor 推送 API：

```typescript
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
```

接着，添加 `ngOnInit()` 方法，其中包含一些用于注册和监控推送通知的 API 方法。我们还将为几个事件添加 `alert()` 来监控正在发生的情况：

```typescript
export class HomePage implements OnInit {

ngOnInit() {
    console.log('Initializing HomePage');

    // 请求推送通知使用权限
    // iOS 会提示用户并返回是否授予权限
    // Android 会直接授予而不提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple/Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示错误信息
      }
    });

    // 成功后，我们应该能够接收通知
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('推送注册成功，令牌: ' + token.value);
      }
    );

    // 设置存在问题，推送将无法工作
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
    console.log('Initializing HomePage');

    // 请求推送通知使用权限
    // iOS 会提示用户并返回是否授予权限
    // Android 会直接授予而不提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple/Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示错误信息
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
        alert('推送操作执行: ' + JSON.stringify(notification));
      },
    );
  }
}
```

完成这些后，您需要生成新的构建并让 Capacitor 知晓这些更改。可以通过以下命令实现：

```bash
ionic build
npx cap copy
```## 为你的应用在 Firebase 上创建项目

在将 Firebase Cloud Messaging 连接到你的应用并发送推送通知之前，你需要在 Firebase 中创建一个项目。

前往 [Firebase 控制台](https://console.firebase.google.com/) 并点击 **添加项目** 按钮。

为项目命名，接受 Firebase 服务条款，然后点击 **创建项目** 继续。系统应会自动为你生成一个项目 ID。

## Android 平台

### 将 Firebase 集成到 Android 应用

本节内容大致遵循 [使用 Firebase 控制台设置 Firebase 的官方文档](https://firebase.google.com/docs/android/setup?authuser=0)。以下是针对 Capacitor 框架的特定注意事项。

进入你的 Firebase 项目的项目概览页面，在顶部点击 **Android** 图标以添加一个新的 Android 应用。

![在 Firebase 控制台中添加新的 Android 应用](../../../../static/img/v5/docs/guides/firebase-push-notifications/add-android-app.png)

下一个屏幕会要求你提供一些关于应用的信息。

- 你的 **Android 包名** 应与 `capacitor.config.json` 文件中的 **appId** 保持一致。
- 我们在此 Capacitor 应用中使用的是 `com.mydomain.myappname` 作为应用 ID，因此这里也将使用相同的值。
- 昵称和调试签名证书是可选项。

然后点击 **注册应用** 按钮。

### 下载并使用 `google-services.json` 文件

接下来的提示会要求你下载一个 `google-services.json` 文件。该文件包含了你的 Capacitor 应用从 Android 端连接到 Firebase 所需的信息。

将 `google-services.json` 文件下载到本地计算机，然后将其移动到你的 Capacitor Android 项目目录中，具体位置是 `android/app/` 文件夹下。

![Android 平台 Google Services JSON 文件位置](../../../../static/img/v5/docs/guides/firebase-push-notifications/google-services-location-android.png)

我们无需向项目中 *添加* 任何额外的依赖项，因为 Capacitor 项目已在其 `build.gradle` 文件中自动包含了 `firebase-messaging` 的相应版本。

## iOS 平台

### 前提条件

iOS 推送通知的设置比 Android 复杂得多。你必须拥有一个 [付费的 Apple 开发者账户](https://developer.apple.com/) *并且* 在能够测试 iOS 应用的推送通知之前，完成以下事项：

1.  在 Apple 开发者门户中为你的 iOS 应用 [设置正确的开发或生产证书及配置文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)。
2.  在 Apple 开发者门户中为开发或生产环境 [创建 APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)。
3.  在 Xcode 中为你的应用 [确保已启用推送通知功能](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)。
4.  根据 [环境设置](/main/getting-started/environment-setup.md) 文档中的指导，准备好一台物理 iOS 设备。

### 将 Firebase 集成到我们的原生 iOS 应用

这部分与上面的 Android 部分非常相似，但有一些关键区别。

首先，进入你的 Firebase 项目的 **项目概览** 页面。如果你一直在按照本指南操作，你会在页面顶部看到一个已列出的 Android 应用。

要向你的 Firebase 项目添加 iOS 应用，请点击 **添加应用** 按钮并选择 **iOS** 平台。

下一个屏幕会要求你提供一些关于应用的信息。

- 你的 **iOS 包标识符** 应与 `capacitor.config.json` 文件中的 **appId** 保持一致。
- 我们在此 Capacitor 应用中使用的是 `com.mydomain.myappname` 作为应用 ID，因此这里也将使用相同的值。
- 应用昵称和 App Store ID 是可选项。

然后点击 **注册应用** 按钮。

### 将 `GoogleService-Info.plist` 文件添加到你的 iOS 应用

*注意：这**不是** Android 应用使用的那个文件。*

将提供的 `GoogleService-Info.plist` 文件下载到本地计算机。

然后你需要打开 Xcode...

```bash
npx cap open ios
```

... 并按照 Firebase 的说明，将 `.plist` 文件移动到你的 Xcode 项目中，确保将其添加到所有目标（targets）。

![iOS 平台 Google Service Info Plist 文件位置](../../../../static/img/v5/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 通过 CocoaPods 添加 Firebase SDK

iOS 上的推送通知 API 使用了 CocoaPods（一个 iOS 依赖管理工具），我们需要告知 CocoaPods 使用 Firebase。

为此，我们需要修改 `Podfile`，该文件可以在 Xcode 的 `Pods` 目录下找到：

![iOS 平台 Podfile 文件位置](../../../../static/img/v5/docs/guides/firebase-push-notifications/podfile-location-ios.png)

我们需要将 Firebase 添加到为我们的 App 目标（target）提供的 CocoaPods 中。为此，在你的 `target 'App'` 部分添加 `pod 'Firebase/Messaging'`，如下所示：

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging' # Add this line
end
```

你的 `Podfile` 应该类似于这样：

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '13.0'
use_frameworks!

# workaround to avoid Xcode caching of Pods that requires
# Product -> Clean Build Folder after new Cordova plugins installed
# Requires CocoaPods 1.6 or newer
install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
end

target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

### 更新项目

现在我们需要确保我们的 iOS 项目已更新，并安装了正确的 Firebase CocoaPod。

*注意：这部分可能会花费一些时间，因为 CocoaPods 需要下载所有相关的文件/依赖项。*

```bash
npx cap update ios
```### 添加初始化代码

要在 iOS 应用启动时连接 Firebase，需要在 `AppDelegate.swift` 文件中添加以下内容。

首先，在文件顶部添加 `import` 语句：

```swift
import Firebase
```

...然后在 `AppDelegate.swift` 文件的 `application(didFinishLaunchingWithOptions)` 方法中，为 Firebase 添加配置方法到初始化代码。

```swift
FirebaseApp.configure()
```

接着需要添加以下两个方法来正确处理推送注册事件：

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

完成后的 `AppDelegate.swift` 文件应该类似这样：

```swift
import UIKit
import Capacitor
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?


  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
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

如果你从一开始就按照说明操作，应该已经在 Apple 开发者门户创建了 Apple APNS 证书或 APNS 认证密钥。在 Firebase 能够与 APNS 通信并向你的应用发送推送通知之前，你需要将其中一个上传到 Firebase。

要上传证书或认证密钥，请从 **项目概览** 页面：

1. 点击你的 iOS 应用，然后点击 **设置** 齿轮图标。
2. 在设置页面，点击 **云消息传递** 标签页。
3. 在 **iOS 应用配置** 标题下，使用提供的 **上传** 按钮上传你的认证密钥或证书。

## 发送测试通知

现在是激动人心的部分——让我们验证来自 Firebase 的推送通知在 Android 和 iOS 上是否正常工作！

我们需要在 Android 或 iOS 上启动应用程序，以便我们的 `home.page.ts` 页面可以注册并接收通知。

要在 Android Studio 中打开 Android 项目：

```bash
npx cap open android
```

要在 Xcode 中打开 iOS 项目：

```bash
npx cap open ios
```

项目打开后，使用 Android Studio 或 Xcode 的运行功能将应用侧载到设备上。应用应该在主页启动。

_注意：在 iOS 上，你会看到一个弹窗，询问是否允许应用发送通知——请务必选择 **允许通知**！_

如果你的应用成功注册并且你按照上述代码操作，应该会看到一个带有成功消息的弹窗！

现在我们将测试设备是否接收到通知。要发送通知，在 Firebase 中，转到项目面板中 Grow 标题下的 **云消息传递** 部分。

接下来，选择 **新建通知** 按钮。

创建通知时，你只需要指定以下信息：

1. 通知文本
2. 标题（仅 Android，iOS 可选）
3. 目标（可以是用户群组或主题；我建议直接定位 iOS 或 Android 应用本身，见下图）

![更改 Firebase 推送目标](../../../../static/img/v5/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4. 调度（保持为"立即"）

此时，你可以 **查看** 你组合的通知，并选择 **发布** 来发送通知。

如果你正确设置了应用程序，你会在主屏幕上看到一个弹窗，显示你在 Firebase 中编写的推送通知。然后你可以点击通知，根据我们上面的代码，应该会收到 `pushActionPerformed` 事件的 `alert`。

![Android 推送测试](../../../../static/img/v5/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS 推送测试](../../../../static/img/v5/docs/guides/firebase-push-notifications/push-test-ios.png)

## 推送通知中的图片

你可以选择性地在推送通知中包含图片，具体操作请参考以下指南。

:::tip
Firebase Messaging SDK 可以在其有效载荷中包含 `ImageUrl` 属性并显示它。URL 必须是 `https://` 格式，且大小不超过 300kb。
:::

### Android 图片
使用 `@capacitor/push-notifications` 时，Android 会自动显示图片。如果你在 [Firebase 控制台](https://console.firebase.google.com/) 中通过设置 `通知图片` 来测试，推送通知会以类似于下方截图的方式出现在 Android 设备上：

![Android 推送通知图片](../../../../static/img/v5/docs/guides/firebase-push-notifications/android-push-image.jpeg)### iOS 中的图片推送
iOS 需要在项目中添加 [Notification Service Extension](https://developer.apple.com/documentation/usernotifications/unnotificationserviceextension) 才能在推送通知中显示图片。

在 XCode 中操作：
- 点击 `文件` > `新建` > `目标`
- 选择 `Notification Service Extension` 并点击 `下一步`
- 输入 `产品名称`（例如 `pushextension`）
- 选择你的团队
- 点击 `完成`
- 弹出提示时点击 `激活`

从目标列表中选择 `pushextension`，然后：
- 点击 `签名与能力`
- 点击 `+ 添加能力`
- 选择 `推送通知`
- 将部署目标从 `iOS 16.4`（或 Xcode 选择的版本）改为 `iOS 13.0`

:::note
 如果不修改扩展的部署目标，旧版本 iOS 设备上将无法显示图片。
:::

要将 Firebase Messaging 添加到扩展中，请打开 `Podfile` 并添加：
```ruby
target 'pushextension' do
  pod 'Firebase/Messaging'
end
```

然后运行以下命令更新 Cocoapods：
```bash
npx cap update ios
```

现在打开 `NotificationService.swift`（位于名为 `pushextension` 的文件夹中），将内容替换为以下代码：

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

现在你应该从 [Firebase 控制台](https://console.firebase.google.com/) 测试推送通知，记得设置 `通知图片` 并选择你的 iOS 应用。当通知到达 iOS 设备时，图片会显示在右侧，如下图所示：

![iOS 推送通知带图片](../../../../static/img/v5/docs/guides/firebase-push-notifications/ios-push-image.jpeg)