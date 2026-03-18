---
title: 配置值
description: Capacitor 插件配置值
contributors:
  - eric-horodyski
sidebar_label: 配置值
slug: /plugins/configuration-values
---

# 配置值

开发插件时，您可以提供配置值，让开发者能够设置这些值来影响插件在运行时的行为。插件配置值的一个例子是 `launchShowDuration`，它通过 `@capacitor/splash-screen` 插件提供，用于设置启动画面显示多长时间后隐藏。

Capacitor 插件配置值在 Capacitor 配置文件的 `plugins` 属性中设置。

## 定义配置值

Capacitor 插件可以访问在 Capacitor 配置文件 `plugins` 属性下、以插件名称为键定义的配置值。

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

Capacitor 配置文件支持 TypeScript。虽然不是必需的，但建议为您插件的可用配置值提供类型定义和文档说明。

您可以通过扩展 `@capacitor/cli` 提供的 `PluginsConfig` 接口来为插件的配置值提供类型定义。

```typescript
/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    MyCoolPlugin?: {
      /**
       * 当您的应用不支持浅色/深色主题切换时，覆盖酷炫主题样式。
       *
       * @since 1.0.0
       * @example "light"
       */
      style?: 'dark' | 'light';

      /**
       * 酷炫图标的颜色，使用十六进制格式，#RRGGBB 或 #RRGGBBAA。
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

我们建议将此类型定义放在插件的 `definitions.ts` 文件中。为了使插件使用者能访问此类型信息，他们必须在 Capacitor 配置文件中使用 TypeScript，并在 `capacitor.config.ts` 中添加对插件类型的引用：

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

Capacitor API 包含 `getConfig()` 实用方法，用于从插件的原生实现中访问插件配置值。

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

请注意，您不能强制插件使用者提供配置值，并且插件使用者可能传递无效数据（尤其是在他们使用基于 JSON 的 Capacitor 配置时）。

作为插件开发者，您需要围绕插件的配置值提供充分的文档，并在插件使用者未提供配置值或提供无效输入时优雅地回退处理。