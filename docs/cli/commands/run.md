---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run 命令

此命令首先执行 [`sync`](/cli/commands/sync.md) 操作，然后将原生应用构建并部署到您选择的目标设备上。

```bash
npx cap run [options] <platform>
```

<strong>输入参数：</strong>

- `platform`（必填）：`android` 或 `ios`

<strong>选项参数：</strong>

- `--flavor <flavorName>`：设置 Android 项目的构建风味（暂不支持风味维度）
- `--list`：打印指定平台可用的目标设备列表
- `--no-sync`：不执行同步命令
- `--scheme <schemeName>`：设置 iOS 项目的方案
- `--configuration <name>`：设置 iOS 方案的配置名称
- `--target <id>`：在特定目标设备上运行
- `--live-reload`：启用实时重载功能
- `-l`：`--live-reload` 的简写形式
- `--host <host>`：通过从指定主机加载网页视图来实现实时重载
- `--port <port>`：通过从指定端口加载网页视图来实现实时重载
- `--forwardPorts <port1:port2>`：自动执行 "adb reverse" 命令以获得更好的实时重载支持