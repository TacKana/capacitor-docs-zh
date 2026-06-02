---
title: 构建您的应用
description: 构建您的应用
contributors:
  - dotNetkow
  - mlynch
---

# 构建您的应用

Capacitor 采用三步构建流程：首先，构建您的 web 代码（如果需要）。接下来，将构建好的 web 代码复制到每个平台。最后，使用特定于平台的工具编译应用。

## 1. 构建 web 代码

Capacitor 没有任何内置功能来构建 web 代码。相反，您将使用您选择的框架的构建流程。

无论您使用何种构建流程，我们建议在 `package.json` 中添加一个 `build` 脚本，以启用标准的前端构建命令：

```json
{
  "scripts": {
    "build": "构建命令（例如：webpack, tsc, babel 等）"
  }
}
```

```bash
npm run build
```

如果您已经配置了 [Progressive Web App](./progressive-web-app.md) 支持，这将构建您的 Progressive Web App。

## 2. 复制 Web 代码

web 代码构建完成后，需要将其复制到每个原生项目中：

```bash
npx cap copy
```

每次执行构建时运行此命令，并考虑将其添加到 `package.json` 中构建脚本的末尾。

## 3. 构建原生项目

### iOS

iOS 依赖 Xcode 来完成最终的应用编译：

```bash
npx cap copy ios
npx cap open ios
```

Xcode 启动后，您可以通过标准的 Xcode 工作流构建应用二进制文件。

### Android

Android 依赖 Android Studio（或者，可选地使用 Android CLI 工具）来构建应用：

```bash
npx cap copy android
npx cap open android
```

Android Studio 启动后，您可以通过标准的 Android Studio 工作流构建您的应用。