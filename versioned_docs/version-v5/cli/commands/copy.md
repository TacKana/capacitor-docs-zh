---
title: CLI 命令 - cap copy
description: Capacitor CLI 命令 - cap copy
contributors:
  - dotNetkow
sidebar_label: copy
---

# Capacitor CLI - cap copy

将 web 应用构建文件和 Capacitor 配置文件复制到原生平台项目中。每次修改 web 应用或更改配置值时都需要运行此命令。

```bash
npx cap copy [<platform>]
```

<strong>输入参数:</strong>

- `platform` (可选): `android`, `ios`

<strong>选项:</strong>

- `--inline`: 同步后，所有 JS 源映射将被内联，以便在基于 Chromium 的浏览器中调试 Android WebView。

## 钩子函数

copy 命令可使用以下钩子：

- `capacitor:copy:before`
- `capacitor:copy:after`

[了解更多](../hooks)