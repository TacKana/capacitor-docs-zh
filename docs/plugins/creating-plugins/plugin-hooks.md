---
title: Plugin Hooks
description: Capacitor 插件钩子
sidebar_label: Plugin Hooks
slug: /plugins/plugin-hooks
---

# Capacitor 插件钩子

从 Capacitor 6.1 开始，插件中可以使用以下事件来挂钩到（hook into）Capacitor 命令：

- `capacitor:copy:before`
- `capacitor:copy:after`
- `capacitor:update:before`
- `capacitor:update:after`
- `capacitor:sync:before`
- `capacitor:sync:after`

要使用它们，请在你插件的 `package.json` 的 `scripts` 部分添加事件名称以及你想要运行的代码。

下面是一个示例，它仅回显命令以及执行命令的平台：

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

:::note
Capacitor 插件钩子也可以在 Cordova 插件中添加和使用
:::