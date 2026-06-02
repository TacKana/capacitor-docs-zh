---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
translated: true
---

# Capacitor CLI - cap run

此命令首先执行 [`sync`](/cli/commands/sync.md)，然后构建原生应用并将其部署到你选择的目标设备。

```bash
npx cap run [options] <platform>
```

<strong>输入参数：</strong>

- `platform`（必填）：`android`、`ios`

<strong>选项：</strong>

- `--flavor <flavorName>`：设置 Android 项目的构建变种（暂不支持变种维度）
- `--list`：列出指定平台可用的目标设备
- `--no-sync`：不执行 sync 命令
- `--scheme <schemeName>`：设置 iOS 项目的 scheme
- `--configuration <name>`：iOS Scheme 的配置名称
- `--target <id>`：在指定的目标设备上运行
- `--live-reload`：通过 CLI 设置热重载 URL（使用默认值，覆盖 `server.url` 配置）
- `-l`：`--live-reload` 的简写
- `--host <host>`：配置热重载 URL 的主机（与 `--live-reload` 配合使用）
- `--port <port>`：配置热重载 URL 的端口（与 `--live-reload` 配合使用）
- `--https`：热重载 URL 使用 https:// 而非 http://（与 `--live-reload` 配合使用）
- `--forwardPorts <port1:port2>`：自动运行 "adb reverse" 以获得更好的热重载支持

