---
title: 发布到应用商店
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/release
---

将你的应用程序发布到 App Store 或 Play Store 之前，首先需要生成可提交的二进制文件。

[Appflow](https://ionic.io/appflow) 是自动化构建和部署应用到商店的最简单方式。如果你的流程是手动的，请按照本指南操作。

## App Store

对于 iOS，你需要将应用构建为 `IPA` 文件：
- 点击 `Project` > `Prepare Release`
- 选择 `IOS Release Build (.ipa)`
- IPA 文件将保存在文件夹 `ios/App/output` 中
- 使用 [Apple Transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12) 将你的 IPA 上传到 App Store

:::note
首次生成 IPA 文件时，你需要指定应用的开发团队。点击 `Open in XCode`，点击 `App`，选择 `Signing & Capabilities` 并从下拉菜单中选择一个团队。之后 `Prepare Release` 将生成由该用户/团队签名的 IPA 文件。
:::

## Play Store

对于 Android，你需要将应用构建为 `AAB` 文件：
- 点击 `Project` > `Prepare Release`
- 选择 `Android Release Build (.aab)`
- 输入 `keystore 密码`
- 输入 `key 密码`
- AAB 文件将保存在文件夹 `android/app/build/outputs/bundle/release` 中
- 使用 [Play Store 控制台](https://developer.android.com/distribute/console) 将 AAB 上传到 Play Store

你的 keystore 文件和别名存储在 `capacitor.config.ts` 中，但出于安全考虑，密码不会被存储。

:::note
首次生成 AAB 文件时，你需要一个 Keystore 文件。你可以在 Android Studio 中创建（`Build` > `Generate Signed Bundle`）。请务必记下你使用的 `alias` 和密码。
:::