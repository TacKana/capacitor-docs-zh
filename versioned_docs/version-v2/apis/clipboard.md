---
title: 剪贴板
description: 剪贴板 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/clipboard
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Clipboard API 支持剪贴板的复制和粘贴操作。在 iOS 上，此 API 还允许复制图像和 URL。

- [`write(...)`](#write)
- [`read()`](#read)
- [接口](#接口)

## 示例

```typescript
import { Plugins } from '@capacitor/core';

const { Clipboard } = Plugins;

Clipboard.write({
  string: '你好，世界',
});

let result = await Clipboard.read();
console.log('从剪贴板获取到', result.type, ':', result.value);
```

## API

### write(...)

```typescript
write(options: ClipboardWrite) => Promise<void>
```

向剪贴板写入值（"复制"操作）

| 参数 | 类型 |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#clipboardwrite">ClipboardWrite</a></code> |

---

### read()

```typescript
read() => Promise<ClipboardReadResult>
```

从剪贴板读取值（"粘贴"操作）

**返回：** <code>Promise&lt;<a href="#clipboardreadresult">ClipboardReadResult</a>&gt;</code>

---

### 接口

#### ClipboardWrite

| 属性 | 类型 |
| ------------ | ------------------- |
| **`string`** | <code>string</code> |
| **`image`**  | <code>string</code> |
| **`url`**    | <code>string</code> |
| **`label`**  | <code>string</code> |

#### ClipboardReadResult

| 属性 | 类型 |
| ----------- | ------------------- |
| **`value`** | <code>string</code> |
| **`type`**  | <code>string</code> |
