---
title: Automated Configuration
description: 自动化配置和管理 Capacitor 项目的插件、品牌定制、CI/CD等功能
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitor 项目自动化配置

许多大型应用需要对 Capacitor 项目进行自动化配置。这可能包括递增 iOS 和 Android 版本号、配置清单和 plist 文件、在 Gradle 文件中添加构建依赖项、修改资源文件等操作。

Capacitor 提供了两个实用的项目管理包：`@trapezedev/project` 和 `@trapezedev/configure`。其中 `@trapezedev/project` 是底层项目管理库，而 `@trapezedev/configure` 则是基于该库构建的自动化工具，为特定用例提供了更便捷的配置选项。

这两个项目及其文档都可以在 [Trapeze 代码库](https://github.com/ionic-team/trapeze) 中找到。

## 项目 API

`@trapezedev/project` 库为 Capacitor 项目及其包含的原生 iOS 和 Android 项目提供了类型化的 JavaScript 接口。

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// 使用 MobileProjectConfig 配置
// 指定 iOS 和 Android 项目的路径
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

项目加载完成后，可以执行各种操作。例如管理版本号和构建号：

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

该 API 在虚拟文件系统上工作，可以缓冲更改而不会直接修改文件系统中的文件。完成操作后，为确保更改生效，需要执行：

```typescript
await project.commit();
```

该库还支持许多其他功能。完整列表请参考 [项目文档](https://github.com/ionic-team/trapeze)。

## 配置工具

除了项目 API 外，`@trapezedev/configure` 提供了基于配置文件的自动化体验，它底层使用了 `@trapezedev/project` 的操作，但通过便捷的 yaml 配置文件格式来使用。该工具还提供了一些额外功能，例如要求并提供变量来填充最终配置值，以及在实际修改项目源文件前预览变更。

这个工具对于 Capacitor 插件开发者特别有用，他们可以发布插件所需的一组配置变更，避免用户手动配置项目。

该工具通常作为 npm 脚本使用，并配合 yaml 格式的配置文件，示例配置可参考 [基础示例](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml)：

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

更多使用信息请查阅 [项目文档](https://github.com/ionic-team/trapeze)。