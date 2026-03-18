---
title: 开发工作流程
description: Capacitor 工作流程
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/basics/workflow
---

# Capacitor 工作流程

Capacitor 工作流程包含几个持续性的任务：

## 1. 开发并构建你的 Web 应用

Capacitor 会将你的 Web 应用转换为针对每个平台的原生二进制文件。因此，你的大部分工作将包括开发和构建一个专注于移动设备的 Web 应用。

你将通过 Capacitor 的插件（例如 [Camera](/apis/camera.md)），或通过使用现有的 Cordova 插件配合 Capacitor 的 [Cordova 兼容性](/cordova/index.md) 来与底层的原生平台进行交互。

作为最后一步，你将使用类似以下的命令来构建你的应用：

```bash
npm run build
```

如果你正在使用某个框架，请遵循该框架的构建流程。例如，如果你使用的是 [Ionic](https://ionicframework.com/)，命令将是：

```bash
ionic build
```

## 2. 复制你的 Web 资源

当你准备在设备或模拟器上原生运行你的应用时，使用以下命令复制你已构建的 Web 资源：

```bash
npx cap copy
```

## 3. 打开你的原生集成开发环境

Capacitor 使用原生集成开发环境来构建、模拟和运行你的应用。要打开它，请运行：

```bash
npx cap open
```

## 4. 更新原生项目

在某些情况下，Capacitor 应用需要进行更新，例如在安装新插件时。

要安装新插件（包括 Cordova 插件），请运行：

```bash
npm install really-cool-plugin
npx cap update
```

## 5. 更新 Capacitor

要检查 Capacitor 本身是否有任何新更新，请运行 `npx cap doctor`，它会打印出当前已安装的依赖项并显示最新的可用版本。

要更新 Capacitor 核心和 CLI：

```bash
npm install @capacitor/cli@2
npm install @capacitor/core@2
```

要更新你正在使用的任意或所有平台：

```bash
npm install @capacitor/ios@2
npm install @capacitor/android@2
```