---
title: 自动化配置
description: 自动化配置和管理 Capacitor 项目的插件、白标化、CI/CD 等功能。
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitor 项目自动化配置

许多大型应用需要自动化配置其 Capacitor 项目。这可能包括递增 iOS 和 Android 构建版本号、配置清单和 plist 文件、在 Gradle 文件中添加构建依赖项、修改资源文件等操作。

Capacitor 提供了两个用于管理项目的实用工具包：`@trapezedev/project` 和 `@trapezedev/configure`。`@trapezedev/project` 是一个底层项目管理库，而 `@trapezedev/configure` 则是一个自动化工具，它在底层使用该库，但为特定用例提供了更便捷的配置选项。

这两个项目及其文档都可以在 [Trapeze 代码库](https://github.com/ionic-team/trapeze) 中找到。

## 项目 API

`@trapezedev/project` 库为 Capacitor 项目及其包含的原生 iOS 和 Android 项目提供了类型化的 JavaScript 接口。

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// 此处需要一个 MobileProjectConfig 配置对象
// 以确定 iOS 和 Android 项目的路径位置
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

项目加载完成后，即可对其执行各种操作。例如，以下是管理版本号和构建号的方法：

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

该 API 在虚拟文件系统上运行，能够缓冲更改而无需直接修改文件系统中的文件。完成操作后，如需确保更改生效，请运行：

```typescript
await project.commit();
```

该库还支持许多其他功能。要查看完整列表，请查阅 [项目文档](https://github.com/ionic-team/trapeze)。

## 配置工具

除了项目 API 外，`@trapezedev/configure` 还提供了一种自动化、基于配置驱动的体验，用于应用 `@trapezedev/project` 的底层操作，但采用更方便的 YAML 配置文件格式。该工具还具备一些额外功能，例如能够要求并提供变量来填充最终配置中的值，以及在应用更改到项目源文件之前测试和查看更改。

这个工具可能对 Capacitor 插件开发者最为有用，他们希望发布其插件所需的一组配置更改，从而避免用户手动配置项目。

该工具旨在作为 npm 脚本使用，并需要提供遵循 [示例配置](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml) 的 YAML 格式文件：

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

有关使用此工具的更多信息，请查阅 [项目文档](https://github.com/ionic-team/trapeze)。