---
title: 发布到应用商店
description: Visual Studio Code 扩展 for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/release
---

将您的应用程序准备发布到 App Store 或 Play Store，首先需要生成一个可供提交的二进制文件。

[Appflow](https://ionic.io/appflow) 是自动化构建并将应用部署到商店的最简单方式。如果您的流程是手动的，请遵循本指南。

## App Store

对于 iOS，您需要将应用构建成 `IPA` 文件：
- 点击 `项目` > `准备发布`
- 选择 `iOS 发布构建 (.ipa)`
- IPA 文件将保存在 `ios/App/output` 文件夹中
- 使用 [Apple Transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12) 将您的 IPA 文件上传到 App Store

:::note
首次生成 IPA 文件时，您需要指定应用的开发团队。点击 `在 XCode 中打开`，点击 `App`，选择 `签名与功能`，然后从下拉列表中选择一个团队。此后，`准备发布` 将生成一个由该用户/团队签名的 IPA 文件。
:::

## Play Store

对于 Android，您需要将应用构建成 `AAB` 文件：
- 点击 `项目` > `准备发布`
- 选择 `Android 发布构建 (.aab)`
- 输入 `keystore 密码`
- 输入 `key 密码`
- AAB 文件将保存在 `android/app/build/outputs/bundle/release` 文件夹中
- 使用 [Play 商店控制台](https://developer.android.com/distribute/console) 将 AAB 文件上传到 Play Store

您的 keystore 文件和别名存储在 `capacitor.config.ts` 中，但出于安全考虑，密码不会被存储。

:::note
首次生成 AAB 文件时，您需要一个 Keystore 文件。您可以在 Android Studio 中创建一个（`构建` > `生成签名包`）。请务必记下您使用的 `别名` 和密码。
:::