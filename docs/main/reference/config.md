---
title: Capacitor 配置
description: 配置 Capacitor
sidebar_label: 配置
slug: /config
---

# Capacitor 配置

Capacitor 配置文件用于设置 Capacitor 工具链的高级选项。

## 示例配置

以下是一个典型的 `capacitor.config.ts` 文件示例：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.company.appname',
  appName: 'My Capacitor App',
  webDir: 'www',
};

export default config;
```

如果你的项目未使用 TypeScript，可以使用相同格式的 `capacitor.config.json` 文件。

## 配置结构

以下是完整的 Capacitor 配置 TypeScript 接口定义，包含详细说明和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 应用程序的唯一标识符
   *
   * 在 iOS 中称为 Bundle ID，Android 中称为 Application ID
   * 必须采用反向域名表示法，通常使用你或公司拥有的域名
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的用户友好名称
   *
   * 这将是应用商店显示的名称，生成后可在各平台单独修改
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 编译后 web 资源的目录
   *
   * 该目录应包含应用的最终 `index.html` 文件
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * 定义原生应用中 Capacitor 的日志输出级别
   * 适用于原生代码日志和从 JavaScript 重定向的日志（如 `console.debug`、`console.error` 等）
   * 启用日志会在 Xcode 和 Android Studio 窗口中显示日志，但如果在发布版本中启用可能会泄露设备信息
   *
   * 'none' = 不产生日志
   * 'debug' = 仅调试构建产生日志
   * 'production' = 始终产生日志
   *
   * @since 3.0.0
   * @default debug
   */
  loggingBehavior?: 'none' | 'debug' | 'production';

  /**
   * 覆盖 Capacitor Web View 的用户代理字符串
   *
   * @since 1.4.0
   */
  overrideUserAgent?: string;

  /**
   * 在原有用户代理后追加字符串
   *
   * 如果设置了 `overrideUserAgent` 则此配置无效
   *
   * @since 1.4.0
   */
  appendUserAgent?: string;

  /**
   * Web View 的背景色
   *
   * @since 1.1.0
   */
  backgroundColor?: string;

  /**
   * 是否启用 Web View 缩放功能
   *
   * @default false
   * @since 6.0.0
   */
  zoomEnabled?: boolean;

  /**
   * 是否让 Web View 初始获得焦点
   *
   * @since 7.0.0
   * @default true
   */
  initialFocus?: boolean;

  android?: {
    /**
     * 自定义 Android 原生项目路径
     *
     * @since 3.0.0
     * @default android
     */
    path?: string;

    /**
     * Android 平台特定的用户代理覆盖
     *
     * 会覆盖全局的 `overrideUserAgent` 设置
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * Android 平台特定的用户代理追加
     *
     * 会覆盖全局的 `appendUserAgent` 设置
     * 如果设置了 `overrideUserAgent` 则此配置无效
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * Android 平台特定的背景色
     *
     * 会覆盖全局的 `backgroundColor` 设置
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * Android 平台是否启用缩放
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 是否允许 Android Web View 加载混合内容
     *
     * 出于安全考虑默认禁用混合内容。
     * 开发时可能需要启用以允许加载不同协议的文件
     *
     * **切勿在生产环境中使用**
     *
     * @since 1.0.0
     * @default false
     */
    allowMixedContent?: boolean;

    /**
     * 启用简化版键盘（可能有功能限制）
     *
     * 使用替代的 [`InputConnection`](https://developer.android.com/reference/android/view/inputmethod/InputConnection) 捕获按键
     *
     * @since 1.0.0
     * @default false
     */
    captureInput?: boolean;

    /**
     * 始终启用 Web 内容调试
     *
     * 开发环境下会自动启用
     *
     * @since 1.0.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * Android 平台的日志级别
     *
     * 覆盖全局的 `loggingBehavior` 设置
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * Android 平台同步时包含的插件白名单
     *
     * 覆盖全局的 `includePlugins` 设置
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 使用的 Android 构建变体
     *
     * 如果 `build.gradle` 中声明了多种 flavor
     * 可通过此配置指定 `npx cap run` 命令运行的 flavor
     *
     * @since 3.1.0
     */
    flavor?: string;

    /**
     * Android 平台是否初始获得焦点
     *
     * 覆盖全局的 `initialFocus` 设置
     *
     * @since 3.5.1
     * @default true
     */
    initialFocus?: boolean;

    /**
     * 应用支持的最低 Android WebView 版本
     *
     * 最低不能低于 55（Capacitor 要求的最低版本）
     * 如果设备 WebView 版本过低，会在 Logcat 显示错误消息
     * 如果配置了 `server.errorPath`，WebView 会重定向到该文件显示自定义错误
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

    /**
     * 应用支持的最低华为 WebView 版本
     *
     * 最低不能低于 10（Capacitor 要求的最低版本）
     * 如果设备 WebView 版本过低，会在 Logcat 显示错误消息
     * 如果配置了 `server.errorPath`，WebView 会重定向到该文件显示自定义错误
     *
     * @since 4.6.4
     * @default 10
     */
    minHuaweiWebViewVersion?: number;

    buildOptions?: {
      /**
       * 签名密钥库路径
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
       * 使用的密钥别名
       *
       * @since 4.4.0
       */
      keystoreAlias?: string;

      /**
       * 密钥别名密码
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
       * 构建签名工具
       *
       * @since 5.1.0
       * @default "jarsigner"
       */
      signingType?: 'apksigner' | 'jarsigner';
    };

    /**
     * 使用旧版 [addJavascriptInterface](https://developer.android.com/reference/android/webkit/WebView#addJavascriptInterface(java.lang.Object,%20java.lang.String))
     * 而非新版更安全的 [addWebMessageListener](https://developer.android.com/reference/androidx/webkit/WebViewCompat#addWebMessageListener(android.webkit.WebView,java.lang.String,java.util.Set%3Cjava.lang.String%3E,androidx.webkit.WebViewCompat.WebMessageListener))
     *
     * @since 4.5.0
     * @default false
     */
    useLegacyBridge?: boolean;

    /**
     * 是否让 Service Worker 请求通过 Capacitor 桥接
     * 设为 false 可使用自定义处理
     *
     * @since 7.0.0
     * @default true
     */
    resolveServiceWorkerRequests?: boolean;

    /**
     * 边缘到边缘显示的边距调整策略
     * "force" = 强制调整边距
     * "auto" = 检查 Android 15 和 [windowOptOutEdgeToEdgeEnforcement](https://developer.android.com/reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement) 设置
     * "disable" = 不调整边距
     * Capacitor 8 中将默认改为 'auto'
     *
     * @since 7.1.0
     * @default disable
     */
    adjustMarginsForEdgeToEdge?: 'auto' | 'force' | 'disable';
  };

  ios?: {
    /**
     * 自定义 iOS 原生项目路径
     *
     * @since 3.0.0
     * @default ios
     */
    path?: string;

    /**
     * iOS 构建方案名称
     *
     * 通常与 Xcode 中的 target 名称匹配
     * 可以用以下命令列出所有方案：
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
     * iOS 平台特定的用户代理覆盖
     *
     * 覆盖全局的 `overrideUserAgent` 设置
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * iOS 平台特定的用户代理追加
     *
     * 覆盖全局的 `appendUserAgent` 设置
     * 如果设置了 `overrideUserAgent` 则此配置无效
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * iOS 平台特定的背景色
     *
     * 覆盖全局的 `backgroundColor` 设置
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * iOS 平台是否启用缩放
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 配置滚动视图的内容插入调整行为
     *
     * 设置 Web View 的 [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview)
     * 的 [`contentInsetAdjustmentBehavior`](https://developer.apple.com/documentation/uikit/uiscrollview/2902261-contentinsetadjustmentbehavior) 属性
     *
     * @since 2.0.0
     * @default never
     */
    contentInset?: 'automatic' | 'scrollableAxes' | 'never' | 'always';

    /**
     * 配置滚动视图是否可滚动
     *
     * 设置 Web View 的 [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview)
     * 的 [`isScrollEnabled`](https://developer.apple.com/documentation/uikit/uiscrollview/1619395-isscrollenabled) 属性
     *
     * @since 1.0.0
     */
    scrollEnabled?: boolean;

    /**
     * 配置 Cordova 插件编译时的链接器标志
     *
     * @since 1.0.0
     * @default []
     */
    cordovaLinkerFlags?: string[];

    /**
     * 是否允许链接预览
     *
     * 设置 Web View 的 [`allowsLinkPreview`](https://developer.apple.com/documentation/webkit/wkwebview/1415000-allowslinkpreview) 属性
     *
     * @since 2.0.0
     */
    allowsLinkPreview?: boolean;

    /**
     * iOS 平台的日志级别
     *
     * 覆盖全局的 `loggingBehavior` 设置
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * iOS 平台同步时包含的插件白名单
     *
     * 覆盖全局的 `includePlugins` 设置
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 设置 WKWebView 的 limitsNavigationsToAppBoundDomains 配置
     *
     * 如果 Info.plist 包含 `WKAppBoundDomains` 键，建议设为 true
     * 但副作用是会阻止导航到 `WKAppBoundDomains` 列表之外的域名
     * `localhost`（或 `server.hostname` 配置的值）也需要添加到 `WKAppBoundDomains` 列表
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;

    /**
     * Web View 加载和渲染内容时使用的内容模式
     *
     * - 'recommended': 适合当前设备的模式
     * - 'desktop': 桌面体验模式
     * - 'mobile': 移动体验模式
     *
     * @since 4.0.0
     * @default recommended
     */
    preferredContentMode?: 'recommended' | 'desktop' | 'mobile';

    /**
     * 是否让 Capacitor 处理本地/推送通知
     * 设为 false 可使用自定义的 UNUserNotificationCenter 处理通知
     *
     * @since 4.5.0
     * @default true
     */
    handleApplicationNotifications?: boolean;

    /**
     * 在 Xcode 14.3+ 和 iOS 16.4+ 上，为发布构建启用 Web 内容调试
     *
     * 未设置时，开发构建默认为 true
     *
     * @since 4.8.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * iOS 平台是否初始获得焦点
     *
     * 覆盖全局的 `initialFocus` 设置
     *
     * @since 7.0.0
     * @default true
     */
    initialFocus?: boolean;

    buildOptions?: {
      /**
       * 发布构建的签名方式
       *
       * @since 7.0.0
       * @default 'automatic'
       */
      signingStyle?: 'automatic' | 'manual';
      /**
       * xcodebuild 导出归档的方法
       *
       * @since 7.0.0
       * @default 'app-store-connect'
       */
      exportMethod?: string;
      /**
       * iOS 构建签名证书（名称、SHA-1 哈希或自动选择器）
       *
       * @since 7.0.0
       */
      signingCertificate?: string;
      /**
       * iOS 构建使用的描述文件（名称或 UUID）
       *
       * @since 7.0.0
       */
      provisioningProfile?: string;
    };
  };

  server?: {
    /**
     * 配置设备的本地主机名
     *
     * 建议保持为 `localhost`，这样可以启用需要[安全上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)的
     * Web API，如 [`navigator.geolocation`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)
     * 和 [`MediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
     *
     * @since 1.0.0
     * @default localhost
     */
    hostname?: string;

    /**
     * 配置 iOS 平台的本地协议
     *
     * [不能设置为 WKWebView 已处理的协议，如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
     * 从 [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview) 迁移时有用，
     * 因为该插件在 iOS 上的默认协议是 `ionic`
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;

    /**
     * 配置 Android 平台的本地协议
     *
     * Webview 117 开始，自定义协议无法修改 URL 路径。改为非 `http` 或 `https` 可能导致路由解析问题。
     * 如需修改，建议使用基于 hash 的 URL 策略，但不能保证长期兼容性
     * 详细信息：https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117
     *
     * @since 1.2.0
     * @default https
     */
    androidScheme?: string;

    /**
     * 在 Web View 中加载外部 URL
