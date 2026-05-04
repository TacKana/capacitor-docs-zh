---
title: 推送通知 - Firebase
description: 学习如何在 Ionic 应用中的 iOS 和 Android 平台上实现 Firebase 云消息推送功能
contributors:
  - bryplano
  - javebratt
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 推送通知

**Web 框架**: Angular
**平台**: iOS, Android

应用开发者向用户提供的最常见功能之一就是推送通知。在本教程中，我们将逐步讲解在 iOS 和 Android 上实现 [Firebase 云消息推送](https://firebase.google.com/docs/cloud-messaging) 所需的所有步骤。

为了注册和监控来自 Firebase 的推送通知，我们将在 Ionic + Angular 应用中使用 [Capacitor 的推送通知 API](https://capacitorjs.com/docs/v3/apis/push-notifications)。

## 所需依赖

使用 Capacitor 构建和部署 iOS 和 Android 应用需要进行一些设置。请先 [按照这里的说明安装必要的 Capacitor 依赖项](/main/getting-started/environment-setup.md)，然后再继续。

要在 iOS 上测试推送通知，Apple 要求您拥有 [付费的 Apple 开发者账户](https://developer.apple.com/) 和一台 _实体_ iOS 设备。

如果您遇到问题或控制台显示有关过时或已弃用包的警告，请确保您使用的是 Node、Android Studio 和 Xcode 的最新稳定版本。

此外，我们使用 Firebase 进行推送通知，因此如果您使用其他使用 Firebase SDK 的 Cordova 插件，请确保它们使用的是最新版本。

## 准备 Ionic Capacitor 应用

如果您已有 Ionic 应用，请跳过此部分。如果没有，让我们先创建一个 Ionic 应用。

在您首选的终端中，安装最新版本的 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接下来，让我们使用 CLI 基于 **空白** 模板项目创建一个新的 Ionic Angular 应用，并将其命名为 **capApp**：

```bash
ionic start capApp blank --type=angular
```

在提示询问是否将新应用与 Capacitor 集成时，输入 `y` 并按回车键。这会将 Capacitor 和 Capacitor CLI 添加到我们的新应用中。

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

在将任何原生平台添加到此项目之前，必须至少构建一次应用。Web 构建会创建 Capacitor 所需的 Web 资源目录（Ionic Angular 项目中的 `www` 文件夹）。

```bash
ionic build
```

接下来，让我们将 iOS 和 Android 平台添加到我们的应用中。

```bash
npx cap add ios
npx cap add android
```

运行这些命令后，将在项目根目录创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目工件，应被视为 Ionic 应用的一部分（即，将它们纳入版本控制）。

## 使用 Capacitor 推送通知 API

首先，我们需要安装 Capacitor 推送通知插件

```bash
npm install @capacitor/push-notifications
npx cap sync
```

然后，在开始使用 Firebase 之前，我们需要确保我们的应用能够通过使用 Capacitor 推送通知 API 来注册推送通知。我们还将添加一个 `alert`（您也可以使用 `console.log` 语句）来显示当通知到达且应用在我们的设备上打开时的通知负载。

在您的应用中，转到 `home.page.ts` 文件，添加一个 `import` 语句和一个 `const` 来使用 Capacitor Push API：

```typescript
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
```

然后，添加 `ngOnInit()` 方法以及一些用于注册和监控推送通知的 API 方法。我们还将添加几个事件的 `alert()` 来监控正在发生的情况：

```typescript
export class HomePage implements OnInit {

ngOnInit() {
    console.log('初始化 HomePage');

    // 请求使用推送通知的权限
    // iOS 将提示用户并返回他们是否授予了权限
    // Android 将直接授予权限而无需提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple/Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示一些错误信息
      }
    });

    // 成功时，我们应该能够接收通知
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('推送注册成功，令牌: ' + token.value);
      }
    );

    // 我们的设置存在一些问题，推送将无法工作
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('注册错误: ' + JSON.stringify(error));
      }
    );

    // 如果应用在我们的设备上打开，则显示通知负载
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
    console.log('初始化 HomePage');

    // 请求使用推送通知的权限
    // iOS 将提示用户并返回他们是否授予了权限
    // Android 将直接授予权限而无需提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple/Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示一些错误信息
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

之后，您需要生成新的构建并让 Capacitor 知道更改。您可以通过以下方式完成：

```bash
ionic build
npx cap copy
```

## 为你的应用在 Firebase 创建项目

在将 Firebase Cloud Messaging 连接到你的应用并发送推送通知之前，你需要在 Firebase 中创建一个项目。

前往 [Firebase 控制台](https://console.firebase.google.com/) ，点击 **添加项目** 按钮。

为项目命名，接受 Firebase 服务条款，然后点击 **创建项目** 继续。系统应会自动为你生成一个项目 ID。

## Android

### 将 Firebase 集成到 Android 应用

本节内容大致参照了 [使用 Firebase 控制台设置 Firebase 的文档](https://firebase.google.com/docs/android/setup?authuser=0)。以下是与 Capacitor 相关的特定注意事项。

进入你的 Firebase 项目的项目概览页面，在顶部点击 **Android** 图标来添加一个新的 Android 应用。

![在 Firebase 控制台添加新的 Android 应用](../../../../static/img/v3/docs/guides/firebase-push-notifications/add-android-app.png)

接下来会要求你提供一些关于你的应用的信息。

-   你的 **Android 包名** 应与 `capacitor.config.json` 文件中的 **appId** 保持一致。
-   我们为这个 Capacitor 应用 ID 使用了 `com.mydomain.myappname`，所以这里也将使用这个名称。
-   昵称和调试签名证书是可选的

然后点击 **注册应用** 按钮。

### 下载并使用 `google-services.json` 文件

接下来会提示你下载一个 `google-services.json` 文件。该文件包含了你的 Capacitor 应用在 Android 上连接 Firebase 所需的信息。

将 `google-services.json` 文件下载到本地计算机。然后将该文件移动到你的 Capacitor Android 项目目录中，具体位置是 `android/app/` 目录下。

![Android 的 Google Services JSON 文件位置](../../../../static/img/v3/docs/guides/firebase-push-notifications/google-services-location-android.png)

我们不需要向项目中 *添加* 任何依赖项，因为 Capacitor 项目已在其 `build.gradle` 文件中自动包含了 `firebase-messaging`。

## iOS

### 先决条件

iOS 推送通知的设置比 Android 复杂得多。你必须拥有一个 [付费的 Apple 开发者账户](https://developer.apple.com/) *并且* 在能够使用 iOS 应用测试推送通知之前，完成以下事项：

1.  在 Apple 开发者门户中为你的 iOS 应用 [设置正确的开发或生产证书及预配描述文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)
2.  在 Apple 开发者门户中为开发或生产环境 [创建 APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
3.  在 Xcode 中为你的应用 [确保已启用推送通知功能](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)
4.  根据 [环境设置](/main/getting-started/environment-setup.md) 文档中的指引，准备一台物理 iOS 设备

### 将 Firebase 集成到我们的原生 iOS 应用

这部分与上面的 Android 部分非常相似，但有一些关键区别。

首先，进入 Firebase 项目的 **项目概览** 页面。如果你一直按照本指南操作，页面顶部应该已经列出了一个 Android 应用。

要为你的 Firebase 项目添加 iOS 平台，点击 **添加应用** 按钮并选择 **iOS** 平台。

接下来会要求你提供一些关于你的应用的信息。

-   你的 **iOS 包标识符** 应与 `capacitor.config.json` 文件中的 **appId** 保持一致。
-   我们为这个 Capacitor 应用 ID 使用了 `com.mydomain.myappname`，所以这里也将使用这个名称。
-   应用昵称和 App Store ID 是可选的

然后点击 **注册应用** 按钮。

### 将 `GoogleService-Info.plist` 文件添加到你的 iOS 应用

*注意：这与你的 Android 应用使用的文件 **不同** 。*

下载提供的 `GoogleService-Info.plist` 文件到本地计算机。

<<<<<<< HEAD
然后你需要**必须**打开 Xcode...
=======
You'll then **have to** open Xcode...
>>>>>>> upstream/main

```bash
npx cap open ios
```

... 并按照 Firebase 的说明，将 `.plist` 文件移动到你的 Xcode 项目中，确保将其添加到所有目标。

![iOS 的 Google Service Info Plist 文件位置](../../../../static/img/v3/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 通过 CocoaPods 添加 Firebase SDK

iOS 上的推送通知 API 使用了 CocoaPods（一个 iOS 依赖管理系统），我们需要告诉 CocoaPods 使用 Firebase。

为此，我们需要修改 `Podfile`，该文件可以在 Xcode 的 `Pods` 目录下找到：

![iOS Podfile 文件位置](../../../../static/img/v3/docs/guides/firebase-push-notifications/podfile-location-ios.png)

我们需要将 Firebase 添加到为我们的 App 目标提供的 CocoaPods 中。为此，在你的 `target 'App'` 部分添加 `pod Firebase/Messaging`，像这样：

```ruby
target 'App' do
capacitor_pods
# 在此处添加你的 Pods
pod 'Firebase/Messaging' # 添加这一行
end
```

你的 `Podfile` 应该看起来像这样：

```ruby
platform :ios, '12.0'
use_frameworks!

# 一个解决 Xcode 缓存 Pods 问题的变通方案
# 安装新的 Cordova 插件后，需要执行 Product -> Clean Build Folder
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
```

### 更新项目

现在我们需要确保我们的 iOS 项目已更新，并安装了正确的 Firebase CocoaPod。

*注意：这部分可能需要一些时间，因为 CocoaPods 需要下载所有相关的文件/依赖项。*

```bash
npx cap update ios
```

### 添加初始化代码

为了让您的 iOS 应用在启动时连接到 Firebase，您需要在 `AppDelegate.swift` 文件中添加以下内容。

首先，在文件顶部添加 `import` 语句：

```swift
import Firebase
```

然后，在 `AppDelegate.swift` 文件的 `application(didFinishLaunchingWithOptions)` 方法中，为 Firebase 添加配置方法到初始化代码：

```swift
FirebaseApp.configure()
```

接下来，您需要添加以下两个方法来正确处理推送注册事件：

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

完成后，您的 `AppDelegate.swift` 文件应该大致如下所示：

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

### 将 APNS 证书或密钥上传到 Firebase

如果您从开始就遵循了说明，您应该已经在 Apple 开发者门户中创建了一个 Apple APNS 证书或 APNS 认证密钥。在 Firebase 能够与 APNS 通信并向您的应用发送推送通知之前，您需要将其中之一上传到 Firebase。

要上传您的证书或认证密钥，请从 **项目概览** 页面：

1. 点击您的 iOS 应用，然后点击 **设置** 齿轮图标。
2. 在设置页面，点击 **Cloud Messaging** 标签页。
3. 在 **iOS 应用配置** 标题下，使用提供的 **上传** 按钮上传您的认证密钥或证书。

## 发送测试通知

现在到了有趣的部分——让我们验证 Firebase 的推送通知在 Android 和 iOS 上是否正常工作！

我们需要在 Android 或 iOS 上启动我们的应用，以便 `home.page.ts` 页面能够注册并接收通知。

要在 Android Studio 中打开您的 Android 项目：

```bash
npx cap open android
```

要在 Xcode 中打开您的 iOS 项目：

```bash
npx cap open ios
```

项目打开后，使用 Android Studio 或 Xcode 的运行功能将应用旁加载到您的设备上。应用应在主页启动。

_注意：在 iOS 上，您会看到一个弹窗，询问您是否允许应用发送通知——请确保选择 **允许通知**！_

如果您的应用成功注册，并且您遵循了上述代码，您应该会看到一个带有成功消息的弹窗！

现在我们将测试设备是否能接收到通知。要发送通知，请在 Firebase 中转到项目窗格下 Grow 标题下的 **Cloud Messaging** 部分。

接下来，选择 **新建通知** 按钮。

创建通知时，您只需要指定以下信息：

1. 通知的文本内容
2. 标题（仅限 Android，iOS 可选）
3. 目标（可以是用户群组或主题；建议直接定位 iOS 或 Android 应用本身，见下图）

![更改 Firebase 推送目标](../../../../static/img/v3/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4. 调度时间（保持为“立即”）

此时，您可以 **预览** 您组合的通知，并选择 **发布** 来发送通知。

如果您正确设置了应用，您将在主屏幕上看到一个弹窗，显示您在 Firebase 中编写的推送通知。然后，您可以点击通知，根据我们上面的代码，您应该会收到 `pushActionPerformed` 事件的 `alert`。

![Android 推送测试](../../../../static/img/v3/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS 推送测试](../../../../static/img/v3/docs/guides/firebase-push-notifications/push-test-ios.png)