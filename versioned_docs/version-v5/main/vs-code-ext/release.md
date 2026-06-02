---
title: 发布到商店
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/release
---

准备将应用程序发布到 App Store 或 Play Store 首先需要生成一个可提交的二进制文件。

[Appflow](https://ionic.io/appflow) 是自动化构建和部署应用到商店的最简单方法。如果您是手动操作，请按照本指南进行。

## App Store

对于 iOS，您需要将应用构建为 `IPA` 文件：
- 点击 `项目` > `准备发布`
- 选择 `iOS 发布构建 (.ipa)`
- IPA 文件将保存在文件夹 `ios/App/output` 中
- 使用 [Apple Transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12) 将您的 IPA 上传到 App Store

:::note
第一次生成 IPA 时，您需要指定应用的开发团队。点击 `在 XCode 中打开`，点击 `App`，选择 `签名与功能`，然后从下拉菜单中选择一个团队。之后，`准备发布` 将生成由此用户/团队签名的 IPA 文件。
:::

## Play Store

对于 Android，您需要将应用构建为 `AAB` 文件：
- 点击 `项目` > `准备发布`
- 选择 `Android 发布构建 (.aab)`
- 输入 `密钥库密码`
- 输入 `密钥密码`
- AAB 文件将保存在文件夹 `android/app/build/outputs/bundle/release` 中
- 使用 [Play Store 控制台](https://developer.android.com/distribute/console) 将 AAB 上传到 Play Store

您的密钥库文件和别名将保存在 `capacitor.config.ts` 中，但出于安全考虑，密码不会被保存。

:::note
第一次生成 AAB 文件时，您需要一个密钥库文件。您可以在 Android Studio 中创建（`构建` > `生成签名包`）。请务必记下您使用的 `别名` 和密码。
:::
