---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

该命令首先运行 [`sync`](/cli/commands/sync.md)，然后构建原生应用并将其部署到你选择的目标设备。

```bash
npx cap run [options] <platform>
```

<strong>输入参数：</strong>

- `platform`（必需）：`android`、`ios`

<strong>选项：</strong>

- `--flavor <flavorName>`：设置 Android 项目的 flavor
- `--list`：打印指定平台可用的目标设备列表
- `--no-sync`：不运行 sync 命令
- `--scheme <schemeName>`：设置 iOS 项目的 scheme
- `--target <id>`：在特定目标设备上运行
