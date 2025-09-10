---
title: CLI 命令 - cap copy
description: Capacitor CLI 命令 - cap copy
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/copy
---

# Capacitor CLI - cap copy

将 web 应用构建文件和 Capacitor 配置文件复制到原生平台项目中。每当您修改 web 应用或更改 `capacitor.config.json` 中的配置值时，都需要运行此命令。

```bash
npx cap copy [platform]
```

<strong>输入参数：</strong>

- `platform` (可选): `android`, `ios`

<strong>示例输出：</strong>

```
√ 将 web 资源从 www 复制到 android\app\src\main\assets\public 耗时 2.64s
√ 将 web 资源从 www 复制到 ios/App/public 耗时 450ms  
√ 复制原生桥接层耗时 7.32ms
√ 复制 capacitor.config.json 耗时 3.22ms
√ 复制完成，总耗时 2.74s
√ 复制完成，总耗时 1.10ms
```