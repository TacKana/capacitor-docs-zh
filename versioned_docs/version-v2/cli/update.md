---
title: CLI 命令 - cap update
description: Capacitor 命令行 - cap update
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/update
---

# Capacitor CLI - cap update

更新 `package.json` 中引用的原生插件和依赖项。

```bash
npx cap update
```

<strong>输入参数：</strong>

- `platform` (可选): `android`, `ios`

<strong>选项：</strong>

- `--deployment`: 不删除 Podfile.lock 文件，且 pod install 会使用 `--deployment` 选项。