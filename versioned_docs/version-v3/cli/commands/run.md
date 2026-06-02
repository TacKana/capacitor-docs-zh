---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
translated: true
---

# Capacitor CLI - cap run

此命令首先运行 [`sync`](/cli/commands/sync.md)，然后构建原生应用并将其部署到您选择的目标设备。

```bash
npx cap run [options] <platform>
```

<strong>输入参数：</strong>

- `platform`（必填）：`android`、`ios`

<strong>选项：</strong>

- `--list`：打印给定平台可用的目标设备列表
- `--target <id>`：在特定目标设备上运行
