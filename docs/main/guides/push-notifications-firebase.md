---
title: Push Notifications - Firebase
description: 学习如何在 Ionic 应用中的 iOS 和 Android 上实现 Firebase 云消息推送功能
contributors:
  - bryplano
  - javebratt
  - markemer
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 推送通知

**Web 框架**: Angular
**平台**: iOS, Android

应用开发者为用户提供的最常见功能之一就是推送通知。在本教程中，我们将逐步讲解如何在 iOS 和 Android 上实现 [Firebase 云消息推送](https://firebase.google.com/docs/cloud-messaging) 功能。

为了实现 Firebase 推送通知的注册和监听，我们将在 Ionic + Angular 应用中使用 [Capacitor 推送通知 API](https://capacitorjs.com/docs/apis/push-notifications)。

## 所需依赖

使用 Capacitor 构建和部署 iOS 与 Android 应用需要进行一些设置。请先 [按照这里的说明安装必要的 Capacitor 依赖](/main/getting-started/environment-setup.md)，然后再继续。

要在 iOS 上测试推送通知，Apple 要求您拥有 [付费的 Apple 开发者账号](https://developer.apple.com/)。

此外，由于我们使用 Firebase 进行推送通知，如果您使用了其他依赖 Firebase SDK 的 Cordova 插件，请确保它们是最新版本。

## 准备 Ionic Capacitor 应用

如果您已有 Ionic 应用，请跳过此部分。如果没有，让我们先创建一个 Ionic 应用。

在您常用的终端中，安装最新版本的 Ionic CLI：

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

最后，编辑 `capacitor.config.ts` 中的 `appId`。

```diff
const config: CapacitorConfig = {
- appId: 'io.ionic.starter',
+ appId: 'com.mydomain.myappnam',
  appName: 'capApp',
  webDir: 'www'
};
```

## 构建应用并添加平台

在向此项目添加任何原生平台之前，必须至少构建一次应用。Web 构建会创建 Capacitor 所需的 Web 资源目录（Ionic Angular 项目中的 `www` 文件夹）。

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

首先，我们需要安装 Capacitor 推送通知插件。

```bash
npm install @capacitor/push-notifications
npx cap sync
```

然后，在接入 Firebase 之前，我们需要确保应用能够使用 Capacitor 推送通知 API 注册推送通知。我们还将添加一个 `alert`（您也可以使用 `console.log` 语句）来显示当通知到达且应用在设备上打开时的通知负载内容。

在您的应用中，转到 `home.page.ts` 文件，添加 `import` 语句和 `const` 以使用 Capacitor 推送 API：

```typescript
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
```

然后，添加 `ngOnInit()` 方法以及一些用于注册和监听推送通知的 API 方法。我们还将为几个事件添加 `alert()`，以监控正在发生的情况：

```typescript
export class HomePage implements OnInit {
  ngOnInit() {
    console.log('Initializing HomePage');

    // 请求使用推送通知的权限
    // iOS 会提示用户并返回是否授予了权限
    // Android 会直接授予权限而无需提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple / Google 注册，以便通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示一些错误信息
      }
    });

    // 注册成功后，我们应该能够接收通知
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('推送注册成功，令牌：' + token.value);
      }
    );

    // 我们的设置存在问题，推送将无法工作
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('注册时出错：' + JSON.stringify(error));
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
        alert('推送操作已执行：' + JSON.stringify(notification));
      }
    );
  }
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

完成这些操作后，您需要生成新的构建并让 Capacitor 知晓更改。您可以通过以下命令实现：

```bash
ionic build
npx cap copy
```

## 在 Firebase 上为您的应用创建项目

在将 Firebase 云消息推送连接到您的应用并发送推送通知之前，您需要在 Firebase 中创建一个项目。

前往 [Firebase 控制台](https://console.firebase.google.com/) 并点击 **添加项目** 按钮。

为项目命名，接受 Firebase 服务条款，然后点击 **创建项目** 继续。系统会自动为您生成一个项目 ID。

## Android### 将 Firebase 集成到 Android 应用中

本节内容大致遵循 [使用 Firebase 控制台设置 Firebase 的官方文档](https://firebase.google.com/docs/android/setup?authuser=0)。下方提供了与 Capacitor 相关的特定注意事项。

前往你的 Firebase 项目概览页面，点击顶部的 **Android** 图标以添加新的 Android 应用程序。

![在 Firebase 控制台中添加新的 Android 应用程序](../../../static/img/v6/docs/guides/firebase-push-notifications/add-android-app.png)

接下来的屏幕会要求你提供应用程序的一些信息。

- 你的 **Android 包名** 应与 `capacitor.config.ts` 文件中的 **appId** 一致
- 本示例中使用的 Capacitor 应用 ID 是 `com.mydomain.myappname`，因此此处我们也使用相同的值。
- 昵称和调试签名证书为选填项

然后点击 **注册应用** 按钮。

### 下载并使用 `google-services.json` 文件

接下来会提示你下载 `google-services.json` 文件。该文件包含了你的 Capacitor 应用在 Android 平台上连接 Firebase 所需的信息。

将 `google-services.json` 文件下载到本地，然后将其移动到你的 Capacitor Android 项目目录中，具体位置是 `android/app/` 下。

![Android 平台上 Google Services JSON 文件的位置](../../../static/img/v6/docs/guides/firebase-push-notifications/google-services-location-android.png)

我们无需向项目中 _添加_ 任何依赖项，因为 `@capacitor/push-notifications` 在其 `build.gradle` 文件中已自动包含了 `firebase-messaging` 的某个版本。

## iOS

### 前提条件

iOS 推送通知的设置比 Android 要复杂得多。你必须拥有一个 [付费的 Apple 开发者账号](https://developer.apple.com/)，并且_在能够测试 iOS 应用的推送通知之前_，需要完成以下事项：

1.  在 Apple 开发者门户中为你的 iOS 应用程序 [设置正确的开发或生产证书及描述文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)
2.  在 Apple 开发者门户中为开发或生产环境 [创建 APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)
3.  在 Xcode 中为你的应用程序 [确保已启用推送通知功能](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)

### 将 Firebase 集成到原生 iOS 应用中

这部分与上面的 Android 章节非常相似，但存在几个关键区别。

首先，前往 Firebase 项目的 **项目概览** 页面。如果你一直按照本指南操作，页面顶部应该已经列出了一个 Android 应用程序。

要为你的 Firebase 项目添加 iOS 应用，请点击 **添加应用** 按钮，并选择 **iOS** 平台。

接下来的屏幕会要求你提供应用程序的一些信息。

-   你的 **iOS 包 ID** 应与 `capacitor.config.ts` 文件中的 **appId** 一致
-   本示例中使用的 Capacitor 应用 ID 是 `com.mydomain.myappname`，因此此处我们也使用相同的值。
-   应用昵称和 App Store ID 为选填项

然后点击 **注册应用** 按钮。

### 将 `GoogleService-Info.plist` 文件添加到你的 iOS 应用中

_注意：这**不是** Android 应用使用的那个文件。_

下载提供的 `GoogleService-Info.plist` 文件到本地。

然后你**必须**打开 Xcode...

```bash
npx cap open ios
```

... 并按照 Firebase 的说明将 `.plist` 文件移动到你的 Xcode 项目中，确保将其添加到所有目标。

![iOS 平台上 Google Service Info Plist 文件的位置](../../../static/img/v6/docs/guides/firebase-push-notifications/google-plist-location-ios.png)

### 添加 Firebase SDK

iOS 上的推送通知 API 使用 Swift Package Manager 或 CocoaPods 进行依赖管理。我们需要告诉它们使用 Firebase。

#### 使用 Swift Package Manager (SPM)

要使用 SPM 添加 SDK，你需要修改 `ios/App/App.xcodeproj`。

首先，通过运行 `npx cap open ios` 或在 Finder 中双击该文件，在 Xcode 中打开 `ios/App/App.xcodeproj`。

在左侧选择你的 App，在右侧选择包依赖项，如下图所示。

![SPM-FB-步骤1](../../../static/img/spm/firebase/firebase-spm-step1.png)

然后，点击加号图标添加新的包，应该会出现类似下图的界面。

![SPM-FB-步骤2a](../../../static/img/spm/firebase/firebase-spm-step2a.png)

在搜索框中输入 `https://github.com/firebase/firebase-ios-sdk`，然后选择“Add Package”。

![SPM-FB-步骤2b](../../../static/img/spm/firebase/firebase-spm-step2b.png)

现在滚动并添加 Firebase Messaging 到 App 目标。

![SPM-FB-步骤3](../../../static/img/spm/firebase/firebase-spm-step3.png)

点击“Add Package”，等待处理完成。完成后，你应该会看到类似下图的界面。

![SPM-FB-步骤4](../../../static/img/spm/firebase/firebase-spm-step4.png)

#### 使用 CocoaPods

为此，我们需要修改 `Podfile`，该文件可以在 Xcode 的 `Pods` 目录下找到：

![iOS 平台上 Podfile 的位置](../../../static/img/v6/docs/guides/firebase-push-notifications/podfile-location-ios.png)

我们需要将 Firebase 添加到为 App 目标提供的 CocoaPods 中。为此，在你的 `target 'App'` 部分添加 `pod 'FirebaseMessaging'`，如下所示：

```ruby
target 'App' do
  capacitor_pods
  # 在此处添加你的 Pod
  pod 'FirebaseMessaging' # 添加这一行
end
```

你的 `Podfile` 应该类似于这样：

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '14.0'
use_frameworks!

# 避免 Xcode 缓存 Pod 的变通方案，要求：
# 安装新的 Cordova 插件后，执行 Product -> Clean Build Folder
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
  # 在此处添加你的 Pod
  pod 'FirebaseMessaging'
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

### 更新项目

现在我们需要确保我们的 iOS 项目已更新，并安装了正确的 Firebase CocoaPod。

_注意：这部分可能需要一段时间，因为 CocoaPods 需要下载所有相关的文件/依赖项。_

```bash
npx cap update ios
```### 添加初始化代码

要在 iOS 应用启动时连接 Firebase，你需要在 `AppDelegate.swift` 文件中添加以下内容。

首先，在文件顶部添加 `import` 语句：

```swift
import FirebaseCore
import FirebaseMessaging
```

... 然后在 `AppDelegate.swift` 文件的 `application(didFinishLaunchingWithOptions)` 方法中，为 Firebase 添加配置方法的初始化代码。

```swift
FirebaseApp.configure()
```

接着，你需要添加以下两个方法以正确处理推送注册事件：

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

你完整的 `AppDelegate.swift` 文件应大致如下所示：

```swift
import UIKit
import Capacitor
import FirebaseCore
import FirebaseMessaging

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?


  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // 应用启动后进行自定义的入口点。
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

如果你从一开始就按照说明操作，你应该已经在 Apple 开发者门户中创建了 Apple APNS 证书或 APNS 认证密钥。在 Firebase 能够与 APNS 通信并向你的应用发送推送通知之前，你需要将其中之一上传到 Firebase。

要上传你的证书或认证密钥，请从 **项目概览** 页面：

1. 点击你的 iOS 应用，然后点击 **设置** 齿轮图标。
2. 在设置页面，点击 **Cloud Messaging** 标签页。
3. 在 **iOS 应用配置** 标题下，使用提供的 **上传** 按钮上传你的认证密钥或证书。

## 发送测试通知

现在到了有趣的部分——让我们验证来自 Firebase 的推送通知在 Android 和 iOS 上是否正常工作！

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

_注意：在 iOS 上，你会看到一个弹窗，询问你是否允许应用发送通知——请确保选择 **允许通知**！_

如果你的应用成功注册，并且你遵循了上面的代码，你应该会看到一个带有成功消息的提示框！

现在我们来测试通知是否被设备接收。要发送通知，请在 Firebase 中，转到项目面板 Grow 标题下的 **Cloud Messaging** 部分。

接下来，选择 **New Notification** 按钮。

创建通知时，你只需指定以下信息：

1. 通知的文本内容
2. 标题（仅限 Android，iOS 为可选）
3. 目标（可以是用户细分或主题；我建议直接定位 iOS 或 Android 应用本身，见下文）

![在 Firebase 中更改推送目标](../../../static/img/v6/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4. 调度时间（保持为 "Now"）

此时，你可以 **查看** 你组装的通知，并选择 **发布** 以发送通知。

如果你正确设置了应用，你将在主屏幕上看到一个弹窗，显示你在 Firebase 中编写的推送通知。然后你可以点击通知，根据我们上面的代码，你应该会收到 `pushActionPerformed` 事件的 `alert`。

![Android 推送测试](../../../static/img/v6/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS 推送测试](../../../static/img/v6/docs/guides/firebase-push-notifications/push-test-ios.png)

## 推送通知中的图片

你可以选择按照以下指南将图片作为推送通知的一部分。

:::tip
Firebase Messaging SDK 可以在其有效载荷中包含一个 `ImageUrl` 属性并显示它。URL 必须是 `https://` 且大小小于 300kb。
:::

### Android 图片支持
在使用 `@capacitor/push-notifications` 时，Android 会自动显示图片。如果你在 [Firebase 控制台](https://console.firebase.google.com/) 中通过设置 `Notification image` 来测试这一点，推送通知将在 Android 设备上显示，类似于下面的截图：

![Android 推送通知带图片](../../../static/img/v6/docs/guides/firebase-push-notifications/android-push-image.jpeg)### iOS 平台上的图片推送
iOS 系统要求在项目中添加 [通知服务扩展（Notification Service Extension）](https://developer.apple.com/documentation/usernotifications/unnotificationserviceextension) 才能实现在推送通知中展示图片。

在 XCode 中操作如下：
- 点击 `File` > `New` > `Target`
- 选择 `Notification Service Extension` 并点击 `Next`
- 输入一个 `Product Name`（例如 `pushextension`）
- 选择你的团队（Team）
- 点击 `Finish`
- 系统询问时点击 `Activate`

从目标（Targets）列表中选择 `pushextension`，然后：
- 点击 `Signing & Capabilities`
- 点击 `+ Capability`
- 选择 `Push Notifications`
- 将部署目标（Deployment target）从 `iOS 16.4`（或 Xcode 默认选择的版本）改为 `iOS 15.0`

:::note
 如果不为你的扩展修改部署目标，那么旧版本 iOS 设备上将无法显示图片。
:::

为扩展添加 Firebase 消息推送功能：

使用 Swift Package Manager（SPM）：
- 选择 `pushextension` 目标
- 在 `General` > `Frameworks and Libraries` 下，点击“添加项目”按钮
- 添加 `FirebaseMessaging`

使用 CocoaPods：
打开你的 `Podfile` 并添加：
```ruby
target 'pushextension' do
  pod 'FirebaseMessaging'
end
```

然后运行以下命令更新 Cocoapods：
```bash
npx cap update ios
```

现在打开 `NotificationService.swift` 文件（该文件位于名为 `pushextension` 的文件夹中），并将其内容替换为以下代码：

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

现在你应该从 [Firebase 控制台](https://console.firebase.google.com) 测试一条推送通知，记得设置 `Notification image` 并选择你的 iOS 应用。当通知到达 iOS 设备时，图片会显示在右侧，如下图所示：

![iOS 推送通知带图片](../../../static/img/v6/docs/guides/firebase-push-notifications/ios-push-image.jpeg)