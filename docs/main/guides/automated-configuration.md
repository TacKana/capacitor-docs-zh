---
title: Automated Configuration
description: 实现 Capacitor 项目的自动化配置与管理，包括插件集成、品牌定制、CI/CD流程等场景
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitor 项目自动化配置

许多大型应用需要对 Capacitor 项目进行自动化配置。典型场景包括：递增 iOS 和 Android 的构建版本号、配置清单文件与 plist 文件、在 Gradle 文件中添加构建依赖、修改资源文件等。

Capacitor 提供了两个实用的项目管理工具包：`@trapezedev/project` 和 `@trapezedev/configure`。其中 `@trapezedev/project` 是底层项目管理库，而 `@trapezedev/configure` 是基于该库构建的自动化工具，通过更便捷的配置方式满足特定需求。

这两个项目的完整文档可在 [Trapeze 代码库](https://github.com/ionic-team/trapeze) 查阅。

## 项目 API

`@trapezedev/project` 库为 Capacitor 项目及其包含的原生 iOS/Android 项目提供了类型化的 JavaScript 接口。

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// 接收 MobileProjectConfig 配置对象
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

项目加载完成后即可执行各项操作。例如管理版本号和构建编号：

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

该 API 在虚拟文件系统上运行，所有变更会先缓存在内存中。如需将修改实际写入文件，需执行：

```typescript
await project.commit();
```

该库还支持更多功能，完整功能列表请参考 [项目文档](https://github.com/ionic-team/trapeze)。

## 配置工具

作为项目 API 的补充，`@trapezedev/configure` 提供了基于 YAML 配置文件的自动化方案，底层仍使用 `@trapezedev/project` 的功能，但配置方式更加友好。其特色功能包括：
- 支持通过变量注入动态配置值
- 可在实际修改前预览变更效果

该工具特别适合 Capacitor 插件开发者使用，可避免用户手动配置项目的繁琐流程。

典型用法是通过 npm 脚本调用，并指定符合 [示例配置](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml) 格式的 YAML 文件：

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

更多使用细节请参阅 [项目文档](https://github.com/ionic-team/trapeze)。