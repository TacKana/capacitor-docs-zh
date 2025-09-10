---
title: Dialog Capacitor Plugin API
description: Dialog API 提供了一系列方法用于触发原生对话框，包括警告框、确认框和输入提示框
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/dialog/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/dialog/src/definitions.ts
sidebar_label: Dialog
---

# @capacitor/dialog

Dialog API 提供了一系列方法用于触发原生对话框，包括警告框、确认框和输入提示框

## 安装

```bash
npm install @capacitor/dialog
npx cap sync
```

## 示例

```typescript
import { Dialog } from '@capacitor/dialog';

const showAlert = async () => {
  await Dialog.alert({
    title: '停止',
    message: '这是一个错误',
  });
};

const showConfirm = async () => {
  const { value } = await Dialog.confirm({
    title: '确认',
    message: `确定要按下红色按钮吗？`,
  });

  console.log('已确认:', value);
};

const showPrompt = async () => {
  const { value, cancelled } = await Dialog.prompt({
    title: '你好',
    message: `请问你叫什么名字？`,
  });

  console.log('姓名:', value);
  console.log('已取消:', cancelled);
};
```

## API

<docgen-index>

- [`alert(...)`](#alert)
- [`prompt(...)`](#prompt)
- [`confirm(...)`](#confirm)
- [接口](#interfaces)

</docgen-index>

<docgen-api>

### alert(...)

```typescript
alert(options: AlertOptions) => Promise<void>
```

显示警告对话框

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#alertoptions">AlertOptions</a></code> |

**自:** 1.0.0

---

### prompt(...)

```typescript
prompt(options: PromptOptions) => Promise<PromptResult>
```

显示输入提示对话框

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#promptoptions">PromptOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#promptresult">PromptResult</a>&gt;</code>

**自:** 1.0.0

---

### confirm(...)

```typescript
confirm(options: ConfirmOptions) => Promise<ConfirmResult>
```

显示确认对话框

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#confirmoptions">ConfirmOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#confirmresult">ConfirmResult</a>&gt;</code>

**自:** 1.0.0

---

### Interfaces

#### AlertOptions

| 属性              | 类型                | 描述               | 默认值              | 自    |
| ----------------- | ------------------- | ------------------ | ------------------- | ----- |
| **`title`**       | <code>string</code> | 对话框标题         |                     | 1.0.0 |
| **`message`**     | <code>string</code> | 对话框中显示的消息 |                     | 1.0.0 |
| **`buttonTitle`** | <code>string</code> | 操作按钮显示的文本 | <code>"确定"</code> | 1.0.0 |

#### PromptResult

| 属性            | 类型                 | 描述                       | 自    |
| --------------- | -------------------- | -------------------------- | ----- |
| **`value`**     | <code>string</code>  | 输入框中输入的文本         | 1.0.0 |
| **`cancelled`** | <code>boolean</code> | 标识提示框是被取消还是接受 | 1.0.0 |

#### PromptOptions

| 属性                    | 类型                | 描述               | 默认值              | 自    |
| ----------------------- | ------------------- | ------------------ | ------------------- | ----- |
| **`title`**             | <code>string</code> | 对话框标题         |                     | 1.0.0 |
| **`message`**           | <code>string</code> | 对话框中显示的消息 |                     | 1.0.0 |
| **`okButtonTitle`**     | <code>string</code> | 确认按钮显示的文本 | <code>"确定"</code> | 1.0.0 |
| **`cancelButtonTitle`** | <code>string</code> | 取消按钮显示的文本 | <code>"取消"</code> | 1.0.0 |
| **`inputPlaceholder`**  | <code>string</code> | 输入框提示文本     |                     | 1.0.0 |
| **`inputText`**         | <code>string</code> | 预填充文本         |                     | 1.0.0 |

#### ConfirmResult

| 属性        | 类型                 | 描述                                      | 自    |
| ----------- | -------------------- | ----------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 如果点击了确认按钮则为 true，否则为 false | 1.0.0 |

#### ConfirmOptions

| 属性                    | 类型                | 描述               | 默认值              | 自    |
| ----------------------- | ------------------- | ------------------ | ------------------- | ----- |
| **`title`**             | <code>string</code> | 对话框标题         |                     | 1.0.0 |
| **`message`**           | <code>string</code> | 对话框中显示的消息 |                     | 1.0.0 |
| **`okButtonTitle`**     | <code>string</code> | 确认按钮显示的文本 | <code>"确定"</code> | 1.0.0 |
| **`cancelButtonTitle`** | <code>string</code> | 取消按钮显示的文本 | <code>"取消"</code> | 1.0.0 |

</docgen-api>
