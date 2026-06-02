---
title: Capacitor 配置
description: 配置 Capacitor
sidebar_label: 配置
translated: true
slug: /config
---

# Capacitor 配置

Capacitor 配置文件用于设置 Capacitor 工具的高级选项。

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

如果你在项目中未使用 TypeScript，也可以使用 `capacitor.config.json` 文件，方式相同。

## Schema

以下是 Capacitor 配置的 TypeScript 接口，包含描述和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 打包后应用的唯一标识符。
   *
   * 在 iOS 中也被称为 Bundle ID，在 Android 中被称为 Application ID。
   * 必须使用反向域名表示法，通常代表你或你公司拥有的域名。
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的人类可读名称。
   *
   * 这应该是你在 App Store 中看到的名称，但生成后在各个原生平台内可以更改。
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 编译后的 Web 资源目录。
   *
   * 该目录应包含应用的最终 `index.html` 文件。
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * Capacitor 用于向日志系统发送语句的构建配置（由原生应用定义）。
   * 这适用于原生代码中的日志语句以及从 JavaScript 重定向的语句（`console.debug`、
   * `console.error` 等）。启用日志记录会允许语句显示在 Xcode 和 Android Studio
   * 窗口中，但如果在发布版本中启用，可能会在设备上泄漏信息。
   *
   * 'none' = 从不产生日志
   * 'debug' = 在调试构建中产生日志，但在生产构建中不产生
   * 'production' = 始终产生日志
   *
   * @since 3.0.0
   * @default debug
   */
  loggingBehavior?: 'none' | 'debug' | 'production';

  /**
   * Capacitor Web View 的 User Agent。
   *
   * @since 1.4.0
   */
  overrideUserAgent?: string;

  /**
   * 要追加到 Capacitor Web View 原始 User Agent 末尾的字符串。
   *
   * 如果使用了 `overrideUserAgent`，则此选项被忽略。
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
   * 启用 Capacitor Web View 内的缩放。
   *
   * @default false
   * @since 6.0.0
   */
  zoomEnabled?: boolean;

  /**
   * 是否让 webview 初始获得焦点。
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
     * Android 上 Capacitor Web View 的 User Agent。
     *
     * 覆盖全局 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 要追加到 Android 的 Capacitor Web View 原始 User Agent 末尾的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则此选项被忽略。
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
     * 启用 Android 上 Capacitor Web View 内的缩放。
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 启用 Android 上 Capacitor Web View 的混合内容。
     *
     * 出于安全考虑，[混合内容](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
     * 默认是禁用的。在开发过程中，你可能需要启用它以允许 Web View
     * 从不同的协议加载文件。
     *
     * **不应用于生产环境。**
     *
     * @since 1.0.0
     * @default false
     */
    allowMixedContent?: boolean;

    /**
     * 启用一个更简单的键盘，可能存在一些限制。
     *
     * 这将使用替代的
     * [`InputConnection`](https://developer.android.com/reference/android/view/inputmethod/InputConnection)
     * 捕获 JS 按键。
     *
     * @since 1.0.0
     * @default false
     */
    captureInput?: boolean;

    /**
     * 始终启用可调试的 Web 内容。
     *
     * 在开发期间会自动启用。
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
     * 在 `npx cap sync` 期间为 Android 包含的插件白名单。
     *
     * 覆盖全局 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 要使用的 Android flavor。
     *
     * 如果应用在 `build.gradle` 中声明了 flavor，
     * 请配置要使用 `npx cap run` 命令运行的 flavor。
     *
     * @since 3.1.0
     */
    flavor?: string;

    /**
     * 是否让 webview 初始获得焦点。
     *
     * 覆盖全局 `initialFocus` 选项。
     *
     * @since 3.5.1
     * @default true
     */
    initialFocus?: boolean;

    /**
     * 应用支持的 Android 最低 WebView 版本。
     *
     * 最低支持版本不能低于 Capacitor 要求的版本 `55`。
     *
     * 如果设备使用的 WebView 版本较低，Logcat 上会显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可用于显示自定义错误。
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

    /**
     * 应用支持的 Android 最低华为 WebView 版本。
     *
     * 最低支持版本不能低于 Capacitor 要求的版本 `10`。
     *
     * 如果设备使用的 WebView 版本较低，Logcat 上会显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可用于显示自定义错误。
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
       * 发布构建的包类型
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
     * 替代新的更安全的 [addWebMessageListener](https://developer.android.com/reference/androidx/webkit/WebViewCompat#addWebMessageListener(android.webkit.WebView,java.lang.String,java.util.Set%3Cjava.lang.String%3E,androidx.webkit.WebViewCompat.WebMessageListener))
     *
     * @since 4.5.0
     * @default false
     */
    useLegacyBridge?: boolean;

    /**
     * 使 service worker 请求通过 Capacitor bridge。
     * 设置为 false 以使用你自己的处理方式。
     *
     * @since 7.0.0
     * @default true
     */
    resolveServiceWorkerRequests?: boolean;

    /**
     * 如果设置为 "force"，无论其他设置如何，都将调整边距以实现全屏（edge to edge）。
     * 如果设置为 "auto" 或缺失，将检查 Android 15 和 [windowOptOutEdgeToEdgeEnforcement](https://developer.android.com/reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement) 的设置，如果在 Android 15 上且 windowOptOutEdgeToEdgeEnforcement 为 false 或缺失，将调整边距。
     * 如果设置为 "disable"，则完全不调整边距。
     * 在 Capacitor 8 中，此默认值将更改为 'auto'。
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
     * 要使用的 iOS 构建 scheme。
     *
     * 通常这与你在 Xcode 中的应用 target 匹配。你可以使用
     * 以下命令列出 schemes：
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
     * iOS 上 Capacitor Web View 的 User Agent。
     *
     * 覆盖全局 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 要追加到 iOS 的 Capacitor Web View 原始 User Agent 末尾的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则此选项被忽略。
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
     * 启用 iOS 上 Capacitor Web View 内的缩放。
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 配置 scroll view 的内容插入调整行为。
     *
     * 这将设置 Web View 的
     * [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview) 上的
     * [`contentInsetAdjustmentBehavior`](https://developer.apple.com/documentation/uikit/uiscrollview/2902261-contentinsetadjustmentbehavior)
     * 属性。
     *
     * @since 2.0.0
     * @default never
     */
    contentInset?: 'automatic' | 'scrollableAxes' | 'never' | 'always';

    /**
     * 配置 scroll view 是否可滚动。
     *
     * 这将设置 Web View 的
     * [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview) 上的
     * [`isScrollEnabled`](https://developer.apple.com/documentation/uikit/uiscrollview/1619395-isscrollenabled)
     * 属性。
     *
     * @since 1.0.0
     */
    scrollEnabled?: boolean;

    /**
     * 配置用于编译 Cordova 插件的自定义 linker flags。
     *
     * @since 1.0.0
     * @default []
     */
    cordovaLinkerFlags?: string[];

    /**
     * 允许在按下链接时显示目标预览。
     *
     * 这将设置 Web View 上的
     * [`allowsLinkPreview`](https://developer.apple.com/documentation/webkit/wkwebview/1415000-allowslinkpreview)
     * 属性，而不是使用默认值。
     *
     * @since 2.0.0
     */
    allowsLinkPreview?: boolean;

    /**
     * Capacitor 在 iOS 上生成日志的构建配置。
     *
     * 覆盖全局 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 在 `npx cap sync` 期间为 iOS 包含的插件白名单。
     *
     * 覆盖全局 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 设置 WKWebView 配置的 limitsNavigationsToAppBoundDomains。
     *
     * 如果 Info.plist 文件包含 `WKAppBoundDomains` 键，建议
     * 将此选项设置为 true，否则某些功能将无法正常工作。
     * 但副作用是，它会阻止导航到 `WKAppBoundDomains`
     * 列表之外的域名。
     * 同时需要将 `localhost`（或配置为 `server.hostname` 的值）
     * 添加到 `WKAppBoundDomains` 列表中。
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;

    /**
     * Web View 在加载和渲染 Web 内容时要使用的内容模式。
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
     * 使用 Xcode 14.3，在 iOS 16.4 及更高版本上，为发布构建启用可调试的 Web 内容。
     *
     * 如果未设置，则在开发构建中为 `true`。
     *
     * @since 4.8.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * 是否让 webview 初始获得焦点。
     *
     * 覆盖全局 `initialFocus` 选项。
     *
     * @since 7.0.0
     * @default true
     */
    initialFocus?: boolean;

    buildOptions?: {
      /**
       * 构建应用用于分发时使用的签名样式。
       *
       * @since 7.1.0
       * @default 'automatic'
       */
      signingStyle?: 'automatic' | 'manual';
      /**
       * xcodebuild 用于导出 archive 的方法。
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
     * 建议保持为 `localhost`，因为它允许使用
     * 否则需要[安全上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)
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
     * 配置 iOS 上的本地 scheme。
     *
     * [不能设置为 WKWebView 已处理的 scheme，如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
     * 这在从
     * [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)
     * 迁移时很有用，在 iOS 上默认 scheme 是 `ionic`。
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;

    /**
     * 配置 Android 上的本地 scheme。
     *
     * 自 Webview 117 起，Android 上的自定义 scheme 无法更改 URL 路径。将此值从 `http` 或 `https` 改为其他值可能导致
     * 应用无法解析路由。如果出于某些原因必须更改此值，请考虑使用基于 hash 的 URL 策略，但不能保证
     * 这能长期正常工作，因为允许非标准 scheme 修改查询参数和 URL 片段仅出于兼容性原因而允许。
     * https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117
     *
     * @since 1.2.0
     * @default https
     */
    androidScheme?: string;

    /**
     * 在 Web View 中加载外部 URL。
     *
     * 用于 live-reload 服务器。
     *
     * **不应用于生产环境。**
     *
     * @since 1.0.0
     */
    url?: string;

    /**
     * 允许 Web View 中的明文流量。
     *
     * 在 Android 上，自 API 28 起默认禁用所有明文流量。
     *
     * 用于 live-reload 服务器，其中经常使用未加密的 HTTP
     * 流量。
     *
     * **不应用于生产环境。**
     *
     * @since 1.5.0
     * @default false
     */
    cleartext?: boolean;

    /**
     * 设置 Web View 可以导航到的额外 URL。
     *
     * 默认情况下，所有外部 URL 都在外部浏览器中打开（而非
     * Web View）。
     *
     * **不应用于生产环境。**
     *
     * @since 1.0.0
     * @default []
     */
    allowNavigation?: string[];

    /**
     * 指定在出现错误时显示的本地 HTML 页面路径。
     * 在 Android 上，HTML 文件无法访问 Capacitor 插件。
     *
     * @since 4.0.0
     * @default null
     */
    errorPath?: string;

    /**
     * 在应用 URL 后追加路径。
     *
     * 允许从默认的 `/index.html` 以外的路径加载。
     * @since 7.3.0
     * @default null
     */
    appStartPath?: string;
  };

  cordova?: {
    /**
     * 在 config.xml 中填充 <access> 标签，其 origin 设置为
     * 此处输入的值。
     * 如果未提供，则会包含一个单独的 <access origin="*" /> 标签。
     * 仅对少数尊重白名单的 Cordova 插件有效。
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
     * 如果 CLI 检测到 cordova 插件存在已卸载的依赖项，
     * 则在 cap update/sync 时失败。
     *
     * @default false
     * @since 7.4.0
     */
    failOnUninstalledPlugins?: boolean;
  };

  /**
   * 配置插件。
   *
   * 这是一个包含按插件类名指定的配置值的对象。
   *
   * @since 1.0.0
   */
  plugins?: PluginsConfig;

  /**
   * 在 `npx cap sync` 期间包含的插件白名单。
   *
   * 这应该是一个字符串数组，表示在运行 `npx cap sync` 时要包含的
   * 插件的 npm 包名称。如果未设置，Capacitor 将
   * 检查 `package.json` 以获取潜在的插件列表。
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
}
```

## 环境变量

Capacitor CLI 会自动在你的系统上查找依赖项。如果你需要配置这些路径，可以使用以下环境变量：

- `CAPACITOR_ANDROID_STUDIO_PATH`: 系统上 Android Studio 可执行文件的路径。
- `CAPACITOR_COCOAPODS_PATH`: 系统上 `pod` 二进制文件的路径。
