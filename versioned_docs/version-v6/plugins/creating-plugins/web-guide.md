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

Capacitor 利用 Web/原生兼容层，使得构建的插件既能在原生环境中运行，也能在 Web 上的 PWA 中运行。

## 开始使用

首先，按照插件指南的[开始使用](/plugins/creating-plugins/overview.md#plugin-generator)部分所示生成一个插件。

然后，在你选择的编辑器中打开 `echo/src/web.ts`。

## 示例

Capacitor Web 插件的基本结构如下所示：

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

`EchoPlugin` 接口定义了插件的方法签名。在 TypeScript 中，我们可以确保 Web 实现（`EchoWeb` 类）正确地实现了该接口。

## 权限

如果你的插件在 Web 上需要最终用户的权限才能使用某些功能，那么你需要实现权限模式。

### 别名

你需要开发一个或多个别名来抽象和分组插件所需的权限。这些别名用于传达权限状态。默认情况下，别名可以处于以下状态之一：

- `granted`（已授权）：该别名中的所有权限均已获得最终用户授权（或无需提示）。
- `denied`（已拒绝）：该别名中的一个或多个权限已被最终用户拒绝。
- `prompt`（需提示）：应提示最终用户授权，因为权限既未被授权也未被拒绝。
- `prompt-with-rationale`（需提示并说明原因）：最终用户之前拒绝过权限，但尚未阻止提示。

这些由 `@capacitor/core` 导出的 `PermissionState` 类型表示。

如有必要，也可以为别名定义自定义状态。例如，官方的 [Camera 插件](/apis/camera.md) 还为 `camera` 和 `photos` 别名定义了 `limited`（受限）状态。

别名是跨平台的，因此在决定插件的别名时，请务必考虑 iOS、Android 和 Web 的权限。

### 权限状态定义

在 `src/definitions.ts` 中，从 Capacitor 导入 `PermissionState` 并定义一个 `PermissionStatus` 接口，该接口以你设定的别名为键，表示插件中权限的状态。

在下面的示例中，权限状态可以完全由一个 `location` 别名表示，该别名可以是 `granted`、`denied` 等。

```typescript
import type { PermissionState } from '@capacitor/core';

export interface PermissionStatus {
  // TODO: 将 'location' 改为你的实际别名名称！
  location: PermissionState;
}
```

然后，在插件接口中添加 `checkPermissions()` 和 `requestPermissions()` 的定义。这两个方法都将返回 `PermissionStatus` 所定义的插件当前权限状态。

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;
+  checkPermissions(): Promise<PermissionStatus>;
+  requestPermissions(): Promise<PermissionStatus>;
 }
```

由于这些方法已添加到插件接口中，因此必须在插件支持的所有平台上实现它们。

### 实现权限

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

此方法应返回插件中权限的当前状态。此信息可能直接在特定的 Web API 上可用，或者通过[权限 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions_API) 获取。

请记住，在处理浏览器支持不完善的 Web API（如权限 API）时，你应该实现特性检测，并在最终用户的浏览器不支持时抛出适当的错误。

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

此方法应提示最终用户授权使用插件所需的平台 API。然后，它应返回提示后插件的新权限状态（与 `checkPermissions()` 方法类似）。

在 Web 上，有时无法将权限请求与实际调用分离开来。例如，地理定位 API 仅在请求位置时才会请求权限。对于此类情况，我们建议抛出未实现的异常。

```typescript
async requestPermissions(): Promise<PermissionStatus> {
  // TODO: Web 是否支持为我的插件请求权限？
  throw this.unimplemented('Not implemented on web.');
}
```

## 错误处理

Capacitor 的 Web 插件通常需要与一些尚未被某些浏览器采用甚至尚未标准化的 API 打交道。尽管如此，通常的做法是对插件的 Web 实现采取尽力而为的方式，并在 API 不可用时优雅地失败。这就是为什么错误处理在 Web 上尤其重要！

### 不可用

抛出此错误表示该功能当前无法使用。

原因包括：

- 当前缺少先决条件，例如网络连接。
- 需要浏览器实现了底层 API。

在下面的示例中，我们首先检查 `navigator` 上是否定义了 `geolocation`。如果没有，则表示浏览器不支持地理定位，我们应该抛出"不可用"错误。否则，我们可以继续实现。

```typescript
async getLocation(): Promise<Location> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    throw this.unavailable('Geolocation API not available in this browser.');
  }

  // TODO: 实际的 Web 实现
}

```

### 未实现

抛出此错误表示该功能尚未实现。你可以使用它来在 Web 上存根你的方法以供后续实现，或表示该功能无法在特定平台上实现。

```typescript
async getLocation(): Promise<Location> {
  throw this.unimplemented('Not implemented on web.');
}
```
