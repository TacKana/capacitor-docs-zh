---
title: CLI Command - cap build
description: Capacitor CLI - cap build
sidebar_label: build
---

# Capacitor CLI - cap build

此命令将构建原生项目，以生成已签名的 AAB、APK 或 IPA 文件。构建选项可在命令行中指定，也可以在 Capacitor 配置文件中配置。

```bash
npx cap build [options] <platform>
```

<strong>输入参数:</strong>

- `platform` (必需): `android`, `ios`

<strong>选项:</strong>

- `--scheme <scheme-to-build>`: 要构建的 iOS Scheme (默认为 `App`)
- `--flavor <flavor-to-build>`: 要构建的 Android 风味版
- `--keystorepath <path>`: 密钥库文件的路径
- `--keystorepass <keystore-password>`: 密钥库的密码
- `--keystorealias <alias>`: 密钥库中的密钥别名
- `--configuration <name>`: iOS Scheme 的配置名称
- `--keystorealiaspass <alias-password>`: 密钥库别名的密码
- `--androidreleasetype <release-type>`: 可以是 `AAB` 或 `APK`
- `--signing-type <signingtype>`: 用于为 Android 应用签名的工具 (默认为 `jarsigner`)。可以是 `apksigner` 或 `jarsigner`
- `--xcode-team-id <xcodeTeamID>`: 用于构建和导出归档文件的开发者团队
- `--xcode-export-method <xcodeExportMethod>`: 描述 xcodebuild 应如何导出归档文件 (默认为 `app-store-connect`)。可以是 `app-store-connect`、`release-testing`、`enterprise`、`debugging`、`developer-id`、`mac-application` 或 `validation`
- `--xcode-signing-style <xcodeSigningStyle>`: 为分发构建应用时使用的 iOS 签名方式 (默认为 `automatic`)。可以是 `automatic` 或 `manual`
- `--xcode-signing-certificate <xcodeSigningCertificate>`: 用于 iOS 构建签名的证书名称、SHA-1 哈希值或自动选择器
- `--xcode-provisioning-profile <xcodeProvisioningProfile>`: iOS 构建的配置文件名称或 UUID