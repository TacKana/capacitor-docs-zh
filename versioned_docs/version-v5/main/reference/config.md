---
title: Capacitor Configuration
description: Capacitor 配置指南
sidebar_label: 配置
slug: /config
---

# Capacitor 配置

Capacitor 配置文件用于设置工具链的高级选项。

## 示例配置

这是一个典型的 `capacitor.config.ts` 文件示例：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.company.appname',
  appName: '我的 Capacitor 应用',
  webDir: 'www',
};

export default config;
```

如果项目不使用 TypeScript，可以用相同方式创建 `capacitor.config.json` 文件。

## 配置结构

以下是完整的 Capacitor 配置接口定义，包含各字段说明和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 应用打包的唯一标识符
   *
   * iOS 称为 Bundle ID，Android 称为 Application ID
   * 需使用反向域名表示法，通常代表您或公司拥有的域名
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的用户友好名称
   *
   * 这将是应用商店显示的名称，生成后可在各平台单独修改
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 编译后网页资源的目录
   *
   * 该目录应包含应用的最终版 `index.html`
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * 是否复制 Capacitor 运行时包
   *
   * 如果应用未使用打包工具，设为 `true` 后 Capacitor 
   * 会创建需手动添加到 `index.html` 的 `capacitor.js` 文件
   *
   * 该选项已弃用，将在 Capacitor 6 中移除
   *
   * @since 1.0.0
   * @deprecated 5uretic.0.0
   * @default false
   */
  bundledWebRuntime?: boolean;

  /**
   * 原生应用的日志级别配置
   *
   * 控制原生代码和 JavaScript 重定向日志(`console.debug`等)的输出
   * 开启后可在 Xcode 和 Android Studio 窗口显示日志
   * 但发布版本启用可能会泄露设备信息
   *
   * 'none' = 不输出日志
   * 'debug' = 仅调试构建输出
   * 'production' = 始终输出
   *
   * @since 3.0.0
   * @default debug
   */
  loggingBehavior?: 'none' | 'debug' | 'production';

  /**
   * WebView 的全局用户代理字符串
   *
   * @since 1.4.0
   */
  overrideUserAgent?: string;

  /**
   * 追加到原生 WebView 用户代理的字符串
   *
   * 若设置了 `overrideUserAgent` 则此配置无效
   *
   * @since 1.4.0
   */
  appendUserAgent?: string;

  /**
   * WebView 的背景色
   *
   * @since 1.1.0
   */
  backgroundColor?: string;

  android?: {
    /**
     * 自定义 Android 原生项目路径
     *
     * @since 3.0.0
     * @default android
     */
    path?: string;

    // 其余 Android 专属配置...
  };

  ios?: {
    /**
     * 自定义 iOS 原生项目路径
     *
     * @since 3.0.0
     * @default ios
     */
    path?: string;

    // 其余 iOS 专属配置...
  };

  server?: {
    /**
     * 设备本地主机名配置
     *
     * 建议保持为 `localhost` 以便使用需要安全上下文的 Web API
     * 如定位服务和媒体设备访问
     *
     * @since 1.0.0
     * @default localhost
     */
    hostname?: string;

    // 其余服务器配置...
  };

  cordova?: {
    /**
     * Cordova 访问源白名单
     *
     * 若不设置则默认包含 <access origin="*"/>
     * 仅对少数遵守白名单的 Cordova 插件有效
     *
     * @since 3.3.0
     */
    accessOrigins?: string[];

    // 其余 Cordova 配置...
  };

  /**
   * 插件专用配置
   *
   * 以插件类名为键的配置对象
   *
   * @since 1.0.0
   */
  plugins?: PluginsConfig;

  /**
   * 同步时包含的插件白名单
   *
   * 未设置时 Capacitor 会自动检测 package.json 中的插件
   *
   * @since 3.0.0
   */
  includePlugins?: string[];
}

// 其余接口定义...
```

## 环境变量

Capacitor CLI 会自动查找系统依赖项。如需手动配置路径，可使用以下环境变量：

- `CAPACITOR_ANDROID_STUDIO_PATH`: Android Studio 可执行文件路径
- `CAPACITOR_COCOAPODS_PATH`: CocoaPods 的 `pod` 二进制路径