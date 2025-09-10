---
title: Development Workflow
description: Capacitor 工作流程
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/basics/workflow
---

# Capacitor 工作流程

Capacitor 的工作流程主要包含以下几个常规任务：

## 1. 开发并构建 Web 应用

Capacitor 会将您的 Web 应用转换为各平台的原生应用包。因此，大部分工作将围绕开发并构建适合移动端的 Web 应用展开。

您可以通过以下方式与底层原生平台交互：
- 使用 Capacitor 原生插件（如[相机插件](/apis/camera.md)）
- 通过 Capacitor 的[Cordova 兼容层](/cordova/index.md)使用现有 Cordova 插件

最后使用以下命令构建应用：
```bash
npm run build
```

如果使用前端框架，请遵循框架的构建流程。例如使用 [Ionic](https://ionicframework.com/) 时：
```bash
ionic build
```

## 2. 同步 Web 资源

当需要在真机或模拟器上运行应用时，使用以下命令同步构建好的 Web 资源：
```bash
npx cap copy
```

## 3. 启动原生集成开发环境

Capacitor 依赖原生 IDE 进行应用构建、模拟和运行。使用以下命令打开对应 IDE：
```bash
npx cap open
```

## 4. 更新原生工程

以下情况需要更新 Capacitor 原生工程（例如安装新插件时）：
```bash
npm install really-cool-plugin
npx cap update
```

## 5. 升级 Capacitor

检查 Capacitor 更新：
```bash
npx cap doctor
```

升级核心模块和命令行工具：
```bash
npm install @capacitor/cli@2
npm install @capacitor/core@2
```

升级各平台支持：
```bash
npm install @capacitor/ios@2
npm install @capacitor/android@2
```