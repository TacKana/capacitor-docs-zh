---
title: Configuration Values
description: Capacitor 插件配置参数
contributors:
  - eric-horodyski
sidebar_label: 配置参数
slug: /plugins/configuration-values
---

# 配置参数

开发插件时，您可以提供运行时影响插件行为的可配置参数。例如 `@capacitor/splash-screen` 插件中的 `launchShowDuration` 参数，就是用来控制启动画面显示时长的典型配置。

Capacitor 插件的配置参数需要在项目配置文件中的 `plugins` 属性下进行设置。

## 定义配置参数

Capacitor 插件可以访问配置文件中 `plugins` 属性下以插件名命名的配置项。

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

在上例中，MyCoolPlugin 插件的原生实现就能获取到 `style` 和 `iconColor` 这两个配置值。

Capacitor 配置文件支持 TypeScript 类型。虽然非强制要求，但我们建议为插件可用的配置参数提供类型定义和文档说明。

您可以通过扩展 `@capacitor/cli` 提供的 `PluginsConfig` 接口来为插件配置添加类型支持：

```typescript
/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    MyCoolPlugin?: {
      /**
       * 当应用不支持亮/暗主题切换时，覆盖默认的主题样式
       *
       * @since 1.0.0
       * @example "light"
       */
      style?: 'dark' | 'light';

      /**
       * 图标颜色（十六进制格式），支持 #RRGGBB 或 #RRGGBBAA
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

建议将这些类型定义放在插件的 `definitions.ts` 文件中。要使插件使用者能获取这些类型信息，需要满足两个条件：
1. 他们的 Capacitor 配置文件需要使用 TypeScript
2. 需要在 `capacitor.config.ts` 中添加对插件类型的引用：

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

## 获取配置参数

Capacitor API 提供了从插件原生实现中访问配置参数的实用方法。

iOS 平台使用 `getConfigValue()` 方法：

```swift
if let style = getConfigValue("style") as? String {
  // 设置主题样式
}
```

Android 平台使用 `getConfig()` 方法：

```Java
String style = getConfig().getString("style");
if(style) {
  // 设置主题样式
}
```

请注意：
- 您不能强制插件使用者必须提供配置参数
- 使用者可能会传入无效数据（特别是使用基于 JSON 的 Capacitor 配置时）

作为插件开发者，您需要：
1. 为插件配置参数提供完善的文档说明
2. 当使用者未提供配置或提供无效输入时，实现优雅的降级处理