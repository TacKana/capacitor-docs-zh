---
title: Console
description: Console API
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Console API 会自动将 `console.debug`、`console.error`、`console.info`、`console.log`、`console.trace` 和 `console.warn` 调用发送到各个平台的原生日志系统。例如，这使得 `console.log` 调用能够在 Xcode 和 Android Studio 的日志窗口中显示。

可以通过在 `capacitor.config.json` 中使用 `hideLogs` 配置项来禁用此功能，更多信息请参阅[通用配置](/basics/configuring-your-app.md#common-configuration)。

## 示例

```typescript
console.log("I really enjoy Avocado Toast, and I'm not ashamed to admit it");
```

该字符串将出现在你的 Xcode 或 Android Studio 日志流中。