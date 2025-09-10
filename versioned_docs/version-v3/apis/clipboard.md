---
title: Clipboard Capacitor 插件 API
description: 剪贴板 API 提供系统剪贴板的复制和粘贴功能。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/clipboard/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/clipboard/src/definitions.ts
sidebar_label: 剪贴板
---

# @capacitor/clipboard

该剪贴板 API 支持与系统剪贴板之间的复制和粘贴操作。

## 安装

```bash
npm install @capacitor/clipboard
npx cap sync
```

## 示例

```typescript
import { Clipboard } from '@capacitor/clipboard';

const writeToClipboard = async () => {
  await Clipboard.write({
    string: 'Hello World!',
  });
};

const checkClipboard = async () => {
  const { type, value } = await Clipboard.read();

  console.log(`从剪贴板获取到 ${type} 类型数据: ${value}`);
};
```

## API

<docgen-index>

- [`write(...)`](#write)
- [`read()`](#read)
- [接口定义](#interfaces)

</docgen-index>

<docgen-api>

### write(...)

```typescript
write(options: WriteOptions) => Promise<void>
```

向剪贴板写入值（"复制"操作）

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#writeoptions">WriteOptions</a></code> |

**起始版本:** 1.0.0

---

### read()

```typescript
read() => Promise<ReadResult>
```

从剪贴板读取值（"粘贴"操作）

**返回值:** <code>Promise&lt;<a href="#readresult">ReadResult</a>&gt;</code>

**起始版本:** 1.0.0

---

### Interfaces

#### WriteOptions

表示要写入剪贴板的数据。

| 属性         | 类型                | 描述                                                                                                        | 起始版本 |
| ------------ | ------------------- | ----------------------------------------------------------------------------------------------------------- | -------- |
| **`string`** | <code>string</code> | 要复制的文本值                                                                                              | 1.0.0    |
| **`image`**  | <code>string</code> | 要复制的 [Data URL](https://developer.mozilla.org/en-US/docs/v3/Web/HTTP/Basics_of_HTTP/Data_URIs) 格式图片 | 1.0.0    |
| **`url`**    | <code>string</code> | 要复制的 URL 字符串                                                                                         | 1.0.0    |
| **`label`**  | <code>string</code> | 伴随复制数据的用户可见标签（仅限 Android）                                                                  | 1.0.0    |

#### ReadResult

表示从剪贴板读取的数据。

| 属性        | 类型                | 描述               | 起始版本 |
| ----------- | ------------------- | ------------------ | -------- |
| **`value`** | <code>string</code> | 从剪贴板读取的数据 | 1.0.0    |
| **`type`**  | <code>string</code> | 剪贴板中数据的类型 | 1.0.0    |

</docgen-api>
