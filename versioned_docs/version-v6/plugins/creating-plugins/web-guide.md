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

Capacitor 采用了 Web/原生兼容层，使得构建插件时，无论是在原生环境运行还是在 Web 上作为 PWA 运行，都能轻松实现相应功能。

## 开始使用

首先，按照插件指南中[快速开始](/plugins/creating-plugins/overview.md#plugin-generator)部分的说明生成一个插件。

接下来，在你选择的编辑器中打开 `echo/src/web.ts` 文件。

## 示例

Capacitor 的 Web 插件基本结构如下：

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

`EchoPlugin` 接口定义了插件的方法签名。在 TypeScript 中，我们可以确保 Web 实现（`EchoWeb` 类）正确实现了该接口。

## 权限管理 {#permissions}

如果你的插件在 Web 上运行时需要获取最终用户的权限，那么你就需要实现权限管理机制。

### 权限别名

你需要为插件所需的权限创建一个或多个别名，用于抽象和分组权限。这些别名用于传达权限状态。默认情况下，别名可以处于以下状态之一：

- `granted`：此别名下的所有权限均已被最终用户授予（或无需提示）。
- `denied`：此别名下的一个或多个权限已被最终用户拒绝。
- `prompt`：应向最终用户请求权限，因为权限既未被授予也未被拒绝。
- `prompt-with-rationale`：最终用户先前已拒绝过权限，但尚未阻止提示。

这些状态由从 `@capacitor/core` 导出的 `PermissionState` 类型表示。

如有必要，也可以为别名定义自定义状态。例如，官方的[相机插件](/apis/camera.md) 还为 `camera` 和 `photos` 别名定义了 `limited` 状态。

权限别名是跨平台的，因此在决定插件的别名时，请务必考虑 iOS、Android 和 Web 的权限差异。

### 权限状态定义 {#permission-status-definitions}

在 `src/definitions.ts` 中，从 Capacitor 导入 `PermissionState`，并定义一个 `PermissionStatus` 接口，用于表示插件中权限的状态，键名为你定义的别名。

下面的示例中，权限状态可以完全由 `location` 别名表示，其状态可以是 `granted`、`denied` 等。

```typescript
import type { PermissionState } from '@capacitor/core';

export interface PermissionStatus {
  // TODO: 将 'location' 改为你实际使用的别名名称！
  location: PermissionState;
}
```

然后，在你的插件接口中添加 `checkPermissions()` 和 `requestPermissions()` 方法的定义。这两个方法都将返回插件中权限的当前状态，其类型为 `PermissionStatus`。

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
+    // TODO
+  }

+  async requestPermissions(): Promise<PermissionStatus> {
+    // TODO
+  }
 }
```

#### `checkPermissions()`

此方法应返回插件中权限的当前状态。这些信息可能直接来自特定的 Web API，也可能来自[Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)。

请注意，在使用浏览器支持程度不一的 Web API（例如 Permissions API）时，你应该实现特性检测，并在最终用户的浏览器不支持时抛出适当的错误。

```diff
 async checkPermissions(): Promise<PermissionStatus> {
+  if (typeof navigator === 'undefined' || !navigator.permissions) {
+    throw this.unavailable('Permissions API not available in this browser.');
+  }

   const permission = await navigator.permissions.query( ... );

   // TODO
 }
```

#### `requestPermissions()`

此方法应提示最终用户授予插件所需平台 API 的权限。然后，它应返回提示后插件中权限的新状态（类似于 `checkPermissions()` 方法）。

在 Web 上，有时无法将请求权限与实际调用分开。例如，Geolocation API 仅在请求位置信息时才会请求权限。对于这种情况，我们建议抛出未实现的异常。

```typescript
async requestPermissions(): Promise<PermissionStatus> {
  // TODO: Web 端是否支持为我的插件请求权限？
  throw this.unimplemented('Not implemented on web.');
}
```

## 错误处理 {#error-handling}

Web 端的 Capacitor 插件通常需要处理那些尚未被某些浏览器采纳甚至尚未标准化的 API。尽管如此，我们通常会为插件的 Web 实现采取尽力而为的策略，并在 API 不可用时优雅地失败。这就是为什么 Web 端的错误处理尤为重要！

### 功能不可用

当功能当前无法使用时，应抛出此错误。

原因可能包括：

- 当前缺少先决条件，例如网络连接。
- 需要浏览器已实现底层 API。

在下面的示例中，我们首先检查 `navigator` 上是否定义了 `geolocation`。如果没有，则意味着浏览器不支持 Geolocation API，我们应该抛出“功能不可用”错误。否则，我们可以继续实现。

```typescript
async getLocation(): Promise<Location> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    throw this.unavailable('Geolocation API not available in this browser.');
  }

  // TODO: 实际的 Web 实现
}

```

### 功能未实现

此错误可用于表示功能尚未实现。你可以使用它在 Web 端暂存方法以供后续实现，或用于表示该功能无法在特定平台上实现。

```typescript
async getLocation(): Promise<Location> {
  throw this.unimplemented('Not implemented on web.');
}
```