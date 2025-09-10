---
title: Telemetry
description: Capacitor CLI 遥测功能
contributors:
  - eric-horodyski
---

Capacitor 会收集关于一般使用情况的匿名遥测数据。这是一个可选择退出的计划，旨在为 Capacitor 团队提供洞察，以帮助改进产品。通过提供使用数据，您将帮助我们获得有价值的见解，这些见解可能会影响产品的未来发展。

当 Capacitor CLI 成功完成其第一个命令后，您将自动加入该计划。您随时可以选择退出，届时除非您重新选择加入，否则将不再收集遥测数据。

> **注意：** 遥测功能不会在非交互式环境（如 CI 服务器）中运行，确保在这些情况下不会收集任何数据。

## 为什么需要遥测？

匿名使用数据让团队能够深入了解 Capacitor 的使用方式。通过这些信息，我们可以更好地确定修复和功能的优先级。同时，这也有助于团队更好地理解开发者的体验。

## 收集哪些数据？

使用数据完全是匿名的，仅包括以下内容：

* 时间戳
* 命令名称、参数和选定的标志
* 命令执行时长
* 错误消息（如果命令失败，不包括堆栈跟踪）
* Capacitor 机器 ID（匿名生成的 ID）
* 项目 ID（匿名生成的 ID）
* 您的操作系统（Mac、Linux、Windows）
* 以下各项的版本：NodeJS、Capacitor CLI、核心组件以及官方平台和插件

## 如何选择加入或退出

您可以在项目的根目录下运行 `npx cap telemetry off` 随时退出该计划：

```bash
npx cap telemetry off
```

您可以通过在项目根目录下运行以下命令来检查状态：

```bash
npx cap telemetry
```

如果您想重新加入该计划并为您的项目提供遥测数据，请运行以下命令：

```bash
npx cap telemetry on
```