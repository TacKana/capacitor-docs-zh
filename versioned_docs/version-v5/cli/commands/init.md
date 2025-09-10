---
title: CLI Command - cap init
description: Capacitor CLI 命令 - cap init
contributors:
  - thomasvidas
sidebar_label: init
---

# Capacitor CLI - cap init

通过提供应用名称、应用ID和现有网页应用的可选web目录路径，初始化Capacitor配置。

```bash
npx capinit <appName> <appID>
```

<strong>参数说明：</strong>

- `appName`（必填）：应用程序名称
- `appID`（必填）：应用程序ID，格式类似`com.example.appname`

<strong>可选参数：</strong>

- `--web-dir <value>`：用于初始化的现有网页应用目录路径