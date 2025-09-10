---
title: CLI 命令 - cap build
description: Capacitor CLI - cap build 命令
sidebar_label: build
---

# Capacitor CLI - cap build 命令

此命令用于构建原生项目，生成签名的 AAB、APK 或 IPA 文件。构建选项可通过命令行或 Capacitor 配置文件指定。

```bash
npx cap build [options] <platform>
```

<strong>输入参数：</strong>

- `platform`（必填）：`android` 或 `ios`

<strong>选项参数：</strong>

- `--keystorepath <path>`：密钥库文件路径
- `--keystorepass <keystore-password>`：密钥库密码
- `--keystorealias <alias>` - 密钥库中的密钥别名
- `--keystorealiaspass <alias-password>` - 密钥别名的密码
- `--androidreleasetype <release-type>` - 可指定为 `AAB` 或 `APK`
- `--scheme <scheme-to-build>` - 要构建的 iOS 方案（默认为 App）