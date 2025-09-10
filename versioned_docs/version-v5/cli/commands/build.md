---
title: CLI 命令 - cap build
description: Capacitor CLI - cap build
sidebar_label: build
---

# Capacitor CLI - cap build

此命令用于构建原生项目，生成已签名的 AAB、APK 或 IPA 文件。构建选项可以通过命令行或在 Capacitor 配置文件中指定。

```bash
npx cap build [options] <platform>
```

<strong>输入参数：</strong>

- `platform` (必填)：`android` 或 `ios`

<strong>选项：</strong>

- `--scheme <scheme-to-build>`: 要构建的 iOS Scheme（默认为 `App`）
- `--flavor <flavor-to-build>`: 要构建的 Android Flavor
- `--keystorepath <path>`: 密钥库文件路径
- `--keystorepass <keystore-password>`: 密钥库密码
- `--keystorealias <alias>`: 密钥库中的密钥别名
- `--keystorealiaspass <alias-password>`: 密钥别名的密码
- `--androidreleasetype <release-type>`: 发布类型，可选 `AAB` 或 `APK`