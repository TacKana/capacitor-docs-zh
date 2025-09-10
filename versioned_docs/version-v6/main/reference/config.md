---
title: Capacitor 配置
description: Capacitor 配置文件说明
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

如果项目中没有使用 TypeScript，可以使用相同格式的 `capacitor.config.json` 文件。

## 配置结构

以下是完整的 Capacitor 配置 TypeScript 接口定义，包含各参数的说明和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 打包应用的唯一标识符
   *
   * 在 iOS 中称为 Bundle ID，在 Android 中称为 Application ID。
   * 必须使用反向域名表示法，通常代表您或公司拥有的域名。
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的用户友好名称
   *
   * 这是在应用商店中显示的名称，但在生成后可以在各原生平台中修改。
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 编译后网页资源的目录
   *
   * 此目录应包含应用的最终 `index.html` 文件。
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * 是否复制 Capacitor 运行时包
   *
   * 如果应用没有使用打包工具，请设置为 `true`，
   * 这样 Capacitor 会创建需要在 `index.html` 中添加为脚本的 `capacitor.js` 文件。
   *
   * 此选项已弃用，将在 Capacitor 6 中移除
   *
   * @since 1.0.0
   * @deprecated 5.0.0
   * @default false
   */
  bundledWebRuntime?: boolean;

  /**
   * 日志记录行为配置
   *
   * 定义原生应用构建配置下 Capacitor 向日志系统发送语句的行为。
   * 这适用于原生代码中的日志语句以及从 JavaScript 重定向的语句（如 `console.debug`、`console.error` 等）。
   * 启用日志记录可以让语句显示在 Xcode 和 Android Studio 窗口中，
   * 但如果在发布版本中启用可能会泄露设备信息。
   *
   * 'none' = 从不产生日志
   * 'debug' = 在调试构建中产生日志，但不在生产构建中产生
   * 'production' = 总是产生日志
   *
   * @since 3.0.0
   * @default debug
   */
  loggingBehavior?: 'none' | 'debug' | 'production';

  /**
   * Capacitor Web View 的用户代理字符串
   *
   * @since 1.4.0
   */
  overrideUserAgent?: string;

  /**
   * 附加到 Capacitor Web View 原始用户代理的字符串
   *
   * 如果使用了 `overrideUserAgent`，则此设置会被忽略。
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

  /**
   * 启用 Capacitor Web View 内的缩放功能
   *
   * @default false
   * @since 6.0.0
   */
  zoomEnabled?: boolean;

  android?: {
    /**
     * 指定原生 Android 项目的自定义路径
     *
     * @since 3.0.0
     * @default android
     */
    path?: string;

    /**
     * Android 平台上 Capacitor Web View 的用户代理字符串
     *
     * 覆盖全局的 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * Android 平台上附加到 Capacitor Web View 原始用户代理的字符串
     *
     * 覆盖全局的 `appendUserAgent` 选项。
     * 如果使用了 `overrideUserAgent`，则此设置会被忽略。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * Android 平台上 Capacitor Web View 的背景色
     *
     * 覆盖全局的 `backgroundColor` 选项。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 启用 Android 平台上 Capacitor Web View 内的缩放功能
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 启用 Android 平台上 Capacitor Web View 的混合内容
     *
     * 出于安全考虑，默认禁用[混合内容](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)。
     * 在开发过程中，可能需要启用此选项以允许 Web View 加载不同协议的文件。
     *
     * **此选项不适用于生产环境。**
     *
     * @since 1.0.0
     * @default false
     */
    allowMixedContent?: boolean;

    /**
     * 启用可能有某些限制的简化键盘
     *
     * 这会使用替代的 [`InputConnection`](https://developer.android.com/reference/android/view/inputmethod/InputConnection) 捕获 JS 按键。
     *
     * @since 1.0.0
     * @default false
     */
    captureInput?: boolean;

    /**
     * 始终启用可调试的网页内容
     *
     * 在开发过程中会自动启用此选项。
     *
     * @since 1.0.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * Android 平台上 Capacitor 生成日志的构建配置
     *
     * 覆盖全局的 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 执行 `npx cap sync` 时 Android 平台包含的插件白名单
     *
     * 覆盖全局的 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 指定使用的 Android 构建风味
     *
     * 如果应用的 `build.gradle` 中声明了风味，
     * 可以配置此选项以指定 `npx cap run` 命令使用的风味。
     *
     * @since 3.1.0
     */
    flavor?: string;

    /**
     * 是否让 WebView 初始获得焦点
     *
     * @since 3.5.1
     * @default true
     */
    initialFocus?: boolean;

    /**
     * 应用支持的 Android WebView 最低版本
     *
     * 最低版本不能低于 Capacitor 要求的 `55` 版本。
     *
     * 如果设备使用的 WebView 版本较低，将在 Logcat 中显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，
     * 因此可用于显示自定义错误页面。
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

    /**
     * 应用支持的华为 WebView 最低版本
     *
     * 最低版本不能低于 Capacitor 要求的 `10` 版本。
     *
     * 如果设备使用的 WebView 版本较低，将在 Logcat 中显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，
     * 因此可用于显示自定义错误页面。
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
       * 使用的密钥库别名
       *
       * @since 4.4.0
       */
      keystoreAlias?: string;

      /**
       * 密钥库别名密码
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
       * 用于签名的程序
       *
       * @since 5.1.0
       * @default "jarsigner"
       */
      signingType?: 'apksigner' | 'jarsigner';
    };

    /**
     * 使用传统的 [addJavascriptInterface](https://developer.android.com/reference/android/webkit.WebView#addJavascriptInterface(java.lang.Object,%20java.lang.String))
     * 而非更安全的新方法 [addWebMessageListener](https://developer.android.com/reference/androidx/webkit/WebViewCompat#addWebMessageListener(android.webkit.WebView,java.lang.String,java.util.Set%3Cjava.lang.String%3E,androidx.webkit.WebViewCompat.WebMessageListener))
     *
     * @since 4.5.0
     * @default false
     */
    useLegacyBridge?: boolean;
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
     * 使用的 iOS 构建方案
     *
     * 通常这与 Xcode 中的应用目标匹配。可以使用以下命令列出所有方案：
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
     * iOS 平台上 Capacitor Web View 的用户代理字符串
     *
     * 覆盖全局的 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * iOS 平台上附加到 Capacitor Web View 原始用户代理的字符串
     *
     * 覆盖全局的 `appendUserAgent` 选项。
     * 如果使用了 `overrideUserAgent`，则此设置会被忽略。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * iOS 平台上 Capacitor Web View 的背景色
     *
     * 覆盖全局的 `backgroundColor`;
     */
    backgroundColor?: string;

    /**
     * 启用 iOS 平台上 Capacitor Web View 内的缩放功能
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 配置滚动视图的内容插入调整行为
     *
     * 这会设置 Web View 的 [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview) 的
     * [`contentInsetAdjustmentBehavior`](https://developer.apple.com/documentation/uikit/uiscrollview/2902261-contentinsetadjustmentbehavior) 属性。
     *
     * @since 2.0.0
     * @default never
     */
    contentInset?: 'automatic' | 'scrollableAxes' | 'never' | 'always';

    /**
     * 配置滚动视图是否可滚动
     *
     * 这会设置 Web View 的 [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview) 的
     * [`isScrollEnabled`](https://developer.apple.com/documentation/uikit/uiscrollview/1619395-isscrollenabled) 属性。
     *
     * @since 1.0.0
     */
    scrollEnabled?: boolean;

    /**
     * 配置编译 Cordova 插件时的自定义链接器标志
     *
     * @since 1.0.0
     * @default []
     */
    cordovaLinkerFlags?: string[];

    /**
     * 允许在按下链接时显示目标预览
     *
     * 这会设置 Web View 的 [`allowsLinkPreview`](https://developer.apple.com/documentation/webkit/wkwebview/1415000-allowslinkpreview) 属性，
     * 而不是使用默认值。
     *
     * @since 2.0.0
     */
    allowsLinkPreview?: boolean;

    /**
     * iOS 平台上 Capacitor 生成日志的构建配置
     *
     * 覆盖全局的 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 执行 `npx cap sync` 时 iOS 平台包含的插件白名单
     *
     * 覆盖全局的 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 设置 WKWebView 的 limitsNavigationsToAppBoundDomains 配置
     *
     * 如果 Info.plist 文件包含 `WKAppBoundDomains` 键，建议将此选项设为 true，
     * 否则某些功能将无法工作。
     * 但副作用是会阻止导航到 `WKAppBoundDomains` 列表之外的域名。
     * `localhost`（或 `server.hostname` 配置的值）也需要添加到 `WKAppBoundDomains` 列表中。
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;

    /**
     * Web View 加载和渲染网页内容时使用的内容模式
     *
     * - 'recommended': 适合当前设备的内容模式
     * - 'desktop': 代表桌面体验的内容模式
     * - 'mobile': 代表移动体验的内容模式
     *
     * @since 4.0.0
     * @default recommended
     */
    preferredContentMode?: 'recommended' | 'desktop' | 'mobile';

    /**
     * 配置 Capacitor 是否处理本地/推送通知
     * 设置为 false 可使用自己的 UNUserNotificationCenter 处理通知
     *
     * @since 4.5.0
     * @default true
     */
    handleApplicationNotifications?: boolean;

    /**
     * 在 iOS 16.4 及以上版本中使用 Xcode 14.3，为发布版本启用可调试的网页内容
     *
     * 如果未设置，对于开发构建默认为 `true`
     *
     * @since 4.8.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;
  };

  server?: {
    /**
     * 配置设备的本地主机名
     *
     * 建议保持为 `localhost`，这样可以继续使用需要
     * [安全上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) 的 Web API，
     * 如 [`navigator.geolocation`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)
     * 和 [`MediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
     *
     * @since 1.0.0
     * @default localhost
     */
    hostname?: string;

    /**
     * 配置 iOS 平台的本地协议方案
     *
     * [不能设置为 WKWebView 已处理的方案，如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
     * 从 [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)
     * 迁移时很有用，因为 iOS 上的默认方案是 `ionic`
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;

    /**
     * 配置 Android 平台的本地协议方案
     *
     * 从 Webview 117 开始，Android 上的自定义方案无法更改 URL 路径。将此值从 `http` 或 `https` 以外的任何内容更改可能导致应用程序无法解析路由。
     * 如果必须更改此值，请考虑使用基于哈希的 URL 策略，但不能保证这将长期有效，因为允许非标准方案修改查询参数和 URL 片段仅出于兼容性考虑。
     * https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117
     *
     * @since 1.2.0
     * @default https
     */
    androidScheme?: string;

    /**
     * 在 Web View 中加载外部 URL
     *
     * 此选项适用于与实时重载服务器配合使用。
     *
     * **此选项不适用于生产环境。**
     *
     * @since 1.0.0
     */
    url?: string;

    /**
     * 允许 Web View 中的明文流量
     *
     * 在 Android 上，从 API 28 开始默认禁用所有明文流量。
     *
     * 此选项适用于与使用未加密 HTTP 流量的实时重载服务器配合使用。
     *
     * **此选项不适用于生产环境。**
     *
     * @since 1.5.0