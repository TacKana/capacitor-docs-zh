---
title: Capacitor 配置
description: 配置 Capacitor
sidebar_label: 配置
slug: /config
---

# Capacitor 配置

Capacitor 配置文件用于为 Capacitor 工具链设置高级选项。

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

如果你的项目不使用 TypeScript，你可以以同样的方式使用 `capacitor.config.json` 文件。## 架构

这是 Capacitor 配置的 TypeScript 接口，包含完整描述和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 打包应用的唯一标识符。
   *
   * 在 iOS 中也称为 Bundle ID，在 Android 中称为 Application ID。
   * 必须采用反向域名表示法，通常代表您或您公司拥有的域名。
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的用户友好名称。
   *
   * 这应该是您在应用商店中看到的名称，但在生成后可以在各原生平台内更改。
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 已编译的 Web 资源目录。
   *
   * 此目录应包含应用的最终 `index.html` 文件。
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * Capacitor 将向日志系统发送语句的构建配置（由原生应用定义）。
   * 这适用于原生代码中的日志语句以及从 JavaScript 重定向的语句（`console.debug`、
   * `console.error` 等）。启用日志记录将让语句在 Xcode 和 Android Studio 窗口中显示，
   * 但如果在发布版本中启用，可能会在设备上泄露信息。
   *
   * 'none' = 从不生成日志
   * 'debug' = 在调试构建中生成日志，但不在生产构建中生成
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
   * 如果使用了 `overrideUserAgent`，则此选项将被忽略。
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

  /**
   * 在 Capacitor Web View 内启用缩放功能。
   *
   * @default false
   * @since 6.0.0
   */
  zoomEnabled?: boolean;

  /**
   * 是否赋予 WebView 初始焦点。
   *
   * @since 7.0.0
   * @default true
   */
  initialFocus?: boolean;

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
     * 如果使用了 `overrideUserAgent`，则此选项将被忽略。
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
     * 在 Android 的 Capacitor Web View 内启用缩放功能。
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 在 Android 的 Capacitor Web View 中启用混合内容。
     *
     * 出于安全考虑，默认禁用[混合内容](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)。
     * 在开发过程中，您可能需要启用它以允许 Web View 从不同的协议加载文件。
     *
     * **此选项不适用于生产环境。**
     *
     * @since 1.0.0
     * @default false
     */
    allowMixedContent?: boolean;

    /**
     * 启用一个可能有一些限制的简易键盘。
     *
     * 这将使用替代的 [`InputConnection`](https://developer.android.com/reference/android/view/inputmethod/InputConnection)
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
     * Capacitor 在 Android 上生成日志的构建配置。
     *
     * 覆盖全局 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 在 `npx cap sync` 过程中包含的插件白名单。
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
     * 请配置您希望在 `npx cap run` 命令中使用的风味。
     *
     * @since 3.1.0
     */
    flavor?: string;

    /**
     * 是否赋予 WebView 初始焦点。
     *
     * 覆盖全局 `initialFocus` 选项。
     *
     * @since 3.5.1
     * @default true
     */
    initialFocus?: boolean;

    /**
     * 您的应用支持的 Android WebView 最低版本。
     *
     * 最低支持版本不能低于 `55`，这是 Capacitor 所需的版本。
     *
     * 如果设备使用较低的 WebView 版本，将在 Logcat 中显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可以用于显示自定义错误。
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

    /**
     * 您的应用支持的华为 WebView 最低版本。
     *
     * 最低支持版本不能低于 `10`，这是 Capacitor 所需的版本。
     *
     * 如果设备使用较低的 WebView 版本，将在 Logcat 中显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可以用于显示自定义错误。
     *
     * @since 4.6.4
     * @default 10
     */
    minHuaweiWebViewVersion?: number;

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
       * 要使用的密钥库别名
       *
       * @since 4.4.0
       */
      keystoreAlias?: string;

      /**
       * 要使用的密钥库别名密码
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
     * 使用旧版 [addJavascriptInterface](https://developer.android.com/reference/android/webkit/WebView#addJavascriptInterface(java.lang.Object,%20java.lang.String))
     * 而不是新的且更安全的 [addWebMessageListener](https://developer.android.com/reference/androidx/webkit/WebViewCompat#addWebMessageListener(android.webkit.WebView,java.lang.String,java.util.Set%3Cjava.lang.String%3E,androidx.webkit.WebViewCompat.WebMessageListener))
     *
     * @since 4.5.0
     * @default false
     */
    useLegacyBridge?: boolean;
```/**
     * 让 Service Worker 请求通过 Capacitor 桥接器处理。
     * 设为 false 可使用自定义处理方式。
     *
     * @since 7.0.0
     * @default true
     */
    resolveServiceWorkerRequests?: boolean;
  };

  ios?: {
    /**
     * 指定原生 iOS 项目的自定义路径。
     *
     * @since 3.0.0
     * @default ios
     */
    path?: string;

    /**
     * 使用的 iOS 构建方案（scheme）。
     *
     * 通常与 Xcode 中的应用目标（target）匹配。可使用以下命令列出方案：
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
     * 附加到 iOS Capacitor Web View 原始用户代理后的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，此设置将被忽略。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * iOS Capacitor Web View 的背景颜色。
     *
     * 覆盖全局 `backgroundColor` 选项。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 启用 iOS Capacitor Web View 内的缩放功能。
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 配置滚动视图的内容内嵌调整行为。
     *
     * 这将设置 Web View 的
     * [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview)
     * 的
     * [`contentInsetAdjustmentBehavior`](https://developer.apple.com/documentation/uikit/uiscrollview/2902261-contentinsetadjustmentbehavior)
     * 属性。
     *
     * @since 2.0.0
     * @default never
     */
    contentInset?: 'automatic' | 'scrollableAxes' | 'never' | 'always';

    /**
     * 配置滚动视图是否可滚动。
     *
     * 这将设置 Web View 的
     * [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview)
     * 的
     * [`isScrollEnabled`](https://developer.apple.com/documentation/uikit/uiscrollview/1619395-isscrollenabled)
     * 属性。
     *
     * @since 1.0.0
     */
    scrollEnabled?: boolean;

    /**
     * 为编译 Cordova 插件配置自定义链接器标志。
     *
     * @since 1.0.0
     * @default []
     */
    cordovaLinkerFlags?: string[];

    /**
     * 允许在按下链接时预览目标页面。
     *
     * 这将设置 Web View 的
     * [`allowsLinkPreview`](https://developer.apple.com/documentation/webkit/wkwebview/1415000-allowslinkpreview)
     * 属性，而不是使用默认值。
     *
     * @since 2.0.0
     */
    allowsLinkPreview?: boolean;

    /**
     * iOS 上 Capacitor 生成日志的构建配置。
     *
     * 覆盖全局 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 在 iOS `npx cap sync` 期间要包含的插件白名单。
     *
     * 覆盖全局 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 设置 WKWebView 的 `limitsNavigationsToAppBoundDomains` 配置。
     *
     * 如果 Info.plist 文件包含 `WKAppBoundDomains` 键，建议将此选项设为 true，
     * 否则某些功能将无法工作。
     * 但副作用是，它会阻止导航到 `WKAppBoundDomains` 列表之外的域名。
     * `localhost`（或配置为 `server.hostname` 的值）也需要添加到 `WKAppBoundDomains` 列表中。
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;

    /**
     * Web View 加载和渲染 Web 内容时使用的内容模式。
     *
     * - 'recommended': 适合当前设备的内容模式。
     * - 'desktop': 代表桌面体验的内容模式。
     * - 'mobile': 代表移动体验的内容模式。
     *
     * @since 4.0.0
     * @default recommended
     */
    preferredContentMode?: 'recommended' | 'desktop' | 'mobile';

    /**
     * 配置 Capacitor 是否处理本地/推送通知。
     * 如果要使用自己的 UNUserNotificationCenter 处理通知，请设置为 false。
     *
     * @since 4.5.0
     * @default true
     */
    handleApplicationNotifications?: boolean;

    /**
     * 使用 Xcode 14.3 时，在 iOS 16.4 及更高版本上，为发布构建启用可调试的 Web 内容。
     *
     * 如果未设置，则对于开发构建为 `true`。
     *
     * @since 4.8.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * 是否在初始化时给予 WebView 焦点。
     *
     * 覆盖全局 `initialFocus` 选项。
     *
     * @since 7.0.0
     * @default true
     */
    initialFocus?: boolean;

    buildOptions?: {
      /**
       * 为分发构建应用时使用的签名方式。
       *
       * @since 7.1.0
       * @default 'automatic'
       */
      signingStyle?: 'automatic' | 'manual';
      /**
       * xcodebuild 导出归档文件的方法。
       *
       * @since 7.1.0
       * @default 'app-store-connect'
       */
      exportMethod?: string;
      /**
       * 用于 iOS 构建签名的证书名称、SHA-1 哈希或自动选择器。
       *
       * @since 7.1.0
       */
      signingCertificate?: string;
      /**
       * iOS 构建的配置文件（provisioning profile）名称或 UUID。
       *
       * @since 7.1.0
       */
      provisioningProfile?: string;
    };
  };

  experimental?: {
    /**
     * 实验性的 iOS 专属配置。
     *
     * 这些选项可能在未来的版本中更改或移除。
     *
     * @since 8.2.0
     */
    ios?: {
      /**
       * Swift 包管理器（SPM）专属配置。
       *
       * @since 8.2.0
       */
      spm?: {
        /**
         * Package.swift 文件头中使用的 Swift 工具版本。
         *
         * 定义构建应用所需的最低 Swift 编译器版本。
         * 更多信息请查看 [Swift 文档](https://docs.swift.org/swiftpm/documentation/packagemanagerdocs/settingswifttoolsversion/)
         *
         * 警告：Capacitor 目前尚未正式支持 Swift 6。
         * 将此属性设置为 6.0 或更高版本可能导致问题。
         * 如果需要将其设置为 6.0 或更高版本，请务必全面测试你的 iOS 应用。
         *
         * 此设置可能在未来的主要版本中提升为 `ios.spm.swiftToolsVersion`。
         *
         * @since 8.3.0
         * @default '5.9'
         * @example '6.1'
         */
        swiftToolsVersion?: string;/**
 * 定义 SPM 插件依赖的包特性。
 *
 * 这需要将 experimental.ios.spm.swiftToolsVersion 显式设置为 '6.1' 或更高版本。
 *
 * 键是插件 ID（例如 `@capacitor-firebase/analytics`），值是一个特性名称数组。
 *
 * 包可以有默认特性。如果你使用此属性，并且想保留默认值，请在数组中包含 ".defaults"。
 *
 * 此设置在未来主要版本中可能会升级到 `ios.spm.packageTraits`。
 *
 * @since 8.3.0
 */
packageTraits?: { [pluginId: string]: string[] };
      };
    };
  };

  server?: {
    /**
     * 配置设备的本地主机名。
     *
     * 建议保持为 `localhost`，因为它允许使用需要[安全上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)的 Web API，例如
     * [`navigator.geolocation`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)
     * 和
     * [`MediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia).
     *
     * @since 1.0.0
     * @default localhost
     */
    hostname?: string;

    /**
     * 配置 iOS 上的本地方案。
     *
     * [不能设置为 WKWebView 已处理的方案，例如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
     * 这在从
     * [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)
     * 迁移时可能有用，因为 iOS 上的默认方案是 `ionic`。
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;

    /**
     * 配置 Android 上的本地方案。
     *
     * 从 Webview 117 开始，Android 上的自定义方案无法更改 URL 路径。将此值从 `http` 或 `https` 以外的任何值更改可能导致您的应用无法解析路由。如果您因某些原因必须更改此值，请考虑使用基于哈希的 URL 策略，但不能保证这能长期有效，因为允许非标准方案修改查询参数和 URL 片段仅是出于兼容性考虑。
     * https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117
     *
     * @since 1.2.0
     * @default https
     */
    androidScheme?: string;

    /**
     * 在 Web 视图中加载外部 URL。
     *
     * 这旨在与实时重载服务器一起使用。
     *
     * **这不适用于生产环境。**
     *
     * @since 1.0.0
     */
    url?: string;

    /**
     * 允许 Web 视图中的明文流量。
     *
     * 在 Android 上，从 API 28 开始，默认禁用所有明文流量。
     *
     * 这旨在与实时重载服务器一起使用，这些服务器通常使用未加密的 HTTP 流量。
     *
     * **这不适用于生产环境。**
     *
     * @since 1.5.0
     * @default false
     */
    cleartext?: boolean;

    /**
     * 设置 Web 视图可以导航到的额外 URL。
     *
     * 默认情况下，所有外部 URL 都在外部浏览器中打开（而不是在 Web 视图中）。
     *
     * **这不适用于生产环境。**
     *
     * @since 1.0.0
     * @default []
     */
    allowNavigation?: string[];

    /**
     * 指定错误时显示的本地 HTML 页面路径。
     * 在 Android 上，该 HTML 文件将无法访问 Capacitor 插件。
     *
     * @since 4.0.0
     * @default null
     */
    errorPath?: string;

    /**
     * 为应用 URL 附加一个路径。
     *
     * 允许从默认 `/index.html` 以外的其他路径加载。
     * @since 7.3.0
     * @default null
     */
    appStartPath?: string;
  };

  cordova?: {
    /**
     * 使用此处输入的值作为 origin 来填充 config.xml 中的 <access> 标签。
     * 如果未提供，则会包含一个单独的 <access origin="*" /> 标签。
     * 它仅对少数遵守白名单的 Cordova 插件生效。
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
     * 如果 CLI 检测到 Cordova 插件有未安装的依赖项，则在 cap update/sync 时失败。
     *
     * @default false
     * @since 7.4.0
     */
    failOnUninstalledPlugins?: boolean;
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
   * 在 `npx cap sync` 期间要包含的插件白名单。
   *
   * 这应该是一个字符串数组，表示运行 `npx cap sync` 时要包含的插件的 npm 包名称。如果未设置，Capacitor 将检查 `package.json` 以获取可能的插件列表。
   *
   * @since 3.0.0
   */
  includePlugins?: string[];
}

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
   * Capacitor Cookies 插件配置
   *
   * @since 4.3.0
   */
  CapacitorCookies?: {
    /**
     * 启用 CapacitorCookies 以在原生平台上覆盖全局的 `document.cookie`。
     *
     * @default false
     */
    enabled?: boolean;
  };

  /**
   * Capacitor Http 插件配置
   *
   * @since 4.3.0
   */
  CapacitorHttp?: {
    /**
     * 启用 CapacitorHttp 以在原生平台上覆盖全局的 `fetch` 和 `XMLHttpRequest`。
     *
     * @default false
     */
    enabled?: boolean;
  };

  /**
   * System Bars 插件配置
   *
   * @since 8.0.0
   */
  SystemBars?: {
    /**
     * 指定在 Android 上如何处理有问题的安全区域。
     *
     * 此选项仅在 Android 上受支持。
     *
     * `css` = 将包含正确安全区域值的 CSS 变量（`--safe-area-inset-*`）注入到 webview 中。
     *
     * `disable` = 禁用 CSS 变量注入。
     *
     * @default "css"
     */
    insetsHandling?: 'css' | 'disable';
    /**
     * 系统栏文本和图标的样式。
     *
     * 此选项仅在 Android 上受支持。
     *
     * @default `DEFAULT`
     */
    style?: string;

    /**
     * 启动时隐藏系统栏。
     *
     * @default false
     */
    hidden?: boolean;

    /**
     * 显示或隐藏时使用的状态栏动画类型。
     *
     * 此选项仅在 iOS 上受支持。
     *
     * @default 'FADE'
     *
     */
    animation?: 'FADE' | 'NONE';
  };
}
```## 环境变量

Capacitor CLI 会自动在您的系统中查找依赖项。如需自定义这些路径，可以使用以下环境变量：

- `CAPACITOR_ANDROID_STUDIO_PATH`：系统中 Android Studio 可执行文件的路径。
- `CAPACITOR_COCOAPODS_PATH`：系统中 `pod` 二进制文件的路径。