---
title: CLI 钩子
description: Capacitor CLI 钩子
contributors:
  - jcesarmobile
---

# Capacitor CLI 钩子

从 Capacitor 3.1 开始，以下事件可用于挂钩到 Capacitor 命令：

- `capacitor:copy:before`
- `capacitor:copy:after`
- `capacitor:update:before`
- `capacitor:update:after`
- `capacitor:sync:before`
- `capacitor:sync:after`

要使用它们，请在应用的 `package.json` 的 scripts 部分添加事件名称和要运行的代码。

示例，仅 echo 命令及其运行的平台：

```json
"scripts": {
  "capacitor:copy:before": "echo copy before $CAPACITOR_PLATFORM_NAME",
  "capacitor:copy:after": "echo copy after $CAPACITOR_PLATFORM_NAME",
  "capacitor:update:before": "echo update before $CAPACITOR_PLATFORM_NAME",
  "capacitor:update:after": "echo update after $CAPACITOR_PLATFORM_NAME",
  "capacitor:sync:before": "echo sync before $CAPACITOR_PLATFORM_NAME",
  "capacitor:sync:after": "echo sync after $CAPACITOR_PLATFORM_NAME"
}
