---
title: 发布到商店
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/release
---

准备将应用发布到 App Store 或 Play Store 首先需要生成一个可以提交的二进制文件。

[Appflow](https://ionic.io/appflow) 是自动化构建和部署应用到商店的最简单方式。如果您的流程是手动的，请遵循本指南。

## App Store

对于 iOS，您需要将应用构建为 `IPA` 文件：
- 点击 `Project` > `Prepare Release`
- 选择 `IOS Release Build (.ipa)`
- IPA 文件将保存在 `ios/App/output` 文件夹中
- 使用 [Apple Transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12) 将您的 IPA 上传到 App Store

:::note
第一次生成 IPA 时，您需要指定应用的开发团队。点击 `Open in Xcode`，点击 `App`，选择 `Signing & Capabilities`，然后从下拉菜单中选择一个 Team。之后，`Prepare Release` 将生成由该用户/团队签名的 IPA 文件。
:::

## Play Store

对于 Android，您需要将应用构建为 `AAB` 文件：
- 点击 `Project` > `Prepare Release`
- 选择 `Android Release Build (.aab)`
- 输入 `keystore password`
- 输入 `key password`
- AAB 文件将保存在 `android/app/build/outputs/bundle/release` 文件夹中
- 使用 [Play Store Console](https://developer.android.com/distribute/console) 将 AAB 上传到 Play Store

您的 keystore 文件和别名会存储在 `capacitor.config.ts` 中，但出于安全目的，密码不会被存储。

:::note
第一次生成 AAB 文件时，您需要一个 Keystore 文件。您可以在 Android Studio 中创建一个（`Build` > `Generate Signed Bundle`）。请务必记下您使用的 `alias` 和密码。
:::
