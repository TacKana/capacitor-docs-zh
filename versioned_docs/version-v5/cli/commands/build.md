---
title: CLI 命令 - cap build
description: Capacitor CLI - cap build
sidebar_label: build
---

# Capacitor CLI - cap build

此命令将构建原生项目以创建签名的 AAB、APK 或 IPA 文件。构建选项可以在命令行中指定，也可以在 Capacitor 配置文件中指定。

```bash
npx cap build [options] <platform>
```

<strong>输入：</strong>

- `platform`（必需）：`android`，`ios`

<strong>选项：</strong>

- `--scheme <scheme-to-build>`：要构建的 iOS Scheme（默认为 `App`）
- `--flavor <flavor-to-build>`：要构建的 Android Flavor
- `--keystorepath <path>`：keystore 文件的路径
- `--keystorepass <keystore-password>`：keystore 的密码
- `--keystorealias <alias>`：keystore 中的密钥别名
- `--keystorealiaspass <alias-password>`：keystore 别名的密码
- `--androidreleasetype <release-type>`：可以是 `AAB` 或 `APK`
