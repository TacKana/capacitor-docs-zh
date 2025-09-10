---
title: Automated Configuration
description: 自动化配置和管理 Capacitor 项目的插件、白标定制、CI/CD 等流程。
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitor 项目自动化配置

许多大型应用需要对 Capacitor 项目进行自动化配置。这可能涉及增加 iOS 和 Android 的构建版本号、配置清单文件和 plist 文件、在 Gradle 文件中添加构建依赖、修改资源等操作。

Capacitor 提供了两个实用的项目管理包：`@trapezedev/project` 和 `@trapezedev/configure`。其中 `@trapezedev/project` 是底层项目管理库，而 `@trapezedev/configure` 是基于该库构建的自动化工具，为特定使用场景提供了更便捷的配置方案。

这两个项目及其文档都可在 [Trapeze 代码库](https://github.com/ionic-team/trapeze) 中找到。

## 项目 API

`@trapezedev/project` 库为 Capacitor 项目及其包含的原生 iOS 和 Android 项目提供了类型化的 JavaScript 接口。

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// 需要传入 MobileProjectConfig 配置对象
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

项目加载完成后，即可执行各种操作。例如管理版本号和构建号的方法如下：

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

该 API 在虚拟文件系统上运行，可以缓冲变更而不会直接修改实际文件。完成操作后，需执行以下命令使变更生效：

```typescript
await project.commit();
```

该库还支持许多其他功能，完整列表请参阅 [项目文档](https://github.com/ionic-team/trapeze)。

## 配置工具

除了项目 API，`@trapezedev/configure` 还提供了一种基于配置文件的自动化方案，它底层使用 `@trapezedev/project` 的操作，但通过便捷的 yaml 配置文件来驱动。该工具还具备一些额外特性，比如支持要求并提供变量来填充最终配置值，以及在应用到项目源文件前预览变更。

这个工具尤其适合 Capacitor 插件开发者使用，他们可以发布插件所需的配置变更集，避免用户手动配置项目。

使用时需要在 npm 脚本中调用该工具，并指定遵循 [示例配置](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml) 格式的 yaml 文件：

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

更多使用详情请参考 [项目文档](https://github.com/ionic-team/trapeze)。