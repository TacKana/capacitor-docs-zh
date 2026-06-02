---
title: 插件开发工作流
description: Capacitor 插件开发工作流
contributors:
  - dotNetkow
sidebar_label: 开发工作流
slug: /plugins/workflow
---

# 插件开发工作流

创建新插件后，你可以开始在各种平台上实现功能。

## 实现新方法

要在插件中实现新功能，首先在 `src/definitions.ts` 中为插件导出的 TypeScript 接口定义方法的签名。

在下面的示例中，添加了 `openMap()` 方法，它接收 `latitude` 和 `longitude`。最佳实践是为方法参数定义接口，以便在应用中导入和使用。

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

在 `src/web.ts` 中实现 Web 端的实现：

```diff
 import type {
   EchoPlugin,
+  OpenMapOptions,
 } from './definitions';

 export class EchoWeb extends WebPlugin implements EchoPlugin {
   // 其他方法

+  async openMap(location: OpenMapOptions): Promise<void> {
+    // 逻辑代码
+  }
 }
```

要编译插件，进入插件目录然后运行：

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

在 `ios/Plugin/EchoPlugin.swift` 中实现 [iOS 功能](./ios)：

```swift
@objc func openMap(_ call: CAPPluginCall) {
  let latitude = call.getString("latitude")
  let longitude = call.getNumber("longitude")

  // 更多逻辑

  call.resolve()
}
```

> 记得在你的 `.m` 文件中[注册插件方法](/plugins/creating-plugins/ios-guide.md#export-to-capacitor)。

这个示例包含了插件中最常见的方法类型，但所有支持类型的详细信息[可以在这里找到](/plugins/creating-plugins/method-types.md)。

## 本地测试

要在开发过程中本地测试插件，使用 `npm install` 加上插件路径将插件文件夹链接到你的应用。

```bash
npm install ../path/to/echo
```

项目的 `package.json` 文件现在会在依赖列表中显示插件包的链接：

```json
"echo": "file:../path/to/echo",
```

最后，运行 `npx cap sync` 让原生项目识别你的插件。如果正确检测到，它将打印类似以下的信息：

```bash
[info] Found 1 Capacitor plugin for android:
    - echo (0.0.1)
```

### 取消链接插件

要取消本地插件与应用的链接，使用 `npm uninstall` 加上插件的包名。

```bash
npm uninstall echo
```

## 包脚本

插件模板在 `package.json` 中提供了多种脚本。

- `verify`：构建并测试 Web 和原生代码
- `lint`：检查 Web 和原生代码的格式
- `fmt`：自动格式化 Web 和原生代码
- `docgen`：从插件接口生成文档（参见[文档](#documentation)）
- `build`：将 Web 代码构建为 ESM 和打包分发版本

## 文档

要为插件功能编写文档，请在方法和属性上添加 [JSDoc](https://jsdoc.app) 注释块。

> 通常不需要在 TypeScript 文件中使用 `@param` 和 `@returns` JSDoc 标签包含类型信息。

以我们的 `openMap()` 方法为例，打开 `src/definitions.ts` 并开始记录文档吧！

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
+   * 打开地图的纬度。
+   */
   latitude: number;

+  /**
+   * 打开地图的经度。
+   */
   longitude: number;
 }
```

插件模板附带 [`@capacitor/docgen`](https://github.com/ionic-team/capacitor-docgen)，它会将生成的文档写入 `README.md`。文档在 `npm run build` 期间生成。你也可以手动运行它：

```bash
npm run docgen
```

## 发布

当你准备好发布插件时，只需使用：

```bash
npm publish
```

这将构建插件的 JS 部分，并将插件文件的其余部分发布到 npm。

现在你的包可以使用 `npm install echo` 在任何 Capacitor 应用中安装了。
