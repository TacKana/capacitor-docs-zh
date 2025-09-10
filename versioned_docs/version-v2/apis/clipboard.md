---
title: Clipboard
description: 剪贴板 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/clipboard
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

剪贴板（Clipboard）API 支持向系统剪贴板写入内容或从中读取内容。在 iOS 平台上，该 API 还支持复制图片和 URL。

- [`write(...)`](#write)
- [`read()`](#read)
- [接口定义](#interfaces)

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

## API 接口

### write(...)

```typescript
write(options: ClipboardWrite) => Promise<void>
```

向剪贴板写入内容（即"复制"操作）

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#clipboardwrite">ClipboardWrite</a></code> |

---

### read()

```typescript
read() => Promise<ClipboardReadResult>
```

从剪贴板读取内容（即"粘贴"操作）

**返回值:** <code>Promise&lt;<a href="#clipboardreadresult">ClipboardReadResult</a>&gt;</code>

---

### 接口定义

#### ClipboardWrite

| 属性          | 类型                |
| ------------ | ------------------- |
| **`string`** | <code>string</code> |
| **`image`**  | <code>string</code> |
| **`url`**    | <code>string</code> |
| **`label`**  | <code>string</code> |

#### ClipboardReadResult

| 属性         | 类型                |
| ----------- | ------------------- |
| **`value`** | <code>string</code> |
| **`type`**  | <code>string</code> |