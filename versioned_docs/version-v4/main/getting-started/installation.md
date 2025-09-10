---
title: 安装Capacitor
description: Capacitor安装指南
slug: /getting-started
---

# 安装Capacitor

您可以选择新建一个Capacitor应用，或将Capacitor集成到现有网页项目中。这可以通过CLI工具或[VS Code扩展](vscode/getting-started)完成。

请确保您已为需要构建的平台[完成环境配置](/main/getting-started/environment-setup.md)。

## 创建新Capacitor应用

使用`@capacitor/create-app`包可以快速搭建Capacitor应用。在空目录中运行以下命令即可初始化一个新项目。

```bash
npm init @capacitor/app
```

## 集成到现有网页应用

Capacitor设计初衷是与任何现代JavaScript网页应用无缝集成。但要使Capacitor正常运行，您的项目需满足以下三个条件：

- 存在`package.json`文件
- 有独立的构建产物目录（如`dist`或`www`）
- 在web资源目录根层级存在`index.html`文件

:::重要提示
`index.html`必须包含`<head>`标签才能正确加载Capacitor。若Html中没有`<head>`标签，Capacitor插件将无法正常工作。
:::

### 安装Capacitor

在项目根目录下安装Capacitor核心依赖：运行时库和命令行工具(CLI)。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### 初始化配置

运行CLI初始化向导配置Capacitor：

```bash
npx cap init
```

CLI会询问几个问题，包括应用名称和您希望使用的包ID。

### 创建Android/iOS项目

安装核心库后，可添加Android和iOS平台支持。

```bash
npm i @capacitor/android @capacitor/ios
```

当平台依赖添加到`package.json`后，执行以下命令生成原生应用项目结构：

```bash
npx cap add android
npx cap add ios
```

### 同步网页代码到原生项目

创建原生项目后，运行以下命令将网页应用同步到原生工程中：

```bash
npx cap sync
```

`npx cap sync`会将构建好的网页应用（默认`www`目录）复制到原生项目，并安装原生依赖。

:::提示
您可以通过修改`npx cap init`时生成的[Capacitor配置](/main/reference/config.md)文件中的`webDir`变量，来指定要同步的目录。
:::

## 后续步骤

完成环境配置和项目初始化后，您已准备就绪！如需了解更多细节，可参考以下文档：

[iOS开发指南 &#8250;](/main/ios/index.md)

[Android开发指南 &#8250;](/main/android/index.md)

[开发工作流指南 &#8250;](/main/basics/workflow.md)