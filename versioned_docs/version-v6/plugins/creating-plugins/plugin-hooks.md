---
title: 插件钩子
description: Capacitor 插件钩子功能
sidebar_label: 插件钩子
slug: /plugins/plugin-hooks
---

# Capacitor 插件钩子

自 Capacitor 6.1 版本起，插件开发者可以使用以下事件钩子来接入 Capacitor 命令生命周期：

- `capacitor:copy:before`（复制前）
- `capacitor:copy:after`（复制后）
- `capacitor:update:before`（更新前）
- `capacitor:update:after`（更新后）
- `capacitor:sync:before`（同步前）
- `capacitor:sync:after`（同步后）

使用方法：在插件的 `package.json` 文件的 scripts 部分添加对应事件名称及要执行的脚本代码。

以下示例会在命令执行时输出当前操作阶段和目标平台名称：

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

:::注意
这些 Capacitor 插件钩子同样适用于 Cordova 插件
:::