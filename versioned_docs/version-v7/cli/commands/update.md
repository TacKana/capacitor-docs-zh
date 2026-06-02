---
title: CLI 命令 - cap update
description: Capacitor - cap update
contributors:
  - dotNetkow
sidebar_label: update
translated: true
---

# Capacitor CLI - cap update

更新 `package.json` 中引用的原生插件和依赖。

```bash
npx cap update [<platform>]
```

<strong>输入参数：</strong>

- `platform`（可选）：`android`、`ios`

<strong>选项：</strong>

- `--deployment`：不删除 Podfile.lock，且 pod install 将使用 `--deployment` 选项。

## 钩子（Hooks）

update 命令支持以下钩子：

- `capacitor:update:before`
- `capacitor:update:after`

[更多信息](../hooks)
