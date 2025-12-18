---
title: CLI 命令 - cap build
description: Capacitor CLI - cap build
sidebar_label: build
---

# Capacitor CLI - cap build

此命令将构建原生项目，生成已签名的 AAB、APK 或 IPA 文件。构建选项可以通过命令行或在 Capacitor 配置文件中指定。

```bash
npx cap build [options] <platform>
```

<strong>输入参数：</strong>

- `platform` (必填): `android`（安卓）, `ios`（iOS）

<strong>选项：</strong>

- `--scheme <scheme-to-build>`：要构建的iOS方案（默认为`App`）
- `--flavor <flavor-to-build>`：要构建的Android变体
- `--keystorepath <path>`：密钥库文件路径
- `--keystorepass <keystore-password>`：密钥库密码
- `--keystorealias <alias>`：密钥库中的密钥别名
- `--configuration <name>`：iOS方案的配置名称
- `--keystorealiaspass <alias-password>`：密钥别名密码
- `--androidreleasetype <release-type>`：发布类型，可选`AAB`或`APK`
- `--signing-type <signingtype>`：用于为Android应用签名的程序（默认为`jarsigner`）。可以是`apksigner`或`jarsigner`
- `--xcode-team-id <xcodeTeamID>`：用于构建和导出归档文件的开发者团队
- `--xcode-export-method <xcodeExportMethod>`：描述xcodebuild应如何导出归档文件（默认为`app-store-connect`）。可以是`app-store-connect`、`release-testing`、`enterprise`、`debugging`、`developer-id`、`mac-application`或`validation`
- `--xcode-signing-style <xcodeSigningStyle>`：为分发而构建应用时使用的iOS签名样式（默认为`automatic`）。可以是`automatic`或`manual`
- `--xcode-signing-certificate <xcodeSigningCertificate>`：用于iOS构建签名的证书名称、SHA-1哈希或自动选择器
- `--xcode-provisioning-profile <xcodeProvisioningProfile>`：iOS构建的配置文件名称或UUID
