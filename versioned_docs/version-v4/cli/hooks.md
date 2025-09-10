---
title: CLI Hooks
description: Capacitor CLI 钩子
contributors:
  - jcesarmobile
---

# Capacitor CLI 钩子

从 Capacitor 3.1 版本开始，可以使用以下事件来钩入 Capacitor 命令：

- `capacitor:copy:before`
- `capacitor:copy:after`
- `capacitor:update:before`
- `capacitor:update:after`
- `capacitor:sync:before`
- `capacitor:sync:after`

要使用这些钩子，只需在应用程序的 `package.json` 文件的 scripts 部分添加对应事件名称及要运行的代码。

以下示例会在命令执行前后输出提示信息及所在平台名称：

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