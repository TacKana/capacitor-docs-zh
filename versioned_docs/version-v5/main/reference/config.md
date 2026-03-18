---
title: Capacitor 配置
description: Capacitor 配置指南
sidebar_label: 配置
slug: /config
---

# Capacitor 配置

Capacitor 配置文件用于设置 Capacitor 工具链的高级选项。

## 示例

以下是一个 `capacitor.config.ts` 文件的示例：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.company.appname',
  appName: 'My Capacitor App',
  webDir: 'www',
};

export default config;
```

如果你的项目不使用 TypeScript，可以按照相同方式使用 `capacitor.config.json` 文件。## 配置架构

以下是 Capacitor 配置的 TypeScript 接口，包含完整描述和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 打包应用的唯一标识符。
   *
   * 在 iOS 中称为 Bundle ID，在 Android 中称为 Application ID。
   * 必须使用反向域名表示法，通常代表您或公司拥有的域名。
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的用户友好名称。
   *
   * 这应该是您在应用商店中看到的名称，但生成后可以在各个原生平台内修改。
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 已编译 Web 资源的目录。
   *
   * 此目录应包含应用的最终 `index.html` 文件。
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * 是否复制 Capacitor 运行时包。
   *
   * 如果您的应用未使用打包工具，请将此设置为 `true`，然后 Capacitor
   * 将创建一个 `capacitor.js` 文件，您需要将其作为脚本添加到
   * 您的 `index.html` 文件中。
   *
   * 已弃用，将在 Capacitor 6 中移除
   *
   * @since 1.0.0
   * @deprecated 5.0.0
   * @default false
   */
  bundledWebRuntime?: boolean;

  /**
   * 构建配置（由原生应用定义），在此配置下 Capacitor
   * 将向日志系统发送语句。这适用于原生代码中的日志语句
   * 以及从 JavaScript 重定向的语句（`console.debug`、
   * `console.error` 等）。启用日志记录将允许语句在
   * Xcode 和 Android Studio 窗口中显示，但如果发布版本中启用
   * 可能会泄露设备信息。
   *
   * 'none' = 从不生成日志
   * 'debug' = 在调试版本中生成日志，但不在生产版本中生成
   * 'production' = 始终生成日志
   *
   * @since 3.0.0
   * @default debug
   */
  loggingBehavior?: 'none' | 'debug' | 'production';

  /**
   * Capacitor Web View 的用户代理。
   *
   * @since 1.4.0
   */
  overrideUserAgent?: string;

  /**
   * 附加到 Capacitor Web View 原始用户代理的字符串。
   *
   * 如果使用了 `overrideUserAgent`，则此设置将被忽略。
   *
   * @since 1.4.0
   */
  appendUserAgent?: string;

  /**
   * Capacitor Web View 的背景颜色。
   *
   * @since 1.1.0
   */
  backgroundColor?: string;

  android?: {
    /**
     * 指定原生 Android 项目的自定义路径。
     *
     * @since 3.0.0
     * @default android
     */
    path?: string;

    /**
     * Android 上 Capacitor Web View 的用户代理。
     *
     * 覆盖全局 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 附加到 Android 上 Capacitor Web View 原始用户代理的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则此设置将被忽略。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * Android 上 Capacitor Web View 的背景颜色。
     *
     * 覆盖全局 `backgroundColor` 选项。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 在 Android 的 Capacitor Web View 中启用混合内容。
   *
     * 出于安全考虑，默认禁用[混合内容](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)。
     * 在开发过程中，您可能需要启用它以允许 Web View 从不同的协议加载文件。
     *
     * **此功能不适用于生产环境。**
     *
     * @since 1.0.0
     * @default false
     */
    allowMixedContent?: boolean;

    /**
     * 启用一个更简单的键盘，但可能有一些限制。
     *
     * 这将使用替代的[`InputConnection`](https://developer.android.com/reference/android/view/inputmethod/InputConnection)
     * 来捕获 JS 按键。
     *
     * @since 1.0.0
     * @default false
     */
    captureInput?: boolean;

    /**
     * 始终启用可调试的 Web 内容。
     *
     * 在开发过程中会自动启用此功能。
     *
     * @since 1.0.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * Android 上 Capacitor 生成日志的构建配置。
     *
     * 覆盖全局 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 在 Android 上执行 `npx cap sync` 时要包含的插件白名单。
     *
     * 覆盖全局 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 要使用的 Android 风味。
     *
     * 如果应用在 `build.gradle` 中声明了风味，
     * 请配置您希望使用 `npx cap run` 命令运行的风味。
     *
     * @since 3.1.0
     */
    flavor?: string;

    /**
     * 是否给予 webview 初始焦点。
     *
     * @since 3.5.1
     * @default true
     */
    initialFocus?: boolean;

    /**
     * 您的应用支持的 Android 上 WebView 最低版本。
     *
     * 最低支持的版本不能低于 `55`，这是 Capacitor 的要求。
     *
     * 如果设备使用更低版本的 WebView，将在 Logcat 中显示错误信息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可以
     * 用于显示自定义错误。
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

    /**
     * 您的应用支持的 Android 上华为 WebView 最低版本。
     *
     * 最低支持的版本不能低于 `10`，这是 Capacitor 的要求。
     *
     * 如果设备使用更低版本的 WebView，将在 Logcat 中显示错误信息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可以
     * 用于显示自定义错误。
     *
     * @since 4.6.4
     * @default 10
     */
    minHuaweiWebViewVersion?: number;

    buildOptions?: {
      /**
       * 密钥库的路径
       *
       * @since 4.4.0
       */
      keystorePath?: string;

      /**
       * 密钥库的密码
       *
       * @since 4.4.0
       */
      keystorePassword?: string;

      /**
       * 要使用的密钥库中的别名
       *
       * @since 4.4.0
       */
      keystoreAlias?: string;

      /**
       * 要使用的密钥库中别名的密码
       *
       * @since 4.4.0
       */
      keystoreAliasPassword?: string;

      /**
       * 发布版本的打包类型
       *
       * @since 4.4.0
       * @default "AAB"
       */
      releaseType?: 'AAB' | 'APK';

      /**
       * 用于签名构建的程序
       *
       * @since 5.1.0
       * @default "jarsigner"
       */
      signingType?: 'apksigner' | 'jarsigner';
    };

    /**
     * 使用旧的 [addJavascriptInterface](https://developer.android.com/reference/android/webkit/WebView#addJavascriptInterface(java.lang.Object,%20java.lang.String))
     * 而不是新的更安全的 [addWebMessageListener](https://developer.android.com/reference/androidx/webkit/WebViewCompat#addWebMessageListener(android.webkit.WebView,java.lang.String,java.util.Set%3Cjava.lang.String%3E,androidx.webkit.WebViewCompat.WebMessageListener))
     *
     * @since 4.5.0
     * @default false
     */
    useLegacyBridge?: boolean;
  };
```ios?: {
    /**
     * 指定原生 iOS 项目的自定义路径。
     *
     * @since 3.0.0
     * @default ios
     */
    path?: string;

    /**
     * 要使用的 iOS 构建方案。
     *
     * 通常这与 Xcode 中应用的 target 匹配。可以使用以下命令列出方案：
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
     * iOS 上 Capacitor Web View 的用户代理（User Agent）。
     *
     * 覆盖全局 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 附加到 iOS Capacitor Web View 原始用户代理的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则此选项将被忽略。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * iOS 上 Capacitor Web View 的背景颜色。
     *
     * 覆盖全局 `backgroundColor` 选项。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 配置滚动视图的内容插入调整行为。
     *
     * 这将设置 Web View 的 `UIScrollView` 上的 `contentInsetAdjustmentBehavior` 属性。
     *
     * @since 2.0.0
     * @default never
     */
    contentInset?: 'automatic' | 'scrollableAxes' | 'never' | 'always';

    /**
     * 配置滚动视图是否可滚动。
     *
     * 这将设置 Web View 的 `UIScrollView` 上的 `isScrollEnabled` 属性。
     *
     * @since 1.0.0
     */
    scrollEnabled?: boolean;

    /**
     * 为编译 Cordova 插件配置自定义链接器标志（linker flags）。
     *
     * @since 1.0.0
     * @default []
     */
    cordovaLinkerFlags?: string[];

    /**
     * 允许按下链接时显示目标预览。
     *
     * 这将设置 Web View 上的 `allowsLinkPreview` 属性，而不是使用默认值。
     *
     * @since 2.0.0
     */
    allowsLinkPreview?: boolean;

    /**
     * Capacitor 在 iOS 上生成日志时所使用的构建配置。
     *
     * 覆盖全局 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 在 iOS 上执行 `npx cap sync` 时要包含的插件白名单。
     *
     * 覆盖全局 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 为 WKWebView 配置 limitsNavigationsToAppBoundDomains 属性。
     *
     * 如果 Info.plist 文件中包含 `WKAppBoundDomains` 键，建议将此选项设置为 true，否则某些功能将无法正常工作。
     * 但副作用是，它会阻止导航到 `WKAppBoundDomains` 列表之外的域。
     * `localhost`（或配置为 `server.hostname` 的值）也需要添加到 `WKAppBoundDomains` 列表中。
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;

    /**
     * Web 视图在加载和呈现 Web 内容时使用的内容模式。
     *
     * - 'recommended'：适用于当前设备的内容模式。
     * - 'desktop'：代表桌面体验的内容模式。
     * - 'mobile'：代表移动体验的内容模式。
     *
     * @since 4.0.0
     * @default recommended
     */
    preferredContentMode?: 'recommended' | 'desktop' | 'mobile';

    /**
     * 配置 Capacitor 是否处理本地/推送通知。
     * 如果你想使用自己的 UNUserNotificationCenter 来处理通知，请设置为 false。
     *
     * @since 4.5.0
     * @default true
     */
    handleApplicationNotifications?: boolean;

    /**
     * 在 Xcode 14.3 及以上版本中，对于 iOS 16.4 及以上版本，为发布版本启用可调试的 Web 内容。
     *
     * 如果未设置，则开发版本默认为 `true`。
     *
     * @since 4.8.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;
  };

  server?: {
    /**
     * 配置设备的本地主机名。
     *
     * 建议保持为 `localhost`，因为它允许使用需要安全上下文的 Web API，例如 `navigator.geolocation` 和 `MediaDevices.getUserMedia`。
     *
     * @since 1.0.0
     * @default localhost
     */
    hostname?: string;

    /**
     * 配置 iOS 上的本地方案（scheme）。
     *
     * 不能设置为 WKWebView 已处理的方案，如 http 或 https。
     * 这在使用 `cordova-plugin-ionic-webview` 迁移时很有用，因为在 iOS 上默认方案是 `ionic`。
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;

    /**
     * 配置 Android 上的本地方案（scheme）。
     *
     * 从 Webview 117 开始，Android 上的自定义方案无法更改 URL 路径。将此值从 `http` 或 `https` 更改为其他值可能导致应用程序无法解析路由。
     * 如果出于某些原因必须更改此值，请考虑使用基于哈希（hash-based）的 URL 策略，但不能保证这将长期有效，因为允许非标准方案修改查询参数和 URL 片段仅出于兼容性考虑。
     *
     * @since 1.2.0
     * @default http
     */
    androidScheme?: string;

    /**
     * 在 Web View 中加载外部 URL。
     *
     * 此选项旨在与实时重载服务器一起使用。
     *
     * **不适用于生产环境。**
     *
     * @since 1.0.0
     */
    url?: string;

    /**
     * 允许 Web View 中的明文流量。
     *
     * 在 Android 上，从 API 28 开始，默认禁用所有明文流量。
     *
     * 此选项旨在与实时重载服务器一起使用，这些服务器通常使用未加密的 HTTP 流量。
     *
     * **不适用于生产环境。**
     *
     * @since 1.5.0
     * @default false
     */
    cleartext?: boolean;

    /**
     * 设置 Web View 可以导航到的其他 URL。
     *
     * 默认情况下，所有外部 URL 都在外部浏览器（而非 Web View）中打开。
     *
     * **不适用于生产环境。**
     *
     * @since 1.0.0
     * @default []
     */
    allowNavigation?: string[];

    /**
     * 指定发生错误时显示的本地 HTML 页面路径。
     * 在 Android 上，HTML 文件将无法访问 Capacitor 插件。
     *
     * @since 4.0.0
     * @default null
     */
    errorPath?: string;
  };cordova?: {
    /**
     * 在 config.xml 中填充 <access> 标签，将其 origin 属性设置为此处输入的值。
     * 如果未提供，则包含一个 <access origin="*" /> 标签。
     * 仅对少数遵循白名单规则的 Cordova 插件有效。
     *
     * @since 3.3.0
     */
    accessOrigins?: string[];

    /**
     * 配置 Cordova 偏好设置。
     *
     * @since 1.3.0
     */
    preferences?: { [key: string]: string | undefined };

    /**
     * 需要设置为静态但不在静态插件列表中的 Cordova 插件列表。
     *
     * @since 3.3.0
     */
    staticPlugins?: string[];
  };

  /**
   * 配置插件。
   *
   * 这是一个对象，其配置值由插件类名指定。
   *
   * @since 1.0.0
   */
  plugins?: PluginsConfig;

  /**
   * 在运行 `npx cap sync` 时要包含的插件白名单。
   *
   * 这应该是一个字符串数组，表示运行 `npx cap sync` 时要包含的插件的 npm 包名。如果未设置，Capacitor 将检查 `package.json` 以获取潜在的插件列表。
   *
   * @since 3.0.0
   */
  includePlugins?: string[];
}

export interface FederatedApp {
  name: string;
  webDir: string;
  liveUpdateConfig?: LiveUpdateConfig;
}

export interface LiveUpdateConfig {
  appId: string;
  channel: string;
  autoUpdateMethod: AutoUpdateMethod;
  maxVersions?: number;
  key?: string;
}

export type AutoUpdateMethod = 'none' | 'background';

export interface PluginsConfig {
  /**
   * 按类名配置插件。
   *
   * @since 1.0.0
   */
  [key: string]:
    | {
        [key: string]: any;
      }
    | undefined;

  /**
   * FederatedCapacitor 插件配置
   *
   * @since 5.0.0
   */
  FederatedCapacitor?: {
    shell: Omit<FederatedApp, 'webDir'>;
    apps: FederatedApp[];
    liveUpdatesKey?: string;
  };

  /**
   * Capacitor Live Updates 插件配置
   *
   * @since 4.2.0
   */
  LiveUpdates?: LiveUpdateConfig;

  /**
   * Capacitor Cookies 插件配置
   *
   * @since 4.3.0
   */
  CapacitorCookies?: {
    /**
     * 启用 CapacitorCookies 以在原生平台上覆写全局的 `document.cookie`。
     *
     * @default false
     */
    enabled?: boolean;
    /**
     * 允许在 Android 上读取和访问 `httpOnly` 及其他不安全的 Cookie。
     *
     * 注意：这可能存在潜在的安全风险，仅当您的应用在 Android 上使用自定义 scheme 时才应使用此选项。
     *
     */
    androidCustomSchemeAllowInsecureAccess?: boolean;
  };

  /**
   * Capacitor Http 插件配置
   *
   * @since 4.3.0
   */
  CapacitorHttp?: {
    /**
     * 启用 CapacitorHttp 以在原生平台上覆写全局的 `fetch` 和 `XMLHttpRequest`。
     *
     * @default false
     */
    enabled?: boolean;
  };
}
```## 环境变量

Capacitor CLI 会自动查找您系统上的依赖项。如需配置这些路径，可使用以下环境变量：

- `CAPACITOR_ANDROID_STUDIO_PATH`: 您系统上 Android Studio 可执行文件的路径。
- `CAPACITOR_COCOAPODS_PATH`: 您系统上 `pod` 二进制文件的路径。