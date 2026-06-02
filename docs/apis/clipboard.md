---
title: Clipboard Capacitor 插件 API
description: Clipboard API 支持从系统剪贴板进行复制和粘贴操作。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/clipboard/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/clipboard/src/definitions.ts
sidebar_label: 剪贴板
translated: true
source_hash: 5db66aaf
---

# @capacitor/clipboard

Clipboard API 支持从系统剪贴板进行复制和粘贴操作。

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
    string: "Hello World!"
  });
};

const checkClipboard = async () => {
  const { type, value } = await Clipboard.read();

  console.log(`Got ${type} from clipboard: ${value}`);
};
```

## API

<docgen-index>

* [`write(...)`](#write)
* [`read()`](#read)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### write(...)

```typescript
write(options: WriteOptions) => Promise<void>
```

向剪贴板写入一个值（"复制"操作）

| 参数            | 类型                                                    |
| --------------- | ------------------------------------------------------- |
| **`options`**   | <code><a href="#writeoptions">WriteOptions</a></code>   |

**Since:** 1.0.0

--------------------


### read()

```typescript
read() => Promise<ReadResult>
```

从剪贴板读取一个值（"粘贴"操作）

**返回:** <code>Promise&lt;<a href="#readresult">ReadResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### 接口


#### WriteOptions

表示要写入剪贴板的数据。

| 属性           | 类型                  | 描述                                                                                                           | Since |
| -------------- | --------------------- | -------------------------------------------------------------------------------------------------------------- | ----- |
| **`string`**   | <code>string</code>   | 要复制的文本值。                                                                                               | 1.0.0 |
| **`image`**    | <code>string</code>   | 要复制的 [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) 格式图像。     | 1.0.0 |
| **`url`**      | <code>string</code>   | 要复制的 URL 字符串。                                                                                          | 1.0.0 |
| **`label`**    | <code>string</code>   | 用户可见的标签，用于伴随复制的数据（仅 Android）。                                                              | 1.0.0 |


#### ReadResult

表示从剪贴板读取的数据。

| 属性          | 类型                  | 描述                        | Since |
| ------------- | --------------------- | --------------------------- | ----- |
| **`value`**   | <code>string</code>   | 从剪贴板读取的数据。        | 1.0.0 |
| **`type`**    | <code>string</code>   | 剪贴板中数据的类型。        | 1.0.0 |

</docgen-api>
