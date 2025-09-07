---
title: CLI 命令 - cap ls
description: Capacitor CLI - cap ls
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/list
---

# Capacitor CLI - cap ls

列出所有已安装的 Cordova 和 Capacitor 插件。

```bash
npx cap ls [platform]
```

<strong>输入参数：</strong>

- `platform` (可选): `android`, `ios`

<strong>示例输出：</strong>

```
发现 1 个适用于 android 的 Capacitor 插件：
    capacitor-mapbox (0.0.1)
发现 2 个适用于 android 的 Cordova 插件：
    cordova-plugin-camera
    cordova-plugin-splashscreen
```