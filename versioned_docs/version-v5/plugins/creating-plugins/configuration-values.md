---
title: Configuration Values
description: 电容插件配置项
contributors:
  - eric-horodyski
sidebar_label: 配置项
slug: /plugins/configuration-values
---

# 插件配置项

开发插件时，您可以提供运行时影响插件行为的可配置参数。例如`@capacitor/splash-screen`插件提供的`launchShowDuration`参数，用于控制启动画面显示时长。

电容插件的配置项需在配置文件的`plugins`属性中进行设置。

## 定义配置参数

电容插件可以访问配置文件中`plugins`属性下对应插件名称下的配置值。

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

如上例所示，MyCoolPlugin的原生实现可以获取到`style`和`iconColor`的配置值。

电容配置文件支持TypeScript。虽然非必须，但建议为插件配置参数提供类型定义和文档说明。

您可以通过扩展`@capacitor/cli`提供的`PluginsConfig`接口来添加类型定义。

```typescript
/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    MyCoolPlugin?: {
      /**
       * 当应用不支持明暗主题切换时，覆盖炫酷主题样式
       *
       * @since 1.0.0
       * @example "light"
       */
      style?: 'dark' | 'light';

      /**
       * 炫酷图标的十六进制颜色值，格式为#RRGGBB或#RRGGBBAA
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

建议将此类型定义放在插件的`definitions.ts`文件中。使用者如需获取类型提示，需满足：
1. 使用TypeScript编写配置文件
2. 在`capacitor.config.ts`中添加类型引用：

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

电容API提供`getConfig()`工具方法，用于在原生代码中获取插件配置。

iOS实现：

```swift
if let style = getConfig().getString("style") {
  // 设置样式
}
```

Android实现：

```Java
String style = getConfig().getString("style");
if(style) {
  // 设置样式
}
```

注意事项：
- 不能强制使用者提供配置参数
- 使用者可能传入无效数据（特别是使用JSON配置时）

作为插件开发者，您需要：
1. 完善配置参数的文档说明
2. 妥善处理未提供配置或配置无效的情况