---
title: Configuration Values
description: 电容插件配置值
contributors:
  - eric-horodyski
sidebar_label: 配置值
slug: /plugins/configuration-values
---

# 配置值

开发插件时，您可以提供可供开发者设置的配置值，这些值会影响插件在运行时的行为。例如 `@capacitor/splash-screen` 插件提供的 `launchShowDuration` 配置值，用于设置启动画面显示多长时间后自动隐藏。

电容插件的配置值是在电容配置文件的 `plugins` 属性中设置的。

## 定义配置值

电容插件可以访问电容配置文件中 `plugins` 属性下该插件名称对应的配置值。

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

在上述示例中，MyCoolPlugin 插件的原生实现可以访问到 `style` 和 `iconColor` 的配置值。

电容配置文件支持 TypeScript。虽然不是必须的，但建议为插件可用的配置值提供类型定义和文档说明。

您可以通过扩展 `@capacitor/cli` 提供的 `PluginsConfig` 接口来为插件的配置值添加类型定义。

```typescript
/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    MyCoolPlugin?: {
      /**
       * 当应用不支持明暗主题切换时，覆盖酷炫主题样式
       *
       * @since 1.0.0
       * @example "light"
       */
      style?: 'dark' | 'light';

      /**
       * 酷炫图标的颜色，使用十六进制格式 #RRGGBB 或 #RRGGBBAA
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

建议将此类型定义放在插件的 `definitions.ts` 文件中。为了让插件使用者能访问这些类型信息，他们需要使用 TypeScript 编写电容配置文件，并在 `capacitor.config.ts` 中添加对插件类型的引用：

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

## 访问配置值

电容API提供了 `getConfig()` 工具方法，用于从插件的原生实现中访问配置值。

iOS 实现：

```swift
if let style = getConfig().getString("style") {
  // 设置样式
}
```

Android 实现：

```Java
String style = getConfig().getString("style");
if(style) {
  // 设置样式
}
```

请注意，您不能强制插件使用者提供配置值，而且插件使用者可能会传入无效数据（特别是当他们使用基于 JSON 的电容配置时）。

作为插件开发者，您需要为插件的配置值提供充分的文档说明，并在插件使用者没有提供配置值或提供了无效输入时进行优雅的回退处理。