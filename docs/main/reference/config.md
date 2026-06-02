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

如果您在项目中不使用 TypeScript，可以同样使用 `capacitor.config.json` 文件。

## Schema

以下是 Capacitor 配置的 TypeScript 接口，包含描述和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 打包应用的唯一标识符。
   *
   * 在 iOS 中也被称为 Bundle ID，在 Android 中被称为 Application ID。
   * 必须使用反向域名表示法，通常代表您或您公司拥有的域名。
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的人类可读名称。
   *
   * 这应该是您在 App Store 中看到的名称，但生成后可以在
   * 各个原生平台内进行更改。
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 编译后的 web 资源目录。
   *
   * 该目录应包含应用的最终 `index.html` 文件。
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * Capacitor 将日志语句发送到日志系统时所依据的构建配置（由原生应用定义）。
   * 这适用于原生代码中的日志语句以及从 JavaScript 重定向的语句（`console.debug`、
   * `console.error` 等）。启用日志记录将让语句显示在 Xcode 和 Android Studio 窗口中，
   * 但在发布版本中启用可能会在设备上泄露信息。
   *
   * 'none' = 从不产生日志
   * 'debug' = 在调试版本中产生日志，但在生产版本中不产生
   * 'production' = 始终产生日志
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
   * 要追加到 Capacitor Web View 原始用户代理后的字符串。
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

  /**
   * 启用 Capacitor Web View 内的缩放功能。
   *
   * @default false
   * @since 6.0.0
   */
  zoomEnabled?: boolean;

  /**
   * 是否让 webview 获得初始焦点。
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
     * 覆盖全局的 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 要追加到 Android 上 Capacitor Web View 原始用户代理后的字符串。
     *
     * 覆盖全局的 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则此设置将被忽略。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * Android 上 Capacitor Web View 的背景颜色。
     *
     * 覆盖全局的 `backgroundColor` 选项。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 启用 Android 上 Capacitor Web View 内的缩放功能。
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 在 Android 上启用 Capacitor Web View 中的混合内容。
     *
     * [混合内容](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
     * 默认情况下出于安全考虑是禁用的。在开发期间，您可能需要启用它以允许
     * Web View 从不同协议加载文件。
     *
     * **不适用于生产环境。**
     *
     * @since 1.0.0
     * @default false
     */
    allowMixedContent?: boolean;

    /**
     * 启用一个更简单的键盘，可能会有一些限制。
     *
     * 这将使用另一种
     * [`InputConnection`](https://developer.android.com/reference/android/view/inputmethod/InputConnection)
     * 来捕获 JS 按键。
     *
     * @since 1.0.0
     * @default false
     */
    captureInput?: boolean;

    /**
     * 始终启用可调试的 web 内容。
     *
     * 在开发期间会自动启用。
     *
     * @since 1.0.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * Capacitor 在 Android 上生成日志时所依据的构建配置。
     *
     * 覆盖全局的 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 在 `npx cap sync` 期间为 Android 包含的插件的许可名单。
     *
     * 覆盖全局的 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 要使用的 Android flavor。
     *
     * 如果应用在 `build.gradle` 中声明了 flavor，
     * 配置您希望通过 `npx cap run` 命令运行的 flavor。
     *
     * @since 3.1.0
     */
    flavor?: string;

    /**
     * 是否让 webview 获得初始焦点。
     *
     * 覆盖全局的 `initialFocus` 选项。
     *
     * @since 3.5.1
     * @default true
     */
    initialFocus?: boolean;

    /**
     * 应用支持的 Android 最低 webview 版本。
     *
     * 最低支持版本不能低于版本 `55`，这是 Capacitor 所要求的。
     *
     * 如果设备使用较低的 WebView 版本，Logcat 上将显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可以
     * 用来显示自定义错误。
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

    /**
     * 应用支持的 Android 最低华为 webview 版本。
     *
     * 最低支持版本不能低于版本 `10`，这是 Capacitor 所要求的。
     *
     * 如果设备使用较低的 WebView 版本，Logcat 上将显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可以
     * 用来显示自定义错误。
     *
     * @since 4.6.4
     * @default 10
     */
    minHuaweiWebViewVersion?: number;

    buildOptions?: {
      /**
       * 您的 keystore 路径
       *
       * @since 4.4.0
       */
      keystorePath?: string;

      /**
       * 您的 keystore 密码
       *
       * @since 4.4.0
       */
      keystorePassword?: string;

      /**
       * 要在 keystore 中使用的别名
       *
       * @since 4.4.0
       */
      keystoreAlias?: string;

      /**
       * 要在 keystore 中使用的别名的密码
       *
       * @since 4.4.0
       */
      keystoreAliasPassword?: string;

      /**
       * 发布版本的 bundle 类型
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

    /**
     * 使 service worker 请求通过 Capacitor bridge。
     * 设置为 false 以使用您自己的处理方式。
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
     * 要使用的 iOS 构建 scheme。
     *
     * 通常这与您在 Xcode 中的应用 target 匹配。您可以使用以下命令列出 scheme：
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
     * 覆盖全局的 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 要追加到 iOS 上 Capacitor Web View 原始用户代理后的字符串。
     *
     * 覆盖全局的 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则此设置将被忽略。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * iOS 上 Capacitor Web View 的背景颜色。
     *
     * 覆盖全局的 `backgroundColor` 选项。
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
     * 配置用于编译 Cordova 插件的自定义链接器标志。
     *
     * @since 1.0.0
     * @default []
     */
    cordovaLinkerFlags?: string[];

    /**
     * 允许在按住链接时显示目标预览。
     *
     * 这将设置 Web View 上的
     * [`allowsLinkPreview`](https://developer.apple.com/documentation/webkit/wkwebview/1415000-allowslinkpreview)
     * 属性，而不是使用默认值。
     *
     * @since 2.0.0
     */
    allowsLinkPreview?: boolean;

    /**
     * Capacitor 在 iOS 上生成日志时所依据的构建配置。
     *
     * 覆盖全局的 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 在 `npx cap sync` 期间为 iOS 包含的插件的许可名单。
     *
     * 覆盖全局的 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 设置 WKWebView 配置中 limitsNavigationsToAppBoundDomains 的值。
     *
     * 如果 Info.plist 文件包含 `WKAppBoundDomains` 键，建议将此选项设置为 true，
     * 否则某些功能将无法正常工作。
     * 但副作用是会阻止导航到 `WKAppBoundDomains` 列表中的域之外。
     * `localhost`（或配置为 `server.hostname` 的值）也需要添加到
     * `WKAppBoundDomains` 列表中。
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;

    /**
     * Web View 加载和渲染 web 内容时使用的内容模式。
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
     * 如果您想使用自己的 UNUserNotificationCenter 来处理通知，请设置为 false。
     *
     * @since 4.5.0
     * @default true
     */
    handleApplicationNotifications?: boolean;

    /**
     * 使用 Xcode 14.3，在 iOS 16.4 及更高版本上，为发布版本启用可调试的 web 内容。
     *
     * 如果未设置，对于开发版本为 `true`。
     *
     * @since 4.8.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * 是否让 webview 获得初始焦点。
     *
     * 覆盖全局的 `initialFocus` 选项。
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
       * xcodebuild 用于导出归档的方法
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

  experimental?: {
    /**
     * 实验性的 iOS 特定配置。
     *
     * 这些选项在将来版本中可能会更改或移除。
     *
     * @since 8.2.0
     */
    ios?: {
      /**
       * Swift Package Manager (SPM) 特定配置。
       *
       * @since 8.2.0
       */
      spm?: {
        /**
         * 在 Package.swift 头部使用的 Swift 工具版本。
         *
         * 定义构建应用所需的最低 Swift 编译器版本。
         * 更多信息请查看 [swift 文档](https://docs.swift.org/swiftpm/documentation/packagemanagerdocs/settingswifttoolsversion/)
         *
         * 警告：Capacitor 尚未正式支持 Swift 6。
         * 将此属性设置为 6.0 或更高版本可能会导致问题。
         * 如果您需要将此属性设置为 6.0 或更高版本，请务必彻底测试您的 iOS 应用。
         *
         * 此设置可能在未来的主要版本中升级为 `ios.spm.swiftToolsVersion`。
         *
         * @since 8.3.0
         * @default '5.9'
         * @example '6.1'
         */
        swiftToolsVersion?: string;

        /**
         * 为 SPM 插件依赖定义包特性。
         *
         * 这需要显式将 experimental.ios.spm.swiftToolsVersion
         * 设置为 '6.1' 或更高版本。
         *
         * 键是插件 ID（例如 `@capacitor-firebase/analytics`），
         * 值是特性名称的数组。
         *
         * 包可以有默认特性。如果您使用此属性，并且
         * 想要保留默认值，请在数组中包含 ".defaults"。
         *
         * 此设置可能在未来的主要版本中升级为 `ios.spm.packageTraits`。
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
     * 建议保持为 `localhost`，因为它允许使用 Web API，
     * 否则这些 API 可能需要[安全上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)
     * 如 [`navigator.geolocation`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)
     * 和 [`MediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)。
     *
     * @since 1.0.0
     * @default localhost
     */
    hostname?: string;

    /**
     * 配置 iOS 上的本地 scheme。
     *
     * [不能设置为 WKWebView 已处理的 scheme，如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
     * 这在从 [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)
     * 迁移时可能很有用，在 iOS 上默认的 scheme 是 `ionic`。
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;

    /**
     * 配置 Android 上的本地 scheme。
     *
     * 自 Webview 117 起，Android 上的自定义 scheme 无法更改 URL 路径。将此值更改为 `http` 或 `https` 以外的值
     * 可能导致应用无法解析路由。如果出于某种原因必须更改此值，请考虑使用基于 hash 的 URL 策略，
     * 但无法保证这能长期正常工作，因为允许非标准 scheme 修改查询参数和 URL 片段
     * 仅出于兼容性原因。
     * https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117
     *
     * @since 1.2.0
     * @default https
     */
    androidScheme?: string;

    /**
     * 在 Web View 中加载外部 URL。
     *
     * 用于热重载服务器。
     *
     * **不适用于生产环境。**
     *
     * @since 1.0.0
     */
    url?: string;

    /**
     * 在 Web View 中允许明文流量。
     *
     * 在 Android 上，自 API 28 起，默认禁用所有明文流量。
     *
     * 用于热重载服务器，常使用未加密的 HTTP 流量。
     *
     * **不适用于生产环境。**
     *
     * @since 1.5.0
     * @default false
     */
    cleartext?: boolean;

    /**
     * 设置 Web View 可以导航到的额外 URL。
     *
     * 默认情况下，所有外部 URL 都在外部浏览器中打开（而不是 Web View）。
     *
     * **不适用于生产环境。**
     *
     * @since 1.0.0
     * @default []
     */
    allowNavigation?: string[];

    /**
     * 指定在发生错误时显示本地 HTML 页面的路径。
     * 在 Android 上，该 HTML 文件将无法访问 Capacitor 插件。
     *
     * @since 4.0.0
     * @default null
     */
    errorPath?: string;

    /**
     * 向应用 URL 追加路径。
     *
     * 允许从默认的 `/index.html` 之外的其他路径加载。
     * @since 7.3.0
     * @default null
     */
    appStartPath?: string;
  };

  cordova?: {
    /**
     * 在 config.xml 中填充 <access> 标签，其 origin 设置为
     * 此处输入的值。
     * 如果未提供，则会包含一个 <access origin="*" /> 标签。
     * 仅对遵守白名单的少数 Cordova 插件有效。
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
     * 如果 CLI 检测到 Cordova 插件存在
     * 未安装的依赖项，则在 cap update/sync 时失败。
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
   * 在 `npx cap sync` 期间包含的插件的许可名单。
   *
   * 这应该是一个字符串数组，表示运行 `npx cap sync` 时要包含的插件的
   * npm 包名称。如果未设置，Capacitor 将检查 `package.json`
   * 以获取潜在插件列表。
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
     * 启用 CapacitorCookies 以覆盖原生上的全局 `document.cookie`。
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
     * 启用 CapacitorHttp 以覆盖原生上的全局 `fetch` 和 `XMLHttpRequest`。
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
     * 指定如何处理 Android 上的有问题的插入区域。
     *
     * 此选项仅在 Android 上受支持。
     *
     * `css` = 将包含正确安全区域插入值的 CSS 变量（`--safe-area-inset-*`）注入到 webview 中。
     *
     * `disable` = 禁用 CSS 变量注入。
     *
     * @default "css"
     */
    insetsHandling?: 'css' | 'disable';
    /**
     * 系统栏文字和图标的样式。
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
```

## 环境变量

Capacitor CLI 会自动在您的系统上查找依赖项。如果您需要配置这些路径，可以使用以下环境变量：

- `CAPACITOR_ANDROID_STUDIO_PATH`：系统中 Android Studio 可执行文件的路径。
- `CAPACITOR_COCOAPODS_PATH`：系统中 `pod` 二进制文件的路径。
