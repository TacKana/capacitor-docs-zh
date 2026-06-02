---
title: Capacitor 配置
description: 配置 Capacitor
sidebar_label: 配置
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
  appName: '我的 Capacitor 应用',
  webDir: 'www',
};

export default config;
```

如果您的项目中未使用 TypeScript，您也可以以相同的方式使用 `capacitor.config.json` 文件。

## Schema

以下是 Capacitor 配置的 TypeScript 接口，包含描述和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 打包应用的唯一标识符。
   *
   * 在 iOS 中也被称为 Bundle ID，在 Android 中被称为 Application ID。
   * 它必须使用反向域名表示法，通常代表您或您的公司拥有的域名。
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的人类可读名称。
   *
   * 这应该是您在 App Store 中看到的名称，但可以在每个原生平台生成后在其中更改。
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 编译后的 Web 资产目录。
   *
   * 此目录应包含应用的最终 `index.html` 文件。
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * 是否复制 Capacitor 运行时包。
   *
   * 如果您的应用未使用打包工具，请将其设置为 `true`，然后 Capacitor
   * 将创建一个 `capacitor.js` 文件，您需要将其作为脚本添加到
   * `index.html` 文件中。
   *
   * 已弃用，将在 Capacitor 6 中移除。
   *
   * @since 1.0.0
   * @deprecated 5.0.0
   * @default false
   */
  bundledWebRuntime?: boolean;

  /**
   * 原生应用定义的构建配置，Capacitor 将根据它向日志系统发送语句。
   * 这适用于原生代码中的日志语句以及从 JavaScript 重定向的语句（`console.debug`、
   * `console.error` 等）。启用日志记录将让语句显示在 Xcode 和 Android Studio
   * 窗口中，但如果在上线版本中启用，可能会在设备上泄露信息。
   *
   * 'none' = 从不产生日志
   * 'debug' = 在调试构建中产生日志，但在生产构建中不产生
   * 'production' = 总是产生日志
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
   * 追加到 Capacitor Web View 原始用户代理的字符串。
   *
   * 如果使用了 `overrideUserAgent`，则忽略此项。
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
   * 在 Capacitor Web View 中启用缩放。
   *
   * @default false
   * @since 6.0.0
   */
  zoomEnabled?: boolean;

  android?: {
    /**
     * 指定自定义的原生 Android 项目路径。
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
     * 追加到 Android 上 Capacitor Web View 原始用户代理的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则忽略此项。
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
     * 在 Android 的 Capacitor Web View 中启用缩放。
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 在 Android 的 Capacitor Web View 中启用混合内容。
     *
     * 出于安全考虑，[混合内容](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
     * 默认被禁用。在开发期间，您可能需要启用它以允许 Web View 从不同 scheme 加载文件。
     *
     * **不适用于生产环境。**
     *
     * @since 1.0.0
     * @default false
     */
    allowMixedContent?: boolean;

    /**
     * 启用一个更简单的键盘，可能有某些限制。
     *
     * 这将使用替代的
     * [`InputConnection`](https://developer.android.com/reference/android/view/inputmethod/InputConnection)
     * 捕获 JS 键。
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
     * Android 上 Capacitor 生成日志的构建配置。
     *
     * 覆盖全局 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * `npx cap sync` 期间要包含的插件白名单（Android）。
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
     * 请配置要使用 `npx cap run` 命令运行的风味。
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
     * 应用支持的 Android 最低 WebView 版本。
     *
     * 最低支持版本不能低于 `55`，这是 Capacitor 所要求的。
     *
     * 如果设备使用更低的 WebView 版本，Logcat 中将显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可用于
     * 显示自定义错误。
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

    /**
     * 应用支持的 Android 最低华为 WebView 版本。
     *
     * 最低支持版本不能低于 `10`，这是 Capacitor 所要求的。
     *
     * 如果设备使用更低的 WebView 版本，Logcat 中将显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，因此可用于
     * 显示自定义错误。
     *
     * @since 4.6.4
     * @default 10
     */
    minHuaweiWebViewVersion?: number;

    buildOptions?: {
      /**
       * keystore 的路径
       *
       * @since 4.4.0
       */
      keystorePath?: string;

      /**
       * keystore 的密码
       *
       * @since 4.4.0
       */
      keystorePassword?: string;

      /**
       * 要使用的 keystore 中的别名
       *
       * @since 4.4.0
       */
      keystoreAlias?: string;

      /**
       * 要使用的 keystore 中别名的密码
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
     * 而不是新的更安全的 [addWebMessageListener](https://developer.android.com/reference/androidx/webkit/WebViewCompat#addWebMessageListener(android.webkit.WebView,java.lang.String,java.util.Set%3Cjava.lang.String%3E,androidx.webkit.WebViewCompat.WebMessageListener))
     *
     * @since 4.5.0
     * @default false
     */
    useLegacyBridge?: boolean;
  };

  ios?: {
    /**
     * 指定自定义的原生 iOS 项目路径。
     *
     * @since 3.0.0
     * @default ios
     */
    path?: string;

    /**
     * 要使用的 iOS 构建 scheme。
     *
     * 这通常与您在 Xcode 中的应用 target 匹配。您可以使用
     * 以下命令列出 scheme：
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
     * 追加到 iOS 上 Capacitor Web View 原始用户代理的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则忽略此项。
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
     * 在 iOS 的 Capacitor Web View 中启用缩放。
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 配置滚动视图的内容插入调整行为。
     *
     * 这将设置 Web View 的
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
     * 按下链接时允许目标预览。
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
     * `npx cap sync` 期间要包含的插件白名单（iOS）。
     *
     * 覆盖全局 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 设置 WKWebView 的 limitsNavigationsToAppBoundDomains 配置。
     *
     * 如果 Info.plist 文件包含 `WKAppBoundDomains` 键，建议
     * 将此选项设置为 true，否则某些功能将无法正常工作。
     * 但副作用是，它会阻止导航到 `WKAppBoundDomains` 列表之外的域名。
     * `localhost`（或配置为 `server.hostname` 的值）也需要添加到
     * `WKAppBoundDomains` 列表中。
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;

    /**
     * Web View 加载和渲染 Web 内容时要使用的内容模式。
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
     * 使用 Xcode 14.3，在 iOS 16.4 及以上版本中，为发布构建启用可调试的 Web 内容。
     *
     * 如果未设置，对于开发构建为 `true`。
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
     * [不能设置为 WKWebView 已经处理的 scheme，如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
     * 这在从
     * [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)
     * 迁移时可能有用，其中 iOS 上的默认 scheme 是 `ionic`。
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;

    /**
     * 配置 Android 上的本地 scheme。
     *
     * 自 WebView 117 起，Android 上的自定义 scheme 无法更改 URL 路径。将此值更改为
     * `http` 或 `https` 以外的任何值都可能导致您的应用无法解析路由。
     * 如果出于某种原因必须更改它，请考虑使用基于哈希的 URL 策略，但无法保证
     * 这能长期工作，因为允许非标准 scheme 修改查询参数和 URL 片段仅出于
     * 兼容性原因。
     * https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117
     *
     * @since 1.2.0
     * @default https
     */
    androidScheme?: string;

    /**
     * 在 Web View 中加载外部 URL。
     *
     * 用于实时重载服务器。
     *
     * **不适用于生产环境。**
     *
     * @since 1.0.0
     */
    url?: string;

    /**
     * 允许在 Web View 中使用明文流量。
     *
     * 在 Android 上，自 API 28 起，默认禁用所有明文流量。
     *
     * 用于常使用未加密 HTTP 流量的实时重载服务器。
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
     * 指定在发生错误时显示的本地 HTML 页面路径。
     * 在 Android 上，HTML 文件将无法访问 Capacitor 插件。
     *
     * @since 4.0.0
     * @default null
     */
    errorPath?: string;
  };

  cordova?: {
    /**
     * 在 config.xml 中填充 <access> 标签，其源设置为
     * 在此处输入的值。
     * 如果未提供，将包含单个 <access origin="*" /> 标签。
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
     * 需要静态但尚未在
     * 静态插件列表中的 Cordova 插件列表。
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
   * `npx cap sync` 期间要包含的插件白名单。
   *
   * 这应该是一个字符串数组，表示在运行 `npx cap sync` 时
   * 要包含的插件的 npm 包名。如果未设置，Capacitor 将
   * 检查 `package.json` 以获取可能的插件列表。
   *
   * @since 3.0.0
   */
  includePlugins?: string[];
}

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
}
```

## 环境变量

Capacitor CLI 会自动在您的系统上查找依赖。如果您需要配置这些路径，可以使用以下环境变量：

- `CAPACITOR_ANDROID_STUDIO_PATH`：系统上 Android Studio 可执行文件的路径。
- `CAPACITOR_COCOAPODS_PATH`：系统上 `pod` 二进制文件的路径。
