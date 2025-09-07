---
title: Capacitor Web/PWA 插件开发指南
description: Capacitor Web/PWA 插件开发指南
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: Web/PWA 指南
slug: /plugins/web
---

# Capacitor Web/PWA 插件开发指南

Capacitor 采用了 Web/原生兼容层设计，使得开发者能够轻松构建同时支持原生环境和 Web PWA 环境的插件。

## 快速开始

首先按照[插件指南](/plugins/creating-plugins/overview.md#plugin-generator)中的说明生成一个插件模板。

然后在你喜欢的编辑器中打开 `echo/src/web.ts` 文件。

## 基础示例

一个典型的 Capacitor Web 插件结构如下：

```typescript
import { WebPlugin } from '@capacitor/core';

import type { EchoPlugin } from './definitions';

export class EchoWeb extends WebPlugin implements EchoPlugin {
  async echo(options: { value: string }) {
    console.log('ECHO', options);
    return options;
  }
}
```

`EchoPlugin` 接口定义了插件的所有方法签名。在 TypeScript 中，我们可以确保 Web 实现（即 `EchoWeb` 类）正确实现了该接口。

## 权限管理

如果你的 Web 插件功能需要获取用户权限，则需要实现权限管理机制。

### 权限别名

你需要定义一个或多个权限别名来抽象和分组插件所需的权限。这些别名用于表示权限状态，默认情况下每个别名可能处于以下状态之一：

- `granted`: 用户已授予该别名下的所有权限（或无需提示）
- `denied`: 用户已拒绝该别名下的部分权限
- `prompt`: 需要向用户请求权限（既未授予也未拒绝）
- `prompt-with-rationale`: 用户曾拒绝过但尚未阻止后续提示

这些状态由 `@capacitor/core` 导出的 `PermissionState` 类型表示。

如有需要，也可以为别名定义自定义状态。例如官方[相机插件](/apis/camera.md)就为 `camera` 和 `photos` 别名定义了 `limited` 状态。

权限别名是跨平台的，因此在设计时需同时考虑 iOS、Android 和 Web 的权限体系。

### 权限状态定义

在 `src/definitions.ts` 中导入 Capacitor 的 `PermissionState`，并定义表示插件权限状态的 `PermissionStatus` 接口，使用你设计的别名作为键名。

以下示例中，权限状态完全由 `location` 别名表示，其值可以是 `granted`、`denied` 等：

```typescript
import type { PermissionState } from '@capacitor/core';

export interface PermissionStatus {
  // TODO: 将 'location' 替换为你实际的别名！
  location: PermissionState;
}
```

然后在插件接口中添加 `checkPermissions()` 和 `requestPermissions()` 方法定义，这两个方法都将返回插件当前的权限状态：

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;
+  checkPermissions(): Promise<PermissionStatus>;
+  requestPermissions(): Promise<PermissionStatus>;
 }
```

由于这些方法已添加到插件接口中，因此必须在所有支持的平台上实现。

### 实现权限方法

在 `src/web.ts` 中为 Web 实现添加权限相关方法：

```diff
+import { PermissionStatus } from './definitions';

 export class EchoWeb extends WebPlugin implements EchoPlugin {
   async echo(options: { value: string }) {
     ...
   }

+  async checkPermissions(): Promise<PermissionStatus> {
+    // TODO
+  }

+  async requestPermissions(): Promise<PermissionStatus> {
+    // TODO
+  }
 }
```

#### `checkPermissions()`

该方法应返回插件当前的权限状态。这些信息可能直接来自特定的 Web API，或通过[Permissions API](https://developer.mozilla.org/en-US/docs/v3/Web/API/Permissions_API)获取。

请注意，当使用浏览器支持度不高的 Web API（如 Permissions API）时，应该实现特性检测并在浏览器不支持时抛出适当错误：

```diff
 async checkPermissions(): Promise<PermissionStatus> {
+  if (typeof navigator === 'undefined' || !navigator.permissions) {
+    throw this.unavailable('当前浏览器不支持 Permissions API');
+  }

   const permission = await navigator.permissions.query( ... );

   // TODO
 }
```

#### `requestPermissions()`

该方法应该向用户请求插件功能所需的权限，然后返回请求后的新权限状态（与 `checkPermissions()` 类似）。

在 Web 平台上，有时无法将权限请求与实际调用分离。例如地理位置 API 只在实际请求位置时才会触发权限提示。对于这种情况，建议抛出未实现异常：

```typescript
async requestPermissions(): Promise<PermissionStatus> {
  // TODO: 当前插件是否支持在 Web 上请求权限？
  throw this.unimplemented('Web 平台未实现此功能');
}
```

## 错误处理

由于 Web 插件经常需要处理尚未被所有浏览器支持或标准化的 API，因此虽然建议采用最佳实践实现 Web 端功能，但在 API 不可用时也需要优雅降级。这就是 Web 实现中错误处理尤为重要的原因！

### 不可用错误

当功能暂时无法使用时应该抛出此错误，常见情况包括：

- 缺少必要前提条件（如网络连接）
- 浏览器未实现底层 API

以下示例中，我们先检查 `navigator.geolocation` 是否存在，如果不存在则说明浏览器不支持地理位置功能，应该抛出"不可用"错误：

```typescript
async getLocation(): Promise<Location> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    throw this.unavailable('当前浏览器不支持 Geolocation API');
  }

  // TODO: 实际的 Web 实现
}
```

### 未实现错误

当功能尚未实现时可以抛出此错误，可用于临时存根方法或表示特定平台不支持该功能：

```typescript
async getLocation(): Promise<Location> {
  throw this.unimplemented('Web 平台未实现此功能');
}
```