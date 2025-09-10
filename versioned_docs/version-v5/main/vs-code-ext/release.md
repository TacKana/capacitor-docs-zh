---
title: Release to the Store
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/release
---

将应用发布至 App Store 或 Play Store 前，首先需要生成可提交的二进制文件。

[Appflow](https://ionic.io/appflow) 是自动化构建和发布应用的最便捷方式。若采用手动流程，请遵循本指南操作。

## App Store 发布

iOS 应用需打包为 `IPA` 文件：
1. 点击 `Project` > `Prepare Release`
2. 选择 `IOS Release Build (.ipa)`
3. IPA 文件将保存至 `ios/App/output` 目录
4. 使用 [Apple Transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12) 将 IPA 上传至 App Store

:::note
首次生成 IPA 文件时，需指定应用的开发团队。点击 `Open in XCode`，选择 `App` 项目，进入 `Signing & Capabilities` 选项卡，从下拉菜单中选择 Team。完成后，`Prepare Release` 将生成经该用户/团队签名的 IPA 文件。
:::

## Play Store 发布

Android 应用需打包为 `AAB` 文件：
1. 点击 `Project` > `Prepare Release`
2. 选择 `Android Release Build (.aab)`
3. 输入 `keystore 密码`
4. 输入 `key 密码`
5. AAB 文件将保存至 `android/app/build/outputs/bundle/release` 目录
6. 通过 [Play 控制台](https://developer.android.com/distribute/console) 将 AAB 上传至 Play Store

密钥库文件和别名已存储在 `capacitor.config.ts` 中，但出于安全考虑，密码不会被保存。

:::note
首次生成 AAB 文件时需提供密钥库文件。可通过 Android Studio 创建（`Build` > `Generate Signed Bundle`），请务必记录使用的 `alias` 和密码。
:::