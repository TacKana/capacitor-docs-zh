---
title: 插件开发工作流
description: Capacitor 插件开发工作流程
contributors:
  - dotNetkow
sidebar_label: 开发工作流
slug: /plugins/workflow
---

# 插件开发工作流

创建新插件后，您可以开始为多种平台实现功能。

## 实现新方法

要在插件中添加新功能，首先需要在 `src/definitions.ts` 中为导出的 TypeScript 接口定义方法签名。

以下示例添加了 `openMap()` 方法，该方法接收 `latitude`（纬度）和 `longitude`（经度）。最佳实践是为方法参数定义接口，以便在应用中可以导入和使用。

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

在 `src/web.ts` 中实现 Web 端代码：

```diff
 import type {
   EchoPlugin,
+  OpenMapOptions,
 } from './definitions';

 export class EchoWeb extends WebPlugin implements EchoPlugin {
   // 其他方法

+  async openMap(location: OpenMapOptions): Promise<void> {
+    // 实现逻辑
+  }
 }
```

要编译插件，进入插件目录后运行：

```bash
npm run build
```

在 `android/src/main/[嵌套目录]/EchoPlugin.java` 中实现 [Android 功能](./android)：

```java
@PluginMethod()
public void openMap(PluginCall call) {
  Double latitude = call.getDouble("latitude");
  Double longitude = call.getDouble("longitude");

  // 更多逻辑

  call.resolve();
}
```

在 `ios/Plugin/EchoPlugin.swift` 中实现 [iOS 功能](./ios)：

```swift
@objc func openMap(_ call: CAPPluginCall) {
  let latitude = call.getString("latitude")
  let longitude = call.getNumber("longitude")

  // 更多逻辑

  call.resolve()
}
```

> 记得在 `.m` 文件中 [注册插件方法](/plugins/creating-plugins/ios-guide.md#export-to-capacitor)。

此示例展示了插件中最常见的方法类型，关于所有支持类型的详细信息 [可在此查看](/plugins/creating-plugins/method-types.md)。

## 本地测试

要在开发过程中本地测试插件，可以使用 `npm install` 将插件文件夹链接到您的应用：

```bash
npm install ../path/to/echo
```

项目 `package.json` 文件现在会在依赖项列表中显示插件包链接：

```json
"echo": "file:../path/to/echo",
```

最后运行 `npx cap sync` 让原生项目识别您的插件。如果检测成功，将输出类似以下内容：

```bash
[info] Found 1 Capacitor plugin for android:
    - echo (0.0.1)
```

### 解除插件链接

要从应用中解除本地插件的链接，使用 `npm uninstall` 加上插件包名：

```bash
npm uninstall echo
```

## 打包脚本

插件模板在 `package.json` 中提供了多种脚本：

- `verify`：构建并测试 Web 和原生代码
- `lint`：检查 Web 和原生代码规范
- `fmt`：自动格式化 Web 和原生代码
- `docgen`：从插件接口生成文档（参见 [文档](#文档)）
- `build`：将 Web 代码构建为 ESM 和 bundle 分发版本

## 文档

要为插件功能添加文档，请在方法和属性上添加 [JSDoc](https://jsdoc.app) 注释块。

> 在 TypeScript 文件中通常不需要使用 `@param` 和 `@returns` JSDoc 标签包含类型信息。

以我们的 `openMap()` 方法为例，打开 `src/definitions.ts` 开始编写文档：

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
+   * 打开地图的纬度坐标。
+   */
   latitude: number;

+  /**
+   * 打开地图的经度坐标。
+   */
   longitude: number;
 }
```

插件模板内置了 [`@capacitor/docgen`](https://github.com/ionic-team/capacitor-docgen)，可将生成的文档写入 `README.md`。文档会在 `npm run build` 时自动生成，也可以手动运行：

```bash
npm run docgen
```

## 发布

准备发布插件时，只需运行：

```bash
npm publish
```

这将构建插件的 JS 部分，并将其余文件发布到 npm。

现在任何 Capacitor 应用都可以通过 `npm install echo` 安装您的包。