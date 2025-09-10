---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

该命令首先执行 [`sync`](/cli/commands/sync.md) 操作，然后将原生应用构建并部署到您选择的目标设备上。

```bash
npx cap run [options] <platform>
```

<strong>输入参数:</strong>

- `platform` (必填): `android`, `ios`

<strong>选项:</strong>

- `--list`: 列出指定平台下可用的目标设备
- `--target <id>`: 在特定的目标设备上运行