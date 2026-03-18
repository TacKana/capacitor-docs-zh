---
title: Plugin Development Workflow
description: Capacitor 插件开发工作流
contributors:
  - dotNetkow
sidebar_label: 开发工作流
slug: /plugins/workflow
---

# 插件开发工作流

创建好新插件后，您可以开始在各种平台上实现功能。

## 实现新方法

要在插件中实现新功能，首先需要在 `src/definitions.ts` 中为插件导出的 TypeScript 接口定义方法签名。

在下面的示例中，我们添加了接收 `latitude` 和 `longitude` 参数的 `openMap()` 方法。为方法参数定义接口是一个好习惯，这样可以在应用程序中导入和使用。

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;
+  openMap(options: OpenMapOptions): Promise<void>;
 }

+export interface OpenMapOptions {
+  latitude: number;
+  longitude: number;
+}
```

在 `src/web.ts` 中实现 Web 端功能：

```diff
 import type {
   EchoPlugin,
+  OpenMapOptions,
 } from './definitions';

 export class EchoWeb extends WebPlugin implements EchoPlugin {
   // 其他方法

+  async openMap(location: OpenMapOptions): Promise<void> {
+    // 此处实现逻辑
+  }
 }
```

要编译插件，请进入插件目录并运行：

```bash
npm run build
```

在 `android/src/main/[嵌套文件夹]/EchoPlugin.java` 中实现 [Android 功能](./android)：

```java
@PluginMethod()
public void openMap(PluginCall call) {
  Double latitude = call.getDouble("latitude");
  Double longitude = call.getDouble("longitude");

  // 更多逻辑

  call.resolve();
}
```

在 `ios/Sources/EchoPlugin/EchoPlugin.swift` 中实现 [iOS 功能](./ios)：

```swift
@objc func openMap(_ call: CAPPluginCall) {
  let latitude = call.getString("latitude")
  let longitude = call.getNumber("longitude")

  // 更多逻辑

  call.resolve()
}
```

> 记得在 `.swift` 文件中[注册插件方法](/plugins/creating-plugins/ios-guide.md#export-to-capacitor)。

此示例包含了插件中最常见的方法类型，所有支持类型的详细信息[可在此处查看](/plugins/creating-plugins/method-types.md)。

## 本地测试

在开发过程中要本地测试插件，可以使用 `npm install` 并指定插件路径，将插件文件夹链接到您的应用程序。

```bash
npm install ../path/to/echo
```

项目的 `package.json` 文件现在会在依赖项列表中显示插件包的链接：

```json
"echo": "file:../path/to/echo",
```

最后，运行 `npx cap sync` 让原生项目识别您的插件。如果检测正确，它将打印类似以下信息：

```bash
[info] Found 1 Capacitor plugin for android:
    - echo (0.0.1)
```

### 取消链接插件

要从应用程序取消链接本地插件，请使用 `npm uninstall` 并指定插件包名。

```bash
npm uninstall echo
```

## 包脚本

插件模板在 `package.json` 中提供了多种脚本。

- `verify`：构建并测试 Web 和原生代码
- `lint`：检查 Web 和原生代码的代码规范
- `fmt`：自动格式化 Web 和原生代码
- `docgen`：根据插件接口生成文档（参见[文档](#documentation)）
- `build`：将 Web 代码构建为 ESM 和 bundle 分发版本

## 文档

要为插件功能编写文档，请在方法和属性上添加 [JSDoc](https://jsdoc.app) 注释块。

> 在 TypeScript 文件中，通常不需要在 `@param` 和 `@returns` JSDoc 标签中包含类型信息。

以我们的 `openMap()` 方法为例，打开 `src/definitions.ts` 开始编写文档！

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;

+  /**
+   * 在指定位置打开地图。
+   *
+   * @since 1.1.0
+   */
   openMap(options: OpenMapOptions): Promise<void>;
 }

 export interface OpenMapOptions {
+  /**
+   * 要打开地图的纬度坐标。
+   */
   latitude: number;

+  /**
+   * 要打开地图的经度坐标。
+   */
   longitude: number;
 }
```

插件模板内置了 [`@capacitor/docgen`](https://github.com/ionic-team/capacitor-docgen)，它会将生成的文档写入 `README.md`。文档会在 `npm run build` 过程中生成。您也可以手动运行：

```bash
npm run docgen
```

## 发布

当您准备好发布插件时，只需使用：

```bash
npm publish
```

这将构建插件的 JavaScript 部分，并将其余插件文件发布到 npm。

现在，任何 Capacitor 应用程序都可以使用 `npm install echo` 安装您的包。