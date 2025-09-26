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

Capacitor 采用了一套 Web/原生兼容层架构，使得开发者能够轻松构建在原生环境和 Web PWA 环境下都能运行的插件。

## 快速开始

首先按照[插件指南](/plugins/creating-plugins/overview.md#plugin-generator)中的入门章节生成一个插件。

接着在你喜欢的编辑器中打开 `echo/src/web.ts` 文件。

## 基础示例

一个标准的 Capacitor Web 插件结构如下所示：

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

`EchoPlugin` 接口定义了插件的所有方法签名。在 TypeScript 中，我们可以确保 Web 实现（`EchoWeb` 类）正确遵循接口规范。

## 权限管理

如果你的插件在 Web 端运行时需要用户授权，则需要实现以下权限模式。

### 权限别名

你需要定义一个或多个权限别名来抽象和管理插件所需的权限。这些别名用于表示权限状态，默认情况下每个别名可能处于以下状态之一：

- `granted`：用户已授予该别名下的所有权限（或无需提示）
- `denied`：用户拒绝了该别名下的部分权限
- `prompt`：需要向用户请求权限（尚未授予或拒绝）
- `prompt-with-rationale`：用户曾拒绝过但未永久阻止提示

这些状态通过 `@capacitor/core` 导出的 `PermissionState` 类型表示。

如有需要，你也可以为别名定义自定义状态。例如官方 [Camera 插件](/apis/camera.md)就为 `camera` 和 `photos` 别名定义了 `limited` 状态。

权限别名是跨平台的，因此在设计插件别名时需同时考虑 iOS、Android 和 Web 的权限体系。

### 权限状态定义

在 `src/definitions.ts` 中，从 Capacitor 导入 `PermissionState` 并定义 `PermissionStatus` 接口来描述插件的权限状态（使用你定义的别名作为键名）。

以下示例中，权限状态完全由一个可能处于 `granted`、`denied` 等状态的 `location` 别名表示：

```typescript
import type { PermissionState } from '@capacitor/core';

export interface PermissionStatus {
  // 请将 'location' 替换为你实际的别名
  location: PermissionState;
}
```

然后在插件接口中添加 `checkPermissions()` 和 `requestPermissions()` 的定义。这两个方法都将返回插件当前的权限状态（即 `PermissionStatus`）。

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;
+  checkPermissions(): Promise<PermissionStatus>;
+  requestPermissions(): Promise<PermissionStatus>;
 }
```

由于这些方法已添加到插件接口，因此必须在插件支持的所有平台上实现。

### 权限实现

在 `src/web.ts` 中为 Web 实现添加权限检查与请求方法：

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

该方法应返回插件当前的权限状态。这些信息可以直接从特定 Web API 获取，或通过 [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) 查询。

注意：当使用浏览器支持度不一的 Web API（如 Permissions API）时，应实现特性检测并在浏览器不支持时抛出适当错误。

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

该方法应提示用户授予插件所需的平台 API 权限，然后返回提示后的新权限状态（与 `checkPermissions()` 类似）。

在 Web 平台上，有时无法将权限请求与实际调用分离。例如地理定位 API 只在实际请求位置时才触发权限询问。对于这种情况，建议抛出未实现异常。

```typescript
async requestPermissions(): Promise<PermissionStatus> {
  // 当前插件是否支持在Web端请求权限？
  throw this.unimplemented('Web端未实现该功能');
}
```

## 错误处理

Capacitor Web 插件经常需要与尚未被所有浏览器支持或标准化的 API 交互。尽管如此，我们通常建议为插件实现最佳可用方案，并在 API 不可用时优雅降级，因此 Web 端的错误处理尤为重要！

### 不可用错误

当功能暂时无法使用时应该抛出此错误。常见场景包括：

- 缺少必要前提条件（如网络连接）
- 当前浏览器未实现底层 API

下例中我们先检查 `navigator.geolocation` 是否存在。如果不存在，说明浏览器不支持地理定位功能，此时应抛出"不可用"错误。

```typescript
async getLocation(): Promise<Location> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    throw this.unavailable('当前浏览器不支持地理定位 API');
  }

  // 实际的Web实现代码
}
```

### 未实现错误

当功能尚未实现时可抛出此错误。你可以用它在 Web 端暂存方法以待后续实现，或表明某些平台无法实现该功能。

```typescript
async getLocation(): Promise<Location> {
  throw this.unimplemented('Web端未实现该功能');
}
```