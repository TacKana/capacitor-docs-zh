---
title: Clipboard - Capacitor 剪贴板插件 API
description: 剪贴板 API 实现了从系统剪贴板复制和粘贴的功能。
sidebar_label: Clipboard 剪贴板
translated: true
---

# @capacitor/clipboard

剪贴板 API 实现了从系统剪贴板复制和粘贴的功能。

## 安装

```bash
npm install @capacitor/clipboard@latest-5
npx cap sync
```

## 示例

```typescript
import { Clipboard } from '@capacitor/clipboard';

const writeToClipboard = async () => {
  await Clipboard.write({
    string: "Hello World!"
  });
};

const checkClipboard = async () => {
  const { type, value } = await Clipboard.read();

  console.log(`从剪贴板获取到 ${type}: ${value}`);
};
```

## API

<docgen-index>

* [`write(...)`](#write)
* [`read()`](#read)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--更新源文件的 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### write(...)

```typescript
write(options: WriteOptions) => Promise<void>
```

将值写入剪贴板（"复制"操作）

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#writeoptions">WriteOptions</a></code> |

**自从:** 1.0.0

--------------------


### read()

```typescript
read() => Promise<ReadResult>
```

从剪贴板读取值（"粘贴"操作）

**返回:** <code>Promise&lt;<a href="#readresult">ReadResult</a>&gt;</code>

**自从:** 1.0.0

--------------------


### 接口


#### WriteOptions

表示要写入剪贴板的数据。

| 属性         | 类型                | 描述                                                                                                     | 自从 |
| ------------ | ------------------- | -------------------------------------------------------------------------------------------------------- | ---- |
| **`string`** | <code>string</code> | 要复制的文本值。                                                                                          | 1.0.0 |
| **`image`**  | <code>string</code> | 要复制的 [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) 格式图像。 | 1.0.0 |
| **`url`**    | <code>string</code> | 要复制的 URL 字符串。                                                                                     | 1.0.0 |
| **`label`**  | <code>string</code> | 伴随复制数据的用户可见标签（仅 Android）。                                                                | 1.0.0 |


#### ReadResult

表示从剪贴板读取的数据。

| 属性        | 类型                | 描述                    | 自从 |
| ----------- | ------------------- | ----------------------- | ---- |
| **`value`** | <code>string</code> | 从剪贴板读取的数据。     | 1.0.0 |
| **`type`**  | <code>string</code> | 剪贴板中的数据类型。     | 1.0.0 |

</docgen-api>
