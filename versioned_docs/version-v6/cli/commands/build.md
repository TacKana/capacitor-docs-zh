---
title: CLI Command - cap build
description: Capacitor CLI - cap build
sidebar_label: build
---

# Capacitor CLI - cap build

此命令将构建原生项目，以生成签名的 AAB、APK 或 IPA 文件。构建选项可以在命令行中指定，也可以在 Capacitor 配置文件中设置。

```bash
npx cap build [options] <platform>
```

<strong>输入参数：</strong>

- `platform`（必需）：`android`、`ios`

<strong>选项：</strong>

- `--scheme <scheme-to-build>`：要构建的 iOS 方案（Scheme）（默认为 `App`）
- `--flavor <flavor-to-build>`：要构建的 Android 变体（Flavor）
- `--keystorepath <path>`：密钥库文件的路径
- `--keystorepass <keystore-password>`：密钥库的密码
- `--keystorealias <alias>`：密钥库中的密钥别名（Alias）
- `--keystorealiaspass <alias-password>`：密钥库别名的密码
- `--androidreleasetype <release-type>`：可以是 `AAB` 或 `APK`