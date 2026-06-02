---
title: 遥测
description: Capacitor CLI 遥测
contributors:
  - eric-horodyski
---

Capacitor 会收集关于一般使用情况的匿名遥测数据。这是一个可选退出的计划，旨在为 Capacitor 团队提供洞察，以帮助改进产品。通过提供使用数据，您可以提供宝贵的见解，帮助塑造产品的未来。

在 Capacitor CLI 成功完成其第一个命令后，您将自动加入。您可以随时选择退出，届时将不再收集遥测数据，除非您重新选择加入。

> **注意：** 遥测不会在非交互式环境（如 CI 服务器）中运行，从而确保在这些场景中不会收集任何数据。

## 为什么？

匿名使用数据使团队能够了解 Capacitor 的使用方式。借助这些信息，我们可以更好地优先处理修复和功能开发。同时，它也帮助团队更好地理解开发者体验。

## 收集哪些数据？

使用数据完全匿名，仅包含以下内容：

* 时间戳
* 命令名称、参数和所选标志
* 命令执行时长
* 错误消息（如果命令失败，不包含堆栈跟踪）
* Capacitor 机器 ID（匿名生成的 ID）
* 项目 ID（匿名生成的 ID）
* 您的操作系统（Mac、Linux、Windows）
* 以下组件的版本：NodeJS、Capacitor CLI、核心库以及官方平台和插件

## 如何选择加入或退出

您可以通过在项目根目录运行 `npx cap telemetry off` 随时退出该计划：

```bash
npx cap telemetry off
```

您可以通过在项目根目录运行以下命令来检查状态：

```bash
npx cap telemetry
```

如果您希望重新加入该计划并为您的项目提供遥测数据，请运行以下命令：

```bash
npx cap telemetry on
```
