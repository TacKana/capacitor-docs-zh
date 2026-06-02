---
title: 开发工作流
description: Capacitor 工作流
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/basics/workflow
---

# Capacitor 工作流

Capacitor 工作流涉及几个一致的任务：

## 1. 开发和构建您的 Web 应用

Capacitor 将您的 web 应用转换为每个平台的原生二进制文件。因此，您的大部分工作将包括开发然后构建一个以移动端为重点的 web 应用。

您将使用 Capacitor 的插件（例如 [Camera](/apis/camera.md)）或通过 Capacitor 的 [Cordova 兼容性](/cordova/index.md) 使用现有的 Cordova 插件，与底层的原生平台进行交互。

最后一步，您将使用类似以下的命令构建您的应用程序：

```bash
npm run build
```

如果您正在使用某个框架，请遵循您框架的构建流程。例如，如果您使用 [Ionic](https://ionicframework.com/)，则命令为：

```bash
ionic build
```

## 2. 复制您的 Web 资源

当您准备好在设备或模拟器上原生运行您的应用时，请使用以下命令复制构建好的 web 资源：

```bash
npx cap copy
```

## 3. 打开您的原生 IDE

Capacitor 使用原生 IDE 来构建、模拟和运行您的应用。要打开 IDE，请运行：

```bash
npx cap open
```

## 4. 更新原生项目

在某些情况下，需要更新 Capacitor 应用，例如当安装新插件时。

要安装新插件（包括 Cordova 插件），请运行：

```bash
npm install really-cool-plugin
npx cap update
```

## 5. 更新 Capacitor

要检查 Capacitor 本身是否有任何新更新，请运行 `npx cap doctor` 来打印当前安装的依赖项并查看最新可用版本。

要更新 Capacitor Core 和 CLI：

```bash
npm install @capacitor/cli@2
npm install @capacitor/core@2
```

要更新您正在使用的任何一个或所有平台：

```bash
npm install @capacitor/ios@2
npm install @capacitor/android@2
```