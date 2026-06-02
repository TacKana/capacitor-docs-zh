---
title: 插件开发工作流
description: Capacitor 插件开发工作流
translated: true
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins/workflow
---

# 插件开发工作流

创建新插件后，你就可以开始跨多个平台实现功能了。

## 实现新功能

每个插件都附带一些 TypeScript 文件，为插件的 TypeScript 使用者提供类型定义。

从 TypeScript 接口开始是构建插件 API 的好方法。例如，以下是位于 `src/definitions.ts` 中的插件默认接口：

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

要在插件中实现新功能，首先在导出接口中定义一个新函数：

```typescript
export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  openMap(location: { latitude: number; longitude: number }): Promise<void>;
}
```

在 `src/web.ts` 中实现 Web 端功能：

```typescript
async openMap(location: { latitude: number, longitude: number}): Promise<void> {
  // 此处编写逻辑
}
```

要编译插件，进入插件目录然后运行：

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

> 记得在 [iOS](/plugins/ios.md#导出到-capacitor) 和 [Android](/plugins/android.md#导出到-capacitor) 上将插件导出到 Capacitor（使其被 Capacitor 识别）。

## 本地测试

要在开发过程中在本地测试插件，可以使用 [npm link 命令](https://docs.npmjs.com/cli/link) 将插件文件夹链接到你的应用项目。

首先，在插件文件夹中运行：

```bash
$ npm link
```

然后，在将要测试插件的项目中运行：

```bash
$ npm link plugin-name
$ npm install plugin-name
```

项目的 `package.json` 文件现在会在依赖列表中显示插件包的链接：

```json
"my-plugin": "file:my-plugin",
```

最后，运行 `npx cap sync` 使原生项目识别你的插件。如果正确检测到，它会打印类似以下的信息：

> Found 1 Capacitor plugin for android: my-plugin (0.0.1)

### 取消链接插件

完成本地测试后，请务必取消链接插件。否则，后续的 `npm install` 将安装本地插件，而不是 npm 上已发布的版本（假设你已发布）。

首先，在应用项目文件夹中运行 `npm unlink --no-save plugin-name`。

然后，在插件文件夹中运行 `npm unlink`。

## 发布

当你准备好发布插件时，只需使用：

```bash
npm publish
```

这将构建插件的 JS 部分，并将插件的其余文件发布到 npm。

现在，任何 Capacitor 应用都可以使用 `npm install your-plugin` 安装你的包。
