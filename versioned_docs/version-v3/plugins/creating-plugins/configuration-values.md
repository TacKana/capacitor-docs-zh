---
title: Configuration Values
description: Capacitor 插件配置项
contributors:
  - eric-horodyski
sidebar_label: 配置项
slug: /plugins/configuration-values
---

# 插件配置项

开发插件时，您可以提供运行时影响插件行为的配置项。例如 `@capacitor/splash-screen` 插件中的 `launchShowDuration` 配置项，用于设置启动屏显示时长。

Capacitor 插件的配置项需在配置文件的 `plugins` 属性中设置。

## 定义配置项

Capacitor 插件可通过配置文件 `plugins` 属性下对应插件名称的配置项来获取配置值。

```typescript
{
  appId: 'com.company.app',
  ...
  plugins: {
    MyCoolPlugin: {
      style: "dark",
      iconColor: '#FF0000'
    }
  }
}
```

如上例所示，MyCoolPlugin 的原生实现可以获取到 `style` 和 `iconColor` 的配置值。

Capacitor 配置文件支持 TypeScript。虽然非必需，但建议为插件配置项提供类型定义和文档说明。

您可以通过扩展 `@capacitor/cli` 提供的 `PluginsConfig` 接口来为插件配置项添加类型：

```typescript
/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    MyCoolPlugin?: {
      /**
       * 当应用不支持明暗主题切换时覆盖主题样式
       *
       * @since 1.0.0
       * @example "light"
       */
      style?: 'dark' | 'light';

      /**
       * 图标颜色（十六进制格式 #RRGGBB 或 #RRGGBBAA）
       *
       * @since 1.0.0
       * @default #ffffff
       * @example "#FF9900"
       */
      iconColor?: string;
    };
  }
}
```

建议将此类型定义放在插件的 `definitions.ts` 文件中。使用者需要在 TypeScript 配置文件中引用插件类型才能获得类型提示：

```typescript
/// <reference types="@capacitor-community/my-cool-plugin" />
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.company.app",
  ...
  plugins: {
    MyCoolPlugin: {
      style: "dark",
      iconColor: "#034821"
    }
  }
}
export default config;
```

## 获取配置值

Capacitor API 提供了原生代码访问插件配置项的实用方法。

iOS 平台使用 `getConfigValue()` 方法：

```swift
if let style = getConfigValue("style") as? String {
  // 设置样式
}
```

Android 平台使用 `getConfig()` 方法：

```Java
String style = getConfig().getString("style");
if(style) {
  // 设置样式
}
```

请注意：
1. 无法强制使用者提供配置项
2. 使用者可能传入无效数据（特别是使用 JSON 配置文件时）

作为插件开发者，您需要：
- 为配置项提供完善的文档说明
- 处理使用者未提供配置或提供无效值的情况
- 实现合理的默认回退机制