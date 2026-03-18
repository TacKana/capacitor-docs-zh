---
title: 推送通知 - Firebase
description: 学习如何在 Ionic 应用的 iOS 和 Android 平台上实现 Firebase 云消息推送功能
contributors:
  - bryplano
  - javebratt
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中集成 Firebase 推送通知

**Web 框架**: Angular
**平台支持**: iOS, Android

应用开发者向用户提供的最常见功能之一就是推送通知。在本教程中，我们将逐步介绍在 iOS 和 Android 上实现 [Firebase 云消息推送](https://firebase.google.com/docs/cloud-messaging) 所需的所有步骤。

为了实现 Firebase 推送通知的注册和监听，我们将在 Ionic + Angular 应用中使用 [Capacitor 推送通知 API](https://capacitorjs.com/docs/apis/push-notifications)。

## 所需依赖

使用 Capacitor 构建和部署 iOS 与 Android 应用需要进行一些设置。请先 [按照这里的说明安装必要的 Capacitor 依赖](/main/getting-started/environment-setup.md)，然后再继续。

要在 iOS 上测试推送通知，Apple 要求您拥有 [付费的 Apple 开发者账户](https://developer.apple.com/)。

此外，我们使用 Firebase 处理推送通知，因此如果您使用了其他依赖 Firebase SDK 的 Cordova 插件，请确保它们使用的是最新版本。

## 准备 Ionic Capacitor 应用

如果您已有现有的 Ionic 应用，请跳过此部分。如果没有，让我们先创建一个 Ionic 应用。

在您首选的终端中，安装最新版本的 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接下来，使用 CLI 基于 **空白** 模板创建一个新的 Ionic Angular 应用，并将其命名为 **capApp**：

```bash
ionic start capApp blank --type=angular
```

应用成功创建后，切换到新创建的项目目录：

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

## 构建应用并添加平台

在将任何原生平台添加到此项目之前，必须至少构建一次应用。Web 构建会创建 Capacitor 所需的 Web 资源目录（Ionic Angular 项目中的 `www` 文件夹）。

```bash
ionic build
```

接下来，将 iOS 和 Android 平台添加到我们的应用中。

```bash
ionic cap add ios
ionic cap add android
```

运行这些命令后，会在项目根目录创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目产物，应被视为 Ionic 应用的一部分（即，应将其纳入版本控制）。

## 使用 Capacitor 推送通知 API

首先，我们需要安装 Capacitor 推送通知插件

```bash
npm install @capacitor/push-notifications
npx cap sync
```

然后，在接入 Firebase 之前，我们需要确保应用能够通过 Capacitor 推送通知 API 注册推送通知。我们还将添加一个 `alert`（您也可以使用 `console.log` 语句）来显示当通知到达且应用在设备上打开时的通知负载。

在您的应用中，转到 `home.page.ts` 文件，添加 `import` 语句和 `const` 以使用 Capacitor Push API：

```typescript
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
```

然后，添加 `ngOnInit()` 方法，其中包含一些用于注册和监听推送通知的 API 方法。我们还将为几个事件添加 `alert()` 来监控正在发生的情况：

```typescript
export class HomePage implements OnInit {
  ngOnInit() {
    console.log('初始化 HomePage');

    // 请求推送通知权限
    // iOS 会提示用户并返回是否授予权限
    // Android 会直接授予而无需提示
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // 向 Apple/Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示错误信息
      }
    });

    // 成功时，我们应该能够接收通知
    PushNotifications.addListener('registration', (token: Token) => {
      alert('推送注册成功，令牌: ' + token.value);
    });

    // 我们的设置存在问题，推送将无法工作
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('注册错误: ' + JSON.stringify(error));
    });

    // 如果应用在设备上处于打开状态，显示通知负载
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
    console.log('初始化 HomePage');

    // 请求推送通知权限
    // iOS 会提示用户并返回是否授予权限
    // Android 会直接授予而无需提示
    PushNotifications.requestPermissions().then((result) => {
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

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      alert('收到推送: ' + JSON.stringify(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('推送操作执行: ' + JSON.stringify(notification));
    });
  }
}
```

完成此操作后，您需要生成新的构建并让 Capacitor 了解这些更改。您可以使用以下命令：

```bash
ionic build
npx cap copy
```

## 在 Firebase 上为您的应用创建项目

在将 Firebase 云消息推送连接到您的应用并发送推送通知之前，您需要在 Firebase 中启动一个项目。

转到 [Firebase 控制台](https://console.firebase.google.com/) 并点击 **添加项目** 按钮。

为项目命名，接受 Firebase 服务条款，然后点击 **创建项目** 继续。系统会自动为您生成一个项目 ID。

## Android### 将 Firebase 集成到 Android 应用

本节内容基本参照 [使用 Firebase 控制台设置 Firebase 的文档](https://firebase.google.com/docs/android/setup?authuser=0)。下方会提供与 Capacitor 相关的特别说明。

前往 Firebase 项目的项目概览页面，在顶部点击 **Android** 图标以添加新的 Android 应用。

![在 Firebase 控制台中添加新的 Android 应用](/img/v6/docs/guides/firebase-push-notifications/add-android-app.png)

接下来会要求你填写一些应用信息。

- 你的 **Android 包名** 应与 `capacitor.config.ts` 文件中的 **appId** 保持一致
- 我们在此 Capacitor 应用中使用的 ID 是 `com.mydomain.myappname`，因此这里也填入相同的值
- 昵称和调试签名证书为可选项

然后点击 **注册应用** 按钮。

### 下载并使用 `google-services.json` 文件

接下来会提示你下载 `google-services.json` 文件。该文件包含你的 Capacitor 应用在 Android 平台上连接 Firebase 所需的信息。

将 `google-services.json` 文件下载到本地，然后将其移入 Capacitor Android 项目目录，具体位置是 `android/app/` 下。

![Android 平台 Google Services JSON 文件位置](/img/v6/docs/guides/firebase-push-notifications/google-services-location-android.png)

我们不需要在项目中 _添加_ 任何依赖，因为 `@capacitor/push-notifications` 已在其 `build.gradle` 文件中自动包含了 `firebase-messaging` 的版本。

## iOS

### 前提条件

iOS 推送通知的设置比 Android 复杂得多。你必须有 [付费的 Apple 开发者账户](https://developer.apple.com/)，_并且_ 在进行 iOS 应用推送通知测试前，需完成以下事项：

1. 在 Apple 开发者门户中为你的 iOS 应用 [设置正确的开发或生产证书与配置文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)
2. 在 Apple 开发者门户中 [创建用于开发或生产的 APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
3. 在 Xcode 中为你的应用 [确保已启用推送通知功能](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)

### 将 Firebase 集成到原生 iOS 应用

这部分与上述 Android 部分非常相似，但有几个关键区别。

首先，前往 Firebase 项目的 **项目概览** 页面。如果你一直遵循本指南，页面顶部应该已经列出了一个 Android 应用。

要为 Firebase 项目添加 iOS 支持，请点击 **添加应用** 按钮并选择 **iOS** 平台。

接下来会要求你填写一些应用信息。

- 你的 **iOS 包标识符** 应与 `capacitor.config.ts` 文件中的 **appId** 保持一致
- 我们在此 Capacitor 应用中使用的 ID 是 `com.mydomain.myappname`，因此这里也填入相同的值
- 应用昵称和应用商店 ID 为可选项

然后点击 **注册应用** 按钮。

### 将 `GoogleService-Info.plist` 文件添加到 iOS 应用

_注意：这与 Android 应用使用的文件 **不同**。_

将提供的 `GoogleService-Info.plist` 文件下载到本地。

接下来你需要打开 Xcode...

```bash
npx cap open ios
```

... 并按照 Firebase 的指示，将 `.plist` 文件移入 Xcode 项目，确保将其添加到所有目标。

![iOS 平台 Google Service Info Plist 文件位置](/img/v6/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 通过 CocoaPods 添加 Firebase SDK

iOS 上的推送通知 API 需要使用 CocoaPods（一个 iOS 依赖管理系统），我们需要告知 CocoaPods 使用 Firebase。

为此，我们需要修改 `Podfile`，该文件可以在 Xcode 的 `Pods` 目录下找到：

![iOS 平台 Podfile 位置](/img/v6/docs/guides/firebase-push-notifications/podfile-location-ios.png)

我们需要将 Firebase 添加到为我们应用目标提供的 CocoaPods 中。在 `target 'App'` 部分添加 `pod FirebaseMessaging`，如下所示：

```ruby
target 'App' do
  capacitor_pods
  # 在此处添加你的 Pods
  pod 'FirebaseMessaging' # 添加这行
end
```

你的 `Podfile` 应该类似这样：

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '14.0'
use_frameworks!

# 避免 Xcode 缓存 Pods 的变通方案，安装新的 Cordova 插件后需要
# 执行 Product -> Clean Build Folder
# 要求 CocoaPods 1.6 或更高版本
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

现在我们需要确保 iOS 项目已更新并安装了正确的 Firebase CocoaPod。

_注意：这部分可能需要一些时间，因为 CocoaPods 需要下载所有相关的文件/依赖。_

```bash
npx cap update ios
```### 添加初始化代码

为了让你的 iOS 应用在启动时连接到 Firebase，你需要在 `AppDelegate.swift` 文件中添加以下内容。

首先，在文件顶部添加 `import` 语句：

```swift
import FirebaseCore
import FirebaseMessaging
```

... 然后将 Firebase 的配置方法添加到 `AppDelegate.swift` 文件的初始化代码中，放在 `application(didFinishLaunchingWithOptions)` 方法里。

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

最终完成的 `AppDelegate.swift` 文件应该类似下面这样：

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

如果你从一开始就按照指示操作，你应该已经在 Apple 开发者门户中创建了 Apple APNS 证书或 APNS 授权密钥。在 Firebase 能够与 APNS 通信并向你的应用发送推送通知之前，你需要将其中之一上传到 Firebase。

要上传你的证书或授权密钥，请从 **项目概览** 页面开始：

1. 点击你的 iOS 应用，然后点击 **设置** 齿轮图标。
2. 在设置页面，点击 **Cloud Messaging** 标签页。
3. 在 **iOS 应用配置** 标题下，使用提供的 **上传** 按钮上传你的授权密钥或证书。

## 发送测试通知

现在到了有趣的部分——让我们验证 Firebase 的推送通知在 Android 和 iOS 上是否正常工作！

我们需要在 Android 或 iOS 上启动我们的应用，以便 `home.page.ts` 页面能够注册并接收通知。

要在 Android Studio 中打开你的 Android 项目：

```bash
npx cap open android
```

要在 Xcode 中打开你的 iOS 项目：

```bash
npx cap open ios
```

项目打开后，使用 Android Studio 或 Xcode 的 Run 功能将应用侧载到你的设备上。应用应该会在主页启动。

_注意：在 iOS 上，你会看到一个弹窗，询问你是否允许应用的通知——请务必选择 **允许通知**！_

如果你的应用成功注册并且你按照上面的代码操作，你应该会看到一个带有成功消息的弹窗！

现在我们将测试设备是否接收到通知。要发送通知，请在 Firebase 中，进入项目面板中 Grow 标题下的 **Cloud Messaging** 部分。

接下来，选择 **新建通知** 按钮。

创建通知时，你只需要指定以下信息：

1. 通知的文本内容
2. 标题（仅限 Android，iOS 可选）
3. 目标（可以是一个用户群组或主题；我建议直接定位 iOS 或 Android 应用本身，见下图）

![在 Firebase 中更改推送目标](/img/v6/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4. 调度时间（保持为“立即”）

此时，你可以 **预览** 你设置的通知，然后选择 **发布** 来发送通知。

如果你正确设置了应用，你会在主屏幕上看到一个弹窗，显示你在 Firebase 中设置的推送通知。然后你可以点击通知，根据我们上面的代码，你应该会收到 `pushActionPerformed` 事件的 `alert`。

![Android 推送测试](/img/v6/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS 推送测试](/img/v6/docs/guides/firebase-push-notifications/push-test-ios.png)

## 推送通知中的图片

你可以选择性地在推送通知中包含图片，只需按照以下指南操作即可。

:::tip
Firebase Messaging SDK 可以在其负载中包含一个 `ImageUrl` 属性并显示它。URL 必须是 `https://` 开头，并且大小要控制在 300kb 以下。
:::

### Android 中的图片

Android 在使用 `@capacitor/push-notifications` 时会自动显示图片。如果你在 [Firebase 控制台](https://console.firebase.google.com/) 中通过设置 `通知图片` 来测试，推送通知会在 Android 设备上显示，类似于下面的截图：

![带图片的 Android 推送通知](/img/v6/docs/guides/firebase-push-notifications/android-push-image.jpeg)### iOS 图片推送

iOS 需要在项目中添加一个 [通知服务扩展（Notification Service Extension）](https://developer.apple.com/documentation/usernotifications/unnotificationserviceextension)，才能在推送通知中显示图片。

在 XCode 中操作：

- 点击 `File` > `New` > `Target`
- 选择 `Notification Service Extension`，然后点击 `Next`
- 输入 `Product Name`（例如 `pushextension`）
- 选择你的 Team
- 点击 `Finish`
- 当询问时点击 `Activate`

从目标列表中选择 `pushextension`，然后：

- 点击 `Signing & Capabilities`
- 点击 `+ Capability`
- 选择 `Push Notifications`
- 将部署目标从 `iOS 16.4`（或 Xcode 选择的版本）改为 `iOS 14.0`

:::note
如果不修改扩展的部署目标，那么在旧版 iOS 设备上将无法显示图片。
:::

要为扩展添加 Firebase Messaging，请打开 `Podfile` 并添加：

```ruby
target 'pushextension' do
  pod 'FirebaseMessaging'
end
```

然后运行以下命令更新 Cocoapods：

```bash
npx cap update ios
```

现在打开 `NotificationService.swift`（它位于名为 `pushextension` 的文件夹中），并将内容替换为以下代码：

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

现在你应该从 [Firebase 控制台](https://console.firebase.google.com/) 测试一条推送通知，记得设置 `Notification image` 并选择你的 iOS 应用。当通知到达 iOS 设备时，它将在右侧显示，如下图所示：

![iOS 带图片的推送通知](/img/v6/docs/guides/firebase-push-notifications/ios-push-image.jpeg)