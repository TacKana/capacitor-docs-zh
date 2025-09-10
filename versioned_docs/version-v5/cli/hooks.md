---
title: CLI Hooks
description: Capacitor CLI 钩子
contributors:
  - jcesarmobile
---

# Capacitor CLI 钩子

从 Capacitor 3.1 开始，您可以通过以下事件钩子接入 Capacitor 命令：

- `capacitor:copy:before`（复制前）
- `capacitor:copy:after`（复制后）
- `capacitor:update:before`（更新前）
- `capacitor:update:after`（更新后）
- `capacitor:sync:before`（同步前）
- `capacitor:sync:after`（同步后）

要使用这些钩子，只需在应用的 `package.json` 文件的 scripts 部分添加对应事件名称和要执行的代码。

以下示例展示了如何在执行命令时输出当前平台名称：

```json
"scripts": {
  "capacitor:copy:before": "echo copy before $CAPACITOR_PLATFORM_NAME",
  "capacitor:copy:after": "echo copy after $CAPACITOR_PLATFORM_NAME",
  "capacitor:update:before": "echo update before $CAPACITOR_PLATFORM_NAME",
  "capacitor:update:after": "echo update after $CAPACITOR_PLATFORM_NAME",
  "capacitor:sync:before": "echo sync before $CAPACITOR_PLATFORM_NAME",
  "capacitor:sync:after": "echo sync after $CAPACITOR_PLATFORM_NAME"
}
```