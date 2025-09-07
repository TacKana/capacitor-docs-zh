---
title: Capacitor 配置
description: Capacitor 配置指南
sidebar_label: 配置
slug: /config
---

# Capacitor 配置

Capacitor 配置文件用于设置 Capacitor 工具链的高级选项。

## 示例

以下是一个典型的 `capacitor.config.ts` 文件示例：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.company.appname',
  appName: 'My Capacitor App',
  webDir: 'www',
};

export default config;
```

如果您的项目不使用 TypeScript，可以使用相同方式的 `capacitor.config.json` 文件。

## 配置结构

以下是完整的 Capacitor 配置类型定义，包含详细说明和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 应用包的唯一标识符
   *
   * 在 iOS 中称为 Bundle ID，在 Android 中称为 Application ID
   * 必须采用反向域名表示法，通常代表您或公司拥有的域名
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的用户友好名称
   *
   * 这将是应用商店中显示的名称，生成后可在各原生平台中修改
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 编译后 web 资源的目录
   *
   * 此目录应包含应用的最终 `index.html` 文件
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * 是否复制 Capacitor 运行时包
   *
   * 如果应用未使用打包工具，请设为 `true`，Capacitor 将创建
   * `capacitor.js` 文件，您需要将其作为脚本添加到 `index.html` 中
   *
   * @since 1.0.0
   * @default false
   */
  bundledWebRuntime?: boolean;

  /**
   * 控制 Capacitor 日志输出级别的构建配置
   *
   * 此设置影响原生代码日志和从 JavaScript 重定向的日志语句
   * （如 `console.debug`、`console.error` 等）。启用日志后，
   * 语句会显示在 Xcode 和 Android Studio 窗口中，但在发布版本中
   * 启用可能会泄露设备信息
   *
   * 'none' = 不输出任何日志
   * 'debug' = 仅在调试构建中输出日志
   * 'production' = 始终输出日志
   *
   * @since 3.0.0
   * @default debug
   */
  loggingBehavior?: 'none' | 'debug' | 'production';

  /**
   * 设置 Capacitor Web View 的用户代理字符串
   *
   * @since 1.4.0
   */
  overrideUserAgent?: string;

  /**
   * 附加到 Capacitor Web View 原始用户代理后的字符串
   *
   * 如果使用了 `overrideUserAgent`，此设置将被忽略
   *
   * @since 1.4.0
   */
  appendUserAgent?: string;

  /**
   * 设置 Capacitor Web View 的背景色
   *
   * @since 1.1.0
   */
  backgroundColor?: string;

  android?: {
    /**
     * 指定原生 Android 项目的自定义路径
     *
     * @since 3.0.0
     * @default android
     */
    path?: string;

    /**
     * 设置 Android 平台 Web View 的用户代理
     *
     * 覆盖全局 `overrideUserAgent` 设置
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 附加到 Android 平台 Web View 原始用户代理后的字符串
     *
     * 覆盖全局 `appendUserAgent` 设置
     * 如果使用了 `overrideUserAgent`，此设置将被忽略
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * 设置 Android 平台 Web View 的背景色
     *
     * 覆盖全局 `backgroundColor` 设置
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 启用 Android Web View 的混合内容加载
     *
     * 出于安全考虑，默认禁止加载混合内容
     * 开发时可能需要启用此选项以允许 Web View 加载不同协议的资源
     *
     * **禁止在生产环境中使用**
     *
     * @since 1.0.0
     * @default false
     */
    allowMixedContent?: boolean;

    /**
     * 启用简化键盘输入模式（可能有功能限制）
     *
     * 使用替代的 `InputConnection` 实现来捕获 JS 按键事件
     *
     * @since 1.0.0
     * @default false
     */
    captureInput?: boolean;

    /**
     * 始终启用 Web 内容调试
     *
     * 开发环境中会自动启用此选项
     *
     * @since 1.0.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * 设置 Android 平台的日志输出级别
     *
     * 覆盖全局 `loggingBehavior` 设置
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 指定 `npx cap sync` 时要包含的插件白名单
     *
     * 覆盖全局 `includePlugins` 设置
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 指定要使用的 Android 构建变体
     *
     * 如果应用在 `build.gradle` 中声明了变体，
     * 可通过此配置指定 `npx cap run` 使用的变体
     *
     * @since 3.1.0
     */
    flavor?: string;
  };

  ios?: {
    /**
     * 指定原生 iOS 项目的自定义路径
     *
     * @since 3.0.0
     * @default ios
     */
    path?: string;

    /**
     * 指定 iOS 构建方案
     *
     * 通常与 Xcode 中的 app target 名称一致
     * 可使用以下命令列出所有方案：
     *
     * `xcodebuild -workspace ios/App/App.xcworkspace -list`
     *
     * @since 3.0.0
     * @default App
     */
    scheme?: string;

    /**
     * 设置 iOS 平台 Web View 的用户代理
     *
     * 覆盖全局 `overrideUserAgent` 设置
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 附加到 iOS 平台 Web View 原始用户代理后的字符串
     *
     * 覆盖全局 `appendUserAgent` 设置
     * 如果使用了 `overrideUserAgent`，此设置将被忽略
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * 设置 iOS 平台 Web View 的背景色
     *
     * 覆盖全局 `backgroundColor` 设置
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 配置滚动视图的内容插入调整行为
     *
     * 设置 Web View 的 `UIScrollView` 的
     * `contentInsetAdjustmentBehavior` 属性
     *
     * @since 2.0.0
     * @default never
     */
    contentInset?: 'automatic' | 'scrollableAxes' | 'never' | 'always';

    /**
     * 配置滚动视图是否可滚动
     *
     * 设置 Web View 的 `UIScrollView` 的
     * `isScrollEnabled` 属性
     *
     * @since 1.0.0
     */
    scrollEnabled?: boolean;

    /**
     * 为 Cordova 插件配置自定义链接器标志
     *
     * @since 1.0.0
     * @default []
     */
    cordovaLinkerFlags?: string[];

    /**
     * 允许在点击链接时显示目标预览
   *
   * 这会设置 Web View 的 `allowsLinkPreview` 属性
   *
   * @since 2.0.0
   */
    allowsLinkPreview?: boolean;

    /**
     * 设置 iOS 平台的日志输出级别
     *
     * 覆盖全局 `loggingBehavior` 设置
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 指定 `npx cap sync` 时要包含的插件白名单
     *
     * 覆盖全局 `includePlugins` 设置
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 设置 WKWebView 的 limitsNavigationsToAppBoundDomains 配置
     *
     * 如果 Info.plist 文件中包含 `WKAppBoundDomains` 键，
     * 建议启用此选项，否则某些功能可能无法工作
     * 但副作用是会阻止导航到 `WKAppBoundDomains` 列表之外的域名
     * 需要将 `localhost`（或 `server.hostname` 配置的值）
     * 也添加到 `WKAppBoundDomains` 列表中
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;
  };

  server?: {
    /**
     * 配置设备的本地主机名
     *
     * 建议保持为 `localhost`，这样可以继续使用需要
     * 安全上下文的 Web API，如 `navigator.geolocation`
     * 和 `MediaDevices.getUserMedia`
     *
     * @since 1.0.0
     * @default localhost
     */
    hostname?: string;

    /**
     * 配置 iOS 平台的本地协议方案
     *
     * 不能设置为 WKWebView 已处理的协议（如 http 或 https）
     * 从 `cordova-plugin-ionic-webview` 迁移时很有用，
     * 因为该插件在 iOS 上的默认方案是 `ionic`
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;

    /**
     * 配置 Android 平台的本地协议方案
     *
     * @since 1.2.0
     * @default http
     */
    androidScheme?: string;

    /**
     * 在 Web View 中加载外部 URL
     *
     * 主要用于热重载服务器
     *
     * **禁止在生产环境中使用**
     *
     * @since 1.0.0
     */
    url?: string;

    /**
     * 允许 Web View 中的明文流量
     *
     * Android API 28 开始默认禁止所有明文流量
     *
     * 主要用于热重载服务器，这些服务器通常使用未加密的 HTTP 协议
     *
     * **禁止在生产环境中使用**
     *
     * @since 1.5.0
     * @default false
     */
    cleartext?: boolean;

    /**
     * 设置 Web View 可导航到的额外 URL
     *
     * 默认情况下，所有外部 URL 都会在外部浏览器中打开
     *
     * **禁止在生产环境中使用**
     *
     * @since 1.0.0
     * @default []
     */
    allowNavigation?: string[];
  };

  cordova?: {
    /**
     * 在 config.xml 中生成 <access> 标签
     *
     * 如果未提供，将包含单个 <access origin="*" /> 标签
     * 仅对少数遵守白名单的 Cordova 插件有效
     *
     * @since 3.3.0
     */
    accessOrigins?: string[];

    /**
     * 配置 Cordova 首选项
     *
     * @since 1.3.0
     */
    preferences?: { [key: string]: string | undefined };

    /**
     * 需要设为静态但不在静态插件列表中的
     * Cordova 插件列表
     *
     * @since 3.3.0
     */
    staticPlugins?: string[];
  };

  /**
   * 配置插件选项
   *
   * 以插件类名为键的对象，包含各插件的配置值
   *
   * @since 1.0.0
   */
  plugins?: PluginsConfig;

  /**
   * 指定 `npx cap sync` 时要包含的插件白名单
   *
   * 应为一个字符串数组，表示要包含的插件的 npm 包名
   * 如果未设置，Capacitor 会检查 `package.json` 中的插件列表
   *
   * @since 3.0.0
   */
  includePlugins?: string[];
}

export interface PluginsConfig {
  /**
   * 以插件类名为键的配置对象
   *
   * @since 1.0.0
   */
  [key: string]:
    | {
        [key: string]: any;
      }
    | undefined;
}
```

## 环境变量

Capacitor CLI 会自动查找系统依赖项。如需手动配置路径，可使用以下环境变量：

- `CAPACITOR_ANDROID_STUDIO_PATH`: 指定 Android Studio 可执行文件路径
- `CAPACITOR_COCOAPODS_PATH`: 指定 `pod` 二进制文件的路径