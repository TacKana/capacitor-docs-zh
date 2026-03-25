---
title: 推送通知 - Firebase
description: 学习如何在 Ionic 应用的 iOS 和 Android 平台上实现 Firebase Cloud Messaging
contributors:
  - bryplano
  - javebratt
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 推送通知

**Web 框架**: Angular
**平台**: iOS, Android

应用开发者为用户提供的最常见功能之一就是推送通知。在本教程中，我们将逐步讲解如何在 iOS 和 Android 上实现 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)。

为了注册和监听来自 Firebase 的推送通知，我们将在 Ionic + Angular 应用中使用 [Capacitor 的推送通知 API](https://capacitorjs.com/docs/apis/push-notifications)。

## 所需依赖

使用 Capacitor 构建和部署 iOS 与 Android 应用需要进行一些设置。请先[按照这里的说明安装必要的 Capacitor 依赖](/main/getting-started/environment-setup.md)，然后再继续。

要在 iOS 上测试推送通知，Apple 要求您拥有[付费的 Apple 开发者账户](https://developer.apple.com/)和*物理* iOS 设备。

如果遇到问题或控制台显示有关过时或弃用包的警告，请确保您使用的是最新稳定版本的 Node、Android Studio 和 Xcode。

另外，我们使用 Firebase 处理推送通知，因此如果您使用其他使用 Firebase SDK 的 Cordova 插件，请确保它们使用的是最新版本。

## 准备 Ionic Capacitor 应用

如果您已有现有的 Ionic 应用，请跳过此部分。如果没有，我们先创建一个 Ionic 应用。

在您首选的终端中，安装最新版本的 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接下来，使用 CLI 基于**空白**初始项目创建一个新的 Ionic Angular 应用，命名为 **capApp**：

```bash
ionic start capApp blank --type=angular
```

在提示是否将新应用与 Capacitor 集成时，输入 `y` 并按回车。这会将 Capacitor 和 Capacitor CLI 添加到我们的新应用中。

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

在向此项目添加任何原生平台之前，应用必须至少构建一次。Web 构建会创建 Capacitor 所需的 Web 资源目录（Ionic Angular 项目中的 `www` 文件夹）。

```bash
ionic build
```

接下来，为我们的应用添加 iOS 和 Android 平台。

```bash
npx cap add ios
npx cap add android
```

运行这些命令后，会在项目根目录创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目产物，应被视为 Ionic 应用的一部分（即，将它们纳入版本控制）。

## 使用 Capacitor 推送通知 API

首先，我们需要安装 Capacitor 推送通知插件

```bash
npm install @capacitor/push-notifications
npx cap sync
```

然后，在开始使用 Firebase 之前，我们需要确保我们的应用能够通过 Capacitor 推送通知 API 注册推送通知。我们还将添加一个 `alert`（也可以使用 `console.log` 语句）来显示当通知到达且应用在我们的设备上打开时的通知负载。

在您的应用中，转到 `home.page.ts` 文件，添加 `import` 语句和 `const` 以使用 Capacitor 推送 API：

```typescript
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
```

然后，添加 `ngOnInit()` 方法，其中包含一些用于注册和监听推送通知的 API 方法。我们还将为几个事件添加 `alert()` 以监控正在发生的情况：

```typescript
export class HomePage implements OnInit {

ngOnInit() {
    console.log('正在初始化 HomePage');

    // 请求推送通知使用权限
    // iOS 将提示用户并返回是否授予权限
    // Android 将直接授予而不提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple/Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示一些错误信息
      }
    });

    // 成功后，我们应该能够接收通知
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('推送注册成功，令牌：' + token.value);
      }
    );

    // 我们的设置存在问题，推送将无法工作
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
    console.log('正在初始化 HomePage');

    // 请求推送通知使用权限
    // iOS 将提示用户并返回是否授予权限
    // Android 将直接授予而不提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple/Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示一些错误信息
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('推送注册成功，令牌：' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('注册错误：' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('收到推送：' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('推送操作执行：' + JSON.stringify(notification));
      },
    );
  }
}
```

完成此操作后，您需要生成新的构建并让 Capacitor 了解更改。您可以通过以下命令实现：

```bash
ionic build
npx cap copy
```## 在 Firebase 上为你的应用创建项目

在将 Firebase Cloud Messaging 连接到你的应用并发送推送通知之前，你需要在 Firebase 中创建一个项目。

前往 [Firebase 控制台](https://console.firebase.google.com/) 并点击 **添加项目** 按钮。

为项目命名，接受 Firebase 服务条款，然后点击 **创建项目** 继续。系统应会自动为你生成一个项目 ID。

## Android

### 将 Firebase 集成到 Android 应用

本节内容大致遵循 [使用 Firebase 控制台设置 Firebase 的官方文档](https://firebase.google.com/docs/android/setup?authuser=0)。下文将提供与 Capacitor 相关的具体说明。

进入你的 Firebase 项目的项目概览页面，点击顶部的 **Android** 图标以添加新的 Android 应用。

![在 Firebase 控制台添加新的 Android 应用](../../../../static/img/v4/docs/guides/firebase-push-notifications/add-android-app.png)

接下来的屏幕会要求你提供一些关于应用的信息。

- 你的 **Android 包名** 应与 `capacitor.config.json` 文件中的 **appId** 匹配
- 我们在这个 Capacitor 应用中使用了 `com.mydomain.myappname` 作为应用 ID，因此此处也将使用这个值。
- 昵称和调试签名证书是可选项

然后点击 **注册应用** 按钮。

### 下载并使用 `google-services.json` 文件

接下来的提示会要求你下载一个 `google-services.json` 文件。该文件包含了你的 Capacitor 应用在 Android 端连接 Firebase 所需的信息。

将 `google-services.json` 文件下载到本地计算机。然后将该文件移动到你的 Capacitor Android 项目目录中，具体位置是 `android/app/`。

![Android 的 Google Services JSON 文件位置](../../../../static/img/v4/docs/guides/firebase-push-notifications/google-services-location-android.png)

我们不需要向项目中*添加*任何依赖项，因为 Capacitor 项目会自动在其 `build.gradle` 文件中包含一个 `firebase-messaging` 版本。

## iOS

### 前提条件

iOS 推送通知的设置比 Android 要复杂得多。你必须拥有一个[付费的 Apple 开发者账户](https://developer.apple.com/)，*并且*在能够使用 iOS 应用测试推送通知之前，需要完成以下事项：

1. 在 Apple 开发者门户中为你的 iOS 应用[设置正确的开发或生产证书及描述文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)
2. 在 Apple 开发者门户中为开发或生产环境[创建 APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
3. 在 Xcode 中为你的应用[确保已启用推送通知功能](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)
4. 根据[环境设置](/main/getting-started/environment-setup.md)文档中的指导，准备一台物理 iOS 设备

### 将 Firebase 集成到我们的原生 iOS 应用

这部分与上面的 Android 部分非常相似，但有一些关键差异。

首先，进入 Firebase 项目的**项目概览**页面。如果你一直按照本指南操作，你会在页面顶部看到一个已列出的 Android 应用。

要向你的 Firebase 项目添加 iOS 应用，点击 **添加应用** 按钮并选择 **iOS** 平台。

接下来的屏幕会要求你提供一些关于应用的信息。

- 你的 **iOS 包标识符** 应与 `capacitor.config.json` 文件中的 **appId** 匹配
- 我们在这个 Capacitor 应用中使用了 `com.mydomain.myappname` 作为应用 ID，因此此处也将使用这个值。
- 应用昵称和应用商店 ID 是可选项

然后点击 **注册应用** 按钮。

### 将 `GoogleService-Info.plist` 文件添加到你的 iOS 应用

*注意：这与 Android 应用使用的文件*不同*。*

将提供的 `GoogleService-Info.plist` 下载到本地计算机。

接下来你**必须**打开 Xcode...

```bash
npx cap open ios
```

... 并按照 Firebase 的说明，将 `.plist` 文件移动到你的 Xcode 项目中，确保将其添加到所有目标。

![iOS 的 Google Service Info Plist 文件位置](../../../../static/img/v4/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 通过 CocoaPods 添加 Firebase SDK

iOS 上的推送通知 API 使用 CocoaPods（一个 iOS 依赖管理系统），我们需要告诉 CocoaPods 使用 Firebase。

为此，我们需要修改 `Podfile`，该文件可以在 Xcode 中的 `Pods` 目录下找到：

![iOS Podfile 位置](../../../../static/img/v4/docs/guides/firebase-push-notifications/podfile-location-ios.png)

我们需要将 Firebase 添加到为我们的 App 目标提供的 CocoaPods 中。为此，在你的 `target 'App'` 部分添加 `pod Firebase/Messaging`，如下所示：

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

# 避免 Xcode 缓存 Pods 的变通方案，安装新的 Cordova 插件后需要
# 执行 Product -> Clean Build Folder
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

*注意：由于 CocoaPods 需要下载所有相关的文件/依赖项，这部分可能需要一些时间。*

```bash
npx cap update ios
```### 添加初始化代码

要在 iOS 应用启动时连接 Firebase，需要在 `AppDelegate.swift` 文件中添加以下内容。

首先，在文件顶部添加 `import` 语句：

```swift
import Firebase
```

...然后在 `AppDelegate.swift` 文件的 `application(didFinishLaunchingWithOptions)` 方法中，为 Firebase 添加配置初始化代码：

```swift
FirebaseApp.configure()
```

接着，需要添加以下两个方法，以正确处理推送注册事件：

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

### 将 APNS 证书或密钥上传至 Firebase

如果按照前面的指引操作，你应该已在 Apple Developer 门户中创建了 Apple APNS 证书或 APNS 认证密钥。在 Firebase 能与 APNS 通信并向你的应用发送推送通知之前，你需要将其中一项上传到 Firebase。

要上传证书或认证密钥，请从 **项目概览** 页面开始：

1. 点击你的 iOS 应用，然后点击 **设置** 齿轮图标。
2. 在设置页面，点击 **Cloud Messaging** 标签页。
3. 在 **iOS 应用配置** 标题下，使用提供的 **上传** 按钮上传你的认证密钥或证书。

## 发送测试通知

现在到了有趣的部分——让我们验证 Firebase 的推送通知在 Android 和 iOS 上是否正常工作！

我们需要在 Android 或 iOS 上启动应用，以便 `home.page.ts` 页面能够注册并接收通知。

在 Android Studio 中打开你的 Android 项目：

```bash
npx cap open android
```

在 Xcode 中打开你的 iOS 项目：

```bash
npx cap open ios
```

项目打开后，使用 Android Studio 或 Xcode 的 Run 功能将应用旁加载到你的设备上。应用应在主页启动。

*注意：在 iOS 上，你会看到弹窗询问是否允许应用发送通知——请务必选择 **允许通知**！*

如果你的应用成功注册，并且你按照上面的代码操作，应该会看到带有成功消息的提示框！

现在我们来测试设备是否能收到通知。要发送通知，请在 Firebase 中进入项目面板 Grow 标题下的 **Cloud Messaging** 部分。

接下来，点击 **新建通知** 按钮。

创建通知时，只需指定以下信息：

1. 通知文本
2. 标题（仅限 Android，iOS 可选）
3. 目标（可以是用户群组或主题；建议直接选择 iOS 或 Android 应用本身，见下图）

![在 Firebase 中更改推送目标](../../../../static/img/v4/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4. 排程（保持为“立即”）

此时，你可以 **查看** 你创建的通知，并选择 **发布** 来发送通知。

如果你的应用设置正确，你将在主屏幕上看到 Firebase 中设置的推送通知弹窗。然后你可以点击通知，根据我们上面的代码，应该会触发 `pushActionPerformed` 事件的 `alert`。

![Android 推送测试](../../../../static/img/v4/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS 推送测试](../../../../static/img/v4/docs/guides/firebase-push-notifications/push-test-ios.png)