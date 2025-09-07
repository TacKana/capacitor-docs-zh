---
title: 自动化配置
description: 自动化配置和管理 Capacitor 项目的插件、白标方案、CI/CD 等环节。
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitor 项目自动化配置

许多大型应用需要对 Capacitor 项目进行自动化配置，这包括但不限于：递增 iOS 和 Android 构建版本号、配置清单和 plist 文件、在 Gradle 文件中添加构建依赖、修改资源文件等操作。

Capacitor 提供了两个实用的项目管理工具包：`@trapezedev/project` 和 `@trapezedev/configure`。其中 `@trapezedev/project` 是底层项目管理库，而 `@trapezedev/configure` 是基于该库封装的自动化工具，为特定场景提供了更便捷的配置方案。

这两个项目及其文档都可在 [Trapeze 代码库](https://github.com/ionic-team/trapeze) 中查阅。

## 项目 API

`@trapezedev/project` 库为 Capacitor 项目及其包含的原生 iOS/Android 项目提供了类型化的 JavaScript 接口。

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// 需要提供 MobileProjectConfig 配置
// 指明 iOS 和 Android 项目的路径
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

项目加载完成后，即可执行各种操作。例如以下版本和构建号管理示例：

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

该 API 采用虚拟文件系统工作机制，所有变更会先缓存在内存中。要实际写入文件，需执行提交操作：

```typescript
await project.commit();
```

该库还支持更多功能，完整功能列表请参阅 [项目文档](https://github.com/ionic-team/trapeze)。

## 配置工具

除了项目 API 外，`@trapezedev/configure` 提供了基于 YAML 配置文件的自动化方案。它底层调用 `@trapezedev/project` 的功能，但增加了两项特性：支持通过变量动态填充配置值，以及支持在应用改动前进行预览验证。

这个工具特别适合 Capacitor 插件开发者使用，可以发布插件所需的配置变更集，避免用户手动配置项目。

使用方式是通过 npm 脚本运行，并指定符合 [示例配置](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml) 格式的 YAML 文件：

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

更多使用细节请参考 [项目文档](https://github.com/ionic-team/trapeze)。