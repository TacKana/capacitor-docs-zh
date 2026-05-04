---
title: Capacitor Configuration
description: 配置 Capacitor
sidebar_label: Config
slug: /config
---

# Capacitor 配置

Capacitor 配置文件用于为 Capacitor 工具链设置高层选项。

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

如果你的项目不使用 TypeScript，可以按相同方式使用 `capacitor.config.json` 文件。

## 配置结构 {#schema}

以下是 Capacitor 配置的 TypeScript 接口定义，包含完整的描述说明和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 打包应用的唯一标识符。
   *
   * 这在 iOS 中也称为 Bundle ID，在 Android 中称为 Application ID。
   * 必须采用反向域名表示法，通常代表您或您的公司拥有的域名。
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的用户友好名称。
   *
   * 这应该是您在应用商店中看到的名称，但在生成后可以在每个原生平台内进行修改。
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
   * 是否复制 Capacitor 运行时包。
   *
   * 如果您的应用未使用打包工具，请将此设置为 `true`，然后 Capacitor
   * 将创建一个 `capacitor.js` 文件，您需要将其作为脚本添加到
   * `index.html` 文件中。
   *
   * @since 1.0.0
   * @default false
   */
  bundledWebRuntime?: boolean;

  /**
   * 隐藏或显示 iOS 和 Android 的原生日志。
   *
   * @since 2.1.0
   * @deprecated 3.0.0
   * @default false
   */
  hideLogs?: boolean;

  /**
   * Capacitor 向日志系统发送语句的构建配置（由原生应用定义）。
   * 这适用于原生代码中的日志语句以及从 JavaScript 重定向的语句
   *（`console.debug`、`console.error` 等）。启用日志记录将允许语句显示在
   * Xcode 和 Android Studio 窗口中，但如果在发布的构建中启用，可能会在设备上泄露信息。
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
   * Capacitor Web 视图的用户代理。
   *
   * @since 1.4.0
   */
  overrideUserAgent?: string;

  /**
   * 要追加到 Capacitor Web 视图原始用户代理的字符串。
   *
   * 如果使用了 `overrideUserAgent`，则此设置将被忽略。
   *
   * @since 1.4.0
   */
  appendUserAgent?: string;

  /**
   * Capacitor Web 视图的背景颜色。
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
     * Android 上 Capacitor Web 视图的用户代理。
     *
     * 覆盖全局 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 要追加到 Android 上 Capacitor Web 视图原始用户代理的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则此设置将被忽略。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * Android 上 Capacitor Web 视图的背景颜色。
     *
     * 覆盖全局 `backgroundColor` 选项。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 在 Android 的 Capacitor Web 视图中启用混合内容。
     *
     * 出于安全考虑，默认禁用[混合内容](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)。
     * 在开发过程中，您可能需要启用它以允许 Web 视图从不同的方案加载文件。
     *
     * **此功能不适用于生产环境。**
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
     * 隐藏或显示 Android 的原生日志。
     *
     * 覆盖全局 `hideLogs` 选项。
     *
     * @since 2.1.0
     * @deprecated 3.0.0
     * @default false
     */
    hideLogs?: boolean;

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
     * 在 Android 上执行 `npx cap sync` 时要包含的插件白名单。
     *
     * 覆盖全局 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 要使用的 Android 构建变体。
     *
     * 如果应用在 `build.gradle` 中声明了构建变体，
     * 请配置您想要通过 `npx cap run` 命令运行的变体。
     *
     * @since 3.1.0
     */
    flavor?: string;

    /**
     * 是否给予 Web 视图初始焦点。
     *
     * @since 3.5.1
     * @default true
     */
    initialFocus?: boolean;

    /**
     * 您的应用支持的 Android 上 WebView 的最低版本。
     *
     * 最低支持版本不能低于版本 `55`，这是 Capacitor 所必需的。
     *
     * 如果设备使用的 WebView 版本过低，Logcat 中将显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可以
     * 用于显示自定义错误。
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

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
       * 发布构建的包类型
       *
       * @since 4.4.0
       * @default "AAB"
       */
      releaseType?: 'AAB' | 'APK';
    };

    /**
     * 使用传统的 [addJavascriptInterface](https://developer.android.com/reference/android/webkit/WebView#addJavascriptInterface(java.lang.Object, java.lang.String))
     * 替代新的、更安全的 [addWebMessageListener](https://developer.android.com/reference/androidx/webkit/WebViewCompat#addWebMessageListener(android.webkit.WebView,java.lang.String,java.util.Set<java.lang.String>,androidx.webkit.WebViewCompat.WebMessageListener))
     *
     * @since 4.5.0
     * @default false
     */
    useLegacyBridge: boolean;
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
     * 通常这与您在 Xcode 中的应用目标匹配。您可以使用
     * 以下命令列出方案：
     *
     * ```shell
     * xcodebuild -workspace ios/App/App.xcworkspace -list
     * ```
     *
     * @since 3.0.0
     * @default App
     */
    scheme?: string;
```/**
 * iOS 平台上 Capacitor Web View 的用户代理字符串。
 *
 * 覆盖全局的 `overrideUserAgent` 设置。
 *
 * @since 1.4.0
 */
overrideUserAgent?: string;

/**
 * 要在 iOS 平台 Capacitor Web View 原始用户代理字符串后追加的字符串。
 *
 * 覆盖全局的 `appendUserAgent` 设置。
 *
 * 如果使用了 `overrideUserAgent`，此设置将被忽略。
 *
 * @since 1.4.0
 */
appendUserAgent?: string;

/**
 * iOS 平台 Capacitor Web View 的背景色。
 *
 * 覆盖全局的 `backgroundColor` 设置。
 *
 * @since 1.1.0
 */
backgroundColor?: string;

/**
 * 配置滚动视图的内容边距调整行为。
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
 * 配置编译 Cordova 插件时使用的自定义链接器标志。
 *
 * @since 1.0.0
 * @default []
 */
cordovaLinkerFlags?: string[];

/**
 * 允许在按下链接时预览目标页面。
 *
 * 这将设置 Web View 上的
 * [`allowsLinkPreview`](https://developer.apple.com/documentation/webkit/wkwebview/1415000-allowslinkpreview)
 * 属性，而不是使用默认值。
 *
 * @since 2.0.0
 */
allowsLinkPreview?: boolean;

/**
 * 在 iOS 上隐藏或显示原生日志。
 *
 * 覆盖全局的 `hideLogs` 设置。
 *
 * @since 1.1.0
 * @deprecated 3.0.0
 * @default false
 */
hideLogs?: boolean;

/**
 * iOS 平台上 Capacitor 生成日志所依据的构建配置。
 *
 * 覆盖全局的 `loggingBehavior` 设置。
 *
 * @since 3.0.0
 * @default debug
 */
loggingBehavior?: 'none' | 'debug' | 'production';

/**
 * 在 iOS 平台上执行 `npx cap sync` 时要包含的插件白名单。
 *
 * 覆盖全局的 `includePlugins` 设置。
 *
 * @since 3.0.0
 */
includePlugins?: string[];

/**
 * 设置 WKWebView 的 limitsNavigationsToAppBoundDomains 配置。
 *
 * 如果 Info.plist 文件中包含 `WKAppBoundDomains` 键，建议将此选项设为 true，否则某些功能可能无法工作。
 * 但副作用是，它会阻止导航到 `WKAppBoundDomains` 列表之外的域名。
 * `localhost`（或配置为 `server.hostname` 的值）也需要添加到 `WKAppBoundDomains` 列表中。
 *
 * @since 3.1.0
 * @default false
 */
limitsNavigationsToAppBoundDomains?: boolean;

/**
 * Web View 在加载和渲染网页内容时使用的内容模式。
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
 * 如果你想使用自己的 UNUserNotificationCenter 来处理通知，请设置为 false。
 *
 * @since 4.5.0
 * @default true
 */
handleApplicationNotifications?: boolean;
};

server?: {
/**
 * 配置设备的本地主机名。
 *
 * 建议保持为 `localhost`，因为它允许使用需要
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
 * 配置 iOS 上的本地 URL 方案。
 *
 * [不能设置为 WKWebView 已处理的方案，例如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
 * 从
 * [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)
 * 迁移时，这可能很有用，因为在 iOS 上该插件的默认方案是 `ionic`。
 *
 * @since 1.2.0
 * @default capacitor
 */
iosScheme?: string;

/**
 * 配置 Android 上的本地 URL 方案。
 *
 * @since 1.2.0
 * @default http
 */
androidScheme?: string;

/**
 * 在 Web View 中加载外部 URL。
 *
 * 此功能旨在与实时重载服务器一起使用。
 *
 * **这不适用于生产环境。**
 *
 * @since 1.0.0
 */
url?: string;

/**
 * 允许 Web View 中的明文传输。
 *
 * 从 API 28 开始，Android 默认禁用所有明文传输。
 *
 * 此功能旨在与通常使用未加密 HTTP 流量的实时重载服务器一起使用。
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
 * 默认情况下，所有外部 URL 都在外部浏览器中打开（而非在 Web View 中）。
 *
 * **这不适用于生产环境。**
 *
 * @since 1.0.0
 * @default []
 */
allowNavigation?: string[];

/**
 * 指定发生错误时要显示的本地 HTML 页面的路径。
 * 在 Android 上，HTML 文件将无法访问 Capacitor 插件。
 *
 * @since 4.0.0
 * @default null
 */
errorPath?: string;
};

cordova?: {
/**
 * 使用此处输入的值作为 origin 来填充 config.xml 中的 <access> 标签。
 * 如果未提供，则会包含一个单独的 <access origin="*" /> 标签。
 * 此设置仅对少数遵循白名单的 Cordova 插件有效。
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
 * 需要设为静态但不在静态插件列表中的 Cordova 插件列表。
 *
 * @since 3.3.0
 */
staticPlugins?: string[];
};

/**
 * 配置插件。
 *
 * 这是一个对象，其中的配置值由插件类名指定。
 *
 * @since 1.0.0
 */
plugins?: PluginsConfig;  /**
   * 在执行 `npx cap sync` 时允许包含的插件白名单。
   *
   * 这应该是一个字符串数组，表示在运行 `npx cap sync` 时要包含的插件的 npm 包名称。如果未设置，Capacitor 将检查 `package.json` 以获取潜在的插件列表。
   *
   * @since 3.0.0
   */
  includePlugins?: string[];
}

export interface Portal {
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
   * Capacitor Portals 插件配置
   *
   * @since 3.5.0
   */
  Portals?: {
    shell: Portal;
    apps: Portal[];
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
}
```

## 环境变量

Capacitor CLI 会自动查找您系统上的依赖项。如果您需要配置这些路径，可以使用以下环境变量：

- `CAPACITOR_ANDROID_STUDIO_PATH`：您系统上 Android Studio 可执行文件的路径。
- `CAPACITOR_COCOAPODS_PATH`：您系统上 `pod` 二进制文件的路径。