---
title: 自动化配置
description: 自动化配置和管理 Capacitor 项目，包括插件、白标化、CI/CD 等场景。
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitor 项目自动化配置

许多大型应用需要对它们的 Capacitor 项目进行自动化配置。这可能包括递增 iOS 和 Android 的构建版本号、配置清单和 plist 文件、在 Gradle 文件中添加构建依赖、修改资源文件等。

Capacitor 提供了两个实用的包来管理项目：`@trapezedev/project` 和 `@trapezedev/configure`。`@trapezedev/project` 是一个底层的项目管理库，而 `@trapezedev/configure` 是一个自动化工具，它在底层使用该库，但为特定用例提供了更便捷的配置选项。

这两个项目及其文档都可以在 [Trapeze 代码库](https://github.com/ionic-team/trapeze) 中找到。

## Project API

`@trapezedev/project` 库为 Capacitor 项目及其包含的原生 iOS 和 Android 项目提供了一个类型化的 JavaScript 接口。

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// 这里需要一个 MobileProjectConfig
// 来指定 iOS 和 Android 项目的路径
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

项目加载完成后，就可以对其进行操作。例如，以下是管理版本号和构建版本号的方法：

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

该 API 在虚拟文件系统上运行，通过缓冲更改来避免直接修改文件系统中的文件。操作完成后，为确保更改反映到实际文件中，需要运行：

```typescript
await project.commit();
```

这个库还能执行许多其他操作。要查看完整列表，请查阅 [项目文档](https://github.com/ionic-team/trapeze)。

## 配置工具

除了 Project API，`@trapezedev/configure` 提供了一种自动化的、基于配置的体验，用于应用 `@trapezedev/project` 中的底层操作，但它是通过方便的 YAML 配置文件格式来实现的。该工具还提供了一些额外功能，例如能够要求并提供变量来填充最终配置中的值，以及在将更改应用到项目源文件之前进行测试和预览。

这个工具可能对 Capacitor 插件作者最为有用，他们希望发布一组插件所需的配置更改，从而避免用户手动配置项目。

该工具旨在作为 npm 脚本使用，并提供一个遵循 [示例配置](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml) 格式的 YAML 文件：

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

有关使用此工具的更多信息，请查阅 [项目文档](https://github.com/ionic-team/trapeze)。