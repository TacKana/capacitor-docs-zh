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

如果你的项目不使用 TypeScript，你可以以相同的方式使用 `capacitor.config.json` 文件。## 配置模式

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
   * 这应该是应用商店中显示的名称，但在生成后可以在各原生平台中修改。
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 编译后的 Web 资源目录。
   *
   * 此目录应包含应用的最终 `index.html` 文件。
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * 控制 Capacitor 向日志系统发送语句的构建配置（由原生应用定义）。
   * 这适用于原生代码中的日志语句以及从 JavaScript 重定向的语句
   * （`console.debug`、`console.error` 等）。
   * 启用日志记录将允许语句在 Xcode 和 Android Studio 窗口中显示，
   * 但如果在发布版本中启用可能会泄露设备信息。
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
   * 如果使用了 `overrideUserAgent`，此选项将被忽略。
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
   * 是否在 Capacitor Web View 中启用缩放功能。
   *
   * @default false
   * @since 6.0.0
   */
  zoomEnabled?: boolean;

  /**
   * 是否在初始时让 WebView 获得焦点。
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
     * 如果使用了 `overrideUserAgent`，此选项将被忽略。
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
     * 是否在 Android 的 Capacitor Web View 中启用缩放功能。
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 是否在 Android 的 Capacitor Web View 中启用混合内容。
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
     * 启用可能有一些限制的简单键盘。
     *
     * 这将通过替代的 [`InputConnection`](https://developer.android.com/reference/android/view/inputmethod/InputConnection) 捕获 JS 按键。
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
     * 控制 Capacitor 在 Android 上生成日志的构建配置。
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
     * 要使用的 Android 变体（flavor）。
     *
     * 如果应用在 `build.gradle` 中声明了 flavor，
     * 请配置您希望使用 `npx cap run` 命令运行的 flavor。
     *
     * @since 3.1.0
     */
    flavor?: string;

    /**
     * 是否在初始时让 webview 获得焦点。
     *
     * 覆盖全局 `initialFocus` 选项。
     *
     * @since 3.5.1
     * @default true
     */
    initialFocus?: boolean;

    /**
     * 您的应用支持的最低 Android WebView 版本。
     *
     * 最低支持版本不能低于 `55`，这是 Capacitor 要求的版本。
     *
     * 如果设备使用的 WebView 版本较低，Logcat 中将显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可用于显示自定义错误页面。
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

    /**
     * 您的应用支持的最低华为 WebView 版本。
     *
     * 最低支持版本不能低于 `10`，这是 Capacitor 要求的版本。
     *
     * 如果设备使用的 WebView 版本较低，Logcat 中将显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可用于显示自定义错误页面。
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
       * 发布构建的打包类型
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
     * 使用旧版的 [addJavascriptInterface](https://developer.android.com/reference/android/webkit/WebView#addJavascriptInterface(java.lang.Object,%20java.lang.String))
     * 而不是更新且更安全的 [addWebMessageListener](https://developer.android.com/reference/androidx/webkit/WebViewCompat#addWebMessageListener(android.webkit.WebView,java.lang.String,java.util.Set%3Cjava.lang.String%3E,androidx.webkit.WebViewCompat.WebMessageListener))
     *
     * @since 4.5.0
     * @default false
     */
    useLegacyBridge?: boolean;    /**
     * 将 Service Worker 请求通过 Capacitor 桥接器处理。
     * 设置为 false 以使用自定义处理方式。
     *
     * @since 7.0.0
     * @default true
     */
    resolveServiceWorkerRequests?: boolean;

    /**
     * 如果设置为 "force"，无论其他设置如何，都会为边缘到边缘（edge to edge）显示调整边距。
     * 如果设置为 "auto" 或未设置，将检查 Android 15 及 [windowOptOutEdgeToEdgeEnforcement](https://developer.android.com/reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement) 的设置，如果处于 Android 15 且 windowOptOutEdgeToEdgeEnforcement 为 false/未设置，则调整边距。
     * 如果设置为 "disable"，则完全不调整边距。
     * 在 Capacitor 8 中，此默认值将改为 'auto'。
     *
     * @since 7.1.0
     * @default disable
     */
    adjustMarginsForEdgeToEdge?: 'auto' | 'force' | 'disable';
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
     * 要使用的 iOS 构建方案（scheme）。
     *
     * 通常这与 Xcode 中应用的 target 相匹配。可以使用以下命令列出所有方案：
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
     * iOS 上 Capacitor Web View 的用户代理。
     *
     * 覆盖全局 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 附加到 iOS 上 Capacitor Web View 原始用户代理的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则此设置无效。
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
     * 启用 iOS 上 Capacitor Web View 内的缩放功能。
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 配置滚动视图的内容插入调整行为。
     *
     * 这将设置 Web View 的 [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview) 上的 [`contentInsetAdjustmentBehavior`](https://developer.apple.com/documentation/uikit/uiscrollview/2902261-contentinsetadjustmentbehavior) 属性。
     *
     * @since 2.0.0
     * @default never
     */
    contentInset?: 'automatic' | 'scrollableAxes' | 'never' | 'always';

    /**
     * 配置滚动视图是否可滚动。
     *
     * 这将设置 Web View 的 [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview) 上的 [`isScrollEnabled`](https://developer.apple.com/documentation/uikit/uiscrollview/1619395-isscrollenabled) 属性。
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
     * 允许在按下链接时显示目标预览。
     *
     * 这将设置 Web View 的 [`allowsLinkPreview`](https://developer.apple.com/documentation/webkit/wkwebview/1415000-allowslinkpreview) 属性，而不是使用默认值。
     *
     * @since 2.0.0
     */
    allowsLinkPreview?: boolean;

    /**
     * iOS 上 Capacitor 生成日志时所依据的构建配置。
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
     * 为 WKWebView 配置 limitsNavigationsToAppBoundDomains。
     *
     * 如果 Info.plist 文件包含 `WKAppBoundDomains` 键，建议将此选项设置为 true，否则某些功能将无法工作。
     * 但副作用是，它会阻止导航到 `WKAppBoundDomains` 列表中域之外的地方。
     * `localhost`（或配置为 `server.hostname` 的值）也需要添加到 `WKAppBoundDomains` 列表中。
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;

    /**
     * Web 视图在加载和渲染 Web 内容时使用的内容模式。
     *
     * - 'recommended': 适用于当前设备的内容模式。
     * - 'desktop': 代表桌面体验的内容模式。
     * - 'mobile': 代表移动体验的内容模式。
     *
     * @since 4.0.0
     * @default recommended
     */
    preferredContentMode?: 'recommended' | 'desktop' | 'mobile';

    /**
     * 配置 Capacitor 是否处理本地/推送通知。
     * 如果想使用自己的 UNUserNotificationCenter 来处理通知，请设置为 false。
     *
     * @since 4.5.0
     * @default true
     */
    handleApplicationNotifications?: boolean;

    /**
     * 在 Xcode 14.3 及 iOS 16.4 以上版本中，为发布版本启用可调试的 Web 内容。
     *
     * 如果未设置，对于开发构建默认为 `true`。
     *
     * @since 4.8.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * 是否给予 Web 视图初始焦点。
     *
     * 覆盖全局 `initialFocus` 选项。
     *
     * @since 7.0.0
     * @default true
     */
    initialFocus?: boolean;

    buildOptions?: {
      /**
       * 为分发构建应用时使用的签名风格。
       *
       * @since 7.1.0
       * @default 'automatic'
       */
      signingStyle?: 'automatic' | 'manual';
      /**
       * xcodebuild 导出归档文件时使用的方法。
       *
       * @since 7.1.0
       * @default 'app-store-connect'
       */
      exportMethod?: string;
      /**
       * 用于 iOS 构建签名的证书名称、SHA-1 哈希值或自动选择器。
       *
       * @since 7.1.0
       */
      signingCertificate?: string;
      /**
       * 用于 iOS 构建的配置文件名称或 UUID。
       *
       * @since 7.1.0
       */
      provisioningProfile?: string;
    };
  };

  server?: {
    /**
     * 配置设备的本地主机名。
     *
     * 建议保持为 `localhost`，因为它允许使用原本需要[安全上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)的 Web API，例如 [`navigator.geolocation`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation) 和 [`MediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)。
     *
     * @since 1.0.0
     * @default localhost
     */
    hostname?: string;    /**
     * 在 iOS 上配置本地 scheme。
     *
     * [不能设置为 WKWebView 已处理的 scheme，例如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
     * 这在从 [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview) 迁移时非常有用，因为 iOS 上的默认 scheme 是 `ionic`。
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;

    /**
     * 在 Android 上配置本地 scheme。
     *
     * 从 Webview 117 开始，Android 上的自定义 scheme 无法更改 URL 路径。将此值更改为 `http` 或 `https` 以外的任何内容可能导致您的应用程序无法解析路由。如果出于某些原因必须更改此值，请考虑使用基于哈希（hash）的 URL 策略，但不能保证这将长期有效，因为允许非标准 scheme 修改查询参数和 URL 片段仅出于兼容性考虑。
     * https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117
     *
     * @since 1.2.0
     * @default https
     */
    androidScheme?: string;

    /**
     * 在 Web View 中加载外部 URL。
     *
     * 这旨在与热重载服务器配合使用。
     *
     * **这不适用于生产环境。**
     *
     * @since 1.0.0
     */
    url?: string;

    /**
     * 允许 Web View 中的明文流量。
     *
     * 在 Android 上，从 API 28 开始默认禁用所有明文流量。
     *
     * 这旨在与通常使用未加密 HTTP 流量的热重载服务器配合使用。
     *
     * **这不适用于生产环境。**
     *
     * @since 1.5.0
     * @default false
     */
    cleartext?: boolean;

    /**
     * 设置 Web View 可以导航到的其他 URL。
     *
     * 默认情况下，所有外部 URL 都在外部浏览器中打开（而不是在 Web View 中）。
     *
     * **这不适用于生产环境。**
     *
     * @since 1.0.0
     * @default []
     */
    allowNavigation?: string[];

    /**
     * 指定错误时显示的本地 HTML 页面的路径。
     * 在 Android 上，HTML 文件将无法访问 Capacitor 插件。
     *
     * @since 4.0.0
     * @default null
     */
    errorPath?: string;

    /**
     * 向应用 URL 追加路径。
     *
     * 允许从默认的 `/index.html` 以外的路径加载。
     * @since 7.3.0
     * @default null
     */
    appStartPath?: string;
  };

  cordova?: {
    /**
     * 使用此处输入的 origin 值填充 config.xml 中的 <access> 标签。
     * 如果未提供，则会包含一个单独的 <access origin="*" /> 标签。
     * 这仅对少数几个遵循白名单的 Cordova 插件有效。
     *
     * @since 3.3.0
     */
    accessOrigins?: string[];

    /**
     * 配置 Cordova 首选项。
     *
     * @since 1.3.0
     */
    preferences?: { [key: string]: string | undefined };

    /**
     * 如果 CLI 检测到 Cordova 插件有未安装的依赖项，则在执行 cap update/sync 时失败。
     *
     * @default false
     * @since 7.4.0
     */
    failOnUninstalledPlugins?: boolean;
  };

  /**
   * 配置插件。
   *
   * 这是一个以插件类名为键的配置值对象。
   *
   * @since 1.0.0
   */
  plugins?: PluginsConfig;

  /**
   * 在运行 `npx cap sync` 时包含的插件白名单。
   *
   * 这应该是一个字符串数组，表示运行 `npx cap sync` 时要包含的插件的 npm 包名。如果未设置，Capacitor 将检查 `package.json` 以获取可能的插件列表。
   *
   * @since 3.0.0
   */
  includePlugins?: string[];
}

export interface PluginsConfig {
  /**
   * 以插件类名为键的插件配置。
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
     * 启用 CapacitorCookies 以在原生端覆盖全局的 `document.cookie`。
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
     * 启用 CapacitorHttp 以在原生端覆盖全局的 `fetch` 和 `XMLHttpRequest`。
     *
     * @default false
     */
    enabled?: boolean;
  };
}
```## 环境变量

Capacitor CLI 会自动检测您系统上的依赖项。如需手动配置这些路径，可以使用以下环境变量：

- `CAPACITOR_ANDROID_STUDIO_PATH`：您系统上 Android Studio 可执行文件的路径。
- `CAPACITOR_COCOAPODS_PATH`：您系统上 `pod` 二进制文件的路径。