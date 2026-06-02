---
title: 遥测
description: Capacitor CLI 遥测
contributors:
  - eric-horodyski
---

# Capacitor 遥测

Capacitor 收集关于一般使用情况的匿名遥测数据。这是一个选择退出式的计划，为 Capacitor 团队提供洞察，以帮助改进产品。通过提供使用数据，你可以帮助提供可能塑造产品未来的宝贵见解。

在 Capacitor CLI 成功完成其第一个命令后，你将自动加入。你可以随时选择退出，届时将不会收集遥测数据，除非你重新选择加入。

> **注意：** 遥测不会在非交互式环境中运行，例如 CI 服务器，以确保在这些场景中不会收集数据。

## 为什么？

匿名使用数据使团队能够了解 Capacitor 是如何被使用的。有了这些信息，我们可以更好地优先处理修复和功能开发。它还使团队能够更好地了解开发者的体验。

## 收集哪些信息？

使用数据完全匿名，仅包含以下内容：

- 时间戳
- 命令名称、参数和所选标志
- 命令执行时长
- 错误消息（如果命令失败，不包含堆栈跟踪）
- Capacitor 机器 ID（匿名的生成 ID）
- 项目 ID（匿名的生成 ID）
- 你的操作系统（Mac、Linux、Windows）
- 以下软件的版本：NodeJS、Capacitor CLI、core 以及官方平台和插件

## 如何选择加入或退出

你可以随时在项目根目录下运行 `npx cap telemetry off` 来退出该计划：

```bash
npx cap telemetry off
```

你可以通过在项目根目录下运行以下命令来检查状态：

```bash
npx cap telemetry
```

如果你想重新加入该计划并为你的项目提供遥测数据，请运行以下命令：

```bash
npx cap telemetry on
```
