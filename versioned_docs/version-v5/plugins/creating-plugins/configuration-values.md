---
title: 配置值
description: Capacitor 插件配置值
contributors:
  - eric-horodyski
sidebar_label: 配置值
slug: /plugins/configuration-values
---

# 配置值

在开发插件时，您可以提供开发者可以设置的配置值，这些值会影响插件在运行时的行为。插件配置值的一个例子是 `launchShowDuration`，通过 `@capacitor/splash-screen` 插件提供，用于设置启动画面在隐藏前显示的时间。

Capacitor 插件配置值作为 Capacitor 配置文件中 `plugins` 属性的一部分进行设置。

## 定义配置值

Capacitor 插件可以访问在 Capacitor 配置文件中 `plugins` 属性下以插件名称定义的配置值。

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

在上面的示例中，MyCoolPlugin 插件的原生实现可以访问 `style` 和 `iconColor` 的配置值。

Capacitor 配置文件支持 TypeScript。虽然不是必需的，但建议提供类型信息来定义和记录您插件可用的配置值。

您可以通过扩展 `@capacitor/cli` 提供的 `PluginsConfig` 接口来为插件的配置值提供类型信息。

```typescript
/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    MyCoolPlugin?: {
      /**
       * 如果您的应用不支持浅色/深色主题切换，覆盖酷炫主题样式。
       *
       * @since 1.0.0
       * @example "light"
       */
      style?: 'dark' | 'light';

      /**
       * 酷炫图标的颜色，十六进制格式 #RRGGBB 或 #RRGGBBAA。
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

我们建议将此类型定义放在插件的 `definitions.ts` 文件中。为了让插件使用者访问此类型信息，他们必须为其 Capacitor 配置文件使用 TypeScript，并且需要在 `capacitor.config.ts` 中添加对插件类型的引用：

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

Capacitor API 包含 `getConfig()` 工具方法，用于从插件的原生实现中访问插件配置值。

对于 iOS：

```swift
if let style = getConfig().getString("style") {
  // 设置样式
}
```

对于 Android：

```Java
String style = getConfig().getString("style");
if(style) {
  // 设置样式
}
```

请注意，您不能强制插件使用者提供配置值，并且插件使用者可能传递无效数据（特别是当他们使用基于 JSON 的 Capacitor 配置时）。

作为插件开发者，您有责任为插件的配置值提供充分的文档，并在插件使用者未提供配置值或提供无效输入时优雅地回退。
