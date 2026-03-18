---
title: Configuration Values
description: Capacitor 插件配置值
contributors:
  - eric-horodyski
sidebar_label: 配置值
slug: /plugins/configuration-values
---

# 配置值

开发插件时，您可以提供一些配置值，供开发者设置，这些值会影响插件在运行时的行为。插件配置值的一个例子是 `launchShowDuration`，它通过 `@capacitor/splash-screen` 插件提供，用于设置启动画面在隐藏前显示的时长。

Capacitor 插件的配置值在 Capacitor 配置文件的 `plugins` 属性中设置。

## 定义配置值

Capacitor 插件可以访问在 Capacitor 配置文件 `plugins` 属性下、以插件名称定义的配置值。

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

在上面的示例中，MyCoolPlugin 插件的原生实现可以访问配置的 `style` 和 `iconColor` 值。

Capacitor 配置文件支持 TypeScript。虽然不是必需的，但建议您提供类型信息来定义和记录插件可用的配置值。

您可以通过扩展 `@capacitor/cli` 提供的 `PluginsConfig` 接口来为插件的配置值提供类型定义。

```typescript
/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    MyCoolPlugin?: {
      /**
       * 如果您的应用不支持明暗主题切换，可在此处覆盖酷炫主题样式。
       *
       * @since 1.0.0
       * @example "light"
       */
      style?: 'dark' | 'light';

      /**
       * 酷炫图标颜色，使用十六进制格式，#RRGGBB 或 #RRGGBBAA。
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

我们建议将此类型定义放在插件的 `definitions.ts` 文件中。为了让插件的使用者能够访问此类型信息，他们必须在 Capacitor 配置文件中使用 TypeScript，并需要在 `capacitor.config.ts` 中添加对插件类型的引用：

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

Capacitor API 包含一些实用方法，用于从插件的原生实现中访问插件配置值。

对于 iOS，使用 `getConfigValue()` 方法：

```swift
if let style = getConfigValue("style") as? String {
  // 设置样式
}
```

对于 Android，使用 `getConfig()` 方法：

```Java
String style = getConfig().getString("style");
if(style) {
  // 设置样式
}
```

请注意，您不能强制插件使用者提供配置值，并且插件使用者可能会传递无效数据（特别是当他们使用基于 JSON 的 Capacitor 配置时）。

作为插件开发者，您有责任为插件的配置值提供充分的文档说明，并在插件使用者未提供配置值或提供无效输入时，优雅地回退到默认行为。