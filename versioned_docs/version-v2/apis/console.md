---
title: Console
description: 控制台 API
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

控制台 API 会自动将 `console.debug`、`console.error`、`console.info`、`console.log`、`console.trace` 和 `console.warn` 调用转发到各平台的原生日志系统。这意味着，例如 `console.log` 的输出会显示在 Xcode 和 Android Studio 的日志窗口中。

如需禁用此功能，可在 `capacitor.config.json` 中设置 `hideLogs` 配置项，详情请参阅[通用配置](/basics/configuring-your-app.md#common-configuration)。

## 示例

```typescript
console.log("我真的很喜欢牛油果吐司，而且我不羞于承认这一点");
```

该字符串会出现在 Xcode 或 Android Studio 的日志流中。