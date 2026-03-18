---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

此命令会先执行 [`sync`](/cli/commands/sync.md) 操作，然后将原生应用构建并部署到您选择的目标设备上。

```bash
npx cap run [options] <platform>
```

<strong>输入参数：</strong>

- `platform` (必需)：`android`、`ios`

<strong>选项：</strong>

- `--flavor <flavorName>`：设置 Android 项目的构建变体（flavor）
- `--list`：打印指定平台可用的目标设备列表
- `--no-sync`：不执行 sync 命令
- `--scheme <schemeName>`：设置 iOS 项目的方案（scheme）
- `--target <id>`：在指定的目标设备上运行