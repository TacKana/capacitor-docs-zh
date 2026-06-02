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

Capacitor 利用 Web/原生兼容层，使得构建的插件既能在原生运行时拥有完整功能，也能在 Web 上的 PWA 中正常运行。

## 开始使用

首先，按照插件指南的[开始使用](/plugins/creating-plugins/overview.md#plugin-generator)部分所示生成一个插件。

接下来，在您选择的编辑器中打开 `echo/src/web.ts`。

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

`EchoPlugin` 接口定义了插件的方法签名。在 TypeScript 中，我们可以确保 Web 实现（`EchoWeb` 类）正确实现了该接口。

## 权限

如果您的插件在 Web 上需要最终用户的权限才能使用某些功能，那么您需要实现权限模式。

### 别名

您需要开发一个或多个别名来抽象和分组插件所需的权限。这些别名用于传达权限状态。默认情况下，别名可以处于以下状态之一：

- `granted`（已授予）：该别名下的所有权限均已获得最终用户授权（或无需提示）。
- `denied`（已拒绝）：该别名下的一个或多个权限已被最终用户拒绝。
- `prompt`（需提示）：应提示最终用户授权，因为权限既未授予也未拒绝。
- `prompt-with-rationale`（需提示并说明理由）：最终用户之前已拒绝过权限，但尚未阻止提示。

这些状态由 `@capacitor/core` 导出的 `PermissionState` 类型表示。

如有需要，还可以为别名定义自定义状态。例如，官方的 [Camera 插件](/apis/camera.md) 还为 `camera` 和 `photos` 别名定义了 `limited` 状态。

别名是跨平台的，因此在决定插件别名时，请确保考虑到 iOS、Android 和 Web 的权限。

### 权限状态定义

在 `src/definitions.ts` 中，从 Capacitor 导入 `PermissionState`，并定义一个 `PermissionStatus` 接口，该接口以您创建的别名为键，表示插件中的权限状态。

在下面的示例中，权限状态可以完全由一个 `location` 别名表示，该别名可以是 `granted`、`denied` 等。

```typescript
import type { PermissionState } from '@capacitor/core';

export interface PermissionStatus {
  // TODO: 将 'location' 改为您别名的实际名称！
  location: PermissionState;
}
```

然后，在插件接口中添加 `checkPermissions()` 和 `requestPermissions()` 方法的定义。这两个方法都将返回 `PermissionStatus` 所定义的插件当前权限状态。

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;
+  checkPermissions(): Promise<PermissionStatus>;
+  requestPermissions(): Promise<PermissionStatus>;
 }
```

由于这些方法被添加到插件接口中，因此必须在插件支持的所有平台上实现它们。

### 实现权限

在 `src/web.ts` 中，将 `checkPermissions()` 和 `requestPermissions()` 方法添加到您的 Web 实现中。

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

此方法应返回插件中权限的当前状态。此信息可能直接来自特定的 Web API，或者来自[权限 API (Permissions API)](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)。

请记住，在使用浏览器支持不完善的 Web API（如权限 API）时，您应该实现特性检测，并在最终用户的浏览器不支持时抛出适当的错误。

```diff
 async checkPermissions(): Promise<PermissionStatus> {
+  if (typeof navigator === 'undefined' || !navigator.permissions) {
+    throw this.unavailable('此浏览器不支持权限 API。');
+  }

   const permission = await navigator.permissions.query( ... );

   // TODO
 }
```

#### `requestPermissions()`

此方法应向最终用户请求使用插件所需平台 API 的权限。然后，它应在请求后返回插件中权限的新状态（与 `checkPermissions()` 方法类似）。

在 Web 上，有时无法将权限请求与实际调用分开。例如，Geolocation API 仅在请求位置时才会请求权限。对于这种情况，我们建议抛出未实现异常。

```typescript
async requestPermissions(): Promise<PermissionStatus> {
  // TODO: Web 是否支持为我的插件请求权限？
  throw this.unimplemented('Web 上未实现。');
}
```

## 错误处理

Web 的 Capacitor 插件通常使用一些尚未被某些浏览器采用甚至尚未标准化的 API。尽管如此，通常的做法是对插件的 Web 实现采取尽力而为的方法，在 API 不可用时优雅地失败。这就是错误处理在 Web 上特别重要的原因！

### Unavailable（不可用）

此错误应抛出以表示该功能当前无法使用。

原因包括：

- 当前缺少先决条件，例如网络连接。
- 需要已实现底层 API 的浏览器。

在下面的示例中，我们首先检查 `navigator` 上是否定义了 `geolocation`。如果没有定义，说明浏览器不支持地理位置功能，我们应该抛出 "unavailable" 错误。否则，我们可以继续实现。

```typescript
async getLocation(): Promise<Location> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    throw this.unavailable('此浏览器不支持地理位置 API。');
  }

  // TODO: 实际的 Web 实现
}

```

### Unimplemented（未实现）

此错误可抛出以表示该功能尚未实现。您可以用它来在 Web 上存根方法以待后续实现，或表示该功能在某个平台上无法实现。

```typescript
async getLocation(): Promise<Location> {
  throw this.unimplemented('Web 上未实现。');
}
```
