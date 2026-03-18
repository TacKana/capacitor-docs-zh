---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

此命令首先会运行 [`sync`](/cli/commands/sync.md)，然后将原生应用程序构建并部署到您选择的目标设备上。

```bash
npx cap run [options] <platform>
```

<strong>输入参数：</strong>

- `platform`（必需）：`android`，`ios`

<strong>选项：</strong>

- `--flavor <flavorName>`：设置 Android 项目的构建变体（暂不支持 flavor 维度）
- `--list`：打印指定平台可用的目标设备列表
- `--no-sync`：不运行 sync 命令
- `--scheme <schemeName>`：设置 iOS 项目的 scheme
- `--configuration <name>`：iOS Scheme 的配置名称
- `--target <id>`：在指定的目标设备上运行
- `--live-reload`：通过 CLI 设置实时重载 URL（使用默认值，会覆盖 `server.url` 配置）
- `-l`：`--live-reload` 的简写形式
- `--host <host>`：为实时重载 URL 配置主机地址（与 `--live-reload` 一起使用）
- `--port <port>`：为实时重载 URL 配置端口（与 `--live-reload` 一起使用）
- `--https`：在实时重载 URL 中使用 https:// 替代 http://（与 `--live-reload` 一起使用）
- `--forwardPorts <port1:port2>`：自动执行 "adb reverse" 命令以获得更好的实时重载支持