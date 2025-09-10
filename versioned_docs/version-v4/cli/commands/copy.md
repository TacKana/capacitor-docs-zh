---
title: CLI 命令 - cap copy
description: Capacitor CLI 命令 - cap copy
contributors:
  - dotNetkow
sidebar_label: copy
---

# Capacitor CLI - cap copy

将 Web 应用构建文件和 Capacitor 配置文件复制到原生平台项目中。每次修改 Web 应用或更改配置值时都需要运行此命令。

```bash
npx cap copy [<platform>]
```

<strong>参数：</strong>

- `platform` (可选): `android`, `ios`

<strong>选项：</strong>

- `--inline`: 同步完成后，所有 JS 源映射将被内联，便于在基于 Chromium 的浏览器中调试 Android WebView。

## 钩子函数

copy 命令支持以下钩子：

- `capacitor:copy:before` (复制前)
- `capacitor:copy:after` (复制后)

[了解更多](../hooks.md)