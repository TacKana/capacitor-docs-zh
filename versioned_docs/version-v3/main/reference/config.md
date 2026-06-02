---
title: Capacitor 配置
description: 配置 Capacitor
sidebar_label: 配置
slug: /config
translated: true
---

# Capacitor 配置

Capacitor 配置文件用于设置 Capacitor 工具的高级选项。

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

如果您的项目未使用 TypeScript，可以同样使用 `capacitor.config.json` 文件。

## 配置模式

以下是 Capacitor 配置的 TypeScript 接口，包含完整的说明和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 打包应用的唯一标识符。
   *
   * 在 iOS 中也称为 Bundle ID，在 Android 中称为 Application ID。
   * 必须使用反向域名表示法，通常代表您或您公司拥有的域名。
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 应用的人类可读名称。
   *
   * 这应该是您在 App Store 中看到的名称，但在生成后可以在每个原生平台内更改。
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
   * 是否复制 Capacitor 运行时包。
   *
   * 如果您的应用未使用打包工具，请将其设置为 `true`，然后 Capacitor
   * 将创建一个 `capacitor.js` 文件，您需要将其作为脚本添加到
   * `index.html` 文件中。
   *
   * @since 1.0.0
   * @default false
   */
  bundledWebRuntime?: boolean;

  /**
   * 原生应用定义的构建配置，Capacitor 将根据此配置
   * 向日志系统发送语句。这适用于原生代码中的日志语句
   * 以及从 JavaScript 重定向的语句（`console.debug`、
   * `console.error` 等）。启用日志记录将让语句显示在
   * Xcode 和 Android Studio 窗口中，但如果在发布版本中启用，
   * 可能会在设备上泄露信息。
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
   * 追加到 Capacitor Web View 原始用户代理的字符串。
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
     * 追加到 Android 上 Capacitor Web View 原始用户代理的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用了 `overrideUserAgent`，则忽略此设置。
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
     * 在 Android 的 Capacitor Web View 中启用混合内容。
     *
     * 出于安全考虑，[混合内容](https://developer.mozilla.org/en-US/docs/v3/Web/Security/Mixed_content)
     * 默认是禁用的。在开发过程中，您可能需要
     * 启用它以允许 Web View 从不同协议加载文件。
     *
     * **不适用于生产环境。**
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
     * 来捕获 JS 按键。
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
     * Capacitor 生成日志的构建配置。
     *
     * 覆盖全局 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * `npx cap sync` 期间为 Android 包含的插件白名单。
     *
     * 覆盖全局 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 要使用的 Android 构建变种（flavor）。
     *
     * 如果应用在 `build.gradle` 中声明了构建变种，
     * 请配置要使用 `npx cap run` 命令运行的变种。
     *
     * @since 3.1.0
     */
    flavor?: string;
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
     * 通常这与您在 Xcode 中的应用目标匹配。您可以使用以下命令列出方案：
     *
     * `xcodebuild -workspace ios/App/App.xcworkspace -list`
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
     * 如果使用了 `overrideUserAgent`，则忽略此设置。
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
     * 长按链接时是否允许目标预览。
     *
     * 这将设置 Web View 上的
     * [`allowsLinkPreview`](https://developer.apple.com/documentation/webkit/wkwebview/1415000-allowslinkpreview)
     * 属性，而不是使用默认值。
     *
     * @since 2.0.0
     */
    allowsLinkPreview?: boolean;

    /**
     * Capacitor 生成日志的构建配置。
     *
     * 覆盖全局 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * `npx cap sync` 期间为 iOS 包含的插件白名单。
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
     * 但副作用是，它会阻止导航到 `WKAppBoundDomains` 列表
     * 以外的域名。
     * `localhost`（或配置为 `server.hostname` 的值）也需要
     * 添加到 `WKAppBoundDomains` 列表中。
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;
  };

  server?: {
    /**
     * 配置设备的本地主机名。
     *
     * 建议保持为 `localhost`，因为它允许使用
     * 否则需要[安全上下文](https://developer.mozilla.org/en-US/docs/v3/Web/Security/Secure_Contexts)
     * 的 Web API，例如
     * [`navigator.geolocation`](https://developer.mozilla.org/en-US/docs/v3/Web/API/Navigator/geolocation)
     * 和
     * [`MediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/v3/Web/API/MediaDevices/getUserMedia)。
     *
     * @since 1.0.0
     * @default localhost
     */
    hostname?: string;

    /**
     * 配置 iOS 上的本地协议方案。
     *
     * [不能设置为 WKWebView 已处理的协议方案，如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
     * 这在从
     * [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)
     * 迁移时很有用，该插件在 iOS 上的默认协议方案是 `ionic`。
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;

    /**
     * 配置 Android 上的本地协议方案。
     *
     * @since 1.2.0
     * @default http
     */
    androidScheme?: string;

    /**
     * 在 Web View 中加载外部 URL。
     *
     * 用于配合实时重载服务器使用。
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
     * 用于配合使用未加密 HTTP 流量的实时重载服务器。
     *
     * **不适用于生产环境。**
     *
     * @since 1.5.0
     * @default false
     */
    cleartext?: boolean;

    /**
     * 设置 Web View 可以导航到的其他 URL。
     *
     * 默认情况下，所有外部 URL 都在外部浏览器中打开（而非 Web View 内）。
     *
     * **不适用于生产环境。**
     *
     * @since 1.0.0
     * @default []
     */
    allowNavigation?: string[];
  };

  cordova?: {
    /**
     * 在 config.xml 中填充 <access> 标签，其 origin 设置为
     * 在此处输入的值。
     * 如果未提供，则会包含一个单独的 <access origin="*" /> 标签。
     * 仅对少数遵守白名单的 Cordova 插件有效。
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
   * 这是一个对象，其配置值按插件类名指定。
   *
   * @since 1.0.0
   */
  plugins?: PluginsConfig;

  /**
   * `npx cap sync` 期间包含的插件白名单。
   *
   * 这应该是一个字符串数组，表示运行 `npx cap sync` 时要包含的插件的
   * npm 包名称。如果未设置，Capacitor 将检查 `package.json` 以获取潜在插件列表。
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
}
```

## 环境变量

Capacitor CLI 会自动查找系统中的依赖项。如果您需要配置这些路径，可以使用以下环境变量：

- `CAPACITOR_ANDROID_STUDIO_PATH`：系统上 Android Studio 可执行文件的路径。
- `CAPACITOR_COCOAPODS_PATH`：系统上 `pod` 二进制文件的路径。
