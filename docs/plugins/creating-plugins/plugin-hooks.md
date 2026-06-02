---
title: 插件钩子
description: Capacitor 插件钩子
sidebar_label: 插件钩子
slug: /plugins/plugin-hooks
---

# Capacitor 插件钩子

从 Capacitor 6.1 开始，插件中可以使用以下事件来钩入 Capacitor 命令：

- `capacitor:copy:before`
- `capacitor:copy:after`
- `capacitor:update:before`
- `capacitor:update:after`
- `capacitor:sync:before`
- `capacitor:sync:after`

要使用它们，请将事件名称和你想要运行的代码添加到插件 `package.json` 的 scripts 部分。

一个仅输出了执行命令和平台的示例：

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
Capacitor 插件钩子也适用于 Cordova 插件中添加的钩子。
:::
