---
title: CLI Command - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

此命令首先执行 [`sync`](/cli/commands/sync.md)，然后构建并将原生应用部署到您选择的目标设备。

如需在无线 iOS 设备上运行，请遵循[此文档](/main/ios/index.md#wireless-ios-devices)中的详细说明。

```bash
npx cap run [options] <platform>
```

<strong>输入参数：</strong>

- `platform` (必填): `android`, `ios`

<strong>选项：</strong>

- `--flavor <flavorName>`: 设置 Android 项目的构建变体（暂不支持 flavor dimensions）
- `--list`: 打印指定平台可用的目标设备列表
- `--no-sync`: 不执行 sync 命令
- `--scheme <schemeName>`: 设置 iOS 项目的 scheme
- `--configuration <name>`: iOS Scheme 的配置名称
- `--target <id>`: 在指定的目标设备上运行
- `--target-name <name>`: 通过设备名称在指定目标设备上运行（例如："iPhone 17 Pro", "John's iPhone"）
- `--target-name-sdk-version <version>`: 配合 `--target-name` 使用时，通过设备名称和指定 SDK 版本来选择目标设备（例如：iOS 26 用 "26.0"，Android API 35 用 "35"）。当存在同名但操作系统/SDK 版本不同的设备时非常有用
- `--live-reload`: 通过 CLI 设置实时重载 URL（使用默认值，会覆盖 `server.url` 配置）
- `-l`: `--live-reload` 的简写形式
- `--host <host>`: 配置实时重载 URL 的主机地址（与 `--live-reload` 配合使用）
- `--port <port>`: 配置实时重载 URL 的端口号（与 `--live-reload` 配合使用）
- `--https`: 在实时重载 URL 中使用 https:// 而不是 http://（与 `--live-reload` 配合使用）
- `--forwardPorts <port1:port2>`: 自动运行 "adb reverse" 以获得更好的实时重载支持