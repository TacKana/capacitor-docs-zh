---
title: 构建您的应用
description: 构建您的应用
contributors:
  - dotNetkow
  - mlynch
---

# 构建您的应用

Capacitor 遵循三步构建流程：首先，您的 Web 代码会被构建（如果需要）。接着，构建好的 Web 代码会被复制到各个平台。最后，应用会使用特定平台的工具链进行编译。

## 1. 构建 Web 代码

Capacitor 本身不提供构建 Web 代码的内置功能。您需要使用所选框架的构建流程。

无论使用哪种构建流程，我们都建议在 `package.json` 中添加一个 `build` 脚本，以便使用标准的前端构建命令：

```json
{
  "scripts": {
    "build": "构建命令（例如：webpack、tsc、babel 等）"
  }
}
```

```bash
npm run build
```

如果您已配置 [渐进式 Web 应用](./progressive-web-app.md) 支持，此命令将构建您的渐进式 Web 应用。

## 2. 复制 Web 代码

Web 代码构建完成后，需要复制到各个原生项目中：

```bash
npx cap copy
```

每次执行构建后都请运行此命令，并考虑将其添加到 `package.json` 中构建脚本的末尾。

## 3. 构建原生项目

### iOS

iOS 依赖 Xcode 完成最终的应用编译：

```bash
npx cap copy ios
npx cap open ios
```

Xcode 启动后，您可以通过标准的 Xcode 工作流程来构建应用二进制文件。

### Android

Android 依赖 Android Studio（或者，可选地，使用 Android CLI 工具）来构建应用：

```bash
npx cap copy android
npx cap open android
```

Android Studio 启动后，您可以通过标准的 Android Studio 工作流程来构建应用。