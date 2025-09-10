---
title: Dialog Capacitor Plugin API
description: Dialog API 提供触发原生对话框的方法，用于显示警告、确认和输入提示
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/dialog/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/dialog/src/definitions.ts
sidebar_label: Dialog
---

# @capacitor/dialog

Dialog API 提供了多种方法来触发原生对话框，可用于显示警告提示、确认窗口和输入框。

## 安装

```bash
npm install @capacitor/dialog@latest-5
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
    message: `您确定要按下红色按钮吗？`,
  });

  console.log('确认结果:', value);
};

const showPrompt = async () => {
  const { value, cancelled } = await Dialog.prompt({
    title: '你好',
    message: `请问你的名字是？`,
  });

  console.log('输入的名字:', value);
  console.log('是否取消:', cancelled);
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
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### alert(...)

```typescript
alert(options: AlertOptions) => Promise<void>
```

显示警告对话框

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#alertoptions">AlertOptions</a></code> |

**自版本:** 1.0.0

---

### prompt(...)

```typescript
prompt(options: PromptOptions) => Promise<PromptResult>
```

显示输入对话框

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#promptoptions">PromptOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#promptresult">PromptResult</a>&gt;</code>

**自版本:** 1.0.0

---

### confirm(...)

```typescript
confirm(options: ConfirmOptions) => Promise<ConfirmResult>
```

显示确认对话框

| 参数          | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#confirmoptions">ConfirmOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#confirmresult">ConfirmResult</a>&gt;</code>

**自版本:** 1.0.0

---

### Interfaces

#### AlertOptions

| 属性              | 类型                | 描述               | 默认值            | 自版本 |
| ----------------- | ------------------- | ------------------ | ----------------- | ------ |
| **`title`**       | <code>string</code> | 对话框标题         |                   | 1.0.0  |
| **`message`**     | <code>string</code> | 对话框中显示的消息 |                   | 1.0.0  |
| **`buttonTitle`** | <code>string</code> | 操作按钮显示的文本 | <code>"OK"</code> | 1.0.0  |

#### PromptResult

| 属性            | 类型                 | 描述                         | 自版本 |
| --------------- | -------------------- | ---------------------------- | ------ |
| **`value`**     | <code>string</code>  | 在输入框中输入的文本         | 1.0.0  |
| **`cancelled`** | <code>boolean</code> | 表示对话框是被取消还是被接受 | 1.0.0  |

#### PromptOptions

| 属性                    | 类型                | 描述                 | 默认值                | 自版本   |
| ----------------------- | ------------------- | -------------------- | --------------------- | -------- |
| **`title`**             | <code>string</code> | 对话框标题           |                       | 1.0.0    |
| **`message`**           | <code>string</code> | 对话框中显示的消息   |                       | 1.0.0    |
| **`okButtonTitle`**     | <code>string</code> | 确认按钮显示的文本   | <code>"OK"</code>     | 1.cover0 |
| **`cancelButtonTitle`** | <code>string</code> | 取消按钮显示的文本   | <code>"Cancel"</code> | 1.0.0    |
| **`inputPlaceholder`**  | <code>string</code> | 输入框的占位提示文本 |                       | 1.0.0    |
| **`inputText`**         | <code>string</code> | 输入框中预填充的文本 |                       | 1.0.0    |

#### ConfirmResult

| 属性        | 类型                 | 描述                                      | 自版本 |
| ----------- | -------------------- | ----------------------------------------- | ------ |
| **`value`** | <code>boolean</code> | 如果点击了确认按钮则为 true，否则为 false | 1.0.0  |

#### ConfirmOptions

| 属性                    | 类型                | 描述               | 默认值                | 自版本 |
| ----------------------- | ------------------- | ------------------ | --------------------- | ------ |
| **`title`**             | <code>string</code> | 对话框标题         |                       | 1.0.0  |
| **`message`**           | <code>string</code> | 对话框中显示的消息 |                       | 1.0.0  |
| **`okButtonTitle`**     | <code>string</code> | 确认按钮显示的文本 | <code>"OK"</code>     | 1.0.0  |
| **`cancelButtonTitle`** | <code>string</code> | 取消按钮显示的文本 | <code>"Cancel"</code> | 1.0.0  |

</docgen-api>
