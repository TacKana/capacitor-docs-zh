---
title: CLI Command - cap update
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

<strong>输入参数:</strong>

- `platform` (可选): `android`, `ios`

<strong>选项:</strong>

- `--deployment`: 保留 Podfile.lock 文件，并使用 `--deployment` 参数执行 pod install。

## 钩子函数

update 命令支持以下钩子函数:

- `capacitor:update:before`
- `capacitor:update:after`

[查看更多信息](../hooks)