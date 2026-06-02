---
title: Dialog Capacitor 插件 API
description: Dialog API 提供了触发原生对话框窗口的方法，用于警告、确认和输入提示
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/dialog/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/dialog/src/definitions.ts
sidebar_label: 对话框
translated: true
source_hash: 79ff43ed
---

# @capacitor/dialog

Dialog API 提供了触发原生对话框窗口的方法，用于警告、确认和输入提示

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
    title: 'Stop',
    message: '这是一个错误',
  });
};

const showConfirm = async () => {
  const { value } = await Dialog.confirm({
    title: 'Confirm',
    message: `你确定要按下红色按钮吗？`,
  });

  console.log('已确认：', value);
};

const showPrompt = async () => {
  const { value, cancelled } = await Dialog.prompt({
    title: 'Hello',
    message: `你叫什么名字？`,
  });

  console.log('姓名：', value);
  console.log('已取消：', cancelled);
};
```

## API

<docgen-index>

* [`alert(...)`](#alert)
* [`prompt(...)`](#prompt)
* [`confirm(...)`](#confirm)
* [接口](#interfaces)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### alert(...)

```typescript
alert(options: AlertOptions) => Promise<void>
```

显示一个警告对话框

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#alertoptions">AlertOptions</a></code> |

**自版本:** 1.0.0

--------------------


### prompt(...)

```typescript
prompt(options: PromptOptions) => Promise<PromptResult>
```

显示一个提示对话框

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#promptoptions">PromptOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#promptresult">PromptResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### confirm(...)

```typescript
confirm(options: ConfirmOptions) => Promise<ConfirmResult>
```

显示一个确认对话框

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#confirmoptions">ConfirmOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#confirmresult">ConfirmResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### 接口


#### AlertOptions

| 属性              | 类型                | 描述                       | 默认值           | 自版本 |
| ----------------- | ------------------- | -------------------------- | ----------------- | ----- |
| **`title`**       | <code>string</code> | 对话框的标题。              |                   | 1.0.0 |
| **`message`**     | <code>string</code> | 在对话框上显示的消息。       |                   | 1.0.0 |
| **`buttonTitle`** | <code>string</code> | 操作按钮上使用的文本。       | <code>"OK"</code> | 1.0.0 |


#### PromptResult

| 属性            | 类型                 | 描述                                     | 自版本 |
| --------------- | -------------------- | ---------------------------------------- | ----- |
| **`value`**     | <code>string</code>  | 在提示框中输入的文本。                     | 1.0.0 |
| **`cancelled`** | <code>boolean</code> | 提示框是否被取消或接受。                   | 1.0.0 |


#### PromptOptions

| 属性                    | 类型                | 描述                                | 默认值               | 自版本 |
| ----------------------- | ------------------- | ----------------------------------- | --------------------- | ----- |
| **`title`**             | <code>string</code> | 对话框的标题。                       |                       | 1.0.0 |
| **`message`**           | <code>string</code> | 在对话框上显示的消息。               |                       | 1.0.0 |
| **`okButtonTitle`**     | <code>string</code> | 确认操作按钮上使用的文本。           | <code>"OK"</code>     | 1.0.0 |
| **`cancelButtonTitle`** | <code>string</code> | 取消操作按钮上使用的文本。           | <code>"Cancel"</code> | 1.0.0 |
| **`inputPlaceholder`**  | <code>string</code> | 占位符提示文本。                     |                       | 1.0.0 |
| **`inputText`**         | <code>string</code> | 预填充的文本。                       |                       | 1.0.0 |


#### ConfirmResult

| 属性        | 类型                 | 描述                                               | 自版本 |
| ----------- | -------------------- | -------------------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 如果点击了确认按钮则为 true，否则为 false。         | 1.0.0 |


#### ConfirmOptions

| 属性                    | 类型                | 描述                                | 默认值               | 自版本 |
| ----------------------- | ------------------- | ----------------------------------- | --------------------- | ----- |
| **`title`**             | <code>string</code> | 对话框的标题。                       |                       | 1.0.0 |
| **`message`**           | <code>string</code> | 在对话框上显示的消息。               |                       | 1.0.0 |
| **`okButtonTitle`**     | <code>string</code> | 确认操作按钮上使用的文本。           | <code>"OK"</code>     | 1.0.0 |
| **`cancelButtonTitle`** | <code>string</code> | 取消操作按钮上使用的文本。           | <code>"Cancel"</code> | 1.0.0 |

</docgen-api>
