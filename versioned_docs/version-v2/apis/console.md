---
title: 控制台
description: 控制台 API
contributors:
  - mlynch
  - jcesarmobile
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Console API 自动将 `console.debug`、`console.error`、`console.info`、`console.log`、`console.trace` 和 `console.warn` 调用发送到每个平台的原生日志系统。这使得例如 `console.log` 调用可以在 Xcode 和 Android Studio 的日志窗口中显示。

可以通过在 `capacitor.config.json` 中使用 `hideLogs` 配置项来禁用它，查看[通用配置](/basics/configuring-your-app.md#通用配置)了解更多信息。

## 示例

```typescript
console.log("我非常喜欢牛油果吐司，而且我不羞于承认这一点");
```

该字符串将显示在您的 Xcode 或 Android Studio 日志流中。
