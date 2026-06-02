---
title: Capacitor 配置
description: 配置 Capacitor
sidebar_label: 配置
slug: /config
---

# Capacitor 配置

Capacitor 配置文件用于设置 Capacitor 工具的高级选项。

## 示例

以下是一个 `capacitor.config.ts` 文件示例：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.company.appname',
  appName: 'My Capacitor App',
  webDir: 'www',
};

export default config;
```

如果您在项目中不使用 TypeScript，也可以使用 `capacitor.config.json` 文件。

## Schema

以下是 Capacitor 配置的 TypeScript 接口，包含描述和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 打包应用的唯一标识符。
   *
   * 在 iOS 中也称为 Bundle ID，在 Android 中称为 Application ID。
   * 必须使用反向域名表示法，通常代表您或您的公司拥有的域名。
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的友好名称。
   *
   * 这应该是您在 App Store 中看到的名字，但生成后可以在每个原生平台内更改。
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 编译后的 Web 资产目录。
   *
   * 此目录应包含应用的最终 `index.html`。
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * 是否复制 Capacitor 运行时包。
   *
   * 如果您的应用不使用打包工具，请将其设置为 `true`，然后 Capacitor
   * 将创建一个 `capacitor.js` 文件，您需要将其作为脚本添加到
   * `index.html` 文件中。
   *
   * 此选项已弃用，将在 Capacitor 6 中移除。
   *
   * @since 1.0.0
   * @deprecated 5.0.0
   * @default false
   */
  bundledWebRuntime?: boolean;

  /**
   * Capacitor 将语句发送到日志系统的构建配置（由原生应用定义）。
   * 这适用于原生代码中的日志语句以及从 JavaScript 重定向的语句
   * （`console.debug`、`console.error` 等）。启用日志记录将使语句显示在
   * Xcode 和 Android Studio 窗口中，但如果启用了发布版本，可能会在设备上泄露信息。
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
   * Capacitor WebView 的用户代理。
   *
   * @since 1.4.0
   */
  overrideUserAgent?: string;

  /**
   * 附加到 Capacitor WebView 原始用户代理的字符串。
   *
   * 如果使用了 `overrideUserAgent`，则忽略此项。
   *
   * @since 1.4.0
   */
  appendUserAgent?: string;

  /**
   * Capacitor WebView 的背景颜色。
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
     * Android 上 Capacitor WebView 的用户代理。
     *
     * 覆盖全局 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 附加到 Android 上 Capacitor WebView 原始用户代理的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则忽略此项。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * Android 上 Capacitor WebView 的背景颜色。
     *
     * 覆盖全局 `backgroundColor` 选项。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 在 Android 上的 Capacitor WebView 中启用混合内容。
     *
     * 出于安全考虑，默认情况下禁用[混合内容]。
     * 在开发期间，您可能需要启用它以允许 WebView 从不同 scheme 加载文件。
     *
     * **不适用于生产环境。**
     *
     * @since 1.0.0
     * @default false
     */
    allowMixedContent?: boolean;

    /**
     * 启用更简单的键盘，可能有一些限制。
     *
     * 这将使用替代的
     * [`InputConnection`](https://developer.android.com/reference/android/view/inputmethod/InputConnection) 捕获 JS 按键。
     *
     * @since 1.0.0
     * @default false
     */
    captureInput?: boolean;

    /**
     * 始终启用可调试的 Web 内容。
     *
     * 在开发期间自动启用。
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
     * 在 `npx cap sync` 期间为 Android 包含的插件允许列表。
     *
     * 覆盖全局 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 要使用的 Android flavor。
     *
     * 如果在 `build.gradle` 中声明了 flavors，
     * 请配置要使用 `npx cap run` 命令运行的 flavor。
     *
     * @since 3.1.0
     */
    flavor?: string;

    /**
     * 是否让 webview 获得初始焦点。
     *
     * @since 3.5.1
     * @default true
     */
    initialFocus?: boolean;

    /**
     * 您的应用支持的 Android 最低 WebView 版本。
     *
     * 最低支持版本不能低于 `55`，这是 Capacitor 所需的最低版本。
     *
     * 如果设备使用较低的 WebView 版本，Logcat 上将显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可以
     * 用于显示自定义错误。
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

    /**
     * 您的应用支持的 Android 最低华为 WebView 版本。
     *
     * 最低支持版本不能低于 `10`，这是 Capacitor 所需的最低版本。
     *
     * 如果设备使用较低的 WebView 版本，Logcat 上将显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可以
     * 用于显示自定义错误。
     *
     * @since 4.6.4
     * @default 10
     */
    minHuaweiWebViewVersion?: number;

    buildOptions?: {
      /**
       * 您的 keystore 路径。
       *
       * @since 4.4.0
       */
      keystorePath?: string;

      /**
       * 您的 keystore 密码。
       *
       * @since 4.4.0
       */
      keystorePassword?: string;

      /**
       * 要使用的 keystore 别名。
       *
       * @since 4.4.0
       */
      keystoreAlias?: string;

      /**
       * 要使用的 keystore 别名密码。
       *
       * @since 4.4.0
       */
      keystoreAliasPassword?: string;

      /**
       * 发布构建的包类型。
       *
       * @since 4.4.0
       * @default "AAB"
       */
      releaseType?: 'AAB' | 'APK';

      /**
       * 用于签名构建的程序。
       *
       * @since 5.1.0
       * @default "jarsigner"
       */
      signingType?: 'apksigner' | 'jarsigner';
    };

    /**
     * 使用传统的 [addJavascriptInterface](https://developer.android.com/reference/android/webkit/WebView#addJavascriptInterface(java.lang.Object,%20java.lang.String))
     * 而不是新的更安全的 [addWebMessageListener](https://developer.android.com/reference/androidx/webkit/WebViewCompat#addWebMessageListener(android.webkit.WebView,java.lang.String,java.util.Set%3Cjava.lang.String%3E,androidx.webkit.WebViewCompat.WebMessageListener))
     *
     * @since 4.5.0
     * @default false
     */
    useLegacyBridge?: boolean;
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
     * 通常这与您应用的 Xcode target 名称匹配。您可以使用
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
     * iOS 上 Capacitor WebView 的用户代理。
     *
     * 覆盖全局 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 附加到 iOS 上 Capacitor WebView 原始用户代理的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则忽略此项。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * iOS 上 Capacitor WebView 的背景颜色。
     *
     * 覆盖全局 `backgroundColor` 选项。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 配置滚动视图的内容插入调整行为。
     *
     * 这将设置 WebView 的
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
     * 这将设置 WebView 的
     * [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview)
     * 上的
     * [`isScrollEnabled`](https://developer.apple.com/documentation/uikit/uiscrollview/1619395-isscrollenabled)
     * 属性。
     *
     * @since 1.0.0
     */
    scrollEnabled?: boolean;

    /**
     * 配置用于编译 Cordova 插件的自定义链接器标志。
     *
     * @since 1.0.0
     * @default []
     */
    cordovaLinkerFlags?: string[];

    /**
     * 允许在按下链接时显示目标预览。
     *
     * 这将设置 WebView 上的
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
     * 在 `npx cap sync` 期间为 iOS 包含的插件允许列表。
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
     * 将此选项设置为 true，否则某些功能将无法工作。
     * 但副作用是它会阻止导航到
     * `WKAppBoundDomains` 列表之外的域名。
     * `localhost`（或配置为 `server.hostname` 的值）也需要
     * 添加到 `WKAppBoundDomains` 列表中。
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;

    /**
     * WebView 加载和渲染 Web 内容时使用的内容模式。
     *
     * - 'recommended'：适合当前设备的内容模式。
     * - 'desktop'：代表桌面体验的内容模式。
     * - 'mobile'：代表移动体验的内容模式。
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
     * 使用 Xcode 14.3，在 iOS 16.4 及以上版本，为发布构建启用可调试的 Web 内容。
     *
     * 如果未设置，则在开发构建中默认为 `true`。
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
     * 建议保持为 `localhost`，因为它允许使用
     * 否则需要[安全上下文]的 Web API，
     * 例如
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
     * [不能设置为 WKWebView 已经处理的 scheme，如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
     * 这在从
     * [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)
     * 迁移时很有用，其中 iOS 上的默认 scheme 是 `ionic`。
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;

    /**
     * 配置 Android 上的本地 scheme。
     *
     * Android 上的自定义 scheme 无法更改 URL 路径（截至 Webview 117）。将此值更改为 `http` 或 `https` 以外的任何值
     * 可能导致应用无法解析路由。如果出于某种原因必须更改它，
     * 请考虑使用基于哈希的 URL 策略，但不能保证
     * 长期有效，因为允许非标准 scheme 修改查询参数和 URL 片段
     * 仅为兼容性原因而允许。
     * https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117
     *
     * @since 1.2.0
     * @default http
     */
    androidScheme?: string;

    /**
     * 在 WebView 中加载外部 URL。
     *
     * 用于热重载服务器。
     *
     * **不适用于生产环境。**
     *
     * @since 1.0.0
     */
    url?: string;

    /**
     * 允许 WebView 中的明文流量。
     *
     * 在 Android 上，从 API 28 开始，默认情况下禁用所有明文流量。
     *
     * 用于使用未加密 HTTP 流量的热重载服务器。
     *
     * **不适用于生产环境。**
     *
     * @since 1.5.0
     * @default false
     */
    cleartext?: boolean;

    /**
     * 设置 WebView 可以导航到的额外 URL。
     *
     * 默认情况下，所有外部 URL 都在外部浏览器中打开（而不是 WebView）。
     *
     * **不适用于生产环境。**
     *
     * @since 1.0.0
     * @default []
     */
    allowNavigation?: string[];

    /**
     * 指定在发生错误时显示的本地 HTML 页面的路径。
     * 在 Android 上，HTML 文件无法访问 Capacitor 插件。
     *
     * @since 4.0.0
     * @default null
     */
    errorPath?: string;
  };

  cordova?: {
    /**
     * 使用此处输入的值为 config.xml 中的 <access> 标签填充源。
     * 如果未提供，则包含一个 <access origin="*" /> 标签。
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
     * 需要静态但尚未在静态插件列表中的 Cordova 插件列表。
     *
     * @since 3.3.0
     */
    staticPlugins?: string[];
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
   * 在 `npx cap sync` 期间包含的插件允许列表。
   *
   * 这应该是表示在运行 `npx cap sync` 时要包含的插件的 npm 包名
   * 字符串数组。如果未设置，Capacitor 将
   * 检查 `package.json` 以获取潜在插件列表。
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
   * 按类名的插件配置。
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
     * 启用 CapacitorCookies 以覆盖原生上全局的 `document.cookie`。
     *
     * @default false
     */
    enabled?: boolean;
    /**
     * 允许在 Android 上读取和访问 `httpOnly` 和其他不安全 cookie。
     *
     * 注意：这可能存在安全风险，仅适用于您的应用在 Android 上使用自定义 scheme 的情况。
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
     * 启用 CapacitorHttp 以覆盖原生上全局的 `fetch` 和 `XMLHttpRequest`。
     *
     * @default false
     */
    enabled?: boolean;
  };
}
```

## 环境变量

Capacitor CLI 会自动在您的系统上查找依赖项。如果您需要配置这些路径，以下环境变量可用：

- `CAPACITOR_ANDROID_STUDIO_PATH`：系统上 Android Studio 可执行文件的路径。
- `CAPACITOR_COCOAPODS_PATH`：系统上 `pod` 二进制文件的路径。
