---
title: 自动化配置
description: 自动化 Capacitor 项目的配置和管理，包括插件集成、白标化、CI/CD 等。
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitor 项目自动化配置

许多大型应用需要对 Capacitor 项目进行自动化配置。这可能包括递增 iOS 和 Android 的构建版本号、配置清单文件和 plist 文件、在 Gradle 文件中添加构建依赖项、修改资源文件等。

Capacitor 提供了两个用于管理项目的实用包：`@trapezedev/project` 和 `@trapezedev/configure`。`@trapezedev/project` 是一个底层的项目管理库，而 `@trapezedev/configure` 是一个自动化工具，它在底层使用了该库，但在某些使用场景下提供了更便捷的配置选项。

这两个项目及其文档都可在 [Trapeze 仓库](https://github.com/ionic-team/trapeze) 中找到。

## 项目 API

`@trapezedev/project` 库为 Capacitor 项目及其包含的原生 iOS 和 Android 项目提供了一个类型化的 JavaScript 接口。

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// 这需要一个 MobileProjectConfig
// 来指明 iOS 和 Android 项目的位置
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

项目加载完成后，可以对其执行操作。例如，以下是管理版本和构建版本号的方法：

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

该 API 在虚拟文件系统上运行，以缓冲更改，而无需修改文件系统中的文件。完成操作后，为确保更改反映到您的文件中，请运行：

```typescript
await project.commit();
```

该库还可以执行许多其他操作。要查看完整列表，请查阅 [项目文档](https://github.com/ionic-team/trapeze)。

## 配置工具

除了项目 API 之外，`@trapezedev/configure` 还提供了一种自动化的、基于配置驱动的体验，用于应用 `@trapezedev/project` 中的底层操作，但采用方便的 yaml 配置文件格式。它还有一些额外的功能，例如可以要求并提供变量来填充最终配置中的值，以及一种在将更改应用到项目源文件之前进行测试和查看的方法。

这个工具可能对希望发布其插件所需的一组配置更改的 Capacitor 插件作者最有用，以避免用户不得不手动配置他们的项目。

该工具旨在作为 npm 脚本使用，然后提供一个遵循 [示例配置](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml) 的 yaml 格式文件：

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

有关使用此工具的更多信息，请查阅 [项目文档](https://github.com/ionic-team/trapeze)。