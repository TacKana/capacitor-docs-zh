---
title: 自动化配置
description: 自动化 Capacitor 项目的配置和管理，包括插件、白标定制、CI/CD 等。
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# 自动化 Capacitor 项目配置

许多大型应用需要自动化配置其 Capacitor 项目。这可能包括递增 iOS 和 Android 的构建版本号、配置清单和 plist 文件、在 Gradle 文件中添加构建依赖、修改资源等。

Capacitor 提供了两个用于管理项目的实用包：`@trapezedev/project` 和 `@trapezedev/configure`。`@trapezedev/project` 是一个低层级项目管理库，而 `@trapezedev/configure` 则是一个自动化工具，它在底层使用了该库，但在某些使用场景下提供了更便捷的配置选项。

这两个项目及其文档均可在 [Trapeze 代码仓库](https://github.com/ionic-team/trapeze)中找到。

## 项目 API

`@trapezedev/project` 库为 Capacitor 项目及其包含的原生 iOS 和 Android 项目提供了一个类型化的 JavaScript 接口。

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// 这里需要一个 MobileProjectConfig
// 用于指定 iOS 和 Android 项目的路径
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

项目加载完成后，即可对其执行操作。例如，以下是如何管理版本和构建版本号：

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

该 API 在虚拟文件系统上工作，可以在不修改文件系统上文件的情况下缓冲更改。完成操作后，如需确保更改在您的文件中生效，请运行：

```typescript
await project.commit();
```

该库还能执行许多其他操作。要查看完整列表，请查阅 [项目文档](https://github.com/ionic-team/trapeze)。

## 配置工具

除了项目 API 外，`@trapezedev/configure` 还提供了一种自动化的、基于配置的体验，用于应用 `@trapezedev/project` 中的底层操作，但通过便捷的 YAML 配置文件格式实现。它还具有一些附加功能，例如能够要求并提供变量来填充最终配置中的值，以及在更改应用于项目源文件之前进行测试和查看。

这个工具对于希望发布其插件所需的一系列配置更改的 Capacitor 插件作者来说可能最为有用，可以避免用户手动配置其项目。

此工具旨在作为 npm 脚本使用，并需要提供一个遵循 [示例配置](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml) 格式的 YAML 文件：

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

有关使用此工具的更多信息，请查阅 [项目文档](https://github.com/ionic-team/trapeze)。