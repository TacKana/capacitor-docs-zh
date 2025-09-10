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

<strong>输入参数：</strong>

- `platform` (可选): `android`, `ios`

<strong>选项：</strong>

- `--deployment`: 不会删除 Podfile.lock 文件，并且 pod install 会使用 `--deployment` 选项。

## 钩子函数

update 命令可使用以下钩子函数：

- `capacitor:update:before`
- `capacitor:update:after`

[了解更多](../hooks.md)