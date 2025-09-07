---
title: 插件开发工作流
description: Capacitor 插件开发工作流程
contributors:
  - dotNetkow
sidebar_label: 开发工作流
slug: /plugins/workflow
---

# 插件开发工作流

创建新插件后，您可以开始在各种平台上实现功能。

## 实现新方法

要在插件中实现新功能，首先需要在 `src/definitions.ts` 中为您的插件导出的 TypeScript 接口定义方法签名。

在下面的示例中，添加了 `openMap()` 方法，该方法接受 `latitude` 和 `longitude`。为方法参数定义可在应用中导入和使用的接口是一种良好实践。

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

在 `src/web.ts` 中实现 Web 实现：

```diff
 import type {
   EchoPlugin,
+  OpenMapOptions,
 } from './definitions';

 export class EchoWeb extends WebPlugin implements EchoPlugin {
   // 其他方法

+  async openMap(location: OpenMapOptions): Promise<void> {
+    // 在此处添加逻辑
+  }
 }
```

要编译插件，请导航到插件目录，然后运行：

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

> 记得在您的 `.swift` 文件中[注册插件方法](/plugins/creating-plugins/ios-guide.md#export-to-capacitor)。

此示例包含插件中最常见的方法类型，但有关所有支持类型的详细信息[可以在此处找到](/plugins/creating-plugins/method-types.md)。

## 本地测试

要在开发插件时进行本地测试，请使用 `npm install` 将插件文件夹链接到您的应用，并指定插件路径。

```bash
npm install ../path/to/echo
```

项目的 `package.json` 文件现在会在依赖项列表中显示插件包链接：

```json
"echo": "file:../path/to/echo",
```

最后，运行 `npx cap sync` 以使原生项目识别您的插件。如果检测正确，它将打印类似以下内容：

```bash
[info] 为 android 找到 1 个 Capacitor 插件：
    - echo (0.0.1)
```

### 取消链接插件

要从应用中取消链接本地插件，请使用 `npm uninstall` 并指定插件包名。

```bash
npm uninstall echo
```

## 包脚本

插件模板在 `package.json` 中提供了多种脚本。

- `verify`: 构建并测试 Web 和原生代码
- `lint`: 对 Web 和原生代码进行 lint 检查
- `fmt`: 自动格式化 Web 和原生代码
- `docgen`: 从插件接口生成文档（参见[文档](#文档)）
- `build`: 将 Web 代码构建为 ESM 和 bundle 分发版本

## 文档

要记录插件功能，请为方法和属性添加 [JSDoc](https://jsdoc.app) 注释块。

> 在 TypeScript 文件中，通常不需要使用 `@param` 和 `@returns` JSDoc 标签包含类型信息。

以我们的 `openMap()` 方法为例，打开 `src/definitions.ts` 并开始编写文档！

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;

+  /**
+   * 在给定位置打开地图。
+   *
+   * @since 1.1.0
+   */
   openMap(options: OpenMapOptions): Promise<void>;
 }

 export interface OpenMapOptions {
+  /**
+   * 打开地图的纬度。
+   */
   latitude: number;

+  /**
+   * 打开地图的经度。
+   */
   longitude: number;
 }
```

插件模板附带 [`@capacitor/docgen`](https://github.com/ionic-team/capacitor-docgen)，它会将生成的文档写入 `README.md`。文档在 `npm run build` 期间生成。您也可以手动运行它：

```bash
npm run docgen
```

## 发布

当您准备好发布插件时，只需使用：

```bash
npm publish
```

这将构建插件的 JS 部分，并将其余插件文件发布到 npm。

现在，您的包可以在任何 Capacitor 应用中使用 `npm install echo` 进行安装。