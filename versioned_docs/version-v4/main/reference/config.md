---
title: Capacitor Configuration
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

如果您的项目不使用 TypeScript，可以同样方式使用 `capacitor.config.json` 文件。

## 配置结构

以下是 Capacitor 配置的完整 TypeScript 接口定义，包含详细说明和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 应用的唯一标识符
   *
   * 在 iOS 中称为 Bundle ID，在 Android 中称为 Application ID。
   * 必须使用反向域名表示法（reverse domain name notation），
   * 通常代表您或公司拥有的域名。
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的用户友好名称
   *
   * 这将是应用商店显示的名称，后续可在各原生平台中修改。
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 编译后 web 资源的目录
   *
   * 此目录应包含应用的最终 `index.html` 文件。
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * 是否复制 Capacitor 运行时包
   *
   * 如果您的应用未使用打包工具，请设为 `true`，
   * Capacitor 将创建需要作为脚本添加到 `index.html` 的 `capacitor.js` 文件。
   *
   * @since 1.0.0
   * @default false
   */
  bundledWebRuntime?: boolean;

  /**
   * 隐藏或显示 iOS 和 Android 的原生日志
   *
   * @since 2.1.0
   * @deprecated 3.0.0
   * @default false
   */
  hideLogs?: boolean;

  /**
   * 原生应用的日志记录行为配置
   *
   * 此设置控制 Capacitor 向日志系统发送语句的构建配置，
   * 适用于原生代码日志以及从 JavaScript 重定向的日志语句（如 `console.debug`，
   * `console.error` 等）。启用日志可让语句显示在 Xcode 和 Android Studio 窗口中，
   * 但如果在发布版本中启用可能会泄露设备信息。
   *
   * 'none' = 从不产生日志
   * 'debug' = 仅调试构建产生日志
   * 'production' = 总是产生日志
   *
   * @since 3.0.0
   * @default debug
   */
  loggingBehavior?: 'none' | 'debug' | 'production';

  /**
   * Capacitor Web View 的用户代理
   *
   * @since 1panic4.0
   */
  overrideUserAgent?: string;

  /**
   * 附加到 Capacitor Web View 原始用户代理的字符串
   *
   * 如果使用了 `overrideUserAgent`，此设置将被忽略。
   *
   * @since 1.4.0
   */
  appendUserAgent?: string;

  /**
   * Capacitor Web View 的背景色
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
     * Android 平台 Web View 的用户代理
     *
     * 覆盖全局 `overrideUserAgent` 设置。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 附加到 Android Web View 原始用户代理的字符串
     *
     * 覆盖全局 `appendUserAgent` 设置。
     * 如果使用了 `overrideUserAgent`，此设置将被忽略。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * Android Web View 的背景色
     *
     * 覆盖全局 `backgroundColor` 设置。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 在 Android Web View 中启用混合内容
     *
     * 出于安全考虑，默认禁用[混合内容](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)。
     * 开发时可能需要启用此选项以允许 Web View 加载不同协议的文件。
     *
     * **生产环境不建议使用**
     *
     * @since 1.0.0
     * @default false
     */
    allowMixedContent?: boolean;

    /**
     * 启用可能有功能限制的简化键盘
     *
     * 这将使用备选的 [`InputConnection`](https://developer.android.com/reference/android/view/inputmethod/InputConnection)
     * 来捕获 JS 按键事件。
     *
     * @since 1.0.0
     * @default false
     */
    captureInput?: boolean;

    /**
     * 始终启用 Web 内容调试
     *
     * 开发模式下会自动启用。
     *
     * @since 1.0.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * 隐藏或显示 Android 的原生日志
     *
     * 覆盖全局 `hideLogs` 设置。
     *
     * @since 2.1.0
     * @deprecated 3.0.0
     * @default false
     */
    hideLogs?: boolean;

    /**
     * Android 平台的日志记录行为配置
     *
     * 覆盖全局 `loggingBehavior` 设置。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * `npx cap sync` 时包含的 Android 插件白名单
     *
     * 覆盖全局 `includePlugins` 设置。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 使用的 Android 构建风味（flavor）
     *
     * 如果应用的 `build.gradle` 中声明了风味，
     * 可通过此配置指定 `npx cap run` 命令使用的风味。
     *
     * @since 3.1.0
     */
    flavor?: string;

    /**
     * 是否初始聚焦 WebView
     *
     * @since 3.5.1
     * @default true
     */
    initialFocus?: boolean;

    /**
     * 应用支持的 Android WebView 最低版本
     *
     * 最低版本不能低于 Capacitor 所需的 `55` 版本。
     * 如果设备使用更低版本，Logcat 将显示错误信息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，
     * 可用于显示自定义错误页面。
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

    buildOptions?: {
      /**
       * 密钥库路径
       *
       * @since 4.4.0
       */
      keystorePath?: string;

      /**
       * 密钥库密码
       *
       * @since 4.4.0
       */
      keystorePassword?: string;

      /**
       * 使用的密钥库别名
       *
       * @since 4.4.0
       */
      keystoreAlias?: string;

      /**
       * 密钥库别名的密码
       *
       * @since 4.4.0
       */
      keystoreAliasPassword?: string;

      /**
       * 发布版本打包类型
       *
       * @since 4.4.0
       * @default "AAB"
       */
      releaseType?: 'AAB' | 'APK';
    };

    /**
     * 使用传统的 [addJavascriptInterface](https://developer.android.com/reference/android/webkit/WebView#addJavascriptInterface(java.lang.Object,%20java.lang.String))
     * 而非更安全的 [addWebMessageListener](https://developer.android.com/reference/androidx/webkit/WebViewCompat#addWebMessageListener(android.webkit.WebView,java.lang.String,java.util.Set%3Cjava.lang.String%3E,androidx.webkit.WebViewCompat.WebMessageListener))
     *
     * @since 4.5.0
     * @default false
     */
    useLegacyBridge: boolean;
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
     * iOS 构建方案（scheme）
     *
     * 通常与 Xcode 中的应用目标（target）匹配。
     * 可使用以下命令列出所有方案：
     *
     * ```shell
     * xcodebuild -workspace ios/App/App.xcworkspace -list
     * ```
     *
     * @since 3.0.0
     * @default App
     */
    scheme?: string;

    /**
     * iOS 平台 Web View 的用户代理
     *
     * 覆盖全局 `overrideUserAgent` 设置。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 附加到 iOS Web View 原始用户代理的字符串
     *
     * 覆盖全局 `appendUserAgent` 设置。
     * 如果使用了 `overrideUserAgent`，此设置将被忽略。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * iOS Web View 的背景色
     *
     * 覆盖全局 `backgroundColor` 设置。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 配置滚动视图的内容内边距调整行为
     *
     * 这将设置 Web View 的 [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview)
     * 的 [`contentInsetAdjustmentBehavior`](https://developer.apple.com/documentation/uikit/uiscrollorganizationview/2902261-contentinsetadjustmentbehavior) 属性。
     *
     * @since 2.0.0
     * @default never
     */
    contentInset?: 'automatic' | 'scrollableAxes' | 'never' | 'always';

    /**
     * 配置滚动视图是否可滚动
     *
     * 这将设置 Web View 的 [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview)
     * 的 [`isScrollEnabled`](https://developer.apple.com/documentation/uikit/uiscrollview/1619395-isscrollenabled) 属性。
     *
     * @since 1.0.0
     */
    scrollEnabled?: boolean;

    /**
     * 配置 Cordova 插件编译时的链接器标志
     *
     * @since 1.0.0
     * @default []
     */
    cordovaLinkerFlags?: string[];

    /**
     * 允许长按链接时显示目标预览
     *
     * 这将设置 Web View 的 [`allowsLinkPreview`](https://developer.apple.com/documentation/webkit/wkwebview/1415000-allowslinkpreview)
     * 属性，而非使用默认值。
     *
     * @since 2.0.0
     */
    allowsLinkPreview?: boolean;

    /**
     * 隐藏或显示 iOS 的原生日志
     *
     * 覆盖全局 `hideLogs` 设置。
     *
     * @since 1.1.0
     * @deprecated 3.0.0
     * @default false
     */
    hideLogs?: boolean;

    /**
     * iOS 平台的日志记录行为配置
     *
     * 覆盖全局 `loggingBehavior` 设置。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * `npx cap sync` 时包含的 iOS 插件白名单
     *
     * 覆盖全局 `includePlugins` 设置。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 设置 WKWebView 的 limitsNavigationsToAppBoundDomains 配置
     *
     * 如果 Info.plist 文件包含 `WKAppBoundDomains` 键，
     * 建议将此选项设为 true，否则某些功能将无法工作。
     * 但副作用是会阻止导航至 `WKAppBoundDomains` 列表之外的域名。
     * `localhost`（或 `server.hostname` 配置的值）也需要添加到 `WKAppBoundDomains` 列表。
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;

    /**
     * Web View 加载和渲染内容时使用的内容模式
     *
     * - 'recommended': 适合当前设备的内容模式
     * - 'desktop': 桌面体验内容模式
     * - 'mobile': 移动体验内容模式
     *
     * @since 4.0.0
     * @default recommended
     */
    preferredContentMode?: 'recommended' | 'desktop' | 'mobile';

    /**
     * 配置 Capacitor 是否处理本地/推送通知
     * 设为 false 可使用自己的 UNUserNotificationCenter 处理通知
     *
     * @since 4.5.0
     * @default true
     */
    handleApplicationNotifications?: boolean;
  };

  server?: {
    /**
     * 配置设备的本地主机名
     *
     * 建议保持为 `localhost`，这样可以使用需要
     * [安全上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)
     * 的 Web API，例如
     * [`navigator.geolocation`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)
     * 和
     * [`MediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)。
     *
     * @since 1.0.0
     * @default localhost
     */
    hostname?: string;

    /**
     * 配置 iOS 平台的本地协议方案
     *
     * [不能设置为 WKWebView 已处理的协议，如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
     * 从 [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)
     * 迁移时很有用，iOS 上的默认协议是 `ionic`。
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
     * 主要用于实时重载服务器。
     *
     * **生产环境不建议使用**
     *
     * @since 1.0.0
     */
    url?: string;

    /**
     * 允许 Web View 中的明文传输
     *
     * 从 API 28 开始，Android 默认禁用所有明文传输。
     *
     * 主要用于使用未加密 HTTP 的实时重载服务器。
     *
     * **生产环境不建议使用**
     *
     * @since 1.5.0
     * @default false
     */
    cleartext?: boolean;

    /**
     * 设置 Web View 可导航的额外 URL
     *
     * 默认情况下，所有外部 URL 都在外部浏览器（非 Web View）中打开。
     *
     * **生产环境不建议使用**
     *
     * @since 1.0.0
     * @default []
     */
    allowNavigation?: string[];

    /**
     * 指定错误时显示的本地 HTML 页面路径
     * Android 上的 HTML 文件无法访问 Capacitor 插件
     *
     * @since 4.0.0
     * @default null
     */
    errorPath?: string;
  };

  cordova?: {
    /**
     * 在 config.xml 中填充 <access> 标签，origin 属性设置为此处输入的值。
     * 如果未提供，将包含单个 <access origin="*" /> 标签。
     * 仅对少数遵守白名单的 Cordova 插件有效。
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
     * 需要静态化但不在静态插件列表中的 Cordova 插件列表
     *
     * @since 3.3.0
     */
    staticPlugins?: string[];
  };

  /**
   * 插件配置
   *
   * 这是一个对象，键为插件类名，值为对应的配置值。
   *
   * @since 1.0.0
   */
  plugins?: PluginsConfig;

  /**
   * `npx cap sync` 时包含的插件白名单
   *
   * 应为表示插件