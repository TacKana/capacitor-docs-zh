---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

此命令首先执行 [`sync`](/cli/commands/sync.md) 操作，然后将原生应用构建并部署到您选择的目标设备上。

```bash
npx cap run [options] <platform>
```

<strong>输入参数：</strong>

- `platform` (必填)：`android` 或 `ios`

<strong>选项参数：</strong>

- `--flavor <flavorName>`：设置 Android 项目的风味配置（暂不支持风味维度）
- `--list`：打印指定平台可用的目标设备列表
- `--no-sync`：不执行同步命令
- `--scheme <schemeName>`：设置 iOS 项目的构建方案
- `--target <id>`：在特定目标设备上运行