---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

此命令首先运行 [`sync`](/cli/commands/sync.md)，然后构建并部署原生应用到您选择的目标设备。

```bash
npx cap run [options] <platform>
```

<strong>输入参数：</strong>

- `platform`（必填）：`android`、`ios`

<strong>选项：</strong>

- `--flavor <flavorName>`：设置 Android 项目的构建风味（尚不支持风味维度）
- `--list`：打印指定平台可用的目标设备列表
- `--no-sync`：不运行 sync 命令
- `--scheme <schemeName>`：设置 iOS 项目的 scheme
- `--configuration <name>`：iOS Scheme 的配置名称
- `--target <id>`：在特定的目标设备上运行
- `--live-reload`：启用 Live Reload（实时重载）
- `-l`：`--live-reload` 的简写
- `--host <host>`：从指定的主机加载 Web 视图以进行 Live Reload
- `--port <port>`：从指定的端口加载 Web 视图以进行 Live Reload
- `--forwardPorts <port1:port2>`：自动运行 "adb reverse" 以获得更好的实时重载支持
