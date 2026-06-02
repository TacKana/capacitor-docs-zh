---
title: CLI 命令 - cap update
description: Capacitor - cap update
contributors:
  - dotNetkow
sidebar_label: update
---

# Capacitor CLI - cap update

更新 `package.json` 中引用的原生插件和依赖项。

```bash
npx cap update [<platform>]
```

<strong>输入：</strong>

- `platform`（可选）：`android`，`ios`

<strong>选项：</strong>

- `--deployment`：Podfile.lock 不会被删除，pod install 将使用 `--deployment` 选项。

## 钩子

以下钩子可用于 update 命令：

- `capacitor:update:before`
- `capacitor:update:after`

[更多信息](../hooks)
