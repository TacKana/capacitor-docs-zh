---
title: Push Notifications - Firebase
description: 学习如何在 Ionic 应用中的 iOS 和 Android 平台上实现 Firebase Cloud Messaging 推送通知功能
contributors:
  - bryplano
  - javebratt
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 推送通知

**Web 框架**: Angular
**平台支持**: iOS, Android

应用开发者为用户提供的最常见功能之一就是推送通知。本教程将逐步讲解如何在 iOS 和 Android 上实现 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) 功能。

为了注册和监听来自 Firebase 的推送通知，我们将在 Ionic + Angular 应用中使用 [Capacitor 推送通知 API](https://capacitorjs.com/docs/apis/push-notifications)。

## 环境依赖

使用 Capacitor 构建和部署 iOS 与 Android 应用需要进行一些环境配置。在继续之前，请先[按照此处的说明安装必要的 Capacitor 依赖](/main/getting-started/environment-setup.md)。

要在 iOS 上测试推送通知，Apple 要求你必须拥有[付费的 Apple 开发者账户](https://developer.apple.com/)。

此外，由于我们使用 Firebase 处理推送通知，如果你使用了其他依赖 Firebase SDK 的 Cordova 插件，请确保它们都已更新到最新版本。

## 准备 Ionic Capacitor 应用

如果你已有现成的 Ionic 应用，可以跳过本节。如果还没有，让我们先创建一个 Ionic 应用。

在终端中安装最新版本的 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接下来，使用 CLI 基于**空白**模板创建一个新的 Ionic Angular 应用，命名为 **capApp**：

```bash
ionic start capApp blank --type=angular
```

应用创建成功后，切换到新创建的项目目录：

```bash
cd capApp/
```

最后编辑 `capacitor.config.ts` 文件中的 `appId`：

```diff
const config: CapacitorConfig = {
- appId: 'io.ionic.starter',
+ appId: 'com.mydomain.myappnam',
  appName: 'capApp',
  webDir: 'www'
};
```

## 构建应用与添加平台

在添加任何原生平台之前，应用必须至少构建一次。Web 构建会创建 Capacitor 所需的 Web 资源目录（Ionic Angular 项目中的 `www` 文件夹）。

```bash
ionic build
```

接下来，为应用添加 iOS 和 Android 平台：

```bash
ionic cap add ios
ionic cap add android
```

运行这些命令后，会在项目根目录创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目产物，应视为 Ionic 应用的一部分（建议提交到版本控制）。

## 使用 Capacitor 推送通知 API

首先，我们需要安装 Capacitor 推送通知插件：

```bash
npm install @capacitor/push-notifications
npx cap sync
```

在集成 Firebase 之前，我们需要确保应用能够通过 Capacitor 推送通知 API 注册推送通知。我们还会添加一个 `alert`（也可以使用 `console.log` 语句）来显示设备上应用打开时接收到的通知内容。

在应用中，打开 `home.page.ts` 文件，添加 `import` 语句和 `const` 来使用 Capacitor 推送 API：

```typescript
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
```

然后，添加 `ngOnInit()` 方法以及一些用于注册和监听推送通知的 API 方法。我们还会在几个事件中添加 `alert()` 来监控运行状态：

```typescript
export class HomePage implements OnInit {
  ngOnInit() {
    console.log('Initializing HomePage');

    // 请求推送通知权限
    // iOS 会提示用户并返回是否授予权限
    // Android 会直接授予权限而不提示
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // 向 Apple/Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示错误信息
      }
    });

    // 注册成功后，我们将能够接收通知
    PushNotifications.addListener('registration', (token: Token) => {
      alert('推送注册成功，令牌: ' + token.value);
    });

    // 配置存在问题，推送将无法工作
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('注册错误: ' + JSON.stringify(error));
    });

    // 当应用在设备上打开时显示通知内容
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      alert('收到推送: ' + JSON.stringify(notification));
    });

    // 点击通知时调用的方法
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('推送操作执行: ' + JSON.stringify(notification));
    });
  }
}
```

以下是 `home.page.ts` 的完整实现：

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
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result) => {
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

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      alert('Push received: ' + JSON.stringify(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('Push action performed: ' + JSON.stringify(notification));
    });
  }
}
```

完成这些修改后，你需要生成新的构建并让 Capacitor 感知这些更改：

```bash
ionic build
npx cap copy
```

## 在 Firebase 中为应用创建项目

在将 Firebase Cloud Messaging 连接到你的应用并发送推送通知之前，你需要在 Firebase 中创建一个项目。

访问 [Firebase 控制台](https://console.firebase.google.com/)，点击 **添加项目** 按钮。

为项目命名，接受 Firebase 服务条款，点击 **创建项目** 继续。系统会自动为你生成一个项目 ID。

## Android### 将 Firebase 集成到 Android 应用

本部分内容基本参照 [使用 Firebase 控制台设置 Firebase 的官方文档](https://firebase.google.com/docs/android/setup?authuser=0)。以下是与 Capacitor 相关的具体注意事项。

前往你的 Firebase 项目概览页面，点击顶部的 **Android** 图标来添加一个新的 Android 应用。

![在 Firebase 控制台添加新的 Android 应用](/img/v6/docs/guides/firebase-push-notifications/add-android-app.png)

下一个屏幕会要求你填写一些关于应用的信息。

- 你的 **Android 包名** 应与 `capacitor.config.ts` 文件中的 **appId** 一致。
- 我们为这个 Capacitor 应用 ID 使用了 `com.mydomain.myappname`，因此这里也将使用相同的值。
- 昵称和调试签名证书是可选项。

然后点击 **注册应用** 按钮。

### 下载并使用 `google-services.json` 文件

接下来的提示会要求你下载一个 `google-services.json` 文件。这个文件包含了你的 Capacitor 应用在 Android 平台上连接 Firebase 所需的信息。

将 `google-services.json` 文件下载到本地，然后将其移动到你的 Capacitor Android 项目目录中，具体位置是 `android/app/` 下。

![Android 平台上 Google Services JSON 文件的位置](/img/v6/docs/guides/firebase-push-notifications/google-services-location-android.png)

我们不需要向项目中 *添加* 任何依赖，因为 `@capacitor/push-notifications` 在其 `build.gradle` 文件中已自动包含了 `firebase-messaging` 的某个版本。

## iOS

### 前提条件

iOS 推送通知的设置比 Android 要复杂得多。你必须拥有一个 [付费的 Apple 开发者账户](https://developer.apple.com/)，*并且* 在进行 iOS 应用推送通知测试之前，需要完成以下事项：

1.  在 Apple 开发者门户中，为你的 iOS 应用[设置正确的开发或生产证书及描述文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)。
2.  在 Apple 开发者门户中，为开发或生产环境[创建一个 APNs 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)。
3.  在 Xcode 中，确保你的应用已[启用推送通知功能](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)。

### 将 Firebase 集成到我们的原生 iOS 应用

这部分与上面的 Android 部分非常相似，但有几点关键区别。

首先，前往你的 Firebase 项目的 **项目概览** 页面。如果你一直遵循本指南，你会看到页面顶部已经列出了一个 Android 应用。

要向你的 Firebase 项目添加 iOS 应用，请点击 **添加应用** 按钮并选择 **iOS** 平台。

下一个屏幕会要求你填写一些关于应用的信息。

- 你的 **iOS 包标识符** 应与 `capacitor.config.ts` 文件中的 **appId** 一致。
- 我们为这个 Capacitor 应用 ID 使用了 `com.mydomain.myappname`，因此这里也将使用相同的值。
- 应用昵称和应用商店 ID 是可选项。

然后点击 **注册应用** 按钮。

### 将 `GoogleService-Info.plist` 文件添加到你的 iOS 应用

*注意：这 **并非** 与 Android 应用使用的文件相同。*

将提供的 `GoogleService-Info.plist` 文件下载到本地。

<<<<<<< HEAD
然后，你 **必须** 打开 Xcode...
=======
You'll then **have to** open Xcode...
>>>>>>> upstream/main

```bash
npx cap open ios
```

... 并按照 Firebase 的指示，将 `.plist` 文件移动到你的 Xcode 项目中，确保将其添加到所有目标。

![iOS 平台上 Google Service Info Plist 文件的位置](/img/v6/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 通过 CocoaPods 添加 Firebase SDK

iOS 上的推送通知 API 使用了 CocoaPods——一个 iOS 依赖管理系统——我们需要告诉 CocoaPods 使用 Firebase。

为此，我们需要修改 `Podfile` 文件，该文件可以在 Xcode 的 `Pods` 目录下找到：

![iOS 平台 Podfile 文件的位置](/img/v6/docs/guides/firebase-push-notifications/podfile-location-ios.png)

我们需要将 Firebase 添加到为我们 App 目标提供的 CocoaPods 中。为此，在你的 `target 'App'` 部分添加 `pod FirebaseMessaging`，像这样：

```ruby
target 'App' do
  capacitor_pods
  # 在此处添加你的 Pods
  pod 'FirebaseMessaging' # 添加这一行
end
```

你的 `Podfile` 文件应该看起来像这样：

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '14.0'
use_frameworks!

# 避免 Xcode 缓存 Pods 的变通方案，需要
# 在安装新的 Cordova 插件后执行 Product -> Clean Build Folder
# 需要 CocoaPods 1.6 或更高版本
install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorApp', :path => '../../node_modules/@capacitor/app'
  pod 'CapacitorHaptics', :path => '../../node_modules/@capacitor/haptics'
  pod 'CapacitorKeyboard', :path => '../../node_modules/@capacitor/keyboard'
  pod 'CapacitorPushNotifications', :path => '../../node_modules/@capacitor/push-notifications'
  pod 'CapacitorStatusBar', :path => '../../node_modules/@capacitor/status-bar'
end

target 'App' do
  capacitor_pods
  # 在此处添加你的 Pods
  pod 'FirebaseMessaging'
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

### 更新项目

现在我们需要确保我们的 iOS 项目已经更新，并且安装了正确的 Firebase CocoaPod。

*注意：这部分可能需要一些时间，因为 CocoaPods 需要下载所有相关的文件/依赖项。*

```bash
npx cap update ios
```### 添加初始化代码

要在 iOS 应用启动时连接到 Firebase，你需要将以下代码添加到 `AppDelegate.swift` 文件中。

首先，在文件顶部添加导入语句：

```swift
import FirebaseCore
import FirebaseMessaging
```

... 然后将 Firebase 的配置方法添加到 `AppDelegate.swift` 文件的初始化代码中，具体放在 `application(didFinishLaunchingWithOptions)` 方法里。

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

完成后的 `AppDelegate.swift` 文件应该类似于这样：

```swift
import UIKit
import Capacitor
import FirebaseCore
import FirebaseMessaging

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

### 将 APNS 证书或密钥上传到 Firebase

如果你从一开始就遵循了本指南，你应该已经在 Apple 开发者门户创建了 Apple APNS 证书或 APNS 授权密钥。在 Firebase 能够与 APNS 通信并向你的应用发送推送通知之前，你需要将其中之一上传到 Firebase。

要上传你的证书或授权密钥，请从 **项目概览** 页面操作：

1. 点击你的 iOS 应用，然后点击 **设置** 齿轮图标。
2. 在设置页面，点击 **Cloud Messaging** 标签页。
3. 在 **iOS 应用配置** 标题下，使用提供的 **上传** 按钮上传你的授权密钥或证书。

## 发送测试通知

现在到了最有趣的部分——让我们验证 Firebase 的推送通知在 Android 和 iOS 上都能正常工作！

我们需要在 Android 或 iOS 上启动我们的应用，以便 `home.page.ts` 页面能够注册并接收通知。

要在 Android Studio 中打开你的 Android 项目：

```bash
npx cap open android
```

要在 Xcode 中打开你的 iOS 项目：

```bash
npx cap open ios
```

项目打开后，使用 Android Studio 或 Xcode 的运行功能将应用侧载到你的设备上。应用应该在首页启动。

_注意：在 iOS 上，你会看到一个弹窗，询问你是否允许应用发送通知——确保选择 **允许通知**！_

如果你的应用成功注册并且你正确执行了上面的代码，你应该会看到一个包含成功消息的弹窗！

现在我们将测试设备是否能收到通知。要发送通知，请在 Firebase 中进入项目窗格的 Grow 标题下的 **Cloud Messaging** 部分。

接着，选择 **New Notification** 按钮。

创建通知时，你只需要指定以下信息：

1. 通知的文本内容
2. 标题（仅 Android 需要，iOS 可选）
3. 目标（可以是用户群组或主题；我建议直接选择 iOS 或 Android 应用本身，见下图）

![在 Firebase 中更改推送目标](/img/v6/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4. 调度（保持为“Now”即可）

设置完成后，你可以 **查看** 已创建的通知，然后选择 **发布** 来发送通知。

如果你正确设置了应用，你应该会在主屏幕上看到一条弹窗，显示你在 Firebase 中编写的推送通知。你可以点击该通知，根据我们上面的代码，你应该会收到一个 `pushActionPerformed` 事件的 `alert`。

![Android 推送测试](/img/v6/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS 推送测试](/img/v6/docs/guides/firebase-push-notifications/push-test-ios.png)

## 推送通知中的图片

你可以按照以下指南，选择在推送通知中包含图片。

:::tip
Firebase Messaging SDK 可以在其负载中包含 `ImageUrl` 属性并显示图片。URL 必须是 `https://` 开头，并且大小不超过 300kb。
:::

### Android 图片处理

在使用 `@capacitor/push-notifications` 时，Android 会自动显示图片。如果你在 [Firebase 控制台](https://console.firebase.google.com/) 中通过设置 `Notification image` 来测试，推送通知将在 Android 设备上显示，效果类似于下面的截图：

![Android 带图片的推送通知](/img/v6/docs/guides/firebase-push-notifications/android-push-image.jpeg)### iOS 平台上的图片推送

要在 iOS 设备上显示包含图片的推送通知，需要在项目中添加 [通知服务扩展（Notification Service Extension）](https://developer.apple.com/documentation/usernotifications/unnotificationserviceextension)。

在 XCode 中操作如下：

- 点击菜单栏的 `File` > `New` > `Target`
- 选择 `Notification Service Extension`，然后点击 `Next`
- 输入 `Product Name`（例如：`pushextension`）
- 选择你的开发者团队（Team）
- 点击 `Finish`
- 弹出提示时点击 `Activate`

在 Targets 列表中选择 `pushextension`，然后：

- 点击 `Signing & Capabilities`
- 点击 `+ Capability`
- 选择 `Push Notifications`
- 将 Deployment target 从 `iOS 16.4`（或 Xcode 默认的版本）更改为 `iOS 14.0`

:::note
如果不更改扩展的部署目标（Deployment target），那么在较旧版本的 iOS 设备上将无法显示图片。
:::

要为扩展添加 Firebase Messaging，请打开你的 `Podfile` 并添加：

```ruby
target 'pushextension' do
  pod 'FirebaseMessaging'
end
```

然后运行以下命令更新 Cocoapods：

```bash
npx cap update ios
```

现在打开 `NotificationService.swift` 文件（位于名为 `pushextension` 的文件夹中），将其内容替换为以下代码：

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

现在你可以从 [Firebase 控制台](https://console.firebase.google.com/) 测试一条推送通知。请记住设置 `Notification image` 并选择你的 iOS 应用。当通知到达 iOS 设备时，图片将显示在右侧，如下图所示：

![iOS 推送通知图片展示](/img/v6/docs/guides/firebase-push-notifications/ios-push-image.jpeg)