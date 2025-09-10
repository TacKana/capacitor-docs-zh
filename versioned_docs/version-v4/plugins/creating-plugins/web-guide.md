---
title: Capacitor Web/PWA 插件指南
description: Capacitor Web/PWA 插件开发指南
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: Web/PWA 指南
slug: /plugins/web
---

# Capacitor Web/PWA 插件指南

Capacitor 采用了 Web/原生兼容层设计，使得开发者能够轻松构建同时支持原生应用和 Web 端 PWA 的插件。

## 快速开始

首先按照插件指南中的[入门章节](/plugins/creating-plugins/overview.md#plugin-generator)生成一个插件模板。

接着在你选择的编辑器中打开 `echo/src/web.ts` 文件。

## 示例代码

一个标准的 Capacitor Web 插件基本结构如下：

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

`EchoPlugin` 接口定义了插件的所有方法签名。通过 TypeScript 可以确保 Web 实现类 (`EchoWeb`) 正确实现了该接口。

## 权限管理

如果插件在 Web 端需要获取用户权限，则需要实现权限管理机制。

### 权限别名

需要定义一个或多个权限别名来抽象和分组插件所需的权限。这些别名用于表示权限状态，默认包含以下状态：

- `granted`：用户已授予该别名下的所有权限（或无需询问）
- `denied`：用户已拒绝该别名下的部分权限
- `prompt`：需要向用户请求权限（尚未授予或拒绝）
- `prompt-with-rationale`：用户之前拒绝过但未永久禁止询问

这些状态通过 `@capacitor/core` 导出的 `PermissionState` 类型表示。

必要时也可以定义自定义状态。例如官方 [Camera 插件](/apis/camera.md)就为 `camera` 和 `photos` 别名定义了 `limited` 状态。

权限别名是跨平台的，因此在设计时需要同时考虑 iOS、Android 和 Web 的权限体系。

### 权限状态定义

在 `src/definitions.ts` 中导入 Capacitor 的 `PermissionState`，并定义表示插件权限状态的 `PermissionStatus` 接口，键名为你设计的权限别名。

以下示例展示了一个完全由 `location` 别名表示的权限状态（可以是 granted、denied 等状态）：

```typescript
import type { PermissionState } from '@capacitor/core';

export interface PermissionStatus {
  // 请将 'location' 替换为你实际的权限别名
  location: PermissionState;
}
```

然后在插件接口中添加 `checkPermissions()` 和 `requestPermissions()` 的定义，这两个方法都返回 `PermissionStatus` 表示的当前权限状态。

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;
+  checkPermissions(): Promise<PermissionStatus>;
+  requestPermissions(): Promise<PermissionStatus>;
 }
```

由于这些方法已添加到插件接口，必须在所有支持的平台上实现它们。

### 实现权限检查

在 `src/web.ts` 中为 Web 实现添加权限相关方法：

```diff
+import { PermissionStatus } from './definitions';

 export class EchoWeb extends WebPlugin implements EchoPlugin {
   async echo(options: { value: string }) {
     ...
   }

+  async checkPermissions(): Promise<PermissionStatus> {
+    // 待实现
+  }

+  async requestPermissions(): Promise<PermissionStatus> {
+    // 待实现
+  }
 }
```

#### `checkPermissions()`

此方法应返回插件的当前权限状态。可以通过特定 Web API 或 [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) 获取。

注意：当使用浏览器支持不完善的 Web API（如 Permissions API）时，应实现特性检测并在浏览器不支持时抛出适当错误。

```diff
 async checkPermissions(): Promise<PermissionStatus> {
+  if (typeof navigator === 'undefined' || !navigator.permissions) {
+    throw this.unavailable('当前浏览器不支持 Permissions API');
+  }

   const permission = await navigator.permissions.query( ... );

   // 待实现
 }
```

#### `requestPermissions()`

此方法应提示用户授予插件所需的平台 API 权限，然后返回提示后的新权限状态（与 `checkPermissions()` 类似）。

在 Web 端，有时无法将权限请求与实际调用分离。例如 Geolocation API 只在实际请求位置时才会询问权限。对于这种情况，建议抛出未实现异常。

```typescript
async requestPermissions(): Promise<PermissionStatus> {
  // TODO: 当前插件是否支持在 Web 端请求权限？
  throw this.unimplemented('Web 端未实现此功能');
}
```

## 错误处理

由于部分 Web API 尚未被所有浏览器支持或标准化，Capacitor Web 插件通常需要采用最佳实践方案，并在 API 不可用时优雅降级。因此 Web 实现的错误处理尤为重要！

### 不可用状态

当功能当前无法使用时抛出此错误，常见原因包括：

- 缺少必要前提条件（如网络连接）
- 浏览器未实现底层 API

以下示例首先检查 `navigator.geolocation` 是否存在，如果不存在则抛出"不可用"错误：

```typescript
async getLocation(): Promise<Location> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    throw this.unavailable('当前浏览器不支持 Geolocation API');
  }

  // TODO: 实际的 Web 实现
}
```

### 未实现状态

当功能尚未实现时抛出此错误，可用于：

- 临时存根 Web 方法以待后续实现
- 表示某些平台无法实现该功能

```typescript
async getLocation(): Promise<Location> {
  throw this.unimplemented('Web 端未实现此功能');
}
```