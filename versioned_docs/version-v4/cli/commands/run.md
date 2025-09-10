---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

此命令首先执行 [`sync`](/cli/commands/sync.md) 操作，然后将原生应用构建并部署到您选择的设备上。

```bash
npx cap run [options] <platform>
```

<strong>输入参数:</strong>

- `platform` (必填): `android`, `ios`

<strong>选项:</strong>

- `--flavor <flavorName>`: 设置 Android 项目的构建变体
- `--list`: 打印指定平台可用的目标设备列表
- `--no-sync`: 不执行同步命令
- `--scheme <schemeName>`: 设置 iOS 项目的构建方案
- `--target <id>`: 在指定的目标设备上运行