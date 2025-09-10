---
title: 插件开发工作流程
description: Capacitor 插件开发工作流程
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins/workflow
---

# 插件开发工作流程

创建新插件后，您可以开始为多种平台实现功能。

## 实现新功能

每个插件都包含一些 TypeScript 文件，为插件的 TypeScript 使用者提供类型支持。

从 TypeScript 接口开始是构建插件 API 的好方法。例如，这是我们插件在 `src/definitions.ts` 中的默认接口：

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

要在插件中实现新功能，首先在导出的接口中定义新函数：

```typescript
export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  openMap(location: { latitude: number; longitude: number }): Promise<void>;
}
```

在 `src/web.ts` 中实现网页端功能：

```typescript
async openMap(location: { latitude: number, longitude: number}): Promise<void> {
  // 此处添加逻辑
}
```

要编译插件，请进入插件目录并运行：

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

> 记得在 [iOS](/plugins/ios.md#export-to-capacitor) 和 [Android](/plugins/android.md#export-to-capacitor) 上将插件导出到 Capacitor（使其感知该插件）。

## 本地测试

开发过程中要本地测试插件，可以使用 [npm link 命令](https://docs.npmjs.com/cli/link) 将插件文件夹链接到应用项目。

首先，在插件文件夹内运行：

```bash
$ npm link
```

然后，在要测试插件的项目中运行：

```bash
$ npm link plugin-name
$ npm install plugin-name
```

项目的 `package.json` 文件现在会在依赖项列表中显示插件包的链接：

```json
"my-plugin": "file:my-plugin",
```

最后运行 `npx cap sync` 让原生项目识别您的插件。如果检测成功，会输出类似以下内容：

> 为 android 找到 1 个 Capacitor 插件：my-plugin (0.0.1)

### 解除插件链接

完成本地测试后，务必解除插件链接。否则后续的 `npm install` 会安装本地插件，而不是 npm 上发布的版本（假设您已发布）。

首先，在应用项目文件夹中运行 `npm unlink --no-save plugin-name`。

接着，在插件文件夹中运行 `npm unlink`。

## 发布

准备好发布插件时，只需使用：

```bash
npm publish
```

这将构建插件的 JS 部分，并将其余插件文件发布到 npm。

现在任何 Capacitor 应用都可以通过 `npm install your-plugin` 安装您的包了。