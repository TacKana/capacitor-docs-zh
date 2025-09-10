---
title: 构建你的应用
description: 构建你的应用
contributors:
  - dotNetkow
  - mlynch
---

# 构建你的应用

Capacitor 采用三步构建流程：首先，构建你的 Web 代码（如果需要）。接着，将构建好的 Web 代码复制到各个平台。最后，使用平台特定的工具编译应用。

## 1. 构建 Web 代码

Capacitor 没有内置的 Web 代码构建功能。你需要使用所选框架的构建流程。

无论采用何种构建流程，我们建议在 `package.json` 中添加 `build` 脚本，以便使用标准的前端构建命令：

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

如果你已经配置了 [渐进式 Web 应用](./progressive-web-app.md) 支持，这将构建你的渐进式 Web 应用。

## 2. 复制 Web 代码

Web 代码构建完成后，需要将其复制到各个原生项目中：

```bash
npx cap copy
```

每次执行构建后运行此命令，并考虑将其添加到 `package.json` 构建脚本的末尾。

## 3. 构建原生项目

### iOS

iOS 依赖 Xcode 完成最终的应用编译：

```bash
npx cap copy ios
npx cap open ios
```

Xcode 启动后，你可以通过标准的 Xcode 工作流程构建应用二进制文件。

### Android

Android 依赖 Android Studio（或者可选地使用 Android CLI 工具）来构建应用：

```bash
npx cap copy android
npx cap open android
```

Android Studio 启动后，你可以通过标准的 Android Studio 工作流程构建应用。