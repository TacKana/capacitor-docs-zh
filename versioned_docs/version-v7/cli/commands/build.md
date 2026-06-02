---
title: CLI 命令 - cap build
description: Capacitor CLI - cap build
sidebar_label: build
---

# Capacitor CLI - cap build

此命令将构建原生项目，以创建签名的 AAB、APK 或 IPA 文件。构建选项可以在命令行中指定，也可以在 Capacitor 配置文件中指定。

```bash
npx cap build [options] <platform>
```

<strong>输入参数：</strong>

- `platform`（必需）：`android`、`ios`

<strong>选项：</strong>

- `--scheme <scheme-to-build>`：iOS 构建方案（默认为 `App`）
- `--flavor <flavor-to-build>`：Android 构建风格
- `--keystorepath <path>`：密钥库文件路径
- `--keystorepass <keystore-password>`：密钥库密码
- `--keystorealias <alias>`：密钥库中的密钥别名
- `--keystorealiaspass <alias-password>`：密钥库别名密码
- `--androidreleasetype <release-type>`：可以是 `AAB` 或 `APK`
