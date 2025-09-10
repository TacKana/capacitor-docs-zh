---
title: Capacitor Web/PWA 插件指南
description: Capacitor Web/PWA 插件指南
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: Web/PWA 指南
slug: /plugins/web
---

# Capacitor Web/PWA 插件指南

Capacitor 采用了 Web/原生兼容层架构，使得开发插件时能够轻松实现原生运行与 Web 端 PWA 环境下的功能兼容。

## 快速开始

首先，按照插件指南中的[入门章节](/plugins/creating-plugins/overview.md#plugin-generator)所示生成一个插件。

接着，在你选择的编辑器中打开 `echo/src/web.ts` 文件。

## 示例

Capacitor 的 Web 插件基本结构如下所示：

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

`EchoPlugin` 接口定义了插件的方法签名。在 TypeScript 中，我们可以确保 Web 实现（即 `EchoWeb` 类）正确实现了该接口。

## 权限管理

如果你的插件在 Web 端需要获取终端用户的权限，则需要实现权限管理机制。

### 权限别名

你需要设计一个或多个别名，用于抽象和分组插件所需的权限。这些别名用于传达权限状态。默认情况下，别名可处于以下状态之一：

- `granted`：该别名下的所有权限均已获得终端用户授权（或无需提示）。
- `denied`：该别名下的一个或多个权限已被终端用户拒绝。
- `prompt`：应向终端用户请求权限，因为当前既未授权也未拒绝。
- `prompt-with-rationale`：终端用户先前已拒绝权限，但尚未阻止提示。

这些状态由从 `@capacitor/core` 导出的 `PermissionState` 类型表示。

如有需要，也可以为别名定义自定义状态。例如，官方的[相机插件](/apis/camera.md)还为 `camera` 和 `photos` 别名定义了 `limited` 状态。

权限别名是跨平台的，因此在确定插件别名时，请务必考虑 iOS、Android 和 Web 的权限差异。

### 权限状态定义

在 `src/definitions.ts` 中，从 Capacitor 导入 `PermissionState`，并定义一个 `PermissionStatus` 接口，该接口表示插件中权限的状态，以你设计的别名作为键。

以下示例中，权限状态完全可由 `location` 别名表示，其状态可为 `granted`、`denied` 等。

```typescript
import type { PermissionState } from '@capacitor/core';

export interface PermissionStatus {
  // 实际使用时请将 'location' 替换为你的别名！
  location: PermissionState;
}
```

然后，在你的插件接口中添加 `checkPermissions()` 和 `requestPermissions()` 的定义。这两个方法都将返回插件中权限的当前状态，由 `PermissionStatus` 定义。

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;
+  checkPermissions(): Promise<PermissionStatus>;
+  requestPermissions(): Promise<PermissionStatus>;
 }
```

由于这些方法已添加到插件接口中，因此必须在插件支持的所有平台上实现它们。

### 实现权限管理

在 `src/web.ts` 中，将 `checkPermissions()` 和 `requestPermissions()` 方法添加到你的 Web 实现中。

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

此方法应返回插件中权限的当前状态。此信息可能直接来自特定的 Web API，或通过[权限 API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) 获取。

请注意，在使用浏览器支持程度不一的 Web API（如权限 API）时，应实现特性检测，并在终端用户的浏览器不支持时抛出适当的错误。

```diff
 async checkPermissions(): Promise<PermissionStatus> {
+  if (typeof navigator === 'undefined' || !navigator.permissions) {
+    throw this.unavailable('此浏览器不支持权限 API。');
+  }

   const permission = await navigator.permissions.query( ... );

   // 待实现
 }
```

#### `requestPermissions()`

此方法应提示终端用户授权插件所需的平台 API。然后，它应返回提示后插件中权限的新状态（类似于 `checkPermissions()` 方法）。

在 Web 端，有时无法将权限请求与实际调用分开。例如，Geolocation API 仅在请求位置时才请求权限。对于这种情况，建议抛出未实现的异常。

```typescript
async requestPermissions(): Promise<PermissionStatus> {
  // 待确认：Web 端是否支持请求此插件所需的权限？
  throw this.unimplemented('Web 端未实现此功能。');
}
```

## 错误处理

Capacitor 的 Web 插件通常需要处理某些浏览器尚未支持或尚未标准化的 API。尽管如此，通常会对插件的 Web 实现采取尽力而为的策略，并在 API 不可用时优雅地降级处理。因此，错误处理在 Web 端尤其重要！

### 不可用 (Unavailable)

此错误表示当前无法使用该功能。

可能的原因包括：

- 当前缺少先决条件，例如网络连接。
- 需要支持底层 API 的浏览器。

以下示例中，我们首先检查 `navigator` 上是否定义了 `geolocation`。如果未定义，则表示浏览器不支持 Geolocation，应抛出“不可用”错误。否则，继续执行实现。

```typescript
async getLocation(): Promise<Location> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    throw this.unavailable('此浏览器不支持 Geolocation API。');
  }

  // 实际 Web 实现待完成
}

```

### 未实现 (Unimplemented)

此错误表示功能尚未实现。你可以使用此错误在 Web 端暂存方法以供后续实现，或用于指示某些平台无法实现该功能。

```typescript
async getLocation(): Promise<Location> {
  throw this.unimplemented('Web 端未实现此功能。');
}
```