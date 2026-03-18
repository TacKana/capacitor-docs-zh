---
title: Capacitor 配置
description: 配置 Capacitor
sidebar_label: 配置
slug: /config
---

# Capacitor 配置

Capacitor 配置文件用于为 Capacitor 工具设置高级选项。

## 示例

这是一个 `capacitor.config.ts` 文件的示例：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.company.appname',
  appName: 'My Capacitor App',
  webDir: 'www',
};

export default config;
```

如果你的项目没有使用 TypeScript，你可以用同样的方式使用 `capacitor.config.json` 文件。## 配置架构

以下是 Capacitor 配置的 TypeScript 接口定义，包含完整的描述说明和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 您打包应用的唯一标识符。
   *
   * 在 iOS 中称为 Bundle ID，在 Android 中称为 Application ID。
   * 必须使用反向域名表示法，通常代表您或您的公司拥有的域名。
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的人性化名称。
   *
   * 这通常是应用商店中显示的名称，但在生成本地平台项目后可以修改。
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
   * 构建配置（由原生应用定义），在此配置下 Capacitor 会向日志系统发送记录。
   * 这适用于原生代码中的日志语句以及从 JavaScript 重定向的语句（`console.debug`、
   * `console.error` 等）。启用日志记录可让语句显示在 Xcode 和 Android Studio 窗口中，
   * 但如果在发布版本中启用，可能会泄露设备信息。
   *
   * 'none' = 从不生成日志
   * 'debug' = 在调试版本中生成日志，但在生产版本中不生成
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
   * 如果使用了 `overrideUserAgent`，则忽略此设置。
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
   * 在 Capacitor Web View 中启用缩放功能。
   *
   * @default false
   * @since 6.0.0
   */
  zoomEnabled?: boolean;

  /**
   * 是否让 WebView 获得初始焦点。
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
     * Android 平台上 Capacitor Web View 的用户代理。
     *
     * 覆盖全局的 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 附加到 Android 平台 Capacitor Web View 原始用户代理的字符串。
     *
     * 覆盖全局的 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则忽略此设置。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * Android 平台 Capacitor Web View 的背景颜色。
     *
     * 覆盖全局的 `backgroundColor` 选项。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 在 Android 平台的 Capacitor Web View 中启用缩放功能。
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 在 Android 平台的 Capacitor Web View 中启用混合内容。
     *
     * 出于安全考虑，默认禁用[混合内容](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)。
     * 在开发过程中，您可能需要启用它以允许 Web View 从不同协议加载文件。
     *
     * **此设置不应用于生产环境。**
     *
     * @since 1.0.0
     * @default false
     */
    allowMixedContent?: boolean;

    /**
     * 启用一个可能有一些限制的简化键盘。
     *
     * 这将使用替代的
     * [`InputConnection`](https://developer.android.com/reference/android/view/inputmethod/InputConnection)
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
     * Android 平台上 Capacitor 生成日志的构建配置。
     *
     * 覆盖全局的 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 在 Android 平台执行 `npx cap sync` 时要包含的插件白名单。
     *
     * 覆盖全局的 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 要使用的 Android 构建变体（flavor）。
     *
     * 如果应用在 `build.gradle` 中声明了构建变体，
     * 配置此选项以指定使用 `npx cap run` 命令时要运行的变体。
     *
     * @since 3.1.0
     */
    flavor?: string;

    /**
     * 是否让 WebView 获得初始焦点。
     *
     * 覆盖全局的 `initialFocus` 选项。
     *
     * @since 3.5.1
     * @default true
     */
    initialFocus?: boolean;

    /**
     * 您的应用支持的 Android WebView 最低版本。
     *
     * 最低支持版本不能低于 `55`，这是 Capacitor 要求的版本。
     *
     * 如果设备使用更低的 WebView 版本，Logcat 中将显示错误信息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可以用于显示自定义错误页面。
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

    /**
     * 您的应用支持的华为 WebView 最低版本。
     *
     * 最低支持版本不能低于 `10`，这是 Capacitor 要求的版本。
     *
     * 如果设备使用更低的 WebView 版本，Logcat 中将显示错误信息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可以用于显示自定义错误页面。
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
       * 要使用的密钥库别名
       *
       * @since 4.4.0
       */
      keystoreAlias?: string;

      /**
       * 要使用的密钥库别名的密码
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
     * 使用传统的 [addJavascriptInterface](https://developer.android.com/reference/android/webkit/WebView#addJavascriptInterface(java.lang.Object,%20java.lang.String))
     * 而不是更安全的新方法 [addWebMessageListener](https://developer.android.com/reference/androidx/webkit/WebViewCompat#addWebMessageListener(android.webkit.WebView,java.lang.String,java.util.Set%3Cjava.lang.String%3E,androidx.webkit.WebViewCompat.WebMessageListener))
     *
     * @since 4.5.0
     * @default false
     */
    useLegacyBridge?: boolean;    /**
     * 使 Service Worker 请求通过 Capacitor 桥接。
     * 设置为 false 可使用自定义处理方式。
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
     * 要使用的 iOS 构建方案。
     *
     * 通常这应与 Xcode 中应用的 target 匹配。可以使用以下命令列出方案：
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
     * 附加到 iOS Capacitor Web View 原始用户代理的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，此选项将被忽略。
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
     * 上的
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
     * 上的
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
     * 为 WKWebView 设置 limitsNavigationsToAppBoundDomains 配置。
     *
     * 如果 Info.plist 文件包含 `WKAppBoundDomains` 键，建议将此选项设置为 true，否则某些功能将无法工作。
     * 但副作用是，它会阻止导航到 `WKAppBoundDomains` 列表之外的域名。
     * `localhost`（或配置为 `server.hostname` 的值）也需要添加到 `WKAppBoundDomains` 列表中。
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;

    /**
     * Web 视图在加载和渲染网页内容时使用的内容模式。
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
     * 如果要使用自己的 UNUserNotificationCenter 处理通知，请设置为 false。
     *
     * @since 4.5.0
     * @default true
     */
    handleApplicationNotifications?: boolean;

    /**
     * 在 Xcode 14.3 及更高版本中，在 iOS 16.4 及更高版本上，为发布版本启用可调试的网页内容。
     *
     * 如果未设置，对于开发构建默认为 `true`。
     *
     * @since 4.8.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * 是否给予 WebView 初始焦点。
     *
     * 覆盖全局 `initialFocus` 选项。
     *
     * @since 7.0.0
     * @default true
     */
    initialFocus?: boolean;

    buildOptions?: {
      /**
       * 为应用构建分发版本时使用的签名方式。
       *
       * @since 7.1.0
       * @default 'automatic'
       */
      signingStyle?: 'automatic' | 'manual';
      /**
       * xcodebuild 导出归档文件时使用的方法
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
       * iOS 构建的配置文件名称或 UUID。
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
     * 建议保持为 `localhost`，因为这样可以允许使用需要
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
     * 在 iOS 上配置本地 scheme。
     *
     * [不能设置为 WKWebView 已处理的 scheme，例如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
     * 从
     * [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)
     * 迁移时，这可能很有用，因为 iOS 上的默认 scheme 是 `ionic`。
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;/**
     * 在 Android 上配置本地协议方案。
     *
     * 从 Webview 117 版本开始，Android 上的自定义协议方案无法修改 URL 路径。将此值更改为 `http` 或 `https` 以外的任何内容可能导致您的应用无法解析路由。
     * 如果出于某些原因必须更改此设置，请考虑使用基于哈希的 URL 策略，但无法保证此方法能长期有效，因为允许非标准协议修改查询参数和 URL 片段仅出于兼容性考虑。
     * https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117
     *
     * @since 1.2.0
     * @default https
     */
    androidScheme?: string;

    /**
     * 在 Web View 中加载外部 URL。
     *
     * 此选项主要用于配合实时重载服务器使用。
     *
     * **请勿在生产环境中使用此选项。**
     *
     * @since 1.0.0
     */
    url?: string;

    /**
     * 允许 Web View 中的明文网络流量。
     *
     * 从 Android API 28 开始，默认禁用所有明文流量。
     *
     * 此选项主要用于配合使用未加密 HTTP 流量的实时重载服务器。
     *
     * **请勿在生产环境中使用此选项。**
     *
     * @since 1.5.0
     * @default false
     */
    cleartext?: boolean;

    /**
     * 设置 Web View 可以导航到的其他 URL。
     *
     * 默认情况下，所有外部 URL 都会在外部浏览器中打开（而非 Web View）。
     *
     * **请勿在生产环境中使用此选项。**
     *
     * @since 1.0.0
     * @default []
     */
    allowNavigation?: string[];

    /**
     * 指定错误发生时显示的本地 HTML 页面路径。
     * 在 Android 上，该 HTML 文件将无法访问 Capacitor 插件。
     *
     * @since 4.0.0
     * @default null
     */
    errorPath?: string;

    /**
     * 在应用 URL 后附加路径。
     *
     * 允许从默认 `/index.html` 以外的其他路径加载内容。
     * @since 7.3.0
     * @default null
     */
    appStartPath?: string;
  };

  cordova?: {
    /**
     * 使用此处设置的值作为 origin，填充 config.xml 中的 <access> 标签。
     * 如果未提供，则会包含单个 <access origin="*" /> 标签。
     * 仅对少数遵循白名单规则的 Cordova 插件有效。
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
     * 如果 CLI 检测到 Cordova 插件存在未安装的依赖项，则在执行 cap update/sync 时失败。
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
   * 在执行 `npx cap sync` 时包含的插件白名单。
   *
   * 这应该是一个字符串数组，表示运行 `npx cap sync` 时要包含的插件的 npm 包名。如果未设置，Capacitor 将检查 `package.json` 以获取可能的插件列表。
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
     * 启用 CapacitorCookies 以在原生平台上覆盖全局 `document.cookie`。
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
     * 启用 CapacitorHttp 以在原生平台上覆盖全局 `fetch` 和 `XMLHttpRequest`。
     *
     * @default false
     */
    enabled?: boolean;
  };

  /**
   * 系统栏插件配置
   *
   * @since 8.0.0
   */
  SystemBars?: {
    /**
     * 指定在 Android 上如何处理有问题的边距（insets）。
     *
     * 此选项仅在 Android 上受支持。
     *
     * `css` = 向 webview 中注入包含正确安全区域边距值的 CSS 变量（`--safe-area-inset-*`）。
     *
     * `disable` = 禁用所有边距处理。
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
     * 显示或隐藏状态栏时使用的动画类型。
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

Capacitor CLI 会自动在系统中查找所需的依赖项。若您需要手动配置这些路径，可以使用以下环境变量：

- `CAPACITOR_ANDROID_STUDIO_PATH`：系统中 Android Studio 可执行文件的路径。
- `CAPACITOR_COCOAPODS_PATH`：系统中 `pod` 二进制文件的路径。

