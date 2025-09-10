---
title: CLI Command - cap update
description: Capacitor - cap update 命令
contributors:
  - dotNetkow
sidebar_label: update
---

# Capacitor CLI - cap update

更新 `package.json` 中引用的原生插件和依赖项。

```bash
npx cap update [<platform>]
```

<strong>参数：</strong>

- `platform` (可选): `android`, `ios`

<strong>选项：</strong>

- `--deployment`: 保留 Podfile.lock 文件，并使用 `--deployment` 参数执行 pod install 命令。

## 钩子函数

update 命令支持以下钩子：

- `capacitor:update:before`
- `capacitor:update:after`

[了解更多](../hooks)