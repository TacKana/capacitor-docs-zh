---
title: 插件开发工作流
description: Capacitor 插件开发工作流程
contributors:
  - dotNetkow
sidebar_label: 开发工作流
slug: /plugins/workflow
---

# 插件开发工作流

创建新插件后，您可以开始为不同平台实现功能。

## 实现新方法

要在插件中添加新功能，首先需要在 `src/definitions.ts` 中为您的插件定义 TypeScript 接口方法签名。

以下示例添加了接收 `latitude` 和 `longitude` 参数的 `openMap()` 方法。最佳实践是为方法参数定义可被应用导入使用的接口。

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

在 `src/web.ts` 中实现网页端功能：

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

编译插件，进入插件目录后运行：

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

在 `ios/Sources/EchoPlugin/EchoPlugin.swift` 中实现 [iOS 功能](./ios)：

```swift
@objc func openMap(_ call: CAPPluginCall) {
  let latitude = call.getString("latitude")
  let longitude = call.getNumber("longitude")

  // 更多逻辑

  call.resolve()
}
```

> 记得在 `.swift` 文件中 [注册插件方法](/plugins/creating-plugins/ios-guide.md#export-to-capacitor)

此示例包含插件中最常见的方法类型，所有支持类型的详细信息 [可在此查看](/plugins/creating-plugins/method-types.md)

## 本地测试

开发时如需本地测试插件，可使用 `npm install` 将插件文件夹链接到您的应用：

```bash
npm install ../path/to/echo
```

项目的 `package.json` 文件会在依赖项列表中显示插件包链接：

```json
"echo": "file:../path/to/echo",
```

最后运行 `npx cap sync` 让原生项目识别您的插件。若检测成功，将输出类似信息：

```bash
[info] 发现 1 个 Android 版 Capacitor 插件：
    - echo (0.0.1)
```

### 解除链接

要从应用中解除本地插件链接，使用插件包名运行 `npm uninstall`：

```bash
npm uninstall echo
```

## 包脚本

插件模板在 `package.json` 中提供多种脚本：

- `verify`：构建并测试网页和原生代码
- `lint`：检查网页和原生代码规范
- `fmt`：自动格式化网页和原生代码
- `docgen`：从插件接口生成文档（参见[文档](#文档)）
- `build`：将网页代码构建为 ESM 和 bundle 分发版

## 文档

要为插件功能添加文档，请在方法和属性前添加 [JSDoc](https://jsdoc.app) 注释块。

> 在 TypeScript 文件中通常不需要使用 `@param` 和 `@returns` 标签包含类型信息。

以 `openMap()` 方法为例，打开 `src/definitions.ts` 开始编写文档：

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;

+  /**
+   * 在指定位置打开地图
+   *
+   * @since 1.1.0
+   */
   openMap(options: OpenMapOptions): Promise<void>;
 }

 export interface OpenMapOptions {
+  /**
+   * 地图打开的纬度坐标
+   */
   latitude: number;

+  /**
+   * 地图打开的经度坐标
+   */
   longitude: number;
 }
```

插件模板内置 [`@capacitor/docgen`](https://github.com/ionic-team/capacitor-docgen)，可将生成的文档写入 `README.md`。文档在 `npm run build` 时自动生成，也可手动运行：

```bash
npm run docgen
```

## 发布

准备好发布插件时，只需运行：

```bash
npm publish
```

这将构建插件的 JS 部分，并将其余文件发布到 npm。

现在任何 Capacitor 应用都可以通过 `npm install echo` 安装您的插件包。