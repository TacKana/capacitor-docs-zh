---
title: CLI 命令 - cap update
description: Capacitor - cap update
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/update
---

# Capacitor CLI - cap update

更新 `package.json` 中引用的原生插件和依赖项。

```bash
npx cap update
```

<strong>参数:</strong>

- `platform` (可选): `android`, `ios`

<strong>选项:</strong>

- `--deployment`: 不会删除 Podfile.lock，并且 pod install 将使用 `--deployment` 选项。