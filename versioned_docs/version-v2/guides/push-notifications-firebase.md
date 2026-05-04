---
title: 在 Ionic/Angular 应用中使用 Firebase 推送通知
description: 学习如何在 Ionic 应用中为 iOS 和 Android 配置 Firebase Cloud Messaging
contributors:
  - bryplano
  - javebratt
canonicalUrl: https://capacitorjs.com/docs/guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 推送通知

**Web 框架**: Angular
**平台**: iOS, Android

应用开发者为用户提供的最常见功能之一是推送通知。本教程将逐步介绍在 iOS 和 Android 上配置 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) 所需的所有步骤。

为了从 Firebase 注册和监听推送通知，我们将在 Ionic + Angular 应用中使用 [Capacitor 的推送通知 API](https://capacitorjs.com/docs/apis/push-notifications)。

## 所需依赖

使用 Capacitor 构建和部署 iOS 与 Android 应用需要进行一些设置。请先[按照这里的说明安装必要的 Capacitor 依赖](/getting-started/dependencies.md)，然后再继续。

要在 iOS 上测试推送通知，Apple 要求您拥有[付费的 Apple 开发者账户](https://developer.apple.com/)和*物理* iOS 设备。

如果您遇到问题，或控制台提示包版本过时或已弃用，请确保您使用的是 Node、Android Studio 和 Xcode 的最新稳定版本。

另外，由于我们使用 Firebase 进行推送通知，如果您使用了其他依赖 Firebase SDK 的 Cordova 插件，请确保它们使用的是最新版本。

## 准备 Ionic Capacitor 应用

如果您已有 Ionic 应用，请跳过此部分。如果没有，我们先创建一个 Ionic 应用。

在您首选的终端中，安装最新版本的 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接下来，使用 CLI 基于**空白**起始项目创建一个新的 Ionic Angular 应用，命名为 **capApp**：

```bash
ionic start capApp blank --type=angular
```

在提示是否将新应用与 Capacitor 集成时，输入 `y` 并按回车。这会将 Capacitor 和 Capacitor CLI 添加到我们的新应用中。

应用创建成功后，切换到新创建的项目目录：

```bash
cd capApp/
```

最后运行 `npx cap init`，填写应用信息。

```bash
npx cap init
? App name: CapApp
? App Package ID: com.mydomain.myappname
```

## 构建应用并添加平台

在为此项目添加任何原生平台之前，必须至少构建应用一次。Web 构建会创建 Capacitor 所需的 Web 资源目录（Ionic Angular 项目中的 `www` 文件夹）。

```bash
ionic build
```

接下来，将 iOS 和 Android 平台添加到我们的应用中。

```bash
npx cap add ios
npx cap add android
```

运行这些命令后，会在项目根目录创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目产物，应被视为 Ionic 应用的一部分（即，应将其提交到源代码管理）。

## 使用 Capacitor 推送通知 API

在开始配置 Firebase 之前，我们需要确保应用能够使用 Capacitor 推送通知 API 来注册推送通知。我们还会添加一个 `alert`（您也可以使用 `console.log` 语句），以便在设备上收到通知且应用处于打开状态时，显示通知的有效载荷。

在您的应用中，打开 `home.page.ts` 文件，添加 `import` 语句和 `const` 以使用 Capacitor Push API：

```typescript
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const { PushNotifications } = Plugins;
```

然后，添加 `ngOnInit()` 方法，其中包含一些 API 方法来注册和监听推送通知。我们还会在几个事件中添加 `alert()` 来监控发生的情况：

```typescript
export class HomePage implements OnInit {

ngOnInit() {
    console.log('Initializing HomePage');

    // 请求使用推送通知的权限
    // iOS 会提示用户并返回是否授予权限
    // Android 会直接授予权限而不提示
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // 向 Apple / Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示一些错误信息
      }
    });

    // 成功时，我们应该能够接收通知
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // 我们的设置有问题，推送将无法工作
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // 如果应用在设备上处于打开状态，则显示通知有效载荷
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // 点击通知时调用的方法
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
}
```

以下是 `home.page.ts` 的完整实现：

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
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
      },
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }
}
```

之后，您需要生成新的构建并让 Capacitor 知道更改。您可以使用：

```bash
ionic build
npx cap copy
```

## 在 Firebase 上为你的应用创建项目

在将 Firebase Cloud Messaging 连接到你的应用并发送推送通知之前，你需要在 Firebase 中创建一个项目。

前往 [Firebase 控制台](https://console.firebase.google.com) 并点击 **添加项目** 按钮。

为项目命名，接受 Firebase 服务条款，然后点击 **创建项目** 继续。系统会自动为你生成一个项目 ID。

## Android

### 将 Firebase 与 Android 应用集成

本部分内容大致遵循 [使用 Firebase 控制台设置 Firebase 的官方文档](https://firebase.google.com/docs/android/setup?authuser=0)。以下是针对 Capacitor 的相关注意事项。

进入你的 Firebase 项目的项目概览页面，在顶部点击 **Android** 图标以添加新的 Android 应用程序。

![在 Firebase 控制台中添加新的 Android 应用](../../../static/img/v3/docs/guides/firebase-push-notifications/add-android-app.png)

接下来会出现一个屏幕，要求你提供一些关于应用的信息。

- 你的 **Android 软件包名称** 应与 `capacitor.config.json` 文件中的 **appId** 保持一致
- 我们的 Capacitor 应用 ID 是 `com.mydomain.myappname`，因此这里也使用相同的 ID
- 昵称和调试签名证书是可选项

然后点击 **注册应用** 按钮。

### 下载并使用 `google-services.json` 文件

接下来系统会提示你下载 `google-services.json` 文件。该文件包含了你的 Capacitor 应用从 Android 平台连接 Firebase 所需的信息。

将 `google-services.json` 文件下载到本地，然后将其移动到你的 Capacitor Android 项目目录中，具体位置是 `android/app/` 文件夹下。

![Android 平台的 Google Services JSON 文件位置](../../../static/img/v3/docs/guides/firebase-push-notifications/google-services-location-android.png)

我们不需要向项目中 _添加_ 任何依赖项，因为 Capacitor 项目在其 `build.gradle` 文件中已自动包含 `firebase-messaging` 的版本。

## iOS

### 前提条件

iOS 推送通知的设置比 Android 复杂得多。你必须拥有一个 [付费的 Apple 开发者账户](https://developer.apple.com)，并且在测试 iOS 应用的推送通知之前，需要先完成以下事项：

1. 在 Apple 开发者门户中为你的 iOS 应用 [设置正确的开发或生产证书及配置文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)
2. 在 Apple 开发者门户中为开发或生产环境 [创建 APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
3. 在 Xcode 中确保你的应用 [已启用推送通知功能](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)
4. 根据 [依赖项](/getting-started/dependencies.md) 文档中的指南，准备一台物理 iOS 设备

### 将 Firebase 与本机 iOS 应用集成

这部分与上面的 Android 部分非常相似，但存在一些关键差异。

首先，进入 Firebase 项目的 **项目概览** 页面。如果你一直按照本指南操作，页面顶部应该已经列出了你的 Android 应用。

要向你的 Firebase 项目添加 iOS 应用，请点击 **添加应用** 按钮，然后选择 **iOS** 平台。

接下来会出现一个屏幕，要求你提供一些关于应用的信息。

- 你的 **iOS 软件包 ID** 应与 `capacitor.config.json` 文件中的 **appId** 保持一致
- 我们的 Capacitor 应用 ID 是 `com.mydomain.myappname`，因此这里也使用相同的 ID
- 应用昵称和应用商店 ID 是可选项

然后点击 **注册应用** 按钮。

### 将 `GoogleService-Info.plist` 文件添加到你的 iOS 应用

_注意：这与用于 Android 应用的文件 **不同**。_

下载提供的 `GoogleService-Info.plist` 文件到本地。

<<<<<<< HEAD
然后你 **必须** 打开 Xcode...
=======
You'll then **have to** open Xcode...
>>>>>>> upstream/main

```bash
npx cap open ios
```

... 并按照 Firebase 的说明，将 `.plist` 文件移动到你的 Xcode 项目中，确保将其添加到所有目标。

![iOS 平台的 Google Service Info Plist 文件位置](../../../static/img/v3/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 通过 CocoaPods 添加 Firebase SDK

iOS 上的推送通知 API 使用了 CocoaPods（一种 iOS 依赖管理系统），我们需要告诉 CocoaPods 使用 Firebase。

为此，我们需要修改 `Podfile`，该文件可以在 Xcode 的 `Pods` 目录下找到：

![iOS 平台 Podfile 文件位置](../../../static/img/v3/docs/guides/firebase-push-notifications/podfile-location-ios.png)

我们需要将 Firebase 添加到为我们 App 目标提供的 CocoaPods 中。为此，在你的 `target 'App'` 部分添加 `pod 'FirebaseCore'` 和 `pod 'Firebase/Messaging'`，如下所示：

```ruby
target 'App' do
capacitor_pods
# 在此处添加你的 Pods
pod 'FirebaseCore', '7.11.0' # 添加这一行
pod 'Firebase/Messaging', '7.11.0' # 添加这一行
end
```

你的 `Podfile` 应该看起来像这样：

```ruby
platform :ios, '11.0'
use_frameworks!

# 避免 Xcode 缓存 Pods 的变通方案，安装新的 Cordova 插件后需要
# 执行 Product -> Clean Build Folder
# 需要 CocoaPods 1.6 或更高版本
install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  # 自动添加 Capacitor Pod 依赖，请勿删除
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'

  # 请勿删除
end

target 'App' do
  capacitor_pods
  # 在此处添加你的 Pods
  pod 'FirebaseCore', '7.11.0'
  pod 'Firebase/Messaging', '7.11.0'
end
```

### 更新项目

现在我们需要确保 iOS 项目已更新，并安装了正确的 Firebase CocoaPod。

_注意：这部分可能需要一些时间，因为 CocoaPods 需要下载所有相关的文件/依赖项。_

```bash
npx cap update ios
```

### 添加初始化代码

要在 iOS 应用启动时连接到 Firebase，您需要在 `AppDelegate.swift` 文件中添加以下内容。

首先，在文件顶部添加一个 `import` 语句：

```swift
import FirebaseCore
```

然后，将 Firebase 的配置方法添加到 `AppDelegate.swift` 文件的初始化代码中，具体位置在 `application(_ application: UIApplication, didFinishLaunchingWithOptions)` 方法内。

```swift
FirebaseApp.configure()
```

完整的 `AppDelegate.swift` 文件应类似于：

```swift
import UIKit
import Capacitor
import FirebaseCore

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?


  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // 应用启动后自定义的覆盖点
    FirebaseApp.configure()
    return true
  }
```

如果您希望从 iOS 接收 Firebase FCM 令牌，而不是原始的 APNS 令牌，还需要在文件顶部添加两个新的导入：

```swift
import FirebaseInstanceID // 在 import FirebaseCore 后添加此行
import FirebaseMessaging
```

并将您的 `AppDelegate.didRegisterForRemoteNotificationsWithDeviceToken` 代码修改为：

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

### 上传 APNS 证书或密钥到 Firebase

如果您按照前面的步骤操作，您已在苹果开发者门户创建了苹果 APNS 证书或 APNS 认证密钥。您需要将其中之一上传到 Firebase，以便 Firebase 能够与 APNS 通信并向您的应用发送推送通知。

要上传您的证书或认证密钥，请从 **项目概览** 页面开始：

1. 点击您的 iOS 应用，然后点击 **设置** 齿轮图标。
2. 在设置页面，点击 **云消息传递** 选项卡。
3. 在 **iOS 应用配置** 标题下，使用提供的 **上传** 按钮上传您的认证密钥或证书。

## 发送测试通知

现在到了有趣的部分——验证来自 Firebase 的推送通知在 Android 和 iOS 上是否正常工作！

我们需要在 Android 或 iOS 上启动应用，以便 `home.page.ts` 页面能够注册并接收通知。

要在 Android Studio 中打开您的 Android 项目：

```bash
npx cap open android
```

要在 Xcode 中打开您的 iOS 项目：

```bash
npx cap open ios
```

项目打开后，使用 Android Studio 或 Xcode 的 Run 功能将应用侧载到您的设备上。应用应在首页启动。

*注意：在 iOS 上，您会看到一个弹窗询问是否允许应用发送通知——请务必选择 **允许通知**！*

如果您的应用成功注册，并且您按照上面的代码操作，您应该会看到一个提示成功消息的弹窗！

现在我们来测试通知是否被设备接收。要发送通知，请在 Firebase 中转到项目窗格中 Grow 标题下的 **云消息传递** 部分。

接下来，选择 **新建通知** 按钮。

创建通知时，您只需指定以下信息：

1. 通知文本内容
2. 标题（仅限 Android，iOS 为可选）
3. 目标（可以是用户群组或主题；建议直接选择 iOS 或 Android 应用本身，见下图）

![更改推送目标 Firebase](../../../static/img/v3/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4. 调度时间（保持为“立即”）

此时，您可以 **查看** 您创建的通知，然后选择 **发布** 来发送通知。

如果您的应用设置正确，您会在主屏幕上看到一个弹窗，显示您在 Firebase 中编写的推送通知。然后您可以点击该通知，根据我们上面的代码，您应该会看到一个关于 `pushActionPerformed` 事件的 `alert`。

![推送测试 Android](../../../static/img/v3/docs/guides/firebase-push-notifications/push-test-android.png)

![推送测试 iOS](../../../static/img/v3/docs/guides/firebase-push-notifications/push-test-ios.png)