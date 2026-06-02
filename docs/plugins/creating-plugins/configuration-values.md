---
title: 配置值
description: Capacitor 插件配置值
contributors:
  - eric-horodyski
sidebar_label: 配置值
slug: /plugins/configuration-values
---

# 配置值

在开发插件时，你可以提供开发者可以设置的配置值，这些值会影响插件在运行时的行为。插件配置值的一个例子是 `launchShowDuration`，可通过 `@capacitor/splash-screen` 插件使用，它设置了启动画面在隐藏前显示的时间。

Capacitor 插件配置值作为 Capacitor 配置文件中 `plugins` 属性的一部分进行设置。

## 定义配置值

Capacitor 插件可以访问在 Capacitor 配置文件的 `plugins` 属性中，以该插件名称定义的配置值。

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

Capacitor 配置文件支持 TypeScript。虽然不是必须的，但建议为插件提供定义和记录可用配置值的类型信息。

你可以通过扩展 `@capacitor/cli` 提供的 `PluginsConfig` 接口来为插件的配置值提供类型定义。

```typescript
/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    MyCoolPlugin?: {
      /**
       * 如果你的应用不支持亮/暗主题切换，则覆盖酷炫主题样式。
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

我们建议将此类型定义放在插件的 `definitions.ts` 文件中。为了让插件的使用者能够访问此类型信息，他们必须对 Capacitor 配置文件使用 TypeScript，并且需要在 `capacitor.config.ts` 中添加对插件类型的引用：

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

请注意，你无法强制插件使用者提供配置值，并且插件使用者可能传递无效数据（特别是当他们使用基于 JSON 的 Capacitor 配置时）。

作为插件开发者，你需要为插件的配置值提供充分的文档，并在插件使用者未提供配置值或提供了无效输入时优雅地回退。
