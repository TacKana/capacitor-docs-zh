---
title: Automated Configuration
description: 自动化配置和管理Capacitor项目，包括插件集成、白标定制、CI/CD流程等场景。
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitor项目自动化配置

许多大型应用需要对Capacitor项目进行自动化配置。这包括但不限于：递增iOS和Android构建版本号、配置manifest和plist文件、在Gradle文件中添加构建依赖、修改资源文件等操作。

Capacitor提供两个实用的项目管理包：`@trapezedev/project`和`@trapezedev/configure`。其中`@trapezedev/project`是底层项目管理库，而`@trapezedev/configure`是基于该库封装的自动化工具，提供了更便捷的配置方式。

这两个项目的完整文档可在[Trapeze代码库](https://github.com/ionic-team/trapeze)查阅。

## 项目API

`@trapezedev/project`库为Capacitor项目及其包含的iOS/Android原生项目提供了类型化的JavaScript接口：

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// 需配置MobileProjectConfig
// 指定iOS和Android项目路径
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

项目加载完成后即可执行操作。以下是版本号和构建号管理示例：

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

该API在虚拟文件系统上操作，变更会先缓存在内存中。执行以下命令将变更写入实际文件：

```typescript
await project.commit();
```

此库还支持更多功能，完整列表请参阅[项目文档](https://github.com/ionic-team/trapeze)。

## 配置工具

除项目API外，`@trapezedev/configure`提供了基于YAML配置文件的自动化方案。额外特性包括：
- 支持通过变量动态填充配置值
- 支持在实际应用前预览变更效果

该工具特别适合Capacitor插件开发者，可自动应用插件所需的配置变更，避免用户手动配置。

使用方式是在npm脚本中指定YAML配置文件（格式参考[示例配置](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml)）：

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

更多使用细节请参考[项目文档](https://github.com/ionic-team/trapeze)。