---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

此命令首先运行 [`sync`](/cli/commands/sync.md)，然后构建原生应用并将其部署到你选择的目标设备上。

要启用无线 iOS 设备的运行，请按照[此处](/main/ios/index.md#无线-ios-设备)的详细说明操作。

```bash
npx cap run [options] <platform>
```

<strong>输入参数：</strong>

- `platform`（必需）：`android`、`ios`

<strong>选项：</strong>

- `--flavor <flavorName>`：设置 Android 项目的 flavor（暂不支持 flavor dimensions）
- `--list`：打印指定平台可用的目标设备列表
- `--no-sync`：不运行 sync 命令
- `--scheme <schemeName>`：设置 iOS 项目的 scheme
- `--configuration <name>`：iOS Scheme 的配置名称
- `--target <id>`：在指定的目标设备上运行
- `--target-name <name>`：按名称在指定的目标设备上运行（例如："iPhone 17 Pro"、"John's iPhone"）
- `--target-name-sdk-version <version>`：在使用 `--target-name` 时，按名称在具有特定 SDK 版本的目标设备上运行（例如 iOS 26 使用 "26.0"，Android API 35 使用 "35"）。适用于名称相同但操作系统/SDK 版本不同的目标设备
- `--live-reload`：通过 CLI 设置 live-reload URL（使用默认值，覆盖 `server.url` 配置）
- `-l`：`--live-reload` 的简写形式
- `--host <host>`：配置 live-reload URL 的主机地址（与 `--live-reload` 一起使用）
- `--port <port>`：配置 live-reload URL 的端口号（与 `--live-reload` 一起使用）
- `--https`：live-reload URL 使用 https:// 代替 http://（与 `--live-reload` 一起使用）
- `--forwardPorts <port1:port2>`：自动运行 "adb reverse" 以获得更好的 live-reload 支持
