---
title: 插件开发工作流程
description: Capacitor 插件开发工作流程
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins/workflow
---

# 插件开发工作流程

创建新插件后，你可以开始为各种平台实现功能。

## 实现新功能

每个插件都附带一些 TypeScript 文件，为 TypeScript 用户提供类型支持。

从 TypeScript 接口开始是构建插件 API 的好方法。例如，这是位于 `src/definitions.ts` 中我们插件的默认接口：

```typescript
declare module '@capacitor/core' {
  interface PluginRegistry {
    Echo: EchoPlugin;
  }
}

export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
```

要在插件中实现新功能，首先在导出的接口中定义一个新函数：

```typescript
export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  openMap(location: { latitude: number; longitude: number }): Promise<void>;
}
```

在 `src/web.ts` 中实现 Web 端功能：

```typescript
async openMap(location: { latitude: number, longitude: number}): Promise<void> {
  // 此处添加逻辑
}
```

要编译插件，请进入插件目录然后运行：

```bash
$ npm run build
```

在 `android/src/main/[嵌套文件夹]/PluginName.java` 中实现 [Android 功能](./android)：

```java
@PluginMethod()
public void openMap(PluginCall call) {
  Double latitude = call.getDouble("latitude");
  Double longitude = call.getDouble("longitude");

  // 更多逻辑
}
```

在 `ios/Plugin/Plugin.swift` 中实现 [iOS 功能](./ios)：

```swift
@objc func openMap(_ call: CAPPluginCall) {
  let latitude = call.getString("latitude")
  let longitude = call.getNumber("longitude")

  // 更多逻辑
}
```

> 记得在 [iOS](/plugins/ios.md#export-to-capacitor) 和 [Android](/plugins/android.md#export-to-capacitor) 上将插件导出到 Capacitor（使其能够识别该插件）。

## 本地测试

在开发过程中要在本地测试插件，可以使用 [npm link 命令](https://docs.npmjs.com/cli/link) 将插件文件夹链接到你的应用项目。

首先，在插件文件夹内运行：

```bash
$ npm link
```

然后，在将测试该插件的项目内运行：

```bash
$ npm link plugin-name
$ npm install plugin-name
```

现在项目的 `package.json` 文件会在依赖项列表中显示插件包的链接：

```json
"my-plugin": "file:my-plugin",
```

最后，运行 `npx cap sync` 让原生项目识别你的插件。如果检测正确，它会打印类似以下内容：

> 为 android 找到 1 个 Capacitor 插件：my-plugin (0.0.1)

### 取消链接插件

完成本地测试后，请务必取消链接插件。否则，后续的 `npm install` 会安装本地插件，而不是 npm 上发布的版本（假设你已发布）。

首先，在应用项目文件夹中运行 `npm unlink --no-save plugin-name`。

接着，在插件文件夹中运行 `npm unlink`。

## 发布

准备好发布插件时，只需使用：

```bash
npm publish
```

这将构建插件的 JS 部分，并将插件其余文件发布到 npm。

现在你的包可以在任何 Capacitor 应用中使用 `npm install your-plugin` 安装。