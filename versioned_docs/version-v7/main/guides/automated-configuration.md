---
title: 自动化配置
description: 自动化 Capacitor 项目的配置和管理，支持插件、白标、CI/CD 等。
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitor 项目自动化配置

许多大规模应用需要自动化配置其 Capacitor 项目。这可能包括增加 iOS 和 Android 构建版本号、配置 manifest 和 plist 文件、在 Gradle 文件中添加构建依赖项、修改资源等。

Capacitor 提供了两个有用的包来管理项目：`@trapezedev/project` 和 `@trapezedev/configure`。`@trapezedev/project` 是一个较低级别的项目管理库，而 `@trapezedev/configure` 是一个自动化工具，它在底层使用该库，但为某些用例提供了更方便的配置选项。

这两个项目及其文档都可以在 [Trapeze 仓库](https://github.com/ionic-team/trapeze) 中找到。

## 项目 API

`@trapezedev/project` 库为 Capacitor 项目及其包含的原生 iOS 和 Android 项目提供了类型化的 JavaScript 接口。

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// 这里使用 MobileProjectConfig
// 来指定 ios 和 android 项目的位置
const config: MobileProjectConfig = {
  ios: {
    path: 'ios/App',
  },
  android: {
    path: 'android',
  },
};

const project = new MobileProject(process.cwd(), config);
await project.load();
```

项目加载后，可以对其执行操作。例如，以下是如何管理版本号和构建版本号：

```typescript
await project.ios?.setVersion('App', 'Debug', '1.4.5');
await project.ios?.incrementBuild('App');
await project.ios?.getBuild('App', 'Debug');
await project.ios?.getBuild('App', 'Release');
await project.android?.setVersionName('1.0.2');
await project.android?.getVersionName();
await project.android?.setVersionCode(11);
await project.android?.getVersionCode();
await project.android?.incrementVersionCode();
```

该 API 在虚拟文件系统上工作，以缓冲更改而不会修改文件系统上的实际文件。完成后，要确保更改反映在你的文件中，请运行：

```typescript
await project.commit();
```

该库可以执行许多其他操作。要查看完整列表，请查阅[项目文档](https://github.com/ionic-team/trapeze)。

## 配置工具

与项目 API 一起，`@trapezedev/configure` 提供了一种自动化的、配置驱动的体验，用于应用 `@trapezedev/project` 中的底层操作，但使用方便的 yaml 配置文件格式。还有一些附加功能，例如能够要求并提供变量来填充最终配置中的值，以及在将更改应用于项目源文件之前测试和查看更改的方法。

这个工具可能对 Capacitor 插件作者最有用，他们希望发布其插件所需的一组配置更改，以避免用户手动配置项目。

这个工具旨在作为 npm 脚本使用，然后提供一个遵循[示例配置](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml)的 yaml 格式：

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

查阅[项目文档](https://github.com/ionic-team/trapeze)以获取有关使用此工具的更多信息。
