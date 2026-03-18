---
title: Clipboard
description: 剪贴板 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/clipboard
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

剪贴板 API 支持向剪贴板复制和从中粘贴内容。在 iOS 平台上，此 API 还允许复制图像和 URL。

- [`write(...)`](#write)
- [`read()`](#read)
- [接口](#interfaces)

## 示例

```typescript
import { Plugins } from '@capacitor/core';

const { Clipboard } = Plugins;

Clipboard.write({
  string: 'Hello, Moto',
});

let result = await Clipboard.read();
console.log('Got', result.type, 'from clipboard:', result.value);
```

## API

### write(...)

```typescript
write(options: ClipboardWrite) => Promise<void>
```

向剪贴板写入值（“复制”操作）

| 参数            | 类型                                                      |
| --------------- | --------------------------------------------------------- |
| **`options`**   | <code><a href="#clipboardwrite">ClipboardWrite</a></code> |

---

### read()

```typescript
read() => Promise<ClipboardReadResult>
```

从剪贴板读取值（“粘贴”操作）

**返回值：** <code>Promise&lt;<a href="#clipboardreadresult">ClipboardReadResult</a>&gt;</code>

---

### 接口

#### ClipboardWrite

| 属性           | 类型                |
| -------------- | ------------------- |
| **`string`**   | <code>string</code> |
| **`image`**    | <code>string</code> |
| **`url`**      | <code>string</code> |
| **`label`**    | <code>string</code> |

#### ClipboardReadResult

| 属性          | 类型                |
| ------------- | ------------------- |
| **`value`**   | <code>string</code> |
| **`type`**    | <code>string</code> |