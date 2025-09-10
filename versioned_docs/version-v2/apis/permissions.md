---
title: Permissions
description: 权限 API
contributors:
  - mlynch
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Permissions API 提供了一些方法，用于在请求权限之前检查某些权限是否已被授予。

这非常有用，例如，可以避免用户因不了解应用请求权限的原因而拒绝权限请求。相反，先检查权限，并可选地显示自定义界面让用户为权限检查做好准备，这样可以提高权限允许率并改善用户体验。

## API

### query(...)

```typescript
query(options: PermissionsOptions) => Promise<PermissionResult>
```

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#permissionsoptions">PermissionsOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#permissionresult">PermissionResult</a>&gt;</code>

---

### Interfaces

#### PermissionResult

| 属性        | 类型                                           |
| ----------- | ---------------------------------------------- |
| **`state`** | <code>"denied" \| "granted" \| "prompt"</code> |

#### PermissionsOptions

| 属性       | 类型                                                      |
| ---------- | --------------------------------------------------------- |
| **`name`** | <code><a href="#permissiontype">PermissionType</a></code> |

### Enums

#### PermissionType

| 成员                 | 值                             |
| -------------------- | ------------------------------ |
| **`Camera`**         | <code>"camera"</code>          |
| **`Photos`**         | <code>"photos"</code>          |
| **`Geolocation`**    | <code>"geolocation"</code>     |
| **`Notifications`**  | <code>"notifications"</code>   |
| **`ClipboardRead`**  | <code>"clipboard-read"</code>  |
| **`ClipboardWrite`** | <code>"clipboard-write"</code> |
| **`Microphone`**     | <code>"microphone"</code>      |
