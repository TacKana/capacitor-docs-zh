---
title: Telemetry
description: Capacitor CLI 遥测
contributors:
  - eric-horodyski
---

Capacitor 会收集关于通用使用情况的匿名遥测数据。这是一个默认加入的项目，旨在为 Capacitor 团队提供洞察，以帮助改进产品。通过提供使用数据，您将帮助提供有价值的见解，这些见解可能会塑造产品的未来。

当 Capacitor CLI 成功执行完第一条命令后，您将自动加入该项目。您可以随时选择退出，届时除非您重新选择加入，否则将不会收集遥测数据。

> **注意：** 遥测功能不会在非交互式环境中运行，例如 CI 服务器，确保在这些场景中不会收集任何数据。

## 为什么收集数据？

匿名使用数据使团队能够深入了解 Capacitor 的使用方式。通过这些信息，我们可以更好地确定修复和功能的优先级。它还使团队能够更好地理解开发者体验。

## 收集哪些数据？

使用数据完全是匿名的，仅包含以下内容：

* 时间戳
* 命令名称、参数和选定的标志
* 命令执行时长
* 错误消息（如果命令失败，不包含堆栈跟踪）
* Capacitor 机器 ID（匿名、生成的 ID）
* 项目 ID（匿名、生成的 ID）
* 您的操作系统（Mac、Linux、Windows）
* 以下版本信息：NodeJS、Capacitor CLI、核心库、官方平台和插件

## 如何选择加入或退出

您可以在项目根目录中运行 `npx cap telemetry off` 来随时退出该项目：

```bash
npx cap telemetry off
```

您可以通过在项目根目录中运行以下命令来检查状态：

```bash
npx cap telemetry
```

如果您想重新加入该项目并在您的项目上提供遥测数据，请运行以下命令：

```bash
npx cap telemetry on
```