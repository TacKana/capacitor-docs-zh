---
title: CLI 命令 - cap init
description: Capacitor CLI 命令 - cap init
contributors:
  - thomasvidas
sidebar_label: init
---

# Capacitor CLI - cap init

通过提供应用名称、应用ID及现有Web应用的可选web目录，初始化Capacitor配置。

```bash
npx cap init <appName> <appID>
```

<strong>输入参数:</strong>

- `appName` (必填): 应用程序名称
- `appID` (必填): 应用程序ID，格式如 `com.example.appname`

<strong>选项:</strong>

- `--web-dir <value>`: 用于初始化的现有Web应用程序目录